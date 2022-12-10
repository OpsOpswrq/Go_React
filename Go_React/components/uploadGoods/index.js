import React from "react";
import axios from "axios";
import "./index.css"
import {createBrowserHistory} from "history";
class UploadGoods extends React.Component{
    state = {
        name:"",
        price:0,
        left:0,
        img:0,
        path:"",
        description:"",
    }
    saveFormData = (dataType)=>{
        return (event)=>{
            if(dataType === "img"){
                let input = document.getElementById("file1").value
                let outcome = input.split('\\')
                let img = "C:\\Users\\feng\\Pictures\\Saved Pictures\\"+ outcome[outcome.length-1]
                this.setState({[dataType]:img})
            }else{
                this.setState({[dataType]:event.target.value})
            }
        }
    }
    uploadGoods(name,price,left,img,description){
        axios({
            method:"POST",
            url:"/api/uploadGoods",
            data:{
                name:name,
                price:parseInt(price),
                left:parseInt(left),
                img:img,
                description:description
            }
        }).then((res)=>{
            if(res.data.res === 0){
                alert("商品已经存在了!")
                createBrowserHistory().go(0)
            }else{
                alert("商品添加成功!")
                createBrowserHistory().push("/main")
                createBrowserHistory().go(0)
            }
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
    render() {
        return (
            <div className="uploadGoods_class_div_out">
                <div className="select_div_uploadGoods">
                    <div className="select_big_div">
                        <img src="./img/select.png" className="select_img" onClick={this.changeState} alt="下拉图片"/>
                        <div className="select_div1" id="div1">
                            <div className="select_div">
                                <span onClick={()=>{this.ToWhere("main")}}>首页</span><br/>
                                <span onClick={()=>{this.ToWhere("chart")}}>购物车</span><br/>
                                <span onClick={()=>{this.ToWhere("recharge")}}>充值中心</span><br/>
                                <span onClick={()=>{this.ToWhere("person")}}>个人信息</span><br/>
                                <span onClick={this.LogOut}>注销</span>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 style={{position:"absolute",left:20,top:0}}>上传商品信息</h1>
                <div className="uploadGoods_class_div">
                    <label className="uploadGoods_label">Name</label><br/><input type="text" placeholder="Please input the Goods's name" onChange={this.saveFormData("name")} className="uploadGoods_class_input"/><br/>
                    <label className="uploadGoods_label">Price</label><br/><input type="text" placeholder="Please input the Goods's price" onChange={this.saveFormData("price")} className="uploadGoods_class_input"/><br/>
                    <label className="uploadGoods_label">Amount</label><br/><input type="text" placeholder="Please input the Goods's amount" onChange={this.saveFormData("left")} className="uploadGoods_class_input"/><br/>
                    <label className="uploadGoods_label">Img</label><br/><input type="file" onChange={this.saveFormData("img")} id="file1" accept="image/*" style={{position:"relative",left:55,}}/><br/>
                    <label className="uploadGoods_label">Description</label><br/><textarea cols={22} rows={5} style={{resize:"none",fontSize:22}} onChange={this.saveFormData("description")}></textarea><br/>
                    <button onClick={()=>{this.uploadGoods(this.state.name,this.state.price,this.state.left,this.state.img,this.state.description)}} style={{borderRadius:10,width:100,height:40,backgroundColor:"skyblue"}}>上传商品</button>
                </div>
            </div>
        );
    }
}
export default UploadGoods;