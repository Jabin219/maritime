import { Button } from '@mui/material'
import { OrderStatus } from 'constants/index'
import React from 'react'
import { styled } from '@mui/system'

interface Props {
	content: string
	orderStatus: string
}

const StatusButton = styled(Button)({
	borderRadius: '20px',
	fontFamily: 'Inter',
	fontSize: 12,
	fontWeight: 600,
	lineHeight: '20px',
	padding: '4px 16px',
	textTransform: 'none'
})

const OrderStatusButton = ({ content, orderStatus }: Props) => {
	const getButtonColor = (orderStatus: string) => {
		switch (orderStatus) {
			case OrderStatus.reserved:
				return {
					color: '#ff3d00',
					backgroundColor: '#FFDFC1',
					'&:hover': {
						backgroundColor: '#FFDFC1'
					}
				}
				break
			case OrderStatus.paid:
				return {
					color: '#249F5D',
					backgroundColor: '#DCFBEA',
					'&:hover': {
						backgroundColor: '#DCFBEA'
					}
				}
				break
			case OrderStatus.expired:
				return {
					color: '#C4C4C4',
					backgroundColor: '#F7F7F9',
					'&:hover': {
						backgroundColor: '#F7F7F9'
					}
				}
				break
			case OrderStatus.completed:
				return {
					color: '#6F727A',
					backgroundColor: '#F7F7F9',
					'&:hover': {
						backgroundColor: '#F7F7F9'
					}
				}
				break
			default:
				break
		}
	}

	return (
		<StatusButton
			sx={getButtonColor(orderStatus)}
			disableRipple
			disableElevation
		>
			{content}
		</StatusButton>
	)
}

export default OrderStatusButton
