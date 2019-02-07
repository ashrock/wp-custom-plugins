/**
 * BLOCK: sample-guten-plugin
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { PanelBody, 
		RangeControl,
		ColorPalette,
		TextControl
} = wp.components;

const { RichText, 
		InspectorControls,
		AlignmentToolbar,
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
registerBlockType( 'cgb/block-sample-guten-plugin', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'CD Custom Paragraph' ), // Block title.
	icon: 'welcome-write-blog', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'sample-guten-plugin — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		content: {
			source: 'html',
			selector: 'p',
		},
		color: {
			type: 'string',
			default: '#000'
		},
		fontsize: {
			type: 'number',
			default: 18
		},

		// Set paddings for default
		paddingTop: {
			type: 'number',
			default: 0
		},
		paddingBottom: {
			type: 'number',
			default: 0
		},
		paddingLeft: {
			type: 'number',
			default: 0
		},
		paddingRight: {
			type: 'number',
			default: 0
		},

		// Set margins for default
		marginTop: {
			type: 'number',
			default: 0
		}, 
		marginBottom: {
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
		align: {
			type: 'string',
			default: 'left'
		},
		backgroundColor : {
			type: 'string',
			default: 'rgba(255,255,255,1)'
		},
		backgroundOpacity: {
			type: 'number',
			default: 100
		},
		paragraph_id: {
			type: 'string'
		}
	},

	

	edit: function( props ) {

		const Style = {
			fontSize: props.attributes.fontsize + 'px',
			color: props.attributes.color,
			paddingTop: props.attributes.paddingTop + 'px',
			paddingBottom: props.attributes.paddingBottom + 'px',
			paddingLeft: props.attributes.paddingLeft + 'px',
			paddingRight: props.attributes.paddingRight + 'px',
			marginTop: props.attributes.marginTop	 + 'px',
			marginBottom: props.attributes.marginBottom + 'px',
			marginLeft: props.attributes.marginLeft + 'px',
			marginRight: props.attributes.marginRight + 'px',
			textAlign: props.attributes.align,
			margin: props.attributes.center,
			backgroundColor: props.attributes.backgroundColor,
		}

		const colors = [ 
			{ name: 'black', color: '#000' }, 
			{ name: 'blue', color: '#00f' },
			{ name: 'transparent', color: 'rgba(255, 255, 255, 0)'}
		];	

		const empty = [];

		if(typeof props.attributes.paragraph_id == 'undefined')
		{
			let timestamp = new Date().getTime();
			props.setAttributes( {
				paragraph_id: 'paragraph_' + timestamp
			} );
		}

		return [
			(
				// Function to replace anything inside the paragraph
				<RichText
					key = {'editable'}
					tagName="p"
					className={ 'cd-custom-paragraph' }
					title={ 'Coding Dojo custom paragraph' }
					style={ Style }
					onChange = { ( newValue ) => {
						props.setAttributes({
								content: newValue
							});
						}
					 }
					value={ props.attributes.content }
				/>
			),
			(
				// Functions to modify the paragraph
				<InspectorControls>
					<PanelBody title={'Paragraph ID'}>
						<TextControl
							label={'Set Paragraph ID'}
							value={props.attributes.paragraph_id}
							onChange={ (value) => {
								props.setAttributes({
									paragraph_id: value
								});
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

					<PanelBody title='Text Alignment'>
						<AlignmentToolbar 
							value= {props.attributes.align}
							con
							onChange={ (value) => {
								props.setAttributes({
									align: value
								});
							}}
						/>
					</PanelBody>

					<PanelBody title={'Margins'}>
						<RangeControl
							label = "Margin Top"
							value ={ props.attributes.marginTop }
							onChange ={ ( value ) => {
								props.setAttributes({
									marginTop : value
								});
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
							} } 
						/>
					</PanelBody>

					<PanelBody title="Background Color">
						<ColorPalette 
							colors={ empty } 
							value={ props.attributes.backgroundColor }
							onChange={ ( color ) => {
								props.setAttributes({
									backgroundColor : 'rgba('+ hexToRgb(color).r +','+ hexToRgb(color).g +','+ hexToRgb(color).b  +','+ props.attributes.backgroundOpacity +')'
								})
							} } 
						/>

						<RangeControl
							label="Background Color Opacity"
							value={ props.attributes.backgroundOpacity * 100 }
							onChange={ ( value ) => {

								var background_color = props.attributes.backgroundColor;
								var rgb = background_color.match(/\d+/g);


								console.log(props.attributes.backgroundColor);
				
								props.setAttributes({
									backgroundOpacity : value / 100,
								});

								var setOpacity = rgb[4] = props.attributes.backgroundOpacity;

								props.setAttributes({
									backgroundColor: 'rgba('+ rgb[0] +','+ rgb[1] +','+ rgb[2] +','+ setOpacity +')'
								});
							}}
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>
				</InspectorControls>
			)
		];
	},

	save: function( props ) {
		const Style = {
			fontSize: props.attributes.fontsize + 'px',
			color: props.attributes.color,
			paddingTop: props.attributes.paddingTop + 'px',
			paddingBottom: props.attributes.paddingBottom + 'px',
			paddingLeft: props.attributes.paddingLeft + 'px',
			paddingRight: props.attributes.paddingRight + 'px',
			marginTop: props.attributes.marginTop	 + 'px',
			marginBottom: props.attributes.marginBottom + 'px',	
			marginLeft: props.attributes.marginLeft + 'px',
			marginRight: props.attributes.marginRight + 'px',
			textAlign: props.attributes.align,
			margin: props.attributes.center,
			backgroundColor: props.attributes.backgroundColor,
		}

		return (
			<RichText.Content
				tagName="p"
				id={ props.attributes.paragraph_id }
				className={ 'cd-custom-paragraph' }
				title={ 'Coding Dojo custom paragraph' }
				style={ Style }
				value={ props.attributes.content }
			/>
		)
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
