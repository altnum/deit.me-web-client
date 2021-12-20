import React from 'react'
import './Button.css';

export default function Button(props) {
  return (
    <div onClick={props.onClick} className="button">
      {props.name}
    </div>
  )
}
