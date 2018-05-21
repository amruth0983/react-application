import React from 'react';
import Materialtype from '../Materials/Type';
import ClustersType from '../Materials/Cluster/Cluster';
import classes from './Basket.css';
import icons from '../../assets/icons.css';
import CenteredSpin from '../UI/spinner/centered-spin';
import AuxHoc from '../../hoc/Aux-hoc/Aux-hoc';

const basket = (props) => {

	let iconClasses = [icons['ds-icon']];
	let basketMaterials = '';

	if ((props.materials !== null && props.materials.materialsLoaded) || props.materials.materialsIsLoading) {
		iconClasses.push(icons['ds-icon--arrow-breadcrumb-down']);
	} else {
		iconClasses.push(icons['ds-icon--arrow-breadcrumb-right']);
	}

	if (props.materials.materialGroups.length > 0) {
		basketMaterials = props.materials.materialGroups.map((materialGroup, i) => {
			if (materialGroup.material_type === undefined) {
				return false;
			}
			return (<Materialtype group={materialGroup} key={i} />)
		});
	} else {
		basketMaterials = <p className={classes['noResult']}>No Material groups found</p>;
	}

	return (
		<AuxHoc>
			<li className={(props.materials.materialsLoaded) ? 
				[classes['basket'],classes['materials-loaded']].join(' ') : 
				classes['basket']}>
				<div className={classes['basket-section']} onClick={props.clicked}>
					<span className={iconClasses.join(' ')}></span>
					<span className={[icons['ds-icon'], icons['ds-icon--baskets']].join(' ')}></span>
					<span className={classes['basket-name']}>{props.basket.basketname}</span>
					{(props.materials.materialsIsLoading) ? <CenteredSpin /> : null}
				</div>
				{(props.materials !== null && props.materials.materialsLoaded) ?
					<div className={classes.basketMaterials}>
						<ul>
							{basketMaterials}
						</ul>
						{(props.materials.clusters != null && props.materials.clusters.length > 0) ?
							<ClustersType
								clusters={props.materials.clusters}
								basketid={props.basket.basketid}
							/>
							: null}
					</div>
					: null
				}
			</li>
		</AuxHoc>
	);
}

export default basket;