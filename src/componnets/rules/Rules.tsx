import { CircleQuestionMark } from 'lucide-react'
import { PhoneCall } from 'lucide-react'
import { Power } from 'lucide-react'
import { Users } from 'lucide-react'
import halfIcon from '@/public/icons/half-icon.svg'
import Image from 'next/image'
import styles from './rules.module.css'

export default function Rules() {
	return (
		<section id='rules' className='rules'>
			<div className='wrapper'>
				<h2 className='text-center text-5xl text-white font-medium'>Jak grać?</h2>
				<div className='rules__container flex gap-24 flex-wrap items-center justify-center w-full my-16'>
					<div className={`${styles.rules__card} ${styles.rules__card__one}`}>
						<button className={`${styles.rules__btn}`} name='Question mark' type='button' aria-label='Question mark'>
							<CircleQuestionMark width={36} height={36} />
						</button>
						<div className={`${styles.rules__text}`}>
							<h3 className={`${styles.rules__title} mb-12`}>Droga do Miliona</h3>
							<p className='text-[1.6rem]'>12 pytań, 4 warianty odpowiedzi (A, B, C, D). Tylko jedna poprawna.</p>
						</div>
					</div>
					<div className={`${styles.rules__card} ${styles.rules__card__two}`}>
						<button className={`${styles.rules__btn}`} name='Question mark' type='button' aria-label='Question mark'>
							<CircleQuestionMark width={36} height={36} />
						</button>
						<div className={`${styles.rules__text}`}>
							<h3 className={`${styles.rules__title} mb-12`}>Grasz bezpiecznie</h3>
							<p className='text-[1.6rem]'>
								Sumy gwarantowane po 2 oraz 7 pytaniu. Jeśli odpowiesz błędnie po ich przekroczeniu, nie odchodzisz z
								niczym.
							</p>
						</div>
					</div>
					<div className={`${styles.rules__card} ${styles.rules__card__three}`}>
						<button className={`${styles.rules__btn}`} name='Question mark' type='button' aria-label='Question mark'>
							<CircleQuestionMark width={36} height={36} />
						</button>
						<div className={`${styles.rules__text}`}>
							<h3 className={`${styles.rules__title} mb-12 max-[320px]:mb-6`}>Potrzebujesz pomocy?</h3>
							<ul>
								<li className='flex flex-col items-center justify-center mb-12 max-[320px]:mb-6'>
									<Image src={halfIcon} alt='50/50 icon' height={48} width={48} className='mb-8' />
									<p className='text-[1.6rem]'>Odrzuca dwie błędne odpowiedzi</p>
								</li>
								<li className='flex flex-col items-center justify-center mb-12 max-[320px]:mb-6'>
									<PhoneCall className='mb-8' height={48} width={48} color='#2563EB' />
									<p className='text-[1.6rem]'>Podpowiedź od wirtualnego eksperta</p>
								</li>
								<li className='flex flex-col items-center justify-center mb-12 max-[320px]:mb-6'>
									<Users className='mb-8' height={48} width={48} color='#2563EB' />
									<p className='text-[1.6rem]'>Wykres słupkowy, pokazujący jak głosowali widzowie.</p>
								</li>
							</ul>
						</div>
					</div>
					<div className={`${styles.rules__card} ${styles.rules__card__four}`}>
						<button className={`${styles.rules__btn}`} name='Question mark' type='button' aria-label='Question mark'>
							<CircleQuestionMark width={36} height={36} />
						</button>
						<div className={`${styles.rules__text} flex flex-col items-center justify-center`}>
							<h3 className={`${styles.rules__title} mb-12`}>Wycofaj się w porę</h3>
							<Power className='mb-12' height={48} width={48} color='#2563EB' />
							<p className='text-[1.6rem]'>
								Nie znasz odpowiedzi? Możesz zrezygnować i zabrać dotychczas zarobione pieniądze.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
