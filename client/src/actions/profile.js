import axios from 'axios'
import { setAlert } from './alert'

import { 
    GET_PROFILE ,
    PROFILE_ERROR ,
    UPDATE_PROFILE ,
    ACCOUNT_DELETED ,
    CLEAR_PROFILE ,
    GET_PROFILES,
    GET_REPOSE
} from './types'

// GET current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
     const res = await axios.get('/api/profile/me');

     dispatch({
         type : GET_PROFILE ,
         payload : res.data 
     })
    } catch(err) {
        dispatch({
            type : PROFILE_ERROR ,
            payload : { msg : err.response.statusText , status: err.response.status }
        })
    }
}

// Get All profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type : CLEAR_PROFILE });

    try {
     const res = await axios.get('/api/profile');

     dispatch({
         type : GET_PROFILES ,
         payload : res.data 
     });
    } catch(err) {
        dispatch({
            type : PROFILE_ERROR ,
            payload : { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// GET profile by ID
export const getProfileById = (userId) => async dispatch => {

    try {
     const res = await axios.get(`/api/profile/user/${userId}`);

     dispatch({
         type : GET_PROFILE ,
         payload : res.data 
     })
    } catch(err) {
        dispatch({
            type : PROFILE_ERROR ,
            payload : { msg : err.response.statusText , status: err.response.status }
        })
    }
}
// GET Github Repose
export const getGithubRepose = (username) => async dispatch => {

    try {
     const res = await axios.get(`/api/profile/github/${username}`);

     dispatch({
         type : GET_REPOSE ,
         payload : res.data 
     })
    } catch(err) {
        dispatch({
            type : PROFILE_ERROR ,
            payload : { msg : err.response.statusText , status: err.response.status }
        })
    }
}



// Create or Update Profile
export const createProfile = (formData , history , edit = false) => async dispatch => {
    try {
    const config = {
        headers : { 
            'Content-Type': 'application/json'
        }
    }
       const res = await axios.post('/api/profile' , formData , config)  
        dispatch({
         type : GET_PROFILE ,
         payload : res.data 
     })

     dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))
     if(!edit) {
         history.push('/dashboard')
     }
    } catch(err) {
     const errors = err.response.data.errors
       if(errors) {
           errors.forEach(error => dispatch(setAlert(error.msg , 'danger')) )
       }

          dispatch({
            type : PROFILE_ERROR ,
            payload : { msg : err.response.statusText , status: err.response.status }
        })
    }
}

// Add Experience

export const addExperience = (formData , history) => async dispatch => {
       try {
    const config = {
        headers : { 
            'Content-Type': 'application/json'
        }
    }
       const res = await axios.put('/api/profile/experience' , formData , config)  
        dispatch({
         type : UPDATE_PROFILE ,
         payload : res.data 
     })

     dispatch(setAlert('Experience Added Successfully', 'success'))
         history.push('/dashboard')
     
    } catch(err) {
     const errors = err.response.data.errors
       if(errors) {
           errors.forEach(error => dispatch(setAlert(error.msg , 'danger')) )
       }

          dispatch({
            type : PROFILE_ERROR ,
            payload : { msg : err.response.statusText , status: err.response.status }
        })
    }
}

// Add Education

export const addEducation = (formData , history) => async dispatch => {
       try {
    const config = {
        headers : { 
            'Content-Type': 'application/json'
        }
    }
       const res = await axios.put('/api/profile/education' , formData , config)  
        dispatch({
         type : UPDATE_PROFILE ,
         payload : res.data 
     })

     dispatch(setAlert('Education Added Successfully', 'success'))
         history.push('/dashboard')
     
    } catch(err) {
     const errors = err.response.data.errors
       if(errors) {
           errors.forEach(error => dispatch(setAlert(error.msg , 'danger')) )
       }

          dispatch({
            type : PROFILE_ERROR ,
            payload : { msg : err.response.statusText , status: err.response.status }
        })
    }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type : UPDATE_PROFILE ,
            payload : res.data
        });
          dispatch(setAlert('Experience Removed Successfully', 'success'))
    } catch(err) {
             dispatch({
            type : PROFILE_ERROR ,
            payload : { msg : err.response.statusText , status: err.response.status }
        })
    }
}

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type : UPDATE_PROFILE ,
            payload : res.data
        });
          dispatch(setAlert('Education Removed Successfully', 'success'))
    } catch(err) {
             dispatch({
            type : PROFILE_ERROR ,
            payload : { msg : err.response.statusText , status: err.response.status }
        })
    }
}

// Delete Account & profile
// Delete education
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are You Sure? This can Not be Undone')) {
        try {
         await axios.delete('/api/profile/')

        dispatch({type : CLEAR_PROFILE });
        dispatch({ type : ACCOUNT_DELETED });

          dispatch(setAlert('Your Account has Been permanantly Deleted', 'success'))
    } catch(err) {
             dispatch({
            type : PROFILE_ERROR ,
            payload : { msg : err.response.statusText , status: err.response.status }
        })
    }
    }
  
}