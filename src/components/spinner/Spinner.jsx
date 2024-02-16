import './Spinner.css'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function Spinner() {
  return <Spin className="spin" indicator={<LoadingOutlined style={{ fontSize: 160 }} />} />
}
