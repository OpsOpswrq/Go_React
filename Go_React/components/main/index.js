import axios from "axios";
import "./index.css"
import React from "react";
import { createBrowserHistory } from 'history'
class Main extends React.Component{
    state = {
        popularGoods:[]
    }
    UNSAFE_componentWillMount() {
        axios({
            method:"GET",
            url:"/api/main",
        }).then((res)=>{
            this.setState({popularGoods:res.data.popularGoods})
        })
    }
    addToChart(id) {
        axios({
            method: "POST",
            url: "/api/addGoods",
            data: {
                id: id
            }
        }).then((res) => {
            if(res.data.res === 3){
                alert("请先登录")
                createBrowserHistory().push("/login")
                createBrowserHistory().go(0)
            }
            if(res.data.res === 0){
                alert("成功添加商品到购物车")
            }else if(res.data.res === 2){
                alert("商品余量不足，请耐心等待进货")
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
    modifyGoods(id){
        createBrowserHistory().push(`/modifyGoods/${id}`)
        createBrowserHistory().go(0)
    }
    render() {
        return (
            <div className="div1_class">
                <div className="select_div_Main">
                    <div className="select_big_div">
                        <img src="./img/select.png" className="select_img" onClick={this.changeState} alt="下拉图片"/>
                        <div className="select_div1" id="div1">
                            <div className="select_div">
                                <span onClick={()=>{this.ToWhere("uploadGoods")}}>上传商品信息</span><br/>
                                <span onClick={()=>{this.ToWhere("chart")}}>购物车</span><br/>
                                <span onClick={()=>{this.ToWhere("recharge")}}>充值中心</span><br/>
                                <span onClick={()=>{this.ToWhere("person")}}>个人信息</span><br/>
                                <span onClick={this.LogOut}>注销</span>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 style={{position:"absolute",left:30,top:-10,fontSize:40}}>网络商城主页</h1>
                <h1 style={{display:"flex",justifyContent:"center",alignContent:"center"}}>各种产品</h1>
                <div className="item">
                    {
                        this.state.popularGoods.length > 0 ?
                        this.state.popularGoods.map((element,index)=> {
                            if(index % 3 === 0){
                                return (
                                    <div key={index} className="sliderItem1" style={{top:(index % 3 + index / 3) * 500 + 100}}>
                                        <img src={element.img} className="img3" alt={element.description}/>
                                        <div className="span_title">
                                            <span>The Price is:{element.price}</span>
                                            <span>Description:{element.description}</span>
                                            <span>The final left:{element.left}</span>
                                            <div>
                                                <button onClick={()=>{this.addToChart(element.id)}} style={{position:"absolute",left:80,top:380}} className="btn3">加入购物车</button>
                                                <button onClick={()=>{this.modifyGoods(element.id)}} style={{position:"absolute",left:220,top:380}} className="btn3">修改商品信息</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }else if(index % 3 === 1){
                                return (
                                    <div key={index} className="sliderItem3" style={{top:((index - 1) % 3 + (index - 1) / 3) * 500 + 100}}>
                                        <img src={element.img} className="img3" alt={element.description}/>
                                        <div className="span_title">
                                            <span>The Price is:{element.price}</span>
                                            <span>Description:{element.description}</span>
                                            <span>The final left:{element.left}</span>
                                            <div>
                                                <button onClick={()=>{this.addToChart(element.id)}} style={{position:"absolute",left:80,top:380}} className="btn3">加入购物车</button>
                                                <button onClick={()=>{this.modifyGoods(element.id)}} style={{position:"absolute",left:220,top:380}} className="btn3">修改商品信息</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }else{
                                return (
                                    <div key={index} className="sliderItem2" style={{top:((index - 2) % 3 + (index - 2) / 3) * 500 + 100}}>
                                        <img src={element.img} className="img3" alt={element.description}/>
                                        <div className="span_title">
                                            <span>The Price is:{element.price}</span>
                                            <span>Description:{element.description}</span>
                                            <span>The final left:{element.left}</span>
                                            <div>
                                                <button onClick={()=>{this.addToChart(element.id)}} style={{position:"absolute",left:80,top:380}} className="btn3">加入购物车</button>
                                                <button onClick={()=>{this.modifyGoods(element.id)}} style={{position:"absolute",left:220,top:380}} className="btn3">修改商品信息</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        }) : (<div></div>)
                    }
                </div>
            </div>
        );
    }
}
export default Main;