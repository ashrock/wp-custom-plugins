/**
 * BLOCK: cd-custom-headers
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './cd-custom-headers-style.scss';
import './cd-custom-headers-editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { PanelBody, 
	RangeControl,
	Toolbar,
	IconButton,
	ColorPalette,
	TextControl
} = wp.components;

const { RichText, 
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
} = wp.editor;

var el = wp.element.createElement;


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
registerBlockType( 'cgb/block-cd-custom-headers', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'CD Custom Headers' ), // Block title.
	icon: 'welcome-write-blog', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'cd-custom-headers — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	attributes: {
		content: {
			source: 'html',
			selector: '.cd-custom-headings'
		},
		backgroundColor : {
			type: 'string',
			default: 'rgba(255,255,255,1)'
		},
		color: {
			type: 'string',
			default: '#000'
		},
		fontsize: {
			type: 'number',
			default: 24
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

		//Text Alignment
		align: {
			type: 'string',
			default: 'left'
		},

		//Change Heading Levels
		tagName: {
			type: 'string',
			default: 'h1'
		},

		//Margin auto
		center: {
			type: 'string',
			default: ''
		},

		//Set backgroundcolor
		backgroundColor: {
			type: 'string',
			default: '#FFF'
		},

		backgroundOpacity: {
			type: 'number',
			default: 100
		},

		//Set Custom id
		id: {
			type: 'string'
		}
	},

	
	edit: function( props, classNames ) {

		const Style = {
			fontSize: props.attributes.fontsize + 'px',
			color: props.attributes.color,

			//Set style for paddings to take effect
			paddingTop: props.attributes.paddingTop + 'px',
			paddingBottom: props.attributes.paddingBottom + 'px',
			paddingLeft: props.attributes.paddingLeft + 'px',
			paddingRight: props.attributes.paddingRight + 'px',

			//Set style for margins to take effect
			marginTop: props.attributes.marginTop + 'px',
			marginBottom: props.attributes.marginBottom + 'px',
			marginLeft: props.attributes.marginLeft + 'px',
			marginRight: props.attributes.marginRight + 'px',

			//Align text
			textAlign: props.attributes.align,


			//Setbackground Colors
			backgroundColor: props.attributes.backgroundColor,
		}

		const colors = [ 
			{ name: 'black', color: '#000' },
			{ name: 'blue', color: '#00f' },
			{ name: 'transparent', color: 'rgba(255, 255, 255, 0)'}
		];	

		const empty = [];

		function changeElement(tagName, size) {
			props.setAttributes( { tagName } );
			props.setAttributes( { fontsize : size } );
		}

		if(typeof props.attributes.id == 'undefined')
		{
			let timestamp = new Date().getTime();
			props.setAttributes( {
				id: 'heading_' + timestamp
			} );
		}

		return [
			(
				// Function to replace anything inside the paragraph
				<RichText
					key = { 'editable' }
					tagName = { props.attributes.tagName }
					className = { 'cd-custom-headings' }
					title = { 'heading' }
					style = { Style }
					onChange = { ( newValue ) => {
						props.setAttributes({
								content: newValue
							});
						}
					}
					value = { props.attributes.content }
				/>
			),
		
			el(
				BlockControls,{
					key: 'controls',
					controls: [
						{
							icon: 'heading',
							subscript: '1',
							title: __( 'H1' ),
							onClick: () => {changeElement('h1', 24)}
						},
						{
							icon: 'heading',
							subscript: '2',
							title: __( 'H2' ),
							onClick: () => {changeElement('h2', 22)}
						},
					]
				}
			),

			(
				// Functions to modify the paragraph
				<InspectorControls>
					<PanelBody title={'Heading ID'}>
						<TextControl
							label={'Set Heading ID'}
							value={props.attributes.id}
							onChange={ (value) => {
								props.setAttributes({
									id: value
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

					<PanelBody title={'Heading Levels'}>
						<Toolbar>
							<IconButton 
								className={'heading-level-One'}
								icon="heading"
								label="h1"
								title={'headings'}
								onClick={ () => {changeElement('h1', 24)} }/>

							<IconButton 
								className={'heading-level-Two'}
								icon="heading"
								label="h2"
								onClick={ () => {changeElement('h2', 22)} }/>

							<IconButton 
								className={'heading-level-Three'}
								icon="heading"
								label="h3"
								onClick={ () => {changeElement('h3', 18)} }/>
							<IconButton 
								className={'heading-level-Four'}
								icon="heading"
								label="h4"
								onClick={ () => {changeElement('h4', 16)} }/>
							<IconButton 
								className={'heading-level-Five'}
								icon="heading"
								label="h5"
								onClick={ () => {changeElement('h5', 12)} }/>
							<IconButton 
								className={'heading-level-Six'}
								icon="heading"
								label="h6"
								onClick={ () => {changeElement('h6', 10)} }/>
						</Toolbar>
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
							}} 
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
							}} 
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

			//Set style for paddings to take effect
			paddingTop: props.attributes.paddingTop + 'px',
			paddingBottom: props.attributes.paddingBottom + 'px',
			paddingLeft: props.attributes.paddingLeft + 'px',
			paddingRight: props.attributes.paddingRight + 'px',

			//Set style for margins to take effect
			marginTop: props.attributes.marginTop + 'px',
			marginBottom: props.attributes.marginBottom + 'px',
			marginLeft: props.attributes.marginLeft + 'px',
			marginRight: props.attributes.marginRight + 'px',

			//Align text
			textAlign: props.attributes.align,

			//Margin 0px auto
			// margin: props.attributes.center,

			//Setbackground Colors
			backgroundColor: props.attributes.backgroundColor,
			// opacity: props.attributes.backgroundOpacity
		}

		return (
			<RichText.Content
				tagName = {props.attributes.tagName}
				id={ props.attributes.id }
				className = { 'cd-custom-headings' }
				title = { 'heading' }
				style = { Style }
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
