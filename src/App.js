import React, { useEffect } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import NavBar from './Components/NavBar'
import About from './Pages/About'
import Home from './Pages/Home'
import { fetchCoinData } from './HOCSlices/apiThunk'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const loadingStatus = useSelector((state) => state.api.status)
  const error = useSelector((state) => state.api.error)

  useEffect(() => {
    if (loadingStatus === 'idle') {
      dispatch(fetchCoinData())
    }
  }, [loadingStatus, dispatch])

  if (loadingStatus === 'succeeded') {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path={'/About'}>
            <About />
          </Route>
          <Route exact path={'/Home'}>
            <Home />
          </Route>
          <Redirect to='/Home' />
        </Switch>
      </>
    )
  }
  else if (loadingStatus === 'loading') {
    return (
      <Spinner style={{ margin: '50%' }} animation="grow" variant="info" />
    )
  } else if (loadingStatus === 'failed') {
    return (<>{error}</>)
  }
  return <></>

}


export default App
