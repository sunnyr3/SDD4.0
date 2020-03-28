import React, { Component, useState } from 'react';
import { Button } from 'reactstrap';
import PageFrame from './PageFrame';
import * as handTrack from 'handtrackjs';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview';

class Webcam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imguri: undefined,
            closeWebcam: false,
            isFullScreen: false,
            loading: false,
        }
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
        console.log('submit image...');
        // @TODO
    }

    render() {
        let content;
        if (!this.state.closeWebcam) {
            content = (
                <div>
                    <Camera
                        onTakePhotoAnimationDone={dataUri => {this.handleTakePhoto(dataUri)}}
                        isFullScreen={this.state.isFullScreen}
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
                {content}
            </PageFrame>
        );
    }
}

export default Webcam;