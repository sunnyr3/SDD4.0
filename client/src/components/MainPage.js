import React, { Component } from 'react';
import { Container, Col, Spinner, Row } from 'reactstrap';
import PageFrame from './PageFrame';
import * as handTrack from 'handtrackjs';
import './MainPage.css';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: undefined,
            imagePreviewUrl: undefined,
            waiting: false,
            loading: false
        };
    }

    onHandleSubmit(e) {
        e.preventDefault();

        // Reference to https://github.com/victordibia/handtrack.js/#loading-the-model-handtrackload
        const img = document.getElementById('img');

        const modelParams = {
            flipHorizontal: false,   // flip e.g for video 
            imageScaleFactor: 0.3,  // reduce input image size for gains in speed.
            maxNumBoxes: 1,        // maximum number of boxes to detect
            iouThreshold: 0.5,      // ioU threshold for non-max suppression
            scoreThreshold: 0.5,    // confidence threshold for predictions.
        }
        
        let bbox;
        handTrack.load(modelParams).then(model => {
            // detect objects in the image.
            console.log("model loaded")
            model.detect(img).then(predictions => {
                console.log('Predictions: ', predictions);
                bbox = predictions.bbox;
            });
        });
        // TODO: pass image to backend
    }

    onHandleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();

        let file = e.target.files[0];
        reader.onloadend = e => {
            this.setState({
                image: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    render() {
        if (this.state.loading) {
            return (<PageFrame><Spinner/></PageFrame>);
        }

        return (
            <PageFrame>
                <Container>
                    <Row>
                        <Col className="upload-img-col">
                            <form className="upload-img-form" onSubmit={(e) => this.onHandleSubmit(e)}>
                                <input className="image-input" type="file" onChange={(e) => this.onHandleImageChange(e)} />
                                <input className="upload-img-btn" type="submit" value="Upload Image" />
                            </form>
                            <div className="img-preview-div">
                                {this.state.imagePreviewUrl !== undefined ? (
                                    <img id="img" src={this.state.imagePreviewUrl} />
                                ) : ('')}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </PageFrame>
        );
    }
}

export default MainPage;