import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Profile from '../Profile'
import JobFilter from '../JobFilter'
import JobsItemDetails from '../JobsItemDetails'

import './index.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiContants = {
  initail: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    salaryRange: '',
    employmentType: [],
    searchInput: '',
    jobslist: [],
    apiStatus: apiContants.initail,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiContants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, salaryRange, employmentType} = this.state
    const employmentTypeJoined = employmentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeJoined}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobslist: updatedData, apiStatus: apiContants.success})
    } else {
      this.setState({apiStatus: apiContants.failure})
    }
  }

  onClickSearch = () => {
    this.getJobsList()
  }

  changeEmploymentType = event => {
    const {value, checked} = event.target
    const {employmentType} = this.state
    if (checked === true) {
      this.setState(
        {
          employmentType: [...employmentType, value],
        },
        this.getJobsList,
      )
    } else {
      const updatedTypes = employmentType.filter(eachType => eachType !== value)
      this.setState({employmentType: updatedTypes}, this.getJobsList)
    }
  }

  changeSalaryRange = event => {
    const {value} = event.target
    this.setState({salaryRange: value}, this.getJobsList)
  }

  onChangesearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobsList)
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          value={searchInput}
          placeholder="Search"
          onChange={this.onChangesearchInput}
        />
        <button className="search-btn" type="button" data-testid="searchButton">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobsList()
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

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-text">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobslist} = this.state
    if (jobslist.length <= 0) {
      return this.renderNoJobs()
    }
    return (
      <>
        <ul className="jobs-list">
          {jobslist.map(jobDetails => (
            <JobsItemDetails key={jobDetails.id} jobDetails={jobDetails} />
          ))}
        </ul>
      </>
    )
  }

  renderJobsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiContants.success:
        return this.renderJobsList()
      case apiContants.inProgress:
        return this.renderLoader()
      case apiContants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {salaryRange, employmentType, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="responsive-container">
            <div className="jobs-page-lg">
              <div className="left">
                {this.renderSearchBar()}
                <Profile />
                <hr className="horizontal-line" />
                <JobFilter
                  employmentTypesList={employmentTypesList}
                  salaryRangesList={salaryRangesList}
                  salaryRange={salaryRange}
                  employmentType={employmentType}
                  changeEmploymentType={this.changeEmploymentType}
                  changeSalaryRange={this.changeSalaryRange}
                />
              </div>
              <div className="right">
                <div className="search-container-lg">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    value={searchInput}
                    onChange={this.onChangesearchInput}
                  />
                  <button
                    className="search-btn"
                    type="button"
                    data-testid="searchButton"
                    onClick={this.onClickSearch}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
                {this.renderJobsPage()}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
