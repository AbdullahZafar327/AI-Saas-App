
import ConnectedToDb from "./mongodb";
import { auth } from "@clerk/nextjs";
import { MAX_FREE_LIMIT } from "@/constants";
import ApiLimitModel from "@/models/LimitModel";


export const increaseApiLimit = async () => {
    const { userId } = auth();
    await ConnectedToDb();
    try {
        if (!userId) {
            return false;
        }

        let userApiLimit = await ApiLimitModel.findOne({ userId });

        if (userApiLimit) {

            userApiLimit.count += 1;
            await userApiLimit.save();
            console.log("API limit increased for the user.");
         
        } else {
            userApiLimit = new ApiLimitModel({ userId, count: 1 });
            await userApiLimit.save();
      console.log("New API limit record created for the user.");
        }
    } catch (error) {
        console.error("Error while increasing API limit:", error);
    }
}

export const checkApiLimit = async () => {
    const { userId } = auth();
    await ConnectedToDb();
    try {
        if (!userId) {
            return false;
        }
        let userApiLimit = await ApiLimitModel.findOne({ userId });

        if (!userApiLimit || userApiLimit.count < MAX_FREE_LIMIT) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("error while checking api limit", error);
    }
}

export const checkApiCount = async () =>{
    const{ userId } = auth()
    await ConnectedToDb()

    try {
        if(!userId){
            return -1
        }

    let userApiLimit = await ApiLimitModel.findOne({ userId });
     if(!userApiLimit){
        return 0
     }

     return userApiLimit.count

    } catch (error) {
        console.log("error while counting api limit", error);
    }
}
