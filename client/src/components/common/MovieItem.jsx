import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import WLicon from "@mui/icons-material/LocalMovies";
import { useSelector } from "react-redux";
import watchlistUtils from "../../utils/watchlist.utils";

const MovieItem = ({ movie }) => {
  const { listWatchlists } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const date = new Date(movie.release_date);
  const options = { year: 'numeric', month: 'long' };
  const formattedDate  = date.toLocaleDateString('en-US', options);

  useEffect(() => {
    setTitle(movie.title || movie.original_title);

    setPosterPath(tmdbConfigs.posterPath(movie.poster_path));

    setReleaseDate(formattedDate);
  }, [movie,formattedDate]);

  return (
    <Link to={routesGen.bookingdetail(movie.id)}>
      <Box sx={{
        ...uiConfigs.style.backgroundImage(posterPath),
        paddingTop: "160%",
        "&:hover .movie-info": { opacity: 1, bottom: 0 },
        "&:hover .movie-back-drop, &:hover .movie-play-btn": { opacity: 1 },
        color: "primary.contrastText"
      }}>
        {/* movie item */}
        <>
          {watchlistUtils.check({ listWatchlists, mediaId: movie.id }) && (
            <WLicon
              color="primary"
              sx={{
                position: "absolute",
                top: 2,
                right: 2,
                fontSize: "2rem"
              }}
            />
          )}
          <Box className="movie-back-drop" sx={{
            opacity: { xs: 1, md: 0 },
            transition: "all 0.3s ease",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
          }} />
          
          <Box
            className="movie-info"
            sx={{
              transition: "all 0.3s ease",
              opacity: { xs: 1, md: 0 },
              position: "absolute",
              bottom: { xs: 0, md: "-20px" },
              width: "100%",
              height: "max-content",
              boxSizing: "border-box",
              padding: { xs: "10px", md: "2rem 1rem" }
            }}
          >
            <Stack spacing={{ xs: 1, md: 2 }}>  

              <Typography>{releaseDate}</Typography>

              <Typography
                variant="body1"
                fontWeight="700"
                sx={{
                  fontSize: "1rem",
                  ...uiConfigs.style.typoLines(1, "left")
                }}
              >
                {title}
              </Typography>
            </Stack>
          </Box>
        </>
      </Box>
    </Link>
  );
};

export default MovieItem;