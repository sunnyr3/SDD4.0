import React, { Component } from 'react';
import { Container} from 'reactstrap';
import PageFrame from './PageFrame';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        result: ''
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value.toLowerCase()});
  }

  /*
  need some work here

  handleSubmit(event) {
    event.preventDefault();
    const array = ["1", "2", "3"];
    const images = array.map(image => {
      return <img key={image} src={require(`./resources/${image}.jpg`)} alt={image} className="img-output" />
    });
  }*/

  render() {
      return (
          <PageFrame>
              <Container>
                  <div class = "main title">
                      <h1>Translate English into the American Sign Language(ASL)</h1>
                  </div>
                  <div class = "Translater-container">
                      <div class = "translater-left-container">
                          <div class = "English">
                            <textarea class = "English-input" type="text" value={this.state.value} onChange={this.handleChange} placeholder = "Enter English here..."></textarea>
                          </div>
                      </div>
                      <div class = "translater-right-container">
                        <div class = "sign">


                        {/* Need some work here*/}
                        <div class = "Sign-output">
                          {this.state.result !== '' ? (
                              <div id="result"> {this.result} </div>
                            ) : ('Translation result will appear here...')}
                        </div>



                        </div>
                      </div>
                  </div>
                  <div class = "clear"></div>
                  <div class = "translate-button">
                    <form onSubmit={this.handleSubmit}>
                      <input class = "translate" type="submit" value="Translate" />
                    </form>
                  </div>
              </Container>
          </PageFrame>
      );
  }
}

export default Search;
