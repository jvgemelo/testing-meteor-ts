import { HeartOutlined } from '@ant-design/icons';
import { formatToHumanDate } from '@netsu/js-utils';
import { Avatar, Button, Card, Space, Typography } from 'antd';
import React from 'react';
import { MiniBrowsePagePostModel } from '../..';

interface PostCardProps {
    post: MiniBrowsePagePostModel;
}


const PostCard: React.FC<PostCardProps> = ({post}) => {
    const postActions = [
        <Button type='text' key="like">
             <HeartOutlined/>
        </Button>,
    ]

    return (
        <Card actions={postActions} style={{ minWidth: 300 }}>
            <Card.Meta
                avatar={
                    <Avatar
                        style={{
                            backgroundColor: '#ff98ad',
                            verticalAlign:"middle"
                        }}
                        size={"large"}
                        gap={4}
                    >
                        Jack
                    </Avatar>
                }
                description={
                    <Space direction='vertical'>
                        <Typography>{post.text}</Typography>
                        <Typography> {formatToHumanDate(post.createdAt)}
                            By{" "}
                            <Button type="link">
                                Jack
                            </Button>
                        </Typography>
                    </Space>
                }
            />
        </Card>
    );
};

export default PostCard;