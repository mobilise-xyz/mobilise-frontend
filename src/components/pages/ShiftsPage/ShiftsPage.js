import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Layout from '../../Layout/Layout';
import ShiftList from '../../ShiftList';
import './ShiftsPage.css';
import shiftsActions from '../../../_actions/shifts.actions';

class ShiftsPage extends React.Component {
  // TODO Handle exception properly.
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(shiftsActions.getAll());
  }

  render() {
    const { shifts } = this.props;

    return (
      <Layout>
        <LinkContainer exact to="new-shift" className="add-shift-link">
          <Button variant="outline-primary">
            {<FontAwesomeIcon icon={faPlus} />} Add Shift
          </Button>
        </LinkContainer>
        <ShiftList
          heading={<DateHeading weekday="Recommended" />}
          shifts={shifts.shifts.recommended}
          // TODO what is this color
          cardStyle={{ backgroundColor: 'green' }}
        />
        {/* TODO divider between each day */}
        <hr />
        {/* TODO remove hardcoding */}
        <ShiftList
          heading={<DateHeading weekday="Today" date="17th March" />}
          shifts={shifts.shifts.all}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { shifts } = state;
  return {
    shifts
  };
};

export default connect(mapStateToProps)(ShiftsPage);

const DateHeading = ({ weekday, date }) => (
  <>
    <h3>{weekday}</h3>
    <p>{date}</p>
  </>
);
