import styles from './ui.module.css'

export default function Form({
	title,
	action,
	children,
	customStyles,
}: {
	title: string
	action: any
	children: React.ReactNode
	customStyles: string
}) {
	return (
		<>
			<h1 className='mb-12 text-center text-white text-5xl font-medium'>{title}</h1>
			<form
				action={action}
				className={`flex flex-col items-center justify-center p-4 w-160 max-[420px]:w-120 max-[325px]:w-100 ${styles.form} ${customStyles}`}>
				{children}
			</form>
		</>
	)
}
