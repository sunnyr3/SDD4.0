import React, { Component } from 'react';
import { Container} from 'reactstrap';
import PageFrame from './PageFrame';

import './TutorialPage.css';


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
