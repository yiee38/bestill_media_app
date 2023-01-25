import React, {useEffect, useState} from "react";
import Header from "./header";
import ArtistListItem from "../Components/artistListItem";
import { API } from "aws-amplify";
import "../Styles/list.css";
import AWS from 'aws-sdk';
import AddArtistForm from "../Admin/AddArtistForm";
import LogOutButton from "../Components/logOutButton";
import { convertArtName } from "../utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ArtistList(props){
    const [artistList, setArtistList] = useState([]);
    //const [file, setFile] = useState(null);
    //const fileInputRef = useRef(null);
    
    const [showForm, setShowForm] = useState(false);

    const bucketName = 'yilubestillbucket';
    const pinAws = (id) => {
        const apiName = 'ArtistProfiles';
        const path = '/';
        const myInit = {};

        API.get(apiName, path, myInit)
        .then((response) => {
            console.log('hi');
            setArtistList(response);
        })
        .catch((error) => {
            console.log(error.response);
        });
    } 

    const handleClick = (artist) => {
        console.log(artist);
        
        //make api call to delete an artist
        const apiName = 'ArtistProfiles';
        const path = '/artist';
        const myInit = {
            body: {
                id: artist._id
            }
        };
        API.del(apiName, path, myInit)
        .then((response) => {
            console.log(response);
            if (artist.files){
                artist.files.forEach((file, _) => {
                    deleteArtistFile(file, artist);
                })
            }
            const newArtist = artistList.filter((item) => item._id !== artist._id); 
            setArtistList(newArtist);
        })
        .catch((error) => {
            console.log(error.response);
        });
    }

    /*
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(file);
        uploadFile(file);
        fileInputRef.current.value = '';
    }

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    */
    /*
    const uploadFile = (file) => {
        const fileName = file.name;
        const s3 = new AWS.S3({params: { Bucket: bucketName }});
        console.log(file);
        s3.upload({
            Key: fileName,
            Body: file,
            ContentType: file.type,
          }, function(error, data) {
            if (error) {
              console.error(`Error uploading file to S3: ${error.message}`);
            } else {
              console.log(`File uploaded to S3 successfully: ${data.Location}`);
            }
        });
        
    }
    */
    
    const deleteArtistFile = (file, artist) => {
        const filename = file.fname;
        const artistName = convertArtName(artist.name);
        const foldername = convertArtName(artist.art_name);
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

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleHideForm = () => {
        setShowForm(false);
    }
    
    /*
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setShowForm(false);
    };
    
    const handleDelete = () => {
        deleteArtistFile({type:'image', fname: 'trek.jpeg'});
    }
    */

    const handleAdded = (artist) => {
        console.log(artist);
        const newArtist = []
        artistList.forEach((a, _) => {
            newArtist.push(a)
        })
        newArtist.push(artist);
        console.log(newArtist);
        setArtistList(newArtist);
        setShowForm(false);
    }

    useEffect(()=>{
        pinAws();
        console.log(process.env.REACT_APP_HELLO);
	}, [])

    return (
        <React.Fragment>
            <Header left={<div>Hello Admin!</div>} right={<a href="https://bestillmedia.org/showcase">back to bestill media</a>}></Header>
            <div className="artist-list">
                <AnimatePresence>
                {artistList.map((artist) => (
                    <motion.div 
                        key={artist._id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{width: '100%'}}
                    >
                        <ArtistListItem
                            artist={artist} 
                            handleClick={handleClick}
                        />
                    </motion.div>
                ))}
                </AnimatePresence>
                <div style={
                    {
                        paddingTop: 'var(--font-medium)',
                        width: '100%', 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'flex-end'
                    }
                }>
                <div style={{width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 'var(--font-small)'}}> 
                    {showForm ? 
                        <motion.button whileTap={{scale: 0.97}} className="underline-button" onClick={handleHideForm}>Hide form</motion.button>:
                        <motion.button whileTap={{scale: 0.97}} className="underline-button" onClick={handleShowForm}>Show form</motion.button> 
                    }
                    {showForm && (
                        <AnimatePresence>
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                            <AddArtistForm handleAdded={handleAdded}></AddArtistForm>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
                </div>
            </div>
            <LogOutButton />
        </React.Fragment>
        
    )
}


/*
<form onSubmit={handleSubmit}>
                    <input type="file" ref={fileInputRef} onChange={onFileChange} />
                    <button type="submit">Upload</button>
                </form>
                <button onClick={handleDelete}>DELETE</button>
*/