import NavLink from './NavLink'
import styles from './navigation.module.css'

export default function IsLoginNavigation({
	isLogin,
	path,
	onLogoutUser,
}: {
	isLogin: boolean
	path: string
	onLogoutUser: any
}) {
	return (
		<div className='flex mr-4'>
			{isLogin ? (
				<NavLink href='/' customStyles={''} onClick={onLogoutUser}>
					Wyloguj się
				</NavLink>
			) : (
				<>
					<NavLink
						href={'/login'}
						customStyles={`mr-[2.2rem] ${path === '/login' && `${styles.active__link}`}`}
						onClick={''}>
						Zaloguj się
					</NavLink>
					<NavLink href={'/signup'} customStyles={`${path === '/signup' && `${styles.active__link}`}`} onClick={''}>
						Utwórz konto
					</NavLink>
				</>
			)}
		</div>
	)
}
