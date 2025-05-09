'use client'

import { useState } from 'react'
import type { FamTreeTypes } from '../lib/types/fam-types'
import { Badge } from '@/components/ui/badge'

type FamTreeProps = FamTreeTypes & {
  vertical?: boolean
}

const FamTree = ({ id, name, role, profiles = [], spouse, vertical }: FamTreeProps) => {
  const [isHovered, setIsHovered] = useState(false)

  // The spouse avatar positioning will be consistent regardless of layout
  return vertical ? (
    <div className="text-center">
      <div className="flex justify-center items-center">
        <div
          className="bg-gray-100 shadow-md py-4 px-2 md:p-0 rounded-lg md:rounded-full text-center grid grid-flow-col items-center relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="md:mr-4 w-16 md:w-20 relative">
            {spouse && isHovered && (
              <div className="absolute -top-3 -left-3 z-10 transition-opacity duration-200 ease-in-out">
                <div className="relative group">
                  <img
                    className="w-10 h-10 rounded-full shadow-md border-2 border-white"
                    src={spouse.image || `https://randomuser.me/api/portraits/women/${spouse.id}.jpg`}
                    alt={spouse.name}
                  />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded p-1 whitespace-nowrap transition-opacity">
                    {spouse.name}
                  </div>
                </div>
              </div>
            )}
            <img
              className="block shadow-md rounded-full"
              src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
              alt={name}
            />
          </div>
          <div className="md:text-left text-center">
            <h2 className="text-md font-semibold w-32">{name}</h2>
            <p className="text-gray-700 text-sm uppercase">{role}</p>
          </div>
        </div>
      </div>
      {profiles.length > 0 && <ProfileList key={id} profiles={profiles} />}
    </div>
  ) : (
    <div className="text-center">
      <div
        className="flex flex-col justify-center items-center relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-16 relative">
          {spouse && isHovered && (
            <div className="absolute -top-3 -left-3 z-10 transition-opacity duration-200 ease-in-out">
              <div className="relative group">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white text-primary text-xs rounded p-[8px] whitespace-nowrap transition-opacity pr-9 z-10 rounded-r-full rounded-l-full">
                  {spouse.name}
                </div>
                <img
                  className="relative z-20 w-8 h-8 rounded-full shadow-md border-2 border-white"
                  src={spouse.image || `https://randomuser.me/api/portraits/women/${spouse.id}.jpg`}
                  alt={spouse.name}
                />
              </div>
            </div>
          )}
          <img
            className="block rounded-full m-auto shadow-md"
            alt={name}
            src={`https://randomuser.me/api/portraits/men/${Number(id)}.jpg`}
          />
        </div>
        <div>
          <p className="text-primary">{name}</p>
          <Badge variant="outline" className="border-primary capitalize">
            {role}
          </Badge>
        </div>
      </div>
      {profiles.length > 0 && <ProfileList key={id} profiles={profiles} />}
    </div>
  )
}

type ProfileListProps = {
  profiles: FamTreeTypes[]
}

const ProfileList = ({ profiles = [] }: ProfileListProps) => {
  return (
    <ul className="flex flex-row mt-10 justify-center">
      <div className="-mt-10 border-l-2 absolute h-10 border-gray-400" />
      {profiles.map((profile, idX) => {
        const len = profiles.length
        return (
          <li key={idX} className="relative p-6">
            <div
              style={{
                left: idX === 0 ? '50%' : 0,
                right: idX === len - 1 ? '50%' : 0
              }}
              className="border-t-2 absolute h-8 border-gray-400 top-0"
            />
            <div className="relative flex justify-center">
              <div className="-mt-6 border-l-2 absolute h-6 border-gray-400 top-0" />
              <FamTree {...profile} key={idX} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export { FamTree }
