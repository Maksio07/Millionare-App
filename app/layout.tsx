import { Roboto } from 'next/font/google'
import Navigation from '@/src/componnets/navigation/Navigation'
import ConfirmMessageContextProvider from '@/src/store/ConfirmMessageContext'
import './globals.css'

export const metadata = {
	title: 'Millionaire Quiz App',
	description: 'Zagraj w kultową grę quizową i ciesz się z wirtualnej wygranej.',
}

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pl' className={roboto.className}>
			<ConfirmMessageContextProvider>
				<body>
					<Navigation />
					{children}
				</body>
			</ConfirmMessageContextProvider>
		</html>
	)
}
