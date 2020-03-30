
import React, { Component } from "react";
import './Card.css'

class Card extends Component {

    //function to handle close window button
    handleClick = () => {
        this.props.closew();
    };

    render() {
        return (
            <div className = "card-container">
                <div className = "card-model">
                    <span className="closewindow" onClick={this.handleClick}>
                        &times;
                    </span>  
                    <div className = "card-content">
                        <div className = 'card-img'>
                            <img alt = {this.props.eng} src={this.props.img} 
                            width = "200" height="200"/>
                        </div>
                        <div className = 'card-eng'>
                            {this.props.practice?  <font color = "white">What is this?
                            </font>:<font color = "white">{this.props.eng}</font> }
                        </div>
                    </div>             
                    <div className = "bottoms">
                        <button className="b1" onClick={() => this.props.prevCard()}>
                            Prev
                        </button>
                        <button className="b2" onClick={() => this.props.nextCard()}>
                            Next
                        </button>                   
                    </div>

                </div> 
            </div> 
        );
    }
}

export default Card;

