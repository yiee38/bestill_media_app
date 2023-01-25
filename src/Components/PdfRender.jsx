import React from 'react';
import { motion } from "framer-motion";
import "../Styles/pdf.css"

function MyPdfViewer(props) {
  return (
    <motion.iframe
      src={props.src}
      className="my-pdf-viewer"
      style={{width: props.width || '100%'}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
          duration: 0.9,
          ease: [0, 0.71, 0.2, 1.01]
      }}
    />
  );
}

export default MyPdfViewer;