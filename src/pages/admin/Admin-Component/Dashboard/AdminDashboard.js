import React,{Component} from "react";
import {Link} from "react-router-dom";

import "../../../../css/dashboardStyle.css"
import ReactApexChart from "react-apexcharts"
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";



class Dashboard  extends Component{

    constructor(props) {
        super(props);

        this.state = {
            ordersCOunt:'',
            totalSales:'',
            returned:'',
            products:[],
            loading:true,
            details:[],
            details1:[],
            loading1:true,
            profit:'',
            loading2:true,
            dashElements:{},




            series: [
                {
                    name: 'Clients',
                    type: 'column',
                    data: [0,0,0,0,0,0,0,0,0,0,0]
                }, {
                    name: 'Equipments',
                    type: 'area',
                    data: [0,0,0,0,0,0,0,0,0,0,0]
                }
                , {
                    name: 'Income',
                    type: 'line',
                    data: [0,0,0,0,0,0,0,0,0,0,0]
                }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    stacked: false,
                    zoom:{
                        enabled: false,
                    }
                },
                stroke: {
                    width: [0, 2, 5],
                    curve: 'smooth'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '40%'
                    }
                },

                fill: {
                    opacity: [0.85, 0.25, 1],
                    gradient: {
                        inverseColors: false,
                        shade: 'light',
                        type: "vertical",
                        opacityFrom: 0.85,
                        opacityTo: 0.55,
                        stops: [0, 100, 100, 100]
                    }
                },
                labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
                    '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003', '12/01/2003'
                ],
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    title: {
                        text: '',
                    },
                    min: 0
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function (y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(0) + "";
                            }
                            return y;

                        }
                    }
                }
            },
            series2: [44, 55, 41, 17, 15],
            options2: {
                chart: {
                    width: 380,
                    type: 'donut',
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 270
                    }
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                },
                legend: {
                    formatter: function (val, opts) {
                        var lab=[{name:'adobe',sales:30},{name:'microsoft',sales:20},{name:'antivirus',sales:35},{name:'virtualisation',sales:10}];
                        return lab[0].name + " - " + lab[0].sales
                    }
                },
                title: {
                    text: 'Best selling categories'
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]


            }
        };
    }
    componentDidMount() {
        axios.get('/getDashCardData').then(res=>{
            this.setState({
                dashElements:res.data,
                series: [
                {
                    name: 'Clients',
                    type: 'column',
                    data: res.data.clients
                }, {
                    name: 'Equipments',
                    type: 'area',
                    data:res.data.equipmentPerMonth
                }
                , {
                    name: 'Income /100',
                    type: 'line',
                    data: res.data.incomesPermonth
                }]
            })
        })
        axios.get('/getRecentSubscriptions').then(res=>{
            this.setState({
                details:res.data,
                loading1:false
            })
        })

    }
    loadAll=e=>{
        axios.get('/getSubscriptionsByDates').then(res=>{
              this.setState({
                details1:res.data,
                loading2:false
            })
        })
    }

    render() {
        var products="",dates="",names="",status="",total="",dates1="",names1="",status1="",total1="";
        if(this.state.loading)
        {
            products= <>
                <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" />
                <Skeleton width="100%" /> <Skeleton width="100%" />
            </>
        }
        else {
            products=this.state.products.map(item=>{
                return <li>
                    <a href="#">
                        <img src={false} alt=""/>
                        <span className="product">{item.name}</span>
                    </a>
                    <span className="price">${item.profit}</span>
                </li>
            })
        }
        if(this.state.loading1)
        {
            dates= <> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> </>
            names= <> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> </>
            status= <> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> </>
            total= <> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> </>
        }
        else {
            dates=this.state.details.map(item=>{
                return <li><a  className="text-red" href="#">{item[0]}</a></li>
            })
            names=this.state.details.map(item=>{
                return <li><a href="#">{item[2]} {item[3]}</a></li>
            })
            status=this.state.details.map(item=>{
                    return  <li><a href="#">{item[4]}</a></li>

            })
            total=this.state.details.map(item=>{
                return <li><a href="#">{item[1]}Dh</a></li>
            })
        }


        if(this.state.loading2)
        {
            dates1= <> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> </>
            names1= <> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> </>
            status1= <> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> </>
            total1= <> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> <Skeleton width="100%" /> </>
        }
        else {
             dates1=this.state.details1.map(item=>{
                return <li><a href="#">{item[0]}</a></li>
            })
            names1=this.state.details1.map(item=>{
                return <li><a href="#">{item[2]} {item[3]}</a></li>
            })
            status1=this.state.details1.map(item=>{
                    return  <li><a href="#">{item[4]}</a></li>

            })
            total1=this.state.details1.map(item=>{
                return <li><a href="#">{item[1]}Dh</a></li>
            })
        }


        return (
            <>


                <section class="home-section col-lg-12 p-0 my-3 mx-0">

                    <div className="home-content row mx-auto">


                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 mx-auto">
                            <div className="overview-boxes row  m-auto p-0">

                                <div className="p-1  col-lg-3 col-md-6 col-sm-12 col-12  mx-auto">
                                    <div className="box">
                                        <div className="right-side">
                                            <div className="box-topic mb-2">Clients<span
                                                style={{fontSize: "0.6em", color: ""}}>(Active)</span></div>
                                            <div className="number">{this.state.dashElements.countClients}</div>
                                            <div className="indicator">
                                                <i className='bx bx-up-arrow-alt'></i>
                                                <span className="text">Up from Yesterday</span>
                                            </div>
                                        </div>
                                        <i className='bx bx-cart-alt cart'></i>
                                    </div>

                                </div>


                                <div className="p-1  col-lg-3 col-md-6 col-sm-12 col-12  mx-auto">
                                    <div className="box">
                                        <div className="right-side">
                                            <div className="box-topic mb-2">Total Income</div>
                                            <div className="number">{this.state.dashElements.monthIncomes}Dh</div>
                                            <div className="indicator">
                                                <i className='bx bx-up-arrow-alt'></i>
                                                <span className="text">Up from Yesterday</span>
                                            </div>
                                        </div>
                                        <i className='bx bxs-cart-add cart two'></i>
                                    </div>

                                </div>


                                <div className="p-1  col-lg-3 col-md-6 col-sm-12 col-12  mx-auto">
                                    <div className="box">
                                        <div className="right-side">
                                            <div className="box-topic mb-2">Total Spend </div>
                                            <div className="number">{this.state.dashElements.totalSpend}Dh</div>
                                            <div className="indicator">
                                                <i className='bx bx-up-arrow-alt'></i>
                                                <span className="text">Up from Yesterday</span>
                                            </div>
                                        </div>
                                        <i className='bx bx-cart cart three'></i>
                                    </div>

                                </div>


                                <div className="p-1  col-lg-3 col-md-6 col-sm-12 col-12  mx-auto">
                                    <div className="box">
                                        <div className="right-side">
                                            <div className="box-topic mb-2">Inactive clients</div>
                                            <div className="number">{this.state.dashElements.inactiveClients}</div>
                                            <div className="indicator">
                                                <i className='bx bx-down-arrow-alt down'></i>
                                                <span className="text">Down From Yesterday</span>
                                            </div>
                                        </div>
                                        <i className='bx bxs-cart-download cart four'></i>
                                    </div>

                                </div>


                            </div>

                        </div>


                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 mx-auto my-4">
                                    <div className="row   charts m-auto p-0">
                                        <div className="col-lg-12">

                                            <ReactApexChart options={this.state.options} series={this.state.series} type="line"
                                                            height={350}/>
                                        </div>

                                    </div>




                        </div>


                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 mx-auto">
                            <div className="sales-boxes row mx-auto p-0 ">

                                <div className="recent-sales col-lg-6 col-md-7 col-sm-12 col-12 box mx-auto ml-lg-0">
                                    <div className="title">Recent Factures</div>
                                    <div className="sales-details">
                                        <ul className="details">
                                            <li className="topic">Date</li>
                                            {dates}

                                        </ul>
                                        <ul className="details">
                                            <li className="topic">Customer</li>
                                            {names}

                                        </ul>
                                        <ul className="details">
                                            <li className="topic">National ID</li>
                                            {status}

                                        </ul>
                                        <ul className="details">
                                            <li className="topic">Total Payed</li>
                                            {total}
                                        </ul>
                                    </div>
                                    <div className="button">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#SeeAll_model"
                                           onClick={this.loadAll}>See All</a>
                                    </div>


                                </div>

                                <div className="col-lg-6 col-md-5 col-sm-12 col-12 pr-0 mx-auto mr-lg-0">
                                    <div className="row">
                                        <div className="col-lg-12 pl-lg-3 pl-0 pl-sm-0 pl-md-3">
                                            <div className="recent-sales box p-4   mx-auto mr-lg-0">
                                                <div className="title">Payment alert</div>
                                                <div className="sales-details" id="payment">
                                                    <ul className="details">
                                                        <li className="topic">Customer</li>
                                                        {names}

                                                    </ul>

                                                    <ul className="details">
                                                        <li className="topic">National ID</li>
                                                        {status}

                                                    </ul>

                                                    <ul className="details">
                                                        <li className="topic">Expired</li>
                                                        <span id="text-danger">{dates}</span>

                                                    </ul>

                                                </div>
                                                <div className="button">
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#SeeAll_client"
                                                       onClick={this.loadAll}>See All</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>


                            </div>

                        </div>


                    </div>

                </section>


                <div className="modal fade m-0" id="SeeAll_model" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content" id="login">
                            <div className="modal-header">
                                <div className="title"><h3>Recent Sales</h3></div>
                                <button type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="recent-sales recent-sales-modal box ml-0"  >

                                    <div className="sales-details">
                                        <ul className="details">
                                            <li className="topic">Date</li>
                                            {dates1}

                                        </ul>
                                        <ul className="details">
                                            <li className="topic">Customer</li>
                                            {names1}
                                        </ul>
                                        <ul className="details">
                                            <li className="topic">National ID</li>
                                            {status1}
                                        </ul>
                                        <ul className="details">
                                            <li className="topic">Total</li>
                                            {total1}
                                        </ul>
                                    </div>


                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="button" id="close_btn">
                                    <a href="#" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target="#login_model">Close</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/*clients modal */}

                        <div className="modal fade m-0" id="SeeAll_client" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content" id="login">
                            <div className="modal-header">
                                <div className="title"><h4>Clients to Pay</h4></div>
                                <button type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="recent-sales recent-sales-modal box ml-0"  >

                                    <div className="sales-details" id="payment">
                                        <ul className="details">
                                            <li className="topic">Customer</li>
                                            {names}

                                        </ul>

                                        <ul className="details">
                                            <li className="topic">National ID</li>
                                            {status}

                                        </ul>

                                        <ul className="details">
                                            <li className="topic">Expired</li>
                                            <span id="text-danger">{dates}</span>

                                        </ul>

                                    </div>



                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="button" id="close_btn">
                                    <a href="#" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target="#login_model">Close</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </>


        );

    }



};




export default Dashboard;
