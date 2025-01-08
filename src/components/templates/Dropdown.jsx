import React from 'react'
import './Dropdown.css' // Import the CSS file

const Dropdown = ({title, options, func}) => {
  return (
    <div className="select">
      <select onChange={func} defaultValue="0" name="format" id="format">
        <option value="0" disabled>
            {title}
        </option>
        {options.map((option, index) =>(
            <option key={index} value={option}>{option.toUpperCase()}</option>
        ) )}
      </select>
    </div>
  )
}

export default Dropdown
