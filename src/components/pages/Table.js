import React, { Component } from 'react';
import ReactTable from 'react-table';
import { css } from 'emotion';
import matchSorter from 'match-sorter';

import { _dark, _medGrey_lbg } from '../../lib/vars';

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
				// TODO: expand button

				// let largestItem = employees[0];
				//
				// for (let i = 0; i < employees.length; i++) {
				// 	if (employees[i].length > largestItem.length) {
				// 		largestItem = employees[i];
				// 	}
				// }
				//
				// const keys = Object.keys(largestItem);

				// Edit keys to change what columns are shown
				const keys = ['name', 'profession', 'city', 'branch', 'assigned'];

				const columns = keys.map((obj, i) => {
					if (keys[i] === 'assigned') {
						return {
							Header: `${keys[i].charAt(0).toUpperCase()}${keys[i].slice(1)}`,
							accessor: keys[i],
							Cell: ({ value }) => (value ? 'Yes' : 'No'),
							filterMethod: (filter, row) => {
								if (filter.value === 'all') {
									return true;
								}
								if (filter.value === 'true') {
									return row.assigned;
								}
								return !row.assigned;
							},
							Filter: ({ filter, onChange }) => (
								<select
									onChange={event => onChange(event.target.value)}
									value={filter ? filter.value : 'all'}
									style={{
										color: _medGrey_lbg,
										height: '100%',
										width: '100%',
										border: 'none'
									}}
								>
									<option value="all">All</option>
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>
							)
						};
					}

					return {
						Header: `${keys[i].charAt(0).toUpperCase()}${keys[i].slice(1)}`,
						accessor: keys[i],
						Filter: ({ filter, onChange }) => (
							<input
								onChange={event => onChange(event.target.value)}
								placeholder="Filter"
								value={filter ? filter.value : ''}
								style={{
									color: !this.props.nightMode ? _dark : 'white',
									borderBottom: `1px solid ${_medGrey_lbg}`
								}}
							/>
						),
						filterMethod: (filter, rows) =>
							matchSorter(rows, filter.value, { keys: [keys[i]] }),
						filterAll: true
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
					getTrProps={(state, rowInfo, column) => {
						if (rowInfo) {
							let color;

							if (this.props.nightMode) {
								color = !this.props.colors ? 'white' : rowInfo.original.color;
							} else {
								color = !this.props.colors ? _dark : rowInfo.original.color;
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
								color: !this.props.nightMode ? _dark : 'white'
							}
						};
					}}
					getPaginationProps={(state, rowInfo, column) => {
						return {
							style: {
								color: !this.props.nightMode ? _dark : 'white'
							},
							className: !this.props.nightMode
								? 'customPagination'
								: 'customPagination nightPagination'
						};
					}}
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
	height: 'calc(100% - 90px)',
	width: 'calc(100% - 60px)',
	padding: '0 30px'
});

export default Table;
