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
import { useRouter } from 'next/router'
import { Categories } from 'constant'

const CategoryList = () => {
	const router = useRouter()
	const categoryName = router.query.categoryName as string
	const [openCategory, setOpenCategory] = useState(true)
	const { handleChangeCategory } = useContext(ProductContext)
	const handleClickOpenCategoryList = () => {
		setOpenCategory(!openCategory)
	}
	const clickChangeCategory = (category: Category) => {
		router.push(`/product-list/${category.name}`)
		handleChangeCategory()
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
						{Categories.map((item: Category, index: number) => (
							<ListItemButton
								key={index}
								disableRipple
								onClick={() => {
									clickChangeCategory(item)
								}}
							>
								<ListItemText
									sx={
										categoryName === item.name
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
