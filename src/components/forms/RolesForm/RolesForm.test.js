import React from 'react';
import { shallow } from 'enzyme';
import RolesForm from './RolesForm';

const testRoleProps = {
  roles: [],
  roleOptions: [],
  handleChange: () => {},
  handleRoleNumber: () => {}
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<RolesForm {...testRoleProps} />);
});

describe('Roles Form Component', () => {
  it('renders form correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a typeahead', () => {
    expect(wrapper.find('TypeaheadComponent')).toHaveLength(1);
  });

  it('contains function to render tokens', () => {
    expect(wrapper.find('_renderToken')).toBeDefined();
  });
});
