import {useRef} from "react";
import axios from "axios";
import {createBrowserHistory} from "history";
import "./index.css"
function Recharge(){
    const money = useRef()
    function recharge(){
        axios({
            method:"POST",
            url:"/api/recharge",
            data:{
                money:parseFloat(money.current.value)
            }
        }).then((res)=>{
            if(res.data.login === 0){
                alert("充值成功了!请开心购物!")
                createBrowserHistory().push("/main")
                createBrowserHistory().go(0)
            }else{
                alert("请先登录!")
                createBrowserHistory().push("/login")
                createBrowserHistory().go(0)
            }
        })
    }
    function changeState(){
        if(document.getElementById("div1").className === "select_div1"){
            document.getElementById("div1").className = "select_div2"
        }else{
            document.getElementById("div1").className = "select_div1"
        }
    }
    function ToWhere(path){
        createBrowserHistory().push(path)
        createBrowserHistory().go(0)
    }
    function LogOut(){
        axios({
            method:"POST",
            url:"/api/logout",
        }).then((res)=>{
            alert("欢迎下次再来!")
            createBrowserHistory().push("/main")
            createBrowserHistory().go(0)
        })
    }
    return (
        <div>
            <h1 style={{width:200,zIndex:2}}>用户充值</h1>
            <div className="select_div_Recharge">
                <div className="select_big_div">
                    <img src="./img/select.png" className="select_img" onClick={changeState} alt="下拉图片"/>
                    <div className="select_div1" id="div1">
                        <div className="select_div">
                            <span onClick={()=>{ToWhere("uploadGoods")}}>上传商品信息</span><br/>
                            <span onClick={()=>{ToWhere("chart")}}>购物车</span><br/>
                            <span onClick={()=>{ToWhere("recharge")}}>充值中心</span><br/>
                            <span onClick={()=>{ToWhere("person")}}>个人信息</span><br/>
                            <span onClick={LogOut}>注销</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="div_recharge_big">
                <div className="div_recharge">
                    <input ref={money} placeholder="请输入需要充值的数目" style={{borderRadius:15,width:200,height:40,fontSize:15}}/><br/>
                    <button onClick={recharge} style={{borderRadius:15,width:100,height:35,fontSize:20}}>充值</button>
                </div>
            </div>
        </div>
    )
}
export default Recharge;