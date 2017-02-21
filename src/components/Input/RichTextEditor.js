import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Grid, GridItem } from '../../index.js';

class RichTextEditor extends Component {
    constructor(props) {
          super(props);
          this.state = {editorState: EditorState.createEmpty()};

          this.focus = () => this.focus.bind(this);
          this.onChange = (editorState) => this.setState({editorState});

          this.handleKeyCommand = (command) => this._handleKeyCommand(command);
          this.onTab = (e) => this._onTab(e);
          this.toggleBlockType = (type) => this._toggleBlockType(type);
          this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        }

        _handleKeyCommand(command) {
          const {editorState} = this.state;
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            this.onChange(newState);
            return true;
          }
          return false;
        }

        _onTab(e) {
          const maxDepth = 4;
          this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
        }

        _toggleBlockType(blockType) {
          this.onChange(
            RichUtils.toggleBlockType(
              this.state.editorState,
              blockType
            )
          );
        }

        _toggleInlineStyle(inlineStyle) {
          this.onChange(
            RichUtils.toggleInlineStyle(
              this.state.editorState,
              inlineStyle
            )
          );
        }

        focus() {
            this.textInput.focus();
        }

        render() {
          const {editorState} = this.state;

          // If the user changes block type before entering any text, we can
          // either style the placeholder or hide it. Let's just hide it now.
          let className = 'RichEditor-editor';
          var contentState = editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
          }

          return (
            <div className="RichEditor-root">
                <Grid>
                    <GridItem md="4">
                        <InlineStyleControls
                            editorState={editorState}
                            onToggle={this.toggleInlineStyle}
                        />
                    </GridItem>
                    <GridItem md="8">
                        <BlockStyleControls
                            editorState={editorState}
                            onToggle={this.toggleBlockType}
                        />
                    </GridItem>
                </Grid>


                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        placeholder={this.props.placeholder}
                        ref={(input) => { this.textInput = input; }}
                        spellCheck={true}
                    />
                </div>
            </div>
          );
        }
      }


RichTextEditor.PropTypes = {
    //className: PropTypes.string,
};

export default RichTextEditor;

// Custom overrides for "code" style.
      const styleMap = {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2,
        },
      };

      function getBlockStyle(block) {
        switch (block.getType()) {
          case 'blockquote': return 'RichEditor-blockquote';
          default: return null;
        }
      }

      class StyleButton extends Component {
        constructor() {
          super();
          this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
          };
        }

        render() {
          let className = 'button button--sm';
          if (this.props.active) {
            className += ' button--primary';
          }

          return (
            <span className={className} onMouseDown={this.onToggle} title={this.props.label}>
                {
                    this.props.icon ?
                    <span className={`icon icon-${this.props.icon}`}/>
                    :
                    <span>{this.props.label}</span>
                }
            </span>
          );
        }
      }

      const BLOCK_TYPES = [
        {label: 'Heading', style: 'header-three', icon: 'header'},
        {label: 'Blockquote', style: 'blockquote', icon: 'quote-left'},
        {label: 'UL', style: 'unordered-list-item', icon: 'list-ul'},
        {label: 'OL', style: 'ordered-list-item', icon: 'list-ol'},
      ];

      const BlockStyleControls = (props) => {
        const {editorState} = props;
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

        return (
          <div className="RichEditor-controls button-group">
            {BLOCK_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
                icon={type.icon}
              />
            )}
          </div>
        );
      };

      var INLINE_STYLES = [
        {label: 'Bold', style: 'BOLD', icon: 'bold'},
        {label: 'Italic', style: 'ITALIC', icon: 'italic'},
        {label: 'Underline', style: 'UNDERLINE', icon: 'underline'},
      ];

      const InlineStyleControls = (props) => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <div className="RichEditor-controls button-group">
            {INLINE_STYLES.map((type) =>
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
                icon={type.icon}
              />
            )}
          </div>
        );
      };
