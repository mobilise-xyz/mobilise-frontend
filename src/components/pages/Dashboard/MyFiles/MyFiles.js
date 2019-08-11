import React from 'react';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  faFileWord,
  faFilePdf,
  faFile,
  faDownload,
  faPlus,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import filesActions from '../../../../_actions/files.actions';
import NewFileModal from './NewFileModal/NewFileModal';

const getImageForFileExt = ext => {
  switch (ext) {
    case 'docx':
      return faFileWord;
    case 'doc':
      return faFileWord;
    case 'pdf':
      return faFilePdf;
    default:
      return faFile;
  }
};

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

  downloadFile = fileName => {
    const { dispatch } = this.props;

    dispatch(filesActions.download(fileName));
  };

  deleteFile = fileName => {
    const { dispatch } = this.props;

    dispatch(filesActions.deleteFile(fileName));
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
            const icon = getImageForFileExt(
              file.name.substr(file.name.lastIndexOf('.') + 1)
            );
            return (
              <Row key={file.name} style={{ margin: '20px' }}>
                <Col>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col md={2}>
                          <FontAwesomeIcon icon={icon} size="5x" />
                        </Col>
                        <Col>
                          <Card.Title>{file.name}</Card.Title>
                          <div style={{ height: '7%' }} />
                          <Card.Text className="mb-2 text-muted">
                            {moment(file.modified).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
                          </Card.Text>
                        </Col>
                        {isAdmin ? (
                          <Col
                            md={1}
                            style={{ marginTop: 'auto', marginBottom: 'auto' }}
                          >
                            <Button onClick={() => this.deleteFile(file.name)}>
                              <FontAwesomeIcon
                                className="text-danger"
                                icon={faTrash}
                                size="2x"
                              />
                            </Button>
                          </Col>
                        ) : null}
                        <Col
                          md={1}
                          style={{ marginTop: 'auto', marginBottom: 'auto' }}
                        >
                          <Button onClick={() => this.downloadFile(file.name)}>
                            <FontAwesomeIcon
                              className="text-secondary"
                              icon={faDownload}
                              size="2x"
                            />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
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
