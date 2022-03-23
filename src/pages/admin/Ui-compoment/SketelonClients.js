import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';


function Media(props) {

    return (
        <Grid container wrap="nowrap">
            <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>





                <div className="row col-lg-12 col-md-12 col-sm-12 col-12">



                    <td className="col-10 col-lg-7 col-md-7 col-sm-10 m-auto">
                        <div>
                            <table className="col-12 col-sm-12 m-auto" id="price_table">
                                <tr>
                                    <td><b><Skeleton width="100%" /></b></td>
                                </tr>
                                <tr>
                                    <td><b><Skeleton width="100%" /></b></td>
                                </tr>
                                <tr>
                                    <td><b><Skeleton width="100%" /></b></td>
                                </tr>
                                <tr>
                                    <td><b><Skeleton width="100%" /></b></td>
                                </tr>
                                <tr>
                                    <td><b><Skeleton width="100%" /></b></td>
                                </tr>
                                <tr>
                                    <td><b><Skeleton width="100%" /></b></td>
                                </tr>
                                <tr>
                                    <td><b><Skeleton width="100%" /></b></td>
                                </tr>
                            </table>


                        </div>
                    </td>

                    <td className="col-2 col-lg-3 col-md-2 col-sm-2 text-center m-auto">
                        <div id="buttons">
                            <div className="row">
                                <div className="col-2 col-lg-6 col-md-6 col-sm-2 edit_div text-center m-auto">
                                    <Skeleton width="100%" />
                                </div>
                                <div  className="col-2 col-lg-6 col-md-6 col-sm-2 text-center m-auto">

                                    <Skeleton width="100%" />

                                </div>
                            </div>

                        </div>
                    </td>



                </div>

        </Box>


        </Grid>
    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};

export default function YouTube() {
    return (
            <tr>
                <Box sx={{ overflow: 'hidden' }}>
                    <Media />
                </Box>
            </tr>


    );
}
