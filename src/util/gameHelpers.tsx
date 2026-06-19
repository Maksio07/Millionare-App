import { shuffleArray } from './shuffleArray'

export function getGameQuestions(data: Array<object>) {
	let questionsInGame = []
	questionsInGame = shuffleArray(data).slice(0, 11)
	return questionsInGame
}
