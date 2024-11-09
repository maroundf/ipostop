export default class Swiper extends React.Component {
  constructor(props, context) {
    super(props, context);
    const responderEnd = this._handlePanResponderEnd.bind(this);
    const shouldSetResponder = this._handleShouldSetPanResponder.bind(this);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd
    });
  }
  _handleShouldSetPanResponder(evt, gestureState) {
    var isclk = Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5;
    return gestureState.numberActiveTouches === 1 && !isclk;
  }
  _handlePanResponderEnd(evt, gestureState) {
    const swipeDirection = this._getSwipeDirection(gestureState);
    this._triggerSwipeHandlers(swipeDirection, gestureState);
  }
  _triggerSwipeHandlers(swipeDirection, gestureState) {
    const { onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = this.props;
    onSwipe && onSwipe(swipeDirection, gestureState);
    switch (swipeDirection) {
      case 'LEFT':
        onSwipeLeft && onSwipeLeft(gestureState);
        break;
      case 'RIGHT':
        onSwipeRight && onSwipeRight(gestureState);
        break;
      case 'UP':
        onSwipeUp && onSwipeUp(gestureState);
        break;
      case 'DOWN':
        onSwipeDown && onSwipeDown(gestureState);
        break;
    }
  }
  _getSwipeDirection(gestureState) {
    if (this._isValidHorizontalSwipe(gestureState)) return gestureState.dx > 0 ? 'RIGHT' : 'LEFT'; else if (this._isValidVerticalSwipe(gestureState)) return gestureState.dy > 0 ? 'DOWN' : 'UP'; else return null;
  }
  _isValidHorizontalSwipe(gestureState) {
    if (Math.abs(gestureState.vx) > 0.12 && Math.abs(gestureState.vy) < 0.1 && Math.abs(gestureState.dx) > 100 && Math.abs(gestureState.dy) < 12) return true; else return false;
  }
  _isValidVerticalSwipe(gestureState) {
    if (Math.abs(gestureState.vy) > 0.12 && Math.abs(gestureState.vx) < 0.1 && Math.abs(gestureState.dy) > 100 && Math.abs(gestureState.dx) < 12) return true; else return false;
  }
  render() {
    if (this.props.onSwipe) return (<View {...this.props} {...this._panResponder.panHandlers} />); else return (<View {...this.props} />);
  }
};
