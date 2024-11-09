"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var react_native_image_pan_zoom_1 = require("../../imagepanzoom");
var image_viewer_style_1 = require("./image-viewer.style");
var image_viewer_type_1 = require("./image-viewer.type");
var ImageViewer = (function (_super) {
    __extends(ImageViewer, _super);
    function ImageViewer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = new image_viewer_type_1.State();
        _this.fadeAnim = new react_native_1.Animated.Value(0);
        _this.standardPositionX = 0;
        _this.positionXNumber = 0;
        _this.positionX = new react_native_1.Animated.Value(0);
        _this.styles = image_viewer_style_1.default(dmns.width, dmns.height, Cnt.clrs.lightbg, Cnt.clrs.blackcolor);
        _this.loadedIndex = new Map();
        _this.handleLongPressWithIndex = new Map();
        _this.handleHorizontalOuterRangeOffset = function (offsetX) {
            _this.positionXNumber = _this.standardPositionX + offsetX;
            _this.positionX.setValue(_this.positionXNumber);
            var offsetXRTL = !react_native_1.I18nManager.isRTL ? offsetX : -offsetX;
            if (offsetXRTL < 0) {
                if (_this.state.currentShowIndex ||
                    0 < _this.props.imageUrls.length - 1) {
                    _this.loadImage((_this.state.currentShowIndex || 0) + 1);
                }
            }
            else if (offsetXRTL > 0) {
                if (_this.state.currentShowIndex || 0 > 0) {
                    _this.loadImage((_this.state.currentShowIndex || 0) - 1);
                }
            }
        };
        _this.handleResponderRelease = function (vx) {
            var vxRTL = react_native_1.I18nManager.isRTL ? -vx : vx;
            var isLeftMove = react_native_1.I18nManager.isRTL
                ? _this.positionXNumber - _this.standardPositionX <
                -(_this.props.flipThreshold || 0)
                : _this.positionXNumber - _this.standardPositionX >
                (_this.props.flipThreshold || 0);
            var isRightMove = react_native_1.I18nManager.isRTL
                ? _this.positionXNumber - _this.standardPositionX >
                (_this.props.flipThreshold || 0)
                : _this.positionXNumber - _this.standardPositionX <
                -(_this.props.flipThreshold || 0);
            if (vxRTL > 0.7) {
                _this.goBack.call(_this);
                if (_this.state.currentShowIndex || 0 > 0) {
                    _this.loadImage((_this.state.currentShowIndex || 0) - 1);
                }
                return;
            }
            else if (vxRTL < -0.7) {
                _this.goNext.call(_this);
                if (_this.state.currentShowIndex || 0 < _this.props.imageUrls.length - 1) {
                    _this.loadImage((_this.state.currentShowIndex || 0) + 1);
                }
                return;
            }
            if (isLeftMove) {
                _this.goBack.call(_this);
            }
            else if (isRightMove) {
                _this.goNext.call(_this);
                return;
            }
            else {
                _this.resetPosition.call(_this);
                return;
            }
        };
        _this.goBack = function () {
            if (_this.state.currentShowIndex === 0) {
                _this.resetPosition.call(_this);
                return;
            }
            _this.positionXNumber = !react_native_1.I18nManager.isRTL
                ? _this.standardPositionX + dmns.width
                : _this.standardPositionX - dmns.width;
            _this.standardPositionX = _this.positionXNumber;
            react_native_1.Animated.timing(_this.positionX, {
                toValue: _this.positionXNumber,
                duration: 0.5 * Cnt.prps.animdur,
                useNativeDriver: true
            }).start();
            var nextIndex = (_this.state.currentShowIndex || 0) - 1;
            _this.setState({
                currentShowIndex: nextIndex
            }, function () {
                if (_this.props.onChange) {
                    _this.props.onChange(_this.state.currentShowIndex);
                }
            });
        };
        _this.handleLongPress = function (image) {
            if (_this.props.saveToLocalByLongPress) {
                _this.setState({ isShowMenu: true });
            }
            if (_this.props.onLongPress) {
                _this.props.onLongPress(image);
            }
        };
        _this.handleClick = function () {
            if (_this.props.onClick) {
                _this.props.onClick(_this.handleCancel);
            }
        };
        _this.handleDoubleClick = function () {
            if (_this.props.onDoubleClick) {
                _this.props.onDoubleClick(_this.handleCancel);
            }
        };
        _this.handleCancel = function () {
            if (_this.props.onCancel) {
                _this.props.onCancel();
            }
        };
        _this.saveToLocal = function () {
            if (!_this.props.onSave) {
                react_native_1.CameraRoll.saveToCameraRoll(_this.props.imageUrls[_this.state.currentShowIndex || 0].url);
                _this.props.onSaveToCamera(_this.state.currentShowIndex);
            }
            else {
                _this.props.onSave(_this.props.imageUrls[_this.state.currentShowIndex || 0].url);
            }
            if (_this.isopen) _this.setState({ isShowMenu: false });
        };
        _this.handleLeaveMenu = function () {
            _this.setState({ isShowMenu: false });
        };
        _this.handleSwipeDown = function () {
            if (_this.props.onSwipeDown) {
                _this.props.onSwipeDown();
            }
            _this.handleCancel();
        };
        _this.handleLayout = function (event) {
            _this.styles = image_viewer_style_1.default(dmns.width, dmns.height, Cnt.clrs.lightbg, Cnt.clrs.blackcolor);
            _this.forceUpdate(); _this.jumpToCurrentImage();
        };
        return _this;
    }
    ImageViewer.prototype.UNSAFE_componentWillMount = function () {
        this.init(this.props);
    };
    ImageViewer.prototype.componentWillUnmount = function () {
        delete this.isopen;
    };
    ImageViewer.prototype.init = function (nextProps) {
        var _this = this; this.isopen = 1;
        if (nextProps.imageUrls.length === 0) {
            this.fadeAnim.setValue(0);
            return this.setState(new image_viewer_type_1.State());
        }
        var imageSizes = [];
        nextProps.imageUrls.forEach(function (imageUrl) {
            imageSizes.push({
                width: imageUrl.width || 0,
                height: imageUrl.height || 0,
                status: "loading"
            });
        });
        this.setState({
            currentShowIndex: nextProps.index,
            imageSizes: imageSizes
        }, function () {
            _this.loadImage(nextProps.index || 0);
            _this.jumpToCurrentImage();
            react_native_1.Animated.timing(_this.fadeAnim, {
                toValue: 1,
                duration: Cnt.prps.animdur,
                useNativeDriver: true
            }).start();
        });
    };
    ImageViewer.prototype.jumpToCurrentImage = function () {
        this.positionXNumber = -dmns.width * (this.state.currentShowIndex || 0);
        this.standardPositionX = this.positionXNumber;
        this.positionX.setValue(this.positionXNumber);
    };
    ImageViewer.prototype.loadImage = function (index) {
        var _this = this;
        if (!this.state.imageSizes[index]) {
            return;
        }
        if (this.loadedIndex.has(index)) {
            return;
        }
        this.loadedIndex.set(index, true);
        var image = this.props.imageUrls[index];
        var imageStatus = __assign({}, this.state.imageSizes[index]);
        var saveImageSize = function () {
            if (_this.state.imageSizes[index] &&
                _this.state.imageSizes[index].status !== "loading") {
                return;
            }
            var imageSizes = _this.state.imageSizes.slice(0);
            imageSizes[index] = imageStatus;
            if (_this.isopen) _this.setState({ imageSizes: imageSizes });
        };
        if (this.state.imageSizes[index].status === "success") {
            return;
        }
        if (this.state.imageSizes[index].width > 0 &&
            this.state.imageSizes[index].height > 0) {
            imageStatus.status = "success";
            saveImageSize();
            return;
        }
        var sizeLoaded = false;
        var imageLoaded = false;
        if (!image.url || image.url.startsWith("file:")) {
            imageLoaded = true;
        }
        react_native_1.Image.getSize(image.url, function (width, height) {
            imageStatus.width = width;
            imageStatus.height = height;
            imageStatus.status = "success";
            saveImageSize();
        }, function (error) {
            try {
                var data = react_native_1.Image.resolveAssetSource(image.props.source);
                imageStatus.width = data.width;
                imageStatus.height = data.height;
                imageStatus.status = "success";
                saveImageSize();
            }
            catch (newError) {
                imageStatus.status = "fail";
                var imageSizes = _this.state.imageSizes.slice(0);
                imageSizes[index] = imageStatus;
                if (_this.isopen) _this.setState({ imageSizes: imageSizes });
            }
        });
    };
    ImageViewer.prototype.goNext = function () {
        var _this = this;
        if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
            this.resetPosition.call(this);
            return;
        }
        this.positionXNumber = !react_native_1.I18nManager.isRTL
            ? this.standardPositionX - dmns.width
            : this.standardPositionX + dmns.width;
        this.standardPositionX = this.positionXNumber;
        react_native_1.Animated.timing(this.positionX, {
            toValue: this.positionXNumber,
            duration: 0.5 * Cnt.prps.animdur,
                useNativeDriver: true
        }).start();
        var nextIndex = (this.state.currentShowIndex || 0) + 1;
        this.setState({
            currentShowIndex: nextIndex
        }, function () {
            if (_this.props.onChange) {
                _this.props.onChange(_this.state.currentShowIndex);
            }
        });
    };
    ImageViewer.prototype.resetPosition = function () {
        this.positionXNumber = this.standardPositionX;
        react_native_1.Animated.timing(this.positionX, {
            toValue: this.standardPositionX,
            duration: 0.5 * Cnt.prps.animdur,
                useNativeDriver: true
        }).start();
    };
    ImageViewer.prototype.getContent = function () {
        var _this = this, ttlehht = 0, i, arrlen;
        if (this.props.imageUrls[_this.state.currentShowIndex].props && this.props.imageUrls[_this.state.currentShowIndex].props.title) { arrlen = Math.ceil(this.props.imageUrls[_this.state.currentShowIndex].props.title.length / (dmns.lrgs ? 120 : 40)); ttlehht = 2 * this.props.ctx[3] + 1.1 * this.props.ctx[1]; /*for (i = 1; i < arrlen; i++) ttlehht += 1.1 * this.props.ctx[1];*/ }
        var screenWidth = dmns.width;
        var screenHeight = dmns.height - ttlehht;
        var ImageElements = this.props.imageUrls.map(function (image, index) {
            if ((_this.state.currentShowIndex || 0) > index + 1 ||
                (_this.state.currentShowIndex || 0) < index - 1) {
                return (<react_native_1.View key={index} style={{ width: screenWidth, height: screenHeight }} />);
            }
            if (!_this.handleLongPressWithIndex.has(index)) {
                _this.handleLongPressWithIndex.set(index, _this.handleLongPress.bind(_this, image));
            }
            var width = _this.state.imageSizes[index] &&
                _this.state.imageSizes[index].width;
            var height = _this.state.imageSizes[index] && _this.state.imageSizes[index].height;
            var imageInfo = _this.state.imageSizes[index];
            if (!imageInfo || !imageInfo.status) {
                return (<react_native_1.View key={index} style={{ width: screenWidth, height: screenHeight }} />);
            }
            if (width > screenWidth) {
                var widthPixel = screenWidth / width;
                width *= widthPixel;
                height *= widthPixel;
            }
            if (height > screenHeight) {
                var HeightPixel = screenHeight / height;
                width *= HeightPixel;
                height *= HeightPixel;
            }
            switch (imageInfo.status) {
                case "loading":
                    return (<react_native_image_pan_zoom_1.default key={index} cropWidth={dmns.width} cropHeight={dmns.height} horizontalOuterRangeOffset={_this.handleHorizontalOuterRangeOffset} responderRelease={_this.handleResponderRelease} onClick={_this.handleClick} imageWidth={screenWidth} imageHeight={screenHeight} enableSwipeDown={true} onSwipeDown={_this.handleSwipeDown}><react_native_1.View style={_this.styles.loadingContainer}>{_this.props.loadingRender()}</react_native_1.View>
                    </react_native_image_pan_zoom_1.default>);
                case "success":
                    if (!image.props) {
                        image.props = {};
                    }
                    if (!image.props.style) {
                        image.props.style = {};
                    }
                    image.props.style = __assign({}, image.props.style, {
                        width: width,
                        height: height
                    });
                    if (typeof image.props.source === "number") { }
                    else {
                        if (!image.props.source) {
                            image.props.source = {};
                        }
                        image.props.source = __assign({ uri: image.url }, image.props.source);
                    }
                    return (<react_native_image_pan_zoom_1.default key={index} cropWidth={dmns.width} cropHeight={dmns.height} maxOverflow={_this.props.maxOverflow} horizontalOuterRangeOffset={_this.handleHorizontalOuterRangeOffset} responderRelease={_this.handleResponderRelease} onLongPress={_this.handleLongPressWithIndex.get(index)} onClick={_this.handleClick} onDoubleClick={_this.handleDoubleClick} imageWidth={width} imageHeight={height} enableSwipeDown={true} onSwipeDown={_this.handleSwipeDown}>{_this.props.renderImage(image.props)}
                    </react_native_image_pan_zoom_1.default>);
                case "fail":
                    return (<react_native_image_pan_zoom_1.default key={index} cropWidth={dmns.width} cropHeight={dmns.height} horizontalOuterRangeOffset={_this.handleHorizontalOuterRangeOffset} responderRelease={_this.handleResponderRelease} onClick={_this.handleClick} imageWidth={screenWidth} imageHeight={screenHeight} enableSwipeDown={true} onSwipeDown={_this.handleSwipeDown}><react_native_1.View style={_this.styles.loadingContainer}>{_this.props.failRender()}</react_native_1.View>
                    </react_native_image_pan_zoom_1.default>);
            }
        });
        return (<react_native_1.Animated.View style={{ zIndex: 9999 }}>
            <react_native_1.Animated.View style={{ opacity: this.fadeAnim }}>
                <react_native_1.View style={this.styles.arrowLeftContainer}>
                    <react_native_1.TouchableWithoutFeedback onPress={this.goBack}>
                        <react_native_1.View>{this.props.renderArrowLeft()}</react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>
                <react_native_1.View style={this.styles.arrowRightContainer}>
                    <react_native_1.TouchableWithoutFeedback onPress={this.goNext}>
                        <react_native_1.View>{this.props.renderArrowRight()}</react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>
                {this.props.renderIndicator((this.state.currentShowIndex || 0) + 1, this.props.imageUrls, this.props.ctx)}
                <react_native_1.Animated.View style={__assign({}, this.styles.moveBox, { transform: [{ translateX: this.positionX }], width: dmns.width * this.props.imageUrls.length, height: screenHeight })}>
                    {ImageElements}
                </react_native_1.Animated.View>
                {this.props.imageUrls[this.state.currentShowIndex || 0] &&
                    this.props.imageUrls[this.state.currentShowIndex || 0]
                        .originSizeKb &&
                    this.props.imageUrls[this.state.currentShowIndex || 0]
                        .originUrl && (<react_native_1.View style={this.styles.watchOrigin}>
                            <react_native_1.TouchableOpacity style={this.styles.watchOriginTouchable}>
                                <react_native_1.Text style={this.styles.watchOriginText}>View Original Photo (2M)</react_native_1.Text>
                            </react_native_1.TouchableOpacity>
                        </react_native_1.View>)}
                <react_native_1.View style={[{ bottom: 0, position: "absolute", zIndex: 9999 }, this.props.footerContainerStyle]}>
                    {this.props.renderFooter(this.state.currentShowIndex)}
                </react_native_1.View>
            </react_native_1.Animated.View>
        </react_native_1.Animated.View>);
    };
    ImageViewer.prototype.getMenu = function () {
        if (!this.state.isShowMenu) { return null; }
        return (<react_native_1.View style={this.styles.menuContainer}>
            <react_native_1.View style={this.styles.menuShadow} />
            <react_native_1.View style={this.styles.menuContent}>
                <react_native_1.TouchableHighlight underlayColor={Cnt.clrs.lgraycolor} onPress={this.saveToLocal} style={[this.styles.operateContainer, Stl.lsepdiv]}>
                    <react_native_1.Text style={this.styles.operateText}>
                        {this.props.menuContext.saveToLocal}
                    </react_native_1.Text>
                </react_native_1.TouchableHighlight>
                <react_native_1.TouchableHighlight underlayColor={Cnt.clrs.lgraycolor} onPress={this.handleLeaveMenu} style={[this.styles.operateContainer, Stl.lsepdiv]}>
                    <react_native_1.Text style={this.styles.operateText}>
                        {this.props.menuContext.cancel}
                    </react_native_1.Text>
                </react_native_1.TouchableHighlight>
            </react_native_1.View>
        </react_native_1.View>);
    };
    ImageViewer.prototype.render = function () {
        return (<react_native_1.View onLayout={this.handleLayout} style={[{ width: dmns.width, height: dmns.height, overflow: "hidden" }, this.props.style]}>{this.getContent()}{this.getMenu()}</react_native_1.View>);
    };
    ImageViewer.defaultProps = new image_viewer_type_1.Props();
    return ImageViewer;
}(React.Component));
exports.default = ImageViewer;
