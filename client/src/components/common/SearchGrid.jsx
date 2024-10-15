import { Grid } from "@mui/material";
import MediaItem from "./MediaItem";

const SearchGrid = ({
  medias,
  mediaType,
  selectedYear,
  selectedGenres,
  releaseDateFrom,
  releaseDateTo,
  voteAverageFrom,
  voteAverageTo,
  voteCountFrom,
  voteCountTo,
  selectedLanguage,
}) => {
  const filteredMedias = medias.filter((media) => {
    // Extract release date from media
    const mediaDate = new Date(media.release_date || media.first_air_date); // Handles both movies and TV shows
    const mediaYear = mediaDate.getFullYear();
    const mediaGenres = media.genre_ids;
    const mediaVoteAverage = media.vote_average;
    const mediaVoteCount = media.vote_count;
    const mediaLanguage = media.original_language; // Assuming original_language holds the media's language

    // Filter by year
    const matchesYear = selectedYear ? mediaYear === parseInt(selectedYear) : true;

    // Filter by genres
    const matchesGenres = selectedGenres.length > 0
      ? selectedGenres.some((genre) => mediaGenres.includes(genre))
      : true;

    // Filter by release date range
    const matchesReleaseDate = (() => {
      if (releaseDateFrom && releaseDateTo) {
        const fromDate = new Date(releaseDateFrom);
        const toDate = new Date(releaseDateTo);
        return mediaDate >= fromDate && mediaDate <= toDate;
      } else if (releaseDateFrom) {
        const fromDate = new Date(releaseDateFrom);
        return mediaDate >= fromDate;
      } else if (releaseDateTo) {
        const toDate = new Date(releaseDateTo);
        return mediaDate <= toDate;
      }
      return true;
    })();

    // Filter by vote average range
    const matchesVoteAverage = (() => {
      if (voteAverageFrom && voteAverageTo) {
        return mediaVoteAverage >= parseFloat(voteAverageFrom) && mediaVoteAverage <= parseFloat(voteAverageTo);
      } else if (voteAverageFrom) {
        return mediaVoteAverage >= parseFloat(voteAverageFrom);
      } else if (voteAverageTo) {
        return mediaVoteAverage <= parseFloat(voteAverageTo);
      }
      return true;
    })();

    // Filter by vote count range
    const matchesVoteCount = (() => {
      if (voteCountFrom && voteCountTo) {
        return mediaVoteCount >= parseFloat(voteCountFrom) && mediaVoteCount <= parseFloat(voteCountTo);
      } else if (voteCountFrom) {
        return mediaVoteCount >= parseFloat(voteCountFrom);
      } else if (voteCountTo) {
        return mediaVoteCount <= parseFloat(voteCountTo);
      }
      return true;
    })();

    // Filter by language
    const matchesLanguage = selectedLanguage ? mediaLanguage === selectedLanguage : true;

    // Return true only if all filters match, ensuring the year filter and others are applied
    return matchesYear && matchesGenres && matchesReleaseDate && matchesVoteAverage && matchesVoteCount && matchesLanguage;
  });

  return (
    <Grid container spacing={4} sx={{ marginRight: "-8px!important" }}>
      {filteredMedias.map((media, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}

      {/* Show message if no media matches the filters */}
      {filteredMedias.length === 0 && (
        <Grid item xs={12}>
          <p>No media found matching the selected filters.</p>
        </Grid>
      )}
    </Grid>
  );
};

export default SearchGrid;
