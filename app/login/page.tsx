'use client'

import { useActionState, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../actions/auth'
import { ConfirmMessageContext } from '@/src/store/ConfirmMessageContext'
import Form from '@/src/UI/Form'
import InputBox from '@/src/UI/InputBox'
import SubmitBtn from '@/src/UI/SubmitBtn'
import Error from '@/src/UI/Error'
import ConfirmMessage from '@/src/UI/ConfirmMessage'

export default function Login() {
	const [state, action, pending] = useActionState(login, undefined)
	const router = useRouter()
	const confirmMessageCtx = useContext(ConfirmMessageContext)

	useEffect(() => {
		if (state?.message === 'Jesteś zalogowany/-a.') {
			confirmMessageCtx?.handleMessage(state?.message)
			router.push('/')
		}

		const timer = setTimeout(() => {
			confirmMessageCtx?.handleMessage('')
		}, 5000)

		return () => clearTimeout(timer)
	}, [state?.message, router, confirmMessageCtx])

	return (
		<main>
			<section className='wrapper flex flex-col items-center justify-center min-h-screen'>
				<ConfirmMessage message={confirmMessageCtx?.message} customStyles='mb-12' />
				<Form action={action} title='Zaloguj się' customStyles='min-h-160 max-[420px]:min-h-180'>
					<InputBox name='email' type='email' title='Email' />
					{state?.errors?.email && <Error message={state.errors.email} />}
					<InputBox name='password' type='password' title='Hasło' />
					{state?.errors?.password && <Error message={state.errors.password} />}
					<SubmitBtn disabled={pending} title='Zaloguj się' />
				</Form>
			</section>
		</main>
	)
}
