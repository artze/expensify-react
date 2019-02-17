import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('should set up remove expense action object', () => {
    const action = removeExpense({ id: 'asdf' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'asdf'
    })
})

test('should set up edit expense action object', () => {
    const action = editExpense('asdf', { description: 'new stuff', amount: 10000 });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'asdf',
        updates: {
            description: 'new stuff',
            amount: 10000
        }
    })
})

test('should set up add expense action object with provied values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'Dec 2018'
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

test('should set up add expense object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    })
})
