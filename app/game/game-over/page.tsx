'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/logo.jpg'
import { BadgeEuro } from 'lucide-react'
import { badges } from '@/src/data/badge'
import StartGameButton from '@/src/componnets/header/StartGameButton'
import LeaderBoardList from '@/src/componnets/rules/LeaderBoardList'
import styles from './game-over.module.css'

export default function GameOver() {
	const searchParams = useSearchParams()
	const quesNumberParam = searchParams.get('quesnumber')
	const quesNumber: number = quesNumberParam ? parseInt(quesNumberParam) : 0
	const [leaderBoardIsShown, setLeaderBoardIsShown] = useState<boolean>(false)
	const money = searchParams.get('money')
	let moneyToWin: string = ''

	if (quesNumber < 3) {
		moneyToWin = '0 zł'
	} else if (quesNumber >= 3 && quesNumber < 8) {
		moneyToWin = '2 000 zł'
	} else if (quesNumber >= 8 && quesNumber < 12) {
		moneyToWin = '40 000 zł'
	} else {
		moneyToWin = '1 000 000 zł'
	}

	const handleLeaderBoardState = () => {
		setLeaderBoardIsShown(prevState => !prevState)
	}

	return (
		<>
			<Image src={logo} alt='Logo' width={150} height={150} className='mt-44 rounded-[100%]' />
			<h1 className='mt-12 text-center text-7xl text-white font-medium uppercase max-[320px]:text-6xl'>koniec gry!</h1>
			<div
				className={`flex flex-col items-center justify-center mt-12 w-180 h-50 z-10 max-[470px]:w-140 max-[375px]:w-120 max-[320px]:w-100 ${styles.status__box}`}>
				<h2 className='mb-8 text-5xl text-center text-[#e4e429] uppercase'>Wygrałeś:</h2>
				<p className='text-6xl text-center text-[#e4e429]'>{moneyToWin}</p>
			</div>
			<div
				className={`relative flex flex-col items-center justify-center -mt-32 w-180 h-75 bg-blue-950/40 border border-blue-600/60 rounded-xl p-4 text-[1.6rem] text-slate-300 max-[470px]:w-140 max-[375px]:w-120 max-[320px]:w-100`}>
				<p className='absolute top-[50%] translate-y-[-50%] uppercase text-3xl text-center'>
					poziom: {quesNumber}/12 pytań
				</p>
				<div className='absolute flex items-center top-[80%] translate-y-[-50%] w-166 h-12 rounded-[.8rem] border border-blue-600/60 max-[470px]:w-120 max-[375px]:w-100 max-[320px]:w-88'>
					{badges.map(item => {
						return (
							<BadgeEuro
								width={24}
								height={24}
								className='mx-4 max-[470px]:mx-1'
								key={item.id}
								color={item.id <= quesNumber ? 'yellow' : 'white'}
							/>
						)
					})}
				</div>
			</div>
			<div className='flex items-center justify-center gap-12 flex-wrap mx-4 h-60 max-[750px]:my-12 max-[500px]:h-110'>
				<StartGameButton text='graj ponownie' customStyles={' uppercase'} />
				<button
					className={`${styles.show__results__btn} cursor-pointer uppercase`}
					type='button'
					name='Results'
					onClick={handleLeaderBoardState}>
					{leaderBoardIsShown ? 'ukryj tablicę' : 'tablica wyników'}
				</button>
				<Link href={'/'} type='button' className={`${styles.back__btn} uppercase`}>
					wróć do głównej
				</Link>
			</div>
			{leaderBoardIsShown && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
					<h2 className='mb-12 text-center text-5xl text-white font-medium'>Tabela Liderów</h2>
					<LeaderBoardList />
				</motion.div>
			)}
		</>
	)
}
