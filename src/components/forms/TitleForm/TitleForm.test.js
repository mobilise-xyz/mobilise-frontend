import React from 'react';
import { shallow } from 'enzyme';
import TitleForm from './TitleForm';

const testTitleProps = {
  title: '',
  shiftTitleOptions: ['Fundraiser', 'Regular'],
  handleChange: () => {}
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<TitleForm titleProps={testTitleProps} />);
});

describe('Title Form Component', () => {
  it('renders the form correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a typeahead', () => {
    expect(wrapper.find('TypeaheadComponent')).toHaveLength(1);
  });
});
