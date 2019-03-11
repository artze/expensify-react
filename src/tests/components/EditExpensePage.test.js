import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {
        push: jest.fn()
    }
    wrapper = shallow(
        <EditExpensePage
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
            expense={expenses[0]}
            history={history}
        />
    );
})

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle editExpense', () => {
    const updatedExpense = {
        description: 'Cigarettes',
        note: '',
        amount: 1950,
        createdAt: 0
    }
    wrapper.find('ExpenseForm').prop('onSubmit')(updatedExpense);
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, updatedExpense);
    expect(history.push).toHaveBeenLastCalledWith('/')
})

test('should handle startRemoveExpense', () => {
    wrapper.find('button').simulate('click');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
    expect(history.push).toHaveBeenLastCalledWith('/');
})