import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, MenuItem, Popover, Fade } from "@mui/material";
import { FC, useRef, useState } from "react";
import { H5, H6, Small } from "../Typography/Typography";
import Grid from '@mui/material/Grid2';

interface DropDownSelectProps {
    value?: string;
    onSelect: (value: string) => void;
    options: string[];
    defaultValue?: string;
    label: string;
}

const DropDownSelect: FC<DropDownSelectProps> = ({
    value,
    onSelect,
    options,
    defaultValue,
    label
}) => {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const displayValue = options.includes(value || "") ? value : defaultValue;

    const handleChange = (item: string) => {
        onSelect(item);
        setOpen(false);
    };

    const handleButtonClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid style={{ display: 'flex', alignItems: 'center', margin: "0px 0px", gap: 3 }}>
            <H5>
                {label} :
            </H5>
            <div>
                <Button
                    disableRipple
                    onClick={handleButtonClick}
                    ref={anchorRef}
                    endIcon={<KeyboardArrowDown sx={{ color: "text.disabled" }} />}
                    sx={{ p: 0, "&:hover": { backgroundColor: "transparent" } }}
                >
                    <H6 color="text.disabled">{displayValue}</H6>
                </Button>
                <Popover
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorRef.current}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 500 }}
                >
                    {options.map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => handleChange(item)}
                            sx={{
                                "&:hover": {
                                    color: "primary.main",
                                },
                            }}
                        >
                            <Small fontWeight={500} py={0.5}>
                                {item}
                            </Small>
                        </MenuItem>
                    ))}
                </Popover>
            </div>
        </Grid>
    );
};

export default DropDownSelect;
