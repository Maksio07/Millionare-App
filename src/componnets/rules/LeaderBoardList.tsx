import leaderboardData from '@/src/componnets/rules/leaderbordData.json'
import { Award } from 'lucide-react'
import styles from './rules.module.css'

export default function LeaderBoardList() {
	return (
		<ul>
			{leaderboardData.map((item, index) => {
				const delay = index * 0.05
				return (
					<li
						key={item.id}
						id={item.id}
						className={`${styles.leaderboard__item} relative flex items-center justify-evenly mb-8 pt-8 pb-8 pl-4 pr-4 w-180 h-12 text-white text-3xl text-wrap rounded-md max-[470px]:w-120 max-[320px]:w-100`}
						style={{ '--delay': `${delay}s` } as React.CSSProperties}>
						<Award color='gold' className='absolute left-4' />
						<p>{item.name}</p>
						<p>{item.wonAmount}</p>
					</li>
				)
			})}
		</ul>
	)
}
