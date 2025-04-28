import { z } from 'zod'

/**
 * Convert error message
 */
export function parseError(errors: Array<{ line: number; error: z.ZodError | Error }> = []) {
  return errors.map(
    (err) =>
      `Line ${err.line}: ${
        err.error instanceof z.ZodError
          ? err.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')
          : err.error.message
      }`
  )
}

/**
 * Parse CSV string into validated JSON objects
 * @param csvString The CSV string to parse
 * @param schema The Zod schema to validate against
 * @param options Parsing options
 * @returns Object with parsed valid data and any parsing errors
 */
export function parseCSVToJSON<T extends z.ZodType>(
  csvString: string,
  schema: T,
  options: {
    delimiter?: string
    hasHeaderRow?: boolean
    headerMap?: Record<string, string>
  } = {}
): {
  validData: z.infer<T>[]
  errors: Array<{ line: number; error: z.ZodError | Error }>
} {
  const { delimiter = ',', hasHeaderRow = true, headerMap = {} } = options

  // Split the CSV string into rows
  const rows = csvString.split('\n').filter((row) => row.trim().length > 0)

  if (rows.length === 0) {
    return { validData: [], errors: [] }
  }

  // Parse headers
  let headers: string[] = []
  let dataRows = rows

  if (hasHeaderRow && rows[0]) {
    const headerRow = rows[0]
    headers = headerRow
      .split(delimiter)
      .map((header) => header.trim())
      .map((header) => headerMap[header] || header)
    dataRows = rows.slice(1)
  }

  const validData: z.infer<T>[] = []
  const errors: Array<{ line: number; error: z.ZodError | Error }> = []

  // Process each data row
  dataRows.forEach((row, index) => {
    try {
      // Skip empty rows
      if (row.trim() === '') return

      const values = row.split(delimiter)
      const rowData: Record<string, string> = {}

      // If headers are defined, use them as keys
      if (headers.length > 0) {
        headers.forEach((header, i) => {
          if (i < values.length && values[i] !== undefined) {
            // Clean up the value (remove quotes if present)
            let value = values[i].trim()
            if (value.startsWith('"') && value.endsWith('"')) {
              value = value.substring(1, value.length - 1).replace(/""/g, '"')
            }
            rowData[header] = value
          }
        })
      } else {
        // If no headers, use numeric indices as keys
        values.forEach((value, i) => {
          let cleanValue = value.trim()
          if (cleanValue.startsWith('"') && cleanValue.endsWith('"')) {
            cleanValue = cleanValue.substring(1, cleanValue.length - 1).replace(/""/g, '"')
          }
          rowData[String(i)] = cleanValue
        })
      }

      // Validate the row data against the schema
      const validatedData = schema.parse(rowData)
      validData.push(validatedData)
    } catch (error) {
      errors.push({
        line: hasHeaderRow ? index + 2 : index + 1, // +1 for 0-indexing, +1 for header if present
        error: error instanceof Error ? error : new Error('Unknown error')
      })
    }
  })

  return { validData, errors }
}

/**
 * Read a CSV file and return its content as a string
 * @param file The File object to read
 * @returns Promise resolving to the file content as string
 */
export function readCSVFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string)
      } else {
        reject(new Error('Failed to read file'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }

    reader.readAsText(file)
  })
}


/**
 * Converts data to CSV format and initiates download
 * @param data Array of objects to convert to CSV
 * @param filename Name of the file to download (without extension)
 */
export function exportToCSV<T>(data: T[], filename: string): void {
  // Get headers from the first object's keys
  const headers = Object.keys(data[0] || {});
  
  // Create CSV header row
  const csvRows = [headers.join(',')];
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header as keyof T];
      
      // Handle values that need quotes (contain commas, quotes, or newlines)
      const stringValue = String(value ?? '');
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    
    csvRows.push(values.join(','));
  }
  
  // Combine all rows with newlines
  const csvString = csvRows.join('\n');
  
  // Create a blob with the CSV data
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  
  // Support for browsers that have the URL API
  if (window.URL && URL.createObjectURL) {
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
}