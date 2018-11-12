import classnames from 'classnames';

const {
	registerBlockType,
} = wp.blocks;
const {
	InspectorControls,
	InnerBlocks,
	withColors,
	getColorClassName
} = wp.editor;
const {
	PanelBody,
	withFallbackStyles,
	PanelColor,
	ColorPalette,
} = wp.components;

const {
	Component,
} = wp.element;

const {
	compose,
} = wp.compose;

const {getComputedStyle} = window;

const FallbackStyles = withFallbackStyles((node, ownProps) => {
	const {textColor, backgroundColor} = ownProps.attributes;
	const editableNode = node.querySelector('[contenteditable="true"]');
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
	return {
		fallbackBackgroundColor: backgroundColor || !computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || !computedStyles ? undefined : computedStyles.color,
	};
});

class OneColumnBlock extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		const {
			attributes,
			setAttributes,
			mergeBlocks,
			onReplace,
			className,
			backgroundColor,
			textColor,
			setBackgroundColor,
			setTextColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			fallbackFontSize,
		} = this.props;

		const {
			align,
			content,
			dropCap,
			placeholder,
		} = attributes;

		const textColors = [
			{
				name: 'Tundora',
				slug: 'tundora',
				color: '#454545'
			},
		];

		const backgroundColors = [
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
		return (
			<div
				className={classnames(className, {
					'has-background': backgroundColor.value,
					[backgroundColor.class]: backgroundColor.class,
					[textColor.class]: textColor.class,
				})}

				style={{
					backgroundColor: backgroundColor.value,
					color: textColor.value,
				}}
			>
				<InnerBlocks/>
				<InspectorControls>
					<PanelBody title={'Farbschema'}>
						<PanelColor {...{title: 'Textfarbe', colorName: textColor.name, colorValue: textColor.value, initialOpen: false }} >
							<ColorPalette
								colors={textColors}
								disableCustomColors={true}
								value={textColor.value}
								onChange={setTextColor}
							/>
						</PanelColor>

					</PanelBody>
					<PanelColor {...{title: 'Background', colorName: backgroundColor.name, colorValue: backgroundColor.value, initialOpen: false }} >
						<ColorPalette
							colors={backgroundColors}
							disableCustomColors={true}
							value={backgroundColor.value}
							onChange={setBackgroundColor}
						/>
					</PanelColor>
				</InspectorControls>
			</div>
		);
	}
}

export default registerBlockType('cgb/one-column', {
	title: 'Eine Spalte',
	icon: 'admin-post',
	category: 'layout',
	attributes: {
		backgroundColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
	},
	edit: compose([
		withColors('backgroundColor', {textColor: 'color'}),
		FallbackStyles,
	])(OneColumnBlock),
	save: props => {
		const {
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
		} = props.attributes;

		console.log(textColor);
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const className = classnames( {
			'has-background': backgroundColor || customBackgroundColor,
			[ textClass ]: textClass,
			[ backgroundClass ]: backgroundClass,
		} );
		return (
			<div className={className}>
				<InnerBlocks.Content/>
			</div>
		);
	},
});
