import './style.scss';
import { connect } from 'react-redux';
import { AUTHORIZATION } from '../../constants';
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import { deleteGame } from '../../store/actions/gameAction';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Index = ({ authenticated, game, deleteGame }) => {
  const navigate = useNavigate();
  const handleNavigate = (data) => {
    navigate('/games/' + data.id);
  };

  return (
    <div className='card'>
      {authenticated?.username === AUTHORIZATION.username &&
        authenticated?.password === AUTHORIZATION.password && (
          <div className='action_icons'>
            <TiEdit className='icons' onClick={() => handleNavigate(game)} />
            <TiDeleteOutline
              className='icons'
              onClick={() => deleteGame(game)}
            />
          </div>
        )}

      <img src={game.img_url} alt={game.name} />
      <div className='card__title'>
        <p>{game.name}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state?.auth?.authenticatedUser,
});
const mapDispatchToProps = {
  deleteGame,
};

Index.propTypes = {
  authenticated: PropTypes.object,
  game: PropTypes.object,
  editGame: PropTypes.func,
  deleteGame: PropTypes.func,
};

const Card = connect(mapStateToProps, mapDispatchToProps)(Index);

export default Card;
