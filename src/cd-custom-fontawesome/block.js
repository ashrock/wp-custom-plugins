/**
 * BLOCK: cd-fontawesome
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './cd-custom-fontawesome-style.scss';
import './cd-custom-fontawesome-editor.scss';
import './jquery.js';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { InspectorControls, AlignmentToolbar } = wp.editor;
const { PanelBody, RangeControl, Button, ToggleControl, ColorPalette } = wp.components;

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
registerBlockType( 'cgb/block-cd-fontawesome', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'CD-Fontawesome' ), // Block title.
	icon: 'flag', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'cd-fontawesome — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	attributes: {
		class: {
			type: 'string',
			default: 'fab fa-font-awesome-flag'
		},
		iconSize: {
			type: 'number',
			default: 50
		},
		align: {
			type: 'string',
			default: 'left'
		},
		controls: {
			type: 'boolean',
			default: false 
		},
		color: {
			type: 'string',
		},
		display: {
			type: 'string',
		},
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
		opacity: {
			type: 'number',
			default: 100
		}
	},
	
	edit: function( props ) {
		const style = {
			fontSize: props.attributes.iconSize + 'px',
			textAlign: props.attributes.align,
			color: props.attributes.color,
			display: props.attributes.display,
			marginTop: props.attributes.marginTop + 'px',
			marginBottom: props.attributes.marginBottom + 'px',
			marginLeft: props.attributes.marginLeft + 'px',
			marginRight: props.attributes.marginRight + 'px',
			opacity: props.attributes.opacity,
		}

		var icons = require('./icons.json');

		const colors = [ 
			{ name: 'black', color: '#000' }, 
			{ name: 'blue', color: '#00f' }, 
			{ name: 'transparent', color: 'rgba(255, 255, 255, 0)'}
		];	
		
		function listIcon() {
			var el = '';
			var container = document.querySelector('.font-icon-container');

			for (var i = 0; i < icons.length; i++) {

				el +=  '<li title="'+ icons[i].IconClass.replace(/fas|fab|fa|-|far/g,'') +'" class="icon-list"><a href=javascript:void(0) class="clickable-icons"><i class="'+ icons[i].IconClass +'"></i></a></li>'
			}
			
			container.innerHTML = el;

			$('.clickable-icons').on('click', function() {
				var selected = $(this.children[0]).attr('class');

				props.setAttributes({
					class: selected
				})
			});

			displayicons();
		}

		function displayicons() {
			var $input, $filter, $ul, $li, a, i, txtValue;

			$input  = $(".icon-text-input");
			$filter = $input.val().toUpperCase();
			$ul     = $(".font-icon-container");
			$li     = $(".icon-list");

			$($input).on("keyup", function() {
				var value = $(this).val().toLowerCase();
				$(".font-icon-container li").filter(function() {
					$(this).toggle($(this).attr('title').toLowerCase().indexOf(value) > -1)
				});
			});
		}

		return [
			(
				<i className={props.attributes.class} style={style}></i>
			),

			(
				<InspectorControls>

					<PanelBody title={'Awesome Icons'} className={'awesome-icon-panel'}>
						<Button isPrimary
						onClick={ () => {
		
								listIcon();						

							$('.font-icon-container').toggleClass('appear');
							$('.icon-text-input').toggleClass('appear');
						}}
						>Show Icons</Button>
						<input className={"icon-text-input"} type={"search"} placeholder={"Search Icons"}></input>
						<ul className={"font-icon-container"}></ul>
					</PanelBody>

					<PanelBody title={'Display Block'}>
						<ToggleControl 
							help={ props.attributes.control ? 'Display Block Enabled.' : 'Display Block Disabled.' }
							checked={ props.attributes.control }
							onChange={ () => {
								props.setAttributes({
									control: !props.attributes.control
								})

								if(props.attributes.control){
									props.setAttributes({
										display: ''
									});
								}
								else if(!props.attributes.control) {
									props.setAttributes({
										display: 'block'
									})
								}
							}}
						/>
					</PanelBody>

					<PanelBody title={'Icon Color'}>
						<ColorPalette 
							label="Color"
							colors={ colors } 
							value={ props.attributes.color }
							onChange={ ( color ) => {
								props.setAttributes({
									color: color
								})
							} } 
						/>

						<RangeControl
							label = "Opacity"
							value ={ props.attributes.opacity * 100}
							onChange ={ ( value ) => {
								props.setAttributes({
									opacity: value / 100
								});
							}}
							min={ 0 }
							max={ 100 }>
						</RangeControl>
					</PanelBody>

					<PanelBody title='Text Alignment'>
						<AlignmentToolbar 
							value= {props.attributes.align}
							onChange={ (value) => {
								props.setAttributes({
									align: value
								});
							}}
						/>
					</PanelBody>

					<PanelBody title={'Icon Size'}>
						<RangeControl
							value ={ props.attributes.iconSize }
							onChange ={ ( value ) => {
								props.setAttributes({
									iconSize : value
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
				</InspectorControls>
			)
		];
	},

	save: function( props ) {
		const style = {
			fontSize: props.attributes.iconSize + 'px',
			textAlign: props.attributes.align,
			color: props.attributes.color,
			display: props.attributes.display,
			marginTop: props.attributes.marginTop + 'px',
			marginBottom: props.attributes.marginBottom + 'px',
			marginLeft: props.attributes.marginLeft + 'px',
			marginRight: props.attributes.marginRight + 'px',
			opacity: props.attributes.opacity,
		}

		return (
			<i className={props.attributes.class} style={style}></i>
		);
	},
} );
