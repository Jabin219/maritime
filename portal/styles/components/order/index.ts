import { Box } from '@mui/material'
import { styled } from '@mui/system'

export const CartSideSummaryContainer = styled(Box)({
	border: '10px solid #EEEEEE',
	padding: '25px 25px 40px 25px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	'& .header': {
		'& .title': {
			fontSize: '28px',
			fontWeight: 600,
			lineHeight: '40px',
			marginBottom: '10px'
		}
	},
	'& .summary': {
		marginTop: '25px',
		'& .label': {
			'& h6': {
				lineHeight: '40px'
			}
		},
		'& .shipping-label': { marginBottom: '25px' },
		'& .value': {
			'& p': {
				textAlign: 'right',
				lineHeight: '40px',
				whiteSpace: 'nowrap'
			}
		}
	},
	'& .btn-next-step': {
		margin: '70px 0 35px',
		padding: '10px 100px',
		borderRadius: '5px',
		backgroundColor: '#FF8800',
		color: '#ffffff',
		fontSize: 20,
		lineHeight: '30px',
		textTransform: 'none',
		'&:hover': {
			backgroundColor: '#FF8800'
		}
	}
})

export const ShoppingCartContainer = styled(Box)({
	border: '10px solid #EEEEEE',
	'.table-container': {
		width: '95%',
		margin: '0 auto',
		'& table': {
			marginTop: '20px'
		},
		'& th': {
			fontSize: 20,
			fontWeight: 600,
			lineHeight: '28px'
		},
		'& button': {
			width: '100%'
		},
		'& dev, td': {
			fontSize: 20,
			lineHeight: '28px'
		},
		'& h6': {
			lineHeight: '60px'
		},
		'& td': {
			verticalAlign: 'top'
		},
		'& .product-name, .product-price, .product-subtotal': {
			lineHeight: '40px'
		},
		'& .product-name': {
			position: 'relative',
			'& .icon-delete': {
				position: 'absolute',
				left: '-0.3vw',
				bottom: '10px',
				cursor: 'pointer'
			}
		},
		'& .product-quantity': {
			fontSize: 20,
			lineHeight: '30px',
			fontFamily: 'Myriad Pro'
		}
	},

	'& .subtotal-container': {
		padding: '20px 0',
		alignItems: 'flex-end',
		marginRight: '6.5vw',
		'& span': {
			fontWeight: 400
		}
	},
	'& .empty-cart-container': {
		padding: '170px 350px 265px',
		'& .image-container': {
			marginBottom: '60px'
		},
		'& p': {
			whiteSpace: 'nowrap',
			'& a': {
				textDecoration: 'underline'
			}
		}
	}
})

export const PaymentInfoContainer = styled(Box)({
	'& .StripeElement': {
		margin: '10px 0 20px 0',
		padding: '10px 14px',
		border: '1px solid #eeeeee',
		borderRadius: '4px',
		background: 'white'
	}
})

export const ContactFormContainer = styled(Box)({
	border: '10px solid #EEEEEE',
	paddingBottom: '50px',
	paddingTop: '32px',
	marginBottom: '20px',
	'& .contact-form-container': {
		width: '95%',
		margin: '0 auto'
	},
	'& .header': {
		marginBottom: '30px',
		'& h5': {
			marginBottom: '5px'
		}
	},
	'& .MuiTextField-root': {
		marginBottom: '20px'
	}
})

export const ShippingMethodContainer = styled(Box)({
	border: '10px solid #EEEEEE',
	paddingBottom: '50px',
	paddingTop: '32px',
	marginBottom: '20px',
	'& .shipping-method-container': {
		width: '95%',
		margin: '0 auto'
	},
	'& .header': {
		marginBottom: '30px',
		'& h5': {
			marginBottom: '5px'
		}
	},
	'& label': {
		color: '#404041'
	}
})

export const PaymentMethodContainer = styled(Box)({
	border: '10px solid #EEEEEE',
	padding: '35px 0 50px 0',
	marginBottom: '20px',
	'& .payment-method-container, .credit-info': {
		width: '95%',
		margin: '0 auto',
		'& .header': {
			marginBottom: '45px',
			'& h5': {
				marginBottom: '15px'
			}
		},
		'& label': {
			color: '#404041'
		}
	},
	'& .payment-method-container': {
		marginBottom: '100px'
	},
	'& .stripe_card-error': {
		position: 'absolute',
		color: '#e02020',
		fontSize: '16px',
		lineHeight: '20px',
		textAlign: 'center'
	}
})
