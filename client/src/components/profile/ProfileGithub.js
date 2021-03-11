import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getGithubRepose } from '../../actions/profile'


const ProfileGithub = ({ username , getGithubRepose , repose }) => {
      useEffect(() => {
           getGithubRepose(username)
      },[getGithubRepose])
     
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1"> Github Repos </h2>
              { repose === null ? <Spinner/> : (
                  repose.map(repo => (
                      <div key={repo._id} className="repo bg-white p-1 my-1">
                          <div>
                              <h4>
                                  <a href = {repo.html_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" >
                                      {repo.name}
                                  </a>
                              </h4>
                          </div>
                      </div>
                  ))
              )}
        </div>
    )
}

ProfileGithub.propTypes = {
getGithubRepose : PropTypes.func.isRequired,
repos : PropTypes.array.isRequired,
username :PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    repos : state.profile.repose
})

export default connect(mapStateToProps , { getGithubRepose }) (ProfileGithub)
