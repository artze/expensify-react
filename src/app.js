import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

store.subscribe(() => {
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filters));
})
store.dispatch(addExpense({
    description: 'Water Bill',
    note: 'a note',
    amount: 3000,
    createdAt: 100
}))
store.dispatch(addExpense({
    description: 'Gas Bill',
    note: 'a note',
    amount: 1000,
    createdAt: 120
}))
store.dispatch(addExpense({
    description: 'Rent',
    note: 'a note',
    amount: 9999,
    createdAt: 10
}))

const jsx = (
    <Provider store={store}>
        <AppRouter></AppRouter>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
