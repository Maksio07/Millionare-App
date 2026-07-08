export default function ConfirmMessage({ message, customStyles }: { message: string | any; customStyles: string }) {
	return <p className={`text-[1.6rem] text-center text-green-500 ${customStyles}`}>{message}</p>
}
