import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Stack, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { routesGen } from "../routes/routes";
import bookingApi from "../api/modules/booking.api";

const BookingItem = ({ booking, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false); // State for cancel dialog
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // State for details dialog

  const handleCancelClick = () => {
    if (openCancelDialog) {
      handleConfirmCancel();
    } else {
      setOpenCancelDialog(true); // Open confirmation dialog
    }
  };

  const handleConfirmCancel = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await bookingApi.remove({ bookingId: booking.id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove booking success");
      onRemoved(booking.id);
    }

    setOpenCancelDialog(false); // Close the dialog after confirmation
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false); // Close cancel dialog without confirming
  };

  const handleShowDetails = () => {
    setOpenDetailsDialog(true); // Open details dialog
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false); // Close details dialog
  };

  return (
    <Box sx={{
      position: "relative",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      padding: 1,
      opacity: onRequest ? 0.6 : 1,
      "&:hover": { backgroundColor: "background.paper" }
    }}>
      <Box sx={{ width: { xs: 0, md: "10%" } }}>
        <Link
          to={routesGen.mediaDetail("movie", booking.mediaId)}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <Box sx={{
            paddingTop: "160%",
            ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(booking.mediaPoster))
          }} />
        </Link>
      </Box>

      <Box sx={{
        width: { xs: "100%", md: "80%" },
        padding: { xs: 0, md: "0 2rem" }
      }}>
        <Stack spacing={1}>
          <Link
            to={routesGen.mediaDetail("movie", booking.mediaId)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Typography
              variant="h4"
              sx={{ ...uiConfigs.style.typoLines(1, "left") , fontWeight: 'bold'}}
            >
              {booking.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">Booking Date : <Typography component="span" sx={{fontWeight: 'bold'}}>{booking.bookingDate}</Typography></Typography>
          <Typography variant="caption">Showtime : <Typography component="span" sx={{fontWeight: 'bold'}}>{booking.showtime}</Typography></Typography>
          <Typography variant="caption">Theatre : <Typography component="span" sx={{fontWeight: 'bold'}}>{booking.theater}</Typography></Typography>
          <Typography variant="caption">Selected Seats : <Typography component="span" sx={{fontWeight: 'bold'}}>{booking.selectedSeats.join(",")}</Typography></Typography>
          <Typography variant="caption">Total Amount : <Typography component="span" sx={{fontWeight: 'bold'}}>{"Rs. " + booking.totalPrice}</Typography></Typography>
          <Typography variant="caption">{"Booking Created at : "+dayjs(booking.createdAt).format("DD-MM-YYYY HH:mm:ss")}</Typography>
          <Typography variant="caption" sx={{ ...uiConfigs.style.typoLines(1, "left") , fontWeight: 'bold'}}>
            <Typography component="span" variant="h7" color="primary">{`Booking Id : ${booking.id}`}</Typography>       
          </Typography>
        </Stack>
      </Box>

      <Stack direction="row" spacing={2} sx={{
        position: { xs: "relative", md: "absolute" },
        right: { xs: 0, md: "10px" },
        marginTop: { xs: 2, md: 0 },
      }}>
        <LoadingButton
          variant="contained"
          startIcon={<InfoIcon />}
          loadingPosition="start"
          onClick={handleShowDetails} // Trigger details dialog
        >
          Show Details
        </LoadingButton>
        
        <LoadingButton
          variant="contained"
          startIcon={<DeleteIcon />}
          loadingPosition="start"
          loading={onRequest}
          onClick={handleCancelClick} // Trigger cancel dialog
        >
          Cancel
        </LoadingButton>
      </Stack>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
      >
        <DialogTitle>{"Confirm Cancellation"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel the booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog
        open={openDetailsDialog}
        onClose={handleCloseDetailsDialog}
      >
        <DialogTitle>{"Booking Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" gutterBottom>
              <strong>Movie Title:</strong> {booking.mediaTitle}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Booking Date:</strong> {booking.bookingDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Showtime:</strong> {booking.showtime}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Theatre:</strong> {booking.theater}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Selected Seats:</strong> {booking.selectedSeats.join(",")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Total Amount:</strong> {booking.totalPrice}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Language:</strong> {booking.language}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Format:</strong> {booking.format}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Booking Created At:</strong> {dayjs(booking.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Booking ID:</strong> {booking.id}
            </Typography>            
            {/* You can add more details here as needed */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 3;

  useEffect(() => {
    const getBookings = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await bookingApi.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setBookings([...response]);
        setFilteredBookings([...response].splice(0, skip));
      }
    };

    getBookings();
  }, [dispatch]);

  const onLoadMore = () => {
    setFilteredBookings([...filteredBookings, ...[...bookings].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newBookings = [...bookings].filter(e => e.id !== id);
    setBookings(newBookings);
    setFilteredBookings([...newBookings].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your bookings (${count})`}>
        <Stack spacing={2}>
          {filteredBookings.map((item) => (
            <Box key={item.id}>
              <BookingItem booking={item} onRemoved={onRemoved} />
              <Divider sx={{
                display: { xs: "block", md: "none" }
              }} />
            </Box>
          ))}
          {filteredBookings.length < bookings.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default BookingList;
