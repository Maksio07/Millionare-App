import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import ViewersModalItem from './ViewersModalItem'
import data from '@/src/data/viewersModalData.json'
import { generateNumbersWithSum } from '@/src/util/generateRandomNumbers'
import styles from './game.module.css'

export default function ViewersModal({
	onHandleModal,
	correctAnswerIndex,
}: {
	onHandleModal: any
	correctAnswerIndex: number
}) {
	const [votes, setVotes] = useState<number[]>([])

	const viewersVote: Range[] = [
		{ min: 23, max: 45 },
		{ min: 15, max: 32 },
		{ min: 10, max: 30 },
		{ min: 14, max: 35 },
	]

	useEffect(() => {
		try {
			const result: number[] = generateNumbersWithSum(viewersVote, 100)
			setVotes(result)
		} catch (error: any) {
			throw new Error(error.message)
		}
	}, [])

	return (
		<>
			<div className={`${styles.modal__shadow}`}></div>
			<div
				className={`${styles.modal} fixed top-[50%] left-[50%] translate-x-[-50%] p-4 translate-y-[-50%] h-96 w-150 bg-red-100 z-50`}>
				<h3 className='my-8 text-center text-white text-[2.2rem]'>Głosy publiczności</h3>
				<X
					width={28}
					height={28}
					color='white'
					className={`${styles.closeBtn} absolute top-4 right-4 cursor-pointer`}
					onClick={onHandleModal}
				/>
				<div className={`${styles.diagram}`}>
					{data.map((item, index) => {
						const isCorrect = item.id === correctAnswerIndex
						const height = isCorrect ? votes[0] : index < correctAnswerIndex ? votes[index + 1] : votes[index]

						return <ViewersModalItem name={item.name} id={item.id.toString()} key={item.id} height={height + '%'} />
					})}
				</div>
			</div>
		</>
	)
}
