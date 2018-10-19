import React, { Component } from 'react';
import ReactTable from 'react-table';
import { css } from 'emotion';

import { DOMAIN_NAME } from '../../lib/vars';
import 'react-table/react-table.css';

class Table extends Component {
	constructor(props) {
		super(props);

		this.state = {
			employees: [],
			columns: []
		};
	}

	componentWillMount = () => {
		fetch(`${DOMAIN_NAME}/api/employees`)
			.then(response => response.json())
			.then(employees => {
				let largestItem = employees[0];

				for (let i = 0; i < employees.length; i++) {
					if (employees[i].length > largestItem.length) {
						largestItem = employees[i];
					}
				}

				const keys = Object.keys(largestItem);
				const columns = keys.map((obj, i) => {
					return {
						Header: `${keys[i].charAt(0).toUpperCase()}${keys[i].slice(1)}`,
						accessor: keys[i]
					};
				});

				this.setState({ employees, columns });
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
			<ReactTable
				data={employees}
				columns={columns}
				className="-striped -highlight"
				defaultPageSize={10}
			/>
		);
	}
}

export default Table;
