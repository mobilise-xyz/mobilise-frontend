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

  it('should contain a select form', () => {
    expect(
      wrapper.find('FormControl[id="repeat-dropdown"][as="select"]')
    ).toHaveLength(1);
  });

  it('contains repeat options', () => {
    expect(wrapper.find('option')).toHaveLength(7);
  });

  it('does not render repeat until form when repeat is never', () => {
    expect(
      wrapper.find('FormControl[id="repeat-until-date"][type="date"]')
    ).toHaveLength(0);
  });

  it('renders repeatUntil form when repeat is not never', () => {
    const formWithRepeatUntil = shallow(
      <RepeatingShiftForm repeat="Daily" handleChange={() => {}} />
    );
    expect(
      formWithRepeatUntil.find(
        'FormControl[id="repeat-until-date"][type="date"]'
      )
    ).toHaveLength(1);
  });
});
