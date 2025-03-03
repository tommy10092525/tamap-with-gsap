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
  const arrowsRef = useRef(null)
  const arrowsContainer = useRef(null)
  const animateArrows = useGSAP().contextSafe(() => {
    gsap.fromTo(arrowsRef.current, { rotate: 0 }, { rotate: 180, duration: 0.3 })
  })
  const animateDirectionButton = useGSAP().contextSafe(() => {
    gsap.fromTo(arrowsContainer.current, { scaleX: 1.05 }, { scaleX: 1.0, duration: 0.3 })
  })
  const timesContainer = useRef(null)
  const directionContainer = useRef(null)
  const overlayContainer = useRef(null)
  const animateText = useGSAP().contextSafe(() => {
    gsap.fromTo(gsap.utils.selector(timesContainer)("p"), { opacity: 0, y: 10 }, { y: 0, duration: 0.3, opacity: 1 })
    gsap.fromTo(gsap.utils.selector(directionContainer)("p"), { opacity: 0, y: -10 }, { y: 0, duration: 0.3, opacity: 1 })
    gsap.fromTo(gsap.utils.selector(overlayContainer)("span"), { opacity: 0, y: 5 }, { y: 0, duration: 0.3, opacity: 1 })
  })
  const stationRefs = {
    nishihachioji: useRef(null),
    mejirodai: useRef(null),
    aihara: useRef(null),
  }
  const animateStationButton = useGSAP().contextSafe((station: string) => {
    if (station === "nishihachioji") {
      gsap.fromTo(stationRefs.nishihachioji.current, { scale: 1 }, { scale: 0.9, duration: 0.3 })
    } else if (station == "mejirodai") {
      gsap.fromTo(stationRefs.mejirodai.current, { scale: 1 }, { scale: 0.9, duration: 0.3 })
    } else {
      gsap.fromTo(stationRefs.aihara.current, { scale: 1 }, { scale: 0.9, duration: 0.3 })
    }
  })
  const waribikiRef = useRef(null)
  useGSAP(() => {
    gsap.to(waribikiRef.current, { scale: 1.05, duration: 1, yoyo: true, repeat: -1 })
  })
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
  }

  const handleMenuButtonClicked = () => {
    setState(prev => {
      return {
        ...prev,
        menuOpened: !prev.menuOpened
      }
    })
    // moveMenu()
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
      length: -3
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
      length: 4
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
      <div className="bg-white/30 dark:bg-black/30 rounded-3xl shadow fixed p-5 backdrop-blur-sm z-10 top-3 left-3 text-black dark:text-white w-1/3">
        <p suppressHydrationWarning={true} className="text-lg font-medium text-center w-auto h-7">{`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`}</p>
        <p suppressHydrationWarning={true} className="text-2xl font-medium text-center w-auto h-7">{new Date().toLocaleTimeString()}</p>
      </div>

      {/* メニューを開くボタン */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-32 h-16 dark:bg-white/50 bg-black/50 rounded-lg fixed dark:bg-opacity-50 z-30 right-6 top-6 font-bold text-white dark:text-black" onClick={handleMenuButtonClicked}>Menu</button>
        </SheetTrigger>
        <SheetContent className="bg-white/70">
          <SheetTitle className="text-center mt-3 text-xl">Menu</SheetTitle>
          <a className="mx-10 hover:underline text-white dark:text-black bg-black/80 dark:bg-white/80 rounded-lg shadow p-2 block text-center will-change-auto"
            href='https://docs.google.com/forms/d/e/1FAIpQLScPysPRj60-S2v_zmFjrQF6YKlS0Qe200GSO4LnEMsiVbXxYg/viewform?usp=sf_link'>アプリご意見</a>
          <p className="mx-10 share-btn hover:underline text-white dark:text-black bg-black/80 dark:bg-white/80 rounded-lg shadow p-2 block text-center will-change-auto">アプリを共有</p>
          <a className="mx-10 hover:underline text-white dark:text-black bg-black/80 dark:bg-white/80 rounded-lg shadow p-2 block text-center will-change-auto"
            href='https://codemates123.github.io/homepage/'>CODE MATESとは</a>
          <a className="mx-10 hover:underline text-white dark:text-black bg-black/80 dark:bg-white/80 rounded-lg shadow p-2 block text-center will-change-auto"
            href='https://www.instagram.com/codemates_hosei?igsh=MTJvcmthMzUwOW90cg=='>Instagram</a>
        </SheetContent>

      </Sheet>


      <div className="p-3 bg-gradient-to-bl from-sky-400 to-orange-400 dark:from-blue-500 dark:to-orange-400 w-full h-full text-black dark:text-white">
        <div className="max-w-screen-md mx-auto touch-manipulation p-3">
          <Image alt="たまっぷのロゴ" src={logo} className="w-60 h-60 mx-auto -my-8" />

          {/* 一つ目のカード */}
          <div className="-full bg-white/30 dark:bg-black/30 dark:bg-opacity-30 rounded-2xl shadow-lg p-2 mt-4">

            {/* 行先表示 */}
            <div className="text-xl mt-5 font-semibold text-center flex mx-auto" ref={directionContainer}>
              <p className="js-departure text-center inline-block w-1/2 h-8">{departure}</p>
              <span className="w-4 h-4">⇒</span>
              <p className="js-arrival text-center inline-block w-1/2 h-8">{destination}</p>
            </div>
            {/* 時刻一覧 */}
            <div className="h-40 overflow-y-scroll will-change-scroll" ref={timesContainer}>
              {previousBuses.map((item, i) => {
                return <div className="md:text-2xl text-lg opacity-50 font-sans my-4 flex text-center md:font-bold font-semibold" key={i}>
                  <p className="w-1/2 mx-auto my-0">{item ? minutesToTime(item.leaveHour * 60 + item.leaveMinute) : "--:--"}</p>
                  <p className="w-1/2 mx-auto my-0">{item ? minutesToTime(item.arriveHour * 60 + item.arriveMinute) : "--:--"}</p>
                </div>
              })}
              {futureBuses.map((item, i) => {
                return <div className="md:text-4xl text-3xl font-sans my-4 flex text-center md:font-bold font-semibold" key={i}>
                  <p className="w-1/2 mx-auto my-0">{item ? minutesToTime(item.leaveHour * 60 + item.leaveMinute) : "--:--"}</p>
                  <p className="w-1/2 mx-auto my-0">{item ? minutesToTime(item.arriveHour * 60 + item.arriveMinute) : "--:--"}</p>
                </div>
              })}
            </div>
            <button className="w-1/2 dark:bg-white/50 bg-black/50 rounded-lg shadow-lg text-center flex mx-auto mt-3 text-white dark:text-black" onClick={() => {
              handleDirectionButtonClicked()
            }} ref={arrowsContainer}>
              <span className="w-auto ml-2" ref={arrowsRef}>
                <Image src={arrow} alt="矢印" className="w-8 h-6" />
                <Image src={arrow} alt="矢印" className="w-8 h-6 rotate-180 -mt-3" />
              </span>
              <span className="w-full text-lg font-semibold mt-1">左右切替</span>
            </button>
          </div>

          {/* 二つ目のカード */}
          <div className="w-full bg-white/20 dark:bg-black/30 rounded-2xl shadow-lg relative font-semibold text-lg mt-4 hoverable:hover:scale-110  js-map-container h-auto overflow-x-hidden" ref={overlayContainer}>
            <Image src={map} alt="地図のイラスト" className="h-72 w-auto mx-auto" />
            <div className="top-4 left-4 absolute bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-2 text-center w-1/4 md:w-1/6 overflow-hidden h-16 will-change-auto">
              経済
              <span className="block">{overlay.economics}</span>
            </div>
            <div className="top-4 right-4 absolute bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-2 text-center w-1/4 md:w-1/6 overflow-hidden h-16 will-change-auto">
              社・現福
              <span className="block">{overlay.health}</span>
            </div>
            <div className="bottom-4 left-4 absolute bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-2 text-center w-1/4 md:w-1/6 overflow-hidden h-16 will-change-auto">
              体育館
              <span className="block">{overlay.gym}</span>
            </div>
            <div className="bottom-4 right-4 absolute bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-2 text-center w-1/4 md:w-1/6 overflow-hidden h-16 will-change-auto">
              スポ健康
              <span className="block">{overlay.sport}</span>
            </div>
          </div>

          {/* 三つ目のカード */}
          <div className="font-semibold text-lg flex mt-2 justify-center w-full bg-white/20 dark:bg-black/30 rounded-2xl shadow-lg p-2 text-center hoverable:hover:scale-110">
            <button className="bg-black/50 dark:bg-white/50 rounded-xl px-1 py-3 w-1/3 shadow-lg scale-90 text-white dark:text-black" onClick={() => {
              handleStationButtonClicked("nishihachioji")
            }} ref={stationRefs.nishihachioji}>西八王子</button>
            <button className="bg-black/50 dark:bg-white/50 rounded-xl px-1 py-3 w-1/3 shadow-lg scale-90 text-white dark:text-black" onClick={() => {
              handleStationButtonClicked("mejirodai")
            }} ref={stationRefs.mejirodai}>めじろ台</button>
            <button className="bg-black/50 dark:bg-white/50 rounded-xl px-1 py-3 w-1/3 shadow-lg scale-90 text-white dark:text-black" onClick={() => {
              handleStationButtonClicked("aihara")
            }} ref={stationRefs.aihara}>相原</button>
          </div>

          <a href="https://codemates.lolitapunk.jp/tamap/templates/tamap_discount" className="my-4 rounded-full bg-gradient-to-r from-pink-400 to-sky-300 font-bold text-3xl text-center p-5 w-full block border-gray-800 shadow-lg text-black border-2" ref={waribikiRef}>
            飲食店割引はこちら
          </a>
          <p className="text-black text-center font-medium mt-2 mx-auto">時刻は目安であり、交通状況等による変わる可能性があります。<br />また臨時便等には対応しておりません。</p>
          <p className="text-center text-black">©CODE MATES︎</p>
        </div>
      </div>
    </>
  );
}
