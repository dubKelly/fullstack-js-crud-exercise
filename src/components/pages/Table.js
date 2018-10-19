import React, { Component } from 'react';
import ReactTable from 'react-table';
import { css } from 'emotion';

import { DOMAIN_NAME } from '../../lib/vars';
import '../../react-table-modified.css';

class Table extends Component {
	constructor(props) {
		super(props);

		this.state = {
			employees: [],
			columns: [],
			pageSize: 7
		};
	}

	componentWillMount = () => {
		fetch(`${DOMAIN_NAME}/api/employees`)
			.then(response => response.json())
			.then(employees => {
				// let largestItem = employees[0];
				//
				// for (let i = 0; i < employees.length; i++) {
				// 	if (employees[i].length > largestItem.length) {
				// 		largestItem = employees[i];
				// 	}
				// }
				//
				// const keys = Object.keys(largestItem);

				const keys = ['name', 'profession', 'city', 'branch', 'assigned'];

				const columns = keys.map((obj, i) => {
					return {
						Header: `${keys[i].charAt(0).toUpperCase()}${keys[i].slice(1)}`,
						accessor: keys[i]
					};
				});

				const length = employees.length;
				const pageSize = !(length > 10) ? length : 10;

				this.setState({ employees, columns, pageSize });
			});
	};

	///////   ///////  ///   //  //////    ///////  ///////
	//    //  //       ////  //  //   //   //       //    //
	///////   /////    // // //  //    //  /////    ///////
	//  //    //       //  ////  //   //   //       //  //
	//   //   ///////  //   ///  //////    ///////  //   //

	render() {
		const { employees, columns, pageSize } = this.state;

		return (
			<div className={component}>
				<ReactTable
					data={employees}
					filterable
					columns={columns}
					className="-striped -highlight"
					defaultPageSize={pageSize}
				/>
			</div>
		);
	}
}

////////////////////////////////////////////////////////
////     //        //  ///  //  ///////       //     ///
///  /////////  //////  /  ///  ///////  //////  ///////
////    //////  ///////  /////  ///////     ////    ////
///////  /////  ///////  /////  ///////  //////////  ///
///     //////  ///////  /////       //       //     ///
////////////////////////////////////////////////////////

const component = css({
	position: 'relative',
	height: 'calc(100% - 60px)',
	width: 'calc(100% - 60px)',
	padding: '0 30px'
});

export default Table;
