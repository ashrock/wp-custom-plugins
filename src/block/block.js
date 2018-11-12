/**
 * BLOCK: image-clipper
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.editor;
const { Button, ResizableBox, IconButton } = wp.components;

registerBlockType( 'cgb/block-image-clipper', {
	title: __( 'Image Clipper Block' ), // Block title.
	icon: 'format-image',
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'image-clipper — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes:{
		imgURL : {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		imgAlt : {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
		},
		imgID : {
			type: 'number',
		},
		clipperHeight: {
			type:'number'
		},
		clipperWidth: {
			type:'number'
		},
		height: {
			type:'number',
		},
		width: {
			type:'number',
		},
		imgMarginLeft: {
			type:'number',
			default: 0
		},
		imgMarginTop: {
			type:'number',
			default: 0
		},
		imgStyle: {
			type: 'string',
			default: 'margin-top: 0px; margin-left: 0px;',
		},
	},
	/** displayed on editor side */
	edit: function( props ) {
		let translateProp = 'translate('+ props.attributes.imgMarginLeft +'px, '+ props.attributes.imgMarginTop +'px)';
		console.log(translateProp);
		var divStyle = {
			// marginLeft: props.attributes.imgMarginLeft,
			// marginTop: props.attributes.imgMarginTop,
			transform: translateProp,
			webkitTransform: translateProp,
			MozTransform: translateProp,
		};

		const {
			attributes: {
				height,
				width,
			},
			setAttributes,
			toggleSelection,
		} = props;

		console.log(typeof props.attributes.height)
		if(typeof props.attributes.height == 'undefined')
		{
			setAttributes( {
				height: 150,
				width: 150
			} );
		}

		const onFileSelect = (img) =>{
			props.setAttributes({
				imgURL: img.url,
				imgAlt: img.alt,
				imgID: img.id,
			});
		}

		const onClickNextItem = (foo) => {
			let deltaLeft = parseInt(props.attributes.imgMarginLeft - props.attributes.width);
			props.setAttributes({
				imgMarginLeft: deltaLeft
			});
		}

		const onClickNextOnePixel = (foo) => {
			let deltaLeft = parseInt(props.attributes.imgMarginLeft - 1);
			props.setAttributes({
				imgMarginLeft: deltaLeft
			});
		}

		const onClickPrevItem = () => {
			let deltaLeft = parseInt(props.attributes.imgMarginLeft + props.attributes.width);
			props.setAttributes({
				imgMarginLeft: deltaLeft
			});
		}

		const onClickPrevOnePixel = () => {
			let deltaLeft = parseInt(props.attributes.imgMarginLeft + 1);
			props.setAttributes({
				imgMarginLeft: deltaLeft
			});
		}

		const onClickUpOnePixel = () => {
			let deltaTop = parseInt(props.attributes.imgMarginTop - 1);
			props.setAttributes({
				imgMarginTop: deltaTop
			});
		}

		const onClickDownOnePixel = () => {
			let deltaTop = parseInt(props.attributes.imgMarginTop + 1);
			props.setAttributes({
				imgMarginTop: deltaTop
			});
		}

		return (
			<div className='image-clipper-editor'>
				<div className="btn-block">
					<div className="flex-column">
						<IconButton
							onClick={ onClickPrevItem }
							icon="controls-back"
							label="Previous Item"
						/>
						<IconButton
							onClick={ onClickNextOnePixel }
							icon="arrow-left"
							label="Move Left"
						/>
					</div>
				</div>
				<div className="btn-block">
					<div className="flex-column">
						<IconButton
								onClick={ onClickUpOnePixel }
								icon="arrow-up"
								label="Move Up"
							/>
						<ResizableBox
							className="image-clipper"
							size={{
								height,
								width,
							}}
							minHeight="20"
							minWidth="20"
							enable={ {
								top: false,
								right: true,
								bottom: true,
								left: false,
								topRight: false,
								bottomRight: true,
								bottomLeft: false,
								topLeft: false,
							} }
							onResizeStop={ ( event, direction, elt, delta ) => {
								let deltaHeight = parseInt( props.attributes.height + delta.height, 10 );
								let deltaWidth = parseInt( props.attributes.width + delta.width, 10 );
								setAttributes( {
									height: deltaHeight,
									width: deltaWidth,
								} );
								toggleSelection( true );
							} }
							onResizeStart={ () => {
								toggleSelection( false );
							} }
						>
							{
								(props.attributes.imgURL) ? (
									<div className="clipped-image" style={divStyle} >
										<img
											src={props.attributes.imgURL}
											alt={props.attributes.imgAlt}
										/>
									</div>
								) : (
									<MediaUpload
									onSelect={onFileSelect}
									value={1}
									render = { ({open}) =>
										<Button className='import-btn' onClick={open}>Import Image Sprite</Button>
									}
									/>
								)
							}
						</ResizableBox>
						<IconButton
								onClick={ onClickDownOnePixel }
								icon="arrow-down"
								label="Move Down"
							/>
					</div>

				</div>
				<div className="btn-block">
					<div className="flex-column">
						<IconButton
							onClick={ onClickNextItem }
							icon="controls-forward"
							label="More"
						/>
						<IconButton
							onClick={ onClickPrevOnePixel }
							icon="arrow-right"
							label="More"
						/>
					</div>
				</div>
			</div>
		);
	},
	/** displayed to outside world */
	save: function( props ) {
		const {
			attributes: {
				height,
				width,
				imgURL
			},
		} = props;

		let backgroundImage = "url('"+ imgURL +"')";
		let backgroundPositionX = props.attributes.imgMarginLeft +'px';
		let backgroundPositionY = props.attributes.imgMarginTop +'px';

		var divStyle = {
			height,
			width,
			backgroundImage,
			backgroundPositionX,
			backgroundPositionY,
			backgroundRepeat: 'no-repeat',
		};

		var imgStyle = {
			display: 'none !important'
		};

		return (<div className="clipped-image" style={divStyle}><img style={imgStyle} src={imgURL}/></div>);
	},
} );
