import {
	Box,
	Collapse,
	Divider,
	List,
	ListItemButton,
	ListItemText
} from '@mui/material'
import { useContext, useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ProductContext } from '../../context/ProductContextProvider'

interface Props {
	Categories: any[]
}

function CategoryList({ Categories }: Props) {
	const [openCategory, setOpenCategory] = useState(true)
	const [openPriceRange, setOpenPriceRange] = useState(true)
	const { category, setCategory } = useContext(ProductContext)
	const handleClickOpenCategoryList = () => {
		setOpenCategory(!openCategory)
	}
	const handleClickOpenPriceRangeList = () => {
		setOpenPriceRange(!openPriceRange)
	}
	const clickChangeCategory = (categoryValue: string) => {
		setCategory(categoryValue)
	}
	return (
		<Box
			sx={{
				backgroundColor: '#F8F8F8',
				margin: '60px 2vw 0 3vw'
			}}
		>
			<List>
				<ListItemButton disableRipple onClick={handleClickOpenCategoryList}>
					<ListItemText
						primary='Category'
						sx={{
							'& span': { fontWeight: 700, fontSize: 28, lineHeight: '25px' }
						}}
					/>
					{openCategory ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Divider variant='middle' />
				<Collapse
					in={openCategory}
					timeout='auto'
					unmountOnExit
					sx={{ marginTop: '20px' }}
				>
					<List component='div' disablePadding>
						{Categories.map((item, index) => (
							<ListItemButton
								key={index}
								disableRipple
								onClick={() => {
									clickChangeCategory(item.value)
								}}
							>
								<ListItemText
									sx={
										category === item.value
											? { '& span': { fontWeight: 600 } }
											: {}
									}
								>
									{item.name}
								</ListItemText>
							</ListItemButton>
						))}
					</List>
				</Collapse>
				<ListItemButton disableRipple onClick={handleClickOpenPriceRangeList}>
					<ListItemText
						primary='Price Range'
						sx={{
							'& span': { fontWeight: 700, fontSize: 28, lineHeight: '25px' }
						}}
					/>
					{openPriceRange ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Divider variant='middle' />
			</List>
		</Box>
	)
}

export default CategoryList
