import React, { useState, useEffect } from 'react';
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
import { useAlert } from 'react-alert';
import { v4 } from 'uuid'
import useUploadImage from '../hooks/useUploadImage';
import { makeGetRequest, makePostRequest } from '../config'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function EditSeries() {
    const { seriesId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [published, setPublished] = useState(false);
    const [artwork, setArtwork] = useState(null)
    const alert = useAlert();
    const navigate = useNavigate()

    const { progress, upload, url, err, reset } = useUploadImage();


    const finishRequest = async () => {
        try {
            const req = await makePostRequest(`/series/edit/${seriesId}`, {
                title,
                artwork: url || "",
                published,
                seriesId
            });
            const response = await req.json();
            if (response.success) {
                alert.success(response.msg);
                navigate("/series");
            } else {
                setLoading(false);
                alert.error(response.msg);
                console.log(response);
            }
        } catch (err) {
            alert.error("Something went wrong.");
            setLoading(false);
            console.log(err);
        }
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            setLoading(true);
            // validation
            if (!title) {
                alert.error("Please provide required fields");
                setLoading(false);
                return false;
            }
            if(artwork){
                const imageID = v4();
                const filext = artwork.type.split("/")[1];
                const filename = `${imageID}.${filext}`;
                upload(artwork, filename);
            }else{
                finishRequest();
            }
        } catch (err) {
            alert.error("Something went wrong.");
            setLoading(false);
            console.log(err);
        }
    }

    const handleImageInput = e => {
        try {
            reset();
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

            if (img.size > 4000000) {
                alert.error("Image size must not be grater than 1mb.");
                e.target.value = "";
                return false;
            }
            setArtwork(img);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async() => {
        try {
            setLoading(true);
            const confirmation = window.confirm("Confirm Delete");
            if(confirmation){
                const res = await makePostRequest(`/series/delete/${seriesId}`);
                const data = await res.json();
                if(data.success){
                    alert.success(data.msg);
                    navigate("/series");
                }
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            alert.error("Something went wrong");
        }
    }


    useEffect(() => {
        if (err) {
            alert.error(err);
            setLoading(false);
        }
    }, [err])

    useEffect(() => {
        if (url) {
            finishRequest();
        }
    }, [url])

    const init = async () => {
        const res = await makeGetRequest(`/series/find/${seriesId}`);
        const data = await res.json();
        const ser = data.series;
        setTitle(ser.title);
        setPublished(ser.published);
    }

    useEffect(()=> {
        init();
    }, [])

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
                        <h1 className='h3 text-dark'>Edit Series</h1>
                        <div className='container rounded px-4' style={styles.formWrap}>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for='title'>Title *</Label>
                                    <Input
                                        value={title}
                                        onInput={(e) => setTitle(e.target.value)}
                                        placeholder='Enter message title'
                                        type='text'
                                        id='title'
                                        name='title'
                                    // required={true}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='artwork'>Artwork *</Label>
                                    <Input
                                        type='file'
                                        accept='image/*'
                                        id='artwork'
                                        onChange={handleImageInput}
                                        required={false}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Progress
                                        animated
                                        className="my-2"
                                        value={progress}
                                    >
                                        {progress}%
                                    </Progress>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='published'>Published</Label>
                                    <Input
                                        type='select'
                                        name='published'
                                        id='published'
                                        onChange={(e) => setPublished(e.target.value)}
                                    >
                                        <option value={false}>False</option>
                                        <option value={true}>True</option>
                                    </Input>

                                </FormGroup>
                                <FormGroup>
                                    <Button disabled={loading} color='success'>
                                        {loading ? <Spinner size={"sm"} color='white' /> : "Update"}
                                    </Button>
                                </FormGroup>
                            </Form>
                            <hr/>
                            <h1 className='text-danger my-5'>Danger</h1>
                            <div className='mt-5'>
                            <button onClick={handleDelete} className="btn btn-danger">
                                Delete Series
                                <i className='fas fa-trash'/>
                            </button>
                            </div>
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

export default EditSeries;