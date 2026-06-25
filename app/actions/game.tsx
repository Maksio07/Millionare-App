'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getGameQuestions } from '@/src/util/gameHelpers'
import questions from '@/src/data/questions.json'
import { shuffleArray } from '@/src/util/shuffleArray'

export async function startGame() {
	const selectedIds: string[] = []
	const generatedQuestions = getGameQuestions(questions)
	const helpers: { name: string; available: boolean }[] = [
		{ name: '50/50', available: true },
		{ name: 'public', available: true },
		{ name: 'friendCall', available: true },
	]

	generatedQuestions.forEach(q => {
		selectedIds.push(q.id)
	})

	const cookieStore = await cookies()
	cookieStore.set('game_session', JSON.stringify(selectedIds), {
		maxAge: 60 * 60,
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
	})

	cookieStore.set('game_helpers', JSON.stringify(helpers), {
		maxAge: 60 * 60,
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
	})

	redirect(`/game/${selectedIds[0]}`)
}

export async function getAnswers() {
	const cookieStore = await cookies()
	const sessionCookie = cookieStore.get('game_session')
	const headersList = await headers()
	const fullUrl = headersList.get('referer') || ''

	if (!sessionCookie) {
		redirect('/')
	}

	const currentId = fullUrl.split('/').pop()

	const currentQuestion = questions.find(q => q.id === currentId)
	const answers = shuffleArray(currentQuestion?.answers)
	const randomAnswer = answers[Math.floor(Math.random() * answers.length)]

	if (answers) {
		return { answers, randomAnswer }
	} else {
		redirect('/')
	}
}

export async function checkAnswer(questionNumber: number, selectedAnswer: string) {
	const cookieStore = await cookies()
	const sessionCookie = cookieStore.get('game_session')
	const headersList = await headers()
	const fullUrl = headersList.get('referer') || ''

	if (!sessionCookie) {
		redirect('/')
	}

	const generatedQuestionIds: string[] = JSON.parse(sessionCookie.value)
	const currentQuestionId = generatedQuestionIds[questionNumber]
	const currentQuestion = questions.find(q => q.id === currentQuestionId)

	if (!currentQuestion) {
		redirect('/')
	}

	const correctAnswer = currentQuestion.answers[0]
	const isCorrect: boolean = selectedAnswer === correctAnswer

	if (!isCorrect && fullUrl.includes('/game-over')) {
		cookieStore.delete('game_session')
		cookieStore.delete('game_helpers')
	}

	return { success: isCorrect }
}

export async function handleGameHelpers(helperName: string, helperStatus: boolean) {
	const cookieStore = await cookies()
	const gameHelpers = cookieStore.get('game_helpers')

	if (gameHelpers) {
		try {
			const helpers = JSON.parse(gameHelpers?.value)
			const helperToUpdate = helpers.find((helper: { name: string }) => helper.name === helperName)
			helperToUpdate.available = helperStatus

			cookieStore.set('game_helpers', JSON.stringify(helpers), {
				maxAge: 60 * 60,
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
			})

			return { success: true }
		} catch (err) {
			console.error('Błąd podczas przetwarzania ciasteczka:', err)
			return { success: false }
		}
	}
}

export async function getHelpersData() {
	const cookieStore = await cookies()
	const gameHelpers = cookieStore.get('game_helpers')

	const helpers = JSON.parse(gameHelpers?.value || '')

	return helpers
}
