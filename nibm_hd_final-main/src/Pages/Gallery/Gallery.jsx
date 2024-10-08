import React from 'react'
import './Gallery.css'
import image1 from '../../Resources/images/img-20.jpg';
import image2 from '../../Resources/images/img-26.jpg';
import image3 from '../../Resources/images/img-22.jpg';
import image4 from '../../Resources/images/img-23.jpg';
import image5 from '../../Resources/images/img-24.jpg';
import image6 from '../../Resources/images/img-25.jpg';
import image7 from '../../Resources/images/img-26.jpg';
import image9 from '../../Resources/images/img-30.jpg';

const Gallery = () => {
    return (
        <div>
            <div className="container-fluid section-gallery">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 content-1">
                            <img src={image1} alt="" />
                            <img src={image2} alt="" />
                            <img src={image3} alt="" />
                        </div>
                        <div className="col-lg-12 content-2">
                            <img src={image4} alt="" />
                            <img src={image5} alt="" />
                            <img src={image6} alt="" />
                        </div>
                        <div className="col-lg-12 content-3">
                            <img src={image7} alt="" />
                            <img src={image9} alt="" />
                        </div>
                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gallery
