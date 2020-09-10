import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '../hooks/PrivateRoute'
import AuthRoute from '../hooks/AuthRoute'

// Admin
import Dashboard from '../pages/admin/dashboard'
import AdminLogin from '../pages/admin/admin-login'
import Patient from '../pages/admin/patient'
import Exams from '../pages/admin/exams-list'
import Exam from '../pages/admin/exam'

import Login from '../pages/login'
import ForgotPassword from '../pages/forgot-password'

const Routes: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Dashboard}></PrivateRoute>

      <PrivateRoute path="/exames" exact component={Exams}></PrivateRoute>

      <PrivateRoute path="/exame/:id" exact component={Exam}></PrivateRoute>

      <PrivateRoute
        path="/paciente/:id"
        exact
        component={Patient}
      ></PrivateRoute>

      <AuthRoute path="/login" component={Login}></AuthRoute>

      <AuthRoute path="/admin" component={AdminLogin}></AuthRoute>

      <Route path="/esqueci-senha" component={ForgotPassword}></Route>
    </Switch>
  )
}

export default Routes
