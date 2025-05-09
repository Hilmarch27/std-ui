'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { exportToCSV, parseCSVToJSON, parseError, readCSVFile } from '@/registry/lib/csv'
import { ButtonInputFile } from '@/registry/ui/button-input-file'
import { AutoSizeTextArea } from '@/registry/ui/autosize-text-area'
import { Button } from '@/components/ui/button'
import { useModal } from '@/registry/hooks/use-modal'
import { Webhook } from 'lucide-react'
import profiles from '@/registry/blocks/fam-tree/lib/data/fam-data.json'
import { FamTree } from '@/registry/blocks/fam-tree/components/fam-tree'
import { FamTreeTypes } from '@/registry/blocks/fam-tree/lib/types/fam-types'

const EmployeeSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string({ required_error: 'Columns Last Name Required' }).min(1),
  department: z.string(),
  salary: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 0, 'Salary must be a positive number')
})

type Employee = z.infer<typeof EmployeeSchema>

export default function CSVImporter() {
  const [employees, setEmployees] = useState<Employee[]>([])
  console.log('employe', employees)
  const [errors, setErrors] = useState<string[]>([])

  const handleFileUpload = async (file: File | null) => {
    if (!file) return

    try {
      const csvContent = await readCSVFile(file)

      const { validData, errors } = parseCSVToJSON(csvContent, EmployeeSchema, {
        headerMap: {
          'Employee ID': 'id',
          'First Name': 'firstName',
          'Last Name': 'lastName',
          Department: 'department',
          'Annual Salary': 'salary'
        }
      })

      setEmployees(validData)

      console.log('errors', errors)

      setErrors(parseError(errors))
    } catch (error) {
      setErrors(['Failed to process CSV file'])
      console.error(error)
    }
  }

  const handleExportCSV = () => {
    const data = [
      { id: '1', firstName: 'John', lastName: 'Doe', department: 'it', salary: 3000 },
      { id: '2', firstName: 'Jane', lastName: 'Smith', department: 'ite', salary: 4000 }
    ]

    exportToCSV(data, 'users-data')
  }

  const { openModal } = useModal()

  return (
    <div className="px-8 flex flex-col gap-6">
      <button onClick={handleExportCSV}>Export to CSV</button>
      {errors.length > 0 && (
        <div>
          <h3>Errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {employees.length > 0 && (
        <div>
          <h3>Imported {employees.length} employees</h3>
          {employees.map((v) => (
            <div key={v.id}>
              <h1>{v.id}</h1>
              <h1>{v.firstName}</h1>
              <h1>{v.lastName}</h1>
              <h1>{v.department}</h1>
              <h1>{v.salary}</h1>
            </div>
          ))}
          {/* Display your data */}
        </div>
      )}

      <div>
        <ButtonInputFile accept=".csv" maxSize={100 * 1024} onChange={(file) => handleFileUpload(file)} />
      </div>

      <div className="max-w-sm">
        <AutoSizeTextArea placeholder="This textarea with min height 52 and max height 200." maxHeight={200} />
      </div>

      <div>
        <Button onClick={() => openModal('dialog motion', <p className="aspect-square size-10">eyowww</p>)}>
          Test
        </Button>
      </div>
      <div>
        <Button>
          <Webhook className="animate-spin" />
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-3xl top-0 absolute">Organisation Flow chart</h1>
        <div className="container mx-auto text-center pt-32">
          <div className="items-center justify-center flex">
            {profiles && profiles.map((profile, idX) => <FamTree key={idX} {...(profile as FamTreeTypes)} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
