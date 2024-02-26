import './Film.css'
import { Col, Skeleton, Rate } from 'antd'
import { useState, useContext } from 'react'
// import { useState, useContext, useEffect } from 'react'

import ChoiseContext from '../choise-context'

export default function Film({ data }) {
  const context = useContext(ChoiseContext)

  const {
    original_title: title,
    release_date: date,
    overview,
    poster_path: poster,
    id,
    rating,
    genre_ids: genreIds,
  } = data

  const editedRating = Object.keys(context.rateState).includes(id.toString()) ? context.rateState[id] : rating
  const url = `https://image.tmdb.org/t/p/w500${poster}`

  const [afterLoadingImg, setAfterLoadingImg] = useState(false)

  function cropOverview(text) {
    const mas = text.split(' ')
    let bool = false
    const ind = mas.slice(0).reduce((acc, el, index, arr) => {
      if (acc + el.length >= 170) {
        arr.splice(0, arr.length + 1)
        bool = true
        return index
      }
      return acc + el.length
    }, 0)
    return bool
      ? mas
          .slice(0, ind + 1)
          .join(' ')
          .concat('...')
      : text
  }

  const results = []

  genreIds.forEach((el) => {
    const index = context.genresIdsState.findIndex((idGenre) => idGenre.id === el)
    results.push(
      <span className="film--genres" key={index}>
        {context.genresIdsState[index].name}
      </span>
    )
  })

  return (
    <Col span={12} className="film" offset={0}>
      <div className="film--picture">
        <img
          src={poster ? url : 'https://topnaroda.com/uploads/poster_none.png'}
          alt=""
          className="film--img"
          style={afterLoadingImg ? { width: '100%' } : { width: '0%' }}
          onLoad={() => {
            setAfterLoadingImg(true)
          }}
        />
        {!afterLoadingImg && <Skeleton.Image active className="film--img placeholder" />}
      </div>
      <div className="film--text">
        <h5 className="film--title">{title}</h5>
        <div className="film--date">{date}</div>
        {results}
        <div className="film--overview">{cropOverview(overview)}</div>
        <Rate
          allowHalf
          defaultValue={0}
          count={10}
          onChange={(value) => {
            context.setRateState({ ...context.rateState, [id]: value })
            context.addRating(context.userIdState, id, value)
          }}
          value={Number(editedRating)}
        />
      </div>
    </Col>
  )
}
