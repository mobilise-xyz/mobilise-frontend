import React from 'react';
import { Button, Card, CardColumns, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import linksActions from '../../../../_actions/links.actions';
import NewLinkModal from './NewLinkModal';

class QuickLinks extends React.Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    const { links, dispatch } = this.props;

    if (!links) {
      dispatch(linksActions.getAll());
    }
  }

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  addLink = link => {
    const { dispatch } = this.props;
    dispatch(linksActions.add(link));
    this.toggleModal();
  };

  removeLink = id => {
    const { dispatch } = this.props;
    dispatch(linksActions.remove(id));
  };

  render() {
    const { isAdmin } = this.props;
    let { links } = this.props;
    const { showModal } = this.state;

    if (!links) {
      links = [];
    }

    return (
      <Container className="pt-5 relaxed">
        <h3>My Videos</h3>
        {links.length > 0 ? (
          <CardColumns style={{ margin: '20px' }}>
            {links.map(link => (
              <Card key={link.id}>
                <Card.Header>
                  <Card.Title>{link.name}</Card.Title>
                </Card.Header>
                <Card.Body style={{ padding: 10 }}>
                  <ReactPlayer url={link.url} height="20vh" width="auto" />
                </Card.Body>
                {isAdmin ? (
                  <Card.Footer style={{ textAlign: 'right' }}>
                    <Button
                      variant="danger"
                      onClick={() => this.removeLink(link.id)}
                    >
                      REMOVE
                    </Button>
                  </Card.Footer>
                ) : null}
              </Card>
            ))}
          </CardColumns>
        ) : (
          <h5>Video links uploaded by admins will be shown here!</h5>
        )}
        {isAdmin ? (
          <Row>
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              onClick={this.toggleModal}
            >
              <FontAwesomeIcon
                className="text-secondary"
                icon={faPlus}
                size="2x"
              />
            </Button>
          </Row>
        ) : null}
        <NewLinkModal
          show={showModal}
          onHide={this.toggleModal}
          handleSubmit={this.addLink}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { links } = state.links;
  return { links };
};

export default connect(mapStateToProps)(QuickLinks);
