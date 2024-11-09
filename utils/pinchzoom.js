import { Animated } from 'react-native';
export default class Pinchzoom extends React.Component {
  constructor(props) {
    super(props);
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.translateZ = new Animated.Value(1);
    this.offsetX = 0;
    this.offsetY = 0;
    this.offsetZ = 0;
    this._onPanGesture = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY
          }
        }
      ],
      { useNativeDriver: true }
    );
    this._onPinchGesture = Animated.event(
      [
        {
          nativeEvent: {
            scale: this.translateZ
          }
        }
      ],
      { useNativeDriver: true }
    );
  }
  _onPanChange = (evt) => {
    if (evt.nativeEvent.oldState === State.ACTIVE) {
      let oX = this.offsetX + evt.nativeEvent.translationX, oY = this.offsetY + evt.nativeEvent.translationY;
      if(oX < this.uX) this.offsetX = this.uX; else if(oX > this.lX) this.offsetX = this.lX; else this.offsetX = oX;
      this.translateX.setOffset(this.offsetX);
      this.translateX.setValue(0);
      if(oY < this.uY) this.offsetY = this.uY; else if(oY > this.lY) this.offsetY = this.lY; else this.offsetY = oY;
      this.translateY.setOffset(this.offsetY);
      this.translateY.setValue(0);
    }
  }
  _onPinchChange = (evt) => {
    if (evt.nativeEvent.oldState === State.ACTIVE) {
      let oZ = this.offsetZ + evt.nativeEvent.scale;
      if(oZ < this.props.minscale) oZ = this.props.minscale; else if(oZ > this.props.maxscale) oZ = this.props.maxscale;
      this.offsetZ = oZ >= 1 ? (oZ - 1) : -(1 - oZ);
      this.translateZ.setOffset(this.offsetZ);
      this.translateZ.setValue(1);
      this._calcbound();
    }
  }
  _calcbound = () => {
    let dw = this.w * this.offsetZ / 2, dh = this.h * this.offsetZ / 2;
    if(dw > 0) dw = -dw; if(dh > 0) dh = -dh;
    this.uX = -this.x + dw; this.lX = dmns.width - (this.x + this.w + dw);
    this.uY = -this.y + dh; this.lY = dmns.height - (this.y + this.h + dh);
  }
  _measureView = (evt) => {
    this.x = evt.nativeEvent.layout.x; this.w = evt.nativeEvent.layout.width;
    this.y = evt.nativeEvent.layout.y; this.h = evt.nativeEvent.layout.height;
    this._calcbound();
  }
  pinchRef = React.createRef();
  panRef = React.createRef();
  render() {
    return (
      <PinchGestureHandler
        ref={this.pinchRef} minPointers={2}
        simultaneousHandlers={[this.panRef]}
        onGestureEvent={this._onPinchGesture}
        onHandlerStateChange={this._onPinchChange}>
        <Animated.View onLayout={this._measureView}
          style={[
            {
              transform: [
                { perspective: 200 },
                { translateX: this.translateX },
                { translateY: this.translateY },
                { scale: this.translateZ }
              ]
            }, this.props.style
          ]}
        >
      <PanGestureHandler
        ref={this.panRef} maxPointers={1}
        minDist={10} //activeOffsetX={20} activeOffsetY={40}
        simultaneousHandlers={[this.pinchRef]}
        onGestureEvent={this._onPanGesture}
        onHandlerStateChange={this._onPanChange}>
            <Animated.View style={{flex:1}}>
              {this.props.children}
            </Animated.View>
      </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
    );
  }
}
