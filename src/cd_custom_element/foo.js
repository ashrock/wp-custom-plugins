var el = wp.element.createElement;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import apiFetch from '@wordpress/api-fetch';

const { 
	RichText, 
	BlockControls, 
	BlockFormatControls, 
	AlignmentToolbar, 
	InspectorControls } = wp.editor;
const { 
	Button, 
	Dashicon, 
	Tooltip, 
	IconButton, 
	Toolbar, 
	PanelBody, 
	ColorPalette,
	RangeControl  } = wp.components;
const { Component, 
	Fragment } = wp.element;

//standard registerBlockType init
registerBlockType( 'mycgb/cd-customizable-element', {
	title: 'CD Customizable Element', //any title you like
	icon: 'editor-textcolor', //any dashicon or svg
	category: 'common', //which category to appear under
	//schema of attributes
	attributes: {
		content: {
			type: 'string'
		},
		tagName: {
			type: 'string',
			default: 'p'
		},
		textAlign: {
			type: 'string',
			default: 'left'
		},
		color: {
			type: 'string',
			default: '#333333'
		},
		marginLeft: {
			type:'number',
			default: 20,
		},
		marginTop: {
			type:'number',
			default: 10,
		},
		marginBottom: {
			type:'number',
			default: 10,
		},
		blockItems: {
			type:'number',
			default: 0,
		},

	},

	//for adding things like a rich text editor, and controls - the editor
	edit: function( props ) {
		jQuery( async function( $ ) {
			await $.ajax( {
				url: '/get_site_constants',
				success: function ( data ) {
					/* fetched data for block settings */
					console.log(data);
					props.setAttributes({
						blockItems: data.items
					});
				},
				cache: false,
				dataType: 'json'
			} );
		} );

		const {
			attributes: {
				color,
				marginTop,
				marginBottom,
				marginLeft,
				textAlign,
				content
			},
			setAttributes,
		} = props;

		var eltyle = {
			color,
			margin : marginTop +'px '+ marginLeft +'px '+ marginBottom +'px !important',
			marginTop : marginTop +'px !important',
			marginBottom : marginBottom +'px !important',
			marginLeft: marginLeft +'px !important',
			marginRight: marginLeft +'px !important',
			textAlign,
		};

		//udpates the attribute `content` when the editor is updated,
		function onChangeContent( newContent ) {
			props.setAttributes( { content: newContent } );
		}
		//called when our custom toolbar button is pressed
		function changeElement( tagName ) {
			props.setAttributes( { tagName } );
		}

		const fontColors = [
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

		return [
			el( //the toolbar
				BlockControls,
				{
					key: 'controls',
					controls: [
						{
							icon: 'heading',
							subscript: '1',
							title: __( 'H1' ),
							onClick: () => {changeElement('h1')}
						},
						{
							icon: 'heading',
							subscript: '2',
							title: __( 'H2' ),
							onClick: () => {changeElement('h2')}
						},
					]
				}
			),
			el( //the richtext editor
				RichText,
				{
					key: 'editable',
					tagName: props.attributes.tagName,
					onChange: onChangeContent,
					value: content,
					style: eltyle
				}
			),
			(
				<InspectorControls>
					<PanelBody title="Margin Settings" initialOpen="true">
						<RangeControl
							label="Margin Top"
							value={ props.attributes.marginTop }
							onChange={ ( value ) => {
								props.setAttributes({
									marginTop : value
								});
							}}
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							label="Margin Left/Right"
							value={ props.attributes.marginLeft }
							onChange={ ( value ) => {
								props.setAttributes({
									marginLeft : value
								});
							}}
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							label="Margin Bottom"
							value={ props.attributes.marginBottom }
							onChange={ ( value ) => {
								props.setAttributes({
									marginBottom : value
								});
							}}
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>

					<PanelBody title="Alignment Settings" initialOpen="false">
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
					<PanelBody title="Color Settings" initialOpen="false">
						<ColorPalette
							label="Text Color"
							colors={ fontColors }
							value={ props.attributes.color }
							onChange={ ( color ) => {
									console.log(color);
									props.setAttributes({
										color : color
									});
								}
							}
						/>
					</PanelBody>
				</InspectorControls>
			)
		
		];
	},

	//for saving to the DB
	save: function( props ) {

		//save the content variable
		const {
			attributes: {
				color,
				marginTop,
				marginBottom,
				marginLeft,
				textAlign,
				content
			},
			setAttributes,
		} = props;

		var eltyle = {
			color,
			marginTop : marginTop +'px !important',
			marginBottom : marginBottom +'px !important',
			marginLeft: marginLeft +'px !important',
			marginRight: marginLeft +'px !important',
			textAlign,
		};

		return el( RichText.Content, {
			tagName: props.attributes.tagName,
			value: props.attributes.blockItems +' '+ content,
			style: eltyle
		} );
	},
} );
