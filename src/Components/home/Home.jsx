import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiPlay } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const apiKey = '04262cf71896233f996279e84dad0c1c';
const url = 'https://api.themoviedb.org/3';
const imgUrl = 'https://image.tmdb.org/t/p/original';
const upcoming = 'upcoming';
const nowPlaying = 'now_playing';
const top_rated = 'top_rated';
const popular = 'popular';
const Card = ({ img }) => <img className="card" src={img} alt="img" />;

const Row = ({ title, arr = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((arr, index) => (
          <Card key={index} img={`${imgUrl}/${arr.poster_path}`} />
        ))}
      </div>
    </div>
  );
};
const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRated] = useState([]);
  const [PopularMovies, setPopularMovies] = useState([]);
  const [genreMovie, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=2`);
      setUpcomingMovies(results);
    };

    const fetchNowplaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${top_rated}?api_key=${apiKey}`);
      setTopRated(results);
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };
    const getAllGenere = async () => {
      const {
        // https://api.themoviedb.org/3/genre/movie/list?api_key=04262cf71896233f996279e84dad0c1c
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };
    getAllGenere();
    fetchUpcoming();
    fetchNowplaying();
    fetchTopRated();
    fetchPopular();
  }, []);
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: PopularMovies[0]
            ? `url(${`${imgUrl}/${PopularMovies[12].poster_path}`})`
            : 'rgb(16, 16, 16)',
        }}
      >
        {PopularMovies[0] && <h1>{PopularMovies[12].original_title}</h1>}

        {PopularMovies[0] && <p>{PopularMovies[12].overview}</p>}
        <div>
          {' '}
          <button>
            <BiPlay /> Play
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>
      <Row title={'Upcoming Movies'} arr={upcomingMovies} />
      <Row title={'Now Playing'} arr={nowPlayingMovies} />
      <Row title={'Top Rated'} arr={topRatedMovies} />
      <Row title={'Popular Movies'} arr={PopularMovies} />
      <div className="genre">
        {genreMovie.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
