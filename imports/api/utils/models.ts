import { MethodSearchModel } from "../../types/interfaces";

export enum AvailableCollectionNames {
    USERS= "users",
    USER_PROFILE = "user_profile",
    POSTS = "posts"
}

export interface MethodUtilMethodsFindCollectionModel extends MethodSearchModel{
    colecctionName?: AvailableCollectionNames;
    includeDeleted?: boolean;
    count?: boolean;
    collection?: AvailableCollectionNames;
}
