import Link from 'next/link'

interface Props {
	children: any
	href: string
}
function CustomLink({ children, href }: Props) {
	return (
		<Link href={href}>
			<a>{children}</a>
		</Link>
	)
}

export default CustomLink
