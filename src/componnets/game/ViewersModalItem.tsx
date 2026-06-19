import styles from './game.module.css'

export default function ViewersModalItem({ name, height, id }: { name: string; height: string, id: string }) {
	return (
		<div className={`${styles.diagram__box} bg-transparent h-34`} id={id}>
			<p className='-mt-10 text-2xl text-white'>{height}</p>
			<div style={{ height: `${height}` }} className='bg-(--gold) w-full my-4'></div>
			<p className='absolute -bottom-10 left-[50%] translate-x-[-50%] text-2xl text-white'>{name}</p>
		</div>
	)
}
