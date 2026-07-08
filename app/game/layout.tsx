export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="wrapper">
			<section className={` question flex flex-col items-center w-full`} id='question'>
				{children}
			</section>
		</main>
	)
}
