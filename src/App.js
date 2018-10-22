import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { css } from 'emotion';
import matchSorter from 'match-sorter';
import axios from 'axios';

import { _dark, _medGrey_lbg, DOMAIN_NAME } from './lib/vars';

import Header from './components/Header';
import Table from './components/pages/Table';
import AddEmployee from './components/pages/AddEmployee';
import UpdateEmployee from './components/pages/UpdateEmployee';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			employees: [],
			columns: [],
			nightMode: false,
			expanded: false,
			colors: false,
			disabled: false
		};

		this.getColumns = this.getColumns.bind(this);
		this.toggleNightMode = this.toggleNightMode.bind(this);
		this.toggleExpanded = this.toggleExpanded.bind(this);
		this.toggleColors = this.toggleColors.bind(this);
		this.toggleDisabled = this.toggleDisabled.bind(this);
	}

	componentWillMount() {
		axios.get(`${DOMAIN_NAME}/api/employees`).then(res => {
			console.log(res);
			// let disabled = false;
			//
			// if (window.location.pathname !== '/') {
			// 	disabled = true;
			// }
			//
			// this.setState({ employees, disabled }, () => {
			// 	this.getColumns(this.state.employees);
			// });
		});
	}

	///////////////////////////////////////////////////////////
	////     ///  ///  ///     //        ///     ///   //   ///
	///  ///  //  ///  //  /////////  /////  ///  //        ///
	///  ///////  ///  ///    //////  /////  ///  //  /  /  ///
	///  ///  //  ///  //////  /////  /////  ///  //  ////  ///
	////     ////     ///     //////  //////     ///  ////  ///
	///////////////////////////////////////////////////////////

	getColumns(employees) {
		let { expanded } = this.state;
		let keys;

		if (expanded) {
			let largestItem = employees[0];

			for (let i = 0; i < employees.length; i++) {
				if (employees[i].length > largestItem.length) {
					largestItem = employees[i];
				}
			}

			keys = Object.keys(largestItem);
		} else {
			// Edit keys to change what columns are shown
			keys = ['name', 'profession', 'city', 'branch', 'assigned'];
		}

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

		this.setState({ employees, columns });
	}

	toggleNightMode() {
		let { nightMode } = this.state;
		nightMode = !nightMode;

		this.setState({ nightMode });
	}

	toggleExpanded() {
		const { disabled } = this.state;

		if (!disabled) {
			let { expanded } = this.state;
			expanded = !expanded;

			this.setState({ expanded }, () => {
				this.getColumns(this.state.employees);
			});
		}
	}

	toggleColors() {
		const { disabled } = this.state;

		if (!disabled) {
			let { colors } = this.state;
			colors = !colors;

			this.setState({ colors });
		}
	}

	toggleDisabled() {
		const disabled = !this.state.disable;
		console.log(disabled);

		this.setState({ disabled }, () => {
			console.log(this.state.disabled);
		});
	}

	render() {
		const {
			employees,
			columns,
			nightMode,
			expanded,
			colors,
			disabled
		} = this.state;

		////////////////////////////////////////////////////////
		////     //        //  ///  //  ///////       //     ///
		///  /////////  //////  /  ///  ///////  //////  ///////
		////    //////  ///////  /////  ///////     ////    ////
		///////  /////  ///////  /////  ///////  //////////  ///
		///     //////  ///////  /////       //       //     ///
		////////////////////////////////////////////////////////

		const component = css({
			height: '100vh',
			width: '100%',
			backgroundColor: !nightMode ? '' : _dark
		});

		///////   ///////  ///   //  //////    ///////  ///////
		//    //  //       ////  //  //   //   //       //    //
		///////   /////    // // //  //    //  /////    ///////
		//  //    //       //  ////  //   //   //       //  //
		//   //   ///////  //   ///  //////    ///////  //   //

		return (
			<Router>
				<div className={component}>
					<Header
						nightMode={nightMode}
						expanded={expanded}
						disabled={disabled}
						addClick={this.addClick}
						toggleNightMode={this.toggleNightMode}
						toggleExpanded={this.toggleExpanded}
						toggleColors={this.toggleColors}
					/>
					<Route
						exact
						path="/"
						render={() => (
							<Table
								getColumns={this.getColumns}
								employees={employees}
								columns={columns}
								nightMode={nightMode}
								expanded={expanded}
								colors={colors}
							/>
						)}
					/>
					<Route
						exact
						path="/add-employee"
						render={() => (
							<AddEmployee employees={employees} nightMode={nightMode} />
						)}
					/>
					<Route
						path="/update/:query"
						render={() => (
							<UpdateEmployee employees={employees} nightMode={nightMode} />
						)}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
