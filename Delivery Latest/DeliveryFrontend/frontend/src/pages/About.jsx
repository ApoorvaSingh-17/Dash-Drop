import React from 'react'
import LandingNavbar from '../components/LandingNavbar'

const About = () => {
    return (
       <>
        <LandingNavbar/>
            <section class="about">
                <div class="contain">
                    <div>
                        <h1>About Us</h1>
                        <p class="intro">
                            Welcome to our Delivery System! We specialize in providing top-notch delivery services that ensure your parcels are in good hands. With years of experience in the field, we are your trusted partner for reliable, express, and cost-effective deliveries.
                        </p>
                    </div>



                    <div class="expertise">
                        <div class="expertise-item">
                            <div>{/* <img src="assets\Logistics-Managers-by-Corlett-Express-in-Utah-scaled-2048x1024.jpeg" alt="Cost Effective Delivery"> */}
                                <h3>Cost-Effective Delivery</h3>
                                <p>We offer affordable delivery options without compromising on quality or speed. Get the best rates for your deliveries.</p></div>
                            <div className='image-container-about'>
                        
                            </div>

                        </div>

                        <div class="expertise-item">
                            <div> {/* <img src="assets\Logistics-Managers-by-Corlett-Express-in-Utah-scaled-2048x1024.jpeg" alt="Reliability"> */}
                                <h3>Reliability</h3>
                                <p>Count on us for dependable service. We ensure your parcels are delivered safely and on time, every time.</p></div>
                                <div className='image-container-about'>
                                
                            </div>

                        </div>

                        <div class="expertise-item">
                            <div className='about-detail'>{/* <img src="assets\Logistics-Managers-by-Corlett-Express-in-Utah-scaled-2048x1024.jpeg" alt="Express Delivery"> */}
                                <h3>Express Delivery</h3>
                                <p>Need it fast? We offer express delivery services to ensure your packages reach their destination in record time.</p></div>
                                <div className='image-container-about'>
                               
                            </div>

                        </div>

                        <div class="expertise-item">
                            <div> {/* <img src="assets\Logistics-Managers-by-Corlett-Express-in-Utah-scaled-2048x1024.jpeg" alt="Security"> */}
                                <h3>Security</h3>
                                <p>Your parcels are safe with us. We take every precaution to ensure the security and integrity of your deliveries.</p></div>
                                <div className='image-container-about'>
                               
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        
            </>
    );
};

export default About
