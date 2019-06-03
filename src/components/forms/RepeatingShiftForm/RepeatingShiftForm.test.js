import React from 'react';
import { shallow } from 'enzyme';
import RepeatingShiftForm from './RepeatingShiftForm';

const testRepeatProps = {
  repeat: 'Never',
  handleChange: () => {}
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<RepeatingShiftForm repeatProps={testRepeatProps} />);
});

describe('Repeating Shifts Form Component', () => {
  it('renders the form correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains repeat options', () => {
    expect(wrapper.find('options')).toBeDefined();
  });
});
