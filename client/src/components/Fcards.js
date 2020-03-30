
import React, { Component } from 'react';
//import { Container} from 'reactstrap';
//import { Link } from 'react-router-dom';
//import Popup from "reactjs-popup";
import './Fcards.css';
import Card from './Card';
class Fcards extends Component{
     
    constructor(props){
		super(props);
		this.state = {
			pop: false,
 			isPractice: false,
 			currentCard: 0,
 			key: Object.keys(this.props.cards)[0]
		};
		this.ShowPrevCard = this.prevCard.bind(this);
    	this.ShowNextCard = this.nextCard.bind(this)
	}

    closebutton = () => {
    	this.setState({
      	   pop: !this.state.pop,
      	   isPractice: !this.state.pop,
      	   currentCard: 0,
      	   key: Object.keys(this.props.cards)[0]
    	});
 	};

	viewToggle = () =>{
		this.setState({
			pop: !this.state.pop,
			cards: this.props.cards,
			key: Object.keys(this.props.cards)[this.state.currentCard]
		});
	}

	practiceToggle = () =>{
		this.setState({
			pop: !this.state.pop,
			isPractice: !this.state.isPractice,
			cards: this.props.cards,
			key: Object.keys(this.props.cards)[this.state.currentCard]
		});

	}

	prevCard() {
		var index = this.state.currentCard;
    	if (index > 0) {
            index--;
        }
    	this.setState({
      		currentCard: index,
      		key: Object.keys(this.props.cards)[this.state.currentCard]
    	});
	}

	nextCard() {
        var index = this.state.currentCard;
    	const length = this.state.cards.prototype.size;
    	if (index < length - 1) {
            index++;
         }
    	this.setState({
      		currentCard: index,
      		key: Object.keys(this.props.cards)[this.state.currentCard]
    	});

	}

	render(){

		return(

			<div className = "folder">
		
               	<div className = "foler-box"> {this.state.name}

                	<div className = "view-div" onClick = {() => this.viewToggle}>
						<button>View</button>>
					</div>

					<div className = "prac-div" onClick = {() => this.practiceToggle}>
						<button>Practice</button>
					</div>


					{this.state.pop? <Card eng = {this.state.key}
    				   		img = {this.props.cards[this.state.key]}
    				   		practice = {this.state.isPractice}
    				   		prevCard = {this.ShowPrevCard}
    				   		nextCard = {this.ShowNextCard}
    				   		closew = {this.closebutton}/>:null}
               	</div>

   			</div>

		);

	}

}



export default Fcards;


