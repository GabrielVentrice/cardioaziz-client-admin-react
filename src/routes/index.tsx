import React from 'react'
import { Switch } from 'react-router-dom'

import PrivateRoute from '../hooks/PrivateRoute'
import AuthRoute from '../hooks/AuthRoute'

// Admin
import Dashboard from '../pages/admin/dashboard'
import AdminLogin from '../pages/admin/admin-login'
import Patient from '../pages/admin/patient'

import Login from '../pages/login'

const Routes: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Dashboard}></PrivateRoute>

      <PrivateRoute
        path="/paciente/:id"
        exact
        component={Patient}
      ></PrivateRoute>

      <AuthRoute path="/login" component={Login}></AuthRoute>

      <AuthRoute path="/admin" component={AdminLogin}></AuthRoute>
    </Switch>
  )
}

export default Routes
