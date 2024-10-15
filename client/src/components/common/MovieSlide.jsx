import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { styled } from '@mui/system';

const TMDB_API_KEY = 'b3eeb4de821b9b42cbc6b880a936afdf'; // Replace with your actual TMDb API Key
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie';

// Styled Card component to dynamically adjust scale
const StyledCard = styled(Card)(({ isActive }) => ({
  maxWidth: 345,
  margin: '0 auto',
  transform: isActive ? 'scale(1.1)' : 'scale(0.9)',  // Scale middle card more
  transition: 'transform 0.3s ease',
  opacity: isActive ? 1 : 0.7,  // Slightly reduce opacity for non-active cards
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledArrow = styled('button')(({ theme }) => ({
  display: 'block',
  background: theme.palette.primary.main,  // Consistent background color
  color: theme.palette.primary.main,  // Arrow icon color
  border: 'none',
  borderRadius: '50%',
  width: 40,
  height: 40,
  zIndex: 2,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.primary.main,  // Maintain same background on hover
  },
  '&:active': {
    background: theme.palette.primary.main,  // Ensure background stays on active/click
    boxShadow: 'none',  // Optional: remove any extra focus shadow
  },
  '&:focus': {
    background: theme.palette.primary.main,  // Ensure background stays on focus
    outline: 'none',  // Remove focus outline if needed
    boxShadow: 'none',  // Optional: no focus box shadow
  },
}));



// Customizing Dots
const StyledDots = styled('ul')(({ theme }) => ({
  '& li': {
    '& button': {
      '&:before': {
        color: theme.palette.primary.main,  // Use primary color for dots
      },
    },
    '&.slick-active button:before': {
      color: theme.palette.secondary.main,  // Use secondary color for active dot
    },
  },
}));

const MovieSlide = ({ movieIds }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);  // Track the active slide

  // Fetch movie details using TMDb API
  const fetchMovieDetails = async (id) => {
    try {
      const response = await axios.get(`${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie with ID ${id}:`, error);
      return null;
    }
  };

  // Fetch all movie details from the list of IDs
  useEffect(() => {
    const fetchMovies = async () => {
      const movieDetails = await Promise.all(movieIds.map((id) => fetchMovieDetails(id)));
      setMovies(movieDetails.filter((movie) => movie !== null)); // Filter out any null responses
      setLoading(false);
    };

    fetchMovies();
  }, [movieIds]);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Show 3 slides
    slidesToScroll: 1,
    centerMode: true,  // Keep middle item in center
    afterChange: (current) => setActiveIndex(current),  // Update active index when slide changes
    nextArrow: <StyledArrow style={{ right: 10 }}>›</StyledArrow>,  // Custom right arrow
    prevArrow: <StyledArrow style={{ left: 10 }}>‹</StyledArrow>,  // Custom left arrow
    appendDots: dots => <StyledDots>{dots}</StyledDots>,  // Custom dots
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: '100%', maxWidth: 1200 }}> {/* Add width restrictions for proper centering */}
          <Slider {...sliderSettings}>
            {movies.map((movie, index) => (
              <StyledCard key={movie.id} isActive={index === activeIndex}>
                <CardMedia
                  component="img"
                  alt={movie.title}
                  height="500"
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                <CardContent>
                  <Typography variant="h6" textAlign="center">{movie.title}</Typography>
                  <Typography variant="body2" color="textSecondary" textAlign="center">
                    Release Date: {movie.release_date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" textAlign="center">
                    Rating: {movie.vote_average}
                  </Typography>
                </CardContent>
              </StyledCard>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default MovieSlide;
