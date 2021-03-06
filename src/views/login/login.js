import React,{Component,Fragment} from 'react';
import "../../common/css/login.scss"
import {login} from '../../store/action/actionCreator'
import { Link } from 'react-router-dom';
import {Input} from 'antd'
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            userSrcN: require("../../common/img/userN.svg"),
            userSrcY: require("../../common/img/userY.svg"),
            passwordSrcN: require("../../common/img/passwordN.svg"),
            passwordSrcY: require("../../common/img/passwordY.svg"),
        }
        this.login = this.login.bind(this)
        this.changeUse = this.changeUse.bind(this)
        this.changePsd = this.changePsd.bind(this)
    }
    render(){
        let {username,password,userSrcN,passwordSrcN,userSrcY,passwordSrcY} = this.state
        return (
            <Fragment>
                 <div className="login">
                    <header>
                    <p className="left">
                        <span>家庭记账平台</span>
                        <i>欢迎登录</i>
                    </p>
                    <p className="right">
                        <img className="user-avator" src="../../common/img/avator.svg" alt="" />
                        <span className="login-status">未登录</span>
                    </p>
                    </header>
                    <section className="account">
                    <h2>账号登录</h2>
                    <div className="user-name">
                        <img src={username==""?userSrcN:userSrcY} alt="" />
                        <Input
                        placeholder="请输入用户名"
                        type="text"
                        onChange = {this.changeUse}
                        />
                    </div>
                    <div className="user-password">
                        <img src={password==""?passwordSrcN:passwordSrcY} alt="" />
                        <Input
                        type="password"
                        onChange = {this.changePsd}
                        placeholder="请输入密码"
                        />
                    </div>
                    <p className="forget-password">忘记密码?</p>
                    <button className={username && password ? 'login-in' : 'login'} onClick={this.login}>
                        登录
                    </button>
                    </section>
                    <footer className="footer">
                    <p className="footer-top">
                       
                    </p>
                    <p className="footer-bottom">
                       
                    </p>
                    </footer>
                </div>
            </Fragment>
        )
    }
    componentWillMount(){
        if(localStorage.getItem('token')){
            this.props.history.push({pathname:'/order'})
        }
    }
    // 登录
    login(){
        let params = {
            userName:this.state.username,
            passWord:this.state.password
        }
        login(params).then((res)=>{
            localStorage.setItem('token',res.data);
            localStorage.setItem('name',res.msg);
            this.props.history.push({pathname:'/order'})
        })
    }
    // 密码输入
    changePsd(e){
        this.setState({
            password:e.target.value
        })
    }
    // 用户名输入
    changeUse(e){
        this.setState({
            username:e.target.value
        })
    }
}
export default Login;
