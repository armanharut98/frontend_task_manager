import React from "react";
import './Card.css';


const Card = ({ children, classNames,id,onClickHandler,ref}) => {
  return <div className={`card__container ${classNames}`} key={id ? id : ''} onClick={onClickHandler} ref={ref}>{children}</div>;
};

export default Card;
