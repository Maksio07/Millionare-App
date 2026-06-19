'use client'
import { useTransition } from 'react'
import { startGame } from '@/app/actions/game'
import styles from './header.module.css'

export default function StartGameButton() {
	const [isPending, startTransition] = useTransition()
	return (
		<button
			type='button'
			name='start game'
			className={`${styles.header__start__btn} my-12 cursor-pointer`}
			onClick={() => startTransition(() => startGame())}
			disabled={isPending}>
			{isPending ? 'Losuję pytania...' : 'Zacznij grę'}
		</button>
	)
}
