import {useRef} from "react";
import "./index.css"
import axios from "axios";
import {createBrowserHistory} from "history";
function Register() {
    const username = useRef()
    const password = useRef()
    const phone = useRef()
    const address = useRef()
    const email = useRef()
    function register(){
        axios({
            method:"POST",
            url:"/api/register",
            data:{
                "username":username.current.value,
                "password":password.current.value,
                "phone":phone.current.value,
                "address":address.current.value,
                "email":email.current.value,
            }
        }).then((res)=>{
            console.log(1)
            alert("你的用户Id是"+res.data.id+"请记住他，之后方便登录！现在你已注册完毕，可以登录了!")
            if(window.confirm("你记住了Id吗？")){
                alert("现在可以登录了")
                createBrowserHistory().push("/login")
                createBrowserHistory().go(0)
            }
        })
    }
    return (
        <div className="div_class3">
            <h1 style={{fontSize:45}}>网上商城注册</h1>
            <div className="div_form_class">
                <form>
                    <label className="label_class3">账&nbsp;&nbsp;号</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" ref={username} placeholder="请输入账号" className="input_class3"/><br/><br/>
                    <label className="label_class3">密&nbsp;&nbsp;码</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" ref={password} placeholder="请输入密码" className="input_class3"/><br/><br/>
                    <label className="label_class3">手机号</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" ref={phone} placeholder="请输入手机号" className="input_class3"/><br/><br/>
                    <label className="label_class3">邮&nbsp;&nbsp;箱</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" ref={email} placeholder="请输入邮箱地址" className="input_class3"/><br/><br/>
                    <label className="label_class3">地&nbsp;&nbsp;址</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea ref={address} rows={3} cols={22} style={{resize:"none",fontSize:25,borderRadius:10}}></textarea><br/><br/><br/>
                    <button onClick={register} className="btn5">注册</button>
                </form>
            </div>
        </div>
    )
}
export default Register;