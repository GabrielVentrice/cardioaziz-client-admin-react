import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './AuthContext'

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth()

  if (!user) {
    return <Route render={props => <Redirect to="/" />} />
  }

  if (roles && roles.indexOf(user.role) === -1) {
    return <Route render={props => <Redirect to="/" />} />
  }

  return <Route {...rest} render={props => <Component {...props} />} />
}

export default PrivateRoute
