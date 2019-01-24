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
		Toolbar,
		IconButton, 
		RangeControl,
		ColorPalette
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
		backgroundColor: {
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
			backgroundColor: props.attributes.backgroundColor
		}

		const colors = [ 
			{ name: 'black', color: '#000' }, 
			{ name: 'red', color: '#f00' }, 
			{ name: 'blue', color: '#00f' }, 
		];	

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

					<PanelBody title={'Margin Auto'}>
						<Toolbar>
							<IconButton 
							title={'Margin Auto'}
							className={'Auto-Margin'}
							icon="align-center"
							label="Auto margin"
							title={'Auto'}
							onClick={ () => {
								props.setAttributes({
									center: '0 auto'
								});
							}}/>

							<IconButton 
							title={'Remove Margin'}
							className={'Remove-Margin'}
							icon="no"
							label="Remove Margin Auto"
							title={'Remove'}
							onClick={ () => {
								props.setAttributes({
									center: ''
								});
							}}/>
						</Toolbar>
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
							colors={ colors } 
							value={ props.attributes.backgroundColor }
							onChange={ ( color ) => {
								props.setAttributes({
									backgroundColor: color
								})
							} } 
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
			backgroundColor: props.attributes.backgroundColor
		}

		return (
			<RichText.Content
				tagName="p"
				className={ 'cd-custom-paragraph' }
				title={ 'Coding Dojo custom paragraph' }
				style={ Style }
				value={ props.attributes.content }
			/>
		)
	},
} );
