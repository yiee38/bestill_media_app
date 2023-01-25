import React, {useEffect, useState} from "react";
import Header from "./header";
import ArtistListItem from "../Components/artistListItem";
import { API } from "aws-amplify";
import "../Styles/list.css";
import AWS from 'aws-sdk';
import { convertArtName } from "../utils";
import { motion, AnimatePresence } from "framer-motion";

export default function TypeList(props){
    const [artistList, setArtistList] = useState([]);

    const bucketName = 'yilubestillbucket';
    const pinAws = (id) => {
        const apiName = 'ArtistProfiles';
        const path = '/';
        const myInit = {};

        API.get(apiName, path, myInit)
        .then((response) => {
            setArtistList(response);
        })
        .catch((error) => {
            console.log(error.response);
        });
    } 

    const handleClick = (artist) => {
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

    useEffect(()=>{
        pinAws();
	}, [])

    return (
        <React.Fragment>
            <Header left={<div>Bestill Media</div>} right={<a href="https://bestillmedia.org/showcase">back to bestill media</a>}></Header>
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
                    Hello
                </div>
            </div>
        </React.Fragment>
        
    )
}