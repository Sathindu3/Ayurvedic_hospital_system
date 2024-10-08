import React from 'react';
import facility_1 from '../../Resources/images/image5.jpg';
import facility_2 from '../../Resources/images/image-8.jpeg';
import facility_3 from '../../Resources/images/image-9.jpg';
import staff_1 from '../../Resources/images/image-10.jpg';
import staff_2 from '../../Resources/images/staff.jpg';
import staff_3 from '../../Resources/images/01.jpg';
import './Aboutus.css';

const Aboutus = () => {
  return (
    <div>
      <div className="container-fluid section-aboutus">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 content-1 ">
              <h3>Hospital History</h3>
              <p>Our Ayurvedic hospital has been a beacon of holistic healing for over 50 years. Founded in 1974 by Dr. Anil Kumar, a visionary in Ayurvedic medicine, our hospital began as a small clinic dedicated to preserving the ancient practices of Ayurveda. Over the decades, it has grown into a renowned institution, attracting patients from across the globe. Our commitment to authentic Ayurvedic treatments, combined with modern healthcare practices, has made us a trusted name in natural healing</p>
            </div>
            <div className="col-lg-6 content-2">
              <h3>Mission</h3>
              <p>Our mission is to provide authentic Ayurvedic healthcare that enhances the physical, mental, and spiritual well-being of our patients. We are dedicated to preserving the ancient wisdom of Ayurveda while integrating it with modern scientific practices to offer holistic and personalized care. Through our treatments, we aim to restore balance in the body, mind, and soul, and promote a natural way of living that leads to long-term health and wellness.</p>
            </div>
            <div className="col-lg-6 content-3">
              <h3>Vision</h3>
              <p>Our vision is to be a global leader in Ayurvedic healthcare, known for our excellence in treatment, research, and education. We strive to create a world where Ayurveda is recognized as a primary healthcare option, accessible to all, and where natural healing methods are embraced for their effectiveness and sustainability. We envision a future where our hospital continues to innovate and expand, touching the lives of millions by promoting health, wellness, and harmony with nature.</p>
            </div>
          </div>
          <div className="col-lg-12 content-4">
            <h2>Our Facilities</h2>
            <p>Our hospital offers a tranquil environment where healing begins the moment you step in. We feature state-of-the-art treatment rooms equipped with modern amenities, ensuring your comfort during every therapy session. Our herbal gardens provide the freshest ingredients for our treatments, while our wellness spaces, including yoga and meditation areas, offer a peaceful retreat for relaxation and rejuvenation.</p>
            <div className="sub-1">
              <img src={facility_1} alt="" />
              <img src={facility_2} alt="" />
              <img src={facility_3} alt="" />
            </div>
          </div>
          <div className="col-lg-12 content-5">
            <h2>Our Staff</h2>
            <p>Our team consists of highly skilled Ayurvedic doctors, therapists, and healthcare professionals with years of experience in holistic healing. Each member of our staff is passionate about Ayurveda and dedicated to providing personalized care that meets your unique needs. From the moment you arrive, our compassionate team works together to ensure that your experience is both healing and transformative.</p>
            <div className="sub-1">
              <img src={staff_1} alt="" />
              <img src={staff_2} alt="" />
              <img src={staff_3} alt="" />
            </div>
          </div>
          <div className="col-lg-12 content-6">
            <h2>Our Achievements</h2>
            <p>Over the years, we have been honored with numerous awards and recognitions for our commitment to authentic Ayurvedic healthcare. Our hospital has been a pioneer in integrating traditional Ayurvedic practices with modern medical approaches, earning us a reputation for excellence. We are proud of our contributions to the field of Ayurveda and continue to strive for innovation and excellence in everything we do.</p>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Aboutus
