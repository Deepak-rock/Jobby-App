import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJob from '../SimilarJob'

import './index.css'

const apiContants = {
  initail: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetailsVeiw extends Component {
  state = {
    apiStatus: apiContants.initail,
    jobDetails: {},
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobDetailData()
  }

  getJobDetailData = async () => {
    this.setState({apiStatus: apiContants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: updatedData,
        similarJobsData: updatedSimilarJobs,
        apiStatus: apiContants.success,
      })
    } else {
      this.setState({apiStatus: apiContants.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetailData()
  }

  renderJobSkills = () => {
    const {jobDetails} = this.state
    const {skills} = jobDetails
    const updatedSkill = skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    }))
    return (
      <div className="skills-container">
        <p className="description">Skill</p>
        <ul className="skill-list">
          {updatedSkill.map(skillsDetails => (
            <li key={skillsDetails.name} className="skills-item">
              <img
                src={skillsDetails.imageUrl}
                alt={skillsDetails.name}
                className="skill-img"
              />
              <p className="skill-name">{skillsDetails.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobLifeStyle = () => {
    const {jobDetails} = this.state
    const {lifeAtCompany} = jobDetails
    const updatedLifeAtCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }
    return (
      <>
        <p className="description">Life at Company</p>
        <div className="life-at-company-container">
          <p className="life-description">{updatedLifeAtCompany.description}</p>
          <img
            src={updatedLifeAtCompany.imageUrl}
            alt="company life"
            className="life-img"
          />
        </div>
      </>
    )
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <div className="job-details-section">
        <div className="company-role-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="logo"
          />
          <div>
            <h3 className="title">{title}</h3>
            <div className="star-container">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-salary-container">
          <div className="location-type-container">
            <div className="con">
              <MdLocationOn className="icon" />
              <p className="location">{location}</p>
              <BsBriefcaseFill className="icon" />
              <p className="employment">{employmentType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <div className="description-link-container">
          <p className="description">Description</p>
          <a href={companyWebsiteUrl} target="_new" className="visit-link">
            <p className="visit">Visit</p>
            <FiExternalLink />
          </a>
        </div>
        <p className="job-detail-description">{jobDescription}</p>
        {this.renderJobSkills()}
        {this.renderJobLifeStyle()}
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsDetailSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiContants.success:
        return this.renderJobDetails()
      case apiContants.inProgress:
        return this.renderLoader()
      case apiContants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {similarJobsData} = this.state
    const count = similarJobsData.length > 0
    return (
      <>
        <Header />
        <div className="job-details-container">
          <div className="responsive-container">
            {this.jobsDetailSection()}
            {count ? <p className="similar-description">Similar Jobs</p> : ''}
            <ul className="similarjob-list">
              {similarJobsData.map(similarJob => (
                <SimilarJob key={similarJob.id} similarJobs={similarJob} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}
export default JobDetailsVeiw
