'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { redirect } from 'next/navigation'
import { getHelpersData, handleGameHelpers } from '@/app/actions/game'
import HelperBtn from '@/src/UI/HelperBtn'
import ViewersModal from './ViewersModal'
import FriendCallBox from './FriendCallBox'
import Image from 'next/image'
import halfIcon from '@/public/icons/half-icon-v2.svg'
import { PhoneCall } from 'lucide-react'
import { Power } from 'lucide-react'
import { Users } from 'lucide-react'

export default function HelperBtns({
	onFiftyFiftyFilter,
	disabledAnswers,
	correctAnswerIndex,
	currentQuestion,
	questionNumber,
	questionPrice,
}: {
	onFiftyFiftyFilter: any
	disabledAnswers: any
	correctAnswerIndex: number
	currentQuestion: any
	questionNumber: number
	questionPrice: number
}) {
	const [helpersStatus, setHelpersStatus] = useState<{ name: string; available: boolean }[]>([])
	const [isViewersResultOpen, setIsViewersResultOpen] = useState<boolean>(false)
	const [isFriendCallOpen, setIsFriendCallOpen] = useState<boolean>(false)
	const [isQuitBtnClicked, setIsQuitBtnClicked] = useState<boolean>(false)

	useEffect(() => {
		getHelpersStatus()
	}, [disabledAnswers, isViewersResultOpen, isFriendCallOpen])

	const getHelpersStatus = async () => {
		const helpers = await getHelpersData()
		setHelpersStatus(helpers)
	}

	const handleViewersPanel = async () => {
		await handleGameHelpers('public', false)
		setIsViewersResultOpen(prevState => !prevState)
		document.body.classList.toggle('active-shadow')
	}

	const makeAFriendCall = async () => {
		await handleGameHelpers('friendCall', false)
		setIsFriendCallOpen(prevState => !prevState)
	}

	const handleQuitBtn = () => {
		setIsQuitBtnClicked(prevState => !prevState)
		redirect(`/game/game-over?quesnumber=${questionNumber + 1}&money=${questionPrice}`)
	}

	let fiftyBtnStatus = helpersStatus.find((item: { name: string }) => item.name === '50/50')
	let viewers = helpersStatus.find((item: { name: string }) => item.name === 'public')
	let friendCall = helpersStatus.find((item: { name: string }) => item.name === 'friendCall')

	return (
		<>
			{isFriendCallOpen && <FriendCallBox currentQuestion={currentQuestion} />}
			<div className='flex justify-center gap-12 flex-wrap my-12 '>
				<HelperBtn
					name='50/50'
					icon={<Image width={48} height={48} src={halfIcon} alt='50/50 Icon' />}
					onClick={onFiftyFiftyFilter}
					disabled={fiftyBtnStatus?.available === false || false}
				/>
				<HelperBtn
					name='Viewers'
					icon={<Users width={48} height={48} />}
					onClick={handleViewersPanel}
					disabled={viewers?.available === false || false}
				/>
				<HelperBtn
					name='Phone'
					icon={<PhoneCall width={48} height={48} />}
					disabled={friendCall?.available === false || false}
					onClick={makeAFriendCall}
				/>
				<HelperBtn
					name='Quit'
					icon={<Power width={48} height={48} />}
					onClick={handleQuitBtn}
					disabled={isQuitBtnClicked}
				/>
				{isViewersResultOpen &&
					createPortal(
						<ViewersModal onHandleModal={handleViewersPanel} correctAnswerIndex={correctAnswerIndex} />,
						document.body
					)}
			</div>
		</>
	)
}
