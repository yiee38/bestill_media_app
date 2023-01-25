import React, { useState } from 'react';
//import AWS from 'aws-sdk';
import { API } from "aws-amplify";
//import { convertArtName } from "../utils";
//import Header from '../ShowCase/header';
import "../Styles/form.css";
import { motion } from 'framer-motion';

/*
Commented out part is obsollete for a part of the form that submits file to the s3 bucket, which
we don't need anymore. 
*/
const AddArtistForm = (props) => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('ready');

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
	
	const pinAws = (name, art_name, nationality, type) => {
		const apiName = 'ArtistProfiles';
		const path = '/artist';
		const myInit = {
			body: {
				name: name, 
				art_name: art_name, 
				nationality: nationality, 
				type: type,
			}
		};

		API.post(apiName, path, myInit)
		.then((response) => {
				const artist = {'_id': response.insertedId, 'name': name, 'art_name': art_name, 'nationality': nationality, 'type': type};
				props.handleAdded(artist);
				setStatus('ready');
		})
		.catch((error) => {
				console.log(error.response);
		});
	} 

  const handleSubmitInfo = (event) => {
	setStatus('uploading');
    event.preventDefault();
    const name = formData.name;
    const art_name = formData.art_name;
    const nationality = formData.nationality;
	const type = formData.type;
    console.log(name);
    console.log(art_name);
    console.log(nationality);
	console.log(type);
	pinAws(name, art_name, nationality, type);
  };

	return (
		<React.Fragment>
			<form onSubmit={handleSubmitInfo} id="artist-info-form">
				<div className='artist-form-row'>
					<label htmlFor="name">Name:</label>
					<input type="text" name="name" id="name" onChange={handleChangeForm} disabled={status === 'uploading'}/>
				</div>
				<div className='artist-form-row'>
					<label htmlFor="art_name">Art name:</label>
					<input type="text" name="art_name" id="art_name" onChange={handleChangeForm} disabled={status === 'uploading'}/>
				</div>
				<div className='artist-form-row'>
					<label htmlFor="nationality">Location:</label>
					<input type="text" name="nationality" id="nationality" onChange={handleChangeForm} disabled={status === 'uploading'}/>
				</div>
				<div className='artist-form-row'>
					<label htmlFor="type">Type:</label>
					<input type="text" name="type" id="type" onChange={handleChangeForm} disabled={status === 'uploading'}/>
				</div>
				<div className='artist-form-row art-form-action'>
					<motion.button 
						type="submit" 
						disabled={status === 'uploading' } 
					>
						Submit Info
					</motion.button>
				</div>
				{status === 'uploading' && ( <div>submitting the info</div>)}
				
			</form>
		</React.Fragment>
	);
			
  
};

export default AddArtistForm;