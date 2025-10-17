// analyze-keywords.js
const axios = require('axios');
const cheerio = require('cheerio');
const { parseStringPromise } = require('xml2js'); // Corrected import for stopword
const { removeStopwords, en } = require('stopword');

// --- Configuration ---
// Your website's base URL. This should match your running development server.
const BASE_URL = 'http://localhost:3000';
// Number of top keywords to show for each page.
const TOP_N_KEYWORDS = 15;
// --- End Configuration ---

/**
 * Fetches and parses the sitemap.
 * @returns {Promise<string[]>} A list of URLs from the sitemap.
 */
async function getUrlsFromSitemap() {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  console.log(`Fetching sitemap from ${sitemapUrl}...`);

  try {
    const { data: sitemapXml } = await axios.get(sitemapUrl);
    const result = await parseStringPromise(sitemapXml);

    if (!result.urlset || !result.urlset.url) {
      console.error('❌ Error: Sitemap is missing <urlset> or <url> tags.');
      return [];
    }

    return result.urlset.url.map((urlEntry) => urlEntry.loc[0]);
  } catch (error) {
    console.error(`❌ Error fetching or parsing sitemap from ${sitemapUrl}`);
    if (error.isAxiosError && error.response?.status === 404) {
      console.error('Sitemap not found. Please ensure your Next.js development server is running and that you have an `app/sitemap.js` or `app/sitemap.ts` file.');
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
    return [];
  }
}

/**
 * Fetches the HTML content of a page.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<string|null>} The HTML content or null on error.
 */
async function getPageContent(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`❌ Failed to fetch ${url}: ${error.message}`);
    return null;
  }
}

/**
 * Extracts and processes text from HTML to find keywords.
 * @param {string} html - The HTML content of the page.
 * @returns {Map<string, number>} A map of keywords and their frequencies.
 */
function extractKeywords(html) {
  const $ = cheerio.load(html);

  // Remove script and style tags to avoid parsing their content
  $('script, style').remove();

  // Get text from the body, convert to lowercase, and split into words.
  const text = $('body').text();
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/) // Split by whitespace
    .filter(Boolean); // Remove empty strings

  // Remove stopwords (common words like 'the', 'a', 'is')
  const meaningfulWords = removeStopwords(words, en); // Corrected usage

  // Count word frequencies
  const wordFrequencies = new Map();
  for (const word of meaningfulWords) {
    // Ignore very short words
    if (word.length > 2) {
      wordFrequencies.set(word, (wordFrequencies.get(word) || 0) + 1);
    }
  }

  return wordFrequencies;
}

/**
 * Main function to run the analysis.
 */
async function main() {
  console.log('🚀 Starting keyword analysis...');
  const urls = await getUrlsFromSitemap();

  if (urls.length === 0) {
    console.log('\nNo URLs found in the sitemap. Exiting analysis.');
    return;
  }

  console.log(`Found ${urls.length} URLs in sitemap. Analyzing...\n`);

  for (const url of urls) {
    console.log(`\n--- Analyzing: ${url} ---`);
    const html = await getPageContent(url);

    if (!html) {
      continue;
    }

    const wordFrequencies = extractKeywords(html);

    // Sort by frequency and get the top N
    const sortedKeywords = [...wordFrequencies.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_N_KEYWORDS);

    if (sortedKeywords.length > 0) {
      console.log('📊 Top keywords found:');
      sortedKeywords.forEach(([word, count]) => {
        console.log(`- ${word} (${count})`);
      });
    } else {
      console.log('No meaningful keywords found on this page.');
    }
  }

  console.log('\n✅ Analysis complete.');
}

main().catch((error) => {
  console.error('An unexpected error occurred:', error);
});
