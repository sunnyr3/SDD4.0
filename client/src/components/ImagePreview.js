
import React from 'react';
import { Button } from 'reactstrap';
import './ImagePreview.css';

export const ImagePreview = ({ imguri, handleCancelImage, handleSubmitImage }) => {
    return (
        <div className={'demo-image-preview'}>
            <img src={imguri} />
            <div className="btns-div">
                <Button className="cancel-btn" color="secondary" onClick={e => handleCancelImage(e)}><i class="fas fa-times"></i></Button>
                <Button className="submit-btn" color="primary" onClick={e => handleSubmitImage(e)}><i class="fas fa-check"></i></Button>
            </div>
        </div>
    );
};

export default ImagePreview;