import { CloseOutlined } from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import Input from 'antd/es/input/Input';
import React from 'react';

interface CreatePostProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const CreatePost: React.FC<CreatePostProps> = ({ show, setShow }) => {
    const[postText, setPostText] = React.useState("");

    if (!show) return <></>

    return (
        <Flex style={{ width: "100%" }} gap={"large"} >
            <Input value={postText} onChange={(e)=> setPostText(e.target.value)}/>
            <Space>
                <Button>Post</Button>
                <Button type='text' onClick={() => setShow(false)}>
                    <CloseOutlined />
                </Button>

            </Space>
        </Flex>
    );
};
export default CreatePost;