import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import React from "react";
import { BasicSiteProps } from "../App";

interface BrowsePageProps extends BasicSiteProps{ }

const BrowsePage: React.FC<BrowsePageProps> = ({userId}) => {
    const [showCreatePost, setShowCreatePost] = React.useState(false);
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Title level={2}>Welcome to the Home Page</Typography.Title>

            {showCreatePost ?
                <></>
                :
                <Button disabled ={!userId}>
                    <PlusOutlined />New Post {!userId && "(Log In To Post)"}
                </Button>}
        </Space>
    );
}

export default BrowsePage;