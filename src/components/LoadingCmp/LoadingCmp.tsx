import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

const LoadingScreen: FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <CircularProgress />
            <Typography
                variant="h6"
                sx={{ mt: 2 }}
            >
                Loading...
            </Typography>
        </Box>
    );
};

export default LoadingScreen;
