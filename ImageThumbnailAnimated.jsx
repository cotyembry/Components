
import React from 'react';

import $ from 'jquery';
import 'jquery-ui';

import Image from './Image.jsx';


export default class ImageThumbnailAnimated extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalWidth: 0
		}
	}
	componentDidMount() {
		this.didMount = true;
		var widthTS = $('#container').width() - 14;
		this.setState({ totalWidth: widthTS });	
		
		//this will be used in the resize event to help with performance
		this.oldTotalWidth = widthTS;
		$(window.top).resize(this.resize.bind(this));


		//I need something to tell me which element to start using for the animation
		$(document.getElementsByClassName('ImageThumbnail')[0]).addClass('activeThumbnail').css({ zIndex: 1 });

		setTimeout(this.timeoutEnded.bind(this), 2000);

	}
	render() {
		// var totalWidth;
		// if(this.didMount === true) {
		// 	this.setState({ totalWidth: $('#container').innerWidth() });
		// }

		return (
			<div id="container" style={styles.container}>
				<div style={styles.movementContainer}>
					<div style={styles.ImageParent}>
						<Image backgroundColor={'yellow'} width={this.state.totalWidth} />
						<Image backgroundColor={'red'} width={this.state.totalWidth} />
						<Image backgroundColor={'orange'} width={this.state.totalWidth} />
					</div>
				</div>
			</div>
		)
	}
	resize() {
		var currentWidth = $('#container').width();
		if(this.oldTotalWidth !== currentWidth) {
			this.setState({ totalWidth: $('#container').width() - 14 });
		}
	}
	startAnimation() {
		var self = this;	//changing this to self helps me in the .animate method

		var activeThumbnail = $('.activeThumbnail')[0];
		var nextUp = $(activeThumbnail).next()[0];
		self.oldLeftOffset = 0;

		

		$('.activeThumbnail').animate({
			left: self.state.totalWidth * -1
		}, {
			duration: 2000,
			step: function() {
				//see the distance that has changed and adjust the next div in line accordingly
				var leftOffset = parseFloat($(activeThumbnail).css('left'));
				var distanceMoved = self.oldLeftOffset - leftOffset;
				if(distanceMoved.toString().search(/NaN/gi) === -1) {
					console.log(distanceMoved)
					//TODO: finish this logic. I think I have it down now to where this distanceMoved variable can be the amount added each step to the next image that would be taking the place of this .activeThumbnail element


				}
				self.oldLeftOffset = leftOffset;
			}
		})
	}
	timeoutEnded() {
		this.startAnimation();
	}
}

var stylesHelper = {
	padding: 50,
	height: 350
}

var styles = {
	container: {
		width: 'calc(100% - ' + (stylesHelper.padding * 2) + 'px)',	//*2 to account for the padding on both sides of the element
		height: stylesHelper.height,
		padding: stylesHelper.padding,
		zIndex: 100,
		overflowX: 'hidden'
	},
	movementContainer: {
		width: '100%',
		height: stylesHelper.height,
		overflow: 'hidden'
	}
}
