import Link from 'next/link'
import LeaderBoardList from './LeaderBoardList'

export default function LeaderBoard() {
	return (
		<section id='leaders' className='leaderboard mb-12 w-full'>
			<div className='wrapper flex flex-col items-center'>
				<h2 className='mb-12 text-center text-5xl text-white font-medium'>Tabela Liderów</h2>
				<div className='mb-12 bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 text-[1.6rem] text-slate-300'>
					<p className='leading-relaxed text-center'>
						⚡ <strong className='text-blue-400'>Grasz anonimowo?</strong> Twoje wyniki nie zostaną zapisane.
						<Link href='/signup' className='text-yellow-400 font-semibold hover:underline transition'>
							<br /> Zarejestruj się w 10 sekund
						</Link>
						, aby zapisać swój wynik i trafić na tablicę liderów!
					</p>
				</div>
				<LeaderBoardList />
			</div>
		</section>
	)
}
