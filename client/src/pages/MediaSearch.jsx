import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import advancedMediaApi from "../api/modules/advancedMedia.api";
import MediaGrid from "../components/common/MediaGrid";
import FilteredGrid from "../components/common/FilteredGrid";
import FiltersPane from "../components/common/FiltersPane";
import uiConfigs from "../configs/ui.configs";

const mediaTypes = ["movie", "tv", "people", "advanced"];

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  // State for advanced filters
  const [genres, setGenres] = useState([]);
  const [year, setYear] = useState("");
  const [releaseDateFrom, setReleaseDateFrom] = useState("");
  const [releaseDateTo, setReleaseDateTo] = useState("");
  const [voteAverageRange, setVoteAverageRange] = useState([0, 10]);
  const [voteCountRange, setVoteCountRange] = useState([0, 500]);

  // New states for additional filters
  const [language, setLanguage] = useState("");
  const [runtimeRange, setRuntimeRange] = useState([0, 300]);
  const [certification, setCertification] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Helper function to handle deselection in dropdowns
  const handleSelectChange = (value, currentValue, setValue) => {
    if (value === currentValue) {
      setValue(''); // Deselect if the same value is clicked
    } else {
      setValue(value); // Otherwise, select the new value
    }
  };

  // Search function
  const search = useCallback(
    async () => {
      setOnSearch(true);

      if (mediaType === "advanced") {
        const payload = {
          mediaType,  // Can be dynamic or configurable
          genres: genres.length > 0 ? genres : undefined,
          year: year || undefined,
          releaseDateFrom: releaseDateFrom || undefined,
          releaseDateTo: releaseDateTo || undefined,
          voteAverageFrom: voteAverageRange[0],
          voteAverageTo: voteAverageRange[1],
          voteCountFrom: voteCountRange[0],
          voteCountTo: voteCountRange[1],
          language: language || undefined,              // Include language filter
          runtimeFrom: runtimeRange[0],                 // Include runtime filter
          runtimeTo: runtimeRange[1],
          certification: certification || undefined,    // Include certification filter
          sortBy: sortBy || undefined                   // Include sortBy filter
        };

        const { response, err } = await advancedMediaApi.search(payload);

        setOnSearch(false);

        if (err) {
          toast.error(err.message);  // Show error message if request fails
        }

        if (response) {
          if (page > 1) setMedias(m => [...m, ...response.results]);
          else setMedias([...response.results]);
        }
      } else {
        const { response, err } = await mediaApi.search({
          mediaType,
          query,
          page
        });

        setOnSearch(false);

        if (err) {
          toast.error(err.message);
        }

        if (response) {
          if (page > 1) setMedias(m => [...m, ...response.results]);
          else setMedias([...response.results]);
        }
      }
    },
    [mediaType, query, page, genres, year, releaseDateFrom, releaseDateTo, voteAverageRange, voteCountRange, language, runtimeRange, certification, sortBy]
  );

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else if (mediaType !== "advanced") {
      search();
    }
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  // Trigger search after each filter change
  const handleFiltersChange = (newFilters) => {
    if (mediaType === "advanced") {
      setPage(1);  // Reset page when filters change
      search();    // Trigger search
    }
  };

  const onCategoryChange = (selectedCategory) => {
    setMediaType(selectedCategory);
    setPage(1);
    setQuery(""); // Clear the search field when changing categories
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent, display: 'flex', width: '100%' }}>
        {/* Only show FiltersPane when advanced category is selected */}
        {mediaType === "advanced" ? (
          <Box sx={{ width: '20%', padding: '85px 16px 16px 0px', margin: 0 }}>
            <FiltersPane
              genres={genres}
              setGenres={setGenres}
              year={year}
              setYear={setYear}
              releaseDateFrom={releaseDateFrom}
              setReleaseDateFrom={setReleaseDateFrom}
              releaseDateTo={releaseDateTo}
              setReleaseDateTo={setReleaseDateTo}
              voteAverageRange={voteAverageRange}
              setVoteAverageRange={setVoteAverageRange}
              voteCountRange={voteCountRange}
              setVoteCountRange={setVoteCountRange}
              language={language}                        // Pass language state to FiltersPane
              setLanguage={(value) => handleSelectChange(value, language, setLanguage)}
              runtimeRange={runtimeRange}                // Pass runtime range to FiltersPane
              setRuntimeRange={setRuntimeRange}
              certification={certification}              // Pass certification to FiltersPane
              setCertification={(value) => handleSelectChange(value, certification, setCertification)}
              sortBy={sortBy}                            // Pass sortBy to FiltersPane
              setSortBy={(value) => handleSelectChange(value, sortBy, setSortBy)}
              onFiltersChange={handleFiltersChange}
            />
          </Box>
        ) : (
          <Box sx={{ width: '0%', padding: 2 }} />
        )}

        {/* Conditional Rendering: Use FilteredGrid or MediaGrid based on mediaType */}
        <Box sx={{ width: mediaType === "advanced" ? '70%' : '100%', padding: 2 }}>
          <Stack spacing={2}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              {mediaTypes.map((item, index) => (
                <Button
                  size="large"
                  key={index}
                  variant={mediaType === item ? "contained" : "text"}
                  sx={{
                    color: mediaType === item ? "primary.contrastText" : "text.primary"
                  }}
                  onClick={() => onCategoryChange(item)}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            {mediaType === "advanced" ? (
              <FilteredGrid
                mediaType="movie"
                genres={genres}
                year={year}
                releaseDateFrom={releaseDateFrom}
                releaseDateTo={releaseDateTo}
                voteAverageRange={voteAverageRange}
                voteCountRange={voteCountRange}
                language={language}                      // Pass language filter to FilteredGrid
                runtimeRange={runtimeRange}              // Pass runtime range to FilteredGrid
                certification={certification}            // Pass certification filter to FilteredGrid
                sortBy={sortBy}                          // Pass sortBy filter to FilteredGrid
                medias={medias}
              />
            ) : (
              <>
                <TextField
                  color="success"
                  placeholder="Search CineSuggest"
                  sx={{ width: "100%" }}
                  autoFocus
                  value={query} // Bind value to the query state
                  onChange={(e) => setQuery(e.target.value)} // Update query state on input change
                />
                <MediaGrid medias={medias} mediaType={mediaType} />
              </>
            )}

            {medias.length > 0 && (
              <LoadingButton
                loading={onSearch}
                onClick={() => setPage(page + 1)}
              >
                load more
              </LoadingButton>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default MediaSearch;
