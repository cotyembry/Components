import React from 'react';

import $ from 'jquery';

var self;	//I will use this as an outside helper to get around the `this` conflict in the imageLoaded method

export default class Index extends React.Component {
	calculateHeightRatio() {
		var totalWidth = window.document.documentElement.clientWidth;
		/**
		 *	naturalWidth    totalWidth
		 *      ---       =    ---
		 *  naturalHeight     answer		;;	answer will come out as the totalHeight for the image as a perfect ratio respecting the width value
		 *
		 *  answer = (naturalHeight * totalWidth) / naturalWidth
		 */
		 //from here, check and see if the height of the image is too small to cover the entire height of the page
		 //if it isn't make the height big enough then double check the width
		 var heightTS = (self.naturalHeight * totalWidth) / self.naturalWidth;
		 


		 var totalHeight = window.document.documentElement.clientHeight;

		 if(totalHeight <= heightTS) {
		 	//good to go on the height, continue to set it
		 	console.log('good to go', totalHeight, '<=', heightTS);

		 	//if this passes then the width needs to pass
		 	self.calculateWidthRatio();
		 }
		 else {
		 	//if here then the image is perfect in size with the width it has that will be set
		 	//but the height of the image will be too small to cover the entire page
		 	//what Ill do is redo the calculation giving the totalHeight and instead
		 	//solving for totalWidth
		 	console.log('no go bro');

		 	//well how much does it need to increase
		 }
		
	}
	calculateWidthRatio() {

	}
	componentDidMount() {
		//here I expose the class to a global to help later on with a this conflict
		self = this;

		$(window).resize(this.resize);

		this.image = new Image();
		this.image.src = $('#image').attr('src');

		this.image.onload = this.imageLoaded;
	}
	// getWidth(newHeight, orginalWidth, originalHeight) {
	// 	if(currentHeight == 0) return newHeight;
	// 	var aspectRatio = currentWidth / currentHeight;
		
	// 	return newHeight * aspectRatio;
	// }

	//the event parameter is an onload event object
	//`this` refers to the DOM <image /> element
	imageLoaded(event) {
		// console.log('this = ', this, 'event = ', event);
		//self is a global that is set in the componentDidMount method
		self.naturalWidth = this.naturalWidth;
		self.naturalHeight = this.naturalHeight;
		//now I need to set the image to the correct scale
		console.log(self.naturalWidth, self.naturalHeight)

		//this takes the images width and the total width and converts it to a percentage (except in decimal form).
		//in decimal form I subtract 1 (which is 100%) and branch based off of this value.
		//specifically the value will tell me how much I need to scale the picture to keep a nice aspect ratio
		var scaleDifference = (this.naturalWidth / totalWidth) - 1;
		if(scaleDifference > 0) {
			//the image is bigger than the space allotted
			//todo - write code that will scale down the photo and change the scale css property
				//ill have to change things from scale to pixels (percents to pixels)
			console.log('bigger');
		}
		else if(scaleDifference == 0) {
			//set the scale to be scale(1, 1);
			//todo
			console.log('equal');
		}
		else if(scaleDifference < 0) {
			//if here then the scale of the photo needs to get larger since this came out as a negative number
				//todo - write a solution
			console.log('less');

			var totalWidth = window.document.documentElement.clientWidth;

			//	You can probably ignore the whole next comment block
			//
			// 	
			// 	//the amount of space to increase is the following line of code:
			// 	// var spaceToIncreaseAsPercentOfScreen = scaleDifference * -1 * 100;	//now it is represented as a percent
			// 	// var totalWidth = window.document.documentElement.clientWidth;
			// 	// var percentNeededAsPixels = spaceToIncreaseAsPercentOfScreen * (totalWidth / 100);	//now it is represented as pixels
			// 	// 1/totalWidth = scaleToUse_needThis / percentNeededAsPixels;
			//
			//
			// 	// console.log('here', spaceToIncreaseAsPercentOfScreen, percentNeededAsPixels)
			//
			// 	// //add the number of pixels needed to the picture
			//
			// }
			//
			// var scaleToUse = 
			//
			//
			// self.calculateHeightRatio();

			scaleDifference *= -1;

			var builtWidthScale = 1 + scaleDifference;	//now builtWidthScale should be like 1.23 or something similar to give a correct scale

			var picturesWidthInPixels = totalWidth * builtWidthScale;

			//I need to get the pictures height ratio
			var picturesHeightInPixels = (picturesWidthInPixels * this.naturalHeight) / this.naturalWidth;


			var builtHeightScale = (picturesHeightInPixels * builtWidthScale) / picturesWidthInPixels;


			$('#image').css({ transform: 'scale(' + builtWidthScale + ', ' + builtHeightScale + ');' })
		}

	}
	render() {
		return (
			<div style={styles.page}>
				<image id="image" src="../assets/fallLookingLeafWithBlurryBackground.jpg" style={styles.backgroundImage} />
			</div>
		)
	}
	resize() {
		self.calculateHeightRatio();
	}
}

var stylesHelper = {
	window: window
}
var styles = {
	page: {
		// width: 20000,
		// height: '100%'
	},
	backgroundImage: {
		width: 30,
		height: 40,
		display: 'block'
	}
	// Here is try number 2
	//
	// backgroundImage: {
	//  	// Set rules to fill background
	// 	minHeight: '100%',
	// 	minWidth: 1024,

	// 	// Set up proportionate scaling
	// 	width: '100%',
	// 	height: 'auto',

	// 	// Set up positioning
	// 	position: 'fixed',
	// 	top: 0,
	// 	left: 0	
	// }
	//-------
	// Here is try number 1
	//
	// backgroundImage: {
	// 	// width: stylesHelper.window.document.documentElement.clientWidth,
	// 	// width: '100%',
	// 	// height: '100%',
	// 	// backgroundImage: 'url("../assets/fallLookingLeafWithBlurryBackground.jpg")',
	// 	// src: '../assets/fallLookingLeafWithBlurryBackground.jpg',
	// 	backgroundRepeat: 'no-repeat',
	// 	display: 'block',
	// 	background: 'url("../assets/fallLookingLeafWithBlurryBackground.jpg")', 
	// 	  // webkitBackground-size: cover;
	// 	  // -moz-background-size: cover;
	// 	  // -o-background-size: cover;
	// 	backgroundSize: 'cover'
	// }
}
