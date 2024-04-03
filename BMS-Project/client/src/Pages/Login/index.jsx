import React, { useEffect } from 'react'
import {Form, message} from "antd";
import Button from "../../components/Button";
import { Link, useNavigate  } from "react-router-dom";
import { LoginUser } from '../../apiCalls/Users';

export default function Login() {

  const Navigate = useNavigate();

  async function onFinish(values) {
    try {
      const response = await LoginUser(values);

      if ( response.success ){
        message.success(response.message);
        localStorage.setItem('token', response.data);
        Navigate("/");
      }else{
        message.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(function(){
    if ( localStorage.getItem('token') ){
      Navigate("/");
    }
  },[])

  return (
    <div className = "flex justify-center h-screen items-center bg-primary">
    <div className = "card p-3 w-400">
      <h1 className = "text-xl mb-1">Welcome Again! Please Login</h1>
      <hr />
      <Form layout = "vertical" className = "mt-1" onFinish = {(values) => {onFinish(values)}}>
        <Form.Item
          label = "Email"
          name = "email"
          rules = {[{ required: true, message: "Please input your email!" }]}
        >
          <input type = "email" />
        </Form.Item>
        <Form.Item
          label = "Password"
          name = "password"
          rules = {[{ required: true, message: "Please input your password!" }]}
        >
          <input type = "password" />
        </Form.Item>

        <div className = "flex flex-col mt-2 gap-1">
          <Button fullWidth title = "LOGIN" type = "submit" />
          <Link to = "/register" className = "text-primary">
            {" "}
            Don't have an account? Register
          </Link>
        </div>
      </Form>
    </div>
  </div>

  )
}
