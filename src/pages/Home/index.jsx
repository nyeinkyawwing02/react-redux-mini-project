import './style.scss';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getGames } from '../../store/actions/gameAction';
import Card from '../Card';
import PropTypes from 'prop-types';

const Index = ({ games, getGames }) => {
  const [search, setSearch] = useState({
    keyword: '',
    result: {},
  });

  useEffect(() => {
    getGames();
  }, [getGames]);

  const handleSearch = (e) => {
    let keyword = e.target.value;
    let result =
      keyword === ''
        ? games
        : games?.filter((game) => {
            return game.name.toLowerCase().includes(keyword.toLowerCase());
          });

    setSearch({
      keyword: keyword,
      result: result,
    });
  };

  return (
    <div className='game__lists'>
      <input
        type='text'
        value={search.keyword}
        onChange={handleSearch}
        placeholder='Search...'
      />
      <div className='game__grid'>
        {games?.length > 0 ? (
          search.keyword === '' ? (
            games.map((game) => <Card game={game} key={game.id} />)
          ) : search.result.length > 0 ? (
            search.result.map((game) => <Card game={game} key={game.id} />)
          ) : (
            <p>No search result for {search.keyword}...</p>
          )
        ) : (
          <p>No available games.</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  games: state?.games.games,
});
const mapDispatchToProps = {
  getGames,
};

Index.propTypes = {
  games: PropTypes.array,
  getGames: PropTypes.func,
};

const Home = connect(mapStateToProps, mapDispatchToProps)(Index);

export default Home;
