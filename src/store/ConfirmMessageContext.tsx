'use client'

import { createContext, useState } from 'react'

interface confirmMessageType {
	message: string
	handleMessage: (value: string) => void
	showLoginModal: boolean | null
	handleShowLoginModal: (value: boolean) => void
}

export const ConfirmMessageContext = createContext<confirmMessageType | undefined>(undefined)

export default function ConfirmMessageContextProvider({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const [message, setMessage] = useState<string>('')
	const [showLoginModal, setShowLoginModal] = useState<boolean>(true)

	function handleMessage(value: string) {
		setMessage(value)
	}

	function handleShowLoginModal(value: boolean) {
		setShowLoginModal(value)
	}

	const value: confirmMessageType = {
		message,
		handleMessage,
		showLoginModal,
		handleShowLoginModal,
	}

	return <ConfirmMessageContext.Provider value={value}>{children}</ConfirmMessageContext.Provider>
}
