import React, { Component } from 'react';
import { Button, Container, Col, ListGroup, ListGroupItem, Spinner, Row } from 'reactstrap';
import PageFrame from './PageFrame';
import './UploadImage.css';
import axios from 'axios';

class UploadImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgs: [],
            imgUrls: [],
            imgResults: [],
            loading: false
        };
    }

    onHandleSubmit(e) {
        e.preventDefault();

        // Before getting the result, set loading to be true
        this.setState({
            loading: true
        });
        
        // Data for POST request
        // uri is an array that contains uri of all images
        var postdata = {
            'uri': this.state.imgUrls,
            'has_multiple': 'true',
        };

        axios({
            method: 'post',
            url: "http://localhost:8000/main/",
            data: postdata
        }).then((res) => {
            console.log(res.data.content);
            this.setState({
                imgResults: res.data.content,
                loading: false
            });
        });
    }

    onHandleImageChange(e) {
        e.preventDefault();

        console.log(e.target.files.length);
        var newImgs = this.state.imgs;
        var newImgUrls = this.state.imgUrls;

        // Iterate through all uploaded file and get the uri data
        for (var i = 0; i < e.target.files.length; i++) {
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = e => {
                newImgs.push(file);
                newImgUrls.push(reader.result);
                this.setState({
                    imgs: newImgs,
                    imgUrls: newImgUrls,
                });
            }
            reader.readAsDataURL(file);
        }
    }

    onClearImages(e) {
        e.preventDefault();
        this.setState({
            imgs: [],
            imgUrls: [],
            imgResults: [],
        });
    }

    render() {
        return (
            <PageFrame>
                <Container>
                    <Row>
                        <Col className="upload-img-col">
                            <form className="upload-img-form">
                                <input className="image-input" type="file" onChange={(e) => this.onHandleImageChange(e)} multiple />
                                <Button color="primary" onClick={(e) => this.onHandleSubmit(e)}>Upload</Button>
                                <Button color="secondary" onClick={(e) => this.onClearImages(e)}>Clear</Button>
                            </form>
                            {this.state.imgUrls.length !== 0 && (
                                <div className="form-group multi-preview">
                                    {this.state.imgUrls.map((url, key) => (
                                        <img className="hand-gesture-img" src={url} alt="hand gesture" />
                                    ))}
                                </div>
                            )}
                        </Col>
                        <Col>
                            {this.state.loading ? (
                                <Spinner></Spinner>
                            ) : ('')}
                            {this.state.imgResults.length !== 0 && (
                                <ListGroup>
                                    {this.state.imgResults.map((item, key) => (
                                        <ListGroupItem>{item}</ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </Col>
                    </Row>
                </Container>
            </PageFrame>
        );
    }
}

export default UploadImage;