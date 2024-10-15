import { Box, Typography, } from "@mui/material";

const CenteredBackdrop = ({ imgPath, title, children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "150vh",
        position: "relative",
        display: "flex",
        flexDirection: "column", 
        paddingTop: { xs: "10%", sm: "8%", md: "5%" },
        justifyContent: "flex-start", 
        alignItems: "center", 
        textAlign: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imgPath})`, 
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
          zIndex: -1,
        },
      }}
    >
      {/* Title Section */}
      <Typography
        variant="h4"
        fontWeight="700"
        sx={{
          padding: "1rem",
          borderRadius: "8px",
          maxWidth: "90%",
          zIndex: 1,
        }}
      >
        {title}
      </Typography>

      {/* Container for selection options */}
      <Box
        sx={{
          marginTop: "2rem", 
          zIndex: 2, 
          display: "flex",
          flexDirection: "column", 
          alignItems: "center",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CenteredBackdrop;