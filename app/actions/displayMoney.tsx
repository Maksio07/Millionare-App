'use server'

import { cookies } from 'next/headers'
import { query } from '../lib/db'
import { decrypt } from '../lib/session'

export async function getUserData() {
	const cookieStore = await cookies()
	const session = cookieStore.get('session')

	if (!session || !session.value) {
		return null
	}

	try {
		const payload = await decrypt(session.value)
		return payload
	} catch (error) {
		return null
	}
}

export async function addUserMoney(amount: any, user_id: number | string) {
	if (user_id === undefined || amount === undefined) {
		return {
			message: 'Coś poszło nie tak.',
		}
	}

	try {
		const sql = 'INSERT INTO money (amount, user_id) VALUES($1, $2) RETURNING *'
		const res = await query(sql, [amount, user_id])

		const data = res?.rows?.[0]

		if (!data) {
			return {
				message: 'Coś poszło nie tak.',
			}
		}
	} catch (error) {
		return {
			message: 'Coś poszło nie tak.',
		}
	}
}

export async function getUserMoney() {
	try {
		const sql = `SELECT amount, u.name 
						FROM money AS m 
						INNER JOIN users as u ON u.id = m.user_id
						ORDER BY m.amount::int DESC
						LIMIT 5`

		const res = await query(sql, [])
		const data = res?.rows

		if (!data) {
			return {
				message: 'Coś poszło nie tak.',
			}
		}

		return data
	} catch (error) {
		return {
			message: 'Coś poszło nie tak.',
		}
	}
}
