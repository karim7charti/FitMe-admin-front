import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import axios from "axios";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";


function Media(props) {

    return (
        <Grid container wrap="nowrap">
            <Box sx={{ width: 1000, marginRight: 0.5, my: 1 }}>






            </Box>
        </Grid>
    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};

export default function YouTube() {
    return (

        <Box sx={{ overflow: 'hidden' }}>
            <Media />
        </Box>

    );
}
