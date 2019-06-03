import React from 'react';
import { shallow } from 'enzyme';
import DateTimeForm from './DateTimeForm';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<DateTimeForm />);
});

describe('Date and Time Form Component', () => {
  it('renders form correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
