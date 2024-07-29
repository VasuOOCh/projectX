import { Video } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();

export const ourFileRouter = {

  videoUploader: f({ video: { maxFileSize: "256MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const { userId } = getAuth(req)
      if(!userId) {
        throw new UploadThingError("Unauthorized")
      }
      
      // whatever you will return will be saved to metadata in 'onUploadComplete'
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

    //   console.log("Upload complete for userId:", metadata.userId);
    //   console.log("file url", file.url);

    // Adding video to DB
    // connectToDb();
    // const newVideo = new Video({
    //     title : "Sample video",
    //     desc : "Sample desc",
    //     tags : ["fun", "java"],
    //     link : file.url,
    //     userId : metadata.userId
    // })
    // await newVideo.save()

    //this return goes to the client Upload component
      return { videoData : file };
    }),
    imageUploader: f({ image: { maxFileSize: "2MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const { userId } = getAuth(req)
      if(!userId) {
        throw new UploadThingError("Unauthorized")
      }
      
      // whatever you will return will be saved to metadata in 'onUploadComplete'
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

    //   console.log("Upload complete for userId:", metadata.userId);
    //   console.log("file url", file.url);

    //this return goes to the client Upload component
      return { thumbnailData : file };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;