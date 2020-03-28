import React, { Component } from 'react';
import { Containe} from 'reactstrap';
import './Fcards.css';

class Fcards extends Component{
     
    constructor(props){
		this.state = {
 			isView: false
 			isPractice: false
 			pop: false
 			cards:[]
 			currentCard{}
		};
	}


	




	viewToggle = () =>{
		this.setState({isView: !this.state.isView})
		this.setState({pop: !this.state.pop})
	};

	practiceToggle = () =>{
		this.setState({isPractice: !this.state.isPractice})
		this.setState({pop: !this.state.pop})
	};

	render(){

		return(

			<div className = "folder">
                //<strong> 
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

		);



	}

}



export default Fcards