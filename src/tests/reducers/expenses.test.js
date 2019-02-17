import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
})

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test('should add expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '4',
            description: 'Laptop',
            note: '',
            amount: 50000,
            createdAt: moment(0).add(10, 'days').valueOf
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '3',
        updates: {
            description: 'Hey big spender'
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[1], {...expenses[2], description: action.updates.description}]);
});

test('should not edit expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: 'abc',
        updates: {
            description: 'Hey big spender'
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})
