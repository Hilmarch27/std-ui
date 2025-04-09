import { notFound } from 'next/navigation'
import React from 'react'
import registry from '~/registry.json'

// Create a component map that will dynamically import components based on registry paths
const componentMap: Record<string, React.ComponentType> = {
  "~/__registry__/preview/block/sidebar.tsx": React.lazy(() => 
    import("~/__registry__/preview/block/sidebar")
      .then(module => ({ default: module.default }))
      .catch(err => {
        console.error(`Failed to load component: ~/__registry__/preview/block/sidebar.tsx`, err)
        return { default: () => <div>Failed to load component</div> }
      })
  ),
  // Add more mappings as needed for other components in your registry
}

// Modified BlockPreviewPage component to handle React.lazy components
const BlockPreviewPage = async (props: { params: Promise<{ block: string }> }) => {
  const params = await props.params
  const { block } = params
  const blockDetails = registry.items.find((item) => item.name === block)
  if (!blockDetails) notFound()

  const componentPath = blockDetails.meta?.component as string
  const Component = componentMap[componentPath]

  if (!Component) {
    console.error(`Component not found for path: ${componentPath}`)
    notFound()
  }

  return (
    <React.Suspense fallback={<div>Loading component...</div>}>
      <Component />
    </React.Suspense>
  )
}

export default BlockPreviewPage