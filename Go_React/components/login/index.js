import "./index.css"
import {useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {createBrowserHistory} from "history";
function Login(){
    const id = useRef()
    const password = useRef()
    const navigate = useNavigate()
    function login(){
        axios({
            method:"POST",
            url:"/api/login",
            data:{
                id: parseInt(id.current.value),
                password: password.current.value
            }
        }).then((res)=>{
            if(res.data.res === 1){
                alert("登录成功")
                navigate("/main")
                window.location.reload()
            }else{
                alert("密码错误或账户不存在!请重新再试!")
            }
        })
    }
    function ToRegister(){
        createBrowserHistory().push("/register")
        createBrowserHistory().go(0)
    }
    return (
        <div className="div_class2">
            <h1 className="h1_class2">网络商城登录</h1>
            <div className="div1_shadow2">
                <form>
                    <label className="label_class2">账号</label>&nbsp;&nbsp;<input className="input_class2" type="text" ref={id} placeholder="请输入账号"/><br/><br/>
                    <label className="label_class2">密码</label>&nbsp;&nbsp;<input className="input_class2" type="password" ref={password} placeholder="请输入密码"/><br/><br/><br/>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"}}>
                        <input type="button" onClick={login} className="btn2" value="提交"/><input type="button" className="btn2" value="注册" onClick={ToRegister}/>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;