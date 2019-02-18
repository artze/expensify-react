import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render 1 expense correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} />)
    expect(wrapper).toMatchSnapshot();
})

test('should render multiple expense correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={4} />)
    expect(wrapper).toMatchSnapshot();
})