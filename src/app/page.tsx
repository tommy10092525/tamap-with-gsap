"use client"
import Image from "next/image";
import map from "../../public/Map.png"
import logo from "../../public/tamap_logo.png"
import arrow from "../../public/arrow.png"
import { HolidayData, State, Timetable } from "./utils/types";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { timetableApi, holidayDataAPi } from "./utils/constants";
import { dayIndices, findNextBuses, minutesToTime } from "./utils/timeHandlers";
import { buildings } from "./utils/constants";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)
gsap.ticker.fps(120)
gsap.ticker.lagSmoothing(1000, 16)

export default function Home() {
  const [state, setState] = useState<State>({ station: "", isComingToHosei: true, menuOpened: false })
  const [now, setNow] = useState(new Date())
  const initUserInput = () => {
    localStorage.clear()
    localStorage.setItem("firstAccessed", "false")
    setState(() => {
      return {
        station: "nishihachioji",
        isComingToHosei: true,
        menuOpened: false,
      }
    })
  }
  const mainContainer = useRef(null)
  const arrowsRef = useRef(null)
  const departureRef = useRef(null)
  const destinationRef = useRef(null)
  const arrowsContainer = useRef(null)
  const animateArrows = useGSAP().contextSafe(() => {
    gsap.fromTo(arrowsRef.current, { rotate: 0 }, { rotate: 180, duration: 0.3 })
  })
  const animateDirectionButton = useGSAP().contextSafe(() => {
    gsap.fromTo(arrowsContainer.current, { scale: 1.05 }, { scale: 1, duration: 0.3 })
  })
  const timesContainer = useRef(null)
  const directionContainer = useRef(null)
  const overlayContainer = useRef(null)
  const times = {
    economics: useRef(null),
    health: useRef(null),
    gym: useRef(null),
    sport: useRef(null),
  }
  const animateText = useGSAP().contextSafe(() => {
    gsap.fromTo(timesContainer.current, { opacity: 0, y: 10 }, { y: 0, duration: 0.3, opacity: 1, stagger: 0.01 })
    gsap.fromTo(Object.values(times).map(ref => ref.current), { opacity: 0, y: 5 }, { y: 0, duration: 0.3, opacity: 1, stagger: 0.01 })

  })
  const stationRefs = {
    nishihachioji: useRef(null),
    mejirodai: useRef(null),
    aihara: useRef(null),
  }
  const animateStationButton = useGSAP().contextSafe((station: string) => {
    if (station === "nishihachioji") {
      gsap.fromTo(stationRefs.nishihachioji.current, { scale: 1.05 }, { scale: 1, duration: 0.3 })
      gsap.to(stationRefs.mejirodai.current, { scale: 0.9, duration: 0.3 })
      gsap.to(stationRefs.aihara.current, { scale: 0.9, duration: 0.3 })
    } else if (station == "mejirodai") {
      gsap.to(stationRefs.nishihachioji.current, { scale: 0.9, duration: 0.3 })
      gsap.fromTo(stationRefs.mejirodai.current, { scale: 1.05 }, { scale: 1, duration: 0.3 })
      gsap.to(stationRefs.aihara.current, { scale: 0.9, duration: 0.3 })
    } else {
      gsap.to(stationRefs.nishihachioji.current, { scale: 0.9, duration: 0.3 })
      gsap.to(stationRefs.mejirodai.current, { scale: 0.9, duration: 0.3 })
      gsap.fromTo(stationRefs.aihara.current, { scale: 1.05 }, { scale: 1, duration: 0.3 })
    }
  })
  const waribikiRef = useRef(null)
  useGSAP(() => {
    gsap.fromTo(waribikiRef.current, { scale: 0.95, duration: 1}, { scale: 1.05, duration: 1, yoyo: true, repeat: -1, ease: "power1.out" })
  },[])
  useEffect(() => {
    if (localStorage.getItem("firstAccessed") !== "false") {
      initUserInput()
    } else {
      const station = localStorage.getItem("station")
      const isComingToHosei = localStorage.getItem("isComingToHosei") === "true"
      if (station) {
        setState(() => {
          return {
            station: station,
            isComingToHosei: isComingToHosei,
            menuOpened: false,
          }
        })
      } else {
        initUserInput()
      }
    }
    setInterval(() => {
      setNow(() => {
        return new Date()
      })
    }, 1000)
  }, [])

  useEffect(() => {
    localStorage.setItem("station", state.station)
    localStorage.setItem("isComingToHosei", state.isComingToHosei ? "true" : "false")
  }, [state])

  const handleDirectionButtonClicked = () => {
    setState(prev => {
      return {
        ...prev,
        isComingToHosei: !prev.isComingToHosei
      }
    })
    animateDirectionButton()
    animateArrows()
    animateText()
    gsap.fromTo(directionContainer.current, { rotateY: 180, autoAlpha: 0 }, { rotateY: 0, duration: 0.3, autoAlpha: 1 })
  }

  const handleMenuButtonClicked = () => {
    setState(prev => {
      return {
        ...prev,
        menuOpened: !prev.menuOpened
      }
    })

  }

  const handleStationButtonClicked = (station: string) => {
    animateStationButton(station)
    setState(prev => {
      return {
        ...prev,
        station
      }
    })
    animateText()
    if (state.isComingToHosei) {
      gsap.fromTo(departureRef.current, { y: -20, autoAlpha: 0 }, { y: 0, duration: 0.3, autoAlpha: 1 })
    } else {
      gsap.fromTo(destinationRef.current, { y: -20, autoAlpha: 0 }, { y: 0, duration: 0.3, autoAlpha: 1 })
    }
  }

  const { data: timetable, isLoading: isTimetableLoading } = useSWR(timetableApi, (key: string) => {
    return fetch(key).then((res) => res.json() as Promise<Timetable | null>)
  })
  const { data: holidayData, isLoading: isHolidayDataLoading } = useSWR(holidayDataAPi, (key: string) => {
    return fetch(key).then(res => res.json() as Promise<HolidayData | null>)
  })
  let departure = "";
  let destination = "";
  const overlay = {
    economics: "--:--",
    health: "--:--",
    sport: "--:--",
    gym: "--:--"
  }
  let previousBuses: Timetable = []
  let futureBuses: Timetable = []
  if (!isTimetableLoading && !isHolidayDataLoading && timetable && holidayData) {
    const currentDayIndex = now.getDay()
    const currentDay = dayIndices[currentDayIndex]
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()
    previousBuses = findNextBuses({
      timeTable: structuredClone(timetable),
      station: state.station,
      isComingToHosei: state.isComingToHosei,
      holidayData,
      currentDay,
      currentHour,
      currentMinutes,
      currentDate: new Date(),
      length: -2
    })
    futureBuses = findNextBuses({
      timeTable: structuredClone(timetable),
      station: state.station,
      isComingToHosei: state.isComingToHosei,
      holidayData,
      currentDay,
      currentHour,
      currentMinutes,
      currentDate: new Date(),
      length: 3
    })
    const [nextBus] = futureBuses
    if (state.station == "nishihachioji") {
      departure = "西八王子"
    } else if (state.station == "mejirodai") {
      departure = "めじろ台"
    } else if (state.station == "aihara") {
      departure = "相原"
    } else {
      departure = "西八王子"
    }
    destination = "法政大学"
    if (!state.isComingToHosei) {
      [departure, destination] = [destination, departure]
    }
    if (state.isComingToHosei && nextBus) {
      overlay.economics = minutesToTime(nextBus.arriveHour * 60 + nextBus.arriveMinute + buildings.economics)
      overlay.health = minutesToTime(nextBus.arriveHour * 60 + nextBus.arriveMinute + buildings.health)
      overlay.sport = minutesToTime(nextBus.arriveHour * 60 + nextBus.arriveMinute + buildings.sport)
      overlay.gym = minutesToTime(nextBus.arriveHour * 60 + nextBus.arriveMinute + buildings.gym)
    }

  }
  return (
    <>
      {/* 時計 */}
      <div className="top-3 left-3 z-10 fixed bg-white/70 dark:bg-black/60 shadow p-5 rounded-xl w-1/3 text-black dark:text-white">
        <p suppressHydrationWarning={false} className="w-auto h-7 font-medium text-lg text-center">{`${typeof window !== "undefined" ? `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}` : "----/--/--"}`}</p>
        <p suppressHydrationWarning={false} className="w-auto h-7 font-medium text-2xl text-center">{`${typeof window !== "undefined" ? `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}` : "--:--:--"}`}</p>
      </div>

      {/* メニューを開くボタン */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="top-6 right-6 z-30 fixed bg-black/50 dark:bg-white/50 dark:bg-opacity-50 rounded-lg w-32 h-16 font-bold text-white dark:text-black" onClick={handleMenuButtonClicked}>Menu</button>
        </SheetTrigger>
        <SheetContent className="bg-white/70 dark:bg-black/30">
          <SheetTitle className="mt-3 text-xl text-center">Menu</SheetTitle>
          <Link className="block bg-white/60 dark:bg-black/80 shadow mx-10 p-2 dark:border-2 dark:border-white rounded-lg text-black dark:text-white text-center hover:underline will-change-auto"
            href='https://docs.google.com/forms/d/e/1FAIpQLScPysPRj60-S2v_zmFjrQF6YKlS0Qe200GSO4LnEMsiVbXxYg/viewform?usp=sf_link'>アプリご意見</Link>
          <p className="block bg-white/60 dark:bg-black/80 shadow mx-10 p-2 dark:border-2 dark:border-white rounded-lg text-black dark:text-white text-center hover:underline will-change-auto share-btn" onClick={async () => {
            if (navigator.share) {
              try {
                await navigator.share({
                  title: 'たまっぷ',
                  text: 'https://codemates123.github.io/homepage/tamap.html'
                });
                console.log('Page shared successfully');
              } catch (error) {
                console.error('Error sharing:', error);
              }
            }
          }}>アプリを共有</p>
          <Link className="block bg-white/60 dark:bg-black/80 shadow mx-10 p-2 dark:border-2 dark:border-white rounded-lg text-black dark:text-white text-center hover:underline will-change-auto"
            href='https://codemates123.github.io/homepage/'>CODE MATESとは</Link>
          <a className="block bg-white/60 dark:bg-black/80 shadow mx-10 p-2 dark:border-2 dark:border-white rounded-lg text-black dark:text-white text-center hover:underline will-change-auto"
            href='https://www.instagram.com/codemates_hosei?igsh=MTJvcmthMzUwOW90cg=='>Instagram</a>
        </SheetContent>

      </Sheet>
      <div className="bg-gradient-to-bl from-sky-400 dark:from-blue-500 to-orange-400 dark:to-orange-400 p-3 md:p-7 w-full h-full min-h-screen text-black dark:text-white">
        <Image alt="たまっぷのロゴ" src={logo} className="md:col-span-1 mx-auto -my-8 w-60 h-60" />
        <div className="gap-3 md:grid md:grid-cols-5 mx-auto p-3 max-w-5xl touch-manipulation" ref={mainContainer}>
          {/* 一つ目のカード */}
          <div className="col-span-2 bg-white/30 dark:bg-black/30 dark:bg-opacity-30 shadow-lg mt-4 p-2 rounded-2xl -full">

            {/* 行先表示 */}
            <div className="grid grid-cols-5 mx-auto mt-5 px-8 font-semibold text-xl text-center" ref={directionContainer}>
              <p className="inline-block col-span-2 h-8 text-center js-departure" ref={departureRef}>{departure}</p>
              <p className="col-span-1 h-4">⇒</p>
              <p className="inline-block col-span-2 h-8 text-center js-arrival" ref={destinationRef}>{destination}</p>
            </div>
            {/* 時刻一覧 */}
            <div className="" ref={timesContainer}>
              {previousBuses.map((item, i) => {
                return <div className="grid grid-cols-2 opacity-50 my-4 font-sans font-semibold text-lg md:text-2xl text-center" key={i}>
                  <p className="mx-auto -my-2 w-1/2">{item ? minutesToTime(item.leaveHour * 60 + item.leaveMinute) : "--:--"}</p>
                  <p className="mx-auto -my-2 w-1/2">{item ? minutesToTime(item.arriveHour * 60 + item.arriveMinute) : "--:--"}</p>
                </div>
              })}
              {futureBuses.map((item, i) => {
                return <div className="grid grid-cols-2 my-4 font-sans font-semibold text-3xl md:text-4xl text-center" key={i}>
                  <p className="mx-auto -my-2 w-1/2">{item ? minutesToTime(item.leaveHour * 60 + item.leaveMinute) : "--:--"}</p>
                  <p className="mx-auto -my-2 w-1/2">{item ? minutesToTime(item.arriveHour * 60 + item.arriveMinute) : "--:--"}</p>
                </div>
              })}
            </div>
            <button className="flex bg-black/50 dark:bg-white/50 shadow-lg mx-auto mt-3 rounded-lg w-1/2 text-white dark:text-black text-center" onClick={() => {
              handleDirectionButtonClicked()
            }} ref={arrowsContainer}>
              <span className="ml-2 w-auto" ref={arrowsRef}>
                <Image src={arrow} alt="矢印" className="w-8 h-6" />
                <Image src={arrow} alt="矢印" className="-mt-3 w-8 h-6 rotate-180" />
              </span>
              <span className="mt-1 w-full font-semibold text-lg">左右切替</span>
            </button>
          </div>

          {/* 二つ目のカード */}
          <div className="relative col-span-3 bg-white/20 dark:bg-black/30 shadow-lg mt-4 js-map-container rounded-2xl w-full h-auto font-semibold text-lg hoverable:hover:scale-110" ref={overlayContainer}>
            <Image src={map} alt="地図のイラスト" className="mx-auto w-auto h-72" />
            <div className="top-4 left-4 absolute bg-white/70 dark:bg-black/50 shadow-lg p-2 rounded-lg w-1/4 max-sm:w-1/3 h-16 overflow-hidden text-center will-change-auto">
              経済
              <span className="block" ref={times.economics}>{overlay.economics}</span>
            </div>
            <div className="top-4 right-4 absolute bg-white/70 dark:bg-black/50 shadow-lg p-2 rounded-lg w-1/4 max-sm:w-1/3 h-16 overflow-hidden text-center will-change-auto">
              社・現福
              <span className="block" ref={times.health}>{overlay.health}</span>
            </div>
            <div className="bottom-4 left-4 absolute bg-white/70 dark:bg-black/50 shadow-lg p-2 rounded-lg w-1/4 max-sm:w-1/3 h-16 overflow-hidden text-center will-change-auto">
              体育館
              <span className="block" ref={times.gym}>{overlay.gym}</span>
            </div>
            <div className="right-4 bottom-4 absolute bg-white/70 dark:bg-black/50 shadow-lg p-2 rounded-lg w-1/4 max-sm:w-1/3 h-16 overflow-hidden text-center will-change-auto">
              スポ健康
              <span className="block" ref={times.sport}>{overlay.sport}</span>
            </div>
          </div>

          {/* 三つ目のカード */}
          <div className="justify-center grid grid-cols-3 col-span-2 bg-white/20 dark:bg-black/30 shadow-lg mt-3 md:mt-0 p-2 py-auto rounded-2xl w-full font-semibold text-lg text-center hoverable:hover:scale-110">
            {state.station === "nishihachioji" ? <button className="bg-black/80 dark:bg-white/80 shadow-lg rounded-xl h-12 text-white dark:text-black scale-90" onClick={() => {
              handleStationButtonClicked("nishihachioji")
            }} ref={stationRefs.nishihachioji}>西八王子</button> : <button className="bg-black/50 dark:bg-white/50 shadow-lg rounded-xl h-12 text-white dark:text-black scale-90" onClick={() => {
              handleStationButtonClicked("nishihachioji")
            }} ref={stationRefs.nishihachioji}>西八王子</button>}
            {state.station === "mejirodai" ? <button className="bg-black/80 dark:bg-white/80 shadow-lg rounded-xl h-12 text-white dark:text-black scale-90" onClick={() => {
              handleStationButtonClicked("mejirodai")
            }} ref={stationRefs.mejirodai}>めじろ台</button> : <button className="bg-black/50 dark:bg-white/50 shadow-lg rounded-xl h-12 text-white dark:text-black scale-90" onClick={() => {
              handleStationButtonClicked("mejirodai")
            }} ref={stationRefs.mejirodai}>めじろ台</button>}
            {state.station === "aihara" ? <button className="bg-black/80 dark:bg-white/80 shadow-lg rounded-xl h-12 text-white dark:text-black scale-90" onClick={() => {
              handleStationButtonClicked("aihara")
            }} ref={stationRefs.aihara}>相原</button> : <button className="bg-black/50 dark:bg-white/50 shadow-lg rounded-xl h-12 text-white dark:text-black scale-90" onClick={() => {
              handleStationButtonClicked("aihara")
            }} ref={stationRefs.aihara}>相原</button>}
          </div>
          {/* 割引ボタン */}
          <Link
            href="/discount"
            className="block col-span-3 bg-gradient-to-r from-pink-400 to-sky-300 shadow-lg md:m-0 my-4 p-3 border-2 border-gray-800 rounded-full w-full font-bold text-black text-3xl text-center"
            ref={waribikiRef}>
            飲食店割引はこちら
          </Link>
        </div>
          <p className="mx-auto mt-2 font-medium text-black text-center">時刻は目安であり、交通状況等による変わる可能性があります。<br />また臨時便等には対応しておりません。</p>
          <p className="text-black text-center">©CODE MATES︎</p>
      </div>
    </>
  );
}
