import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { logger } from "../middleware/logger";
import {
  BUCKET_NAME,
  R2_ACCESS_KEY_ID,
  R2_ENDPOINT,
  R2_SECRET_ACCESS_KEY,
} from "../secrets";

type UploadBody = {
  fileName: string;
  type: string;
};

type DeleteBody = {
  key: string;
};

const r2 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export const uploadUrl = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Generating signed URL for R2 upload");
  const { fileName, type } = req.body as UploadBody;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: type,
  });

  const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });

  logger.info("Successfully generated signed URL");
  res.status(200).json({ url: signedUrl });
});

export const getListUrl = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Generating signed URL for R2 get object");

  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
  });

  const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });

  logger.info("Successfully generated signed URL");
  res.status(200).json({ url: signedUrl });
});

export const deleteObjectUrl = asyncHandler(
  async (req: Request, res: Response) => {
    logger.info("Generating signed Url for R2 delete objects");
    const { key } = req.body as DeleteBody;

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });

    logger.info("successfully generated signed Url for R2 delete objects");
    res.status(200).json({ url: signedUrl });
  },
);
