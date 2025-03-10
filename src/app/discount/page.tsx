import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../../../public/tamap_logo.png"
import StoreCard from '@/components/ui/store-card'
const page = () => {

  return (
    <div className='bg-zinc-100 dark:bg-zinc-950 min-h-screen text-black dark:text-white'>
      <header className='top-0 right-0 left-0 z-10 fixed bg-[#ff6347] px-4 py-4 text-white'>
        <Link href="/" className='float-left'>
          <Image src={logo} alt="たまっぷのロゴ" width={400} height={400} className='-my-4 w-16 h-16' />
        </Link>
        <h1 className='font-bold text-2xl text-center'>たまっぷ 提携店舗一覧</h1>
      </header>
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16 p-8'>
        {[
          { storeName: '藤', storeImage: '/fuji.jpg', storeDescription: 'めじろ台　うどん屋', url: '/discount/fuji', children: <p>普通盛り50円引き<br />大盛無料</p> },
          { storeName: 'ハイチーズ', storeImage: '/hicheese.jpg', storeDescription: '八王子　チーズ料理', url: '/discount/hicheese', children: <p>ランチソフトドリンク無料<br />コースディナー500円引き<br />飲み放題30分延長</p> },
          { storeName: '吾衛門', storeImage: '/goemon.jpg', storeDescription: '西八王子　ラーメン店', url: '/discount/goemon', children: <p>大盛無料</p> },
          { storeName: 'コクテル堂', storeImage: '/kokuterudou.jpg', storeDescription: '橋本　カフェ', url: '/discount/kokuterudou', children: <p>ケーキ×ドリンクのセット<br />さらに100円引き</p> }
        ].map((store, index) => (
          <StoreCard key={index} {...store} />
        ))}
      </div>
    </div>
  )
}

export default page
