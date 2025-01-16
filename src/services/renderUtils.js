"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.branchNodeProcessorRegistry = void 0;
exports.hero = hero;
exports.actions = actions;
exports.content = content;
exports.tagList = tagList;
exports.image = image;
exports.header = header;
exports.button = button;
exports.processBranch = processBranch;
const button_1 = require("../ui-models/button");
const generic_1 = require("../ui-models/generic");
const header_1 = require("../ui-models/header");
const hero_1 = require("../ui-models/hero");
const image_1 = require("../ui-models/image");
const tagList_1 = require("../ui-models/tagList");
exports.branchNodeProcessorRegistry = new Map([
    ['hero', hero],
    ['actions', actions],
    ['contents', content],
    ['button', button],
    ['tagList', tagList],
    ['image', image],
    ['header', header],
]);
function hero(node) {
    var _a, _b, _c;
    const children = [];
    // TODO: Add zone to hero from the zone property defined on the vNode
    const zone = ((_b = (_a = node.attributes) === null || _a === void 0 ? void 0 : _a.find((attr) => attr.key.symbol === 'zone')) === null || _b === void 0 ? void 0 : _b.value.symbol) || '';
    (_c = node.children) === null || _c === void 0 ? void 0 : _c.forEach((child) => {
        children.push(processBranch(child));
    });
    const hero = new hero_1.Hero(children, zone || '');
    return hero;
}
function actions(node) {
    var _a;
    const children = [];
    (_a = node.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
        children.push(processBranch(child));
    });
    const actionNode = new generic_1.GenericNode(children, node.zone || '');
    actionNode.name = 'actions';
    actionNode.render = () => {
        return ``;
    };
    actionNode.preview = () => {
        return `[
                ${actionNode.children.map((child) => child.renderNode()).join(',')}
            ]`;
    };
    return actionNode;
}
function content(node) {
    var _a;
    const children = [];
    (_a = node.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
        children.push(processBranch(child));
    });
    const contentNode = new generic_1.GenericNode(children, node.zone || '');
    contentNode.name = 'content';
    contentNode.render = () => {
        return ``;
    };
    contentNode.preview = () => {
        return `[
                ${contentNode.children.map((child) => child.renderNode()).join(',')}
            ]`;
    };
    return contentNode;
}
function tagList(node) {
    return new tagList_1.TagList();
}
function image(node) {
    var _a, _b;
    const source = ((_b = (_a = node.attributes) === null || _a === void 0 ? void 0 : _a.find((attr) => attr.key.symbol === 'source')) === null || _b === void 0 ? void 0 : _b.value.symbol) || '';
    return new image_1.Image(source);
}
function header(node) {
    var _a, _b;
    const text = ((_b = (_a = node.attributes) === null || _a === void 0 ? void 0 : _a.find((attr) => attr.key.symbol === 'text')) === null || _b === void 0 ? void 0 : _b.value.symbol) || '';
    return new header_1.Header(text);
}
function button(node) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // get button text and label
    const text = ((_b = (_a = node.attributes) === null || _a === void 0 ? void 0 : _a.find((attr) => attr.key.symbol === 'text')) === null || _b === void 0 ? void 0 : _b.value.symbol) || '';
    const label = ((_d = (_c = node.attributes) === null || _c === void 0 ? void 0 : _c.find((attr) => attr.key.symbol === 'label')) === null || _d === void 0 ? void 0 : _d.value.symbol) || '';
    const type = ((_f = (_e = node.attributes) === null || _e === void 0 ? void 0 : _e.find((attr) => attr.key.symbol === 'type')) === null || _f === void 0 ? void 0 : _f.value.symbol) || 'primary';
    const action = ((_h = (_g = node.attributes) === null || _g === void 0 ? void 0 : _g.find((attr) => attr.key.symbol === 'action')) === null || _h === void 0 ? void 0 : _h.value.symbol) || '';
    if (!text || !label) {
        throw new Error('Button must have text and label');
    }
    const button = new button_1.Button(text, label, type, action, node.zone || '');
    return button;
}
/**
 * This function takes a vNode and returns a BaseNode and also renders all the children of the vNode
 * @param node
 * @returns
 */
function processBranch(node) {
    const renderFunction = exports.branchNodeProcessorRegistry.get(node.name);
    if (!renderFunction) {
        throw new Error(`No render function found for ${node.name}`);
    }
    return renderFunction(node);
}
