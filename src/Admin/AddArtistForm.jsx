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
  //const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  //const [file, setFile] = useState(null);
	//const [id, setId] = useState(null);
	const [status, setStatus] = useState('ready');
  //const fileInputRef = useRef(null);
	//const [selected, setSelected] = useState('image');
	//const [status, setStatus] = useState('none');

	//const bucketName = 'yilubestillbucket';

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
	/*
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  }
	*/
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
				console.log(response);
				//setId(response.insertedId);
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
    console.log(formData);
    const name = formData.name;
    const art_name = formData.art_name;
    const nationality = formData.nationality;
	const type = formData.type;
    console.log(name);
    console.log(art_name);
    console.log(nationality);
	console.log(type);
	pinAws(name, art_name, nationality, type);
    //setStep((prevStep) => prevStep + 1);
  };

	/*
  const handleSubmitFile = (event) => {
    event.preventDefault();
    console.log(file);
    uploadFile(file);
		setFile(null);
    fileInputRef.current.value = '';
  };
	*/
	/*
  const uploadFile = (file) => {
		const foldername = convertArtName(formData.art_name);
    const fileName = file.name;
    const s3 = new AWS.S3({params: { Bucket: bucketName }});

		const apiName = 'ArtistProfiles';
		const path = '/artistfile';
		const myInit = {
			body: {
				id: id, 
				type: selected, 
				fname: fileName
			}
		};
		
    s3.upload({
      Key: `${foldername}/${fileName}`,
      Body: file,
      ContentType: file.type,
    }, function(error, data) {
			if (error) {
			console.error(`Error uploading file to S3: ${error.message}`);
			} else {
				console.log(`File uploaded to S3 successfully: ${data.Location}`);
				API.post(apiName, path, myInit)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error.response);
				});
			}
    });
  } 
	
	const disableSubmitForm = () => {
		return formData.name == null || formData.name.trim() === '' || 
			formData.art_name == null || formData.art_name.trim() === '' ||
			formData.nationality == null || formData.nationality.trim() === '';
	}
	*/
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


/*
<form onSubmit={handleSubmitFile} id="artist-info-form">
					<div className='artist-form-subtitle'>File</div>
					<label htmlFor="type">Type: </label>
					<select
						id="type"
						name="type"
						defaultValue={selected}
						onChange={e => setSelected(e.target.value)}
					>
						<option>image</option>
						<option>music</option>
						<option>video</option>
						<option>pdf</option>
					</select>
					<input type="file" name="file" id="file" ref={fileInputRef} onChange={onFileChange} />
					<div className='artist-form-row art-form-action'>
						<button type="submit" disabled={id == null}>Submit File</button>
					</div>
				</form>

				{status==="none" && 
					<div style={
						{
							display:'flex', 
							flexDirection:'row', 
							justifyContent:'flex-end',
							width: '100%'
						}
					}>
						Nothing
				</div>
				}
				{status==="uploading" && 
					<div style={
						{
							display:'flex', 
							flexDirection:'row', 
							justifyContent:'flex-end',
							width: '100%'
						}
					}>
						uploading
					</div>
				}
				{status==="uploading" && 
					<div style={
						{
							display:'flex', 
							flexDirection:'row', 
							justifyContent:'flex-end',
							width: '100%'
						}
					}>
						
					</div>
				}

*/