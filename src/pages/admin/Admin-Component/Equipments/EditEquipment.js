import React,{Component} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";

import "../../../../css/AdminProducts.css"

import name from '../../../../img/username.png';
import price from '../../../../img/user_price.png';
import discount from '../../../../img/username.png';
import about from '../../../../img/username.png';
import cat from '../../../../img/username.png';
import fname from "../../../../img/user_first.png";
import lname from "../../../../img/user_last.png";
import id from "../../../../img/user_id.png";
import udate from "../../../../img/user_date.png";
import user_note from "../../../../img/user_note.png";
import equ_note from '../../../../img/user_num.png';
import axios from "axios";
import swal from "sweetalert";


class EditEquipment extends Component{



    state={
        equipments:[],
        errors:{},
        loading:true,
        name:this.props.item.name,
        description:this.props.item.description,
        price:this.props.item.price,
        quantity:this.props.item.quantity,
        img:null,
        img2:axios.defaults.baseURL+"getImage/"+this.props.item.image
    }


    handleImg= e=>{

        this.setState({
            img:e.target.files[0]
        })


        let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
        const file = document.getElementById("default-btn").files[0];
        const reader = new FileReader();
        if(file){

            reader.onload =  function(){
                const result = reader.result;
                document.getElementById("image_pr").style.display = 'block';
                document.getElementById("image_pr").src = result;
                document.getElementById("wrapper").classList.add("active");
                document.getElementById("icon").style.display = 'none';
                document.getElementById("text").style.display = 'none';


            }

            reader.readAsDataURL(file);



        }
        if(document.getElementById("default-btn").value){
            let valueStore = document.getElementById("default-btn").value.match(regExp);
            document.getElementById("file_name").textContent = valueStore;
        }

    }



    componentDidMount() {
        document.getElementById("image_pr").style.display = 'block';
        document.getElementById("wrapper").classList.add("active");
        document.getElementById("icon").style.display = 'block';
        document.getElementById("text").style.display = 'none';

        axios.get('/getImage/'+this.props.item.image, { responseType:"blob" }).then(response=>{
                const myFile = new File([response.data], "image", {
                      type: response.data.type,
                    });

               this.setState({
                   img:myFile
               })
        })



    }

    editEquipment=e=>{
        e.preventDefault();
        var spinner=document.querySelector('.spinner-border');
        var btn=document.querySelector('#btn_add');
        spinner.style.display="inline-block";
        btn.disabled=true;
                        var payload={
               name: this.state.name,
            description: this.state.description,
        quantity: this.state.quantity,
         price: this.state.price,
        }

        axios.post('/addEquipment',payload).then(res=>{



            if(res.data.status===422)
            {

               this.setState({
                   errors:res.data.errors
               })

            }
            else
            {
                var frm=new FormData();
                frm.append("img",this.state.img)
                frm.append("name",payload.name)
                frm.append("description",payload.description)
                frm.append("price",payload.price)
                frm.append("quantity",payload.quantity)
                axios.post('/editImage/'+this.props.item.id,frm).then(response=>{

                    if(response.data.status===422)
                        this.setState({
                        errors:response.data.errors
                     })
                    else{

                       this.props.updateListElemnt(response.data)
                            swal({
                         title: "good job!",
                            text: "equipment updated succefuly",
                         icon: "success",
                     });


                    }

                })
            }

            spinner.style.display="none";
             btn.disabled=false;

        }).catch(err=>{
             swal({
                title: "oops!",
                text: "somthing went wrong!",
                icon: "error",
            });
              spinner.style.display="none";
             btn.disabled=false;
        })




    }
    handleInput=e=>{
        this.setState({
            [e.target.name]:e.target.value,
            errors:[]
        })
    }


    hideInputFile=e=>{
        document.getElementById("icon").style.display = 'block';
        document.getElementById("text").style.display = 'block';
        document.getElementById("image_pr").src = "";
        document.getElementById("image_pr").style.display = 'none';
        document.getElementById("wrapper").classList.remove("active");



    }


    render() {

        return (this.props.trigger) ? (

            <form method="post" onSubmit={this.editEquipment}>
                <div className="add_bg col-10 col-lg-12 col-md-12 col-sm-12 m-auto">
                    <div className="col-11 col-md-9 col-lg-6 col-sm-8 m-auto px-1 py-4" id="Add">


                        <div className="row">

                            <div className="col-11 col-md-7 col-lg-7 col-sm-10 order-2 sm-order-2  mx-auto my-4">

                               <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><img src={user_note} className="icons"/></span>

                                        <input type="text" className="form-control" placeholder="Name/Brand"
                                               aria-label="Name" aria-describedby="basic-addon1" name="name" onChange={this.handleInput} value={this.state.name} required/>
                                        <span className="text-danger">{this.state.errors.name}</span>

                                    </div>

                                </div>
                                 <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><img src={equ_note} className="icons"/></span>

                                        <input type="text" className="form-control" placeholder="Description"
                                               aria-label="Start price" aria-describedby="basic-addon1" name="description" onChange={this.handleInput} value={this.state.description} required/>
                                        <span className="text-danger">{this.state.errors.description}</span>
                                    </div>

                                </div>
                               <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><img src={id} className="icons"/></span>

                                        <input type="number"  step="0.1" className="form-control" placeholder="Quantity"
                                               aria-label="Discount price" aria-describedby="basic-addon1" name="quantity" onChange={this.handleInput} value={this.state.quantity} required/>
                                        <span className="text-danger">{this.state.errors.quantity}</span>
                                    </div>

                                </div>

                                <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><img src={price} className="icons"/></span>

                                        <input type="number" className="form-control" placeholder="Price"
                                               aria-label="about key" aria-describedby="basic-addon1" name="price" onChange={this.handleInput} value={this.state.price} required/>
                                        <span className="text-danger">{this.state.errors.price}</span>
                                    </div>

                                </div>


                            </div>

                            <div className="col-10 col-md-5 col-lg-5 col-sm-5 mx-auto pb-3 order-1 sm-order-1" id="picture_div">

                                <div className="container ">
                                    <div className="wrapper" onClick={ function (){const defaultBtn = document.querySelector("#default-btn");defaultBtn.click();}} id="wrapper">
                                        <div className="image">
                                            <img src={this.state.img2} alt="" id="image_pr"/>
                                        </div>
                                        <div className="content">
                                            <div className="icon">
                                                <i className="fas fa-cloud-upload-alt" id="icon"> </i>
                                            </div>
                                            <div className="text" id="text">
                                                No file chosen, yet!
                                            </div>
                                        </div>
                                        <div id="cancel-btn">
                                            <i className="fas fa-times" onClick={this.hideInputFile}> </i>
                                        </div>
                                        <div className="file-name" id="file_name" >
                                            Chose Image Here!
                                        </div>
                                    </div>

                                    <input id="default-btn" name="img"   type="file"
                                           onChange={this.handleImg} accept="image/*"

                                           hidden/>

                                </div>

                                <span className="text-danger">{this.state.errors.img}</span>



                            </div>



                        </div>

                        <div className="row">

                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pt-4">
                                <div className="row">
                                    <div className="col-5 col-lg-5 col-md-5 col-sm-5 m-auto">
                                        <button className="btn btn-primary col-lg-12" type="reset" id="btn_cancel" onClick={() =>{

                                            this.props.setTrigger(false,"")


                                        }}>Cancel</button>
                                    </div>
                                    <div className="col-5 col-lg-5 col-md-5 col-sm-5 m-auto">
                                        <button className="btn btn-primary col-lg-12" type="submit"  id="btn_add">
                                            <span className="spinner-border spinner-border-sm" style={{display:"none"}}></span>
                                            Update</button>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

            </form>
        ) : "";

    }
}


export default EditEquipment;
