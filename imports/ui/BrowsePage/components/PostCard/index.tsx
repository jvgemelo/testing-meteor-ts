import { HeartOutlined } from '@ant-design/icons';
import { formatToHumanDate } from '@netsu/js-utils';
import { Avatar, Button, Card, Space, Typography } from 'antd';
import React from 'react';
import { MiniBrowsePagePostModel, MiniBrowsePageUserProfileModel } from '../..';
import { AppUserIdModel } from '/imports/ui/App';

interface PostCardProps {
    post: MiniBrowsePagePostModel;
    userId?: AppUserIdModel;
    postUser: MiniBrowsePageUserProfileModel;
}


const PostCard: React.FC<PostCardProps> = ({post ,
    userId,
    postUser
}) => {
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
                    {postUser.username}
                    </Avatar>
                }
                description={
                    <Space direction='vertical'>
                        <Typography>{post.text}</Typography>
                        <Typography> {formatToHumanDate(post.createdAt)}
                            By{" "}
                            <Button type="link">
                                {postUser.username}
                            </Button>
                        </Typography>
                    </Space>
                }
            />
        </Card>
    );
};

export default PostCard;