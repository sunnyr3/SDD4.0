import React, { Component } from 'react';
import { Container, Col, Spinner, Row } from 'reactstrap';
import PageFrame from './PageFrame';

import './TutotialPage.css';


class TutorialPage extends Component {
    render() {
      return(
        <PageFrame>
            <Container>
                <div>
                    <p> Welcome to TutorialPage</p>
                </div>
            </Container>
        </PageFrame>
      );
    }
}

export default TutorialPage