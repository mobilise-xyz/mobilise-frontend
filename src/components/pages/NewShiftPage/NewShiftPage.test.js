import React from 'react';
import { shallow } from 'enzyme';

import { UnconnectedNewShiftPage } from './NewShiftPage';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<UnconnectedNewShiftPage />);
});

describe('<UnconnectedNewShiftPage />', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a one form', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
  });

  it('has a title form', () => {
    expect(wrapper.find('#title')).toHaveLength(1);
  });

  it('has a description form', () => {
    expect(wrapper.find('#description')).toHaveLength(1);
  });

  it('has a location form', () => {
    expect(wrapper.find('#location')).toHaveLength(1);
  });

  it('has a repeat form', () => {
    expect(wrapper.find('#repeat')).toHaveLength(1);
  });

  it('has a submit button', () => {
    expect(wrapper.find('#submitbutton')).toHaveLength(1);
  });

  it('has a new role modal', () => {
    expect(wrapper.find('NewRoleModal')).toHaveLength(1);
  });
});
