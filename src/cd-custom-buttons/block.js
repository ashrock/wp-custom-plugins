/**
 * BLOCK: cd-custom-buttons
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './cd-custom-buttons-style.scss';
import './cd-custom-buttons-editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { PanelBody, 
		RangeControl, 
		ColorPalette, TextControl, ToggleControl  
} = wp.components; 
const { RichText, 
		InspectorControls, 
		AlignmentToolbar 
} = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-cd-custom-buttons', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'CD Custom Buttons' ), // Block title.
	icon: 'editor-bold', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'cd-custom-buttons — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	attributes: {
		//For the text
		align: {
			type: 'string',
			default: 'center'
		},
		content: {
			source: 'html',
			selector: '.button-text',
		},
		tagName: {
			type: 'string',
			default: 'span'
		},
		fontsize: {
			type: 'number',
			default: 16
		},
		color: {
			type: 'string',
			default: '#000'
		},
		

		//For element <a>
		backgroundColor: {
			type: 'string',
			default: 'rgba(221, 221, 221, 1)'
		},
		backgroundOpacity: {
			type: 'number',
			default: 100
		},
		borderRadiusTopRight: {
			type: 'number',
			default: 20
		},
		borderRadiusTopLeft: {
			type: 'number',
			default: 20
		},
		borderRadiusBottomRight: {
			type: 'number',
			default: 20
		},
		borderRadiusBottomLeft: {
			type: 'number',
			default: 20
		},
		borderColor: {
			type: 'string',
			default: '#FFF'
		},
		borderThickness: {
			type: 'number',
			default: 0
		},
		cursor: {
			type: 'string',
			default: 'pointer'
		},
		display: {
			type: 'string',
			default: 'block'
		},
		id: {
			type: 'string'
		},
		marginTop: {
			type: 'number',
			default: 0
		},
		marginLeft: {
			type: 'number',
			default: 0
		},
		marginRight: {
			type: 'number',
			default: 0
		},
		margin: {
			type: 'string',
		},
		marginBottom: {
			type: 'number',
			default: 0
		},
		control: {
			type: 'boolean',
			default: false
		},
		paddingTop: {
			type: 'number',
			default: 5
		},
		paddingRight: {
			type: 'number',
			default: 5
		},
		paddingBottom: {
			type: 'number',
			default: 5
		},
		paddingLeft: {
			type: 'number',
			default: 5
		},
		textDecoration: {
			type: 'string',
			default: 'none'
		},
		url: {
			type: 'string',
		},
		width: {
			type: 'number',
			default: 150
		}
	},

	edit: function( props ) {

		const btnStyle = {
			backgroundColor: props.attributes.backgroundColor,
			borderTopRightRadius: props.attributes.borderRadiusTopRight,
			borderTopLeftRadius: props.attributes.borderRadiusTopLeft,
			borderBottomRightRadius: props.attributes.borderRadiusBottomRight,
			borderBottomLeftRadius: props.attributes.borderRadiusBottomLeft,
			border: props.attributes.borderThickness +'px solid '+ props.attributes.borderColor, 
			display: props.attributes.display,
			marginTop: props.attributes.marginTop + 'px',
			marginRight: props.attributes.marginRight + 'px',
			marginBottom: props.attributes.marginBottom + 'px',
			marginLeft: props.attributes.marginLeft + 'px',
			margin: props.attributes.margin,
			paddingTop: props.attributes.paddingTop + 'px',
			paddingRight: props.attributes.paddingRight + 'px',
			paddingBottom: props.attributes.paddingBottom + 'px',
			paddingLeft: props.attributes.paddingLeft + 'px',
			textAlign: props.attributes.align,
			width: props.attributes.width,
			textDecoration: props.attributes.textDecoration
		}

		const textStyle = {
			color: props.attributes.color,
			fontSize: props.attributes.fontsize + 'px',
		}

		const colors = [ 
			{ name: 'black', color: 'rgb(0, 0, 0, 1)' }, 
			{ name: 'blue', color: 'rgba(0, 0, 255, 1)' },
			{ name: 'transparent', color: 'rgba(255, 255, 255, 0)'}
		];

		const emtpy = [];

		if(typeof props.attributes.id == 'undefined')
		{
			let timestamp = new Date().getTime();
			props.setAttributes( {
				id: 'button_' + timestamp
			} );
		}

		return [
			(
				<a style={btnStyle}>
					<RichText
						key = { 'editable' }
						tagName = {props.attributes.tagName}
						className = { 'button-text' }
						title = { 'cd-custom-buttons' }
						placeHolder = { 'Put your text here' }
						style = { textStyle }
						onChange = { ( newValue ) => {
							props.setAttributes({
									content: newValue
								});
							}
						}
						value = { props.attributes.content }
					/>
				</a>
			),
			(
				<InspectorControls>
					<PanelBody title={'Button ID'}>
						<TextControl
							label={'Set Button ID'}
							value={props.attributes.id}
							onChange={ (value) => {
								props.setAttributes({
									id: value
								});
							}} 
						/>
					</PanelBody>

					<PanelBody title={'Button URL'}>

						<TextControl 
							label={'URL'}
							value={props.attributes.url}
							onChange={ (value) => {
								props.setAttributes({
									url: value
								})
							}}
						/>
					</PanelBody>
					
					<PanelBody title={'Font Size'}>
						<RangeControl
							value ={ props.attributes.fontsize }
							onChange ={ ( value ) => {
								props.setAttributes({
									fontsize : value
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

					</PanelBody>

					<PanelBody title={'Text Alignment'}>
						<AlignmentToolbar 
							value= {props.attributes.align}
							onChange={ (value) => {
								props.setAttributes({
									align : value
								});
							}}
						/>
					</PanelBody>

					<PanelBody title={'Margin Auto'}>
						<ToggleControl 
							help={ props.attributes.control ? 'Has Margin Auto.' : 'No Margin Auto.' }
							checked={ props.attributes.control }
							onChange={ () => {
								props.setAttributes({
									control: !props.attributes.control
								})

								if(props.attributes.control){
									props.setAttributes({
										margin: ''
									})
								}
								else if(!props.attributes.control) {
									props.setAttributes({
										margin: '0 auto'
									})

									props.setAttributes({	
										marginTop: 0
									})

									props.setAttributes({
										marginRight: 0
									})

									props.setAttributes({
										marginLeft: 0
									})

									props.setAttributes({
										marginBottom: 0
									})
								}
							}}
						/>
					</PanelBody>

					<PanelBody title={'Border Radius'}>
						<RangeControl
							label = "Border Top Right"
							value ={ props.attributes.borderRadiusTopRight }
							onChange ={ ( value ) => {
								props.setAttributes({
									borderRadiusTopRight : value
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

						<RangeControl
							label = "Border Top Left"
							value ={ props.attributes.borderRadiusTopLeft }
							onChange ={ ( value ) => {
								props.setAttributes({
									borderRadiusTopLeft : value
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

						<RangeControl
							label = "Border Bottom Right"
							value ={ props.attributes.borderRadiusBottomRight }
							onChange ={ ( value ) => {
								props.setAttributes({
									borderRadiusBottomRight : value
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

						<RangeControl
							label = "Border Bottom Left"
							value ={ props.attributes.borderRadiusBottomLeft }
							onChange ={ ( value ) => {
								props.setAttributes({
									borderRadiusBottomLeft : value
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>
					</PanelBody>

					<PanelBody title={'Margins'}>
						<RangeControl
							label = "Margin Top"
							value ={ props.attributes.marginTop }
							onChange ={ ( value ) => {
								props.setAttributes({
									marginTop : value
								});

								props.setAttributes({
									margin: ''
								})

								props.setAttributes({
									control: false
								})
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

						<RangeControl
							label = "Margin Bottom"
							value ={ props.attributes.marginBottom }
							onChange ={ ( value ) => {
								props.setAttributes({
									marginBottom : value
								});

								props.setAttributes({
									margin: ''
								})

								props.setAttributes({
									control: false
								})
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

						<RangeControl
							label = "Margin Left"
							value ={ props.attributes.marginLeft }
							onChange ={ ( value ) => {
								props.setAttributes({
									marginLeft : value
								});

								props.setAttributes({
									margin: ''
								})

								props.setAttributes({
									control: false
								})
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

						<RangeControl
							label = "Margin Right"
							value ={ props.attributes.marginRight }
							onChange ={ ( value ) => {
								props.setAttributes({
									marginRight : value
								});

								props.setAttributes({
									margin: ''
								})

								props.setAttributes({
									control: false
								})
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>
					</PanelBody>

					<PanelBody title={'Paddings'}>
						<RangeControl
							label = "Padding top"
							value ={ props.attributes.paddingTop }
							onChange ={ ( value ) => {
								props.setAttributes({
									paddingTop : value
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

						<RangeControl
							label = "Padding Bottom"
							value ={ props.attributes.paddingBottom }
							onChange ={ ( value ) => {
								props.setAttributes({
									paddingBottom : value
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

						<RangeControl
							label = "Padding Left"
							value ={ props.attributes.paddingLeft }
							onChange ={ ( value ) => {
								props.setAttributes({
									paddingLeft : value
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>

						<RangeControl
							label = "Padding Right"
							value ={ props.attributes.paddingRight }
							onChange ={ ( value ) => {
								props.setAttributes({
									paddingRight : value
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>
					</PanelBody>

					<PanelBody title={'Text Color'}>
						<ColorPalette 
							label="Text Color"
							colors={ colors } 
							value={ props.attributes.color }
							onChange={ ( color ) => {
								props.setAttributes({
									color: color
								})
							}} 
						/>
					</PanelBody>

					<PanelBody title="Background Color">
						<ColorPalette 
							colors={ emtpy } 
							value={ props.attributes.backgroundColor }
							onChange={ ( color ) => {

								var convertRGB = hexToRgb(color)

								props.setAttributes({
									backgroundColor: 'rgba('+ convertRGB.r +','+ convertRGB.g +','+ convertRGB.b +')'
								})

								// console.log('rgba('+ convertRGB.r +','+ convertRGB.g +','+ convertRGB.b +')');
								console.log(color)
							}} 
						/>

						<RangeControl
							label = "Opacity"
							colors= {colors}
							value ={ props.attributes.backgroundOpacity * 100}
							onChange ={ ( value ) => {

								var background_color = props.attributes.backgroundColor;
								var rgb = background_color.match(/\d+/g);

								props.setAttributes({
									backgroundOpacity: value / 100, 
								});

								var setOpacity = rgb[4] = props.attributes.backgroundOpacity;

								props.setAttributes({
									backgroundColor: 'rgba('+ rgb[0] +','+ rgb[1] +','+ rgb[2] +','+ setOpacity +')'
								});

								console.log(rgb);
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>
					</PanelBody>

					<PanelBody title="Button Border">
						<ColorPalette 
							colors={ colors } 
							value={ props.attributes.borderColor }
							onChange={ ( color ) => {
								props.setAttributes({
									borderColor: color
								})
							}} 
						/>

						<RangeControl
							label = "Border Thickness"
							value ={ props.attributes.borderThickness }
							onChange ={ ( value ) => {
								props.setAttributes({
									borderThickness : value
								});
							}}
							min={ 0 }
							max={ 50 } />

						<RangeControl
							label = "Border Width"
							value ={ props.attributes.width }
							onChange ={ ( value ) => {
								props.setAttributes({
									width : value
								});
							}}
							min={ 0 }
							max={ 500 } />
					</PanelBody>
					
				</InspectorControls>
			)
		];
	},


	save: function( props ) {
		const btnStyle = {
			backgroundColor: props.attributes.backgroundColor,
			borderTopRightRadius: props.attributes.borderRadiusTopRight,
			borderTopLeftRadius: props.attributes.borderRadiusTopLeft,
			borderBottomRightRadius: props.attributes.borderRadiusBottomRight,
			borderBottomLeftRadius: props.attributes.borderRadiusBottomLeft,
			border: props.attributes.borderThickness +'px solid '+ props.attributes.borderColor, 
			display: props.attributes.display,
			marginTop: props.attributes.marginTop + 'px',
			marginRight: props.attributes.marginRight + 'px',
			marginBottom: props.attributes.marginBottom + 'px',
			marginLeft: props.attributes.marginLeft + 'px',
			margin: props.attributes.margin,
			paddingTop: props.attributes.paddingTop + 'px',
			paddingRight: props.attributes.paddingRight + 'px',
			paddingBottom: props.attributes.paddingBottom + 'px',
			paddingLeft: props.attributes.paddingLeft + 'px',
			textAlign: props.attributes.align,
			width: props.attributes.width,
			textDecoration: props.attributes.textDecoration
		}

		const textStyle = {
			color: props.attributes.color,
			fontSize: props.attributes.fontsize + 'px',
		}

		return (
			<a href={ props.attributes.url } id = {props.attributes.id} style = { btnStyle } >
				<RichText.Content
					className = { 'button-text' }
					tagName = {props.attributes.tagName}
					title = { 'cd-custom-buttons' }
					style = { textStyle }
					value = { props.attributes.content }
				/>
			</a>
		);
	},
} );

function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b, a) {
		return r + r + g + g + b + b;
	});
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
	} : null;
}

function rgb2hex(rgb){
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

	return (rgb && rgb.length === 4) ? "#" +
	 ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	 ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	 ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}
