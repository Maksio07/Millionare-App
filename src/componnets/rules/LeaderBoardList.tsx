'use client'

import { useEffect, useState, useCallback } from 'react'
import { getUserMoney } from '@/app/actions/displayMoney'
import { Award } from 'lucide-react'
import styles from './rules.module.css'

export default function LeaderBoardList() {
	const [data, setData] = useState<any>([{ name: '', amount: '' }])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<string | null>('')

	const getData = useCallback(async () => {
		setIsLoading(true)
		try {
			const data = await getUserMoney()
			setData(data)
		} catch (error) {
			setIsError('Coś poszło nie tak')
		}

		setIsLoading(false)
	}, [])

	useEffect(() => {
		getData()
	}, [])

	return (
		<ul>
			{isError && <p className='text center text-3xl text-red-500'>{isError}</p>}
			{isLoading ? (
				<p className='text center text-3xl text-white'>Loading...</p>
			) : (
				data.map((item: any, index: number) => {
					const delay = index * 0.05
					return (
						<li
							key={index}
							className={`${styles.leaderboard__item} relative flex items-center justify-evenly mb-8 pt-8 pb-8 pl-4 pr-4 w-180 h-12 text-white text-3xl text-wrap rounded-md max-[470px]:w-120 max-[320px]:w-100`}
							style={{ '--delay': `${delay}s` } as React.CSSProperties}>
							<Award color='gold' className='absolute left-4' />
							<p>{item.name}</p>
							<p>{item.amount} zł</p>
						</li>
					)
				})
			)}
		</ul>
	)
}
