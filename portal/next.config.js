/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['maritime-household-media.s3.ca-central-1.amazonaws.com']
	},
	env: {
		NEXT_PUBLIC_SERVER_BASE_URL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
		MONGODB_URL: process.env.MONGODB_URL,
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		SENDGRID_RESERVED_ORDER_TEMPLATE_ID:
			process.env.SENDGRID_RESERVED_ORDER_TEMPLATE_ID,
		SENDGRID_PAID_ORDER_TEMPLATE_ID:
			process.env.SENDGRID_PAID_ORDER_TEMPLATE_ID,
		SENDGRID_CONTACT_TEMPLATE_ID: process.env.SENDGRID_CONTACT_TEMPLATE_ID
	}
}

module.exports = nextConfig
