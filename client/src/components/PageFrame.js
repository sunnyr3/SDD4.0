import React from 'react';
import NavHeader from './NavHeader';
import { Container } from 'reactstrap';
import './PageFrame.css';

const PageFrame = ({children}) => (
    <div>
        <NavHeader></NavHeader>
        <Container fluid className="page-frame-container">
            {children}
        </Container>
        <div className="container page-footer">
            <hr></hr>
            <p>&copy; {"2020"} SLTranslator</p>
        </div>
    </div>
)

export default PageFrame;