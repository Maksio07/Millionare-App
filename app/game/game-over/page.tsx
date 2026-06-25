'use client'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import logo from '@/public/logo.jpg'
import { BadgeEuro } from 'lucide-react'
import { badges } from '@/src/data/badge'
import styles from './game-over.module.css'

export default function GameOver() {
	const searchParams = useSearchParams()
	const quesNumberParam = searchParams.get('quesnumber')
	const quesNumber: number = quesNumberParam ? parseInt(quesNumberParam) : 0
	const money = searchParams.get('money')
	let moneyToWin: string = ''

	if (quesNumber < 3) {
		moneyToWin = '0zł'
	} else if (quesNumber >= 3 && quesNumber < 8) {
		moneyToWin = '2 000 zł'
	} else if (quesNumber >= 8 && quesNumber < 12) {
		moneyToWin = '40 000 zł'
	} else {
		moneyToWin = '1 000 000 zł'
	}

	return (
		<>
			<Image src={logo} alt='Logo' width={150} height={150} className='mt-44 rounded-[100%]' />
			<h1 className='mt-12 text-center text-7xl text-white font-medium uppercase'>koniec gry!</h1>
			<div className={`flex flex-col items-center justify-center mt-12 w-180 h-50 z-10 ${styles.status__box}`}>
				<h2 className='mb-8 text-5xl text-center text-[#e4e429] uppercase'>Wygrałeś:</h2>
				<p className='text-6xl text-center text-[#e4e429]'>{moneyToWin}</p>
			</div>
			<div
				className={`relative flex flex-col items-center justify-center -mt-32 w-180 h-75 bg-blue-950/40 border border-blue-600/60 rounded-xl p-4 text-[1.6rem] text-slate-300`}>
				<p className='absolute top-[50%] translate-y-[-50%] uppercase text-3xl text-center'>
					poziom: {quesNumber}/12 pytań
				</p>
				<div className='absolute flex items-center top-[80%] translate-y-[-50%] w-166 h-12 rounded-[.8rem] border border-blue-600/60'>
					{badges.map(item => {
						return (
							<BadgeEuro
								width={24}
								height={24}
								className='mx-4'
								key={item.id}
								color={item.id <= quesNumber ? 'yellow' : 'white'}
							/>
						)
					})}
				</div>
			</div>
		</>
	)
}
