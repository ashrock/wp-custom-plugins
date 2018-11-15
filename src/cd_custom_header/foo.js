var el = wp.element.createElement;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, BlockControls, BlockFormatControls, AlignmentToolbar } = wp.editor;
const { Button, Dashicon, Tooltip, IconButton, Toolbar } = wp.components;
const { Component, Fragment } = wp.element;

//standard registerBlockType init
registerBlockType( 'my-block-plugin/block-w-insert-shortcode', {
	title: 'Block w Shortcode Button', //any title you like
	icon: 'universal-access-alt', //any dashicon or svg
	category: 'layout', //which category to appear under

	//schema of attributes
	attributes: {
		content: {
			type: 'string'
		},
		tagName: {
			type: 'string',
			default: 'p'
		}
	},

	//for adding things like a rich text editor, and controls - the editor
	edit: function( props ) {

		var content = props.attributes.content;

		//udpates the attribute `content` when the editor is updated,
		function onChangeContent( newContent ) {
			props.setAttributes( { content: newContent } );
		}
		//called when our custom toolbar button is pressed
		function onClickShortcodeButton( event ) {
			console.log("clicked insert shortcode button");
		}
		//called when our custom toolbar button is pressed
		function changeElement( tagName ) {
			props.setAttributes( { tagName } );
		}

		return [
			el( //the toolbar
				BlockControls,
				{
					key: 'controls',
					controls: [
						{
							icon: 'edit',
							title: __( 'Insert Shortcode' ),
							onClick: onClickShortcodeButton
						},
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
					value: content
				}
			),
		];
	},

	//for saving to the DB
	save: function( props ) {

		//save the content variable
		var content = props.attributes.content;
		console.log(content);

		return el( RichText.Content, {
			tagName: props.attributes.tagName,
			value: content
		} );
	},
} );
