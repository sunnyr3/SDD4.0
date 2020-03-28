
import React, { Component } from "react";
import Popup from "reactjs-popup";
import './Card.css'

class Card extends Component {
    constructor(props){
        super(props);
        this.nextCard = this.nextCard.bind(this);
        this.prevCard = this.prevCard.bind(this);


    }

    prevCard(){
      this.props.nextCard();

    }

    prevCard(){
      this.props.nextCard();
    }
  
    render() {
      return (
        //popup the window of flashcard
        <Popup>
          <div className = "card-container">
              //close buttom on top
              </div className = "button-close">
                  <button className="button" onClick={() => {console.log("modal closed ");
                  close(); }}>
                  close
                  </button>
              </div>

              //card body

              <div className = "card-module">

                  <div className = 'card-img'>
                      <img alt={props.eng} src={props.image} />
                  </div>

                  <div className = 'card-eng'>
                      <p>{props.eng}</p> //show english meaning iff this.isView = true
                  </div>
              </div>

              //buttom1 - previous card
              </div className = "bottoms">
              <div className = "bottm-prev">
                  <button className="button" onClick={this.prevCard}>
                      prev
                  </button>
              </div>

              //buttom2 - next card
              <div className = "bottom-next">
                  <button className="button" onClick={this.nextCard}>
                      next
                  </button>
              </div>

            </div>

           </Popup>
        );
    }
}

export default Card
