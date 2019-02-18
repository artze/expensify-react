import expenses from '../fixtures/expenses';
import getExpensesTotal from '../../selectors/expenses-total';

test('should return 0 if no expenses', () => {
    const result = getExpensesTotal([]);
    expect(result).toBe(0);
})

test('should add up a single expense', () => {
    const result = getExpensesTotal([expenses[0]]);
    expect(result).toBe(expenses[0].amount);
})

test('should correctly add up multiple expenses', () => {
    const result = getExpensesTotal(expenses);
    expect(result).toBe(199695)
})
