import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import PageFrame from './PageFrame';

class MainPage extends Component {
    render() {
        return (
            <PageFrame>
                <h1>Add something...</h1>
                <Spinner color="info" />
            </PageFrame>
        );
    }
}

export default MainPage;