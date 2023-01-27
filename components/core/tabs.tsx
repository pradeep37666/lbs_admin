import React from 'react'
import { Tab } from '../../types/types'

type Props = {
	tabs: Tab[]
	activeTab: Tab
	setActiveTab: (tab: Tab) => void
}

function Tabs({ tabs, activeTab, setActiveTab }: Props) {
	const renderTabs = () => {
		return tabs.map((tab, index) => {
			return (
				<div
					onClick={() => setActiveTab(tab)}
					key={index}
					className={`p-2 cursor-pointer rounded-md text-[14px] transition-all font-bold ${
						activeTab === tab ? 'bg-blue-dark text-white' : 'bg-grey-light'
					}`}
				>
					{tab.name}
				</div>
			)
		})
	}

	return <div className='flex bg-grey-light rounded-md'>{renderTabs()}</div>
}

export default Tabs
