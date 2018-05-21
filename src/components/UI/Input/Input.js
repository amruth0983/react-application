import React from 'react';
import classes from './Input.css';

const Input = (props) => {
	let inputEle = null;
	const inputClasses = [classes.InputElement];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	if (props.elementType === 'select') {
		inputClasses.push(classes.Select);
	}

	switch (props.elementType) {
		case ('input'):
			inputEle = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed} />;
			break;
		case ('select'):
			inputEle = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}>
					{props
						.elementConfig
						.options
						.map(option => (
							<option key={option.value} value={option.value} defaultValue={props.value}>
								{option.displayValue}
							</option>
						))}
				</select>
			);
			break;
		default:
			inputEle = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed} />;
	}

	return (
		<div className={(props.elementType === 'select' ? [classes['SelectInput'], [props.customClass ? classes['basket-type']: '']].join(' ') : classes.Input)}>
			<label className={(props.elementType === 'select' ? classes.customSelect: classes.Label)}>{props.label}</label>
			{inputEle}
		</div>
	);
};

export default Input;