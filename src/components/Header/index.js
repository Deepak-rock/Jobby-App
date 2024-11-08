import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="responsive-break">
        <nav className="navbar">
          <Link to="/" className="link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="navbar-img"
            />
          </Link>
          <div className="navbar-item-sm">
            <Link to="/" className="link">
              <AiFillHome className="nav-icon" />
            </Link>
            <Link to="/jobs" className="link">
              <BsBriefcaseFill className="nav-icon" />
            </Link>
            <FiLogOut className="nav-icon-logout" onClick={onClickLogout} />
          </div>
          <div className="navbar-item-lg">
            <Link to="/" className="link">
              <p className="link-item">Home</p>
            </Link>
            <Link to="/jobs" className="link">
              <p className="link-item">Jobs</p>
            </Link>
          </div>
          <button className="logout-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </nav>
      </div>
    </div>
  )
}
export default withRouter(Header)
