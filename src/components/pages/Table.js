import React from 'react';
import ReactTable from 'react-table';
import { css } from 'emotion';

import { _dark } from '../../lib/vars';

import '../../react-table-modified.css';

///////   ///////  ///   //  //////    ///////  ///////
//    //  //       ////  //  //   //   //       //    //
///////   /////    // // //  //    //  /////    ///////
//  //    //       //  ////  //   //   //       //  //
//   //   ///////  //   ///  //////    ///////  //   //

const Table = props => {
	const pageSize = props.employees.length > 0 ? props.employees.length : 5;

	return (
		<div className={component}>
			<ReactTable
				data={props.employees}
				filterable
				columns={props.columns}
				className="-striped -highlight"
				defaultPageSize={pageSize}
				getTrProps={(state, rowInfo, column) => {
					if (rowInfo) {
						let color;

						if (props.nightMode) {
							color = !props.colors ? 'white' : rowInfo.original.color;
						} else {
							color = !props.colors ? _dark : rowInfo.original.color;
						}

						return {
							style: {
								color
							}
						};
					}

					return {};
				}}
				getTableProps={(state, rowInfo, column) => {
					return {
						style: {
							color: !props.nightMode ? _dark : 'white'
						}
					};
				}}
				getPaginationProps={(state, rowInfo, column) => {
					return {
						style: {
							color: !props.nightMode ? _dark : 'white'
						},
						className:
							props.employees.length > 100
								? 'showJump customPagination'
								: 'customPagination'
					};
				}}
			/>
		</div>
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
	position: 'relative',
	height: 'calc(100% - 90px)',
	width: 'calc(100% - 60px)',
	padding: '0 30px'
});

export default Table;
