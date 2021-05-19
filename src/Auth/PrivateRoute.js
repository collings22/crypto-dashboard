import React from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
// import { Loading } from './index'
import Spinner from 'react-bootstrap/Spinner'

const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Spinner />
    })}
    {...args}
  />
)

export default PrivateRoute
