import './App.css'
import { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import FilmList from '../film-list'
import Header from '../header'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error-message/ErrorMessage'
import TabsList from '../tabs/Tabs'
import ChoiseContext from '../choise-context'

import WarningMessage from './WarningMessage'
import { getResource, createSession, addRating, getGenres } from './Api'

function App() {
  const [dataState, setDataState] = useState()
  const [textState, setText] = useState('')

  const [loading, setLoading] = useState(false)
  const [mistake, setMistake] = useState(false)

  const [pageState, setPageState] = useState(1)

  const [totalResultsState, setTotalResultsState] = useState(1)

  const [choiseState, setChoiseState] = useState('search')
  const [userIdState, setUserIdState] = useState()
  const [genresIdsState, setGenresIdsState] = useState()

  function onError(err) {
    setMistake(true)
    setLoading(false)
    console.log(`err ${err}`)
  }

  const onChange = (text) => {
    setText(text)
  }

  useEffect(() => {
    createSession()
      .then((id) => {
        setUserIdState(id)
      })
      .then(() => {
        getGenres().then((genres) => {
          setGenresIdsState(genres)
        })
      })
      .catch((err) => onError(err))
  }, [])

  useEffect(() => {
    if (textState.length !== 0) {
      setLoading(true)
      getResource(textState, pageState, choiseState, userIdState)
        .then((data) => {
          setTotalResultsState(data.total_results)
          setDataState(data.results)
        })
        .then(() => setLoading(false))
        .then(() => setMistake(false))
        .catch((err) => onError(err))
    }
  }, [textState, pageState, choiseState])

  useEffect(() => {
    setPageState(1)
  }, [textState])

  const header = (
    <>
      <TabsList setChoiseState={(text) => setChoiseState(text)} choiseState={choiseState} setPageState={setPageState} />
      {choiseState === 'search' ? <Header onChange={(text) => onChange(text)} query={textState} /> : null}
    </>
  )
  // ||
  if (mistake) {
    return (
      <>
        {header}
        <ErrorMessage />
      </>
    )
  }
  if (loading) {
    return (
      <>
        {header}
        <Spinner />
      </>
    )
  }
  if (!textState || !dataState) {
    if (dataState) setDataState(undefined)
    return <div> {header} </div>
  }
  if (dataState.length === 0)
    return (
      <>
        {header}
        <WarningMessage />
      </>
    )
  const value = {
    choiseState,
    userIdState,
    addRating,
    genresIdsState,
  }
  if (!loading && !mistake) {
    return (
      <>
        {header}
        <ChoiseContext.Provider value={value}>
          <AppView
            data={dataState}
            setPageState={setPageState}
            totalResultsState={totalResultsState}
            pageState={pageState}
          />
        </ChoiseContext.Provider>
      </>
    )
  }
}

function AppView({ data, setPageState, totalResultsState, pageState }) {
  return (
    <div className="App">
      <FilmList data={data} nothingState={1} />
      <Pagination
        defaultCurrent={1}
        total={totalResultsState}
        defaultPageSize={20}
        showSizeChanger={false}
        onChange={(page) => setPageState(page)}
        current={pageState}
        style={{ marginTop: '40px' }}
      />
    </div>
  )
}

export default App
