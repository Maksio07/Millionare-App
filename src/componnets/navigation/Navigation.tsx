'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import MobileNavigation from './MobileNavigation'
import useWindowSize from '@/src/hooks/useWindowSize'
import NavLink from './NavLink'
import Image from 'next/image'
import logo from '@/public/logo.jpg'
import styles from './navigation.module.css'

export default function Navigation() {
	const [pathWithHash, setPathWithHash] = useState<string>('')
	const searchParams = useSearchParams()
	const path: string = usePathname()
	const width = useWindowSize()

	useEffect(() => {
		setPathWithHash(path + window.location.hash)
	}, [path, searchParams])

	return (
		<Suspense fallback={<p className='text center text-3xl text-white'>Loading...</p>}>
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
							/>
						</Link>
						<NavLink
							href='/#zasady'
							customStyles={`ml-[2.2rem] ${pathWithHash === '/#zasady' && `${styles.active__link}`}`}>
							Jak grać
						</NavLink>
					</div>
					{width < 420 ? (
						<MobileNavigation />
					) : (
						<div className='flex mr-4'>
							<NavLink href={'/login'} customStyles={`mr-[2.2rem] ${path === '/login' && `${styles.active__link}`}`}>
								Zaloguj się
							</NavLink>
							<NavLink href={'/signup'} customStyles={`${path === '/signup' && `${styles.active__link}`}`}>
								Utwórz konto
							</NavLink>
						</div>
					)}
				</div>
			</nav>
		</Suspense>
	)
}
