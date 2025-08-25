import { Button, Input, message, Space, Typography } from "antd";
import React from "react";
import { useLocation } from "wouter";
import { publicRoutes } from "/imports/utils/constants/routes";
import { emailRegex } from "@netsu/js-utils";
import { Meteor } from "meteor/meteor";
import { errorResponse } from "/imports/utils/errors";
import { LoadingOutlined } from "@ant-design/icons";

interface LoginPageProps { }

const LoginPage: React.FC<LoginPageProps> = () => {
    const [location, navigate] = useLocation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const [loggingIn, setLoggingin] = React.useState(false);

    const handleSubmit = () => {
        const cleanedEmail = email.trim();   
        if(!emailRegex.test(cleanedEmail)){
            return message.error("Email is not valid")
        }

        if(password.length < 8){
            return message.error("Password must be at least 8 characters long")
        }

        setLoggingin(true)

        Meteor.loginWithPassword(cleanedEmail, password, (error?: any) => {
            setLoggingin(false)
            if(error){
                return errorResponse(error, "Could not log in")
            }
            navigate(publicRoutes.home.path)
        })
    }   

    if(loggingIn) return <LoadingOutlined/>

    return (
        <Space direction="vertical">
            <Typography.Title level={2}>Sign in to your account</Typography.Title>

            <Input placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <Input.Password placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

            <Button type="primary" onClick={handleSubmit} loading={loggingIn}>Log in</Button>

            <Typography>
                Don't have an account? Log in
                <Button type="link" onClick={() => navigate(publicRoutes.signup.path)}>
                    Create one
                </Button>
            </Typography>
        </Space>
    );
}

export default LoginPage;