import React, { Component } from 'react';
import { Container, InputGroup, InputGroupAddon, Button, Input, Table } from 'reactstrap';
import PageFrame from './PageFrame';
import './Search.css';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        result: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value.toLowerCase()});
  }

  

  handleSubmit(event) {
    event.preventDefault();
    /*
    const array = ["1", "2", "3"];
    const images = array.map(image => {
      return <img key={image} src={require(`./resources/${image}.jpg`)} alt={image} className="img-output" />
    });*/
    axios({
      method: 'post',
      url: "http://localhost:8000/search/",
      data: {key: this.state.value}
    }).then((res) => {
      console.log(res.data);
      this.setState({
        result: res.data
      });
    });
  }

  render() {
      return (
          <PageFrame>
              <Container>
                  <div class = "main title">
                      <h2>Translate English into the American Sign Language(ASL)</h2>
                  </div>
                  <InputGroup>
                      <Input value={this.state.value} onChange={this.handleChange} placeholder="Enter English here..." />
                      <InputGroupAddon addonType="append">
                          <Button color="primary" onClick={this.handleSubmit}>Translate</Button>
                      </InputGroupAddon>
                  </InputGroup>
                  {/*
                  <div class = "Translater-container">
                      <div class = "translater-left-container">
                          <div class = "English">
                            <textarea class = "English-input" type="text" value={this.state.value} onChange={this.handleChange} placeholder = "Enter English here..."></textarea>
                          </div>
                      </div>
                      <div class = "translater-right-container">
                        <div class = "sign">

                        <div class = "Sign-output">
                          {this.state.result !== undefined ? (
                              <div id="result">
                                  {Object.keys(this.state.result).forEach((key) => (
                                      <img src={this.state.result[key]} />
                                  ))}
                              </div>
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
                  </div>*/}
              </Container>
              <Container>
                  {this.state.result !== undefined ? (
                    <Table borderless>
                        <tr>
                          {this.state.result.map((item, index) => (
                              <td><img src={item} /></td>
                          ))}
                        </tr>
                    </Table>
                  ) : ('')}
              </Container>
          </PageFrame>
      );
  }
}

export default Search;
