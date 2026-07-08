'use client'

import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import NavLink from './NavLink'
import Image from 'next/image'
import loginIcon from '@/public/icons/login.svg'
import signupIcon from '@/public/icons/addUser.svg'

export default function MobileNavigation({ isLogin, onLogoutUser }: { isLogin: boolean; onLogoutUser: any }) {
	const path: string = usePathname()
	return (
		<div className='flex mr-4'>
			{isLogin ? (
				<NavLink href='/' customStyles={''} onClick={onLogoutUser}>
					<LogOut />
				</NavLink>
			) : (
				<>
					<NavLink
						href={'/login'}
						customStyles={`flex flex-col items-center mr-[2.2rem] ${path === '/login' && 'active__link'}`}
						onClick={''}>
						<Image src={loginIcon} height={24} width={24} alt='login icon' />
					</NavLink>
					<NavLink
						href={'/signup'}
						customStyles={`flex flex-col items-center ${path === '/signup' && 'active__link'}`}
						onClick={''}>
						<Image src={signupIcon} height={24} width={24} alt='signup icon' />
					</NavLink>
				</>
			)}
		</div>
	)
}
