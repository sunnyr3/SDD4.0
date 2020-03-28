
import React, { Component } from 'react';
import { Container} from 'reactstrap';
import './Fcards.css';
import Card from './Card';
class Fcards extends Component{
     
    constructor(props){
		super(props);
		this.state = {
 			isView: false,
 			isPractice: false,
 			pop: false,
 			cards: [
 				{id: 1, eng: "one", img: one.jpg},
 				{id: 2, eng: "two", img: two.jpg},
				{id: 3, eng: "three", img: three.jpg}
			],
 			//currentCard{}
		};
	}

	viewToggle = () =>{
		this.setState({
			isView: !this.state.isView,
			pop: !this.state.pop
		});
	}

	practiceToggle = () =>{
		this.setState({
			isPractice: !this.state.isPractice,
			pop: !this.state.pop
		});
	}

	prevCard(){
		const allcards = this.state.cards;
		this.setState({
			currentCard: ......prev iterate card in allcards
		});

	}

	nextCard(){
		const allcards = this.state.cards;
		this.setState({
			currentCard: ......next iterate card in allcards
		});

	}

	render(){

		return(

			<div className = "folder">
				//print out the name of the folder on folder
               	<div className = "foler-box"> {this.state.name}
                	<div className = "view-div" onClick = {this.viewToggle}>
						<button type = "button" >
							view
						</button>
					</div>
					{this.state.isView ? <Card toggle={this.practiceToggle} /> : null}

					<div className = "prac-div" onClick = {this.practiceToggle}>
						<button type = "button" className = "practice">
				 			practice
						</button>
					</div>
                	{this.state.isPractice ? <Card toggle={this.practiceToggle} 
                	eng = {this.state.currentCard.eng} 
                	img = {}/> : null}  

   			 	</div>

   			</div>

		);



	}

}


export default Fcards;

