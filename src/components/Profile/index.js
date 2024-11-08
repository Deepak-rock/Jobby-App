import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiContants = {
  initail: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profileDetails: [], apiStatus: apiContants.initail}

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({apiStatus: apiContants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updateData = {
        name: data.profile_details.name,
        profileImage: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updateData,
        apiStatus: apiContants.success,
      })
    } else {
      this.setState({apiStatus: apiContants.failure})
    }
  }

  onClickRetry = () => {
    this.getUserDetails()
  }

  renderFailureProfile = () => (
    <div className="failureProfile-container">
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderloader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  userProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImage, shortBio} = profileDetails
    return (
      <div className="bg-profile-container">
        <img src={profileImage} alt={name} className="avatar" />
        <h3 className="profile-name">{name}</h3>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderUserProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiContants.success:
        return this.userProfile()
      case apiContants.inProgress:
        return this.renderloader()
      case apiContants.failure:
        return this.renderFailureProfile()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-container">{this.renderUserProfile()}</div>
  }
}
export default Profile
