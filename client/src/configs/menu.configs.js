import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import WLOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import MovieIcon from '@mui/icons-material/Movie';
import RecommendIcon from '@mui/icons-material/Recommend';

const main = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home"
  },
  {
    display: "movies",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie"
  },
  {
    display: "tv series",
    path: "/tv",
    icon: <LiveTvOutlinedIcon />,
    state: "tv"
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search"
  },
  {
    display: "recommend",
    path: "/recommend",
    icon: <RecommendIcon />,
    state: "recommend"
  },
  {
    display: "booking",
    path: "/booking",
    icon: <MovieIcon/>,
    state: "booking" 
  }
];

const user = [
  {
    display: "watchlist",
    path: "/watchlists",
    icon: <WLOutlinedIcon />,
    state: "watchlist"
  },
  {
    display: "reviews",
    path: "/reviews",
    icon: <RateReviewOutlinedIcon />,
    state: "reviews"
  },
  {
    display: "bookings",
    path: "/bookings",
    icon: <MovieIcon />,
    state: "bookings"
  },
  {
    display: "password update",
    path: "/password-update",
    icon: <LockResetOutlinedIcon />,
    state: "password.update"
  }
];

const menuConfigs = { main, user };

export default menuConfigs;