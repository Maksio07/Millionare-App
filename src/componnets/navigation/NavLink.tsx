import Link from 'next/link'
import styles from './navigation.module.css'

export default function NavLink({
	children,
	href,
	onClick,
	customStyles,
}: {
	children: any
	href: string
	customStyles: any
	onClick: any
}) {
	return (
		<Link
			href={href}
			className={`${styles.nav__link} font-medium text-white text-[1.6rem] ${customStyles}`}
			onClick={onClick}>
			{children}
		</Link>
	)
}
