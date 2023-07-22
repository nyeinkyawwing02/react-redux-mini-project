import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { getUsers, register } from '../../store/actions/authAction';
import PropTypes from 'prop-types';

const Index = ({ users, getUsers, register }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [auth, setAuth] = useState({
    username: '',
    password: '',
    confirm_password: '',
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

  const toggleConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const validate = () => {
    let errorBag = {};

    const errorCallback = () => {
      setErrors(errorBag);
      return false;
    };

    if (
      auth.username.length === 0 &&
      auth.password.length === 0 &&
      auth.confirm_password.length === 0
    ) {
      errorBag['all'] = 'All fields are required.';

      return errorCallback();
    }
    if (auth.username.length === 0) {
      errorBag['username'] = 'Please fill in the username field.';
    }
    if (auth.password.length < 8) {
      errorBag['password'] = 'The password field must be at least 8 characters';
    }
    if (auth.password.length === 0) {
      errorBag['password'] = 'Please fill in the password field.';
    }
    if (auth.confirm_password.length === 0) {
      errorBag['confirm_password'] =
        'Please fill this to confirm your password.';
    } else if (auth.password !== auth.confirm_password) {
      errorBag['password'] = 'Passwords need to be matched.';
      errorBag['confirm_password'] = '';
    }

    if (
      auth.username.length !== 0 &&
      auth.password.length !== 0 &&
      auth.confirm_password.length !== 0
    ) {
      let inUser = users.some((user) => user.username === auth.username);
      if (!inUser) {
        setErrors({});
        return true;
      }

      errorBag['already_taken'] =
        'The username is already taken. Please try with other user';
    }

    return errorCallback();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      register(auth, navigate);
      setAuth({
        username: '',
        password: '',
        confirm_password: '',
      });
    }
  };

  return (
    <div className='form-wrapper'>
      <p className='desc'>Register GS account! </p>
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
        </div>

        <div>
          <label htmlFor='confirm_password'>Confirm Password</label>
          <div
            className={`input__gradient ${
              errors && errors.confirm_password ? 'bg__error' : 'bg__success'
            }`}
          >
            {showConfirmPass ? (
              <FiEye className='password___icon' onClick={toggleConfirmPass} />
            ) : (
              <FiEyeOff
                className='password___icon'
                onClick={toggleConfirmPass}
              />
            )}
            <input
              name='confirm_password'
              id='confirm_password'
              type={showPass ? 'text' : 'password'}
              placeholder='Enter confirm your password'
              onChange={handleChange}
              value={auth.confirm_password}
            />
          </div>
          {errors?.confirm_password && (
            <p className='error'>{errors?.confirm_password}</p>
          )}

          <div className='register__link'>
            <Link to='/login'>Login here</Link>
          </div>
        </div>

        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state?.users.users,
  };
};
const mapDispatchToProps = {
  getUsers,
  register,
};

Index.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
  register: PropTypes.func,
};

const SignUp = connect(mapStateToProps, mapDispatchToProps)(Index);

export default SignUp;
