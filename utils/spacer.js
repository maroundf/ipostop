import { Platform, StatusBar, StyleSheet, LayoutAnimation, FlatList, Image, Animated, Easing } from 'react-native'; global.Platform = Platform; global.StatusBar = StatusBar; global.StyleSheet = StyleSheet; global.LayoutAnimation = LayoutAnimation; global.FlatList = FlatList; global.Image = Image;
global.Animated = Animated; global.Easing = Easing;
import React from 'react'; global.React = React; import * as Cnt from './cnst'; global.Cnt = Cnt; global.stsbrht = 0; global.sai = [0, 0, 0, 0, StatusBar.currentHeight]; global.inpttyp = 'default';
export default class Spacer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { keyboardSpace: 0 };
    this._listeners = null; this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this); this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this); this.keyboardResize = this.keyboardResize.bind(this); this._listeners = Platform.OS === 'ios' ? [Keyboard.addListener('keyboardWillShow', this.updateKeyboardSpace), Keyboard.addListener('keyboardWillHide', this.resetKeyboardSpace), Keyboard.addListener('keyboardWillChangeFrame', this.keyboardResize)] : [Keyboard.addListener('keyboardDidShow', this.updateKeyboardSpace), Keyboard.addListener('keyboardDidHide', this.resetKeyboardSpace), Keyboard.addListener('keyboardDidChangeFrame', this.keyboardResize)];
  }
  componentWillUnmount() { this._listeners.forEach(listener => listener.remove()); }
  keyboardResize(event) { this.updateKeyboardSpace(event, 1); }
  updateKeyboardSpace(event, frce) {
    if (!frce && (!event.endCoordinates || appstt[1] != 1 || !TextInput.State.currentlyFocusedInput())) return;
    let csrn = crnscrn || dshscrn;
    const keyboardSpace = (dmns.height - event.endCoordinates.screenY) + (this.props.topSpacing || 0);
    LayoutAnimation.configureNext(Platform.OS === 'ios' ? LayoutAnimation.create(event.duration, LayoutAnimation.Types[event.easing], LayoutAnimation.Properties.opacity) : LayoutAnimation.Presets.spring);
    this.setState({ keyboardSpace }, () => { appstt[1] = 0.7; appstt[2] = null; csrn.setState({ lrgs: csrn.state.lrgs }, () =>  ks = Math.max(ks, keyboardSpace)); });
  }
  resetKeyboardSpace(event) {
    if (appstt[1] == 1) return;
    let csrn = crnscrn || dshscrn;
    LayoutAnimation.configureNext(Platform.OS === 'ios' ? LayoutAnimation.create(event.duration, LayoutAnimation.Types[event.easing], LayoutAnimation.Properties.opacity) : LayoutAnimation.Presets.spring);
    this.setState({ keyboardSpace: 0 }, () => { appstt[1] = 1; appstt[2] = null; csrn.setState({ lrgs: csrn.state.lrgs }, () => { setTimeout(() => { if(kfct) kfct(); }, 0); }); });
  }
  render() {
    let adj = true; if (Platform.OS == 'android') { if (!this.props.adj) adj = false; }
    return (adj ? <View style={[{ left: 0, right: 0, bottom: 0, height: appstt[2] || this.state.keyboardSpace }, this.props.style]}></View> : null);
  }
}
