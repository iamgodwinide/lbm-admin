import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Spinner,
    Progress
} from 'reactstrap'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import useUploadImage from '../hooks/useUploadImage';
import useAudioUpload from '../hooks/useAudioUpload';
import useVideoUpload from '../hooks/useVideoUpload';
import { useAlert } from 'react-alert';
import { v4 } from 'uuid'
import { makePostRequest } from '../config'

function NewMessage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const series = useSelector(state => state.series.series);
    const navigate = useNavigate();
    const alert = useAlert();


    const [title, setTitle] = useState("");
    const [seriesID, setSeriesID] = useState(series[0]?._id || "");
    const [about, setAbout] = useState("");
    const [artwork, setArtwork] = useState(null);
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [published, setPublished] = useState(false);

    const imageHook = useUploadImage();
    const audioHook = useAudioUpload();
    const videoHook = useVideoUpload();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!title || !about || !artwork || !audio) {
                alert.error("Please fill the required fileds");
                setLoading(false);
                return;
            }

            if (!imageHook.url || !audioHook.url) {
                setLoading(false);
                alert.error("Please upload required files first");
                return false;
            }

            const req = await makePostRequest("/new-message", {
                title,
                artwork: imageHook.url,
                audio: audioHook.url,
                video: videoHook.url,
                about,
                series: seriesID,
                published
            });
            const response = await req.json();
            if (response.success) {
                alert.success(response.msg);
                navigate("/messages");
            } else {
                setLoading(false);
                alert.error(response.msg);
            }

            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            alert.error("Something went wrong.")
        }
    }


    const handleImageInput = e => {
        try {
            e.preventDefault();
            imageHook.reset();
            const img = e.target.files[0];
            const types = ["image/jpg", "image/jpeg", "image/png"];
            // validate image
            if (!img) {
                e.target.value = "";
                return false;
            }

            if (!types.includes(img.type)) {
                alert.error("Please upload a valid image.");
                e.target.value = "";
                return false;
            }

            if (img.size > 10000000) {
                alert.error("Image size must not be grater than 1mb.");
                e.target.value = "";
                return false;
            }
            setArtwork(img);
        } catch (err) {
            console.log(err);
        }
    }

    const handleAudioInput = e => {
        try {
            e.preventDefault();
            audioHook.reset();
            const audiofile = e.target.files[0];
            const types = ["audio/mpeg"];
            // validate image
            if (!audiofile) {
                e.target.value = "";
                return false;
            }

            if (!types.includes(audiofile.type)) {
                alert.error("Please upload a valid audio mp3 file.");
                e.target.value = "";
                return false;
            }
            setAudio(audiofile);
        } catch (err) {
            console.log(err);
        }
    }

    const handleVideoInput = e => {
        try {
            e.preventDefault();
            videoHook.reset();
            const videofile = e.target.files[0];
            // validate image
            if (!videofile) {
                e.target.value = "";
                return false;
            }
            setVideo(videofile);
        } catch (err) {
            console.log(err);
        }
    }

    const handleImageUpload = () => {
        try {
            if (imageHook.loading) return false;
            if (!artwork) {
                alert.error("please choose an image from your computer first!");
                return;
            }
            const imageID = v4();
            const filext = artwork.type.split("/")[1];
            const filename = `${imageID}.${filext}`;

            imageHook.upload(artwork, filename);
        } catch (err) {
            imageHook.reset();
            alert.error("Image upload failed.");
        }
    }

    const handleAudioUpload = () => {
        try {
            if (audioHook.loading) return false;
            if (!audio) {
                alert.error("please choose an audio file from your computer first!");
                return;
            }
            const audioID = v4();
            const filext = audio.type.split("/")[1];
            const filename = `${audioID}.${filext}`;

            audioHook.upload(audio, filename);
        } catch (err) {
            audioHook.reset();
            alert.error("Audio upload failed.");
        }
    }

    const handleVideoUpload = () => {
        try {
            if (videoHook.loading) return false;
            if (!video) {
                alert.error("please choose a video file from your computer first!");
                return;
            }
            const videoID = v4();
            const filext = video.type.split("/")[1];
            const filename = `${videoID}.${filext}`;

            videoHook.upload(video, filename);
        } catch (err) {
            console.log(err);
            videoHook.reset();
            alert.error("Video upload failed.");
        }
    }



    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <h1 className='h3 text-dark'>Add New Message</h1>
                        <div className='container rounded px-4' style={styles.formWrap}>
                            <Form onSubmit={e => e.preventDefault()}>
                                <FormGroup>
                                    <Label for='title'>Title *</Label>
                                    <Input
                                        onInput={(e) => setTitle(e.target.value)}
                                        placeholder='Enter message title'
                                        type='text'
                                        id='title'
                                        name='title'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='series'>Series</Label>
                                    <Input
                                        type='select'
                                        name='series'
                                        id='series'
                                        onInput={(e) => setSeriesID(e.target.value)}
                                    >
                                        <option key={1} value={""}>Select</option>
                                        {
                                            series.map(ser =>
                                                <option key={ser._id} value={ser._id}>{ser.title}</option>
                                            )
                                        }
                                    </Input>

                                </FormGroup>
                                <FormGroup>
                                    <Label for='about'>About(Description)*</Label>
                                    <Input
                                        type='textarea'
                                        name='about'
                                        id='about'
                                        placeholder='Message Description...'
                                        onInput={(e) => setAbout(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='artwork'>Artwork *</Label>
                                    <Input
                                        type='file'
                                        id='artwork'
                                        name='artwork'
                                        onChange={handleImageInput}
                                    />
                                    <Progress
                                        style={{ marginTop: "1em" }}
                                        value={imageHook.progress}
                                    >
                                        {imageHook.progress}% complete
                                    </Progress>
                                </FormGroup>
                                <FormGroup>
                                    {
                                        imageHook.url === ""
                                        && <div onClick={handleImageUpload}>
                                            <Button disabled={imageHook.loading} color='primary'>
                                                {imageHook.loading ? <Spinner size={"sm"} color='light' /> : "Upload Image"}
                                            </Button>
                                        </div>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for='audio'>Audio*</Label>
                                    <Input
                                        type='file'
                                        accept="audio/*"
                                        id='audio'
                                        name='audio'
                                        onChange={handleAudioInput}

                                    />
                                    <Progress
                                        style={{ marginTop: "1em" }}
                                        value={audioHook.progress}
                                    >
                                        {audioHook.progress}% complete
                                    </Progress>
                                </FormGroup>
                                <FormGroup>
                                    {
                                        audioHook.url === ""
                                        && <div onClick={handleAudioUpload}>
                                            <Button disabled={audioHook.loading} color='primary'>
                                                {audioHook.loading ? <Spinner size={"sm"} color='light' /> : "Upload Audio"}
                                            </Button>
                                        </div>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for='audio'>Video(optional)</Label>
                                    <Input
                                        type='file'
                                        accept="video/*"
                                        id='audio'
                                        name='audio'
                                        onChange={handleVideoInput}

                                    />
                                    <Progress
                                        style={{ marginTop: "1em" }}
                                        value={videoHook.progress}
                                    >
                                        {videoHook.progress}% complete
                                    </Progress>
                                </FormGroup>
                                <FormGroup>
                                    {
                                        videoHook.url === ""
                                        && <div onClick={handleVideoUpload}>
                                            <Button disabled={videoHook.loading} color='primary'>
                                                {videoHook.loading ? <Spinner size={"sm"} color='light' /> : "Upload Video"}
                                            </Button>
                                        </div>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for='published'>Published</Label>
                                    <Input
                                        type='select'
                                        name='published'
                                        id='published'
                                        onInput={(e) => setPublished(e.target.value)}
                                    >
                                        <option value={false}>False</option>
                                        <option value={true}>True</option>
                                    </Input>

                                </FormGroup>
                                <FormGroup>
                                    {
                                        !audioHook.loading
                                        && !imageHook.loading
                                        && !videoHook.loading
                                        && <div onClick={handleSubmit}>
                                            <Button disabled={loading} color='success'>
                                                {loading ? <Spinner size={"sm"} color='light' /> : "Create"}
                                            </Button>
                                        </div>
                                    }
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}

const styles = {
    formWrap: { maxWidth: "600px", marginTop: "3em", backgroundColor: "#fff", padding: "10px" }
}

export default NewMessage;