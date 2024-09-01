import { Box } from "@mui/material";
import { FC } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { H5 } from "../Typography/Typography";

const OrderCmp: FC<{ type: 'ASC' | 'DESC', active?: boolean, onClick: () => void }> = ({ type, active, onClick }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 0,
                alignItems: 'flex-start',
                marginLeft: '10px',
                cursor: 'pointer',
                color: active ? 'black' : 'text.disabled',
                '&:hover': {
                    cursor: 'pointer',
                    color: "#2499EF",
                },
            }}
            onClick={onClick}
        >
            <H5 >
                {type}
            </H5>
            {type === 'ASC' && <ExpandMore
                sx={{
                    fontSize: 18,
                }}
            />}

            {type === 'DESC' && <ExpandLess
                sx={{
                    fontSize: 18,
                }}
            />}

        </Box>
    );
};

export default OrderCmp;
