import { Alert } from 'antd'

function ErrorMessage() {
  return (
    <Alert
      message="Ошибка в получении данных. Попробуйте перезагрузить страницу"
      type="error"
      style={{ marginTop: '20px' }}
    />
  )
}

export default ErrorMessage
