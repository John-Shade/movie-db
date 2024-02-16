import { useState } from 'react'
import './Header.css'
import { Flex, Input } from 'antd'

let timeout
export default function Header({ onChange, query }) {
  const [inputText, setInputText] = useState(query)

  function debounce(e) {
    setInputText(e.target.value)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      onChange(e.target.value)
    }, 900)
  }

  return (
    <div className="input-text">
      <Flex vertical gap={12}>
        <Input placeholder="Поиск фильмов" onChange={(e) => debounce(e)} value={inputText} />
      </Flex>
    </div>
  )
}
