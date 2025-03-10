import  Link  from 'next/link'
import Image from 'next/image'
import React from 'react'
type StoreCardProps = {
  storeName: string
  storeImage: string
  storeDescription: string
  url:string,
  children: React.ReactNode
}
const StoreCard = ({storeName,storeImage,storeDescription,url,children}:StoreCardProps) => {
  return (
    <Link href={url} className='bg-gray-100 dark:bg-zinc-900 shadow-lg dark:border border-0 dark:border-zinc-700 rounded-lg hover:scale-105 transition-all duration-300'>
      <Image width={1000} height={1000} src={storeImage} alt={`${storeName}の画像`} className='mx-auto rounded-t-lg'/>
      <div className='text-center'>
        <p className='text-md'>{storeDescription}</p>
        <p className='font-bold text-3xl'>{storeName}</p>
        <p className='text-rose-500'>{children}</p>
      </div>
    </Link>
  )
}

export default StoreCard
