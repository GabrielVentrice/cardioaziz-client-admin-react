import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '../hooks/PrivateRoute'
import AuthRoute from '../hooks/AuthRoute'

import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import AdminLogin from '../pages/admin-login'

const Routes: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Dashboard}></PrivateRoute>

      <AuthRoute path="/login" component={Login}></AuthRoute>

      <AuthRoute path="/admin" component={AdminLogin}></AuthRoute>
    </Switch>
  )
}

export default Routes
