import React, {useState} from "react";
import { Link } from "react-router-dom";
import { BiTrash } from 'react-icons/bi';
import { motion } from 'framer-motion';
import "../Styles/artlistitem.css";

function DeleteButton(props) {
  const [deleting, setDeleting] = useState(false);

  const onClick = () => {
    setDeleting(true);
    props.handleClick();
  }

  return (
    <motion.button 
        whileHover={!deleting ? { scale: 1.1 }:{}}
        animate={deleting ? 
        { 
            scale: [1, 2, 2, 1, 1], 
            rotate: [0, 0, 180, 180, 0], 
            transition: { 
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
            } 
        } : {}
        }
        type="button"
        style={{padding: '0', margin: '0', background: 'transparent', border: 'none', cursor: 'pointer'}}>
      <BiTrash size={props.size || 18} style={{color: 'var(--color-buttons)'}} onClick={onClick}/>
    </motion.button>
  );
}

export default function ArtistListItem(props){
    
    return (
        <React.Fragment>
            <div style={{display:'flex', flexDirection:'row', width: '100%'}} className="art-list-item">
                <div style={
                    { 
                        width: '100%',
                        display: 'grid', 
                        alignItems: 'center'
                    }
                    
                } className="art-info-grid-box">
                    <div style={{textAlign: 'left',  width: 'fit-content'}} className="art-info artist-name" >
                        <Link to={{pathname: '/admin/'+props.artist._id}}>
                            <motion.div style={{width: 'fit-content', color: 'var(--color-buttons)'}} whileHover={{scale:1.2}}>{props.artist.name}</motion.div>
                        </Link>
                    </div>
                    <div style={{textAlign: 'center', }} className="art-info">
                        {props.artist.art_name}
                    </div>
                    <div style={{textAlign: 'center', fontSize: 'var(--font-small)'}} className="art-info">
                        {props.artist.type}
                    </div>
                    <div style={
                        {
                            textAlign: 'right', 
                            fontSize: 'var(--font-small)', 
                            display: 'flex', 
                            flexDirection:'row',
                            alignItems:'center', 
                            justifyContent: 'flex-end'
                        }
                    }
                    >
                        {props.artist.nationality}
                    </div>
                </div>
                <DeleteButton size={28} handleClick={() => props.handleClick(props.artist)} />
            </div>
        </React.Fragment>
        
    )
}
