'use client'

import Image from 'next/image'
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
	return (
		<>
			<h2 className='mt-44 text-[2.8rem] font-medium text-[#e4e429] text-center'>
				Pytanie za {amounts[currentIndex].name} zł
			</h2>
			<Image width={200} height={200} className='mt-12 rounded-full' alt='Millionaire app icon.' src={logo} />
			<p className='mt-12 text-white text-center text-[2rem]'>{currentQuestion.text}</p>
			<span className='mt-12 h-px w-full bg-(--gold)' id='gold-line'></span>
			<Answers
				currentQuestion={currentQuestion}
				questionNumber={currentIndex}
				loadedQuestionsIds={loadedQuestionsIds}
				questionPrice={amounts[currentIndex].name}
			/>
		</>
	)
}
