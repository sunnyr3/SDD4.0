import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
import PageFrame from './PageFrame';

class MainScreen extends Component {
    render() {
        return (
            <PageFrame>
                <div>
                    <h2>Welcome to SLTranslator!</h2>
                </div>
                <Row>
                    <Col>
                        <Link to={"/webcam"}><Button color="primary">Use Webcam</Button></Link>
                    </Col>
                    <Col>
                        <Link to={"/upload_image"}><Button color="primary">Upload Image</Button></Link>
                    </Col>
                </Row>
            </PageFrame>
        );
    }
}

export default MainScreen;