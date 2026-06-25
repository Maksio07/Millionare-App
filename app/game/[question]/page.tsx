import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import GameDashboard from '@/src/componnets/game/GameDashboard'
import questions from '@/src/data/questions.json'

interface PageProps {
	params: Promise<{ question: string }>
}

export default async function Question({ params }: PageProps) {
	const resolvedParams = await params
	const questionId = resolvedParams.question

	if (questionId === undefined) {
		redirect('/')
	}

	const cookieStore = await cookies()
	const sessionCookie = cookieStore.get('game_session')

	if (!sessionCookie) {
		redirect('/')
	}

	const generatedQuestionIds: string[] = JSON.parse(sessionCookie.value)
	const questionNumber = generatedQuestionIds.indexOf(questionId)
	const currentQuestion = generatedQuestionIds[questionNumber]
	const currentQuestionData = questions.find(q => q.id === questionId)
	

	if (!currentQuestion) {
		redirect('/')
	}

	return (
		<GameDashboard
			currentIndex={questionNumber}
			currentQuestion={currentQuestionData}
			loadedQuestionsIds={generatedQuestionIds}
		/>
	)
}
