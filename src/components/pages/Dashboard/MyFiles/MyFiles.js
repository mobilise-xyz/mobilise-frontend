import React from 'react';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  faFileWord,
  faFilePdf,
  faFile,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import filesActions from '../../../../_actions/files.actions';

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
  componentDidMount() {
    const { files, dispatch } = this.props;

    if (!files) {
      dispatch(filesActions.get());
    }
  }

  downloadFile = fileName => {
    console.log(fileName);
  };

  render() {
    let { files } = this.props;

    if (!files) {
      files = [];
    }

    return (
      <Container className="pt-5 relaxed">
        <h3>My Files</h3>
        {files.map(file => {
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
                        <Card.Text className="mb-2 text-muted">{`Modified: ${moment(
                          file.modified
                        ).format('MMMM Do YYYY, h:mm:ss a')}`}</Card.Text>
                      </Col>
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
        })}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { files } = state.files;
  return { files };
};

export default connect(mapStateToProps)(MyFiles);
