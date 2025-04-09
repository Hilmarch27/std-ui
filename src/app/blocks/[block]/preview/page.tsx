import { notFound } from 'next/navigation'
import React from 'react'
import registry from '~/registry.json'

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

  return <Component />
}

export default BlockPreviewPage
