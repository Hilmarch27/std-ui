import { notFound } from 'next/navigation'
import React from 'react'
import registry from '~/registry.json'

const getLazyComponent = (path: string) => {
  return React.lazy(() => import(path))
}

const BlockPreviewPage = async (props: { params: Promise<{ block: string }> }) => {
  const params = await props.params
  const { block } = params
  const blockDetails = registry.items.find((item) => item.name === block)
  if (!blockDetails) notFound()
// todo
  const Component = getLazyComponent(blockDetails.meta!.component!)

  return <Component />
}

export default BlockPreviewPage
