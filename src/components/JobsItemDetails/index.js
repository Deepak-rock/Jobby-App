import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobsItemDetails = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-item">
        <div className="company-role-container">
          <img src={companyLogoUrl} alt={location} className="company-logo" />
          <div className="star-title-container">
            <p className="job-title">{title}</p>
            <div className="star-container">
              <FaStar className="star" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-salary-container">
          <div className="location-type-container">
            <div className="con">
              <MdLocationOn className="job-icon" />
              <p className="job-location">{location}</p>
              <BsBriefcaseFill className="job-icon" />
              <p className="job-employment">{employmentType}</p>
            </div>
          </div>
          <div className="salary-container">
            <p className="job-salary">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <p className="description">Description</p>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobsItemDetails
