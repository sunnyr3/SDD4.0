
import React, { Component } from 'react';
//import { Container} from 'reactstrap';

import './Fcards.css';
import Card from './Card';
class Fcards extends Component{
     
    constructor(props){

		super(props);
		this.state = {
			pop: false,
 			isPractice: false,
 			currentCard: 0,
 			cards: undefined,
 			key: undefined
		};
		this.ShowPrevCard = this.prevCard.bind(this);
    	this.ShowNextCard = this.nextCard.bind(this)
	}


	viewToggle = () =>{
		this.setState({
			pop: !this.state.pop,
			cards: this.props.cards,
			key: Object.keys(this.state.cards)[this.state.currentCard]
		});
	}

	practiceToggle = () =>{
		this.setState({
			pop: !this.state.pop,
			isPractice: !this.state.isPractice,
			cards: this.props.cards,
			key: Object.keys(this.state.cards)[this.state.currentCard]
		});

	}

	prevCard() {
		var index = this.state.currentCard;
    	if (index > 0) {
            index--;
        }
    	this.setState({
      		currentCard: index,
      		key: Object.keys(this.state.cards)[this.state.currentCard]
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
      		key: Object.keys(this.state.cards)[this.state.currentCard]
    	});

	}

	render(){

		return(

			<div className = "folder">
				//print out the name of the folder on folder
               	<div className = "foler-box"> {this.state.name}

                	<div className = "view-div" onClick = {() => this.viewToggle}>
						<button type = "button" >
							view
						</button>
					</div>

					<div className = "prac-div" onClick = {() => this.practiceToggle}>
						<button type = "button" className = "practice">
				 			practice
						</button>
					</div>
                    
                    {this.state.pop ?  <Card eng = {this.state.key}
    				   img = {this.state.cards[this.state.key]}
    				   practice = {this.state.isPractice}
    				   prevCard = {this.ShowPrevCard}
    				   nextCard = {this.ShowNextCard}
    				  />: null}


               	</div>

   			</div>

		);

	}

}



export default Fcards;


