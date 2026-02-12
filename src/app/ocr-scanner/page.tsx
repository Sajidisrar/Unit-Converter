import { Metadata } from 'next';
import OCRScannerClient from './OCRScannerClient';

export const metadata: Metadata = {
  title: 'Free OCR Scanner Online | Extract Text from Images',
  description: 'Extract text from images instantly using OCR technology. Upload photos, screenshots, or scanned documents to convert them to editable text.',
  keywords: 'ocr scanner, image to text, extract text from image, optical character recognition, text recognition, image text extractor, scan text, photo to text',
  openGraph: {
    title: 'Free OCR Scanner Online | Extract Text from Images',
    description: 'Extract text from images using OCR. Upload any image and get editable text instantly.',
    type: 'website',
    url: 'https://freeunitconvertor.com/ocr-scanner',
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/ocr-scanner',
  },
};

const ocrJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OCR Scanner',
  description: 'Free online OCR tool to extract text from images',
  url: 'https://freeunitconvertor.com/ocr-scanner',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'Image to text conversion',
    'Multiple image format support',
    'Drag and drop upload',
    'Copy extracted text'
  ]
};

export default function OCRScannerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ocrJsonLd) }}
      />
      <OCRScannerClient />
    </>
  );
}
