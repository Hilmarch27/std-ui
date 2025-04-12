import BlockToolbar from '@/components/blocks/block-toolbar'
import BlockPreview from '@/components/blocks/block-preview'
import FileExplorer from '@/components/utils/file-explorer'
import { DescriptionText, MainHeading } from '@/components/utils/typography'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlockProvider } from '@/lib/configs/block-provider'
import { notFound } from 'next/navigation'
import registry from '~/registry.json'
import DocTopBar from '@/components/layouts/doc-top-bar'
import { Badge } from '@/components/ui/badge'

const BlockPage = async (props: { params: Promise<{ block: string }> }) => {
  const params = await props.params
  const { block } = params

  const blockDetails = registry.items.find((item) => item.name === block)
  if (!blockDetails) notFound()

  const { title, description } = blockDetails
  const files = blockDetails.files.map((file) => ({
    ...file,
    path: file.path.replace(`src/registry/blocks/${block}/`, '')
  }))

  return (
    <BlockProvider>
      <DocTopBar />
      <div className="max-w-screen-2xl w-full mx-auto pt-16 pb-8 px-4">
        <MainHeading>Building Blocks for the Web</MainHeading>
        <DescriptionText className="mt-1">
          Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source.
          Free forever.
        </DescriptionText>

        <Tabs defaultValue="preview" className="mt-10">
          <div className="mb-4 flex items-center gap-2 justify-between pr-1.5">
            <div className="flex space-x-1.5">
              <TabsList>
                <TabsTrigger className="dark:data-[state=active]:border-primary" value="preview">
                  Preview
                </TabsTrigger>
                <TabsTrigger className="dark:data-[state=active]:border-primary" value="code">
                  Code
                </TabsTrigger>
              </TabsList>
              <Badge variant={'outline'} className="flex font-mono text-xs border-primary">
                <p>{title},</p>
                <p>{description}</p>
              </Badge>
            </div>
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
