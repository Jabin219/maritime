import { Box, Grid } from '@mui/material'
import AdminLogin from './login'
import AdminOrders from './orders'
const AdminHome = () => {
	if (typeof window !== 'undefined') {
		if (!localStorage.getItem('adminToken')) {
			return <AdminLogin />
		} else {
			return (
				<Grid container>
					<Grid item></Grid>
					<Grid item>
						<AdminOrders />
					</Grid>
				</Grid>
			)
		}
	}

	return <Box>Enter</Box>
}

export default AdminHome
