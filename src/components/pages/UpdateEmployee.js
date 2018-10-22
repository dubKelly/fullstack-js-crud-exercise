import React, { Component } from 'react';
import { css } from 'emotion';
import shortid from 'shortid';
import axios from 'axios';
import queryString from 'query-string';

import {
	_light,
	_medGrey_lbg,
	_dark,
	_shadow,
	_red,
	DOMAIN_NAME
} from '../../lib/vars';

class UpdateEmployee extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: shortid.generate(),
			name: {
				value: ''
			},
			profession: {
				value: '',
				suggestion: 'Profession'
			},
			color: {
				value: '',
				suggestion: 'Color',
				color: '#8c979a'
			},
			code: {
				value: ''
			},
			city: {
				value: '',
				suggestion: 'City'
			},
			branch: {
				value: '',
				suggestion: 'Branch'
			},
			assigned: {
				value: false
			}
		};

		this.saveChange = this.saveChange.bind(this);
		this.getSuggestion = this.getSuggestion.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.toggleAssigned = this.toggleAssigned.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deleteEmployee = this.deleteEmployee.bind(this);
	}

	componentWillMount() {
		const pathName = window.location.pathname.substring(8);
		const rowInfo = queryString.parse(pathName);
		console.log(rowInfo);

		this.setState({
			id: rowInfo.id,
			name: {
				value: rowInfo.name
			},
			profession: {
				value: rowInfo.profession,
				suggestion: rowInfo.profession
			},
			color: {
				value: rowInfo.color,
				suggestion: rowInfo.color
			},
			code: {
				value: rowInfo.code
			},
			city: {
				value: rowInfo.city,
				suggestion: rowInfo.city
			},
			branch: {
				value: rowInfo.branch,
				suggestion: rowInfo.branch
			},
			assigned: {
				value: rowInfo.assigned
			}
		});
	}

	///////////////////////////////////////////////////////////
	////     ///  ///  ///     //        ///     ///   //   ///
	///  ///  //  ///  //  /////////  /////  ///  //        ///
	///  ///////  ///  ///    //////  /////  ///  //  /  /  ///
	///  ///  //  ///  //////  /////  /////  ///  //  ////  ///
	////     ////     ///     //////  //////     ///  ////  ///
	///////////////////////////////////////////////////////////

	saveChange(e) {
		const name = e.target.getAttribute('name');
		const value = e.target.value;

		this.setState({
			[name]: {
				value
			}
		});
	}

	getSuggestion(e, props) {
		const name = e.target.getAttribute('name');
		const value = e.target.value;
		const inputLength = value.length;
		let dbValues = [];

		for (var i = 0; i < this.props.employees.length; i++) {
			dbValues.push(this.props.employees[i][name]);
		}

		const suggestion =
			inputLength === 0
				? `${name.charAt(0).toUpperCase()}${name.slice(1)}`
				: dbValues.filter(
						dbValue => dbValue.slice(0, inputLength) === value
				  )[0];

		const color = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(suggestion)
			? suggestion
			: value;

		console.log(color);

		this.setState({
			[name]: {
				value,
				suggestion,
				color
			}
		});
	}

	handleKeyDown(e) {
		const name = e.target.getAttribute('name');

		if (e.key === 'Tab' && name !== 'submit') {
			const suggestion = this.state[name].suggestion;

			if (suggestion) {
				e.target.value = suggestion;
				this.setState({
					[name]: {
						...this.state[name],
						value: suggestion
					}
				});
			}
			console.log(this.state);
		}
	}

	toggleAssigned() {
		const { assigned } = this.state;
		const value = !assigned.value;

		this.setState({ assigned: { value } });
	}

	handleSubmit(e) {
		e.preventDefault();

		const {
			id,
			name,
			profession,
			color,
			code,
			city,
			branch,
			assigned
		} = this.state;
		const employee = {
			id,
			name: name.value,
			profession: profession.value,
			color: color.value,
			code: code.value,
			city: city.value,
			branch: branch.value,
			assigned: assigned.value
		};

		this.setState({ pending: true });

		axios
			.put(`${DOMAIN_NAME}/api/employees`, employee)
			.then(res => {
				if (res.status === 200) {
					this.setState(
						{
							pending: false,
							success: true
						},
						() => {
							window.location.pathname = '/';
						}
					);
				}
			})
			.catch(err => {
				console.log(err);
				if (err.response) {
					this.setState({ pending: false });
				}
			});
	}

	deleteEmployee(e) {
		e.preventDefault();

		const employee = {
			employeeId: this.state.id
		};

		axios
			.delete(`${DOMAIN_NAME}/api/employees`, { data: employee })
			.then(res => {
				if (res.status === 200) {
					this.setState(
						{
							pending: false,
							success: true,
							id: shortid.generate()
						},
						() => {
							window.location.pathname = '/';
						}
					);
				}
			})
			.catch(err => {
				console.log(err);
				if (err.response) {
					this.setState({ pending: false });
				}
			});
	}

	render() {
		const {
			name,
			profession,
			color,
			code,
			city,
			branch,
			assigned
		} = this.state;

		const text = this.state.pending ? 'Updating...' : 'Update';

		////////////////////////////////////////////////////////
		////     //        //  ///  //  ///////       //     ///
		///  /////////  //////  /  ///  ///////  //////  ///////
		////    //////  ///////  /////  ///////     ////    ////
		///////  /////  ///////  /////  ///////  //////////  ///
		///     //////  ///////  /////       //       //     ///
		////////////////////////////////////////////////////////

		const component = css({
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'relative',
			height: 'calc(100% - 90px)',
			width: 'calc(100% - 60px)',
			padding: '0 30px',
			minHeight: '500px',
			backgroundColor: !this.props.nightMode ? 'transparent' : _dark
		});

		const form = css({
			padding: '30px 0'
		});

		const input = css({
			position: 'relative',
			border: `1px solid ${_medGrey_lbg}`,
			borderRadius: '3px',
			boxSizing: 'border-box',
			resize: 'none',
			width: '100%',
			margin: '8px 0',
			padding: '10px 10px',
			fontSize: '14px',
			color: !this.props.nightMode ? _dark : 'white',
			backgroundColor: 'transparent',
			outline: 'none',
			zIndex: '3'
		});

		const suggestion = css({
			position: 'absolute',
			color: _medGrey_lbg,
			border: '1px solid transparent',
			padding: '12px 10px',
			width: 'calc(100% - 60px)',
			maxWidth: '676px',
			transform: 'translateY(-56px)',
			zIndex: '1'
		});

		let colorStyles;

		switch (this.props.nightMode) {
			case true:
				colorStyles = {
					color: /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color.color)
						? color.color
						: 'white'
				};
				break;
			default:
				colorStyles = {
					color: /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color.color)
						? color.color
						: _dark
				};
		}

		const colorSuggestion = css({
			position: 'absolute',
			border: '1px solid transparent',
			padding: '13px 10px',
			display: 'inline-block',
			width: 'calc(66% - 44px)',
			maxWidth: '442px',
			margin: '8px 0 8px 0',
			zIndex: '1'
		});

		const colorInput = css({
			float: 'left',
			display: 'inline-block',
			width: 'calc(66% - 4px)',
			margin: '8px 0 8px 0'
		});

		const codeInput = css({
			float: 'right',
			display: 'inline-block',
			width: 'calc(33% - 4px)',
			margin: '8px 0 8px 0'
		});

		const checkGroup = css({
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
			margin: '8px 0'
		});

		const checkBox = css({
			display: 'inline-block',
			height: '16px',
			width: '16px',
			border:
				assigned.value === 'true'
					? '1px solid transparent'
					: `1px solid ${_medGrey_lbg}`,
			borderRadius: '3px',
			margin: '8px',
			backgroundColor: assigned.value === 'true' ? _light : 'transparent',
			transition: 'background-color 0.3s ease-in-out',
			cursor: 'pointer',
			':hover': {
				backgroundColor: assigned.value === 'true' ? _shadow : _medGrey_lbg
			}
		});

		const checkLabel = css({
			margin: '2px 0 0 0',
			color: _medGrey_lbg
		});

		const button = css({
			display: 'inline-block',
			borderRadius: '3px',
			width: '33%',
			margin: '16px 0',
			padding: '10px 10px',
			fontSize: '14px',
			cursor: 'pointer',
			transition: 'all 0.3s ease-in-out'
		});

		const deleteButton = css({
			color: _medGrey_lbg,
			backgroundColor: 'transparent',
			border: `1px solid ${_medGrey_lbg}`,
			':hover': {
				color: _red,
				border: `1px solid ${_red}`
			},
			':focus': {
				outline: 'none',
				color: _red,
				border: `1px solid ${_red}`
			}
		});

		const submit = css({
			float: 'right',
			border: 'none',
			color: 'white',
			backgroundColor: _light,
			':hover': {
				color: 'white',
				backgroundColor: _shadow
			},
			':focus': {
				outline: 'none',
				color: 'white',
				backgroundColor: _light
			}
		});

		///////   ///////  ///   //  //////    ///////  ///////
		//    //  //       ////  //  //   //   //       //    //
		///////   /////    // // //  //    //  /////    ///////
		//  //    //       //  ////  //   //   //       //  //
		//   //   ///////  //   ///  //////    ///////  //   //

		return (
			<div className={component}>
				<form
					className={form}
					onSubmit={this.handleSubmit}
					onKeyDown={this.handleKeyDown}
				>
					<div>
						<input
							type="text"
							name="name"
							placeholder="Name"
							defaultValue={name.value}
							className={input}
							onChange={this.saveChange}
						/>
					</div>
					<div>
						<input
							type="text"
							name="profession"
							defaultValue={profession.value}
							className={input}
							onChange={this.getSuggestion}
						/>
						<div
							className={css`
								${input} ${suggestion};
							`}
						>
							{profession.suggestion}
						</div>
					</div>

					<input
						type="text"
						name="color"
						defaultValue={color.value}
						className={css`
							${input} ${colorInput};
						`}
						onChange={this.getSuggestion}
						style={colorStyles}
					/>
					<div
						className={css`
							${input} ${colorSuggestion};
						`}
						style={colorStyles}
					>
						{color.suggestion}
					</div>
					<input
						type="text"
						name="code"
						defaultValue={code.value}
						className={css`
							${input} ${codeInput};
						`}
						placeholder="Code"
						onChange={this.saveChange}
					/>
					<input
						type="text"
						name="city"
						defaultValue={city.value}
						className={input}
						onChange={this.getSuggestion}
					/>
					<div
						className={css`
							${input} ${suggestion};
						`}
					>
						{city.suggestion}
					</div>
					<input
						type="text"
						name="branch"
						defaultValue={branch.value}
						className={input}
						onChange={this.getSuggestion}
					/>
					<div
						className={css`
							${input} ${suggestion};
						`}
					>
						{branch.suggestion}
					</div>
					<div className={checkGroup}>
						<div
							name="assigned"
							className={checkBox}
							onClick={this.toggleAssigned}
						/>
						<span className={checkLabel}>Assigned</span>
					</div>
					<button
						type="submit"
						className={css`
							${submit} ${button};
						`}
						value="Update"
					>
						{text}
					</button>
					<button
						onClick={this.deleteEmployee}
						className={css`
							${deleteButton} ${button};
						`}
						value="Delete"
					>
						Delete
					</button>
				</form>
			</div>
		);
	}
}

export default UpdateEmployee;
