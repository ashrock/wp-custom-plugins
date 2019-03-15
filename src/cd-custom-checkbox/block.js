/**
 * BLOCK: cd-custom-buttons
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './jquery';
import './cd-custom-checkbox-style.scss';
import './cd-custom-checkbox-editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { PanelBody, ColorPalette, DropdownMenu, RangeControl  } = wp.components; 
const { InspectorControls, AlignmentToolbar } = wp.editor;


registerBlockType( 'cgb/block-cd-custom-checkbox', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'CD Custom Checkbox' ), // Block title.
	icon: 'yes', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'cd-custom-checkbox — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	attributes: {
		type: {
			type: 'string',
			default: 'checkbox'
		},
		align: {
			type: 'string',
			default: 'center'
		},
		borderColor: {
			type: 'string',
			default: '#DDD'
		},
		borderRadius: {
			type: 'number',
			default: 0
		},
		borderThickness: {
			type: 'number',
			default: 1
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
		marginBottom: {
			type: 'number',
			default: 0
		},
		width: {
			type: 'number',
			default: 15
		},
		height: {
			type: 'number',
			default: 15
		}
	},

	edit: function( props ) {

		const colors = [ 
			{ name: 'black', color: 'rgb(0, 0, 0, 1)' }, 
			{ name: 'blue', color: 'rgba(0, 0, 255, 1)' },
			{ name: 'transparent', color: 'rgba(255, 255, 255, 0)'}
		];

		const style = {
			border: props.attributes.borderThickness +'px solid '+ props.attributes.borderColor, 
			marginTop: props.attributes.marginTop + 'px',
			marginRight: props.attributes.marginRight + 'px',
			marginBottom: props.attributes.marginBottom + 'px',
			marginLeft: props.attributes.marginLeft + 'px',
			width: props.attributes.width,
			height: props.attributes.height
		}
		
		return [
			(
				<input className={"cd_input_type_"+ props.attributes.type } style={style} type={props.attributes.type}></input>
			),
			(
				<InspectorControls>
					<PanelBody title={'Input Type'} className= {'input_control_'+props.attributes.type}>
					<span>Choose Label</span>
						<DropdownMenu
							label="Select a label"
							controls={ [
								{
									title: 'Checkbox',
									onClick: () => {
										props.setAttributes({
											type: 'checkbox'
										})

										console.log(props.attributes.type)
									}
								},
								{
									title: 'RadioButton',
									onClick: () => {
										props.setAttributes({
											type: 'radio'
										})

										console.log(props.attributes.type)
									}
								}
							] }
						/>
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
							max={ 100 } />
					</PanelBody>

					<PanelBody title="Button Border">

						<RangeControl
							label = "Checkbox Width and Height"
							value ={ props.attributes.width }
							onChange ={ ( value ) => {
								props.setAttributes({
									width : value
								});

								props.setAttributes({
									height : value
								});
							}}
							min={ 0 }
							max={ 60 } />
						<ColorPalette 
							colors={ colors } 
							value={ props.attributes.borderColor }
							onChange={ ( color ) => {
								props.setAttributes({
									borderColor: color
								})
							}} />		

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
					</PanelBody>
				</InspectorControls>
			)
		];
	},

	save: function( props ) {
		const style = {
			border: props.attributes.borderThickness +'px solid '+ props.attributes.borderColor, 
			marginTop: props.attributes.marginTop + 'px',
			marginRight: props.attributes.marginRight + 'px',
			marginBottom: props.attributes.marginBottom + 'px',
			marginLeft: props.attributes.marginLeft + 'px',
			width: props.attributes.width,
			height: props.attributes.height
		}

		return (	
			<input className={"cd_input_type_"+ props.attributes.type } style={style} type={props.attributes.type}></input>
		)
	},
} );