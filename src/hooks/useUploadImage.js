import { useState } from 'react'
import { S3_BUCKET, client } from '../config/s3';

const useUploadImage = () => {

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
            Key: `images/${filename}`
        };

        client.upload(params, {}, (err, data) => {
            if (err) {
                reset();
                setError("error uploading image");
                setLoading(false);
            } else {
                setUrl(data.Location);
                setLoading(false);
            }
        })
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })

    }

    return { progress, upload, err, url, reset, loading, reset }
}

export default useUploadImage;