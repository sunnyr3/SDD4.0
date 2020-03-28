
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
  
<<<<<<< HEAD

=======
>>>>>>> 78b1fc23c46d172febbd86752b560f8cb09bd34c
    render() {
      return (
        //popup the window of flashcard
        <Popup>
          <div className = "card-container">
<<<<<<< HEAD
              <div className="button-close">

                  <button className="button" onClick={() => {console.log("modal closed ");
                  close(); }}>
                    close
=======
              //close buttom on top
              </div className = "button-close">
                  <button className="button" onClick={() => {console.log("modal closed ");
                  close(); }}>
                  close
>>>>>>> 78b1fc23c46d172febbd86752b560f8cb09bd34c
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

<<<<<<< HEAD
export default Card;

=======
export default Card
>>>>>>> 78b1fc23c46d172febbd86752b560f8cb09bd34c
