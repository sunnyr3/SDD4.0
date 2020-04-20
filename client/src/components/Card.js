import React, { Component } from "react";
import { Alert, Button, Input } from 'reactstrap';
import './Card.css'

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput: undefined,
            answer: this.props.eng,
            isPractice: this.props.isPractice,
            showAlert: false,
            isCorrect: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onCheckInput = this.onCheckInput.bind(this);
        this.onShowAnswer = this.onShowAnswer.bind(this);
    }

    componentDidUpdate() {
        if (this.state.answer !== this.props.eng) {
            this.setState({
                answer: this.props.eng,
                isPractice: this.props.isPractice,
                userInput: undefined,
                showAlert: false,
            });
        }
    }

    // Function to handle user input changes
    onChange(e) {
        e.preventDefault();
        this.setState({userInput: e.target.value.toLowerCase()});
    }

    // Function to check if user input is correct
    onCheckInput(e) {
        e.preventDefault();
        this.setState({showAlert: true});
        let checkAns;
        if (this.state.userInput === this.props.eng) checkAns = true;
        else checkAns = false;

        this.setState({isCorrect: checkAns});
        setTimeout(() => this.setState({
            showAlert: false
        }), 1800);
    }

    // Function to show the correct answer
    onShowAnswer(e) {
        e.preventDefault();
        this.setState({isPractice: false});
        setTimeout(() => this.setState({
            isPractice: true
        }), 1500);
    }

    render() {
        return (
            <div className = "card-container">
                <div className = "card-model">
                    <Button className="close-view-btn" color="secondary" onClick={() => this.props.closeCar()}>
                        <i class="fas fa-times"></i>
                    </Button>
                    <div className = "card-content">
                        <div className = 'card-img'>
                            <img alt = {this.props.eng} src={this.props.img}
                                width = "200" height="200"/>
                        </div>
                        {this.state.isPractice ? (
                            <div className="practice-div">
                                {this.state.isCorrect ? (
                                    <Alert color="success" isOpen={this.state.showAlert}>
                                        Yay, You got it!
                                    </Alert>
                                ) : (
                                    <Alert color="danger" isOpen={this.state.showAlert}>
                                        Oops, try one more time.
                                    </Alert>
                                )}
                                <Input className="practice-input" value={this.state.userInput} onChange={this.onChange} />
                                <div>
                                    <Button className="check-btn" color="primary" onClick={this.onCheckInput}>Check It</Button>
                                    <Button className="view-answer-btn" onClick={this.onShowAnswer}>View Answer</Button>
                                </div>
                            </div>
                        ) : (
                            <div className = 'card-eng'>
                                <font color = "white">{this.props.eng}</font>
                            </div>
                        )}
                    </div>
                    <div className = "bottoms">
                        <Button className="paginate-btn" onClick={() => this.props.prevCard()}>
                            <i class="fas fa-chevron-left"></i>
                        </Button>
                        <Button className="paginate-btn" onClick={() => this.props.nextCard()}>
                            <i class="fas fa-chevron-right"></i>
                        </Button>
                    </div>
                </div> 
            </div> 
        );
    }
}

export default Card;