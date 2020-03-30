
import React, { Component } from "react";
//import Popup from "reactjs-popup";
import './Card.css'

class Card extends Component {
    
    handleClick = () => {
      this.props.closew();
    };

    render() {
      return (

         <div className = "card-model">
              <div className = "card-container">

                  <span className="closewindow" onClick={this.handleClick}>
                    &times;
                  </span>
             
                  <div className = "card-content">
                      <div className = 'card-img'>
                          <img alt = {this.props.eng} src={this.props.img} />
                      </div>

                      <div className = 'card-eng'>
                          {this.props.practice ?  <p>{this.props.eng}</p> : null}
                      </div>
                  </div>

             
                  <div className = "bottoms">
                      <div className = "bottm-prev">
                          <button className="button" onClick={() => this.props.prevCard()}>
                            Prev
                          </button>
                      </div>

             
                      <div className = "bottom-next">
                          <button className="button" onClick={() => this.props.nextCard()}>
                            Next
                          </button>
                      </div>
                  </div>

              </div> 
           </div> 
        );
    }
}

export default Card;

