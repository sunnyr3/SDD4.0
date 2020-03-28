import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import PageFrame from './PageFrame';
import Fcards from './Fcards'

import './TutorialPage.css';


class TutorialPage extends Component {

    super(props);
    this.state = {
       
       folders: [
        {id: 1, name: "number", cards: [{},{},{}]}
        {id: 2, name: "character", cards: []}
        {id: 3, name: "more", cards:[] }
       ],
    }

    render() {
      return(
        <PageFrame>
            <Container>
                //three folders - numbers, characters, more
                <div className = "folders-preview">
                    <div className = "folder1">
                        <Fcards cards ={this.state.folders.cards} 
                         name = {this.state.folders.name} />  
                    </div>

                    <div className = "folder2">
                        <Fcards cards ={this.state.folders.cards} 
                         name = {this.state.folders.name} />  
                    </div>

                    <div className = "folder3">
                        <Fcards cards ={this.state.folders.cards} 
                         name = {this.state.folders.name} />  
                    </div>
                </div>

                //page ending
                <div className = "page-foot">
                 <strong>Welcome to TutorialPage!</strong>
                </div>

            </Container>
        </PageFrame>
      );
    }
}

export default TutorialPage