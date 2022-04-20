import { Box, Tabs, Tab } from '@mui/material'
import {
	HomeOutlined,
	AssignmentOutlined,
	Inventory2Outlined
} from '@mui/icons-material'
import Image from 'next/image'
import { AdminMenuContainer } from 'styles/components/admin/adminMenu'

const AdminMenu = () => {
	return (
		<AdminMenuContainer>
			<Box className='logo-container'>
				<Image
					src='/images/logo/header-logo.png'
					alt='logo'
					width='90'
					height='60'
				/>
			</Box>
			<Tabs orientation='vertical'>
				<Tab icon={<HomeOutlined />} label='HOME' />
				<Tab icon={<AssignmentOutlined />} label='ORDERS' />
				<Tab icon={<Inventory2Outlined />} label='INVENTORY' />
			</Tabs>
		</AdminMenuContainer>
	)
}

export default AdminMenu
