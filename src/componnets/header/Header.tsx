import Image from 'next/image'
import StartGameButton from './StartGameButton'
import logo from '@/public/logo.jpg'
import styles from './header.module.css'

export default function Header() {
	return (
		<header className='header w-full mt-32 mx-4'>
			<div className='wrapper flex flex-col items-center'>
				<h1 className='my-16 text-6xl text-center text-white font-bold max-[600px]:text-5xl max-[600px]:leading-[-0.5]'>
					12 pytań, 3 koła ratunkowe, 1 milion złotych. Podejmiesz wyzwanie?
				</h1>
				<Image
					src={logo}
					alt='An millionaire show image.'
					width={500}
					height={500}
					className={`${styles.header__image} rounded-[100%]`}
					loading='eager'
				/>
				<StartGameButton />
			</div>
		</header>
	)
}
