import { Meteor } from "meteor/meteor";
import { MethodSetPostCreateModel } from "../models";
import { check } from "meteor/check";
import { checkStrEmpty } from "@netsu/js-utils";
import { message } from "antd";
import { MAX_POST_LENGTH } from "/imports/utils/constants";
import { clientContentError, noAuthError } from "/imports/utils/serverErrors";
import { currentUserAsync } from "/server/utils/meteor";
import PostCollection from "../post";

Meteor.methods({
    "set.post.create": async ({text} : MethodSetPostCreateModel)=>{
        check(text, String);

        if(checkStrEmpty(text)) return message.error("Post text is required");

        const cleanedText = text.trim();

        if(cleanedText.length > MAX_POST_LENGTH){
            return clientContentError(`Post text is too long`);
        }

        const user = await currentUserAsync()

        if(!user) return noAuthError();

        await PostCollection.insertAsync({
            text: cleanedText,
            userId: user._id,
            createdAt: new Date(),
        });
    }
})
