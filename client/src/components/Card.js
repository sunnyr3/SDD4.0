
import React, { Component } from "react";
import Popup from "reactjs-popup";
import './Card.css'

class Card extends Component {
  

    render() {

      return (
          <Popup> { close => (
              <div className = "card-container">

                  <div className="button-close">

                      <button className="button" onClick={() => {console.log("modal closed ");
                      close(); }}>
                          close
                      </button>
                  </div>

             

                  <div className = "card-module">
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
           )}
          </Popup>
        );
    }
}

export default Card;

