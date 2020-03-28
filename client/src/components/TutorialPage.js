import React, { Component } from 'react';

import { Container} from 'reactstrap';
import PageFrame from './PageFrame';

import Fcards from './Fcards'
import './TutorialPage.css';
import axios from 'axios';


class TutorialPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: props.match.url,
            folders: [
                {id: 1, name: "number", cards: [{},{},{}]},
                {id: 2, name: "character", cards: []},
                {id: 3, name: "more", cards:[] },
            ],
            numbers: undefined,
            alphabets: undefined
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8000/tutorial/").then((res) => {
            console.log(res.data);
            this.setState({
                numbers: res.data.numbers,
                alphabets: res.data.alphabets
            });
        });
    }

    render() {
      return(
        <PageFrame>
            <Container>

                <div className="folders-preview">
                    <div className="folder1">
                        <Fcards cards={this.state.folders.cards} 
                         name={this.state.folders.name} />  
                    </div>

                    <div className="folder2">
                        <Fcards cards={this.state.folders.cards} 
                         name={this.state.folders.name} />  
                    </div>

                    <div className="folder3">
                        <Fcards cards={this.state.folders.cards} 
                         name={this.state.folders.name} />  
                    </div>
                </div>
                <div className="page-foot">
                 <strong>Welcome to TutorialPage!</strong>
                </div>

            </Container>
        </PageFrame>
      );
    }
}


export default TutorialPage;

