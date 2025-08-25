import { Mongo } from "meteor/mongo";
import UserProfileModel from "./models";

const UserProfileCollecion = new Mongo.Collection<UserProfileModel>('user_profile');

export default UserProfileCollecion;