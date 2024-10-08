import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faAmbulance } from '@fortawesome/free-solid-svg-icons';
import facebook from '../../Resources/images/facebook.png';
import whatsapp from '../../Resources/images/whatsapp.png'
import youtube from '../../Resources/images/youtube.png'
import x from '../../Resources/images/x.png'

const Footer = () => {
  return (
    <div>
      <div className="container-fluid section-footer">
        <div className="container">
          <div className="row">

            <div className="col-lg-4 content-2">
              <ul>
                <li><h4>Bauddhaloka Lane,<br />
                  Kurunegala</h4></li>
                <li> <h4><FontAwesomeIcon icon={faEnvelope} /><span> ayurvedha@gmail.com </span></h4>
                </li>
                <li> <h4><FontAwesomeIcon icon={faAmbulance} /><span> 1616 </span></h4>
                </li>
                <li> <h4><FontAwesomeIcon icon={faPhoneAlt} /><span> 077-332-3320 </span></h4>
                </li>

              </ul>
            </div>
            <div className="col-lg-4 content-4">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1663.2298423813086!2d80.35685370985837!3d7.481863022857049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33a22f7ef7d7d%3A0x1ea33b80e7201808!2sNational%20Institute%20of%20Business%20Management%20(NIBM)%20Kurunegala%20Centre!5e0!3m2!1sen!2slk!4v1723321312181!5m2!1sen!2slk" width="auto" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="col-lg-4 content-3">
              <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2Fadhitya.lk%2F%3F_rdc%3D1%26_rdr&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="300" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
            <div className="col-lg-12 content-5">
              Ayurvedha Hospital Pvt Ltd © 2024 | All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
