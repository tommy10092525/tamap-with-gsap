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
        <StoreCard
          storeDescription='めじろ台　うどん屋'
          storeImage="/fuji.jpg"
          storeName='藤'
          url='/discount/fuji'
        >
          普通盛り50円引き<br />大盛無料
        </StoreCard>
        <StoreCard
          storeDescription='八王子　チーズ料理'
          storeImage="/hicheese.jpg"
          storeName='ハイチーズ'
          url='/discount/hicheese'
        >
          ランチソフトドリンク無料<br />コースディナー500円引き<br />飲み放題30分延長
        </StoreCard>
        <StoreCard
          storeDescription='西八王子　ラーメン店'
          storeImage="/goemon.jpg"
          storeName='吾衛門'
          url='/discount/goemon'
        >
          大盛無料
        </StoreCard>
        <StoreCard
          storeDescription='橋本　カフェ'
          storeImage="/kokuterudou.jpg"
          storeName='コクテル堂'
          url='/discount/kokuterudou'
        >
          ケーキ×ドリンクのセット<br />さらに100円引き
        </StoreCard>
      </div>
    </div>
  )
}

export default page
