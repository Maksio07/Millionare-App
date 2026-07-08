'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAnswer, handleGameHelpers, getAnswers } from '@/app/actions/game'
import HelperBtns from './HelperBtns'
import styles from './game.module.css'

export default function Answers({
	currentQuestion,
	questionNumber,
	loadedQuestionsIds,
	questionPrice,
	isLoggedInUser,
	userId,
}: {
	currentQuestion: any
	questionNumber: number
	loadedQuestionsIds: Array<string>
	questionPrice: number
	isLoggedInUser: boolean | null
	userId: number | string
}) {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const [answerStatus, setAnswerStatus] = useState<boolean | null>(null)
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
	const [disabledAnswers, setDisabledAnswers] = useState<any>([])
	const [loadedAnswers, setLoadedAnswers] = useState<string[]>([])

	useEffect(() => {
		const fetchAnswers = async () => {
			const data = await getAnswers()
			setLoadedAnswers(data.answers)
		}

		fetchAnswers()
	}, [])

	const handleSelectedAnswer = (selectedAnswer: string) => {
		setSelectedAnswer(selectedAnswer)
		setAnswerStatus(null)

		startTransition(async () => {
			const result = await checkAnswer(questionNumber, selectedAnswer)
			setAnswerStatus(result.success)

			setTimeout(() => {
				if (result.success) {
					if (questionNumber < 11) {
						router.push(`/game/${loadedQuestionsIds[questionNumber + 1]}`)
					} else {
						router.push(
							`/game/game-over?quesnumber=${
								questionNumber + 1
							}&money=${questionPrice}&loggedIn=${isLoggedInUser}&userId=${userId}`
						)
					}
				} else {
					router.push(
						`/game/game-over?quesnumber=${
							questionNumber + 1
						}&money=${questionPrice}&loggedIn=${isLoggedInUser}&userId=${userId}`
					)
				}
				setSelectedAnswer('')
				setAnswerStatus(null)
			}, 3000)
		})
	}

	const fiftyFiftyHelper = async () => {
		await handleGameHelpers('50/50', false)
		const answersToDisable = loadedAnswers.filter(
			(item: string) =>
				item !== currentQuestion.answers[0] &&
				(item !== currentQuestion.answers[(currentQuestion.answers.length * Math.random()).toFixed(0)]) !==
					currentQuestion.answers[0]
		)

		setDisabledAnswers([...answersToDisable])
	}

	return (
		<div className='flex flex-col items-center mb-12'>
			<HelperBtns
				onFiftyFiftyFilter={fiftyFiftyHelper}
				disabledAnswers={disabledAnswers}
				correctAnswerIndex={loadedAnswers.findIndex(item => item === currentQuestion.answers[0])}
				currentQuestion={currentQuestion}
				questionNumber={questionNumber}
				questionPrice={questionPrice}
			/>
			{loadedAnswers.map((answer: string) => {
				const isSelected = answer === selectedAnswer
				let currentBtnStyles: string = ''

				if (isSelected) {
					if (answerStatus === null) {
						currentBtnStyles = styles.selected__answer
					} else if (answerStatus === true) {
						currentBtnStyles = styles.correct__answer
					} else {
						currentBtnStyles = styles.wrong__answer
					}
				}

				return (
					<button
						className={`${styles.answer} ${currentBtnStyles}`}
						id={answer}
						key={answer}
						onClick={() => handleSelectedAnswer(answer)}
						disabled={
							isPending || selectedAnswer !== null || disabledAnswers[0] === answer || disabledAnswers[1] === answer
						}>
						{answer}
					</button>
				)
			})}
		</div>
	)
}
