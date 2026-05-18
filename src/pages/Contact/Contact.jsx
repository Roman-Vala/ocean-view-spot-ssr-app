import React from 'react'

export default function Contact() {
  return (
    <div className='flex justify-center items-center flex-col h-80'>
      <p className=' text-xl text-slate-700 '>Please send an email to: </p>
      <a className='mt-4 border-b-2 border-emerald-400 hover:text-slate-500' href='mailto:lenivisual@gmail.com'>lenivisual@gmail.com</a>
    </div>
  )
}
