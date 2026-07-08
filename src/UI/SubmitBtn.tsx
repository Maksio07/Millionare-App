import styles from './ui.module.css'

export default function SubmitBtn({ title, disabled }: { title: string; disabled: boolean }) {
	return (
		<button type='submit' name={title} className={`${styles.submit__btn}`} disabled={disabled}>
			{title}
		</button>
	)
}
