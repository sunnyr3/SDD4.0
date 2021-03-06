import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import './Fcards.css';
import Card from './Card';

class Fcards extends Component{
    constructor(props){
		super(props);

		this.state = {
			pop: false,					//open/close sign language card on screen
 			isPractice: false,			//wether the practice mode is open
 			currentCard: 0,				//current card index in card folder
 			key: Object.keys(this.props.cards)[0]
		};
		//card actions
		this.ShowPrevCard = this.prevCard.bind(this);
    	this.ShowNextCard = this.nextCard.bind(this)
	}
    
    closeCar = () => {
		var prevPop = this.state.pop;
    	this.setState({
      		pop: !prevPop,
      		isPractice: !prevPop,
      		currentCard: 0,
      		key: Object.keys(this.props.cards)[0]
    	});
 	};

 	//open card normal view mode
	viewToggle = () =>{
		this.setState({
			pop: !this.state.pop,
			isPractice: false,
			cards: this.props.cards,
			key: Object.keys(this.props.cards)[this.state.currentCard]
		});
	}

	//open card practice mode
	practiceToggle = () =>{
		this.setState({
			pop: !this.state.pop,
			isPractice: true,
			cards: this.props.cards,
			key: Object.keys(this.props.cards)[this.state.currentCard]
		});
	}

	//switch to previous card
	prevCard() {
		var index = this.state.currentCard;
    	if (index > 0) {       //switch iff current is not first card
            index--;
        }
    	this.setState({
      		currentCard: index,
      		key: Object.keys(this.props.cards)[this.state.currentCard]
    	});
	}

	//switch to next card
	nextCard() {
        var index = this.state.currentCard;
        const length = this.props.length;
    	if (index < length - 1) { //switch iff current is not last card
            index++;
        }
    	this.setState({
      		currentCard: index,
      		key: Object.keys(this.props.cards)[this.state.currentCard]
    	});
	}

	render(){
		return(
			<Row>
				<Col>
					<div className = "folder">
               			<div className = "foler-box"> 
                			<button className = "view-div" onClick = {() => this.viewToggle()}>
								View
							</button>
							<button className = "prac-div" onClick = {() => this.practiceToggle()}>
								Practice
							</button>
              			</div>
               			<div className = "title">
               				<font color = "white" >{this.props.name}</font>
               			</div>
    				</div>
				</Col>
				<Col>
					{this.state.pop ? (
					   	<Card eng = {this.state.key}
    				 		img = {this.props.cards[this.state.key]}
    				 		isPractice = {this.state.isPractice}
    				 		prevCard = {this.ShowPrevCard}
    				 		nextCard = {this.ShowNextCard}
							closeCar = {this.closeCar} />) : null}
				</Col>
   			</Row>
		);
	}
}

export default Fcards;