'use client'

import { useEffect, useContext } from 'react'
import { ConfirmMessageContext } from '@/src/store/ConfirmMessageContext'
import ConfirmMessage from '@/src/UI/ConfirmMessage'
import Image from 'next/image'
import StartGameButton from './StartGameButton'
import logo from '@/public/logo.jpg'
import styles from './header.module.css'

export default function Header() {
	const confirmMessageCtx = useContext(ConfirmMessageContext)

	useEffect(() => {
		const timer = setTimeout(() => {
			confirmMessageCtx?.handleMessage('')
		}, 5000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<header className='header w-full mt-32 mx-4'>
			<ConfirmMessage
				message={confirmMessageCtx?.message}
				customStyles={confirmMessageCtx?.message ? 'mt-16' : 'hidden'}
			/>
			<div className='wrapper flex flex-col items-center'>
				<h1 className='my-16 text-6xl text-center text-white font-bold max-[600px]:text-5xl max-[600px]:leading-[-0.5]'>
					12 pytań, 3 koła ratunkowe, 1 milion złotych. Podejmiesz wyzwanie?
				</h1>
				<Image
					src={logo}
					alt='An millionaire show image.'
					width={500}
					height={500}
					className={`${styles.header__image} rounded-[100%]`}
					loading='eager'
					fetchPriority='high'
				/>
				<StartGameButton text='Zacznij Grę' customStyles={'my-12'} />
			</div>
		</header>
	)
}
