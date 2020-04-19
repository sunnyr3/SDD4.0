import React, { Component } from 'react';
import { Button, Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import PageFrame from './PageFrame';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview';
import axios from 'axios';

class Webcam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imguri: undefined,
            imgContents: [],
            closeWebcam: false,
            loading: true,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/main/").then(() => {
            this.setState({loading: false});
        });
    }

    // Function to handle closing webcase
    onCloseWebcam(e) {
        e.preventDefault();
        this.setState({closeWebcam: true});
    }

    // Function to handle taking picture
    handleTakePhoto(imguri) {
        this.setState({imguri: imguri, closeWebcam: true});
    }

    // Function to handle cancelling picture
    handleCancelImage(e) {
        e.preventDefault();
        this.setState({imguri: undefined, closeWebcam: false});
    }

    // Function to submit picture to backemnd
    handleSubmitImage(e) {
        e.preventDefault();

        // Data for POST request
        // uri is the webcam image uri
        var postdata = {
            'uri': this.state.imguri,
            'has_multiple': 'false'
        }
        axios({
            method: 'post',
            url: "http://localhost:8000/main/",
            data: postdata
        }).then((res) => {
            console.log(res.data);
            var newResault = {'result': res.data.content};
            var newContents = this.state.imgContents;
            newContents.push(newResault);
            this.setState({
                imgContent: res.data.content,
                imgContents: newContents,
                closeWebcam: false,
            });
        });
    }

    render() {
        let content;
        if (!this.state.closeWebcam) {
            content = (
                <div>
                    <Camera
                        onTakePhotoAnimationDone={dataUri => {this.handleTakePhoto(dataUri)}}
                        isFullScreen={false}
                        imageType = {IMAGE_TYPES.JPG}
                    />
                    <Button color="secondary" onClick={e => {this.onCloseWebcam(e)}}>Close Webcam</Button>
                </div>
            );
        } else if (this.state.imguri !== undefined) {
            content = <ImagePreview 
                        imguri={this.state.imguri}
                        handleCancelImage={e => {this.handleCancelImage(e)}}
                        handleSubmitImage={e => {this.handleSubmitImage(e)}} />
        }

        return (
            <PageFrame>
                <Row>
                    <Col>
                        {content}
                    </Col>
                    <Col>
                        {this.state.imgContents.length !== 0 && (
                            <ListGroup>
                                {this.state.imgContents.map((item, key) => (
                                    <ListGroupItem>{item.result}</ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                </Row>
            </PageFrame>
        );
    }
}

export default Webcam;