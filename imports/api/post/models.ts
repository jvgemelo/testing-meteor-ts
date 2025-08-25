interface PostModel {
    _id: string;
    /*
        User who created the post
    */ 
    userId: string;
    text: string;
    createdAt: Date;
    deletedAt?: Date;
    deleted?: boolean;
}

export default PostModel

// GET METHODS 

// SET METHODS

export interface MethodSetPostCreateModel{
    text: string;
}