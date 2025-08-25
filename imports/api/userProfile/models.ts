export interface PhotoModel {
    key: string;
    // any ohter ¡data you want to store   
}

interface UserProfileModel {
    _id: string;
    userId: string;
    firstName: string;
    lastName?: string;
    username: string;
    photo?: PhotoModel;
}

export default UserProfileModel