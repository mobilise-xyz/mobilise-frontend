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

  it('contains date selector', () => {
    expect(wrapper.find('FormControl[type="date"]')).toHaveLength(1);
  });

  it('contains start time selector', () => {
    expect(
      wrapper.find('FormControl[id="start-time"][type="time"]')
    ).toHaveLength(1);
  });

  it('contains end time selector', () => {
    expect(
      wrapper.find('FormControl[id="end-time"][type="time"]')
    ).toHaveLength(1);
  });
});
