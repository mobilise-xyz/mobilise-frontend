import React from 'react';
import { Form } from 'react-bootstrap';

class LocationInput extends React.Component {
  constructor(props) {
    super(props);
    const { handleChange } = this.props;
    this.input = (
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          id="location"
          name="location"
          type="location"
          required
          placeholder="e.g. Imperial College London"
          onChange={handleChange}
        />
      </Form.Group>
    );
    // const options = {
    //   types: ['address']
    // };
    // this.autoComplete = new window.google.maps.places.AutoComplete(
    //   input,
    //   options
    // );
  }

  // componentWillMount() {
  //   // Set google maps API key
  //   const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  //   const script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
  //   script.async = true;
  //   document.head.append(script);
  // }

  render() {
    return this.input;
  }
}

export default LocationInput;
