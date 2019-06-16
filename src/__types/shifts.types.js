import PropTypes from 'prop-types';

const shift = PropTypes.shape({
  address: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  creator: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    })
  }),
  creatorId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  repeated: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    untilDate: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }),
  repeatedId: PropTypes.string,
  requirements: PropTypes.arrayOf(
    PropTypes.shape({
      bookings: PropTypes.array.isRequired,
      expectedShortage: PropTypes.number.isRequired,
      numberRequired: PropTypes.number.isRequired,
      role: PropTypes.shape({
        colour: PropTypes.string.isRequired,
        involves: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  start: PropTypes.string.isRequired,
  stop: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
});

const requirement = PropTypes.shape({
  numberRequired: PropTypes.number.isRequired,
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      volunteerId: PropTypes.string.isRequired
    }).isRequired
  ),
  role: PropTypes.shape({
    name: PropTypes.string.isRequired,
    involves: PropTypes.string.isRequired
  })
});

const shiftTypes = {
  shift,
  requirement
};

export default shiftTypes;
