import React, { Component } from 'react';
import { Container} from 'reactstrap';
import PageFrame from './PageFrame';
import Fcards from './Fcards'
import './TutorialPage.css';
//import axios from 'axios';


class TutorialPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            route: props.match.url,       
            //sign language & explanation data
            numbers: {'1': 'https://i.ibb.co/R40rKGC/1.jpg',
                      '2': 'https://i.ibb.co/HNLRcDw/2.jpg',
                      '3': 'https://i.ibb.co/W27Gr39/3.jpg'},
            alphabets: {'a': 'https://i.ibb.co/TLkkghg/A.png',
                        'b': 'https://i.ibb.co/BNsLzvS/B.png',
                        'c': 'https://i.ibb.co/fGKzr5F/C.png',
                        'd': 'https://i.ibb.co/G962j3F/D.png',
                        'e': 'https://i.ibb.co/JKbBPSX/E.png',
                         'f': 'https://i.ibb.co/ZBCqD8V/F.png',
                        'g': 'https://i.ibb.co/9Hjc9yx/G.png'},            
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

//function to get the size of a folder(map)
    getmapsize = (m) => {
        var len = 0; 
        for (var count in m) {
            len++;
        }
        return len;
    }

    render() {
        return(
            <PageFrame>
                <Container>      
                    <div className="folders-preview">               
                        <div className="numbers">                          //first card folder, type is numbers
                            <Fcards cards = {this.state.numbers}                //card folder data
                             name = 'numbers'                                   //card folder type
                             length = {this.getmapsize(this.state.numbers)}/>   //number of cards in folder
                        </div>
                        <div className="alphabets">        //folder2,type is alphabets
                            <Fcards cards = {this.state.alphabets}
                             name = 'alphabets'
                             length = {this.getmapsize(this.state.alphabets)}/>  
                        </div>
                    </div>             
                    <div className="page-foot">            //foot of the page
                        <strong>Welcome to TutorialPage!</strong>
                    </div>
                </Container>
            </PageFrame>
        );
    }
}

export default TutorialPage;

