'use client'

import { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import { checkIsUserLogin } from '@/app/actions/auth'
import { getUserData } from '@/app/actions/displayMoney'
import { ConfirmMessageContext } from '@/src/store/ConfirmMessageContext'
import LoginModal from './LoginModal'
import logo from '@/public/logo.jpg'
import amounts from '@/src/data/money.json'
import Answers from './Answers'

export default function GameDashboard({
	currentIndex,
	currentQuestion,
	loadedQuestionsIds,
}: {
	currentIndex: number
	currentQuestion: any
	loadedQuestionsIds: Array<string>
}) {
	const confirmMessageCtx = useContext(ConfirmMessageContext)
	const [isUserLogin, setIsUserLogin] = useState<boolean | null>(null)
	const [userId, setUserId] = useState<string | number>('')

	useEffect(() => {
		const getData = async () => {
			const data: any = await getUserData()
			setUserId(data.userId)
		}

		const checkUser = async () => {
			const isLogin = await checkIsUserLogin()
			setIsUserLogin(isLogin)

			isLogin && getData()
		}

		checkUser()
	}, [])

	const handleIsModalOpen = async () => {
		confirmMessageCtx?.handleShowLoginModal(false)
	}

	let content

	if (confirmMessageCtx?.showLoginModal === false || null || isUserLogin === true || currentIndex > 0) {
		content = ''
	} else {
		content = (
			<LoginModal
				message='Grasz jako gość, Twoje wyniki nie będą zapisywane. Utwórz konto i zaloguj się, żeby trafić na tablice wyników.'
				onClick={handleIsModalOpen}
			/>
		)
	}

	let wonMoney

	if (currentIndex === 0) {
		wonMoney = 0
	} else {
		wonMoney === amounts[currentIndex - 1].name
	}

	return (
		<>
			{content}
			<h2 className={`${content === '' ? 'mt-44' : 'mt-12'} text-[2.8rem] font-medium text-[#e4e429] text-center`}>
				Pytanie za {amounts[currentIndex].name} zł
			</h2>

			<Image
				width={200}
				height={200}
				className='mt-12 rounded-full'
				alt='Millionaire app icon.'
				src={logo}
				fetchPriority='high'
				loading='eager'
			/>
			<p className='mt-12 text-white text-center text-[2rem]'>{currentQuestion.text}</p>
			<span className='mt-12 h-px w-full bg-(--gold)' id='gold-line'></span>
			<Answers
				currentQuestion={currentQuestion}
				questionNumber={currentIndex}
				loadedQuestionsIds={loadedQuestionsIds}
				questionPrice={currentIndex === 0 ? 0 : amounts[currentIndex - 1].name}
				isLoggedInUser={isUserLogin}
				userId={userId}
			/>
		</>
	)
}
