import classnames from 'classnames';
var el = wp.element.createElement;
const { data, apiFetch } = wp;
const { __ } = wp.i18n;
const { registerBlockType,
 } = wp.blocks;
const {
	RichText,
	InnerBlocks,
	InspectorControls,
	AlignmentToolbar
} = wp.editor;
const {
	Button,
	TextControl,
	RangeControl,
	SelectControl,
	ColorPalette,
	PanelBody,
	TabPanel,
 } = wp.components;

registerBlockType( 'cgb/cd-itemized-block', {
	title: __( 'CD Itemized Block' ), // Block title.
	icon: 'welcome-write-blog',
	description: 'Load repeated content and give it structure',
	category: 'formatting', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'CD-Itemized-Block — CGB Block' ),
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
		postTypeValue : {
			type: 'string',
		},
		itemData : {
			type: 'array',
			default: [],
		},
		itemStructure : {
			type: 'array',
			default: [],
		},
		postTypes : {
			type: 'array',
			default: [],
		},
		requestUrl:{
			type:'string',
			default: '/get_course_schedule',
		}
	},
	/** displayed on editor side */
	edit: function( props ) {
		if(typeof props.attributes.blockId == 'undefined')
		{
			let timestamp = new Date().getTime();
			props.setAttributes( {
				blockId: 'block_' + timestamp
			} );
		}

		if(props.attributes.postTypes.length == 0)
		{
			let wp_post_types = [{
				label : 'Public Posts',
				value: null,
			}];

			fetchData('/get_wp_post', {}, (response) => {
				for(let cpt_id in response)
				{
					wp_post_types.push({
						label: response[ cpt_id ],
						value: cpt_id,
					});
				}
				props.setAttributes( { postTypes: wp_post_types } );
			});
		}

		const onSelectPostType = async ( post_type ) => {
			await fetchData('/get_wp_post', { post_type : post_type }, (post_data) => {
				let itemData = [];
				post_data.map( (wp_post, key) =>{
					let item_obj = [];
					/** create an element foreach property-value pair */
					for(let prop in wp_post)
					{
						item_obj.push(
							el( //the richtext editor
								'div',
								{
									key: 'editable',
									value: wp_post[prop],
								},
								wp_post[prop].toString()
							)
						)
					}

					itemData.push( el('div',{ className:'itemized_block', style:{border:`1px solid #000`}}, item_obj) );
				});

				props.setAttributes( { itemData: itemData } );
			});

			props.setAttributes( { postTypeValue: post_type } )
		}

		const onSelect = ( tabName ) => {
			console.log( 'Selecting tab', tabName );
		};

		const renderItems = () => {
			let itemData = [];
			for(let item_id in props.attributes.itemData)
			{
				// itemData.push( props.attributes.itemData[item_id] );
				itemData.push( el('div',{className:'itemized_block', style:{border:`1px solid #000`}}, props.attributes.itemData[item_id].props.children) );
			}

			return itemData;
		};

		return (
			<div className='customizable-block-editor'>
				{ renderItems() }
				<InspectorControls>
					<PanelBody title="API Data" initialOpen="true">
						{/** LOAD OPTIONS USING  */}
						<SelectControl
							label="Post Type"
							value={ props.attributes.postType }
							options={ props.attributes.postTypes }
							onChange={ onSelectPostType }
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
		const renderItems = () => {
			let itemData = [];
			for(let item_id in props.attributes.itemData)
			{
				// itemData.push( props.attributes.itemData[item_id] );
				itemData.push( el('div',{className:'itemized_block', style:{border:`1px solid #000`}}, props.attributes.itemData[item_id].props.children) );
			}

			return itemData;
		};
		return (
			<div
				className="customizable-block"
				title={ props.attributes.blockTitle }
				id={ props.attributes.blockId }
			>{ renderItems() }</div>
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchData(url, data, callback){
	/** fetch data using API */
	const options = {
		method: 'post',
		headers: {
			'user-agent': 'WP Block',
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(data)
	}

	fetch(url, options).catch(err => {
		console.error('Request failed', err);
	}).then(res => res.json())
	.then(async (response) => {
		callback( response );
	});
	return
}
