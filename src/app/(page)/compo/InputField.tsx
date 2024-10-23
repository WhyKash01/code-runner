import React from 'react'

const InputField = ({title, onChange, placeholder}: any) => {
  return (
    <div className='mt-2'>
        <h3 className='text-lg font-medium mb-1' >{title}</h3>
        <input onChange={onChange} placeholder={placeholder} className='border-2 text-sm pl-5 w-[100%]  dark:bg-zinc-950 py-2 rounded-md border-zinc-300 ' type="text" />
    </div>
  )
}

export default InputField