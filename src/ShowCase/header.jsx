import React  from "react";
import "../Styles/header.css";

export default function Header(props){
    return (
        <div className="header-container">
            <div className="header-left">{props.left}</div>
            <div className="header-right">{props.right}</div>
        </div>
    )
}