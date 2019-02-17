import moment from 'moment';
import { sortByAmount, sortByDate, setTextFilter, setStartDate, setEndDate } from '../../actions/filters';

test('should generate set start date object', () => {
    const date = moment(0);
    expect(setStartDate(date)).toEqual({
        type: 'SET_START_DATE',
        startDate: date
    })
})

test('should generate set end date object', () => {
    const date = moment(0);
    expect(setEndDate(date)).toEqual({
        type: 'SET_END_DATE',
        endDate: date
    })
})

test('should generate set sort by amount object', () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

test('should generate set sort by date object', () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('should set text filter with provided text', () => {
    const text = 'rent';
    expect(setTextFilter(text)).toEqual({
        type: 'SET_TEXT_FILTER',
        text: text
    })
})

test('should set text filter with empty text', () => {
    expect(setTextFilter()).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})