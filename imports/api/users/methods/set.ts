import {Meteor} from "meteor/meteor";
import { MethodSetUserCreateModel, UserModel } from "../models";
import { check, Match } from "meteor/check";
import { stringContainsOnlyLettersAndNumbers } from "../../../utils/checks";
import { clientContentError, notFoundError } from "/imports/utils/serverErrors";
import { emailRegex } from "@netsu/js-utils";
import UserProfileCollecion from "../../userProfile/userProfile";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
    "set.user.create":async ({
          email,
        firstName,
        lastName,
        password,
        username,
    }: MethodSetUserCreateModel) => {
    check(email, String);
    check(firstName, String);
    check(lastName, Match.Optional(String));
    check(password, String);
    check(username, String);

    if(!stringContainsOnlyLettersAndNumbers(username,true)){
        return clientContentError("Username can only contain letters and numbers");
    }

    const cleanedEmail = email.trim()
    if(!emailRegex.test(cleanedEmail)){
        return clientContentError("Email is not valid");
    }
    if(password.length < 8){
        return clientContentError("Password must be at least 8 characters long");
    }

    const cleanedUsername = username.trim

    const existingUsername = await UserProfileCollecion.findOneAsync({
        username: `@${username}`,
    });

    if(existingUsername){
        return clientContentError("Username is already taken"); 
    }

     await Accounts.createUserAsync({
         email,
        password
     });

     const newUser = await Meteor.users.findOneAsync({
        "emails.address": email
    }) as UserModel | undefined;

    if(!newUser)  return notFoundError("User not found after creation");
        await UserProfileCollecion.insertAsync({
            userId: newUser._id,
            firstName,
            lastName,
            username: `@${username}`,
        });
}
});