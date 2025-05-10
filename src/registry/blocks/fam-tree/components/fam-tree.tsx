'use client'

import { useState } from 'react'
import type { ExpandedState, FamTreeTypes } from '../lib/types/fam-types'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

type FamTreeProps = FamTreeTypes & {
  vertical?: boolean
  expandedState: ExpandedState
  setExpandedState: (state: ExpandedState) => void
}

const FamTree = ({
  id,
  name,
  role,
  profiles = [],
  spouse,
  vertical,
  expandedState,
  setExpandedState
}: FamTreeProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const hasChildren = profiles && profiles.length > 0
  const isExpanded = expandedState[id] || false

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedState({
      ...expandedState,
      [id]: !isExpanded
    })
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

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
                  <Avatar className="w-10 h-10 rounded-full shadow-md border-2 border-white">
                    <AvatarImage
                      src={spouse.image || `https://randomuser.me/api/portraits/women/${spouse.id}.jpg`}
                      alt={spouse.name}
                    />
                    <AvatarFallback>{getInitials(spouse.name)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded p-1 whitespace-nowrap transition-opacity">
                    {spouse.name}
                  </div>
                </div>
              </div>
            )}
            <Avatar className="block shadow-md rounded-full size-16">
              <AvatarImage src={`https://randomuser.me/api/portraits/men/${id}.jpg`} alt={name} />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="md:text-left text-center">
            <h2 className="text-md font-semibold w-32">{name}</h2>
            <p className="text-gray-700 text-sm uppercase">{role}</p>
          </div>
          {hasChildren && (
            <button
              onClick={toggleExpand}
              className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              )}
            </button>
          )}
        </div>
      </div>
      {hasChildren && isExpanded && (
        <ProfileList profiles={profiles} expandedState={expandedState} setExpandedState={setExpandedState} />
      )}
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
                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white text-primary text-xs rounded p-[8px] whitespace-nowrap transition-opacity pr-9 z-10 rounded-r-full rounded-l-full group-hover:animate-fade">
                  {spouse.name}
                </div>
                <Avatar className="relative z-20 w-8 h-8 rounded-full shadow-md border-2 border-white">
                  <AvatarImage
                    src={spouse.image || `https://randomuser.me/api/portraits/women/${spouse.id}.jpg`}
                    alt={spouse.name}
                  />
                  <AvatarFallback>{getInitials(spouse.name)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          )}
          <Avatar className="block rounded-full m-auto shadow-md size-16">
            <AvatarImage alt={name} src={`https://randomuser.me/api/portraits/men/${Number(id)}.jpg`} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-primary">{name}</p>
          <Badge variant="outline" className="border-primary capitalize">
            {role}
          </Badge>
        </div>
        {hasChildren && (
          <button
            onClick={toggleExpand}
            className="mt-1 p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            )}
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <ProfileList profiles={profiles} expandedState={expandedState} setExpandedState={setExpandedState} />
      )}
    </div>
  )
}

type ProfileListProps = {
  profiles: FamTreeTypes[]
  expandedState: ExpandedState
  setExpandedState: (state: ExpandedState) => void
}

const ProfileList = ({ profiles = [], expandedState, setExpandedState }: ProfileListProps) => {
  return (
    <ul className="flex flex-row mt-10 justify-center animate-fade-in">
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
              <FamTree {...profile} key={idX} expandedState={expandedState} setExpandedState={setExpandedState} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export { FamTree }
