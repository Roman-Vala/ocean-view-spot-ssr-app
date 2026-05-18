import React from 'react'

export default function ProductInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4 col-span-6">
        <h1 className=" bg-slate-100 h-10 w-96 rounded"></h1>
        <p className="bg-slate-100 h-8 w-16 rounded"></p>

        <p className="bg-slate-100 h-4 w-60 rounded"></p>
        <p className="bg-slate-100 h-4 w-40 rounded"></p>
        <p className="bg-slate-100 h-4 w-32 rounded"></p>
        <p className="bg-slate-100 h-4 w-56 rounded"></p>
        <p className="bg-slate-100 h-4 w-40 rounded"></p>

        
      </div>
  )
}
