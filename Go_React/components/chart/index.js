import "./index.css";
import React from "react";
import axios from "axios";
import {createBrowserHistory} from "history";
class Chart extends React.Component{
    state = {
        id:1,
        goods:[],
        sum:0,
    }
    UNSAFE_componentWillMount() {
        axios({
            method:"GET",
            url:"/api/enterChart",
        }).then((res)=>{
            if(res.data.login === 0){
                this.setState({id:res.data.id})
                res.data.goods.sort((good1,good2)=>{return good1.id - good2.id})
                this.setState({goods:res.data.goods})
                let sum = 0
                res.data.goods.forEach((element)=>{
                    sum += element.price * element.amount
                })
                this.setState({sum:sum})
            }else{
                createBrowserHistory().push("/login")
                createBrowserHistory().go(0)
            }
        })
    }
    ChangeAmount(id,op){
        if(op === 1){
            axios({
                method:"POST",
                url:"/api/addAmount",
                data:{
                    id:id
                }
            }).then((res)=>{
                if(res.data.login === 0){
                    res.data.goods.sort((good1,good2)=>{return good1.id - good2.id})
                    this.setState({goods:res.data.goods})
                    let sum = 0
                    res.data.goods.forEach((element)=>{
                        sum += element.price * element.amount
                    })
                    this.setState({sum:sum})
                }else{
                    createBrowserHistory().push("/login")
                    createBrowserHistory().go(0)
                }
            })
        }else{
            axios({
                method:"POST",
                url:"/api/subAmount",
                data:{
                    id:id
                }
            }).then((res)=>{
                if(res.data.login === 0){
                    res.data.goods.sort((good1,good2)=>{return good1.id - good2.id})
                    this.setState({goods:res.data.goods})
                    let sum = 0
                    res.data.goods.forEach((element)=>{
                        sum += element.price * element.amount
                    })
                    this.setState({sum:sum})
                }else{
                    createBrowserHistory().push("/login")
                    createBrowserHistory().go(0)
                }
            })
        }
    }
    NotChoose(id){
        let msg = "确定取消选取该商品？请确定！"
        if(window.confirm(msg) === true){
            axios({
                method:"POST",
                url:"/api/notChooseIt",
                data:{
                    id:id
                }
            }).then((res)=>{
                if(res.data.login === 0){
                    res.data.goods.sort((good1,good2)=>{return good1.id - good2.id})
                    this.setState({goods:res.data.goods})
                    let sum = 0
                    res.data.goods.forEach((element)=>{
                        sum += element.price * element.amount
                    })
                    this.setState({sum:sum})
                }else{
                    createBrowserHistory().push("/login")
                    createBrowserHistory().go(0)
                }
            })
        }
    }
    goToSorder(){
        createBrowserHistory().push("/sorder")
        createBrowserHistory().go(0)
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
            <div>
                <div className="select_div_Chart">
                    <div className="select_big_div">
                        <img src="./img/select.png" className="select_img" onClick={this.changeState} alt="下拉图片"/>
                        <div className="select_div1" id="div1">
                            <div className="select_div">
                                <span onClick={()=>{this.ToWhere("main")}}>首页</span><br/>
                                <span onClick={()=>{this.ToWhere("uploadGoods")}}>上传商品信息</span><br/>
                                <span onClick={()=>{this.ToWhere("recharge")}}>充值中心</span><br/>
                                <span onClick={()=>{this.ToWhere("person")}}>个人信息</span><br/>
                                <span onClick={this.LogOut}>注销</span>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="h1">{this.state.id}的购物车</h1>
                <div className="div_class1">
                    <div className="chart_class1">
                        {
                            this.state.goods.length > 0 ?
                                this.state.goods.map((element,index) => {
                                    return (
                                        <div key={index} className="show_chart_goods1">
                                            <img src={element.img} className="img2" alt={element.description}/>
                                            <div className="span_class1">
                                                <span>Now the price is {element.price}</span><br/><br/>
                                                <span>You have ordered {element.amount},and this goods's amount left is {element.left}</span><br/><br/>
                                                <span>{element.left >= element.amount ? "So you can buy it now" : "Sorry,you come so late,this thing has no left!"}</span><br/><br/>
                                            </div>
                                            <div className="btn_group1">
                                                <button className="btn1" onClick={() => {
                                                    this.ChangeAmount(element.id, 1)
                                                }}>Add amount +1
                                                </button>
                                                <button className="btn1" onClick={() => {
                                                    this.ChangeAmount(element.id, 0)
                                                }}>Sub amount -1
                                                </button>
                                                <button className="btn1" onClick={() => {
                                                    this.NotChoose(element.id)
                                                }}>Not choose this
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div>
                                        <span style={{fontSize:45}}>There is nothing on your cart</span>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className="sum_class1">
                    {
                        this.state.sum > 0 ? (
                            <span>All the things cost {this.state.sum}</span>
                        ) : (
                            <span></span>
                        )
                    }
                </div>
                <div>
                    {
                        this.state.goods.length === 0 ? (<div></div>) : (<button
                            style={{position: "relative", left: 760, top: 50, borderRadius: 10, width: 100, height: 30}}
                            onClick={this.goToSorder}>立即下单</button>)
                    }
                </div>
            </div>
        )
    }

}
export default Chart