import React, { Component, useState} from 'react';
import { Button, Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import PageFrame from './PageFrame';
import Camera, { FANCING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview';
import axios from 'axios';

class Webcam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imguri: undefined,
            closeWebcam: false,
            isFullScreen: false,
            imgContent: undefined,
            imgContents: [],
            loading: true,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/main/").then(() => {
            this.setState({loading: false});
        });
    }

    onCloseWebcam(e) {
        e.preventDefault();
        this.setState({closeWebcam: true});
    }

    handleTakePhoto(imguri) {
        this.setState({imguri: imguri, closeWebcam: true});
    }

    handleCancelImage(e) {
        e.preventDefault();
        this.setState({imguri: undefined, closeWebcam: false});
    }

    handleSubmitImage(e) {
        e.preventDefault();
        var postdata = {
            'uri': this.state.imguri
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
                        isFullScreen={this.state.isFullScreen}
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