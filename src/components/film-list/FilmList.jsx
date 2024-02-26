import { Row } from 'antd'

import Film from '../film/Film'
import './FilmList.css'

export default function FilmList({ data }) {
  const allItems = []
  let indexInSection = 0
  const lastRow = data.length % 2 === 0 ? 2 : 1
  for (let indexRow = 0; indexRow < Math.ceil(data.length / 2); indexRow += 1) {
    const oneSection = []
    indexInSection = indexRow * 2
    for (; indexInSection < indexRow * 2 + (indexRow + 1 >= data.length / 2 ? lastRow : 2); indexInSection += 1) {
      oneSection.push(<Film key={indexInSection} data={data[indexInSection]} />)
    }
    allItems.push(
      <Row key={indexRow} className="film-row">
        {oneSection}
      </Row>
    )
  }

  return <div>{allItems}</div>
}
