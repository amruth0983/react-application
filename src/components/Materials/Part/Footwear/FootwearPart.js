import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TwitterPicker } from 'react-color';
import { withRouter } from 'react-router-dom';
import { startGenerateMaterialSwatch } from '../../../../api/jsx';

import AuxHoc from '../../../../hoc/Aux-hoc/Aux-hoc';
import Button from '../../../UI/Button/Button';
import classes from './FootwearPart.css';
class FootwearPart extends Component {
	state = {
		showModal: false,
		color: '#FCB900',
		colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']
	}

	cancelHandler = () => {
		this.props.history.goBack();
	}

	handleChange = (color) => {
		this.setState({color: color.hex});
		console.log(color);
	}

	setFootwearPartInfo = () => {
		this.props.material.materialPartColor = this.state.color;
		this.setState({showModal: false});
		startGenerateMaterialSwatch(this.props.material.materialid, this.props.material);
		this.props.history.goBack();
	}

	render() {
		return (
			<AuxHoc>
					<div className={classes.FootwearPart}>
						<p>Please choose a color for this material</p>
						<TwitterPicker colors={this.state.colors} 
						onChange={ this.handleChange }
						color={this.state.color}
						className={classes.footwearPicker}/>

						<div className={classes.materialSec}>
							<div className={classes.colorInfo}>
								<p style={{'backgroundColor': this.state.color, width: '50px', height: '50px'  }}></p>
							</div>
							<div className={classes.materialInfo}>
								<p>{this.props.material.materialid} - {this.props.material.composition.join(' ')}
								{this.props.material.construction}</p>
								<p>{this.props.material.lead_time_min}
								{this.props.material.leadtime}{this.props.material.status}{this.props.material.sustainability} {this.props.material.technology} {this.props.material.weight}</p>
							</div>
						</div>
						<div>
							<Button btnType="Success" clicked={this.setFootwearPartInfo}>Ok</Button>
							<Button clicked={this.cancelHandler} btnType="Success">Cancel</Button>
						</div>
					</div>
			</AuxHoc>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		material: state.materials.draggedMaterial
	}
}

export default withRouter(connect(mapStateToProps, null)(FootwearPart));