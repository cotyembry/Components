/**
 *	Timesheet log to bill for this component:
 *		11:35pm	01-14-2017 started writing this component
 *		12:56am 01-15-2017 ended writing this component
 *
 */


import React from 'react';

import $ from 'jquery';
import 'jquery-ui';

var self;
export default class BackToTop extends React.Component {
	/*
	addPopupText() {
		var BackToTopText = $('#BackToTopText')[0];
		$(BackToTopText).fadeIn().animate(function() {
			top: -10
		}, 2000)
	}
	*/
	constructor(props) {
		super(props);

		this.state = {
			viewportWidth: 0,
			viewportHeight: 0
		}
	}
	click() {
		$('body').scrollTop(0);
	}
	componentDidMount() {
		self = this;
		var BackToTop = $('#BackToTop')[0];
		// $('#BackToTopText').css({ display: 'none' });
		$(BackToTop).hover(this.hoverIn, this.hoverOut)
		$(BackToTop).click(this.click);
		$(window.top).resize(this.resize.bind(this));
		this.resize();

	}
	componentWillMount() {
		this.setState({ viewportHeight: $(window.top).outerHeight() });
	}
	
	hoverIn() {
		$(this).css({ backgroundColor: 'rgba(0,0,0,0.5)' });
		self.startMovingPageUp();
		// self.addPopupText();
	}
	hoverOut() {
		$(this).css({ backgroundColor: 'black' });
		$('body').stop();	//stop any animations that might be going on
		// $('#BackToTopText').fadeOut();
	}
	
	render() {
		//render the background color passed in through the props; if none is given default to black
		var BackToTopStyle = styles.BackToTop;
		BackToTopStyle.backgroundColor = typeof this.props.backgroundColor !== 'undefined' ? this.props.backgroundColor : 'black';
		//set the position that the BackToTop component will be located on is going to be on
		BackToTopStyle.left = this.state.viewportWidth - 2*stylesHelper.width;
		BackToTopStyle.top = this.state.viewportHeight - 2*stylesHelper.height;
		return (
			<div>
				<div style={BackToTopStyle} id="BackToTop">
					{/*
					<div id="BackToTopText" style={styles.scrollTextStyle}>
						Back To Top
					</div>
					*/}
					<svg style={styles.svg}>
						<path style={styles.path} d="M 10 35 L 20 15 L 30 35" />
					</svg>
				</div>
			</div>
		)
	}
	resize() {
		this.setState({
			viewportWidth: $(window.top).outerWidth(),
			viewportHeight: $(window.top).outerHeight()
		});
		console.log(this.state.viewportWidth, this.state.viewportHeight)
	}
	startMovingPageUp() {
		$('body').animate({
			scrollTop: 0
		}, 2000);
	}
}

var stylesHelper = {
	width: 40,
	height: 50
}
var styles = {
	BackToTop: {
		width: stylesHelper.width,
		height: stylesHelper.height,
		cursor: 'pointer',
		position: 'fixed'
	},
	path: {
		stroke: 'white',
		strokeWidth: 4,
		fill: 'none'
	},
	scrollTextStyle: {
		position: 'absolute',
		color: 'white',
		width: 90,
		top: -4,
		left: -22		
	},
	svg: {
		width: stylesHelper.width,
		height: stylesHelper.height
	}
}

