import React from "react";
import { API } from "aws-amplify";
import "../Styles/list.css";
import FileListItem from "../Components/ArtFileListItem";
import { AnimatePresence, motion } from "framer-motion"

export default function ArtFileList(props){
    const deleteArtistFile = (file) => {
        
       const filename = file.fname;
       const id = props.id;
       const type = file.type
       const apiName = 'ArtistProfiles';
       const path = '/artistfile';
       const myInit = {
           body: {
               id: id,
               type: type, 
               fname: filename
           }
       };
       
       API.del(apiName, path, myInit)
       .then((response) => {
            console.log(response);
            props.deleteFile(file);
       })
       .catch((error) => {
           console.log(error.response);
       });
       
    }

    const handleDelete = (file) => {
        //deleteArtistFile({type:'image', fname: 'trek.jpeg'});
        deleteArtistFile(file)
    }
    

    return (
        <React.Fragment>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{fontSize: 'var(--font-large)'}}>Files</div>
                <AnimatePresence>
                    {props.files.map((file) => (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                            key={file.fname} 
                        >
                            <FileListItem 
                                file={file} 
                                style={{fontSize: 'var(--font-medium)'}}
                                handleDelete={handleDelete}
                            ></FileListItem>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </React.Fragment>
        
    )
}