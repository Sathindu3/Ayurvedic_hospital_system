import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './Home.css';
import image1 from '../../Resources/images/bg-1.jpg';
import image2 from '../../Resources/images/bg-2.jpg';
import image3 from '../../Resources/images/bg-3.jpg';
import image4 from '../../Resources/images/image4.jpg';
import staff from '../../Resources/images/staff.jpg';
import facilites from '../../Resources/images/image5.jpg';
import acheivments from '../../Resources/images/image6.jpg';


const Home = () => {
  return (
    <div className='section-home'>
      <div className="row">
        <div className="col-lg-12 content-1">
          <Carousel fade>
            <Carousel.Item>
              <img src={image2} />
              <Carousel.Caption className='caption-1'>
                <h3>Healing Through Ayurveda</h3>
                <p>Discover the timeless wisdom of natural healing at our Ayurvedic hospital.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={image3} alt="" />
              <Carousel.Caption className='caption-2'>
                <h3>Your Wellness, Our Priority</h3>
                <p>Experience personalized care that nurtures your body, mind, and soul.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={image1} alt="" />
              <Carousel.Caption className='caption-3'>
                <h3>Where Tradition Meets Modernity</h3>
                <p>
                  Bringing you the best of ancient Ayurvedic practices and modern healthcare.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-lg-12 content-2">
          <div className="col-lg-6 ">
            <p>"At our Ayurvedic hospital, we believe in the power of nature to heal and rejuvenate. Our treatments are designed to restore balance in your life, using time-honored Ayurvedic practices combined with modern medical insights. Whether you seek relief from a specific ailment or simply wish to enhance your overall well-being, our dedicated team of experts is here to guide you on your journey to health and harmony."</p>
          </div>
          <div className="col-lg-6 col-xs-12">
            <img src={image4} alt="" />
          </div>
        </div>
        <div className="col-lg-12 content-3">
          <Card>
            <Card.Img variant="top" src={facilites} />
            <Card.Body>
              <Card.Title>Our Facilities</Card.Title>
              <Card.Text>
                State-of-the-art treatment rooms, herbal gardens, and serene wellness spaces designed for your comfort and healing.
              </Card.Text>
              <Button variant="primary" as={Link} to="/aboutus" className='navlink'>Read More

              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={staff} />
            <Card.Body>
              <Card.Title>Our Staff</Card.Title>
              <Card.Text>
                A team of experienced Ayurvedic doctors and compassionate caregivers dedicated to your well-being.
              </Card.Text>
              <Button variant="primary" as={Link} to="/aboutus" className='navlink'>Read More</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={acheivments} />
            <Card.Body>
              <Card.Title>Our Acheivements</Card.Title>
              <Card.Text>
                Recognized for excellence in Ayurvedic healthcare with numerous awards and accolades over the years.
              </Card.Text>
              <Button variant="primary" as={Link} to="/aboutus" className='navlink'>Read More</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
