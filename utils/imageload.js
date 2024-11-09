const getSourceKey = source => (source && source.uri) || String(source);
export const createImageProgress = ImageComponent =>
  class ImageProgress extends React.Component {
    static prefetch = Image.prefetch;
    static getSize = Image.getSize;
    static getDerivedStateFromProps(props, state) {
      const sourceKey = getSourceKey(props.source);
      if (sourceKey != state.sourceKey) return { sourceKey, error: null, loading: false, progress: 0 };
      return null;
    }
    constructor(props) {
      super(props);
      this.state = { sourceKey: getSourceKey(props.source), error: null, loading: false, progress: 0 };
    }
    setNativeProps(nativeProps) {
      if (this.ref) this.ref.setNativeProps(nativeProps);
    }
    measure(cb) {
      if (this.ref) this.ref.measure(cb);
    }
    ref = null; handleRef = ref => { this.ref = ref; };
    bubbleEvent(propertyName, event) {
      if (typeof this.props[propertyName] == 'function') this.props[propertyName](event);
    }
    handleLoadStart = () => {
      if (!this.state.loading && this.state.progress != 1) this.setState({ error: null, loading: true, progress: 0 });
      this.bubbleEvent('onLoadStart');
    };
    handleProgress = event => {
      const progress = event.nativeEvent.loaded / event.nativeEvent.total;
      if (progress != this.state.progress && this.state.progress != 1) this.setState({ loading: progress < 1, progress: progress });
      this.bubbleEvent('onProgress', event);
    };
    handleError = event => {
      this.setState({ loading: false, error: event.nativeEvent });
      this.bubbleEvent('onError', event);
    };
    handleLoad = event => {
      LayoutAnimation.easeInEaseOut(); this.setState({ error: null, loading: false, progress: 1, cwdth: event.nativeEvent.source.width, chght: event.nativeEvent.source.height });
      this.bubbleEvent('onLoad', event);
    };
    handleLoadEnd = event => {
      this.setState({ loading: false, progress: 1 });
      this.bubbleEvent('onLoadEnd', event);
    };
    render() {
      const { children, source, style, cstyle, isvid, mwdth = dmns.w1, mhght = dmns.h1, tintColor, ...props } = this.props;
      if (!source || !source.uri) return (<View ref={this.handleRef}><ImageComponent  {...props} source={source} style={style} />{children}</View>);
      const { progress, sourceKey, loading, error, cwdth, chght } = this.state; let indicator, icns, cntr, cstl, istl = style, c1, c2, c3, c4;
      if (dmns.lrgs) { icns = dmns.h0; c3 = dmns.h15; cntr = { flexDirection: 'column', width: c3, height: dmns.h15 }; cstl = { flexDirection: 'column', width: dmns.h25, height: dmns.h25 }; } else { icns = dmns.w0; c3 = dmns.w4; cntr = { flexDirection: 'column', width: c3, height: dmns.w4 }; cstl = { flexDirection: 'column', width: dmns.w1, height: dmns.w1 }; } c4 = c3;
      if(isvid) c1 = Stl.vlyr; else { c1 = Stl.istl; c2 = <Icon3 name="images" style={{ fontSize: icns, color: Cnt.clrs.mgraycolor }} />; }
      if (error) { cstl = cntr; indicator = <View style={[Stl.centered, c1]}>{c2}</View>; }
      else { if (loading || progress < 1 || !cwdth || !chght) indicator = <View style={[Stl.centered, { padding: '30%' }]}><Image source={loadind} style={[Stl.image]} /></View>; else { c3 = Math.min(cwdth, mwdth); c4 = cwdth * mhght / chght; cstl = cstyle; istl = [/*style,*/ { width: c3, height: undefined, aspectRatio: cwdth / chght, maxHeight: mhght, minWidth: dimsz[6], minHeight: dimsz[6], resizeMode: 'contain', alignSelf: 'flex-start', tintColor: tintColor, borderRadius: Cnt.prps.borderradius }];/*, height: Math.min(chght, mhght)*/ } }
      return (
        <View ref={this.handleRef} style={cstl}>
          {indicator}
          <ImageComponent {...props} key={sourceKey} onLoadStart={this.handleLoadStart} onProgress={this.handleProgress} onError={this.handleError} onLoad={this.handleLoad} onLoadEnd={this.handleLoadEnd} source={source} style={istl} />
          {children}{isvid?<View style={[Stl.centered, Stl.vlyr, { position: 'absolute', top: 0, left: 0, width: c3, height: '100%', maxWidth: c4 }]}><Icon3 name="play-circle" style={{ fontSize: icns, color: Cnt.clrs.mgraycolor }} /></View>:null}
        </View>
      );
    }
  };
export default createImageProgress(Image);
