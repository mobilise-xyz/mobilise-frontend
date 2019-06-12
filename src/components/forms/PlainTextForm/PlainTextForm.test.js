import React from 'react';
import renderer from 'react-test-renderer';
import PlainTextForm from './PlainTextForm';

describe('Description Form Component', () => {
  it('renders the form correctly', () => {
    const component = renderer.create(
      <PlainTextForm label="" handleChange={() => {}} content="" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
