import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'
import { registryItemSchema } from 'shadcn/registry'

const PRIVATE_COMPONENTS = ['hello-world', 'complex-components']

export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { name } = await params

    const isPrivateComponent = PRIVATE_COMPONENTS.includes(name)

    if (isPrivateComponent) {
      const url = new URL(request.url)
      const token = url.searchParams.get('token')

      if (!token || token !== 'secret') {
        console.log('Token invalid')
        return NextResponse.json(
          { error: 'Unauthorized. This component requires a valid token.' },
          { status: 401 }
        )
      }
    }

    const registryData = await import('~/registry.json')
    const registry = registryData.default

    const component = registry.items.find((c) => c.name === name)

    if (!component) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 })
    }

    const registryItem = registryItemSchema.parse(component)

    if (!registryItem.files?.length) {
      return NextResponse.json({ error: 'Component has no files' }, { status: 400 })
    }

    const filesWithContent = await Promise.all(
      registryItem.files.map(async (file) => {
        const filePath = path.join(process.cwd(), file.path)
        const content = await fs.readFile(filePath, 'utf8')
        return { ...file, content }
      })
    )

    return NextResponse.json({ ...registryItem, files: filesWithContent })
  } catch (error) {
    console.error('Error processing component request:', error)
  }
}
