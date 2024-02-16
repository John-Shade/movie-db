import { Alert } from 'antd'

export default function WarningMessage() {
  return <Alert message="Фильмы по запросу не найдены" type="warning" style={{ marginTop: '20px' }} />
}
