import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetail";
import Watchlist from "../pages/WatchList";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import PasswordUpdate from "../pages/PasswordUpdate";
import ReviewList from "../pages/ReviewList";
import BookingPage from "../pages/BookingPage.jsx";
import ProtectedPage from "../components/common/ProtectedPage";
import BookingDetail from "../pages/BookingDetail"
import BookingList from "../pages/BookingList";
import RecommendPage from "../pages/Recommend.jsx";

export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  watchlistList: "/watchlists",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
  booking:"/booking",
  bookingdetail : (id) => `/booking/${id}`,
  bookingList:"/bookings",
  recommend:"/recommend"
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail"
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search"
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update"
  },
  {
    path: "/watchlists",
    element: (
      <ProtectedPage>
        <Watchlist />
      </ProtectedPage>
    ),
    state: "watchlists"
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews"
  },
  {
    path: "/bookings",
    element: (
      <ProtectedPage>
        <BookingList />
      </ProtectedPage>
    ),
    state: "bookings"
  },
  {
    path: "/:mediaType",
    element: <MediaList />
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />
  },
  {
    path: "/booking",
    element: (
      <ProtectedPage>
        <BookingPage />
      </ProtectedPage>
    ),
    state: "booking"
  },
  {
    path: "/booking/:mediaId",
    element: <BookingDetail />
  },
  {
    path: "/recommend",
    element: <RecommendPage />
  }
];

export default routes;
