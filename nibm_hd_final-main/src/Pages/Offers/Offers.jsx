import React from 'react'
import amaya from '../../Resources/images/hotel_amaya.jpg';
import heritance from '../../Resources/images/hotel_heritance.jpg';
import Santani from '../../Resources/images/img-33.png';
import './Offers.css'

const Offers = () => {
  return (
    <div>
      <div className="container-fluid section-offers">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 content-1">
              <h2>
                Featured Hotels and Resorts
              </h2>
              <p>Our offers</p>
  
            </div>
            <div className="col-lg-12 content-2">
              <div className="card">
                <h3>Amaya Lake</h3>
                <h5>Dambulla</h5>
                <img src={amaya} alt="" />
                <p>Set amidst stunning natural beauty, this hotel offers a tranquil Sri Lankan rural experience with modern luxury. Savour diverse, delicious dining options and enjoy excellent service from a knowledgeable staff. Close to attractions, it's perfect for a relaxing, cultural getaway.
                </p>
                <h4>15% off - For more than $100 bill</h4>
              </div>
              <div className="card">
                <h3> Heritance </h3>
                <h5>Kandalama</h5>
                <img src={heritance} alt="" />
                <p>A luxurious Sri Lankan retreat nestled among natural rock formations and jungle, offering panoramic views of the stunning Sigiriya. Features spacious, well-appointed rooms, and an infinity pool overlooking a reservoir. Noteworthy architecture by Geoffrey Bawa merges modern and traditional design.
                </p>
                <h4>10% off - For more than $100 bill</h4>
              </div>
              <div className="card">
                <h3>Amaya Lake</h3>
                <h5>Dambulla</h5>
                <img src={Santani} alt="" />
                <p>Set amidst stunning natural beauty, this hotel offers a tranquil Sri Lankan rural experience with modern luxury. Savour diverse, delicious dining options and enjoy excellent service from a knowledgeable staff. Close to attractions, it's perfect for a relaxing, cultural getaway.
                </p>
                <h4>15% off - For more than $100</h4>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Offers
