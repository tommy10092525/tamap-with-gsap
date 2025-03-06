import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import kokuterudoImage from '../../../../public/kokuterudou.jpg'

const page = () => {
  return (
    <div className='bg-gray-100 dark:bg-zinc-950 text-black dark:text-white min-h-screen p-8'>
      <Link href="/discount" className='text-lg font-semibold border-2 border-rose-500 rounded-lg p-2 fixed top-4 left-4'>戻る</Link>
      <div className='max-w-xl mx-auto mt-10 rounded-lg shadow-lg dark:bg-zinc-900'>
        <Image src={kokuterudoImage} alt="コクテル堂の画像" width={500} height={500} className='w-full rounded-t-lg' />
        <div className='px-5 py-4'>
          <p className='text-center text-2xl font-bold mt-2'>コクテル堂</p>
          <p className='font-semibold text-rose-400 text-lg'>割引内容</p>
          <p>通常100円引きの「ケーキ×ドリンクのセット」をさらに100円割引</p>
          <p className='font-semibold text-rose-400 text-lg'>割引方法</p>
          <p>ご注文時に、本画面と法政大学の学生証または教職員証をご提示ください。</p>
          <p className='font-semibold text-rose-400 text-lg'>営業日／定休日</p>
          <p>9:00～20:00</p>
          <p>19:00 (フードラストオーダー)</p>
          <p>19:30 (ドリンク/ケーキラストオーダー)</p>
          <p>20:00 (テイクアウトケーキ・物販ラストオーダー)</p>
          <p>定休日：なし(施設休は除く)</p>
          <p className='font-semibold text-rose-400 text-lg'>お支払方法</p>
          <p>現金、クレジットカード(VISA、マスター、JCBなど)</p>
          <p>交通系IC(Suica、PASMOなど)</p>
          <p>QRコード決済(paypay、AEON Payなど)</p>
          <p className='font-semibold text-rose-400 text-lg'>アクセス</p>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.280509464267!2d139.3424809752558!3d35.59614657261483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60191d37d330c62d%3A0x919a4b9f23796e74!2z44Kz44Kv44OG44Or5aCC5qmL5pys5bqX!5e0!3m2!1sja!2sjp!4v1730106307614!5m2!1sja!2sjp" className="w-full h-64 rounded-lg" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  )
}

export default page
