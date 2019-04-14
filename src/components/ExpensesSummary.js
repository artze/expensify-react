import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import filterExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{props.expenseCount}</span> {props.expenseCount > 1 ? 'expenses' : 'expense'} totalling <span>{numeral(props.expenseTotal / 100).format('$0,0.00')}</span></h1>
            <div className="page-header__actions">
                <Link
                    className="button"
                    to="/create"
                >Add Expense</Link>
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenseCount: filterExpenses(state.expenses, state.filters).length,
        expenseTotal: getExpensesTotal(filterExpenses(state.expenses, state.filters))
    }
}

export default connect(mapStateToProps)(ExpensesSummary);