interface ConversionTableProps {
  caption: string;
  columns: [string, string];
  rows: [string, string][];
}

/**
 * Quick-reference table of common conversions. Static markup so the values
 * are in the server-rendered HTML rather than computed on the client.
 */
export default function ConversionTable({ caption, columns, rows }: ConversionTableProps) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{caption}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((column) => (
                <th key={column} className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([from, to], index) => (
              // Keyed by index: the left-hand value repeats on purpose, since
              // one quantity often converts into several others.
              <tr key={index} className="border-b border-gray-100 dark:border-gray-700/50">
                <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">{from}</td>
                <td className="py-2 pr-4 text-gray-700 dark:text-gray-300 font-mono text-sm">{to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
