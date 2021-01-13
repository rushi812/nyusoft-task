import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { DashboardContainer } from '../modules/dashboard'
import { HomeContainer } from '../modules/home'

const Routes = () => {
  return (
    <Switch>
      <Route path='/' component={HomeContainer} exact />
      <Route path='/dashboard' component={DashboardContainer} exact />
    </Switch>
  )
}

export default Routes
