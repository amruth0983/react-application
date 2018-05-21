import React, { Component } from 'react';
import MaterialsList from '../Materials/List';
import icons from '../../assets/icons.css';
import classes from './Materials.css';

class materailType extends Component {

	state = {
		loadingMaterials: false
	};

	getMaterialsFromType = () => {
		this.setState({ loadingMaterials: !this.state.loadingMaterials });
	}

	render() {

		let iconClasses = [icons['ds-icon']];

		if (this.state.loadingMaterials) {
			iconClasses.push(icons['ds-icon--arrow-breadcrumb-down']);
		} else {
			iconClasses.push(icons['ds-icon--arrow-breadcrumb-right']);
		}

		return (
			<li className={classes['material-type']} key={this.props.i}>
				<p onClick={() => this.getMaterialsFromType()}>
					<span className={iconClasses.join(' ')}></span>
					<span>{this.props.group.material_type}</span>
				</p>
				{this.state.loadingMaterials ? <MaterialsList materials={this.props.group.materials} key={this.props.i} /> : null}
			</li>
		)
	}
}

export default materailType;