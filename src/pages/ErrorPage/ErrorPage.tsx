import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { H1, Paragraph } from "../../components/Typography/Typography";

import errorSvg from '../../assets/svg/work.svg';
import { useNavigate } from 'react-router-dom';

const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds === 0) {
      navigate('/');
    } else {
      const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [seconds, navigate]);

  return (
    <Box
      p={4}
      height="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box maxWidth={350}>
        <img
          src={errorSvg}
          width="100%"
          alt="Error"
        />
      </Box>
      <H1 fontSize={64} fontWeight={700} color="primary.main" mt={3}>
        Something Went Wrong!
      </H1>
      <Paragraph color="text.disabled" fontWeight="500">
        The page you requested could not be found.
      </Paragraph>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" color="text.primary">
          You will be redirected to the main page in
        </Typography>
        <Typography variant="h4">
          {seconds}
        </Typography>
        <Typography variant="h6" color="text.primary">
          {seconds > 1 ? "seconds..." : "second..."}
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorPage;
