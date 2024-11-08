import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJob = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobs
  return (
    <li className="similar-job-item">
      <div className="company-role-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="simiar-logo"
        />
        <div>
          <h3 className="simiar-title">{title}</h3>
          <div className="simiar-star-container">
            <FaStar className="simiar-star" />
            <p className="simiar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <p className="similar-des">Description</p>
      <p className="similar-job-des">{jobDescription}</p>
      <div className="similar-location-type-container">
        <div className="con">
          <MdLocationOn className="icon" />
          <p className="location">{location}</p>
          <BsBriefcaseFill className="icon" />
          <p className="employment">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJob
