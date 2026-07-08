import styles from './ui.module.css'

export default function HelperBtn({
	name,
	icon,
	onClick,
	disabled,
}: {
	name: string
	icon: any
	onClick: any
	disabled: boolean
}) {
	return (
		<button name={name} type='button' className={styles.helper__btn} onClick={onClick} disabled={disabled} aria-label='name'>
			{icon}
		</button>
	)
}
