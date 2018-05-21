import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { onMaterialDrag } from '../../store/actions/Baskets';
import classes from '../Baskets/Basket.css';
import { IMAGESERVERURL } from '../../utility/constants';
import Image from '../UI/FallbackImage/FallbackImage';

class MaterialListItem extends Component {

	dragEnd  = (ev, material) => {
		this.props.getMaterialData(material.materialid, material);
		this.props.history.push('/part-info');
	}
	
	dragStart = (ev, material) => {
		ev.dataTransfer.setData("text/plain", material.materialid);
	}

	render() {
		let imageSrc = '';
		let imageServerPath = '';

		if (this.props.searchParams['division'] === 'footwear') {
			imageServerPath = 'ftw';
			imageSrc = require('../../assets/images/' + this.props.searchParams['division'] + '/type-na/' +
			this.props.material.material_type.toLowerCase().split(' ').join('') + '.jpg');
		} else {
			imageServerPath = 'app';
			if (this.props.material.material_type.toLowerCase() === 'fabric') {
				imageSrc = require('../../assets/images/' + this.props.searchParams['division'] + '/' + this.props.material.material_type.toLowerCase() + '/type-na/' +
				this.props.material.technology.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + '.jpg');
			} else {
				imageSrc = require('../../assets/images/' + this.props.searchParams['division'] + '/' + this.props.material.material_type.toLowerCase() + '/type-na/' +
				this.props.material.trimtype.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + '.jpg');
			}
		}

		return (
			<li className={classes.materials}
				draggable={true}
				onDragEnd={event => this.dragEnd(event, this.props.material)}
				onDragStart={event => this.dragStart(event, this.props.material)}>

				 <div className={classes.itemBlock}>
					<div className={classes.imageBlock}>
						<Image fallbackSrc={imageSrc}
						alt={this.props.material.materialid + "_front_tile"} 
						src={IMAGESERVERURL + '/' + imageServerPath + '/'+ this.props.material.materialid + "_front_tile.jpg"}
						fullImage={IMAGESERVERURL + '/' + imageServerPath + '/'+ this.props.material.materialid + "_front_full.jpg"}  />
					</div>
					<div className={classes.contentBlock}>
						<span>
							{this.props.material.materialid} - {this.props.material.composition.join(' ')}
							{this.props.material.construction}
						</span>
						<br />
						<span>
							{this.props.material.lead_time_min} {this.props.material.leadtime} 
							{this.props.material.status} {this.props.material.sustainability} 
							{this.props.material.technology} {this.props.material.weight}
						</span>
					</div>
				</div>
			</li>
		);
	}
}

const mapStateToProps = state => {
	return {
		searchParams: state.baskets.searchParams
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getMaterialData: (materialid, material) => dispatch(onMaterialDrag(materialid, material)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialListItem));