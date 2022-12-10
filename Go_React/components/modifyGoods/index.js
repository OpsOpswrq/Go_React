import React from "react";
import {createBrowserHistory} from "history";
import axios from "axios";
import "./index.css"
class ModifyGoods extends React.Component{
    state = {
        id:1,
        name:"",
        price:0,
        left:0,
        img1:"",
        img2:"",
        description:"",
        edit: false
    }
    UNSAFE_componentWillMount() {
        let input = window.location.href.split("/")
        let id = input[input.length-1]
        axios({
            method:"POST",
            url:"/api/getGoodsDetail",
            data:{
                id:parseInt(id)
            }
        }).then((res)=>{
            this.setState({id:res.data.goods[0].id})
            this.setState({name:res.data.goods[0].name})
            this.setState({price:res.data.goods[0].price})
            this.setState({left:res.data.goods[0].left})
            this.setState({img1:"."+res.data.goods[0].img})
            this.setState({img2:"."+res.data.goods[0].img})
            this.setState({description:res.data.goods[0].description})
        })

    }
    changeGoodsDetail(event){
        if(event.state.img1 === event.state.img2){
            axios({
                method:"POST",
                url:"/api/changeGoodsDetail",
                data:{
                    id:parseInt(event.state.id),
                    name:event.state.name,
                    price: parseFloat(event.state.price),
                    left: parseInt(event.state.left),
                    img:"1",
                    description: event.state.description,
                }
            }).then((res)=>{
                alert("修改完成!")
                createBrowserHistory().go(0)
            })
        }else{
            axios({
                method:"POST",
                url:"/api/changeGoodsDetail",
                data:{
                    id:parseInt(event.state.id),
                    name:event.state.name,
                    price: parseFloat(event.state.price),
                    left: parseInt(event.state.left),
                    img:event.state.img2,
                    description: event.state.description,
                }
            }).then((res)=>{
                alert("修改完成!")
                createBrowserHistory().go(0)
            })
        }

    }
    saveFormData = (dataType)=>{
        return (event)=>{
            if(dataType === "img2"){
                let input = document.getElementById("file1").value
                let outcome = input.split('\\')
                let img = "C:\\Users\\feng\\Pictures\\Saved Pictures\\"+ outcome[outcome.length-1]
                this.setState({[dataType]:img})
            }else{
                this.setState({[dataType]:event.target.value})
            }
        }
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
    changeState1(event){
        event.state.edit ? event.setState({edit:false}) : event.setState({edit:true})
        for(let i = 1;i<document.getElementsByTagName("input").length;i++){
            if(i === document.getElementsByTagName("input").length - 1){
                continue
            }else {
                document.getElementsByTagName("input")[i].className === "input_modify_goods1" ? document.getElementsByTagName("input")[i].className = "input_modify_goods2" : document.getElementsByTagName("input")[i].className = "input_modify_goods1"
            }
        }
    }

    render() {
        return (
            <div>
                <h1>修改商品信息</h1>
                <div className="modify_goods_select">
                    <div className="select_big_div">
                        <img src="../img/select.png" className="select_img" onClick={this.changeState} alt="下拉图片"/>
                        <div className="select_div1" id="div1">
                            <div className="select_div">
                                <span onClick={()=>{this.ToWhere("/main")}}>首页</span><br/>
                                <span onClick={()=>{this.ToWhere("/uploadGoods")}}>上传商品信息</span><br/>
                                <span onClick={()=>{this.ToWhere("/chart")}}>购物车</span><br/>
                                <span onClick={()=>{this.ToWhere("/recharge")}}>充值中心</span><br/>
                                <span onClick={this.LogOut}>注销</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div_modify_goods_big">
                    <div className="div_modify_goods">
                        <span className="span_modify_goods">The goods' ID is {this.state.id}</span><br/>
                        <span className="span_modify_goods">Name</span><br/><input type="text" value={this.state.name} onChange={this.saveFormData("name")} className="input_modify_goods1"/><br/>
                        <span className="span_modify_goods">Price</span><br/><input type="text" value={this.state.price} onChange={this.saveFormData("price")} className="input_modify_goods1"/><br/>
                        <span className="span_modify_goods">Left</span><br/><input type="text" value={this.state.left} onChange={this.saveFormData("left")} className="input_modify_goods1"/><br/>
                        <span className="span_modify_goods">Img</span><br/><img src={this.state.img1} alt={this.state.description} className="img_modify_goods"/><br/><input type="file" onChange={this.saveFormData("img2")} id="file1" accept="image/*" style={{position:"relative",left:55,}}/><br/>
                        <span className="span_modify_goods">Description</span><br/><textarea rows={3} cols={22} onChange={this.saveFormData("description")} className="textArea_modify_goods1" value={this.state.description}></textarea>
                    </div>
                    <div style={{position:"relative",top:30}}>
                        {
                            !this.state.edit ? (<button onClick={()=>{this.changeState1(this)}} className="btn_modify_goods">修改商品信息</button>) : (<div></div>)
                        }
                        {
                            this.state.edit ? (<button className="btn_modify_goods" onClick={()=>this.changeGoodsDetail(this)}>确定修改</button>) : (<div></div>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default ModifyGoods;