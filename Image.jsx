/**
 *	started development at 10:30pm 01-16-2017
 *	ended development at 11:20pm 01-16-2017 
 *
 */


import React from 'react';

import $ from 'jquery';
import 'jquery-ui';

export default class Image extends React.Component {
	render() {
		var tempStyle = styles.Image;

		if(typeof this.props.backgroundColor !== 'undefined') {
			tempStyle.backgroundColor = this.props.backgroundColor;
		}
		if(typeof this.props.width !== 'undefined') {
			tempStyle.width = this.props.width;
		}

		return (
			<div className={'ImageThumbnail'} style={tempStyle}>
				
			</div>
		)
	}
}


var styles = {
	Image: {
		width: '100%',
		height: 350,
		display: 'inline-block',
		position: 'relative'
	}
}
