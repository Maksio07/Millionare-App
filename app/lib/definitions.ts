import * as z from 'zod'
import { JWTPayload } from 'jose'

export const SignupFormSchema = z.object({
	name: z.string().min(2, { error: 'Powinno zawierać przynajmniej 2 znaki.' }).trim(),
	email: z.email({ error: 'Podany email nie jest poprawny.' }).trim(),
	password: z
		.string()
		.min(8, { error: 'Hasło powinno zawierać przynajmniej 8 znaków.' })
		.regex(/[a-zA-Z]/, { error: 'Hasło powinno zawierac conajmniej jedną wielką literę.' })
		.regex(/[0-9]/, { error: 'Hasło powinno zawierać conajmniej jedną cyfrę.' })
		.regex(/[^a-zA-Z0-9]/, {
			error: 'Hasło powinno zawierać conajmniej jeden znak specjalny.',
		})
		.trim(),
})

export const LoginFormSchema = z.object({
	email: z.email({error: 'Podano niepoprawny adres email.'}).trim(),
	password: z.string().min(1, {error: 'Hasło jest wymagane.'})
})

export type FormState =
	| {
			errors?: {
				name?: string[]
				email?: string[]
				password?: string[]
			}
			message?: string
	  }
	| undefined

export type SessionPayload = JWTPayload & {
	userId: string | number
	expiresAt: string | Date
	role?: 'user' | 'admin'
}
