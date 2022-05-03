import { useState, createContext } from 'react'

export const TextContext = createContext<any>(null)
interface Props {
	children: any
}
const TextContextProvider = ({ children }: Props) => {
	const [headerTitle, setHeaderTitle] = useState('')
	return (
		<TextContext.Provider value={{ headerTitle, setHeaderTitle }}>
			{children}
		</TextContext.Provider>
	)
}

export default TextContextProvider
