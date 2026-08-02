import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Cloudflare R2 uses the S3 API, so the standard AWS SDK works.
 * Swap the endpoint for a real AWS S3 bucket if you prefer — nothing else changes.
 * Requires R2_ENDPOINT, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in env.
 */
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT, // PLACEHOLDER — https://<account_id>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * Generates a short-lived presigned URL for a private R2 object.
 * The customer-facing link is the permanent /download/<token> route,
 * which mints one of these on every visit. The presigned URL itself
 * never needs to outlive a single click.
 */
export async function presignDownload(fileKey: string, filename: string) {
  return getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: fileKey,
      ResponseContentDisposition: `attachment; filename="${filename}"`,
    }),
    { expiresIn: 900 }, // 15 minutes
  );
}
