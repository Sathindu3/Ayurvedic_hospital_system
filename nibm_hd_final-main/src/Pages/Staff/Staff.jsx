import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import staff1 from '../../Resources/images/Somatheeram-Ayurveda-Physician-Dr-Sooraj.png';
import staff2 from '../../Resources/images/Samanthi-Godawelage-1.jpg';
import staff3 from '../../Resources/images/1631854668142.jpeg';
import staff4 from '../../Resources/images/img-27.jpg';
import staff5 from '../../Resources/images/img-28.jpg';
import staff6 from '../../Resources/images/img-29.jpg';
import staff7 from '../../Resources/images/img-21.jpg'
import staff8 from '../../Resources/images/img-31.jpg';
import staff9 from '../../Resources/images/img-32.jpg'
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Staff.css'

const Staff = () => {
    return (
        <div>
            <div className="container-fluid section-staff">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 content-1">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Our specialists</Accordion.Header>
                                    <Accordion.Body>
                                        <Container>
                                            <Row>
                                                <Col xs={6} md={4}>
                                                    <Image src={staff1} roundedCircle />
                                                    <h4>Dr.A.W.Hettiarachchi</h4>
                                                    <h5>Nerve specialist</h5>
                                                </Col>
                                                <Col xs={6} md={4}>
                                                    <Image src={staff2} roundedCircle />
                                                    <h4>Dr.K.A.Samanthi</h4>
                                                    <h5>Nerve specialist</h5>
                                                </Col>
                                                <Col xs={6} md={4}>
                                                    <Image src={staff7} roundedCircle />
                                                    <h4>Dr.G.A.H.M.Senanayake</h4>
                                                    <h5>Nerve specialist</h5>
                                                </Col>
                                            </Row>
                                           
                                        </Container>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className="col-lg-12 content-2">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Our staff</Accordion.Header>
                                    <Accordion.Body>
                                        <Container>
                                            <Row>
                                                <Col xs={6} md={4}>
                                                    <Image src={staff8} roundedCircle />
                                                    <h4>Dr.A.W.Hettiarachchi</h4>
                                                    <h5>Nerve specialist</h5>
                                                </Col>
                                                <Col xs={6} md={4}>
                                                    <Image src={staff9} roundedCircle />
                                                    <h4>Dr.K.A.Samanthi</h4>
                                                    <h5>Nerve specialist</h5>
                                                </Col>
                                                <Col xs={6} md={4}>
                                                    <Image src={staff3} roundedCircle />
                                                    <h4>Dr.G.A.H.M.Senanayake</h4>
                                                    <h5>Nerve specialist</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6} md={4}>
                                                    <Image src={staff4} roundedCircle />
                                                    <h4>Dr.A.W.Hettiarachchi</h4>
                                                    <h5>Nerve specialist</h5>
                                                </Col>
                                                <Col xs={6} md={4}>
                                                    <Image src={staff5} roundedCircle />
                                                    <h4>Dr.K.A.Samanthi</h4>
                                                    <h5>Nerve specialist</h5>
                                                </Col>
                                                <Col xs={6} md={4}>
                                                    <Image src={staff6} roundedCircle />
                                                    <h4>Dr.G.A.H.M.Senanayake</h4>
                                                    <h5>Nerve specialist</h5>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
     

        </div >
    )
}

export default Staff
