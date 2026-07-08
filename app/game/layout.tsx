export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main>
			<section className={`wrapper question flex flex-col items-center w-full`} id='question'>
				{children}
			</section>
		</main>
	)
}
