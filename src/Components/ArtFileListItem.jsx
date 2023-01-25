import React, {useState} from "react";
import { BiTrash } from 'react-icons/bi';
import { motion } from 'framer-motion';

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
      style={{padding: '0', margin: '0', background: 'transparent', border: 'none', cursor: 'pointer'}}
    >
      <BiTrash size={18} style={{color: 'var(--color-buttons)'}} onClick={onClick}/>
    </motion.button>
  );
}
  

export default function FileListItem(props) {
    return (
      <div 
        style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', gap: 'var(--font-huge)' }} 
        className='file-list-item'
      >
        <div style={{...props.style, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80%' }}>{props.file.fname}</div>
        <DeleteButton handleClick={() => props.handleDelete(props.file)} />
      </div>
    )
}