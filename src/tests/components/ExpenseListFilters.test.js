import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters with altFilters correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
})

test('should handle text change', () => {
    const value = 'new text';
    wrapper.find('input').simulate('change', { target: { value } });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
})

test('should handle sort by date', () => {
    wrapper.setProps({
        filters: altFilters
    })
    const value = 'date';
    wrapper.find('select').simulate('change', { target: { value } });
    expect(sortByDate).toHaveBeenCalledTimes(1);
})

test('should handle sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', { target: { value } });
    expect(sortByAmount).toHaveBeenCalledTimes(1);
})

test('should handle date changes', () => {
    wrapper.find('DateRangePicker').prop('onDatesChange')(altFilters);
    expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate);
})

test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe('endDate');
})