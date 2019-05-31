import React from 'react';
import { shallow } from 'enzyme';
import NewShiftPage from './NewShiftPage';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<NewShiftPage />);
});

describe('<NewShiftPage />', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a one form', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
  });

  it('has a title form', () => {
    console.log(wrapper.debug());
    expect(wrapper.find('#title')).toHaveLength(1);
  });

  it('has a description form', () => {
    expect(wrapper.find('#description')).toHaveLength(1);
  });

  it('has a location form', () => {
    expect(wrapper.find('#location')).toHaveLength(1);
  });

  it('has a submit button', () => {
    expect(wrapper.find('#submitbutton')).toHaveLength(1);
  });

  it('has a new role modal', () => {
    expect(wrapper.find('NewRoleModal')).toHaveLength(1);
  });
});
