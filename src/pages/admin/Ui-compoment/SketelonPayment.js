import React from "react";
import {Component} from "react";
import Skeleton from "@mui/material/Skeleton";



class SketelonPayment extends Component{
    render() {
        return(
            <>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 mx-auto">
                    <div className="card mb-3 mx-auto" style={{

                        maxWidth: "40rem",

                    }}>
                        <div className="card-header"><b><Skeleton width="100%" /></b></div>
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton width="100%" /></h5>
                            <p className="card-text  date_p">
                                <div className="row">

                                    <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                                        <Skeleton width="100%" />
                                    </div>

                                    <div className="col-lg-5 col-md-5 col-sm-5 col-5 text-right">
                                        <b><Skeleton width="100%" /></b>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                                        <Skeleton width="100%" />
                                    </div>

                                    <div className="col-lg-5 col-md-5 col-sm-5 col-5 text-right">
                                        <b><Skeleton width="100%" /></b>
                                    </div>

                                </div>

                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SketelonPayment;