import React from 'react';
import { Button, Image } from 'react-bootstrap';
import chlogog from '../../../assets/images/CH-Logo-g.png';
import chlogow from '../../../assets/images/CH-Logo-w.png';

const CHLogo = props => {
  const { colour } = props;
  return (
    <Button onClick={() => window.open('http://www.cityharvest.org.uk/')}>
      <Image
        src={colour === 'green' ? chlogog : chlogow}
        height="50"
        alt="City Harvest London"
        className="d-inline-block align-top"
        rounded
      />
    </Button>
  );
};

export default CHLogo;
