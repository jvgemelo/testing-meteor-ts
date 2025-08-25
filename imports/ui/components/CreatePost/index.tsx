import { CloseOutlined } from '@ant-design/icons';
import { checkStrEmpty } from '@netsu/js-utils';
import { Button, Flex, message, Space } from 'antd';
import Input from 'antd/es/input/Input';
import React from 'react';
import { MAX_POST_LENGTH } from '/imports/utils/constants';

interface CreatePostProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const CreatePost: React.FC<CreatePostProps> = ({ show, setShow }) => {
    const[postText, setPostText] = React.useState("");

    if (!show) return <></>

    const handleSubmitPost = async () => {
        if(checkStrEmpty(postText)) return message.error("Post text cannot be empty");

        const cleanedText = postText.trim();

        if(cleanedText.length > MAX_POST_LENGTH){
            return message.error(`Post text cannot exceed ${MAX_POST_LENGTH} characters`);
        }


    }

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