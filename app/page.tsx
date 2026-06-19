import Rules from '@/src/componnets/rules/Rules'
import Header from '@/src/componnets/header/Header'
import LeaderBoard from '@/src/componnets/rules/LeaderBoard'
import Footer from '@/src/componnets/rules/Footer'

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Rules />
				<LeaderBoard />
			</main>
			<Footer />
		</>
	)
}
