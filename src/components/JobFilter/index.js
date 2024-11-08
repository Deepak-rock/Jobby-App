import './index.css'

const JobFilter = props => {
  const {
    salaryRange,
    employmentType,
    employmentTypesList,
    salaryRangesList,
    changeEmploymentType,
    changeSalaryRange,
  } = props

  const renderTypeOfEmployment = () => (
    <div className="employment-types-container">
      <p className="employment-types">Type of Employment</p>
      <ul className="employment-types-List">
        {employmentTypesList.map(eachItem => (
          <li className="employment-types-item" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              id={eachItem.employmentTypeId}
              value={eachItem.employmentTypeId}
              checked={employmentType.includes(eachItem.employmentTypeId)}
              onChange={changeEmploymentType}
            />
            <label htmlFor={eachItem.employmentTypeId} className="label">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRanges = () => (
    <div className="salary-ranges-container">
      <p className="salary-ranges">Salary Range</p>
      <ul className="salary-ranges-List">
        {salaryRangesList.map(eachItem => (
          <li className="salary-ranges-item" key={eachItem.salaryRangeId}>
            <input
              type="radio"
              id={eachItem.salaryRangeId}
              value={eachItem.salaryRangeId}
              checked={salaryRange === eachItem.salaryRangeId}
              onChange={changeSalaryRange}
            />
            <label htmlFor={eachItem.salaryRangeId} className="label">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="job-filter-container">
      {renderTypeOfEmployment()}
      <hr className="horizontal-line-salary" />
      {renderSalaryRanges()}
    </div>
  )
}

export default JobFilter
