import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = {
        push: jest.fn()
    }
    wrapper = shallow(
        <EditExpensePage
            editExpense={editExpense}
            removeExpense={removeExpense}
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
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, updatedExpense);
    expect(history.push).toHaveBeenLastCalledWith('/')
})

test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click');
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
    expect(history.push).toHaveBeenLastCalledWith('/');
})