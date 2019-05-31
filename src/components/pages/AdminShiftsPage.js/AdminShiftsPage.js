import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Layout from '../../Layout/Layout';
import ShiftList from '../../ShiftList';
import shiftsActions from '../../../_actions/shifts.actions';
import './AdminShiftsPage.css';

class AdminShiftsPage extends React.Component {
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

export default connect(mapStateToProps)(AdminShiftsPage);

const DateHeading = ({ weekday, date }) => (
  <>
    <h3>{weekday}</h3>
    <p>{date}</p>
  </>
);
