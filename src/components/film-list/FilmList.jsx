import { Row } from 'antd'

import Film from '../film/Film'
import './FilmList.css'

export default function FilmList({ data }) {
  const row = []
  let index = 0
  const lastRow = data.length % 2 === 0 ? 2 : 1
  for (let m = 0; m < Math.ceil(data.length / 2); m += 1) {
    const col = []
    index = m * 2
    for (; index < m * 2 + (m + 1 >= data.length / 2 ? lastRow : 2); index += 1) {
      col.push(<Film key={index} data={data[index]} />)
    }
    row.push(
      <Row key={m} className="film-row">
        {col}
      </Row>
    )
  }

  return <div>{row}</div>
}
