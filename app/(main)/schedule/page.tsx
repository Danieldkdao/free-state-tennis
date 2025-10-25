import React from 'react'
import { matches } from '@/app/data'
import Match from '@/components/Schedule/Match'

const SchedulePage = () => {
  return (
    <div className="w-full mt-8 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Schedule</h1>
      <div className="w-full flex flex-col gap-4">
        {matches.map((match, index) => {
          return <Match key={index} match={match}/>
        })}
      </div>
    </div>
  )
}

export default SchedulePage