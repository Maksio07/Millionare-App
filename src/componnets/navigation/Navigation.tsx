'use client'

import { useState, useEffect, Suspense, useContext } from 'react'
import { checkIsUserLogin } from '@/app/actions/auth'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { ConfirmMessageContext } from '@/src/store/ConfirmMessageContext'
import IsLoginNavigation from './IsLoginNavigation'
import MobileNavigation from './MobileNavigation'
import useWindowSize from '@/src/hooks/useWindowSize'
import NavLink from './NavLink'
import Image from 'next/image'
import logo from '@/public/logo.jpg'
import styles from './navigation.module.css'

function NavigationComponent() {
	const [pathWithHash, setPathWithHash] = useState<string>('')
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const searchParams = useSearchParams()
	const path: string = usePathname()
	const width = useWindowSize()
	const confirmMessageCtx = useContext(ConfirmMessageContext)

	useEffect(() => {
		setPathWithHash(path + window.location.hash)

		const isUserLoginCheck = async () => {
			const loggedIn = await checkIsUserLogin()
			setIsLogin(loggedIn)
		}

		isUserLoginCheck()
	}, [path, searchParams, isLogin])

	const logoutUser = async () => {
		confirmMessageCtx?.handleMessage('Jesteś wylogowany/-a.')
		await logout()
	}

	return (
		<nav className={`${styles.nav} fixed flex w-full h-32`}>
			<div className='wrapper flex items-center justify-between'>
				<div className='flex items-center ml-4'>
					<Link href={'/'}>
						<Image
							src={logo}
							alt='An millionaire show image.'
							width={80}
							height={80}
							className='rounded-[100%]'
							loading='eager'
							fetchPriority='high'
						/>
					</Link>
					<NavLink
						href='/#rules'
						customStyles={`ml-[2.2rem] ${pathWithHash === '/#rules' && `${styles.active__link}`}`}
						onClick={''}>
						Jak grać
					</NavLink>
				</div>
				{width < 420 ? (
					<MobileNavigation isLogin={isLogin} onLogoutUser={logoutUser} />
				) : (
					<IsLoginNavigation isLogin={isLogin} path={path} onLogoutUser={logoutUser} />
				)}
			</div>
		</nav>
		
	)
}

export default function Navigation() {
	return (
		<Suspense fallback={<p className='text center text-3xl text-white'>Loading...</p>}>
			<NavigationComponent />
		</Suspense>
	)
}
