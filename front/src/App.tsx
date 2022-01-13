import { useEffect, useState } from 'react'
import Main from './Main'
import Movie from './Movie'
import './App.css';

function App() {
  const [page, setPage] = useState(true);
  const [imdbID, setImdbID] = useState('')
  useEffect(() => {
    if (imdbID !== '')
      setPage(false)
  }, [imdbID]);
  
  const getMovie = async function (imdbID: string) {
    if (imdbID !== '')
      setImdbID(imdbID)
  }

  const back = async function(){
    setPage(true)
  }
  if (page)
    return (
      <Main getMovie={getMovie}></Main>
    )
  else {
    return (
      <Movie imdbID={imdbID} back={back}></Movie>
    )
  }
}

export default App;
