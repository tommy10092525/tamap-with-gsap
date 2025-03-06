import React from 'react'
import fujiImage from "../../../../public/fuji.jpg"
import Image from 'next/image'
import Link from 'next/link'
const page = () => {
  return (
    <div className='bg-gray-100 dark:bg-zinc-950 text-black dark:text-white min-h-screen p-8'>
      <Link href="/discount" className='text-lg font-semibold border-2 border-rose-500 rounded-lg p-2 fixed top-4 left-4'>戻る</Link>
      <div className='max-w-xl mx-auto mt-10 rounded-lg shadow-lg dark:bg-zinc-900'>
        <Image src={fujiImage} alt="うどん屋　藤の画像" width={500} height={500} className='w-full rounded-t-lg' />
        <div className='px-5 py-4'>
          <p className='text-center text-2xl font-bold mt-2'>藤</p>
          <p className='mt-4'>めじろ台駅からわずか徒歩１分！ランチタイムにリーズナブルな価格で本格的なうどんが食べられます！多種多様なうどんの他に、丼ものもあります！</p>
          <p className='font-semibold text-rose-400 text-lg'>割引内容</p>
          <p>・うどん普通盛50円引き</p>
          <p>・うどん大盛無料</p>
          <p>上記から1つ選択できます。</p>
          <p className='font-semibold text-rose-400 text-lg'>割引方法</p>
          <p>ご注文時に、本画面と法政大学の学生証または教職員証をご提示ください。</p>
          <p className='font-semibold text-rose-400 text-lg'>営業日／定休日</p>
          <p>ランチ</p>
          <p>11:00～15:00（ラストオーダー 14:30）</p>
          <p>ディナー</p>
          <p>17:00～21:00（ラストオーダー20:30）</p>
          <p>定休日：（第２・３火曜日）水曜日</p>
          <p className='font-semibold text-rose-400 text-lg'>お支払方法</p>
          <p>現金、クレジットカード(VISA、マスター、JCBなど)、交通系IC(Suica、PASMOなど)、 QRコード決済(PayPay、楽天ペイなど)</p>
          <p className='font-semibold text-rose-400 text-lg'>アクセス</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1621.184591380742!2d139.30751329999998!3d35.6432748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60191c23cdc1bc8b%3A0x2131ebb723e16b12!2z44GG44Gp44KT5oeQ55-z5aSp44G344KJ5pes6a6u44O75ZKM6Iaz44O76Jek!5e0!3m2!1sja!2sjp!4v1727600041739!5m2!1sja!2sjp"
            className="w-full h-64 rounded-lg"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  )
}

      export default page
