import React, { Component } from 'react';
import AuxHoc from '../../../../hoc/Aux-hoc/Aux-hoc';
import classes from './Attributes.css';
import Input from '../../../UI/Input/Input';
import { updateObject } from '../../../../utility/utility';

class footwearAttrs extends Component {

  state = {
    footwearAttrArr : [
      { value: 'supprefnum', displayValue: 'Supplier Material Name', 'isChecked': true },
      { value: 'composition', displayValue: 'Composition', 'isChecked': true },
      { value: 'const', displayValue: 'Construction', 'isChecked': true },
      { value: 'thickness', displayValue: 'Thickness in MM', 'isChecked': true },
      { value: 'leadtime', displayValue: 'Production Lead Time', 'isChecked': true },
      { value: 'weight', displayValue: 'Weight', 'isChecked': true },
      { value: 'status', displayValue: 'Status', 'isChecked': true }
    ],
    controls: {
			basketFilter: {
				elementType: 'select',
				elementConfig: {
					options: [
            {value: '', displayValue: 'None'},
            { value: 'supprefnum', displayValue: 'Supplier Material Name' },
            { value: 'composition', displayValue: 'Composition' },
            { value: 'const', displayValue: 'Construction' },
            { value: 'thickness', displayValue: 'Thickness in MM' },
            { value: 'leadtime', displayValue: 'Production Lead Time' },
            { value: 'weight', displayValue: 'Weight' },
            { value: 'status', displayValue: 'Status' }
          ]
				},
				value: '',
				validation: {},
				valid: true
			}
    }
  };

  inputChangedHandler = (event) => {
    const updatedFormElement = updateObject(this.state.controls.basketFilter, {
			value: event.target.value
		});
		const updatedOrderForm = updateObject(this.state.controls, {
			'basketFilter': updatedFormElement
		});
		this.setState({ controls: updatedOrderForm });
  }

  handleAttributeChange = (selectedItem, index) => {

    let newFootWearList = this.state.footwearAttrArr.map((item) => {
      if(item.displayValue === selectedItem.displayValue) {
        item.isChecked = !selectedItem.isChecked;
      }
      return item;
    });
    this.setState({
      footwearAttrArr: newFootWearList
    });
  }

  render() {
    let lineBreakDrop = (<Input
			elementType={this.state.controls.basketFilter.elementType}
			elementConfig={this.state.controls.basketFilter.elementConfig}
			value={this.state.controls.basketFilter.value}
			invalid={!this.state.controls.basketFilter.valid}
			shouldValidate={this.state.controls.basketFilter.validation}
			changed={(event) => this.inputChangedHandler(event)}
      customClass='lineBreak' />);

    let attributesList = '';
    attributesList = props.attributes.map((item, key) => {
      return (
        <li key={key}>
          <label>
            <span className={classes['attribute-txt']}>{item.displayValue}</span>
            <input type="checkbox" defaultChecked={item.isChecked} 
            onChange={key => this.handleAttributeChange(item, key)}/>
          </label>
        </li>
      );
    });
     
    return (
      <AuxHoc>
        <div className={classes.Attributes}>
          <ul className={classes.attributesList}>{attributesList}</ul>
        </div>
        <div className={classes.lineBreakSec}>
          <p>Line break after</p>
          {lineBreakDrop}
        </div>
      </AuxHoc>
    );
  }
}

export default footwearAttrs;