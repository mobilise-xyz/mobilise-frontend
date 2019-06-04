import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import NewShiftPage from './NewShiftPage';

jest.mock('axios');

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

  it('gets roles on #componentDidMount', async done => {
    wrapper
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith('/roles', expect.any(Object));
        done();
      });
    expect(wrapper.state()).toHaveProperty('roleOptions', [
      { name: 'role', involves: 'something' }
    ]);
  });

  it('posts correct data on submit', () => {
    const form = wrapper.find('Form');
    const postSpy = jest.spyOn(axios, 'post');

    const expectedData = {
      title: '',
      description: '',
      date: '',
      start: '',
      stop: '',
      repeatedType: 'Never',
      untilDate: '',
      address: '',
      rolesRequired: []
    };

    form.simulate('submit', {
      preventDefault: () => {}
    });
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledWith(
      '/shifts',
      expectedData,
      expect.any(Object)
    );
  });
});
