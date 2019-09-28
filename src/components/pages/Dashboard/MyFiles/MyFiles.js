import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import filesActions from '../../../../_actions/files.actions';
import NewFileModal from './NewFileModal/NewFileModal';
import File from './File';

class MyFiles extends React.Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    const { files, dispatch } = this.props;

    if (!files) {
      dispatch(filesActions.getAll());
    }
  }

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  uploadFile = file => {
    const { dispatch } = this.props;

    dispatch(filesActions.upload(file));
    this.toggleModal();
  };

  render() {
    let { files } = this.props;
    const { isAdmin } = this.props;
    const { showModal } = this.state;

    if (!files) {
      files = [];
    }

    return (
      <Container className="pt-5 relaxed">
        <h3>My Files</h3>

        {files.length > 0 ? (
          files.map(file => {
            return (
              <File
                filename={file.name}
                modified={file.modified}
                isAdmin={isAdmin}
                key={`${file.name}-key`}
              />
            );
          })
        ) : (
          <h5>Files uploaded by admins will be shown here!</h5>
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
        <NewFileModal
          show={showModal}
          onHide={this.toggleModal}
          handleSubmit={this.uploadFile}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { files } = state.files;
  return { files };
};

export default connect(mapStateToProps)(MyFiles);
