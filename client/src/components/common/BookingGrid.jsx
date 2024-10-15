import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MovieItem from './MovieItem';

const BookingGrid = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = currentDate.getDate();
  const startDate = `${year}-${month-1}-${day}`; 
  const endDate = `${year}-${month}-${day}`; 
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=b3eeb4de821b9b42cbc6b880a936afdf&language=hi-IN&region=IN&sort_by=popularity&with_original_language=hi&with_release_type=3|2&primary_release_date.lte=${endDate}&primary_release_date.gte=${startDate}`
        );
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endDate,startDate]);

  if (loading) {
    return <LoadingButton loading variant="outlined">Loading...</LoadingButton>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box container spacing={4} sx={{marginRight: "-8px!important", paddingLeft:35 , paddingRight:35 , paddingTop:5}}><br/><br/>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Movies in Theatre</Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} key={movie.id}>
            <MovieItem movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookingGrid;