import keys from '../keys';
import S3 from 'aws-sdk/clients/s3'

export const S3_BUCKET = 'lbmobilestorage1';
export const REGION = 'eu-west-1';

export const client = new S3({
    credentials: {
        accessKeyId: keys.aws.accessKeyId,
        secretAccessKey: keys.aws.secretAccessKey
    }
});

