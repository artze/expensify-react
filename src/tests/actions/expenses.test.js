import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, removeExpense, editExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, amount, createdAt, note}) => {
        expenseData[id] = { description, amount, createdAt, note }
    })
    database.ref('expenses').set(expenseData)
        .then(() => done());
})

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

test('should set up add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test("should add expense to database and store", (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        createdAt: 2000,
        note: 'More ergonomic'
    }
    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })

        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        })
})

test("should add expense with defaults to database and store", (done) => {
    const store = createMockStore({});
    const defaultExpenseData = {
        description: '',
        note: '',
        amount: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense())
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...defaultExpenseData
                }
            })
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })

        .then((snapshot) => {
            expect(snapshot.val()).toEqual(defaultExpenseData);
            done();
        })
})

test('Should set up set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('Should fetch expenses from firebase', (done) => {
    const store = createMockStore({});
    
    store.dispatch(startSetExpenses())
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
            })
            done();
        })
})