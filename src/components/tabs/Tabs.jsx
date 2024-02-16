import { Tabs } from 'antd'
import { memo } from 'react'

let count = 0
function TabsList({ choiseState, setChoiseState, setPageState }) {
  count += 1
  console.log(`COUNT -- ${count}`)
  console.log('TabsList')
  function onClick(e) {
    setPageState(1)
    console.log(`e -- ${e}`)
    if (e === 1) setChoiseState('search')
    if (e === 2) setChoiseState('rated')
  }

  return (
    <Tabs
      defaultActiveKey={1}
      centered
      onTabClick={(e) => onClick(e)}
      activeKey={choiseState === 'search' ? 1 : 2}
      items={[
        { label: 'Search', key: 1 },
        { label: 'Rated', key: 2 },
      ]}
    />
  )
}

export default memo(TabsList, (prev, next) => {
  if (prev.choiseState === next.choiseState) return true
  return false
})
