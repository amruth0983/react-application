import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startGenerateMaterialSwatch } from '../../../api/jsx';

import AuxHoc from '../../../hoc/Aux-hoc/Aux-hoc';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './Settings.css';
import attributesClasses from './Attributes/Attributes.css';
import ApparelAttrs from './Attributes/ApparelAttrs';
import FootwearAttrs from './Attributes/FootwearAttr';
import * as actions from '../../../store/actions/index';

class Settings extends Component {

	state = {
		selectedDivision: this.props.searchParams['division'],
		lineBreakSelection: {
			'footwear': {
				value: ''
			},
			'apparel': {
				'fabric': {
					value: ''
				},
				'trims': {
					value: ''
				}
			}
		}
	}
	
	componentDidMount() {
		let isTriggerAction = true;
		let divisionInfo = '';
		if (this.props.searchParams && this.props.searchParams['division']) {
			divisionInfo = this.props.settings.divisionAttrs[this.props.searchParams['division']];
			
			if (this.props.searchParams['division'] === 'footwear' && 
				divisionInfo['attrList'].length > 0) {
					isTriggerAction = false;
			}

			// if (this.props.searchParams['division'] === 'apparel' && 
			//   divisionInfo['attrList'].length > 0) {
			//     isTriggerAction = false;
			// }

			if (isTriggerAction) {
				this.props.getDivisionAttributes(this.props.searchParams['division']);
			}
		}
	}

	setLineBreakInputVal = (event, data) => {
		const filterArr = this.state.lineBreakSelection;
		data['attrList'].map((key) => {
			if (key.value === event.target.value) {
				filterArr[this.props.searchParams['division']].value = '';
				filterArr[this.props.searchParams['division']].value = event.target.value;
			}
			return filterArr;
		});
		this.setState({lineBreakSelection:filterArr});
	}

	handleDivisionChange = (event) => {
		this.props.searchParams['division'] = event.target.value;
		this.setState({
			selectedDivision: event.target.value
		});
		let isTriggerAction = true;
		let divisionInfo = '';
		if (this.props.searchParams && this.props.searchParams['division']) {
			divisionInfo = this.props.settings.divisionAttrs[this.props.searchParams['division']];
			if (event.target.value === this.props.searchParams['division'] && 
				divisionInfo['attrList'].length > 0) {
					isTriggerAction = false;
			}
			if (isTriggerAction) {
				this.props.getDivisionAttributes(event.target.value);
			}
		}
	};

	handleAttributeChange = (selectedItem) => {
		const divisionAttrs = this.props.settings.divisionAttrs[this.props.searchParams['division']];
		let newFootWearList = divisionAttrs['attrList'].map((item) => {
			if(selectedItem.value === item.value) {
				item.isChecked = !item.isChecked;
			}
			return item;
		});
		this.props.setDivisionAttributes(this.props.searchParams['division'], newFootWearList);
	}

	cancelHandler = () => {
		this.props.history.goBack();
	};
	
	setFootwearPartInfo = () => {
		//startGenerateMaterialSwatch(this.props.material.materialid, this.props.material);
		this.props.history.goBack();
	}
	
	inputChangedHandler = (event) => {
		this.setLineBreakInputVal(event, this.props.settings.divisionAttrs[this.props.searchParams['division']]);
		this.props.settings.lineBreakSelection[this.props.searchParams['division']].value = event.target.value;
	}

	render() {
		let divisionAttr = '';
		let divisionAttrsList = '';
		let lineBreakDrop = '';
		let fabricAttrs = '';
		let trimAttrs = '';

		divisionAttrsList = this.props.settings.divisionAttrs[this.props.searchParams['division']];
		if (this.state.selectedDivision === 'apparel') {
			if (divisionAttrsList['attrList'].length > 0) {
				Object.keys(divisionAttrsList).map((item) => {
					console.log(item);
					if (item === 'fabric') {
						console.log(divisionAttrsList['fabric']);
						return fabricAttrs = divisionAttrsList['attrList'][0].map((item, key) => {
								return (<FootwearAttrs
								attr={item}
								key={key}
								changed={() => this.handleAttributeChange(item)}/>)            
						});
					} else {
						console.log(divisionAttrsList);
						return trimAttrs = divisionAttrsList['attrList'][1].map((item, key) => {
							return (<FootwearAttrs
							attr={item}
							key={key}
							changed={() => this.handleAttributeChange(item)}/>)            
					});
					}
				});
				// divisionAttr = divisionAttrsList['attrList'].map((attr, i) => (
				//   <FootwearAttrs
				//     attr={attr}
				//     key={i}
				//     changed={() => this.handleAttributeChange(attr)}/>
				// ));
			}
		} else {
			if (divisionAttrsList['attrList'].length > 0) {
				divisionAttr = divisionAttrsList['attrList'].map((attr, i) => {
					if (attr.value !== '') {
						return (
							<FootwearAttrs
								attr={attr}
								key={i}
								changed={() => this.handleAttributeChange(attr)}/>
						);
					}
				});
			}
			const elementConfig = {options: divisionAttrsList['attrList']}
			const selectedValue = this.state.lineBreakSelection[this.props.searchParams['division']];
			lineBreakDrop = (<Input
				elementType={'select'}
				elementConfig={elementConfig}
				value={selectedValue.value}
				changed={(event) => this.inputChangedHandler(event)}
				customClass='lineBreak' />);
		}

		return (
			<AuxHoc>
					<div className={classes.Settings}>
						<div className={classes.header}>
							<h1>Settings</h1>
						</div>
						<div className={classes.contentBlock}>
							<div className={classes.divisionBlock}>
								<p>Select Division</p>
								<label>
									<input type="radio" 
									value="apparel"
									onChange={this.handleDivisionChange}
									checked={this.state.selectedDivision === 'apparel'} />
									<span>Apparel</span>
								</label>
								<label>
									<input type="radio" 
									value="footwear"
									onChange={this.handleDivisionChange}
									checked={this.state.selectedDivision === 'footwear'} />
									<span>Footwear</span> 
								</label>
							</div>
							<div className={classes.attributesBlock}>
								<p>Attributes to be shown</p>
								{this.props.searchParams['division'] === 'footwear' ?
									<div className={attributesClasses.Attributes}>
										<ul className={attributesClasses.attributesList}>
											{divisionAttr}
										</ul>
									</div>
									:
									<div>
										<div className={attributesClasses.Attributes}>
											<ul className={attributesClasses.attributesList}>
												{fabricAttrs}
											</ul>
										</div>
										<div className={attributesClasses.Attributes}>
											<ul className={attributesClasses.attributesList}>
												{trimAttrs}
											</ul>
										</div>
									</div>
								}

								<div className={attributesClasses.lineBreakSec}>
									<p>Line break after</p>
									{lineBreakDrop}
								</div>
							</div>
							<div className={classes.btnBlock}>
								<Button btnType="Success" clicked={this.setFootwearPartInfo}>Ok</Button>
								<Button clicked={this.cancelHandler} btnType="Success">Cancel</Button>
							</div>
						</div>
					</div>
			</AuxHoc>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		searchParams: state.baskets.searchParams,
		settings: state.settings,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getDivisionAttributes: (division) => dispatch(actions.getDivisionAttrs(division)),
		setDivisionAttributes: (division, attrs, list) => dispatch(actions.setDivisionAttrs(division, attrs, list))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));