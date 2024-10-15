import React, { useState } from 'react';
import { Box, Button, Typography, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Container from './Container';
import MovieSlide from './MovieSlide';  // Import the MovieSlide component
import uiConfigs from '../../configs/ui.configs';

// Styled component for all selection cards (Mood, Occasion, Genre, Movie Age, Additional Categories)
const SelectionCard = styled(Box)(({ theme, selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px solid ${selected ? theme.palette.primary.main : 'transparent'}`,
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const moods = [
  { value: 'Happy', label: 'Happy', icon: '😊' }, 
  { value: 'Neutral', label: 'Neutral', icon: '😐' },
  { value: 'Sad', label: 'Sad', icon: '😢' },
];

const occasions = [
  { value: 'Just watching by myself', label: 'Just Watching by Myself', icon: '🎬' },
  { value: 'Movie Date', label: 'Movie Date', icon: '🍿' },
  { value: 'Movie Night with Friends', label: 'Movie Night with Friends', icon: '🎉' },
  { value: 'Watching a movie with family or relatives', label: 'Family Movie Night', icon: '👨‍👩‍👧‍👦' },
  { value: 'Date Night with boyfriend or girlfriend', label: 'Date Night', icon: '❤️' },
];

const genres = [
  'Action', 'Comedy', 'Drama', 'Adventure', 'Thriller', 'Crime', 'Romance', 
  'Science Fiction', 'Fantasy', 'Family', 'Mystery', 'Biography', 'History', 
  'Animation', 'Music', 'Sport', 'Disaster', 'Western', 'War', 'Horror',
];

const movieAges = [
  { value: 'Doesn\'t matter', label: 'Doesn\'t matter' },
  { value: 'Published in the last 3 years', label: 'Published in the last 3 years' },
  { value: 'Published in the last 5 years', label: 'Published in the last 5 years' },
  { value: 'Published in the last 10 years', label: 'Published in the last 10 years' },
  { value: 'Published in the last 20 years', label: 'Published in the last 20 years' }, 
];

const additionalCategories = [
  'Movies based on a true story', 'Movies that may change the way you look at life', 
  'Movies set in New York City', 'Spy Movies and Cop Movies', 'Space Movies', 
  'Wedding Movies', 'Heist Movies', 'Movies based on a book', 'Racing Movies', 
  'Girl Power Movies', 'IMDb Top 250 Movies',
];

const QuestionnaireForm = () => {
  const [formData, setFormData] = useState({
    mood: '',
    occasion: '',
    genres: [],
    movieAge: '',
    additionalCategories: [],
  });

  const [recommendations, setRecommendations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(true); // For controlling opacity
  const [isSubmitted, setIsSubmitted] = useState(false);  // Track if form is submitted

  const formSteps = [
    'Mood Selection',
    'Occasion Selection',
    'Genre Selection',
    'Movie Age Selection',
    'Additional Categories',
  ];

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: Array.isArray(prevState[name])
        ? prevState[name].includes(value)
          ? prevState[name].filter((item) => item !== value)
          : [...prevState[name], value]
        : value,
    }));
  };

  const handleSubmit = async () => {
    const answers = {
      mood: formData.mood,
      genre: formData.genres,
      occasion: formData.occasion,
      age: formData.movieAge,
      category: formData.additionalCategories,
    };
    console.log(answers);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        const recommendedMovieIds = await response.json(); // Expecting an array of movie IDs
        setRecommendations(recommendedMovieIds); // Store the movie IDs for use in MovieSlide
        setIsSubmitted(true);  // Hide the form and show movie recommendations
      } else {
        console.error('Failed to fetch recommendations');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    let errorMsg = '';
    switch (currentStep) {
      case 0:
        if (!formData.mood) errorMsg = 'Please select your mood.';
        break;
      case 1:
        if (!formData.occasion) errorMsg = 'Please select an occasion.';
        break;
      case 3:
        if (!formData.movieAge) errorMsg = 'Please select a movie age.';
        break;
      default:
        errorMsg = '';
    }

    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError('');
      setFade(false); // Trigger fade out
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setFade(true); // Trigger fade in
      }, 300); // Delay to sync with fade out
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setFade(false); // Trigger fade out
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setFade(true); // Trigger fade in
      }, 300); // Delay to sync with fade out
    }
  };

  // Reset the form and movie recommendations
  const resetForm = () => {
    setFormData({
      mood: '',
      occasion: '',
      genres: [],
      movieAge: '',
      additionalCategories: [],
    });
    setRecommendations([]);  // Clear recommendations
    setCurrentStep(0);  // Go back to the first step
    setIsSubmitted(false);  // Show the form again
  };

  // Mood Selection component
  const MoodSelection = ({ mood }) => (
    <Grid container spacing={2} justifyContent="center">
      {moods.map((moodOption) => (
        <Grid item key={moodOption.value} xs={4}>
          <SelectionCard
            selected={mood === moodOption.value}
            onClick={() => handleChange('mood', moodOption.value)}
          >
            <Box fontSize={50}>{moodOption.icon}</Box>
            <Typography variant="h6">{moodOption.label}</Typography>
          </SelectionCard>
        </Grid>
      ))}
    </Grid>
  );

  // Occasion Selection component
  const OccasionSelection = ({ occasion }) => (
    <Grid container spacing={2} justifyContent="center">
      {occasions.map((occasionOption) => (
        <Grid item key={occasionOption.value} xs={4}>
          <SelectionCard
            selected={occasion === occasionOption.value}
            onClick={() => handleChange('occasion', occasionOption.value)}
          >
            <Box fontSize={50}>{occasionOption.icon}</Box>
            <Typography variant="h6">{occasionOption.label}</Typography>
          </SelectionCard>
        </Grid>
      ))}
    </Grid>
  );

  // Genre Selection component
  const GenreSelection = ({ genresSelected }) => (
    <Grid container spacing={2} justifyContent="center">
      {genres.map((genre) => (
        <Grid item key={genre} xs={6} sm={4} md={3}>
          <SelectionCard
            selected={genresSelected.includes(genre)}
            onClick={() => handleChange('genres', genre)}
          >
            <Typography variant="h6">{genre}</Typography>
          </SelectionCard>
        </Grid>
      ))}
    </Grid>
  );

  // Movie Age Selection component
  const MovieAgeSelection = ({ movieAge }) => (
    <Grid container spacing={2} justifyContent="center">
      {movieAges.map((ageOption) => (
        <Grid item key={ageOption.value} xs={6} sm={4}>
          <SelectionCard
            selected={movieAge === ageOption.value}
            onClick={() => handleChange('movieAge', ageOption.value)}
          >
            <Typography variant="h6">{ageOption.label}</Typography>
          </SelectionCard>
        </Grid>
      ))}
    </Grid>
  );

  // Additional Categories Selection component
  const AdditionalCategoriesSelection = ({ additionalCategoriesSelected }) => (
    <Grid container spacing={2} justifyContent="center">
      {additionalCategories.map((category) => (
        <Grid item key={category} xs={6} sm={4} md={3}>
          <SelectionCard
            selected={additionalCategoriesSelected.includes(category)}
            onClick={() => handleChange('additionalCategories', category)}
          >
            <Typography variant="h6">{category}</Typography>
          </SelectionCard>
        </Grid>
      ))}
    </Grid>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Container header="How are you today?">
            <MoodSelection mood={formData.mood} />
          </Container>
        );
      case 1:
        return (
          <Container header="What comes closest to your occasion?">
            <OccasionSelection occasion={formData.occasion} />
          </Container>
        );
      case 2:
        return (
          <Container header="Please choose any genre you're interested in">
            <GenreSelection genresSelected={formData.genres} />
          </Container>
        );
      case 3:
        return (
          <Container header="How old would you like the movie to be?">
            <MovieAgeSelection movieAge={formData.movieAge} />
          </Container>
        );
      case 4:
        return (
          <Container header="Please select any other category you're interested in">
            <AdditionalCategoriesSelection additionalCategoriesSelected={formData.additionalCategories} />
          </Container>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent, paddingTop: 20 }}>
      {isSubmitted ? (  // Only show MovieSlide if the form is submitted
        <>
          <Typography variant="h4" textAlign="center">Recommended Movies</Typography>
          <MovieSlide movieIds={recommendations} />  {/* MovieSlide integration */}
          <Box mt={4} textAlign="center">
            <Button onClick={resetForm} variant="contained">Recommend me again</Button>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              opacity: fade ? 1 : 0,
              transition: 'opacity 300ms ease-in-out',
            }}
          >
            {renderStepContent()}
          </Box>

          {error && (
            <Typography color="error" variant="body1" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box mt={4} display="flex" justifyContent="center">
            <Button disabled={currentStep === 0} onClick={handleBack}>
              Back
            </Button>
            {currentStep === formSteps.length - 1 ? (
              <Button onClick={handleSubmit} disabled={loading} sx={{ ml: 2 }} variant="contained">
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            ) : (
              <Button onClick={handleNext} sx={{ ml: 2 }} variant="contained">
                Next
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default QuestionnaireForm;
