import React from 'react';
import { css } from 'emotion';

///////   ///////  ///   //  //////    ///////  ///////
//    //  //       ////  //  //   //   //       //    //
///////   /////    // // //  //    //  /////    ///////
//  //    //       //  ////  //   //   //       //  //
//   //   ///////  //   ///  //////    ///////  //   //

const Colors = props => {
	return (
		<svg
			className={component}
			data-name="Layer 1"
			id="Layer_1"
			viewBox="0 0 128 128"
		>
			<g>
				<path
					d="M54.00064,77.55986a39.96983,39.96983,0,0,0,20,.005A42.43024,42.43024,0,0,0,63.99993,59.35067,42.42925,42.42925,0,0,0,54.00064,77.55986Z"
					fill="#4f5144"
				/>
				<path
					d="M45.41482,8.98437a37.158,37.158,0,0,1,54.4708,41.79691L64,61.1626,28.09584,50.794A37.17389,37.17389,0,0,1,45.41482,8.98437Z"
					fill="#c26558"
				/>
				<path
					d="M128,86.8421a37.158,37.158,0,0,1-64.0025,25.69217c-6.38857-6.67329,3.85669-28.94333,9.04785-35.33347C79.85828,68.81433,96.99,50.0684,99.8846,50.79214A37.17331,37.17331,0,0,1,128,86.8421Z"
					fill="#f0d474"
				/>
				<path
					d="M64.00766,112.52889A37.16075,37.16075,0,1,1,28.1032,50.79519L54.95593,77.19641C63.96849,91.44231,64.00766,112.52889,64.00766,112.52889Z"
					fill="#4c6e85"
				/>
				<path
					d="M63.99951,61.16309A37.15576,37.15576,0,0,0,28.10443,50.80029,37.14372,37.14372,0,0,0,54.95685,77.19312,37.0897,37.0897,0,0,1,63.99951,61.16309Z"
					fill="#956667"
				/>
				<path
					d="M54.96075,77.19751A37.10723,37.10723,0,0,0,64,112.52161,37.10768,37.10768,0,0,0,73.04053,77.202,37.10424,37.10424,0,0,1,54.96075,77.19751Z"
					fill="#6e876c"
				/>
				<path
					d="M90.842,49.68408a37.02816,37.02816,0,0,0-26.84149,11.479A37.08974,37.08974,0,0,1,73.045,77.19958,37.13693,37.13693,0,0,0,99.881,50.79688,37.22776,37.22776,0,0,0,90.842,49.68408Z"
					fill="#e18256"
				/>
			</g>
		</svg>
	);
};

////////////////////////////////////////////////////////
////     //        //  ///  //  ///////       //     ///
///  /////////  //////  /  ///  ///////  //////  ///////
////    //////  ///////  /////  ///////     ////    ////
///////  /////  ///////  /////  ///////  //////////  ///
///     //////  ///////  /////       //       //     ///
////////////////////////////////////////////////////////

const component = css({
	height: '100%',
	width: '100%',
	opacity: '0.5',
	transition: 'opacity 0.3s ease-in-out'
});

export default Colors;
