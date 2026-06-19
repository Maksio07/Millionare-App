import { usePathname } from 'next/navigation'
import NavLink from './NavLink'
import Image from 'next/image'
import loginIcon from '@/public/icons/login.svg'
import signupIcon from '@/public/icons/addUser.svg'

export default function MobileNavigation() {
	const path: string = usePathname()
	return (
		<div className='flex mr-4'>
			<NavLink
				href={'/login'}
				customStyles={`flex flex-col items-center mr-[2.2rem] ${path === '/login' && 'active__link'}`}>
				<Image src={loginIcon} height={24} width={24} alt='login icon' />
			</NavLink>
			<NavLink href={'/signup'} customStyles={`flex flex-col items-center ${path === '/signup' && 'active__link'}`}>
				<Image src={signupIcon} height={24} width={24} alt='signup icon' />
			</NavLink>
		</div>
	)
}
