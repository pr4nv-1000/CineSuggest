import { Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel, Select, MenuItem, Typography, TextField, Slider, Stack, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FiltersPane = ({
  genres, setGenres,
  year, setYear,
  releaseDateFrom, setReleaseDateFrom,
  releaseDateTo, setReleaseDateTo,
  voteAverageRange, setVoteAverageRange,
  language, setLanguage,
  runtimeRange, setRuntimeRange,
  certification, setCertification,
  sortBy, setSortBy
}) => {

  const genreOptions = [
    { id: 28, label: 'Action' },
    { id: 12, label: 'Adventure' },
    { id: 16, label: 'Animation' },
    { id: 35, label: 'Comedy' },
    { id: 80, label: 'Crime' },
    { id: 99, label: 'Documentary' },
    { id: 18, label: 'Drama' },
    { id: 10751, label: 'Family' },
    { id: 14, label: 'Fantasy' },
    { id: 36, label: 'History' },
    { id: 27, label: 'Horror' },
    { id: 10402, label: 'Music' },
    { id: 9648, label: 'Mystery' },
    { id: 10749, label: 'Romance' },
    { id: 878, label: 'Science Fiction' },
    { id: 10770, label: 'TV Movie' },
    { id: 53, label: 'Thriller' },
    { id: 10752, label: 'War' },
    { id: 37, label: 'Western' }
  ];

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'it', label: 'Italian' },
    { code: 'pt', label: 'Portuguese' },
    { code: 'ru', label: 'Russian' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ja', label: 'Japanese' },
    { code: 'ko', label: 'Korean' },
    { code: 'hi', label: 'Hindi' },
    { code: 'ar', label: 'Arabic' },
    { code: 'nl', label: 'Dutch' },
    { code: 'tr', label: 'Turkish' },
    { code: 'ta', label: 'Tamil' },
    { code: 'te', label: 'Telugu' },
    { code: 'bn', label: 'Bengali' },
    { code: 'fa', label: 'Persian' },
    { code: 'pl', label: 'Polish' },
    { code: 'sv', label: 'Swedish' },
    { code: 'th', label: 'Thai' }
  ];

  const certificationOptions = [
    { value: 'G', label: 'G' },
    { value: 'PG', label: 'PG' },
    { value: 'PG-13', label: 'PG-13' },
    { value: 'R', label: 'R' },
    { value: 'NC-17', label: 'NC-17' }
  ];

  const sortByOptions = [
    { value: 'popularity.desc', label: 'Popularity Descending' },
    { value: 'popularity.asc', label: 'Popularity Ascending' },
    { value: 'release_date.desc', label: 'Release Date Descending' },
    { value: 'release_date.asc', label: 'Release Date Ascending' },
    { value: 'vote_average.desc', label: 'Vote Average Descending' },
    { value: 'vote_average.asc', label: 'Vote Average Ascending' }
  ];

  const handleClearFilters = () => {
    setGenres([]);
    setYear('');
    setReleaseDateFrom('');
    setReleaseDateTo('');
    setVoteAverageRange([0, 10]);
    setLanguage('');
    setRuntimeRange([0, 300]);
    setCertification('');
    setSortBy('');
  };

  // Helper function to handle deselect for Select dropdowns
  const handleSelectChange = (value, currentValue, setValue) => {
    if (value === currentValue) {
      setValue(''); // Deselect if the same value is clicked
    } else {
      setValue(value); // Otherwise, select the new value
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {/* Genres Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="genres-content" id="genres-header">
          <Typography>Genres</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth sx = {{ paddingTop: "16px"}}>
            <InputLabel id="genre-select-label" shrink>Select Genres</InputLabel>
            <Select
              labelId="genre-select-label"
              multiple
              value={genres || []}
              onChange={(e) => setGenres(e.target.value)}
            >
              {genreOptions.map((genre, index) => (
                <MenuItem key={index} value={genre.id}>
                  {genre.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Year Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="year-content" id="year-header">
        <Typography>Release Year</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Release Year"
          type="text"
          value={year}
          onChange={(e) => {
            const inputYear = e.target.value;

        
            if (/^\d{0,4}$/.test(inputYear)) {
            setYear(inputYear);
            }
          }}
          onBlur={() => {
            
            if (year && year < 1874) {
              setYear(1974);
            }
          }}
          error={(year && year < 1874) || (year && year.length !== 4)}
          helperText={
            year && year.length !== 4
            ? 'Year must be 4 digits'
            : year && year < 1974
            ? 'Year cannot be less than 1874'
            : ''
          }
          fullWidth
          InputProps={{
          inputProps: { maxLength: 4 }, // Limit the input length to 4 characters
          // Hide the increment/decrement arrows for number input
          sx: {
            'input[type=number]': {
            MozAppearance: 'textfield',
            },
            'input[type=number]::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            'input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
          },
        }}
        />
      </AccordionDetails>
    </Accordion>

      {/* Release Date Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="release-date-content" id="release-date-header">
          <Typography>Release Date</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Release Date From"
            type="date"
            value={releaseDateFrom}
            onChange={(e) => setReleaseDateFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth sx={{ mb:2 }}
          />
          <TextField
            label="Release Date To"
            type="date"
            value={releaseDateTo}
            onChange={(e) => setReleaseDateTo(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      {/* Vote Average Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="vote-average-content" id="vote-average-header">
          <Typography>Vote Average</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={voteAverageRange}
            onChange={(e, newValue) => setVoteAverageRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.1}
          />
        </AccordionDetails>
      </Accordion>

      {/* Language Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="language-content" id="language-header">
          <Typography>Language</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth sx={{ paddingTop: '16px' }}>
            <InputLabel id="language-select-label" shrink>Select Language</InputLabel>
            <Select
              labelId="language-select-label"
              value={language}
              onChange={(e) => handleSelectChange(e.target.value, language, setLanguage)}
            >
              {languageOptions.map((lang, index) => (
                <MenuItem key={index} value={lang.code}>
                  {lang.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Runtime Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="runtime-content" id="runtime-header">
          <Typography>Runtime (Minutes)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={runtimeRange}
            onChange={(e, newValue) => setRuntimeRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={300}
            step={10}
          />
        </AccordionDetails>
      </Accordion>

      {/* Certification Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="certification-content" id="certification-header">
          <Typography>Certification</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth sx = {{ paddingTop: "16px"}}>
            <InputLabel id="certification-select-label" shrink>Select Certification</InputLabel>
            <Select
              labelId="certification-select-label"
              value={certification}
              onChange={(e) => handleSelectChange(e.target.value, certification, setCertification)}
            >
              {certificationOptions.map((cert, index) => (
                <MenuItem key={index} value={cert.value}>
                  {cert.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Sort By Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="sort-by-content" id="sort-by-header">
          <Typography>Sort By</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth sx={{ paddingTop: '16px'}} >
            <InputLabel id="sort-by-select-label" shrink>Sort By</InputLabel>
            <Select
              labelId="sort-by-select-label"
              value={sortBy}
              onChange={(e) => handleSelectChange(e.target.value, sortBy, setSortBy)}
            >
              {sortByOptions.map((sort, index) => (
                <MenuItem key={index} value={sort.value}>
                  {sort.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Clear Filters Button */}
      <Button variant="contained" color="primary" onClick={handleClearFilters}>
        Clear Filters
      </Button>
    </Stack>
  );
};

export default FiltersPane;
