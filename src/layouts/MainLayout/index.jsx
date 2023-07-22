import { connect } from 'react-redux';
import { logout } from '../../store/actions/authAction';
import './style.scss';
import { AUTHORIZATION } from '../../constants';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useToken from '../../hooks/useToken.js';

const Layout = ({ authenticated, logout }) => {
  let navigate = useNavigate();
  let { token } = useToken();

  let handleLogOut = () => {
    logout(navigate);
  };

  return (
    <div>
      <div className='header'>
        <div>
          <p>GS</p>
          <nav>
            <ul>
              <li>
                <NavLink to='/' activeclassname='active'>
                  Home
                </NavLink>
              </li>

              {authenticated?.username === AUTHORIZATION.username &&
                authenticated?.password === AUTHORIZATION.password && (
                  <li>
                    <NavLink to='/games/add' activeclassname='active'>
                      Add
                    </NavLink>
                  </li>
                )}

              {!(authenticated || token) && (
                <li>
                  <NavLink to='/login' activeclassname='active'>
                    Log in
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {(authenticated || token) && (
          <div className='header__right'>
            <p>{authenticated?.username}</p>
            <span onClick={handleLogOut} style={{ cursor: 'pointer' }}>
              Log out
            </span>
          </div>
        )}
      </div>

      <div className='section__wrapper'>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  authenticated: PropTypes.any,
  logout: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticated: state?.auth?.authenticatedUser,
});
const mapDispatchToProps = {
  logout,
};

const Index = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default Index;
