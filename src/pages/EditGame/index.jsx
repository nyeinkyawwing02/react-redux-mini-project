import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTHORIZATION } from '../../constants';
import { updateGame } from '../../store/actions/gameAction';
import { getLocalStorageService } from '../../services/LocalStorageService';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '../../config';
import { toast } from 'react-toastify';

const initialGame = {
  id: '',
  name: '',
  img_url: '',
};

const Index = ({ updateGame }) => {
  let { id } = useParams();

  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [game, setGame] = useState(initialGame);

  useEffect(() => {
    const getGame = async () => {
      try {
        await axios.get(`${URL}/games/${id}`)
          .then((resp) => {
            setGame(resp.data);
          });
      } catch (err) {
        if (err.code == "ERR_BAD_REQUEST") {
          toast.error('Failed to edit the game you requested.')
        }
        navigate('/games');
      }
    }

    getGame();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const validate = () => {
    var errorBag = {};

    if (game.name === '' && game.img_url === '') {
      setErrors({
        all: 'All fields are required',
      });
      return false;
    }

    if (game.name === '') {
      errorBag['name'] = 'Please enter a name of the game';
    }

    if (game.img_url === '') {
      errorBag['img_url'] = 'Please enter a image url of the game';
    }

    if (Object.keys(errorBag).length > 0) {
      setErrors(errorBag);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      updateGame(game, navigate);
      setGame(initialGame);
    }
  };

  const authenticated = getLocalStorageService();

  if (
    !(
      authenticated.username === AUTHORIZATION.username &&
      authenticated.password === AUTHORIZATION.password
    )
  ) {
    navigate('/login');
  } else {
    return (
      <div className='form-wrapper'>
        <p className='desc'>Update Game! </p>
        <form onSubmit={handleOnSubmit}>
          {errors?.all && <p className='error'>{errors?.all}</p>}
          <div>
            <label htmlFor='name'>Name</label>
            <div
              className={`input__gradient ${
                errors && errors?.name ? 'bg__error' : 'bg__success'
              }`}
            >
              <input
                name='name'
                id='name'
                type='text'
                placeholder='Enter name'
                onChange={handleChange}
                value={game.name}
              />
            </div>
            {errors?.name && <p className='error'>{errors?.name}</p>}
          </div>

          <div>
            <label htmlFor='img_url'>Image Url</label>
            <div
              className={`input__gradient ${
                errors && errors?.img_url ? 'bg__error' : 'bg__success'
              }`}
            >
              <input
                name='img_url'
                id='img_url'
                type='text'
                placeholder='Enter your image url here'
                onChange={handleChange}
                value={game.img_url}
              />
            </div>
            {errors?.img_url && <p className='error'>{errors?.img_url}</p>}
          </div>

          <button type='submit'>Update</button>
        </form>
      </div>
    );
  }
};

const mapUseDispatchToProps = {
  updateGame,
};

Index.propTypes = {
  updateGame: PropTypes.func,
};

const EditGame = connect(null, mapUseDispatchToProps)(Index);

export default EditGame;
