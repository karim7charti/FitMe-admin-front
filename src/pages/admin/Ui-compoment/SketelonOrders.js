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


                        <div className="row py-auto">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-auto">
                                <div className="row  my-auto">
                                    <div className="col-lg-3 col-md-3 col-sm-11 col-11 my-auto mx-auto">
                                        <Skeleton variant="rectangular" className="mx-auto" height={150} width={110}  style={{borderRadius:"6px"}}/>
                                    </div>
                                    <div className="col-lg-8 col-md-7 col-sm-11 col-11 pl-3 my-auto mx-auto">
                                        <div className="row m-auto">
                                            <div className="col-lg-12 m-auto">
                                              <span id="name_pr">
                                                  <Skeleton width="100%" />
                                              </span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                <span id="" style={{color:"darkblue",fontSize:"0.8em"}}>
                                                 <Skeleton width="100%" />
                                              </span>
                                                <span id="discount_pr">
                                                  <Skeleton width="100%" />
                                              </span>

                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                <span id="shipping_pr">
                                                    <Skeleton width="100%" />
                                                </span>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-12  col-md-12 col-sm-12 col-12">
                                <div className="row mt-2">
                                    <div className="col-lg-4">
                                        <div className="row mb-0">
                                            <div className="col-lg-12 text-left my-auto">


                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-11 order-1 order-sm-1 order-lg-2 order-md-2  float-right text-right mx-auto mt-2 pr-2" id="add_to">

                                    </div>
                                </div>

                            </div>



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

        <Box sx={{ overflow: 'hidden' }}>
            <Media />
        </Box>


    );
}
