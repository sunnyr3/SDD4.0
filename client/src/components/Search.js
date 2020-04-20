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

  // Function to store user input changes
  handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value.toLowerCase()});
  }

  // Function on submitting user input
  handleSubmit(event) {
    event.preventDefault();
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
