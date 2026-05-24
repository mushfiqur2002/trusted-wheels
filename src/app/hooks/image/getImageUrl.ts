import { storage } from "@/lib/appwrite";

export const getImageUrl = (fileId: string) => {
    const BUCKET_ID =
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "";

    return storage
        .getFileView(BUCKET_ID, fileId)
        .toString();
};