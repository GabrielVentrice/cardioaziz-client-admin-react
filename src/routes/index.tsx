import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '../hooks/PrivateRoute'
import AuthRoute from '../hooks/AuthRoute'

import { role } from '../utils/constants'

// Admin
import Dashboard from '../pages/admin/dashboard'
import AdminLogin from '../pages/admin/admin-login'
import Patient from '../pages/admin/patient'
import Exams from '../pages/admin/exams-list'
import Exam from '../pages/admin/exam'

//Auth
import Login from '../pages/login'
import ForgotPassword from '../pages/forgot-password'

//Patient
import PatientExam from '../pages/patient/exam'

const Routes: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute
        path="/dashboard"
        exact
        component={Dashboard}
        roles={[role.ADMIN]}
      ></PrivateRoute>

      <PrivateRoute
        path="/exames"
        exact
        component={Exams}
        roles={[role.ADMIN]}
      ></PrivateRoute>

      <PrivateRoute
        path="/exames/:id"
        exact
        component={Exam}
        roles={[role.ADMIN]}
      ></PrivateRoute>

      <PrivateRoute
        path="/paciente/:id"
        exact
        component={Patient}
        roles={[role.ADMIN]}
      ></PrivateRoute>

      <PrivateRoute
        path="/ver-exames/"
        exact
        component={PatientExam}
        roles={[role.PATIENT]}
      ></PrivateRoute>

      <AuthRoute path="/" exact component={Login}></AuthRoute>

      <AuthRoute path="/admin" component={AdminLogin}></AuthRoute>

      <Route path="/esqueci-senha" component={ForgotPassword}></Route>
    </Switch>
  )
}

export default Routes
