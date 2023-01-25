import React, {useEffect, useState, useRef} from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./header";
import { API } from "aws-amplify";
import "../Styles/list.css";
import AWS from 'aws-sdk';
import ArtFileList from "../Admin/artFileList";
import { convertArtName } from "../utils";
import LogOutButton from "../Components/logOutButton";
import "../Styles/artlist.css";
import { motion } from "framer-motion";



export default function FileList(props){
    const [artist, setArtist] = useState({});
    const [fileInput, setFileInput] = useState(null);
    const [awsFiles, setAwsFiles] = useState([]);
    const [selected, setSelected] = useState('image');
    const [accepted, setAccepted] = useState('image/*');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const bucketName = 'yilubestillbucket';

    const getFileTypes = (selection) => {
        if (selection === 'image'){
            return "image/*";
        }
        else if (selection === 'pdf'){
            return "application/pdf";
        }
        else if (selection === 'music'){
            return 'audio/*';
        }
        else if (selection === 'video'){
            return 'video/*';
        }
    }

    function compareFileTypes(a, b) {
        var ORDER = { 'music': 1, 'video': 2, 'image': 3, 'pdf': 4 };
        return (ORDER[a['type']] || 0) - (ORDER[b['type']] || 0);
    }

    const onFileChange = (event) => {
        setFileInput(event.target.files[0]);
    }

    const handleSubmitFile = (event) => {
        setUploading(true);
        event.preventDefault();
        uploadFile(fileInput);
        setFileInput(null);
        fileInputRef.current.value = '';
    };

    const uploadFile = (file) => {
        const fileName = file.name;
        const folderName = convertArtName(artist.art_name);
        const artistName = convertArtName(artist.name);
        const s3 = new AWS.S3({params: { Bucket: bucketName }});
        console.log(file);
        
        s3.upload({
            Key: `${artistName}/${folderName}/${fileName}`,
            Body: file,
            ContentType: file.type,
          }, function(error, data) {
            if (error) {
                console.error(`Error uploading file to S3: ${error.message}`);
            } else {
                const apiName = 'ArtistProfiles';
                const path = '/artistfile';
                const myInit = {
                    body: {
                        id: id, 
                        type: selected, 
                        fname: fileName
                    }
                };
                console.log(`File uploaded to S3 successfully: ${data.Location}`);
                API.post(apiName, path, myInit)
                .then((response) => {
                    console.log(response);
                    const newFile = {type: selected, fname: fileName};
                    const newFiles = []
                    awsFiles.forEach((awsFile, _) => {
                        newFiles.push(awsFile)
                    })
                    newFiles.push(newFile);
                    console.log(newFiles);
                    setAwsFiles(newFiles);
                    setUploading(false);
                })
                .catch((error) => {
                    console.log(error.response);
                });
            }
        });
        
    }

    const deleteArtistFile = (file) => {
        const foldername = convertArtName(artist.art_name);
        const artistName = convertArtName(artist.name);
        const filename = file.fname;
        const s3 = new AWS.S3({params: { Bucket: bucketName }});
        s3.deleteObject({
            Key: `${artistName}/${foldername}/${filename}`,
        }, function(error, data) {
            if (error) {
              console.error(`Error uploading file to S3: ${error.message}`);
            } else {
                console.log(`Successfully deleted ${filename} from ${bucketName}`);
            }
        });
    }

    const handleDelete = (file) => {
        console.log(file);
        const newFiles = awsFiles.filter((item) => item.fname !== file.fname); 
        setAwsFiles(newFiles);
        deleteArtistFile(file);
    }

    const handleSelectionChange = (event) => {
        setSelected(event.target.value);
        console.log(event.target.value)
        const fileType = getFileTypes(event.target.value);
        console.log(fileType);
        setAccepted(fileType);
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
                const type = response['type'];
                const files = response['files'];
                const artist = {};
                console.log(type);
                artist.art_name = art_name;
                artist.name = name;
                artist.nationality = nationality;
                artist.type = type;
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
            <Header left={<div>Hello Admin!</div>} right={<Link to={{pathname: '/art/'+id,}}>Link to Showcase</Link>}></Header> 
            <div style={
                {
                    display: 'flex', 
                    
                    gap: 'var(--font-small)',
                    flex: '1', 
                    minHeight: '100%'
                }
            } className = 'art-list-container'>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className='art-list-info-left'
                >
                    <div style={{fontSize: 'var(--font-huge)', color: 'var(--color-page-titles)'}}>{artist.art_name}</div>
                    <div style={{fontSize: 'var(--font-medium)'}}>{artist.name}</div>
                    <div style={{fontSize: 'var(--font-medium)'}}>{artist.type}</div>
                    <div style={{fontSize: 'var(--font-medium)'}}>{artist.nationality}</div>
                </motion.div>
                <div className='art-list-info-right'>
                    <ArtFileList id={id} files={awsFiles} deleteFile={handleDelete} />  
                    <form onSubmit={handleSubmitFile} id="artist-info-form">
                        <label htmlFor="type">Type: </label>
                        <select
                            id="type"
                            name="type"
                            defaultValue={selected}
                            onChange={handleSelectionChange}
                            disabled = {uploading}
                        >
                            <option>image</option>
                            <option>music</option>
                            <option>video</option>
                            <option>pdf</option>
                        </select>
                        <input 
                            type="file" 
                            name="file" 
                            id="file" 
                            ref={fileInputRef} 
                            onChange={onFileChange} 
                            disabled = {uploading} 
                            accept={accepted}
                        />
                        <div className='artist-form-row art-form-action'>
                            <button type="submit" disabled = {uploading}>Submit File</button>
                        </div>
                        {
                            uploading && (<div>uploading file</div>)
                        }
                    </form>
                </div>
            </div>

            <LogOutButton />
            
        </React.Fragment>
        
    )
}