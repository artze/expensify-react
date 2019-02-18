import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import filterExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => (
    <h1>Viewing {props.expenseCount} {props.expenseCount > 1 ? 'expenses' : 'expense'} totalling {numeral(props.expenseTotal / 100).format('$0,0.00')}</h1>
)

const mapStateToProps = (state) => {
    return {
        expenseCount: filterExpenses(state.expenses, state.filters).length,
        expenseTotal: getExpensesTotal(filterExpenses(state.expenses, state.filters))
    }
}

export default connect(mapStateToProps)(ExpensesSummary);