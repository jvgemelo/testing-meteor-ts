import { Meteor } from "meteor/meteor";
import { AvailableCollectionNames, MethodUtilMethodsFindCollectionModel } from "../models";
import PostCollection from "../../post/post";
import UserProfileCollecion from "../../userProfile/userProfile";
import { internalServerError } from "/imports/utils/serverErrors";
import { MongoDBSelector } from "/imports/types/interfaces";
import { Mongo } from "meteor/mongo";
import UserProfileModel from "../../userProfile/models";

Meteor.methods({
    "utilMethods.findCollection": async ({
        collection,
        count,
        includeDeleted,
        onlyOne,
        options,
        selector,
    }: MethodUtilMethodsFindCollectionModel) => {
        const collectionMap = {
            [AvailableCollectionNames.POSTS]: PostCollection,
            [AvailableCollectionNames.USER_PROFILE]: UserProfileCollecion,
            [AvailableCollectionNames.USERS]: Meteor.users,
        }

        if (!collection || !(collection in collectionMap)) {
            return internalServerError("Collection provided does not exist");
        }
        const collectionInstance = collectionMap[collection];

        let query: MongoDBSelector = {
            _id: selector,
            $or: [
                { deleted: false },
                { deleted: { $exists: false } }
            ]
        }

        if (typeof selector === "object") {
            query = {
                $and: [
                    selector,
                    {
                        $or: [
                            { deleted: false },
                            { deleted: { $exists: false } }
                        ]
                    }
                ],
            }
        }

        // if(onlyOne && count) return clientContentError("You cannot use onlyOne and count together");

        if (onlyOne) {
            const res = await (collectionInstance as Mongo.Collection<
                UserProfileModel,
                UserProfileModel
            >
            ).findOneAsync(includeDeleted ? selector :
                query, {
                ...options,
                transform: undefined,
            }
            );

            return res;
        }

        if (count) {
            const res = await collectionInstance
                .find(includeDeleted ? selector : query, options)
                .countAsync();
            return res;
        }
        const res = await collectionInstance
            .find(includeDeleted ? selector : query, options)
            .fetchAsync();
        return res;

    }
});