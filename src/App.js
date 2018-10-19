import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { css } from 'emotion';
import matchSorter from 'match-sorter';

import { _dark, _medGrey_lbg } from './lib/vars';

import Header from './components/Header';
import Table from './components/pages/Table';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: [],
			nightMode: false,
			expanded: false,
			colors: false
		};

		this.getColumns = this.getColumns.bind(this);
		this.toggleNightMode = this.toggleNightMode.bind(this);
		this.toggleExpanded = this.toggleExpanded.bind(this);
		this.toggleColors = this.toggleColors.bind(this);
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
		let { expanded } = this.state;
		expanded = !expanded;

		this.setState({ expanded }, () => {
			this.getColumns(this.state.employees);
		});
	}

	toggleColors() {
		let { colors } = this.state;
		colors = !colors;

		this.setState({ colors });
	}

	render() {
		const { columns, nightMode, expanded, colors } = this.state;

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
								columns={columns}
								nightMode={nightMode}
								expanded={expanded}
								colors={colors}
							/>
						)}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
