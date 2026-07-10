'use server'

import { SignupFormSchema, FormState, LoginFormSchema } from '../lib/definitions'
import { cookies } from 'next/headers'
import { query } from '../lib/db'
import { createSession, deleteSession } from '../lib/session'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
	const validatedFields = SignupFormSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	try {
		const { name, email, password } = validatedFields.data
		const hashedPassword = await bcrypt.hash(password, 10)
		const checkUser = 'SELECT email FROM users WHERE email = $1'
		const existingUser = await query(checkUser, [email])

		if (existingUser?.rows && existingUser.rows.length > 0) {
			return {
				errors: {
					email: ['Użytkownik z podanym emailem istnieje.'],
				},
			}
		}

		const sql = 'INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *'

		const res = await query(sql, [name, email, hashedPassword])
		const user = res?.rows?.[0]

		if (!user) {
			return {
				message: 'Coś poszło nie tak.',
			}
		}

		return {
			message: 'Rejestracja zakończona sukcesem!',
		}
	} catch (error: any) {
		if (error.code === '23505') {
			return {
				errors: {
					email: ['Ten adres e-mail jest już zajęty.'],
				},
			}
		}

		return {
			message: 'Błąd bazy danych. Spróbuj ponownie później.',
		}
	}
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
	const validatedFields = LoginFormSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { email, password } = validatedFields.data

	try {
		const sql = 'SELECT * FROM users WHERE email = $1'
		const res = await query(sql, [email])
		const user = res?.rows?.[0]

		if (!user) {
			return {
				errors: {
					email: ['Niepoprawny email lub hasło.'],
				},
			}
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return {
				errors: {
					password: ['Niepoprawny email lub hasło.'],
				},
			}
		}

		await createSession(user.id)

		return {
			message: 'Jesteś zalogowany/-a.',
		}
	} catch (error) {
		return {
			message: 'Coś poszło nie tak.',
		}
	}
}

export async function logout() {
	await deleteSession()
	
	redirect('/login')
}

export async function checkIsUserLogin() {
	const cookieStore = await cookies()
	const isLogin: boolean = cookieStore.get('session') !== undefined

	return isLogin
}

