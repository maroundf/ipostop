"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var Props = (function () {
    function Props() {
        this.show = false; this.imageUrls = []; this.flipThreshold = 80; this.maxOverflow = 300; this.index = 0; this.footerContainerStyle = {}; this.menuContext = { saveToLocal: "Save to Album", cancel: "Cancel" }; this.saveToLocalByLongPress = true; this.style = {}; this.onLongPress = function () { }; this.onClick = function () { }; this.onDoubleClick = function () { }; this.onSave = function () { }; this.renderFooter = function () { return null; }; this.renderImage = function (props) { return React.createElement(react_native_1.Image, props); }; this.renderArrowLeft = function () { return null; }; this.renderArrowRight = function () { return null; }; this.onShowModal = function () { }; this.onCancel = function () { }; this.onSwipeDown = function () { }; this.loadingRender = function () { return null; }; this.onSaveToCamera = function () { }; this.onChange = function () { }; this.renderIndicator = function (currentIndex, imgurls, ctx) {
            var cidx = currentIndex - 1; return ctx ? <View style={[Stl.itmhdiv, { zIndex: 9999 }]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={this.onCancel} style={{ flex: 1 }}><Icon3 name="arrow-back" style={[Stl.wicon, { fontSize: ctx[1], textAlign: 'left', padding: ctx[3], paddingTop: ctx[4], paddingStart: ctx[3] }]} /></TouchableOpacity><View style={{ flex: 6 }}><Text numberOfLines={1} style={[Stl.smalltext, { fontSize: ctx[2], textAlign: 'center', paddingBottom: ctx[3], paddingTop: ctx[4] }]}>{imgurls[cidx].props && imgurls[cidx].props.title ? imgurls[cidx].props.title : ''}</Text></View><View style={{ flex: 1 }}><Text numberOfLines={1} style={[Stl.smalltext, { fontSize: ctx[2], textAlign: 'right', padding: ctx[3], paddingTop: ctx[4], paddingEnd: ctx[3] }]}>{imgurls[cidx].id != undefined ? currentIndex + "/" + imgurls.length : ''}</Text></View></View> : null;
        };
    }
    return Props;
}());
exports.Props = Props;
var State = (function () {
    function State() { this.show = false; this.currentShowIndex = 0; this.imageLoaded = false; this.imageSizes = []; this.isShowMenu = false; }
    return State;
}());
exports.State = State;
