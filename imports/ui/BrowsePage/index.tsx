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

export interface MiniBrowsePagePostModel
         extends Pick<PostModel, "_id" | "createdAt" | "userId" | "text"> {}

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

    const fetchData = async (silent?: boolean) => {
        setLoading(!silent);

        const postRes = await fetchPosts();

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

            {posts.map((post) => (
                <PostCard post={post} key={post._id}/>
            ))}

        </Space>
    );
}

export default BrowsePage;