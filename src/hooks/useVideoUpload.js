import { useState } from 'react'
import { S3_BUCKET, client } from '../config/s3';

const useVideoUpload = () => {

    const [progress, setProgress] = useState(0);
    const [err, setError] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);


    const reset = () => {
        setLoading(false);
        setProgress(0);
        setError("");
        setUrl("");
    }

    const upload = (file, filename) => {
        reset();
        setLoading(true);
        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: `videos/${filename}`
        };

        client.upload(params, {}, (err, data) => {
            if (err) {
                setLoading(false);
                setError("error uploading video");
            } else {
                setLoading(false);
                setUrl(data.Location);
            }
        })
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })

    }

    return { progress, upload, url, err, reset, loading, reset }
}

export default useVideoUpload;