import React, { Component } from 'react';
import { css } from 'emotion';

import { _lightGrey, _medGrey_lbg, _dark } from '../../lib/vars';

class AddEmployee extends Component {
	constructor(props) {
		super(props);

		this.state = {
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
			}
		};

		this.saveChange = this.saveChange.bind(this);
		this.getSuggestion = this.getSuggestion.bind(this);
		this.preventReturn = this.preventReturn.bind(this);
	}

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

	preventReturn(e) {
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

	///////   ///////  ///   //  //////    ///////  ///////
	//    //  //       ////  //  //   //   //       //    //
	///////   /////    // // //  //    //  /////    ///////
	//  //    //       //  ////  //   //   //       //  //
	//   //   ///////  //   ///  //////    ///////  //   //

	render() {
		const { profession, color, city, branch } = this.state;

		const colorStyles = {
			color: /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color.color)
				? color.color
				: _dark
		};

		return (
			<div className={component}>
				<form className={form} onKeyDown={this.preventReturn}>
					<div>
						<input
							type="text"
							name="name"
							placeholder="Name"
							className={input}
							onChange={this.saveChange}
						/>
					</div>
					<div>
						<input
							type="text"
							name="profession"
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
						className={`${input} ${colorInput}`}
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
						className={css`
							${input} ${code};
						`}
						placeholder="Code"
						onChange={this.saveChange}
					/>
					<input
						type="text"
						name="city"
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
				</form>
			</div>
		);
	}
}

const component = css({
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
	height: 'calc(100% - 90px)',
	width: 'calc(100% - 60px)',
	padding: '0 30px'
});

const form = css({
	padding: '30px 0'
});

const input = css({
	position: 'relative',
	border: `1px solid ${_lightGrey}`,
	borderRadius: '3px',
	boxSizing: 'border-box',
	resize: 'none',
	width: '100%',
	margin: '8px 0',
	padding: '10px 10px',
	fontSize: '14px',
	color: _dark,
	backgroundColor: 'transparent',
	outline: 'none',
	zIndex: '3'
});

const suggestion = css({
	position: 'absolute',
	color: _medGrey_lbg,
	border: '1px solid transparent',
	padding: '12px 10px',
	transform: 'translateY(-56px)',
	zIndex: '1'
});

const colorSuggestion = css({
	position: 'absolute',
	border: '1px solid transparent',
	padding: '13px 10px',
	display: 'inline-block',
	width: 'calc(66% - 4px)',
	margin: '8px 0 8px 0',
	zIndex: '1'
});

const colorInput = css({
	float: 'left',
	display: 'inline-block',
	width: 'calc(66% - 4px)',
	margin: '8px 0 8px 0'
});

const code = css({
	float: 'right',
	display: 'inline-block',
	width: 'calc(33% - 4px)',
	margin: '8px 0 8px 0'
});

export default AddEmployee;
