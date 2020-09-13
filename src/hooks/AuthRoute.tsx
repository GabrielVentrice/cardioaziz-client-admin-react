import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './AuthContext'

import { role } from '../utils/constants'

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Redirect
            to={user.role === role.ADMIN ? `/dashboard` : `/ver-exames`}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default AuthRoute
