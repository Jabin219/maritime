import { createContext, useReducer } from 'react'
import CustomSnackBar from '../components/customSnackBar'
export const SnackContext = createContext<ContextData>({
	showSnackbar: () => {}
})

interface State {
	snackType: string
	snackOpen: boolean
}
const initialState: State = {
	snackType: '',
	snackOpen: false
}
type Action =
	| { type: 'close' }
	| {
			type: 'open'
			payload: { snackType: string }
	  }
export type ContextData = {
	showSnackbar: (snackType: string) => void
}
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'close':
			return { ...state, snackOpen: false }
		case 'open':
			return {
				...state,
				snackOpen: true,
				snackType: action.payload.snackType
			}
		default:
			return { ...initialState }
	}
}

const SnackContextProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const snackClose = () => {
		dispatch({ type: 'close' })
	}
	const showSnackbar = (snackType: string) => {
		dispatch({ type: 'open', payload: { snackType } })
	}
	return (
		<SnackContext.Provider
			value={{
				showSnackbar
			}}
		>
			<CustomSnackBar
				open={state.snackOpen}
				snackClose={snackClose}
				snackType={state.snackType}
			/>
			{children}
		</SnackContext.Provider>
	)
}

export default SnackContextProvider
