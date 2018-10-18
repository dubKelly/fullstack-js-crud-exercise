import React from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

class App extends React.Component {
	state = {
		employees: [],
		columns: []
	};

	componentWillMount = () => {
		fetch('http://localhost:8080/api/employees')
			.then(response => response.json())
			.then(employees => {
				const keys = Object.keys(employees[0]);
				const columns = keys.map((obj, i) => {
					return {
						Header: `${keys[i].charAt(0).toUpperCase()}${keys[i].slice(1)}`,
						accessor: keys[i]
					};
				});

				this.setState({ employees, columns });
			});
	};

	render() {
		const { employees, columns } = this.state;

		console.log(this.state);

		return (
			<div className="App">
				<h1>Plexxis Employees</h1>
				<ReactTable data={employees} columns={columns} />
			</div>
		);
	}
}

export default App;
