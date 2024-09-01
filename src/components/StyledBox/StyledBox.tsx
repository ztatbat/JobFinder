import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
    padding: '1rem 3rem',
    maxWidth: '1200px',
    [theme.breakpoints.down("sm")]: {
        padding: '0.5rem 0.5rem'
    },
}));
