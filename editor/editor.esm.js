import BaseComponent from 'primevue/basecomponent';
import { DomHandler } from 'primevue/utils';
import { openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, normalizeProps, guardReactiveProps } from 'vue';

const QuillJS = (function () {
    try {
        return window.Quill;
    } catch {
        return null;
    }
})();

var script = {
    name: 'Editor',
    extends: BaseComponent,
    emits: ['update:modelValue', 'text-change', 'selection-change', 'load'],
    props: {
        modelValue: String,
        placeholder: String,
        readonly: Boolean,
        formats: Array,
        editorStyle: null,
        modules: null
    },
    data() {
        return {
            reRenderColorKey: 0
        };
    },
    quill: null,
    watch: {
        modelValue(newValue, oldValue) {
            if (newValue !== oldValue && this.quill && !this.quill.hasFocus()) {
                this.reRenderColorKey++;
                this.renderValue(newValue);
            }
        }
    },
    mounted() {
        const configuration = {
            modules: {
                toolbar: this.$refs.toolbarElement,
                ...this.modules
            },
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            placeholder: this.placeholder
        };

        if (QuillJS) {
            // Loaded by script only
            this.quill = new QuillJS(this.$refs.editorElement, configuration);
            this.initQuill();
            this.handleLoad();
        } else {
            import('quill')
                .then((module) => {
                    if (module && DomHandler.isExist(this.$refs.editorElement)) {
                        if (module.default) {
                            // webpack
                            this.quill = new module.default(this.$refs.editorElement, configuration);
                        } else {
                            // parceljs
                            this.quill = new module(this.$refs.editorElement, configuration);
                        }

                        this.initQuill();
                    }
                })
                .then(() => {
                    this.handleLoad();
                });
        }
    },
    beforeUnmount() {
        this.quill = null;
    },
    methods: {
        renderValue(value) {
            if (this.quill) {
                if (value) this.quill.setContents(this.quill.clipboard.convert(value));
                else this.quill.setText('');
            }
        },
        initQuill() {
            this.renderValue(this.modelValue);

            this.quill.on('text-change', (delta, oldContents, source) => {
                if (source === 'user') {
                    let html = this.$refs.editorElement.children[0].innerHTML;
                    let text = this.quill.getText().trim();

                    if (html === '<p><br></p>') {
                        html = '';
                    }

                    this.$emit('update:modelValue', html);
                    this.$emit('text-change', {
                        htmlValue: html,
                        textValue: text,
                        delta: delta,
                        source: source,
                        instance: this.quill
                    });
                }
            });

            this.quill.on('selection-change', (range, oldRange, source) => {
                let html = this.$refs.editorElement.children[0].innerHTML;
                let text = this.quill.getText().trim();

                this.$emit('selection-change', {
                    htmlValue: html,
                    textValue: text,
                    range: range,
                    oldRange: oldRange,
                    source: source,
                    instance: this.quill
                });
            });
        },
        handleLoad() {
            if (this.quill && this.quill.getModule('toolbar')) {
                this.$emit('load', { instance: this.quill });
            }
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({ class: "p-editor-container" }, _ctx.ptm('root')), [
    createElementVNode("div", mergeProps({
      ref: "toolbarElement",
      class: "p-editor-toolbar"
    }, _ctx.ptm('toolbar')), [
      renderSlot(_ctx.$slots, "toolbar", {}, () => [
        createElementVNode("span", mergeProps({ class: "ql-formats" }, _ctx.ptm('formats')), [
          createElementVNode("select", mergeProps({
            class: "ql-header",
            defaultValue: "0"
          }, _ctx.ptm('select')), [
            createElementVNode("option", mergeProps({ value: "1" }, _ctx.ptm('option')), "Heading", 16),
            createElementVNode("option", mergeProps({ value: "2" }, _ctx.ptm('option')), "Subheading", 16),
            createElementVNode("option", mergeProps({ value: "0" }, _ctx.ptm('option')), "Normal", 16)
          ], 16),
          createElementVNode("select", mergeProps({ class: "ql-font" }, _ctx.ptm('select')), [
            createElementVNode("option", normalizeProps(guardReactiveProps(_ctx.ptm('option'))), null, 16),
            createElementVNode("option", mergeProps({ value: "serif" }, _ctx.ptm('option')), null, 16),
            createElementVNode("option", mergeProps({ value: "monospace" }, _ctx.ptm('option')), null, 16)
          ], 16)
        ], 16),
        createElementVNode("span", mergeProps({ class: "ql-formats" }, _ctx.ptm('formats')), [
          createElementVNode("button", mergeProps({
            class: "ql-bold",
            type: "button"
          }, _ctx.ptm('button')), null, 16),
          createElementVNode("button", mergeProps({
            class: "ql-italic",
            type: "button"
          }, _ctx.ptm('button')), null, 16),
          createElementVNode("button", mergeProps({
            class: "ql-underline",
            type: "button"
          }, _ctx.ptm('button')), null, 16)
        ], 16),
        (openBlock(), createElementBlock("span", mergeProps({
          key: $data.reRenderColorKey,
          class: "ql-formats"
        }, _ctx.ptm('formats')), [
          createElementVNode("select", mergeProps({ class: "ql-color" }, _ctx.ptm('select')), null, 16),
          createElementVNode("select", mergeProps({ class: "ql-background" }, _ctx.ptm('select')), null, 16)
        ], 16)),
        createElementVNode("span", mergeProps({ class: "ql-formats" }, _ctx.ptm('formats')), [
          createElementVNode("button", mergeProps({
            class: "ql-list",
            value: "ordered",
            type: "button"
          }, _ctx.ptm('button')), null, 16),
          createElementVNode("button", mergeProps({
            class: "ql-list",
            value: "bullet",
            type: "button"
          }, _ctx.ptm('button')), null, 16),
          createElementVNode("select", mergeProps({ class: "ql-align" }, _ctx.ptm('select')), [
            createElementVNode("option", mergeProps({ defaultValue: "" }, _ctx.ptm('option')), null, 16),
            createElementVNode("option", mergeProps({ value: "center" }, _ctx.ptm('option')), null, 16),
            createElementVNode("option", mergeProps({ value: "right" }, _ctx.ptm('option')), null, 16),
            createElementVNode("option", mergeProps({ value: "justify" }, _ctx.ptm('option')), null, 16)
          ], 16)
        ], 16),
        createElementVNode("span", mergeProps({ class: "ql-formats" }, _ctx.ptm('formats')), [
          createElementVNode("button", mergeProps({
            class: "ql-link",
            type: "button"
          }, _ctx.ptm('button')), null, 16),
          createElementVNode("button", mergeProps({
            class: "ql-image",
            type: "button"
          }, _ctx.ptm('button')), null, 16),
          createElementVNode("button", mergeProps({
            class: "ql-code-block",
            type: "button"
          }, _ctx.ptm('button')), null, 16)
        ], 16),
        createElementVNode("span", mergeProps({ class: "ql-formats" }, _ctx.ptm('formats')), [
          createElementVNode("button", mergeProps({
            class: "ql-clean",
            type: "button"
          }, _ctx.ptm('button')), null, 16)
        ], 16)
      ])
    ], 16),
    createElementVNode("div", mergeProps({
      ref: "editorElement",
      class: "p-editor-content",
      style: $props.editorStyle
    }, _ctx.ptm('content')), null, 16)
  ], 16))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\r\n/*!\r\n * Quill Editor v1.3.3\r\n * https://quilljs.com/\r\n * Copyright (c) 2014, Jason Chen\r\n * Copyright (c) 2013, salesforce.com\r\n */\n.ql-container {\r\n    box-sizing: border-box;\r\n    font-family: Helvetica, Arial, sans-serif;\r\n    font-size: 13px;\r\n    height: 100%;\r\n    margin: 0px;\r\n    position: relative;\n}\n.ql-container.ql-disabled .ql-tooltip {\r\n    visibility: hidden;\n}\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\r\n    pointer-events: none;\n}\n.ql-clipboard {\r\n    left: -100000px;\r\n    height: 1px;\r\n    overflow-y: hidden;\r\n    position: absolute;\r\n    top: 50%;\n}\n.ql-clipboard p {\r\n    margin: 0;\r\n    padding: 0;\n}\n.ql-editor {\r\n    box-sizing: border-box;\r\n    line-height: 1.42;\r\n    height: 100%;\r\n    outline: none;\r\n    overflow-y: auto;\r\n    padding: 12px 15px;\r\n    tab-size: 4;\r\n    -moz-tab-size: 4;\r\n    text-align: left;\r\n    white-space: pre-wrap;\r\n    word-wrap: break-word;\n}\n.ql-editor > * {\r\n    cursor: text;\n}\n.ql-editor p,\r\n.ql-editor ol,\r\n.ql-editor ul,\r\n.ql-editor pre,\r\n.ql-editor blockquote,\r\n.ql-editor h1,\r\n.ql-editor h2,\r\n.ql-editor h3,\r\n.ql-editor h4,\r\n.ql-editor h5,\r\n.ql-editor h6 {\r\n    margin: 0;\r\n    padding: 0;\r\n    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol,\r\n.ql-editor ul {\r\n    padding-left: 1.5rem;\n}\n.ql-editor ol > li,\r\n.ql-editor ul > li {\r\n    list-style-type: none;\n}\n.ql-editor ul > li::before {\r\n    content: '\\2022';\n}\n.ql-editor ul[data-checked='true'],\r\n.ql-editor ul[data-checked='false'] {\r\n    pointer-events: none;\n}\n.ql-editor ul[data-checked='true'] > li *,\r\n.ql-editor ul[data-checked='false'] > li * {\r\n    pointer-events: all;\n}\n.ql-editor ul[data-checked='true'] > li::before,\r\n.ql-editor ul[data-checked='false'] > li::before {\r\n    color: #777;\r\n    cursor: pointer;\r\n    pointer-events: all;\n}\n.ql-editor ul[data-checked='true'] > li::before {\r\n    content: '\\2611';\n}\n.ql-editor ul[data-checked='false'] > li::before {\r\n    content: '\\2610';\n}\n.ql-editor li::before {\r\n    display: inline-block;\r\n    white-space: nowrap;\r\n    width: 1.2rem;\n}\n.ql-editor li:not(.ql-direction-rtl)::before {\r\n    margin-left: -1.5rem;\r\n    margin-right: 0.3rem;\r\n    text-align: right;\n}\n.ql-editor li.ql-direction-rtl::before {\r\n    margin-left: 0.3rem;\r\n    margin-right: -1.5rem;\n}\n.ql-editor ol li:not(.ql-direction-rtl),\r\n.ql-editor ul li:not(.ql-direction-rtl) {\r\n    padding-left: 1.5rem;\n}\n.ql-editor ol li.ql-direction-rtl,\r\n.ql-editor ul li.ql-direction-rtl {\r\n    padding-right: 1.5rem;\n}\n.ql-editor ol li {\r\n    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\r\n    counter-increment: list-0;\n}\n.ql-editor ol li:before {\r\n    content: counter(list-0, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\r\n    counter-increment: list-1;\n}\n.ql-editor ol li.ql-indent-1:before {\r\n    content: counter(list-1, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\r\n    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-2 {\r\n    counter-increment: list-2;\n}\n.ql-editor ol li.ql-indent-2:before {\r\n    content: counter(list-2, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-2 {\r\n    counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-3 {\r\n    counter-increment: list-3;\n}\n.ql-editor ol li.ql-indent-3:before {\r\n    content: counter(list-3, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-3 {\r\n    counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-4 {\r\n    counter-increment: list-4;\n}\n.ql-editor ol li.ql-indent-4:before {\r\n    content: counter(list-4, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-4 {\r\n    counter-reset: list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-5 {\r\n    counter-increment: list-5;\n}\n.ql-editor ol li.ql-indent-5:before {\r\n    content: counter(list-5, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-5 {\r\n    counter-reset: list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-6 {\r\n    counter-increment: list-6;\n}\n.ql-editor ol li.ql-indent-6:before {\r\n    content: counter(list-6, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-6 {\r\n    counter-reset: list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-7 {\r\n    counter-increment: list-7;\n}\n.ql-editor ol li.ql-indent-7:before {\r\n    content: counter(list-7, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-7 {\r\n    counter-reset: list-8 list-9;\n}\n.ql-editor ol li.ql-indent-8 {\r\n    counter-increment: list-8;\n}\n.ql-editor ol li.ql-indent-8:before {\r\n    content: counter(list-8, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-8 {\r\n    counter-reset: list-9;\n}\n.ql-editor ol li.ql-indent-9 {\r\n    counter-increment: list-9;\n}\n.ql-editor ol li.ql-indent-9:before {\r\n    content: counter(list-9, decimal) '. ';\n}\n.ql-editor .ql-indent-1:not(.ql-direction-rtl) {\r\n    padding-left: 3rem;\n}\n.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\r\n    padding-left: 4.5rem;\n}\n.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\r\n    padding-right: 3rem;\n}\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\r\n    padding-right: 4.5rem;\n}\n.ql-editor .ql-indent-2:not(.ql-direction-rtl) {\r\n    padding-left: 6rem;\n}\n.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\r\n    padding-left: 7.5rem;\n}\n.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\r\n    padding-right: 6rem;\n}\n.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\r\n    padding-right: 7.5rem;\n}\n.ql-editor .ql-indent-3:not(.ql-direction-rtl) {\r\n    padding-left: 9rem;\n}\n.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\r\n    padding-left: 10.5rem;\n}\n.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\r\n    padding-right: 9rem;\n}\n.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\r\n    padding-right: 10.5rem;\n}\n.ql-editor .ql-indent-4:not(.ql-direction-rtl) {\r\n    padding-left: 12rem;\n}\n.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\r\n    padding-left: 13.5rem;\n}\n.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\r\n    padding-right: 12rem;\n}\n.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\r\n    padding-right: 13.5rem;\n}\n.ql-editor .ql-indent-5:not(.ql-direction-rtl) {\r\n    padding-left: 15rem;\n}\n.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\r\n    padding-left: 16.5rem;\n}\n.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\r\n    padding-right: 15rem;\n}\n.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\r\n    padding-right: 16.5rem;\n}\n.ql-editor .ql-indent-6:not(.ql-direction-rtl) {\r\n    padding-left: 18rem;\n}\n.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\r\n    padding-left: 19.5rem;\n}\n.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\r\n    padding-right: 18rem;\n}\n.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\r\n    padding-right: 19.5rem;\n}\n.ql-editor .ql-indent-7:not(.ql-direction-rtl) {\r\n    padding-left: 21rem;\n}\n.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\r\n    padding-left: 22.5rem;\n}\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\r\n    padding-right: 21rem;\n}\n.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\r\n    padding-right: 22.5rem;\n}\n.ql-editor .ql-indent-8:not(.ql-direction-rtl) {\r\n    padding-left: 24rem;\n}\n.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\r\n    padding-left: 25.5rem;\n}\n.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\r\n    padding-right: 24rem;\n}\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\r\n    padding-right: 25.5rem;\n}\n.ql-editor .ql-indent-9:not(.ql-direction-rtl) {\r\n    padding-left: 27rem;\n}\n.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\r\n    padding-left: 28.5rem;\n}\n.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\r\n    padding-right: 27rem;\n}\n.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\r\n    padding-right: 28.5rem;\n}\n.ql-editor .ql-video {\r\n    display: block;\r\n    max-width: 100%;\n}\n.ql-editor .ql-video.ql-align-center {\r\n    margin: 0 auto;\n}\n.ql-editor .ql-video.ql-align-right {\r\n    margin: 0 0 0 auto;\n}\n.ql-editor .ql-bg-black {\r\n    background-color: #000;\n}\n.ql-editor .ql-bg-red {\r\n    background-color: #e60000;\n}\n.ql-editor .ql-bg-orange {\r\n    background-color: #f90;\n}\n.ql-editor .ql-bg-yellow {\r\n    background-color: #ff0;\n}\n.ql-editor .ql-bg-green {\r\n    background-color: #008a00;\n}\n.ql-editor .ql-bg-blue {\r\n    background-color: #06c;\n}\n.ql-editor .ql-bg-purple {\r\n    background-color: #93f;\n}\n.ql-editor .ql-color-white {\r\n    color: #fff;\n}\n.ql-editor .ql-color-red {\r\n    color: #e60000;\n}\n.ql-editor .ql-color-orange {\r\n    color: #f90;\n}\n.ql-editor .ql-color-yellow {\r\n    color: #ff0;\n}\n.ql-editor .ql-color-green {\r\n    color: #008a00;\n}\n.ql-editor .ql-color-blue {\r\n    color: #06c;\n}\n.ql-editor .ql-color-purple {\r\n    color: #93f;\n}\n.ql-editor .ql-font-serif {\r\n    font-family: Georgia, Times New Roman, serif;\n}\n.ql-editor .ql-font-monospace {\r\n    font-family: Monaco, Courier New, monospace;\n}\n.ql-editor .ql-size-small {\r\n    font-size: 0.75rem;\n}\n.ql-editor .ql-size-large {\r\n    font-size: 1.5rem;\n}\n.ql-editor .ql-size-huge {\r\n    font-size: 2.5rem;\n}\n.ql-editor .ql-direction-rtl {\r\n    direction: rtl;\r\n    text-align: inherit;\n}\n.ql-editor .ql-align-center {\r\n    text-align: center;\n}\n.ql-editor .ql-align-justify {\r\n    text-align: justify;\n}\n.ql-editor .ql-align-right {\r\n    text-align: right;\n}\n.ql-editor.ql-blank::before {\r\n    color: rgba(0, 0, 0, 0.6);\r\n    content: attr(data-placeholder);\r\n    font-style: italic;\r\n    left: 15px;\r\n    pointer-events: none;\r\n    position: absolute;\r\n    right: 15px;\n}\n.ql-snow.ql-toolbar:after,\r\n.ql-snow .ql-toolbar:after {\r\n    clear: both;\r\n    content: '';\r\n    display: table;\n}\n.ql-snow.ql-toolbar button,\r\n.ql-snow .ql-toolbar button {\r\n    background: none;\r\n    border: none;\r\n    cursor: pointer;\r\n    display: inline-block;\r\n    float: left;\r\n    height: 24px;\r\n    padding: 3px 5px;\r\n    width: 28px;\n}\n.ql-snow.ql-toolbar button svg,\r\n.ql-snow .ql-toolbar button svg {\r\n    float: left;\r\n    height: 100%;\n}\n.ql-snow.ql-toolbar button:active:hover,\r\n.ql-snow .ql-toolbar button:active:hover {\r\n    outline: none;\n}\n.ql-snow.ql-toolbar input.ql-image[type='file'],\r\n.ql-snow .ql-toolbar input.ql-image[type='file'] {\r\n    display: none;\n}\n.ql-snow.ql-toolbar button:hover,\r\n.ql-snow .ql-toolbar button:hover,\r\n.ql-snow.ql-toolbar button:focus,\r\n.ql-snow .ql-toolbar button:focus,\r\n.ql-snow.ql-toolbar button.ql-active,\r\n.ql-snow .ql-toolbar button.ql-active,\r\n.ql-snow.ql-toolbar .ql-picker-label:hover,\r\n.ql-snow .ql-toolbar .ql-picker-label:hover,\r\n.ql-snow.ql-toolbar .ql-picker-label.ql-active,\r\n.ql-snow .ql-toolbar .ql-picker-label.ql-active,\r\n.ql-snow.ql-toolbar .ql-picker-item:hover,\r\n.ql-snow .ql-toolbar .ql-picker-item:hover,\r\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected,\r\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected {\r\n    color: #06c;\n}\n.ql-snow.ql-toolbar button:hover .ql-fill,\r\n.ql-snow .ql-toolbar button:hover .ql-fill,\r\n.ql-snow.ql-toolbar button:focus .ql-fill,\r\n.ql-snow .ql-toolbar button:focus .ql-fill,\r\n.ql-snow.ql-toolbar button.ql-active .ql-fill,\r\n.ql-snow .ql-toolbar button.ql-active .ql-fill,\r\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,\r\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,\r\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,\r\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,\r\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,\r\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,\r\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,\r\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,\r\n.ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,\r\n.ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,\r\n.ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,\r\n.ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,\r\n.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,\r\n.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,\r\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\r\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\r\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\r\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\r\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\r\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\r\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,\r\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {\r\n    fill: #06c;\n}\n.ql-snow.ql-toolbar button:hover .ql-stroke,\r\n.ql-snow .ql-toolbar button:hover .ql-stroke,\r\n.ql-snow.ql-toolbar button:focus .ql-stroke,\r\n.ql-snow .ql-toolbar button:focus .ql-stroke,\r\n.ql-snow.ql-toolbar button.ql-active .ql-stroke,\r\n.ql-snow .ql-toolbar button.ql-active .ql-stroke,\r\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,\r\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,\r\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,\r\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,\r\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,\r\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,\r\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\r\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\r\n.ql-snow.ql-toolbar button:hover .ql-stroke-miter,\r\n.ql-snow .ql-toolbar button:hover .ql-stroke-miter,\r\n.ql-snow.ql-toolbar button:focus .ql-stroke-miter,\r\n.ql-snow .ql-toolbar button:focus .ql-stroke-miter,\r\n.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,\r\n.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,\r\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\r\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\r\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\r\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\r\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\r\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\r\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,\r\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {\r\n    stroke: #06c;\n}\n@media (pointer: coarse) {\n.ql-snow.ql-toolbar button:hover:not(.ql-active),\r\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) {\r\n        color: #444;\n}\n.ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,\r\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,\r\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\r\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\r\n        fill: #444;\n}\n.ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\r\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\r\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\r\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\r\n        stroke: #444;\n}\n}\n.ql-snow {\r\n    box-sizing: border-box;\n}\n.ql-snow * {\r\n    box-sizing: border-box;\n}\n.ql-snow .ql-hidden {\r\n    display: none;\n}\n.ql-snow .ql-out-bottom,\r\n.ql-snow .ql-out-top {\r\n    visibility: hidden;\n}\n.ql-snow .ql-tooltip {\r\n    position: absolute;\r\n    transform: translateY(10px);\n}\n.ql-snow .ql-tooltip a {\r\n    cursor: pointer;\r\n    text-decoration: none;\n}\n.ql-snow .ql-tooltip.ql-flip {\r\n    transform: translateY(-10px);\n}\n.ql-snow .ql-formats {\r\n    display: inline-block;\r\n    vertical-align: middle;\n}\n.ql-snow .ql-formats:after {\r\n    clear: both;\r\n    content: '';\r\n    display: table;\n}\n.ql-snow .ql-stroke {\r\n    fill: none;\r\n    stroke: #444;\r\n    stroke-linecap: round;\r\n    stroke-linejoin: round;\r\n    stroke-width: 2;\n}\n.ql-snow .ql-stroke-miter {\r\n    fill: none;\r\n    stroke: #444;\r\n    stroke-miterlimit: 10;\r\n    stroke-width: 2;\n}\n.ql-snow .ql-fill,\r\n.ql-snow .ql-stroke.ql-fill {\r\n    fill: #444;\n}\n.ql-snow .ql-empty {\r\n    fill: none;\n}\n.ql-snow .ql-even {\r\n    fill-rule: evenodd;\n}\n.ql-snow .ql-thin,\r\n.ql-snow .ql-stroke.ql-thin {\r\n    stroke-width: 1;\n}\n.ql-snow .ql-transparent {\r\n    opacity: 0.4;\n}\n.ql-snow .ql-direction svg:last-child {\r\n    display: none;\n}\n.ql-snow .ql-direction.ql-active svg:last-child {\r\n    display: inline;\n}\n.ql-snow .ql-direction.ql-active svg:first-child {\r\n    display: none;\n}\n.ql-snow .ql-editor h1 {\r\n    font-size: 2rem;\n}\n.ql-snow .ql-editor h2 {\r\n    font-size: 1.5rem;\n}\n.ql-snow .ql-editor h3 {\r\n    font-size: 1.17rem;\n}\n.ql-snow .ql-editor h4 {\r\n    font-size: 1rem;\n}\n.ql-snow .ql-editor h5 {\r\n    font-size: 0.83rem;\n}\n.ql-snow .ql-editor h6 {\r\n    font-size: 0.67rem;\n}\n.ql-snow .ql-editor a {\r\n    text-decoration: underline;\n}\n.ql-snow .ql-editor blockquote {\r\n    border-left: 4px solid #ccc;\r\n    margin-bottom: 5px;\r\n    margin-top: 5px;\r\n    padding-left: 16px;\n}\n.ql-snow .ql-editor code,\r\n.ql-snow .ql-editor pre {\r\n    background-color: #f0f0f0;\r\n    border-radius: 3px;\n}\n.ql-snow .ql-editor pre {\r\n    white-space: pre-wrap;\r\n    margin-bottom: 5px;\r\n    margin-top: 5px;\r\n    padding: 5px 10px;\n}\n.ql-snow .ql-editor code {\r\n    font-size: 85%;\r\n    padding: 2px 4px;\n}\n.ql-snow .ql-editor pre.ql-syntax {\r\n    background-color: #23241f;\r\n    color: #f8f8f2;\r\n    overflow: visible;\n}\n.ql-snow .ql-editor img {\r\n    max-width: 100%;\n}\n.ql-snow .ql-picker {\r\n    color: #444;\r\n    display: inline-block;\r\n    float: left;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    height: 24px;\r\n    position: relative;\r\n    vertical-align: middle;\n}\n.ql-snow .ql-picker-label {\r\n    cursor: pointer;\r\n    display: inline-block;\r\n    height: 100%;\r\n    padding-left: 8px;\r\n    padding-right: 2px;\r\n    position: relative;\r\n    width: 100%;\n}\n.ql-snow .ql-picker-label::before {\r\n    display: inline-block;\r\n    line-height: 22px;\n}\n.ql-snow .ql-picker-options {\r\n    background-color: #fff;\r\n    display: none;\r\n    min-width: 100%;\r\n    padding: 4px 8px;\r\n    position: absolute;\r\n    white-space: nowrap;\n}\n.ql-snow .ql-picker-options .ql-picker-item {\r\n    cursor: pointer;\r\n    display: block;\r\n    padding-bottom: 5px;\r\n    padding-top: 5px;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label {\r\n    color: #ccc;\r\n    z-index: 2;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {\r\n    fill: #ccc;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\r\n    stroke: #ccc;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-options {\r\n    display: block;\r\n    margin-top: -1px;\r\n    top: 100%;\r\n    z-index: 1;\n}\n.ql-snow .ql-color-picker,\r\n.ql-snow .ql-icon-picker {\r\n    width: 28px;\n}\n.ql-snow .ql-color-picker .ql-picker-label,\r\n.ql-snow .ql-icon-picker .ql-picker-label {\r\n    padding: 2px 4px;\n}\n.ql-snow .ql-color-picker .ql-picker-label svg,\r\n.ql-snow .ql-icon-picker .ql-picker-label svg {\r\n    right: 4px;\n}\n.ql-snow .ql-icon-picker .ql-picker-options {\r\n    padding: 4px 0px;\n}\n.ql-snow .ql-icon-picker .ql-picker-item {\r\n    height: 24px;\r\n    width: 24px;\r\n    padding: 2px 4px;\n}\n.ql-snow .ql-color-picker .ql-picker-options {\r\n    padding: 3px 5px;\r\n    width: 152px;\n}\n.ql-snow .ql-color-picker .ql-picker-item {\r\n    border: 1px solid transparent;\r\n    float: left;\r\n    height: 16px;\r\n    margin: 2px;\r\n    padding: 0px;\r\n    width: 16px;\n}\n.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {\r\n    position: absolute;\r\n    margin-top: -9px;\r\n    right: 0;\r\n    top: 50%;\r\n    width: 18px;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,\r\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,\r\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,\r\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,\r\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,\r\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {\r\n    content: attr(data-label);\n}\n.ql-snow .ql-picker.ql-header {\r\n    width: 98px;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label::before,\r\n.ql-snow .ql-picker.ql-header .ql-picker-item::before {\r\n    content: 'Normal';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,\r\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {\r\n    content: 'Heading 1';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,\r\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {\r\n    content: 'Heading 2';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,\r\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {\r\n    content: 'Heading 3';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,\r\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {\r\n    content: 'Heading 4';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,\r\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {\r\n    content: 'Heading 5';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,\r\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {\r\n    content: 'Heading 6';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {\r\n    font-size: 2rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {\r\n    font-size: 1.5rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {\r\n    font-size: 1.17rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {\r\n    font-size: 1rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {\r\n    font-size: 0.83rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {\r\n    font-size: 0.67rem;\n}\n.ql-snow .ql-picker.ql-font {\r\n    width: 108px;\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label::before,\r\n.ql-snow .ql-picker.ql-font .ql-picker-item::before {\r\n    content: 'Sans Serif';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,\r\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {\r\n    content: 'Serif';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,\r\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {\r\n    content: 'Monospace';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {\r\n    font-family: Georgia, Times New Roman, serif;\n}\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {\r\n    font-family: Monaco, Courier New, monospace;\n}\n.ql-snow .ql-picker.ql-size {\r\n    width: 98px;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label::before,\r\n.ql-snow .ql-picker.ql-size .ql-picker-item::before {\r\n    content: 'Normal';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,\r\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {\r\n    content: 'Small';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,\r\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {\r\n    content: 'Large';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,\r\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {\r\n    content: 'Huge';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {\r\n    font-size: 10px;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {\r\n    font-size: 18px;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {\r\n    font-size: 32px;\n}\n.ql-snow .ql-color-picker.ql-background .ql-picker-item {\r\n    background-color: #fff;\n}\n.ql-snow .ql-color-picker.ql-color .ql-picker-item {\r\n    background-color: #000;\n}\n.ql-toolbar.ql-snow {\r\n    border: 1px solid #ccc;\r\n    box-sizing: border-box;\r\n    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;\r\n    padding: 8px;\n}\n.ql-toolbar.ql-snow .ql-formats {\r\n    margin-right: 15px;\n}\n.ql-toolbar.ql-snow .ql-picker-label {\r\n    border: 1px solid transparent;\n}\n.ql-toolbar.ql-snow .ql-picker-options {\r\n    border: 1px solid transparent;\r\n    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;\n}\n.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {\r\n    border-color: #ccc;\n}\n.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {\r\n    border-color: #ccc;\n}\n.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,\r\n.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover {\r\n    border-color: #000;\n}\n.ql-toolbar.ql-snow + .ql-container.ql-snow {\r\n    border-top: 0px;\n}\n.ql-snow .ql-tooltip {\r\n    background-color: #fff;\r\n    border: 1px solid #ccc;\r\n    box-shadow: 0px 0px 5px #ddd;\r\n    color: #444;\r\n    padding: 5px 12px;\r\n    white-space: nowrap;\n}\n.ql-snow .ql-tooltip::before {\r\n    content: 'Visit URL:';\r\n    line-height: 26px;\r\n    margin-right: 8px;\n}\n.ql-snow .ql-tooltip input[type='text'] {\r\n    display: none;\r\n    border: 1px solid #ccc;\r\n    font-size: 13px;\r\n    height: 26px;\r\n    margin: 0px;\r\n    padding: 3px 5px;\r\n    width: 170px;\n}\n.ql-snow .ql-tooltip a.ql-preview {\r\n    display: inline-block;\r\n    max-width: 200px;\r\n    overflow-x: hidden;\r\n    text-overflow: ellipsis;\r\n    vertical-align: top;\n}\n.ql-snow .ql-tooltip a.ql-action::after {\r\n    border-right: 1px solid #ccc;\r\n    content: 'Edit';\r\n    margin-left: 16px;\r\n    padding-right: 8px;\n}\n.ql-snow .ql-tooltip a.ql-remove::before {\r\n    content: 'Remove';\r\n    margin-left: 8px;\n}\n.ql-snow .ql-tooltip a {\r\n    line-height: 26px;\n}\n.ql-snow .ql-tooltip.ql-editing a.ql-preview,\r\n.ql-snow .ql-tooltip.ql-editing a.ql-remove {\r\n    display: none;\n}\n.ql-snow .ql-tooltip.ql-editing input[type='text'] {\r\n    display: inline-block;\n}\n.ql-snow .ql-tooltip.ql-editing a.ql-action::after {\r\n    border-right: 0px;\r\n    content: 'Save';\r\n    padding-right: 0px;\n}\n.ql-snow .ql-tooltip[data-mode='link']::before {\r\n    content: 'Enter link:';\n}\n.ql-snow .ql-tooltip[data-mode='formula']::before {\r\n    content: 'Enter formula:';\n}\n.ql-snow .ql-tooltip[data-mode='video']::before {\r\n    content: 'Enter video:';\n}\n.ql-snow a {\r\n    color: #06c;\n}\n.ql-container.ql-snow {\r\n    border: 1px solid #ccc;\n}\r\n";
styleInject(css_248z);

script.render = render;

export { script as default };
