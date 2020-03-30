import React, { Component } from 'react';
import { Container} from 'reactstrap';
import PageFrame from './PageFrame';
import Fcards from './Fcards'
import './TutorialPage.css';


class TutorialPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            route: props.match.url,  

            //sign language & explanation data
            
            numbers: {'1': 'https://i.ibb.co/R40rKGC/1.jpg',
                      '2': 'https://i.ibb.co/HNLRcDw/2.jpg',
                      '3': 'https://i.ibb.co/W27Gr39/3.jpg',
                      '4': 'https://i.ibb.co/r46sRWV/4.jpg',
                      '5': 'https://i.ibb.co/zFknqPd/5.jpg',
                      '6': 'https://i.ibb.co/CVpVSPq/6.jpg',
                      '7': 'https://i.ibb.co/wC33gFc/7.jpg',
                      '8': 'https://i.ibb.co/jv3Lkmp/8.jpg',
                      '9': 'https://i.ibb.co/tcGzdYc/9.jpg'},
            alphabets: {'a': 'https://i.ibb.co/TLkkghg/A.png','b': 'https://i.ibb.co/BNsLzvS/B.png',
                        'c': 'https://i.ibb.co/fGKzr5F/C.png','d': 'https://i.ibb.co/G962j3F/D.png',
                        'e': 'https://i.ibb.co/JKbBPSX/E.png','f': 'https://i.ibb.co/ZBCqD8V/F.png',
                        'g': 'https://i.ibb.co/9Hjc9yx/G.png','h': 'https://i.ibb.co/CmPHBzP/H.png',
                        'i': 'https://i.ibb.co/hK11HvT/I.png','j': 'https://i.ibb.co/nLHs7dt/J.png',
                        'k': 'https://i.ibb.co/x2RGWxR/K.png','l': 'https://i.ibb.co/QPR3fD4/L.png',
                        'm': 'https://i.ibb.co/Z14MyPC/M.png','n': 'https://i.ibb.co/HYktXw2/N.png',
                        'o': 'https://i.ibb.co/2d49M00/O.png','p': 'https://i.ibb.co/dPr2Hf6/P.png',
                        'q': 'https://i.ibb.co/RSK3GP9/Q.png','r': 'https://i.ibb.co/VDZpskk/R.png',
                        's': 'https://i.ibb.co/C55gkCQ/S.png','t': 'https://i.ibb.co/b1pM20F/T.png',
                        'u': 'https://i.ibb.co/h2c83Dd/U.png','v': 'https://i.ibb.co/0hMMH4h/V.png',
                        'w': 'https://i.ibb.co/2PPf224/W.png','x': 'https://i.ibb.co/dcQ32kj/X.png',
                        'y': 'https://i.ibb.co/DC2G3HY/Y.png','z': 'https://i.ibb.co/rxhfVdt/Z.png'}  
                  
        };
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
                    <div className="folders-preview">              
                        <div className="numbers">                          
                            <Fcards cards = {this.state.numbers}                /*card folder data*/
                             name = 'numbers'                                   /*card folder type*/
                             length = {this.getmapsize(this.state.numbers)}/>   
                        </div>
                        <div className="alphabets">        
                            <Fcards cards = {this.state.alphabets}
                             name = 'alphabets'
                             length = {this.getmapsize(this.state.alphabets)}/>  
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

