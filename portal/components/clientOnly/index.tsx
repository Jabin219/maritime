import { useEffect, useState, Fragment } from 'react'

const ClientOnly = ({ children, ...delegated }: any) => {
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) return null

	return <Fragment {...delegated}>{children}</Fragment>
}

export default ClientOnly
