/**
 * Block dependencies
 */
import './style.scss';
import './editor.scss';
const { __ } = wp.i18n;

const { Fragment } = wp.element;

const { registerBlockType,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	TextControl } = wp.blocks;

const { InnerBlocks } = wp.editor;

/**
 * Register example block
 */
export default registerBlockType(
    'hmsblocks/hms-layout-1',
    {
        title: __( 'HMS Layout' ),
        category: 'layout',
        icon: 'columns',
				keywords: [
					__( 'hms-layout — CGB Block' ),
				],
        attributes: {
      	},

        edit: props => {

          const { attributes: { placeholder },
                className, setAttributes, focus  } = props;

          return (
          <div className='hms-layout'>
            <InnerBlocks
            layouts={ [
              { name: 'column-1', label: 'Column 1', icon: 'columns' },
            ] }
            />

          </div>
      		);
        },
        save: props => {
          const { attributes: { className }, setAttributes } = props;
          return (
            <div className={ className }>
              <InnerBlocks.Content />
            </div>
          );
        },
    },
);
