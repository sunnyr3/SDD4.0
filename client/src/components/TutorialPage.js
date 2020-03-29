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
            
            numbers: {'1': 'https://i.ibb.co/R40rKGC/1.jpg',
                      '2': 'https://i.ibb.co/HNLRcDw/2.jpg',
                      '3': 'https://i.ibb.co/W27Gr39/3.jpg'},
            alphabets: {'a': 'https://i.ibb.co/TLkkghg/A.png',
                        'b': 'https://i.ibb.co/BNsLzvS/B.png',
                        'c': 'https://i.ibb.co/fGKzr5F/C.png',
                        'd': 'https://i.ibb.co/G962j3F/D.png' },
            //more: {}
        };
    }

/*
    componentDidMount() {
        axios.get("http://localhost:8000/tutorial/").then((res) => {
            console.log(res.data);
            this.setState({
                numbers: res.data.numbers,
                alphabets: res.data.alphabets
            });
        });
    }
*/
    render() {
      return(
        <PageFrame>
            <Container>

                <div className="folders-preview">
                    <div className="numbers">
                        <Fcards cards = {this.state.numbers}, 
                         name = "numbers" />  
                    </div>

                    <div className="alphabets">
                        <Fcards cards={this.state.alphabets},
                         name = "alphabets"/>  
                    </div>
/*
                    <div className="folder3">
                        <Fcards cards={this.state.more} ,
                         name = "more"/>  
                    </div>
*/
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

