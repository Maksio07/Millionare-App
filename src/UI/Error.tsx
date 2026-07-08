export default function Error({ message }: { message: string | any}) {
	return <p className='mb-4 text-[1.6rem] text-center text-red-500'>{message}</p>
}
