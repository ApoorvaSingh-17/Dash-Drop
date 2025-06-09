import LandingNavbar from '../components/LandingNavbar'

const Home = () => {
  return (
    <>
      <LandingNavbar />
      <div className='Home'>
        <div className="textHome">
          Bringing the Best to Your Doorstep <div className='yellow'>in No Time!</div>
        </div>

      </div>
      <div className="services">
        <h1 className='centre services-title'>Our Services</h1>

        <div className="servicesList">
          <div className="card">
            <div className="card-img-top1"></div>
            <div className="card-body">
              <h5 className="card-title">Cost effective delivery</h5>
              <p className="card-text">We make special arrangements within our logistics network to ensure the cost effective delivery of consignments.</p>

            </div>
          </div>
          <div className="card">
            <div className="card-img-top2"></div>
            <div className="card-body">
              <h5 className="card-title">Secure Delivery</h5>
              <p className="card-text">Our team ensures that your consignments reaches the recipient with proper security measures taken.</p>

            </div>
          </div>
          <div className="card" >
            <div className="card-img-top3"></div>
            <div className="card-body">
              <h5 className="card-title">Express Delivery</h5>
              <p className="card-text">This service ensures that your urgent documents or packages reach the recipient at the earliest</p>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home