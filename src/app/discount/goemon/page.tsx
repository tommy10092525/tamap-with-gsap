import React from 'react'
import goemonImage from "../../../../public/goemon.jpg"
import Image from 'next/image'
import Link from 'next/link'
const page = () => {
  return (
    <div className='bg-gray-100 dark:bg-zinc-950 text-black dark:text-white min-h-screen p-8'>
      <Link href="/discount" className='text-lg font-semibold border-2 border-rose-500 rounded-lg p-2 fixed top-4 left-4'>戻る</Link>
      <div className='max-w-xl mx-auto mt-10 rounded-lg shadow-lg dark:bg-zinc-900'>
        <Image src={goemonImage} alt="吾衛門の画像" width={500} height={500} className='w-full rounded-t-lg' />
        <div className='px-5 py-4'>
          <p className='text-center text-2xl font-bold mt-2'>吾衛門</p>
          <p className='mt-4'>法政大生に長く愛された西八王子駅近の有名ラーメン店で割引キャンペーン実施中！ 玉ねぎの甘みが感じられる八王子ラーメン、この機会にぜひお試しください！</p>
          <p className='font-semibold text-rose-400 text-lg'>割引内容</p>
          <p>ラーメン大盛を普通盛の価格でご注文いただけます。</p>
          <p className='font-semibold text-rose-400 text-lg'>割引方法</p>
          <p>ご注文時に、本画面と法政大学の学生証または教職員証をご提示ください。</p>
          <p className='font-semibold text-rose-400 text-lg'>営業日／定休日</p>
          <p>11:00～17:00</p>
          <p>定休日：日曜日、祝日</p>
          <p className='font-semibold text-rose-400 text-lg'>お支払方法</p>
          <p>現金のみ</p>
          <p className='font-semibold text-rose-400 text-lg'>アクセス</p>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1620.8992244104338!2d139.30863209839478!3d35.6573371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60191e9a721bf541%3A0x8450103c992b8275!2z5Lit6I-v44Gd44GwIOWQvuihm-mWgA!5e0!3m2!1sja!2sjp!4v1727708564523!5m2!1sja!2sjp"
            className="w-full h-64 rounded-lg" 
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
          <p className='font-semibold text-rose-400 text-lg'>問い合わせ先</p>
          <p>042-663-6861</p>
          <p>〒193-0835 東京都八王子市千人町3-3-3JR中央線 西八王子駅 北口より徒歩3分</p>
          <p className='font-semibold text-rose-400 text-lg'>注意事項</p>
          <p>・2025年3月31日まで有効です。</p>
          <p>・他飲食サイトの割引との併用はできません。</p>
          <p>・ご利用には、法政大学の学生証または教職員証のご提示が必要です。</p>
        </div>
      </div>
    </div>
  )
}

export default page
