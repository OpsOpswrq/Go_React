import React from "react";
import axios from "axios";
import "./index.css"
import { createBrowserHistory } from 'history'
class Sorder extends React.Component{
    state = {
        goods:[],
        id:1,
        sum:0,
        phone:"",
        address:"",
        remark:"",
    }
    saveFormData = (dataType)=>{
        return (event)=>{
            this.setState({[dataType]:event.target.value})
        }
    }

    UNSAFE_componentWillMount() {
        axios({
            method:"GET",
            url:"/api/enterSorder",
        }).then((res)=>{
            if(res.data.login === 0){
                this.setState({id:res.data.id})
                res.data.goods.sort((good1,good2)=>{return good1.id - good2.id})
                this.setState({goods:res.data.goods})
                this.setState({phone:res.data.user.phone})
                this.setState({address:res.data.user.address})
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
    ChangeAmount(index,id,op){
        if(op === 1){
            if(this.state.goods[index].amount + 1 > this.state.goods[index].left){
                alert("无法再添加了!商品余数已不足!")
            }else {
                axios({
                    method: "POST",
                    url: "/api/addAmountSorder",
                    data: {
                        id: id
                    }
                }).then((res) => {
                    if (res.data.login === 0) {
                        res.data.goods.sort((good1, good2) => {
                            return good1.id - good2.id
                        })
                        this.setState({goods: res.data.goods})
                        let sum = 0
                        res.data.goods.forEach((element) => {
                            sum += element.price * element.amount
                        })
                        this.setState({sum: sum})
                    } else {
                        createBrowserHistory().push("/login")
                        createBrowserHistory().go(0)
                    }
                })
            }
        }else{
            axios({
                method:"POST",
                url:"/api/subAmountSorder",
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
                url:"/api/notChooseItSorder",
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
    EndSorder(){
        let msg = "确定取消选取该订单？请确定！"
        if(window.confirm(msg)){
            axios({
                method:"POST",
                url:"/api/cancelSorder",
            }).then((res)=>{
                alert("成功取消订单!欢迎再来!")
                createBrowserHistory().push("/main")
                createBrowserHistory().go(0)
            })
        }
    }
    ordeSorder(sum,address,remark,phone){
        let msg = "确定下订单？请确定！"
        if(window.confirm(msg)){
            axios({
                method:"POST",
                url:"/api/orderSorder",
                data:{
                    total:sum,
                    remark:remark,
                    address:address,
                    phone:phone,
                }
            }).then((res)=>{
                if(res.data.res === 0){
                    alert("账户余额不足!请充值！")
                    createBrowserHistory().push("/recharge")
                    createBrowserHistory().go(0)
                }else{
                    alert("成功下订单!欢迎再次光临!")
                    createBrowserHistory().push("/main")
                    createBrowserHistory().go(0)
                }
            })
        }
    }
    render() {
        return (
            <div>
                <h1 className="h1_class3">订单支付页面</h1>
                <div className="goods_details">
                    {
                        this.state.goods.length > 0 ?
                        this.state.goods.map((element,index)=>{
                            if(element.left >= element.amount){
                                return (
                                    <div key={index} className="goods_one">
                                        <img src={element.img} alt={element.description} className="img5"/>
                                        <div className="span_class5">
                                            <span className="span5">You have ordered {element.amount}</span><br/><br/><br/>
                                            <span className="span5">The all price is {element.amount * element.price}</span><br/>
                                            <div className="btn_group2">
                                                <button className="btn7" onClick={() => {
                                                    this.ChangeAmount(index,element.id, 1)
                                                }}>Add amount +1
                                                </button>
                                                <button className="btn7" onClick={() => {
                                                    this.ChangeAmount(index,element.id, 0)
                                                }}>Sub amount -1
                                                </button>
                                                <button className="btn7" onClick={() => {
                                                    this.NotChoose(element.id)
                                                }}>Not choose this
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }) : (
                            <div className="goods_details">
                                <span style={{fontSize:40,fontFamily:"kaiti"}}>你的购物车还空荡荡的，快去选择吧</span>
                            </div>
                            )
                    }
                </div>
                <h1>The user's details</h1>
                <div className="input_class5">
                    <span className="span5">Username</span><br/><input type="text" value={this.state.id} onChange={this.saveFormData('id')} className="input_form6"/><br/>
                    <span className="span5">Phone</span><br/><input type="text" value={this.state.phone} onChange={this.saveFormData('phone')} className="input_form6"/><br/>
                    <span className="span5">Address</span><br/><input type="text" value={this.state.address} onChange={this.saveFormData('address')} className="input_form6"/><br/>
                    <span className="span5">Another thing</span><br/><textarea rows={3} cols={20} style={{resize:"none",fontSize:25,borderRadius:10}} onChange={this.saveFormData("remark")}></textarea><br/>
                    <span className="span5">The sum is {this.state.sum}</span>
                </div>
                <div className="btn_group3">
                    {
                        this.state.goods.length > 0 ? (<button className="btn7" onClick={()=>{this.ordeSorder(this.state.sum,this.state.address,this.state.remark,this.state.phone)}}>立即下单</button>) : (<span></span>)
                    }
                    <button onClick={this.EndSorder} className="btn7">取消该订单</button>
                </div>
            </div>
        );
    }
}
export default Sorder;