import React from 'react'
import video from '../../video/video.mp4'
import { Link , Redirect} from 'react-router-dom'
import {connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactTypingEffect from 'react-typing-effect';

const landing = ({ isAuthenticated }) => {
 if(isAuthenticated) {
    return <Redirect to='/dashboard' />;
 }

  return (
    <section className="landing">
        
      <div className="dark-overlay">
        <div className="landing-inner">
             <video className="mp4" src={video} muted loop autoPlay></video>
          <h1 className="x-large"> <span className= "String"> <ReactTypingEffect  text={["welcome To Developer Connector"]}
               typingDelay = {100}   
               eraseDelay = {5000} 
               pauseDelay = {2000}
           ></ReactTypingEffect></span> </h1>
          <p className="lead">
            Create developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to ="/register" className="btn btn-primary">Sign Up</Link>
            <Link to ="/login" className="btn btn">Login</Link>
        </div>
        </div>
      </div>
    </section>
  )
}

landing.propTypes = {
  isAuthenticated : PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps) (landing)
