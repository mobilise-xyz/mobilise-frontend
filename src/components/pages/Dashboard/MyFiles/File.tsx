import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { AnyAction, Dispatch } from 'redux';
import {
  faDownload,
  faFile,
  faFilePdf,
  faFileWord,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import filesActions from '../../../../_actions/files.actions';

const moment = require('moment');

const getExt = (filename: string) =>
  filename.substr(filename.lastIndexOf('.') + 1);

const getImageForFileExt = (ext: string) => {
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

interface FileProps {
  filename: string;
  isAdmin: boolean;
  modified: string; // Actually a datetime
  dispatch: Dispatch<AnyAction>;
}

interface FileState {
  showDeleteModal: boolean;
}

class File extends React.Component<FileProps, FileState> {
  state: FileState = {
    showDeleteModal: false
  };

  downloadFile = () => {
    const { filename, dispatch } = this.props;
    dispatch<any>(filesActions.download(filename));
  };

  deleteFile = () => {
    const { filename, dispatch } = this.props;
    dispatch<any>(filesActions.deleteFile(filename));
  };

  toggleDeleteModal = () => {
    const { showDeleteModal } = this.state;
    this.setState({ showDeleteModal: !showDeleteModal });
  };

  render() {
    const { filename, isAdmin, modified } = this.props;
    const { showDeleteModal } = this.state;

    const icon = getImageForFileExt(getExt(filename));

    return (
      <div>
        <Row style={{ margin: '20px' }}>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={2}>
                    <FontAwesomeIcon icon={icon} size="5x" />
                  </Col>
                  <Col>
                    <Card.Title>{filename}</Card.Title>
                    <div style={{ height: '7%' }} />
                    <Card.Text className="mb-2 text-muted">
                      {moment(modified).format('MMMM Do YYYY, h:mm:ss a')}
                    </Card.Text>
                  </Col>
                  {isAdmin ? (
                    <Col
                      md={1}
                      style={{ marginTop: 'auto', marginBottom: 'auto' }}
                    >
                      <Button onClick={this.toggleDeleteModal}>
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
                    <Button onClick={this.downloadFile}>
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
        <Modal show={showDeleteModal} centered>
          <Modal.Header>
            <Modal.Title>{`Delete file "${filename}"?`}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-center">
            <Button
              variant="outline-danger"
              className="mr-2"
              onClick={this.deleteFile}
            >
              Yes
            </Button>
            <Button
              variant="outline-primary"
              className="ml-2"
              onClick={this.toggleDeleteModal}
            >
              No
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default connect()(File);
