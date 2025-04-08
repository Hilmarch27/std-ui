import BlockToolbar from '@/components/blocks/block-toolbar'
import BlockPreview from '@/components/blocks/block-preview'
import FileExplorer from '@/components/utils/file-explorer'
import { Navbar } from '@/components/layouts/home/nav'
import { DescriptionText, MainHeading } from '@/components/utils/typography'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlockProvider } from '@/lib/configs/block-provider'
import { notFound } from 'next/navigation'
import registry from '~/registry.json'


const BlockPage = async (props: { params: Promise<{ block: string }> }) => {
  const params = await props.params
  const { block } = params
  console.log('block', block)

  const blockDetails = registry.items.find((item) => item.name === block)
  if (!blockDetails) notFound()

  const { title, description } = blockDetails
  const files = blockDetails.files.map((file) => ({
    ...file,
    path: file.path.replace(`src/blocks/${block}/`, '')
  }))

  return (
    <BlockProvider>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto py-8 px-4">
        <MainHeading>{title}</MainHeading>
        {description && <DescriptionText className="mt-1">{description}</DescriptionText>}

        <Tabs defaultValue="preview" className="mt-6">
          <div className="mb-4 flex items-center gap-2 justify-between pr-1.5">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <BlockToolbar />
          </div>

          <TabsContent value="preview">
            <BlockPreview block={block} />
          </TabsContent>
          <TabsContent value="code">
            <FileExplorer files={files} />
          </TabsContent>
        </Tabs>

        {/* <BlockDetails /> */}
      </div>
    </BlockProvider>
  )
}

export default BlockPage