import React, {useState} from 'react';
import { Form, Input, Button, notification } from 'antd';
import classes from './home.module.css'
import axios from 'axios';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };

const Home =() =>{

    const [token, setToken] = useState(null)
    const [showSignup, setshowSignup] = useState(false)
    const [showlogin, setshowLogin] = useState(true)
    const baseUrl = 'http://127.0.0.1:8700/'
    // const baseUrl = 'https://assesment-lms.herokuapp.com/'
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const openNotification = (placement, message) => {
        notification.info({
          message: `Notification`,
          description: `${message}`,
          placement,
        });
    };

    const authOnClick = (value) => {
        if (value==='login'){
            setshowSignup(false)
            setshowLogin(true)
        }else{
            setshowLogin(false)
            setshowSignup(true)  
        }
    };
    
    const onLeaveFinish = (values) => {
        var config = {
        method: 'post',
        url: `${baseUrl}api-root/leaves/`,
        headers: { 
            'Authorization': `Bearer ${token}`, 
        },
        data : values
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            openNotification('topLeft', "Leave request submitted successfully! You'll be notified when accessed")
            onReset()
        })
        .catch(function (error) {
            // console.log(error);
            openNotification('topLeft', "Leave request failed to submit")
        });

    };
    
    const onLoginFinish = (values) => {

        var config = {
        method: 'post',
        url: `${baseUrl}api/token/`,
        data : values
        };

        axios(config)
        .then(function (response) {
            const authData = response.data;
            setToken(authData.access)
            openNotification('topLeft', "Login Successful")
            setshowLogin(false)
            setshowSignup(false) 
            
        })
        .catch(function (error) {
            // console.log(error);
            openNotification('topLeft', "Login failed")
        });

    };
    
    const onSignupFinish = (values) => {
        var config = {
            method: 'post',
            url: `${baseUrl}api-root/user/`,
            data : values
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            openNotification('topLeft', "Signup successful, please login")
            setshowSignup(false)
            setshowLogin(true)
          })
          .catch(function (error) {
            // console.log(error);
            openNotification('topLeft', "Signup process was not successful")
          });
    };
    
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const loginForm = (
        <Form
          {...layout}
          name="loginform"
          initialValues={{
            remember: true,
          }}
          onFinish={onLoginFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    )
    
    const signupForm = (
        <Form
          {...layout}
          name="signupform"
          initialValues={{
            remember: true,
          }}
          onFinish={onSignupFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    )

    const leaveForm = (
        <div>
        <h2>Leave Form</h2>
        <Form
          {...layout}
          name="leaveForm"
          initialValues={{
            remember: true,
          }}
          form={form}
          onFinish={onLeaveFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[
              {
                required: true,
                message: 'Please enter leave start date',
              },
            ]}
          >
            <Input placeholder="YYYY-MM-DD"/>
          </Form.Item>
          
          <Form.Item
            label="End Date"
            name="end_date"
            rules={[
              {
                required: true,
                message: 'Please enter leave end date',
              },
            ]}
          >
            <Input placeholder="YYYY-MM-DD"/>
          </Form.Item>
          
          <Form.Item
            label="Leave Type"
            name="leave_type"
            rules={[
              {
                required: true,
                message: 'Please enter leave type',
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Note"
            name="note"
            rules={[
              {
                required: true,
                message: 'Please enter leave note',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
    
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>  
    )

    return (
        <div className={classes.container}>
            <Button type="primary" onClick={() => authOnClick('login')}>
              Login
            </Button>
            &nbsp;&nbsp;
            <Button type="primary" onClick={() => authOnClick('signup')}>
              Signup
            </Button>
            <br/><br/>
            {showlogin ? loginForm : null}
            {showSignup ? signupForm : null}
            {token ? leaveForm : null}
        </div>
  
      );
}

export default Home