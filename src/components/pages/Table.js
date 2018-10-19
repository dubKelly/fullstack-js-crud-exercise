import React, { Component } from 'react';
import ReactTable from 'react-table';
import { css } from 'emotion';

import { _dark } from '../../lib/vars';

import { DOMAIN_NAME } from '../../lib/vars';
import '../../react-table-modified.css';

class Table extends Component {
	constructor(props) {
		super(props);

		this.state = {
			employees: []
		};
	}

	componentWillMount = () => {
		fetch(`${DOMAIN_NAME}/api/employees`)
			.then(response => response.json())
			.then(employees => {
				this.setState({ employees }, () => {
					this.props.getColumns(this.state.employees);
				});
			});
	};

	///////   ///////  ///   //  //////    ///////  ///////
	//    //  //       ////  //  //   //   //       //    //
	///////   /////    // // //  //    //  /////    ///////
	//  //    //       //  ////  //   //   //       //  //
	//   //   ///////  //   ///  //////    ///////  //   //

	render() {
		const { employees } = this.state;
		const pageSize = employees.length > 0 ? employees.length : 5;

		return (
			<div className={component}>
				<ReactTable
					data={employees}
					filterable
					columns={this.props.columns}
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
							className:
								employees.length > 100
									? 'showJump customPagination'
									: 'customPagination'
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
