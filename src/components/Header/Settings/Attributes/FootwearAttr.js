import React from 'react';
import classes from './Attributes.css';
import AuxHoc from '../../../../hoc/Aux-hoc/Aux-hoc';

const footwearAttr = (props) => {
  return (
    <AuxHoc>

      <li>
        <label className={classes['attribute-txt']}>
          {props.attr.displayValue}
          <input type="checkbox" value={props.attr.value} checked={props.attr.isChecked} 
          onChange={props.changed}/>
        </label>
      </li>
    </AuxHoc>
  )
}

export default footwearAttr;