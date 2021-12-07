import React from 'react'
import { Route, Switch } from 'react-router-dom'

const OrderMain = React.lazy(() => import('../pages/OrderMain'));
const OrderMainOut = React.lazy(() => import('../pages/OrderMainOut'));
const Order = React.lazy(() => import('../pages/Order'));
const Return = React.lazy(() => import('../pages/Return'));
const NotFound = React.lazy(() => import('../components/NotFound/index'));

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Order}/>
            <Route path='/return' exact component={Return}/>
            <Route path='/orderin' component={OrderMain}/>
            <Route path='/orderout' component={OrderMainOut}/>
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes
