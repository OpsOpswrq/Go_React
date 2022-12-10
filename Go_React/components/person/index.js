import "./index.css"
import React from "react";
import axios from "axios";
import {createBrowserHistory} from "history";
class Person extends React.Component{
    state = {
        id: 0,
        username: "",
        password: "",
        phone: "",
        money: 1,
        email: "",
        address: "",
        edit:false
    }
    UNSAFE_componentWillMount() {
        axios({
            method:"GET",
            url:"/api/getUserDetail",
        }).then((res)=>{
            if(res.data.login === 1){
                createBrowserHistory().push("/login")
                createBrowserHistory().go(0)
            }else{
                this.setState({id:res.data.user.id})
                this.setState({username:res.data.user.username})
                this.setState({password:res.data.user.password})
                this.setState({phone:res.data.user.phone})
                this.setState({money:res.data.user.money})
                this.setState({email:res.data.user.email})
                this.setState({address:res.data.user.address})
            }
        })
    }
    saveFormData = (dataType)=>{
        return (event)=>{
            this.setState({[dataType]:event.target.value})
        }
    }
    changeState1(event){
        event.state.edit ? event.setState({edit:false}) : event.setState({edit:true})
        for(let i = 1;i<document.getElementsByTagName("input").length;i++){
            document.getElementsByTagName("input")[i].className === "input_person1" ? document.getElementsByTagName("input")[i].className = "input_person2" : document.getElementsByTagName("input")[i].className = "input_person1"
        }
    }
    changeUserDetail(event){
        axios({
            method: "POST",
            url: "/api/changeUserDetail",
            data: {
                id: event.state.id,
                username:event.state.username,
                password: event.state.password,
                phone:event.state.phone,
                money: event.state.money,
                email: event.state.email,
                address: event.state.address,
            }
        }).then((res)=>{
            alert("修改成功!")
            createBrowserHistory().go(0)
        })
    }
    changeState(){
        if(document.getElementById("div1").className === "select_div1"){
            document.getElementById("div1").className = "select_div2"
        }else{
            document.getElementById("div1").className = "select_div1"
        }
    }
    ToWhere(path){
        createBrowserHistory().push(path)
        createBrowserHistory().go(0)
    }
    LogOut(){
        axios({
            method:"POST",
            url:"/api/logout",
        }).then((res)=>{
            alert("欢迎下次再来!")
            createBrowserHistory().push("/main")
            createBrowserHistory().go(0)
        })
    }
    render(){
        return (
            <div>
                <h1 style={{width:200,zIndex:1}}>用户信息</h1>
                <div className="div_person_select">
                    <div className="select_big_div">
                        <img src="./img/select.png" className="select_img" onClick={this.changeState} alt="下拉图片"/>
                        <div className="select_div1" id="div1">
                            <div className="select_div">
                                <span onClick={()=>{this.ToWhere("main")}}>首页</span><br/>
                                <span onClick={()=>{this.ToWhere("uploadGoods")}}>上传商品信息</span><br/>
                                <span onClick={()=>{this.ToWhere("chart")}}>购物车</span><br/>
                                <span onClick={()=>{this.ToWhere("recharge")}}>充值中心</span><br/>
                                <span onClick={this.LogOut}>注销</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div_person_big">
                    <div className="div_person">
                        <span className="span_person">Your ID is {this.state.id}</span><br/>
                        <span className="span_person">Username</span><br/><input value={this.state.username} onChange={this.saveFormData("username")} className="input_person1"/><br/>
                        <span className="span_person">Password</span><br/><input value={this.state.password} onChange={this.saveFormData("password")} className="input_person1"/><br/>
                        <span className="span_person">Phone</span><br/><input value={this.state.phone} onChange={this.saveFormData("phone")} className="input_person1"/><br/>
                        <span className="span_person">Your account's Money is {this.state.money}</span><br/>
                        <span className="span_person">Email</span><br/><input value={this.state.email} onChange={this.saveFormData("email")} className="input_person1"/><br/>
                        <span className="span_person">Address</span><br/><textarea cols={22} rows={3} className="textArea_person1" onChange={this.saveFormData("email")} value={this.state.address}></textarea>
                    </div>
                    <div style={{position:"relative",top:30}}>
                        {
                            !this.state.edit ? (<button onClick={()=>{this.changeState1(this)}} className="btn_person">修改用户信息</button>) : (<div></div>)
                        }
                        {
                            this.state.edit ? (<button className="btn_person" onClick={()=>this.changeUserDetail(this)}>确定修改</button>) : (<div></div>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Person;