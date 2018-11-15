/**
 * BLOCK: image-clipper
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType,
 } = wp.blocks;
const { 
	MediaUpload, 
	InspectorControls,
	BlockAlignmentToolbar
} = wp.editor;
const {
	Button,
	ResizableBox,
	IconButton,
	PanelBody
 } = wp.components;

registerBlockType( 'cgb/block-image-clipper', {
	title: __( 'CD Image Clipper Block' ), // Block title.
	icon: 'format-image',
	description: 'Allow importing and displaying of a sprite section from an image spritesheet',
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Image Clipper — CGB Block' ),
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
		height: {
			type:'number',
		},
		width: {
			type:'number',
		},
		imgTranslateX: {
			type:'number',
			default: 0
		},
		imgTranslateY: {
			type:'number',
			default: 0
		},
		blockId: {
			type: 'string',
			default: '',
		},
		blockTitle: {
			type: 'string',
			default: '',
		},
		blockColumns: {
			type: 'number',
			default: 2,
		},
		currentColor: {
			type: 'string',
			default: '#ffffff',
		},
		currentPage: {
			type: 'string',
			default: 'p21',
		},
		imgAlignment: {
			type: 'string',
			default: 'left',
		},
	},
	/** displayed on editor side */
	edit: function( props ) {
		let translateProp = 'translate('+ props.attributes.imgTranslateX +'px, '+ props.attributes.imgTranslateY +'px)';
		var divStyle = {
			transform: translateProp,
			webkitTransform: translateProp,
			MozTransform: translateProp,
		};

		const {
			attributes: {
				height,
				width
			},
			setAttributes,
			toggleSelection,
		} = props;

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
			let deltaLeft = parseInt(props.attributes.imgTranslateX - props.attributes.width);
			props.setAttributes({
				imgTranslateX: deltaLeft
			});
		}

		const onClickNextOnePixel = (foo) => {
			let deltaLeft = parseInt(props.attributes.imgTranslateX - 1);
			props.setAttributes({
				imgTranslateX: deltaLeft
			});
		}

		const onClickPrevItem = () => {
			let deltaLeft = parseInt(props.attributes.imgTranslateX + props.attributes.width);
			props.setAttributes({
				imgTranslateX: deltaLeft
			});
		}

		const onClickPrevOnePixel = () => {
			let deltaLeft = parseInt(props.attributes.imgTranslateX + 1);
			props.setAttributes({
				imgTranslateX: deltaLeft
			});
		}

		const onClickUpOnePixel = () => {
			let deltaTop = parseInt(props.attributes.imgTranslateY - 1);
			props.setAttributes({
				imgTranslateY: deltaTop
			});
		}

		const onClickDownOnePixel = () => {
			let deltaTop = parseInt(props.attributes.imgTranslateY + 1);
			props.setAttributes({
				imgTranslateY: deltaTop
			});
		}

		const colors = [
			{ name: 'red', color: '#f00' },
			{ name: 'white', color: '#fff' },
			{ name: 'blue', color: '#00f' },
		];

		const clipperContainerStyle ={
			textAlign: props.attributes.imgAlignment,
			width: '100%'
		}

		return (
			<div className='image-clipper-editor'>
				<div className="clipper_container" style={clipperContainerStyle}>
					<div className="clipper_parent">
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
									label="Move 1px Left"
								/>
							</div>
						</div>
						<div className="btn-block">
							<div className="flex-column">
								<IconButton
										onClick={ onClickUpOnePixel }
										icon="arrow-up"
										label="Move 1px Up"
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
										label="Move 1px Down"
									/>
							</div>

						</div>
						<div className="btn-block">
							<div className="flex-column">
								<IconButton
									onClick={ onClickNextItem }
									icon="controls-forward"
									label="Next Item"
								/>
								<IconButton
									onClick={ onClickPrevOnePixel }
									icon="arrow-right"
									label="Move 1px Right"
								/>
							</div>
						</div>
						{ (props.isSelected && props.attributes.imgURL)  ? (
							<MediaUpload
							onSelect={onFileSelect}
							value={1}
							render = { ({open}) =>
								<IconButton
									onClick={ open }
									icon="edit"
									label="Change Image Sprite"
								/>
							}
							/>
						) : null }
					</div>
				</div>
				<InspectorControls>
					<PanelBody title="Image Alignment">
						<BlockAlignmentToolbar
							label="Image Alignment"
							value={props.attributes.imgAlignment}
							onChange={ (alignment) => {
								props.setAttributes({
									imgAlignment: alignment
								});
							}}
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
				height,
				width,
				imgURL,
				blockId,
				blockTitle
			},
		} = props;

		let backgroundImage = "url('"+ imgURL +"')";
		let backgroundPositionX = props.attributes.imgTranslateX +'px';
		let backgroundPositionY = props.attributes.imgTranslateY +'px';

		const divStyle = {
			height,
			width,
			backgroundImage,
			backgroundPositionX,
			backgroundPositionY,
			backgroundRepeat: 'no-repeat',
			display: 'inline-block',
		};

		const imgStyle = {
			display: 'none !important'
		};

		const clipperContainerStyle ={
			textAlign: props.attributes.imgAlignment,
			width: '100%'
		}

		return (
			<div className="clipped_image_parent" style={clipperContainerStyle}>
				<div className="clipped-image" id={blockId} style={divStyle} title={blockTitle}>
					<img style={imgStyle} src={imgURL}/>
				</div>
			</div>
		);
	},
} );
