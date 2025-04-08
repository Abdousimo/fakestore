import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src={'/logo.png'} alt='/logo' width={100} height={100}/>
    </div>
  )
}

export default Logo