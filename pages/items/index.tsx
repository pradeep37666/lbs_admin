import Head from 'next/head'
import React, { ReactElement } from 'react'
import PageWrapper from '../../components/core/page-wrapper'

function Items() {
	return <div>Items</div>
}

Items.getLayout = function getLayout(page: ReactElement) {
	return (
		<PageWrapper>
			<Head>
				<title>Items</title>
			</Head>

			{page}
		</PageWrapper>
	)
}

export default Items
