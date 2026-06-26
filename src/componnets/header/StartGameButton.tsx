'use client'
import { useTransition } from 'react'
import { startGame } from '@/app/actions/game'
import styles from './header.module.css'

export default function StartGameButton({ text, customStyles }: { text: string; customStyles: string }) {
	const [isPending, startTransition] = useTransition()
	return (
		<button
			type='button'
			name='start game'
			className={`${styles.header__start__btn} cursor-pointer ${customStyles}`}
			onClick={() => startTransition(() => startGame())}
			disabled={isPending}>
			{isPending ? 'Losuję pytania...' : text}
		</button>
	)
}
