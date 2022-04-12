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
import { ProductContext } from 'context/ProductContextProvider'
import { Category } from 'models'

const CategoryList = () => {
	const [openCategory, setOpenCategory] = useState(true)
	const { selectedCategory, setSelectedCategory, categories } =
		useContext(ProductContext)
	const handleClickOpenCategoryList = () => {
		setOpenCategory(!openCategory)
	}
	const clickChangeCategory = (category: Category) => {
		setSelectedCategory(category)
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
						{categories.map((item: Category, index: number) => (
							<ListItemButton
								key={index}
								disableRipple
								onClick={() => {
									clickChangeCategory(item)
								}}
							>
								<ListItemText
									sx={
										selectedCategory.name === item.name
											? { '& span': { fontWeight: 600 } }
											: {}
									}
								>
									{item.label}
								</ListItemText>
							</ListItemButton>
						))}
					</List>
				</Collapse>
			</List>
		</Box>
	)
}

export default CategoryList
