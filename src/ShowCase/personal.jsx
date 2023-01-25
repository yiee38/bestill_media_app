import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Header from "./header"
import '../Styles/personal.css'; 
import AudioPlayer from "../Components/Player";
import VideoPlayer from "../Components/Video";

import { API } from "aws-amplify";
import AWS from 'aws-sdk';
import { motion } from "framer-motion";

import { convertArtName } from "../utils";
import MyPdfViewer from "../Components/PdfRender";



export default function PersonalPage(props){
    const [artist, setArtist] = useState({});
    
    const [awsFiles, setAwsFiles] = useState([]);

    const bucketName = 'yilubestillbucket';

    /*
    function compareTypes(a, b) {
        var ORDER = { 'music': 1, 'video': 2, 'image': 3, 'pdf': 4 };
        return (ORDER[a[0]] || 0) - (ORDER[b[0]] || 0);
    }
    */
    function compareFileTypes(a, b) {
        var ORDER = { 'music': 1, 'video': 2, 'image': 3, 'pdf': 4 };
        return (ORDER[a['type']] || 0) - (ORDER[b['type']] || 0);
    } 

    const FileRenderer = (props) => {
        const [imageUrl, setImageUrl] = useState(null)
        const filename = props.file.fname;
        const foldername = convertArtName(props.artist.art_name);
        const artistname = convertArtName(props.artist.name);
        const s3 = new AWS.S3({params: { Bucket: bucketName }});
        s3.getObject({ Key: `${artistname}/${foldername}/${filename}` }, (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
      
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              setImageUrl(reader.result);
            });
            reader.readAsDataURL(new Blob([data.Body], {type: data.ContentType}));
        });

        if (props.file.type === "image") {
            return (
                <div className="personal-image-container" >
                    {imageUrl ? 
                    <motion.img
                        src={imageUrl}
                        alt={props.artist.art_name}
                        className="personal-image personal-file"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.9,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    /> : 'LOADING'
                    }
                </div>
            );
        }
        else if (props.file.type === "music") {
            return (<div>{imageUrl ? <AudioPlayer src={imageUrl}/> :'LOADING'}</div>);
        }
        else if (props.file.type === "pdf") {
            return (<div>{imageUrl ? <MyPdfViewer src={imageUrl}/> :'LOADING'}</div>)
        }
        else if (props.file.type === "video") {
            return (<div>{imageUrl ? <VideoPlayer src={imageUrl} controls /> : 'LOADING' }</div>)
        }

        /*
        if (props.file.type === "image") {
            return (
                <div className="personal-image-container" >
                    <img
                        src={filepath(props.artist.art_name, props.file.fname)}
                        alt={props.artist.art_name}
                        className="personal-image personal-file"
                    />
                </div>
            );
        }
        else if (props.file.type === "music") {
            return (<AudioPlayer src={filepath(props.artist.art_name, props.file.fname)}/>);
        }
        else if (props.file.type === "pdf") {
            return (<MyPdfViewer src={filepath(props.artist.art_name, props.file.fname)}/>)
        }
        else if (props.file.type === "video") {
            return (<VideoPlayer src={filepath(props.artist.art_name, props.file.fname)} controls />)
        }
        */
        

    }

    let {id} = useParams();

    useEffect(()=>{
        const pinAws = (id) => {
            const apiName = 'ArtistProfiles';
            const path = '/artist';
            const myInit = {
              queryStringParameters: {
                id: id
              }
            };
    
            API.get(apiName, path, myInit)
            .then((response) => {
                const art_name = response['art_name'];
                const name = response['name'];
                const nationality = response['nationality'];
                const files = response['files'];
                const artist = {};
                artist.art_name = art_name;
                artist.name = name;
                artist.nationality = nationality;
                setArtist(artist);
                setAwsFiles(files.sort(compareFileTypes));
            })
            .catch((error) => {
                console.log(error.response);
            });
        }

        pinAws(id);
	}, [id])

    return (
        <React.Fragment>
            <Header left={<div>{artist.name}</div>} right={<a href="https://bestillmedia.org/showcase">back to bestill media</a>}></Header>
            <section className="personal-page">
                <motion.div 
                    className="personal-info"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    <div className="artist-art-name">{artist.art_name}</div>
                    <div className="artist-name">{artist.name}</div>
                    <div className="artist-location">{artist.nationality}</div>
                </motion.div>
                <div className="personal-files">
                {awsFiles.map((file, index) => (
                    <FileRenderer artist={artist} file={file} key={index}/>
                ))}
                </div>
            </section>
        </React.Fragment>
        
    )
}
