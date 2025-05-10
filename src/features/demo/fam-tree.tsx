import React, { useState } from 'react'
import profiles from '@/registry/blocks/fam-tree/lib/data/fam-data.json'
import { FamTree } from '@/registry/blocks/fam-tree/components/fam-tree'
import { ExpandedState, FamTreeTypes } from '@/registry/blocks/fam-tree/lib/types/fam-types'

export default function DemoFamTree() {
  const [expandedState, setExpandedState] = useState<ExpandedState>({})
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1 className="text-3xl top-0 absolute">Family Flow chart</h1>
      <div className="container mx-auto text-center pt-32">
        <div className="items-center justify-center flex">
          {profiles &&
            profiles.map((profile, idX) => (
              <FamTree
                key={idX}
                {...(profile as FamTreeTypes)}
                expandedState={expandedState}
                setExpandedState={setExpandedState}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
