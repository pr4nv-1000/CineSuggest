import { useState, useEffect, useCallback } from "react";
import { Box, Grid, Typography } from "@mui/material";
import advancedMediaApi from "../../api/modules/advancedMedia.api";
import { toast } from "react-toastify";
import MediaItem from "../common/MediaItem";


const FilteredGrid = ({
  mediaType,
  genres,
  year,
  releaseDateFrom,
  releaseDateTo,
  voteAverageRange,
  language,             // New language filter
  runtimeRange,         // New runtime filter
  certification,        // New certification filter
  sortBy                // New sortBy filter
}) => {
  const [filteredData, setFilteredData] = useState([]); // State for filtered media
  const [loading, setLoading] = useState(false); // Loading state

  // Function to fetch filtered data
  const fetchFilteredData = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching

    try {
      const { response, err } = await advancedMediaApi.search({
        mediaType: "movie", // Can be dynamic or configurable
        genres: genres.length > 0 ? genres : undefined,
        year: year || undefined,
        releaseDateFrom: releaseDateFrom || undefined,
        releaseDateTo: releaseDateTo || undefined,
        voteAverageFrom: voteAverageRange[0],
        voteAverageTo: voteAverageRange[1],
        language: language || undefined,                 // Include language filter
        runtimeFrom: runtimeRange ? runtimeRange[0] : undefined,  // Include runtime filter
        runtimeTo: runtimeRange ? runtimeRange[1] : undefined,
        certification: certification || undefined,       // Include certification filter
        sortBy: sortBy || undefined                      // Include sorting option
      });

      if (err) {
        toast.error("Error fetching data");
      } else {
        setFilteredData(response?.results || []); // Store filtered results
      }
    } catch (error) {
      toast.error("Error loading filtered data");
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  }, [genres, year, releaseDateFrom, releaseDateTo, voteAverageRange, language, runtimeRange, certification, sortBy]);

  // Fetch data when component mounts or filters change
  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]);

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      {loading ? (
        <Typography>Loading...</Typography> // Show loading message while fetching data
      ) : filteredData.length > 0 ? (
        <Grid container spacing={2}>
          {filteredData.map((media) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={media.id}>
              {/* Replacing custom card with MediaItem component */}
              <MediaItem media={media} mediaType={mediaType} /> {/* Adjust mediaType as needed */}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No results found</Typography> // Message if no results match the filters
      )}
    </Box>
  );
};

export default FilteredGrid;
