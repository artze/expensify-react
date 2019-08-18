import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory({
    basename: process.env.PUBLIC_URL
});

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute path="/" component={LoginPage} exact={true}></PublicRoute>
            <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}></PrivateRoute>
            <PrivateRoute path="/create" component={AddExpensePage}></PrivateRoute>
            <PrivateRoute path="/edit/:id" component={EditExpensePage}></PrivateRoute>
            <Route component={NotFoundPage}></Route>
        </Switch>
    </Router>
)

export default AppRouter;