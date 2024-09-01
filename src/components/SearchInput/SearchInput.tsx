import { InputBase, InputBaseProps } from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import { styled } from "@mui/material";

interface StyledInputBaseProps extends InputBaseProps {
    hasError?: boolean;
}

const StyledInputBase = styled(InputBase, {
    shouldForwardProp: (prop) => prop !== 'hasError',
})<StyledInputBaseProps>(({ theme, hasError }) => ({
    height: 45,
    fontSize: 13,
    width: "100%",
    fontWeight: 500,
    padding: "0 1rem",
    borderRadius: "8px",
    border: `1px solid ${hasError ? theme.palette.error.main : theme.palette.secondary[300]}`,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down(500)]: { maxWidth: "100%" },

    '&:focus-within': {
        border: `1px solid ${hasError ? theme.palette.error.main : theme.palette.primary.main}`,
    },

    '&::after': {
        content: hasError ? '"Invalid input"' : '""',
        position: 'absolute',
        bottom: '-20px',
        left: 0,
        color: theme.palette.error.main,
        fontSize: '12px',
    },
}));


const SearchInput: FC<InputBaseProps> = (props) => {
    const [hasError, setHasError] = useState<boolean>(false);

    const isValidInput = (value: string) => /^[a-zA-Z0-9_.-]*$/.test(value);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        const error = !isValidInput(value);
        setHasError(error);

        if (props.onChange) {
            props.onChange(event);
        }
    };


    return (
        <StyledInputBase
            {...props}
            hasError={hasError}
            onChange={handleChange}
            startAdornment={
                <SearchOutlined
                    sx={{
                        fontSize: 16,
                        marginRight: 1,
                        color: "text.disabled",
                    }}
                />
            }
        />
    );
};

export default SearchInput;
