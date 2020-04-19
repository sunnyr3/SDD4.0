import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PageFrame from './PageFrame';
import Fcards from './Fcards'
import './TutorialPage.css';
import axios from 'axios';

class TutorialPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            route: props.match.url,  
            //initialized sign language & translation data 
            numbers: {'initial': 'initial'},
            alphabets: {'initial': 'initail'}
        };
    }

    //function to access data of maps from backend
    componentDidMount() {
        axios.get("http://localhost:8000/tutorial/").then((res) => {
            console.log(res.data);
            this.setState({
                numbers: res.data.numbers,
                alphabets: res.data.alphabets
            });
        });
    }

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
                    {/*<div className="folders-preview">                     
                        <div className="numbers">                          
                            <Fcards cards = {this.state.numbers}
                                    name = 'numbers'
                                    length = {this.getmapsize(this.state.numbers)}/>   
                        </div>
                        <div className="alphabets">        
                            <Fcards cards = {this.state.alphabets}
                                    name = 'alphabets'
                                    length = {this.getmapsize(this.state.alphabets)}/>  
                        </div>
                    </div>  */}                         
                            <Fcards cards = {this.state.numbers}
                                    name = 'numbers'
                                    length = {this.getmapsize(this.state.numbers)}/>
                            <Fcards cards = {this.state.alphabets}
                                    name = 'alphabets'
                                    length = {this.getmapsize(this.state.alphabets)}/>
                    <div className="page-foot">           
                        <strong>Welcome to TutorialPage!</strong>
                    </div>
                </Container>
            </PageFrame>
        );
    }
}

export default TutorialPage;