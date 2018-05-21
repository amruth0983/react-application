import React from 'react';
import MaterialListItem from './Item';
import classes from './Materials.css';

class MaterialsList extends React.Component {

	render() {
		let materials = null;

		if (this.props.materials && this.props.materials.length > 0) {
			materials = this.props.materials.map((material, i) => {
				return (<MaterialListItem
					material={material} key={i} />);
			});
		} else {
			materials = <p className={classes['noResult']}>No Materials Found</p>
		}
		return (
			<ul className={classes['materials']}>
				{materials}
			</ul>
		);
	}
}

export default MaterialsList;