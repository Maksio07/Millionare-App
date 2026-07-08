import styles from './ui.module.css'

export default function InputBox({ name, title, type }: { name: string; title: string; type: string }) {
	return (
		<div className='flex flex-col mb-10'>
			<label htmlFor={name} className='text-white text-3xl text-center mb-6'>
				{title}
			</label>
			<input type={type} placeholder={title} id={name} name={name} className={`${styles.input}`} required />
		</div>
	)
}
