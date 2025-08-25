import { HeartOutlined } from '@ant-design/icons';
import { formatToHumanDate } from '@netsu/js-utils';
import { Avatar, Button, Card, Space, Typography } from 'antd';
import React from 'react';

interface PostCardProps { }

const PostCard: React.FC<PostCardProps> = () => {
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
                        <Typography> This is the post rtext</Typography>
                        <Typography> {formatToHumanDate(new Date())}
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