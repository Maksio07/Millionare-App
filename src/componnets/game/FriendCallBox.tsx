import { useState, useEffect } from 'react'
import { getAnswers } from '@/app/actions/game'
import { motion } from 'motion/react'

export default function FriendCallBox({ currentQuestion }: { currentQuestion: any }) {
	const [randomAnswer, setRandomAnswer] = useState<string>('')

	useEffect(() => {
		const getRandomAnswer = async () => {
			const data = await getAnswers()
			setRandomAnswer(data.randomAnswer)
		}

		getRandomAnswer()
	}, [])

	return (
		<>
			<motion.div
				className='wrapper flex flex-col items-center leading-relaxed text-center'
				initial={{ opacity: 0 }}
				animate={{ opacity: [0, 1, 1, 0], display: 'none' }}
				transition={{ duration: 4, times: [0, 0.5, 3, 4] }}>
				<div className='mt-12 bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 text-[1.6rem] text-slate-300 overflow-hidden'>
					<motion.p>
						JA: &nbsp;
						<span className='text-yellow-300 font-semibold'>Cześć przyjacielu!</span>
					</motion.p>
				</div>
			</motion.div>

			<motion.div
				className='wrapper flex flex-col items-center leading-relaxed text-center'
				initial={{ opacity: 0, display: 'none' }}
				animate={{ opacity: [0, 1, 1, 0], display: ['none', 'flex', 'flex', 'none'] }}
				transition={{ duration: 4, times: [0, 0.5, 3, 4], delay: 4 }}>
				<div className='mt-12 bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 text-[1.6rem] text-slate-300 overflow-hidden'>
					<motion.p>
						Jestem w grze millionetzy i mam pytanie następującej treści: &nbsp;
						<span className='text-yellow-300'>{currentQuestion.text}</span>
					</motion.p>
				</div>
			</motion.div>

			<motion.div
				className='wrapper flex flex-col items-center leading-relaxed text-center'
				initial={{ opacity: 0, display: 'none' }}
				animate={{ opacity: [0, 1, 1, 0], display: ['none', 'flex', 'flex', 'none'] }}
				transition={{ duration: 5, times: [0, 0.5, 3, 5], delay: 8 }}>
				<div className='mt-12 bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 text-[1.6rem] text-slate-300 overflow-hidden'>
					<motion.p>
						i takie odpowiedzi:
						<br />
						{currentQuestion.answers.map((answer: string) => {
							return (
								<span key={answer} className='mx-4 text-yellow-300'>
									{answer}
								</span>
							)
						})}
					</motion.p>
				</div>
			</motion.div>

			<motion.div
				className='wrapper flex flex-col items-center leading-relaxed text-center'
				initial={{ opacity: 0, display: 'none' }}
				animate={{ opacity: [0, 1, 1, 0], display: ['none', 'flex', 'flex', 'none'] }}
				transition={{ duration: 6, times: [0, 0.5, 3, 6], delay: 13 }}>
				<div className='mt-12 bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 text-[1.6rem] text-slate-300 overflow-hidden'>
					<motion.p>
						PRZYJACIEL: &nbsp;
						<span className='text-yellow-300 font-semibold'>Cześć! Bardzo ciekawe pytanie! Daj mi pomyśleć...</span>
					</motion.p>
				</div>
			</motion.div>

			<motion.div
				className='wrapper flex flex-col items-center leading-relaxed text-center'
				initial={{ opacity: 0, display: 'none' }}
				animate={{ opacity: [0, 1, 1, 1], display: ['none', 'flex', 'flex', 'flex'] }}
				transition={{ duration: 5, times: [0, 0.5, 3, 5], delay: 19 }}>
				<div className='mt-12 bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 text-[1.6rem] text-slate-300 overflow-hidden'>
					<motion.p>
						Moja odpowiedź to: <span className='text-yellow-300 font-medium'>{randomAnswer}</span> <br />
						Mam nadzieję, że pomogłem 😊
					</motion.p>
				</div>
			</motion.div>
		</>
	)
}
