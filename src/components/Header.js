import React, { Component } from 'react';
import { css } from 'emotion';

import { _dark } from '../lib/vars';

import Tools from './Tools';
import Burger from './Burger';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: false
		};

		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		const menu = !this.state.menu ? 'open' : false;

		this.setState({ menu });
	}

	render() {
		////////////////////////////////////////////////////////
		////     //        //  ///  //  ///////       //     ///
		///  /////////  //////  /  ///  ///////  //////  ///////
		////    //////  ///////  /////  ///////     ////    ////
		///////  /////  ///////  /////  ///////  //////////  ///
		///     //////  ///////  /////       //       //     ///
		////////////////////////////////////////////////////////

		const breakpoints = [500, 640];

		const mq = breakpoints.map(
			bp => `@media only screen and (min-width: ${bp}px)`
		);

		const component = css({
			position: 'relative',
			height: '90px'
		});

		const h1 = css({
			position: 'absolute',
			top: '50%',
			left: '30px',
			transform: 'translateY(-50%)',
			padding: '0',
			fontSize: '18px',
			textTransform: 'uppercase',
			letterSpacing: '12px',
			color: !this.props.nightMode ? _dark : 'white',
			cursor: 'pointer',
			opacity: !this.state.menu ? '1' : '0',
			zIndex: !this.state.menu ? '3' : '-1',
			transition: 'opacity 0.3s ease-in-out',
			[mq[0]]: {
				left: '30px',
				fontSize: '24px'
			},
			[mq[1]]: {
				left: '60px',
				fontSize: '32px',
				letterSpacing: '15px'
			}
		});

		///////   ///////  ///   //  //////    ///////  ///////
		//    //  //       ////  //  //   //   //       //    //
		///////   /////    // // //  //    //  /////    ///////
		//  //    //       //  ////  //   //   //       //  //
		//   //   ///////  //   ///  //////    ///////  //   //

		return (
			<div className={component}>
				<h1 onClick={handleClick} className={h1}>
					Plexxis
				</h1>
				<Tools
					nightMode={this.props.nightMode}
					expanded={this.props.expanded}
					disabled={this.props.disabled}
					menu={this.state.menu}
					addClick={this.props.addClick}
					toggleNightMode={this.props.toggleNightMode}
					toggleExpanded={this.props.toggleExpanded}
					toggleColors={this.props.toggleColors}
				/>
				<Burger
					nightMode={this.props.nightMode}
					menu={this.state.menu}
					toggleMenu={this.toggleMenu}
				/>
			</div>
		);
	}
}

const handleClick = () => {
	// Set window.location vs Link to set state.disabled to false
	window.location.pathname = '/';
};

export default Header;
