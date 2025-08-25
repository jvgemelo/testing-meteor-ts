import { Meteor } from "meteor/meteor";
import { UserModel } from "/imports/api/users/models";

// SERVER ONLY 

export const getUserByIdAsync = async (userId: string) => {
    return (await Meteor.users.findOneAsync({userId}) as unknown as UserModel | undefined);
}

export const currentUserAsync = async () => {
    return (await Meteor.userAsync() as unknown as UserModel | undefined);
}