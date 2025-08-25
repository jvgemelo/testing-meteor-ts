import { Button, Input, message, Space, Typography } from "antd";
import React, { useState } from "react";
import { useLocation } from "wouter";
import { publicRoutes } from "/imports/utils/constants/routes";
import { checkStrEmpty, emailRegex } from "@netsu/js-utils";
import { Meteor } from "meteor/meteor";
import { MethodSetUserCreateModel } from "/imports/api/users/models";
import { errorResponse } from "/imports/utils/errors";

interface SignupPageProp { }

const SignupPage: React.FC<SignupPageProp> = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [location, navigate] = useLocation();
    const [logginin, setLoggingin] = useState(false);

    const handleSubmit = async () => {
        const cleanedEmail = email.trim();
        const cleanedUsername = username.trim();
        const cleanedFirstName = firstName.trim();
        const cleanedLastName = lastName.trim();
        if (!emailRegex.test(cleanedEmail)) {
            return message.error("Email is not valid");
        }

        if (password.length < 8) {
            return message.error("Password must be at least 8 characters long");
        }

        if(checkStrEmpty(cleanedFirstName)){
            return message.error("First name cannot be empty");
        }

        setLoggingin(true)
        
        try{
            const data: MethodSetUserCreateModel = {
                email: cleanedEmail,
                firstName: cleanedFirstName,
                password,
                username: cleanedUsername,
                lastName: cleanedLastName,

            }
            await Meteor.callAsync("set.user.create", data)
        }catch(error){
            setLoggingin(false)
            return errorResponse(error as Meteor.Error, "Error creating user")
        }

        Meteor.loginWithPassword(cleanedEmail, password, (error?: any) => {
            setLoggingin(false)
            if(error){
                return errorResponse(error, "Could not log in after sign up")
            }

            navigate(publicRoutes.home.path)
        });

        message.success("User created successfully")
    }
            // Aquí iría la lógica para manejar el registro del usuarioº    
            return (
                <Space direction="vertical">
                    <Typography.Title level={2}>Create your account</Typography.Title>

                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>

                    <Input addonBefore="@" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></Input>

                    <Input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></Input>

                    <Input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}></Input>

                    <Input placeholder="Password " value={password} onChange={(e) => setPassword(e.target.value)}></Input>

                    {/* <input className="w-96 h-16 border-2 rounded-full pl-10" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input> */}

                    <Button type="primary" onClick={handleSubmit}>Sign Up</Button>

                    <Typography>
                        Already have an account? Log in
                        <Button type="link" onClick={() => navigate(publicRoutes.login.path)}>
                            Login
                        </Button>
                    </Typography>
                </Space>
            );
        }

        export default SignupPage;