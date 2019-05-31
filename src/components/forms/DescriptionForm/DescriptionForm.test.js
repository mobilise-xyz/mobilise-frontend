import React from 'react';
import renderer from 'react-test-renderer';
import DescriptionForm from './DescriptionForm';

describe('Description Form Component', () => {
  it('renders the form correctly', () => {
    const component = renderer.create(<DescriptionForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
