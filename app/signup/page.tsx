'use client'

import { signup } from '../actions/auth'
import { useActionState, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ConfirmMessageContext } from '@/src/store/ConfirmMessageContext'
import Form from '@/src/UI/Form'
import InputBox from '@/src/UI/InputBox'
import SubmitBtn from '@/src/UI/SubmitBtn'
import Error from '@/src/UI/Error'

export default function SignupPage() {
	const [state, action, pending] = useActionState(signup, undefined)
	const router = useRouter()
	const confirmMessageCtx = useContext(ConfirmMessageContext)

	useEffect(() => {
		if (state?.message === 'Rejestracja zakończona sukcesem!') {
			confirmMessageCtx?.handleMessage('Rejestracja zakończona sukcesem!')
			router.push('/login')
		}
	}, [state?.message, router, confirmMessageCtx])

	return (
		<main className='max-w-[420px]:pt-32'>
			<section className='wrapper flex flex-col items-center justify-center min-h-screen'>
				<Form action={action} title={'Utwórz Konto'} customStyles='min-h-180 max-[420px]:min-h-220'>
					<InputBox name='name' title='Imię' type='text' />
					{state?.errors?.name && <Error message={state.errors.name} />}
					<InputBox name='email' title='Email' type='email' />
					{state?.errors?.email && <Error message={state.errors.email} />}
					<InputBox name='password' title='Hasło' type='password' />
					{state?.errors?.password && (
						<div>
							<ul>
								{state.errors.password.map(err => {
									return (
										<li key={err}>
											<Error message={err} />
										</li>
									)
								})}
							</ul>
						</div>
					)}
					<SubmitBtn title='Utwórz Konto' disabled={pending} />
				</Form>
			</section>
		</main>
	)
}
