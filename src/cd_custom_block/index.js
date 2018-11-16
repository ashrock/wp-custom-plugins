import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType,
 } = wp.blocks;
const {
	InnerBlocks,
	InspectorControls,
	AlignmentToolbar
} = wp.editor;
const {
	TextControl,
	RangeControl,
	ColorPalette,
	PanelBody
 } = wp.components;

registerBlockType( 'cgb/cd-custom-block', {
	title: __( 'CD Customizable Block' ), // Block title.
	icon: 'welcome-write-blog',
	description: 'Powerful content block',
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Customizable-Block — CGB Block' ),
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
		backgroundColor : {
			type: 'string',
			default: '#ffffff'
		},
		textAlign : {
			type: 'string',
			default: 'left'
		},
		height: {
			type:'string',
		},
		width: {
			type:'string',
		},
		paddingLeft: {
			type:'number',
			default: 20,
		},
		paddingTop: {
			type:'number',
			default: 10,
		},
		paddingBottom: {
			type:'number',
			default: 10,
		},
		backgroundOpacity: {
			type:'number',
			default: 1,
		},
	},
	/** displayed on editor side */
	edit: function( props ) {
		const {
			attributes: {
				backgroundColor,
				backgroundOpacity,
				height,
				width,
				paddingTop,
				paddingBottom,
				paddingLeft,
				textAlign
			},
			setAttributes,
		} = props;

		let computedBG = 'rgba('+ hexToRgb(backgroundColor).r +','+ hexToRgb(backgroundColor).g +','+ hexToRgb(backgroundColor).b  +','+ backgroundOpacity +')';

		var divStyle = {
			backgroundColor: computedBG,
			height,
			width,
			paddingTop,
			paddingBottom,
			paddingLeft,
			paddingRight: paddingLeft,
			textAlign
		};

		if(typeof props.attributes.blockId == 'undefined')
		{
			let timestamp = new Date().getTime();
			setAttributes( {
				blockId: 'block_' + timestamp
			} );
		}

		if(typeof props.attributes.height == 'undefined')
		{
			setAttributes( {
				height: '150',
			} );
		}

		const backgroundColors = [
			{
				name: 'Puerto Rico',
				slug: 'puerto-rico',
				color: '#53c4ab'
			},
			{
				name: 'Butterfly Bush',
				slug: 'butterfly-bush',
				color: '#5151a0'
			},
			{
				name: 'White',
				slug: 'white',
				color: '#ffffff'
			}
		];

		

		return (
			<div className='customizable-block-editor' style={divStyle}>
				<InnerBlocks/>
				<InspectorControls>
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
					<PanelBody title="Padding Settings" initialOpen="true">
						<RangeControl
							label="Padding Top"
							value={ props.attributes.paddingTop }
							onChange={ ( value ) => {
								props.setAttributes({
									paddingTop : value
								});
							}}
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							label="Padding Left/Right"
							value={ props.attributes.paddingLeft }
							onChange={ ( value ) => {
								props.setAttributes({
									paddingLeft : value
								});
							}}
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							label="Padding Bottom"
							value={ props.attributes.paddingBottom }
							onChange={ ( value ) => {
								props.setAttributes({
									paddingBottom : value
								});
							}}
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>

					<PanelBody title="Alignment Settings">
						<AlignmentToolbar
							label="Overall Text Alignment"
							value={props.attributes.textAlign}
							onChange={ (alignment) => {
								props.setAttributes({
									textAlign: alignment
								});
							}}
						/>
					</PanelBody>

					<PanelBody title="Background Settings">
						<ColorPalette
							label="Background Color"
							colors={ backgroundColors }
							value={ props.attributes.backgroundColor }
							onChange={ ( color ) => {
									props.setAttributes({
										backgroundColor : color
									});
								}
							}
						/>
						<TextControl
							label="Image URL"
							value={ props.attributes.imgURL }
							onChange={ ( customUrl ) => {
								props.setAttributes({
									imgURL : customUrl
								});
							} }
						/>
						<RangeControl
							label="Background Color Opacity"
							value={ props.attributes.backgroundOpacity * 100 }
							onChange={ ( value ) => {
								props.setAttributes({
									backgroundOpacity : value/100
								});
							}}
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>
				</InspectorControls>
			</div>
		);
	},
	/** displayed to outside world */
	save: function( props ) {
		const {
			attributes: {
				backgroundColor,
				backgroundOpacity,
				height,
				width,
				paddingTop,
				paddingBottom,
				paddingLeft,
				textAlign,
			},
			setAttributes,
		} = props;
		let computedBG = 'rgba('+ hexToRgb(backgroundColor).r +','+ hexToRgb(backgroundColor).g +','+ hexToRgb(backgroundColor).b  +','+ backgroundOpacity +')';

		var divStyle = {
			backgroundColor: computedBG,
			height,
			width,
			paddingTop,
			paddingBottom,
			paddingLeft,
			paddingRight: paddingLeft,
			textAlign,
		};

		return (
			<div
				className="customizable-block"
				style={divStyle}
				title={ props.attributes.blockTitle }
				id={ props.attributes.blockId }
			>
				<InnerBlocks.Content/>
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