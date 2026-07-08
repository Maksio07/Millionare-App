import { X } from 'lucide-react'

export default function LoginModal({ message, onClick }: { message: string; onClick: any }) {
	return (
		<div className='relative flex items-center justify-center mt-32 py-12 w-full bg-blue-950/40 border border-blue-800/60 rounded-xl'>
			<p className='text-white text-center text-[1.6rem]'>{message}</p>
			<X
				width={24}
				height={24}
				color='white'
				className='absolute top-2 right-4 cursor-pointer hover:scale-[1.1] transition-transform duration-300'
				onClick={onClick}
			/>
		</div>
	)
}
