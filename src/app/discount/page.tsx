import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../../../public/tamap_logo.png"
import fujiImage from "../../../public/fuji.jpg"
import goemonImage from "../../../public/goemon.jpg"
import hicheeseImage from "../../../public/hicheese.jpg"
import kokuterudoImage from "../../../public/kokuterudou.jpg"
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
        <Link href="/discount/fuji" className='bg-gray-100 dark:bg-zinc-900 shadow-lg dark:border border-0 dark:border-zinc-700 rounded-lg hover:scale-105 transition-all duration-300'>
          <Image src={fujiImage} alt="うどん屋　藤の画像" width={500} height={500} className='mx-auto rounded-t-lg' />
          <div className='text-center'>
            <p className='text-md'>めじろ台　うどん屋</p>
            <p className='font-bold text-3xl'>藤</p>
            <p className='text-rose-500'>普通盛り50円引き<br />大盛無料</p>
          </div>
        </Link>
        <Link href="/discount/hicheese" className='bg-gray-100 dark:bg-zinc-900 shadow-lg dark:border border-0 dark:border-zinc-700 rounded-lg hover:scale-105 transition-all duration-300'>
          <Image src={hicheeseImage} alt="ハイチーズの画像" width={500} height={500} className='mx-auto rounded-t-lg' />
          <div className='text-center'>
            <p className='text-md'>八王子　チーズ料理</p>
            <p className='font-bold text-3xl'>ハイチーズ</p>
            <p className='text-rose-500'>ランチソフトドリンク無料<br />コースディナー500円引き<br />飲み放題30分延長</p>
          </div>
        </Link>
        <Link href="/discount/goemon" className='bg-gray-100 dark:bg-zinc-900 shadow-lg dark:border border-0 dark:border-zinc-700 rounded-lg hover:scale-105 transition-all duration-300'>
          <Image src={goemonImage} alt="吾衛門の画像" width={500} height={500} className='mx-auto rounded-t-lg' />
          <div className='text-center'>
            <p className='text-md'>西八王子　ラーメン店</p>
            <p className='font-bold text-3xl'>吾衛門</p>
            <p className='text-rose-500'>大盛無料</p>
          </div>
        </Link>
        <Link href="/discount/kokuterudou" className='bg-gray-100 dark:bg-zinc-900 shadow-lg dark:border border-0 dark:border-zinc-700 rounded-lg hover:scale-105 transition-all duration-300'>
          <Image src={kokuterudoImage} alt="コクテル堂の画像" width={500} height={500} className='mx-auto rounded-t-lg' />
          <div className='text-center'>
            <p className='text-md'>橋本　カフェ</p>
            <p className='font-bold text-3xl'>コクテル堂</p>
            <p className='text-rose-500'>ケーキ×ドリンクのセット<br />さらに100円引き</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default page
