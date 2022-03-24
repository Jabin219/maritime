import { Box, Grid } from '@mui/material'
import AdminMenu from 'components/admin/adminMenu'
import AdminLogin from './login'
import AdminOrders from './orders'
const AdminHome = () => {
	if (typeof window !== 'undefined') {
		if (!localStorage.getItem('adminToken')) {
			return <AdminLogin />
		} else {
			return (
				<Grid container>
					<Grid item xs={0.6}>
						<AdminMenu />
					</Grid>
					<Grid item xs>
						<AdminOrders />
					</Grid>
				</Grid>
			)
		}
	}

	return <Box>Enter</Box>
}

export default AdminHome
