import classnames from 'classnames';
var el = wp.element.createElement;
const { data, apiFetch } = wp;
const { __ } = wp.i18n;
const { registerBlockType,
 } = wp.blocks;
const {
	InnerBlocks,
	InspectorControls,
	AlignmentToolbar
} = wp.editor;
const {
	Button,
	TextControl,
	RangeControl,
	ColorPalette,
	PanelBody
 } = wp.components;

registerBlockType( 'cgb/cd-course-schedules', {
	title: __( 'Course Schedules Block' ), // Block title.
	icon: 'welcome-write-blog',
	description: 'Load course schedules on the fly',
	category: 'formatting', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Course-Schedules — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes:{
		blockId : {
			type: 'string',
		},
		blockTitle : {
			type: 'string',
		},
		tableHeaders : {
			type: 'array',
			default: [el(`tr`,{},null)],
		},
		tableData : {
			type: 'array',
			default: [el(`tr`,{},null)],
		},
		requestUrl:{
			type:'string',
			default: '/get_course_schedule',
		}
	},
	/** displayed on editor side */
	edit: function( props ) {
		var divStyle = {};

		var schedule_obj = {
			course_id:``,
			title:``,
			location:``,
			course_dates:``,
			enrollment_deadline:``,
			stacks_taught:[],
			tuition:``,
		};

		if(typeof props.attributes.blockId == 'undefined')
		{
			let timestamp = new Date().getTime();
			props.setAttributes( {
				blockId: 'block_' + timestamp
			} );
		}

		const loadData = async (value) => {
			/** fetch data using API */
			const options = {
				method: 'post',
				headers: {
					// 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
					'user-agent': 'WP Block',
                	'content-type': 'application/json'
				},
				body: JSON.stringify({campus_id:1})
			}

			fetch(props.attributes.requestUrl, options).catch(err => {
				console.error('Request failed', err)
			}).then(res => res.json())
			.then(async (response) => {
				let tableData = [];
				let column_order = [];
				let tableHeaders = [];
				if(response.length > 0)
				{
					let reference_row = response[0];
					let thead_row_data = [];
					for(let column_name in reference_row)
					{
						column_order.push(column_name);
						thead_row_data.push( el('th', {}, column_name) );
					}
					tableHeaders.push( el('tr', {}, thead_row_data) );

					for(let res_id in response)
					{
						let active_response = response[res_id];
						let row_data = [];
						/** loop here */
						for(let col_id in column_order)
						{
							console.log(typeof active_response[ column_order[col_id] ]);
							let td_value = (typeof active_response[ column_order[col_id] ] == `object`) ? active_response[ column_order[col_id] ].join(', ') : active_response[ column_order[col_id] ];
							let td_el = el('td',{}, td_value);
							row_data.push(td_el);
						}

						let tr = el('tr', {}, row_data);
						tableData.push(tr);
					}
				}

				props.setAttributes({ tableData: tableData});
				props.setAttributes({ tableHeaders: tableHeaders});
			});

			return;
		}

		const populateHeaders = () => {
			let temp_td = [];
			let tableData = props.attributes.tableHeaders;

			for(let tri in tableData)
			{
				let row_data = [];
				let trow = tableData[tri];
				let td_items = trow.props.children;

				for(let tdi in td_items)
				{
					let td = el('th',{}, td_items[tdi].props.children);
					row_data.push(td);
				}

				let tr = el('tr', {}, row_data);
				temp_td.push( tr );
			}

			return temp_td;
		}

		const populateData = () => {
			let temp_td = [];
			let tableData = props.attributes.tableData;

			for(let tri in tableData)
			{
				let row_data = [];
				let trow = tableData[tri];
				let td_items = trow.props.children;

				for(let tdi in td_items)
				{
					let td = el('td',{}, td_items[tdi].props.children);
					row_data.push(td);
				}

				let tr = el('tr', {}, row_data);
				temp_td.push( tr );
			}

			return temp_td;
		}

		return (
			<div className='customizable-block-editor'>
				<Button onClick={loadData}>Load data</Button>
				<table><thead>{ populateHeaders() }</thead><tbody>{ populateData() }</tbody></table>
				<InspectorControls>
					<PanelBody title="Course Settings" initialOpen="true">
						<TextControl
							label="Request URL"
							value={ props.attributes.requestUrl }
							onChange={ ( requestUrl ) => {
								props.setAttributes({
									requestUrl : requestUrl
								});
							} }
						/>
					</PanelBody>
					<PanelBody title="Block Meta" initialOpen="false">
						<TextControl
							label="Block ID"
							value={ props.attributes.blockId }
							onChange={ ( customID ) => {
								props.setAttributes({
									blockId : customID
								});
							} }
						/>

						<TextControl
							label="Block Title"
							value={ props.attributes.blockTitle }
							onChange={ ( customTitle ) => {
								props.setAttributes({
									blockTitle : customTitle
								});
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</div>
		);
	},
	/** displayed to outside world */
	save: function( props ) {
		var divStyle = {};
		const populateData = () => {
			let temp_td = [];
			let tableData = props.attributes.tableData;

			for(let tdi in tableData)
			{
				temp_td.push( tableData[tdi] );
			}

			return temp_td;
		}

		const populateHeaders = () => {
			let temp_td = [];
			let tableData = props.attributes.tableHeaders;

			for(let tdi in tableData)
			{
				temp_td.push( tableData[tdi] );
			}

			return temp_td;
		}

		return (
			<div
				className="customizable-block"
				title={ props.attributes.blockTitle }
				id={ props.attributes.blockId }
			>
				<table><thead>{ populateHeaders() }</thead><tbody>{ populateData() }</tbody></table>
			</div>
		);
	},
} );

function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}
