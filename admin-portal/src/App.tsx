import Login from './pages/login'
import { Routes, Route } from 'react-router-dom'

const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Login />} />
			</Routes>
		</div>
	)
}

export default App
