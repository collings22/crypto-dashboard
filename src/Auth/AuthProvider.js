
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL
  const responseType = 'token id_token'
  const scope = 'openid profile email'

  const history = useHistory()

  const onRedirectCallback = state => {
    history.push(state?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      responseType={responseType}
      scope={scope}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
