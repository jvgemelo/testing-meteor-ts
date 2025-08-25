import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import React, { useEffect } from "react";
import { BasicSiteProps } from "../App";
import CreatePost from "../components/CreatePost";
import PostCard from "./components/PostCard";
import { AvailableCollectionNames, MethodUtilMethodsFindCollectionModel } from "/imports/api/utils/models";
import { Meteor } from "meteor/meteor";
import PostModel from "/imports/api/post/models";
import { errorResponse } from "/imports/utils/errors";
import UserProfileModel from "/imports/api/userProfile/models";

export interface MiniBrowsePageUserProfileModel extends Pick<UserProfileModel, "_id" | "firstName" | "userId" | "photo" | "username" > {}

export interface MiniBrowsePagePostModel
         extends Pick<PostModel, "_id" | "createdAt" | "userId" | "text"> {}

const miniBrowsePageUserProfileFields = {
    _id: 1,
    username: 1,
    userId: 1,
    photo:1
}

const miniBrowsePagePostFields = {
    _id: 1,
    createdAt: 1,
    userId: 1,
    text:1
}

export type FetchDataType = (silent?: boolean) => Promise<void>;

interface BrowsePageProps extends BasicSiteProps{ }

const BrowsePage: React.FC<BrowsePageProps> = ({userId}) => {
    const [showCreatePost, setShowCreatePost] = React.useState(false);
    const [posts, setPosts] = React.useState<MiniBrowsePagePostModel[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [userProfiles, setUserProfiles] = React.useState<MiniBrowsePageUserProfileModel[]>([]);

    const fetchPosts = async (skip = 0, limit = 10) => {
        try {
            const findData: MethodUtilMethodsFindCollectionModel = {
                collection: AvailableCollectionNames.POSTS,
                selector: {},
                options: {
                    fields: miniBrowsePagePostFields,
                    skip: ( skip > 0 ? skip  -1 : skip ) * limit,
                    limit,
                    sort: {
                        createdAt: -1
                    }

                },
            }

            const res: MiniBrowsePagePostModel[] = await Meteor.callAsync(
                "utilMethods.findCollection",
                 findData
                );

            setPosts(res);

            return res;
        } catch(error) {
            errorResponse(error as Meteor.Error, "Could not fetch posts");
        }
        return [];
    }

    const fetchPostUsers = async (userIds:string[]) => {
          try {
            const findData: MethodUtilMethodsFindCollectionModel = {
                collection: AvailableCollectionNames.USER_PROFILE,
                selector: {
                    userId: { $in: userIds }
                },
                options: {
                    fields: miniBrowsePageUserProfileFields,
                },
            }

            const res: MiniBrowsePageUserProfileModel[] = await Meteor.callAsync(
                "utilMethods.findCollection",
                 findData
                );

            setUserProfiles(res);

            return res;
        } catch(error) {
            errorResponse(error as Meteor.Error, "Could not fetch users");
        }
        return [];
    }

    const fetchData = async (silent?: boolean) => {
        setLoading(!silent);

        const postRes = await fetchPosts();
        await fetchPostUsers(postRes.map((p) => p.userId));
        setLoading(false);
    }

    useEffect(() => {
        fetchData(); 
    }, []);
    
    if(loading) return <LoadingOutlined/>;

    console.log({posts});
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Title level={2}>Welcome to the Home Page</Typography.Title>

            {showCreatePost ?(
                <CreatePost fetchParentData={fetchData} show={showCreatePost} setShow={setShowCreatePost}></CreatePost>
            ) : (
                <Button disabled ={!userId} onClick={() => setShowCreatePost(true)}>
                    <PlusOutlined />New Post {!userId && "(Log In To Post)"}
                </Button>
            )}

            {posts.map((post) => {
                const postUser = userProfiles.find((u) => u.userId === post.userId);

                 if(!postUser) return null;

                 return <PostCard post={post} key={post._id} postUser={postUser} userId={userId}/>
            })}

        </Space>
    );
}

export default BrowsePage;