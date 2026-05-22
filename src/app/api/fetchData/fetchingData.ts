import { databases } from "@/lib/appwrite";
import { transformCar } from "./transfromData";
import { CarInfoType } from "@/constants";

export async function getCars() {
    const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || ""
    );

    return res.documents.map((doc) => transformCar(doc as unknown as CarInfoType));
}