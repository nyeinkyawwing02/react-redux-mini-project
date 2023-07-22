import './style.scss';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { getUsers, login } from '../../store/actions/authAction';
import PropTypes from 'prop-types';
import useToken from '../../hooks/useToken.js';

const Index = ({ users, getUsers, login }) => {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const [errors, setErrors] = useState();
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [auth, setAuth] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAuth({
      ...auth,
      [name]: value,
    });
  };

  const togglePass = () => {
    setShowPass(!showPass);
  };

  const validate = () => {
    let errorBag = {};

    const errorCallback = () => {
      setErrors(errorBag);
      return false;
    };

    if (auth.username.length === 0 && auth.password.length === 0) {
      errorBag['all'] = 'All fields are required.';

      return errorCallback();
    }

    if (auth.username.length === 0) {
      errorBag['username'] = 'Please fill in the username field.';
    }
    if (auth.password.length === 0) {
      errorBag['password'] = 'Please fill in the password field.';
    }

    if (auth.username.length !== 0 && auth.password.length !== 0) {
      let inUser = users.some(
        (user) =>
          user.username === auth.username && user.password === auth.password
      );
      if (inUser) {
        setErrors({});
        return true;
      }

      errorBag['unregister'] =
        "There's no user registered with this username. Do you want to create new one?";

      let existUser = users.some((user) => user.username === auth.username);
      if (existUser) {
        errorBag['unregister'] = 'Wrong credentials!';
      }
    }
    return errorCallback();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      login(auth, navigate, setToken);
      setAuth({
        username: '',
        password: '',
      });
    }
  };

  return (
    <div className='form-wrapper'>
      <p className='desc'>Welcome Back to GS! </p>
      <form onSubmit={handleOnSubmit}>
        {errors?.all && <p className='error'>{errors?.all}</p>}
        {errors?.unregister && <p className='error'>{errors?.unregister}</p>}
        <div>
          <label htmlFor='username'>Username</label>
          <div
            className={`input__gradient ${
              errors && errors.username ? 'bg__error' : 'bg__success'
            }`}
          >
            <input
              name='username'
              id='username'
              type='text'
              placeholder='Enter username'
              onChange={handleChange}
              value={auth.username}
            />
          </div>
          {errors?.username && <p className='error'>{errors?.username}</p>}
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <div
            className={`input__gradient ${
              errors && errors.password ? 'bg__error' : 'bg__success'
            }`}
          >
            {showPass ? (
              <FiEye className='password___icon' onClick={togglePass} />
            ) : (
              <FiEyeOff className='password___icon' onClick={togglePass} />
            )}
            <input
              name='password'
              id='password'
              type={showPass ? 'text' : 'password'}
              placeholder='Enter your password'
              onChange={handleChange}
              value={auth.password}
            />
          </div>
          {errors?.password && <p className='error'>{errors?.password}</p>}

          <div className='register__link'>
            <Link to='/signup'>Register here</Link>
          </div>
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state?.users?.users,
  };
};
const mapDispatchToProps = {
  getUsers,
  login,
};

Index.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
  login: PropTypes.func,
};

const Login = connect(mapStateToProps, mapDispatchToProps)(Index);

export default Login;
