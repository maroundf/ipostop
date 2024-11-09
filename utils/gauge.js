export default class Gauge extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let v1, v2, v3, { size = dmns.w30, value, minValue = 0, maxValue = 5, labels = {}, labelScore = true, labelNote = true, unit = "", mt = 2, style, labelStyle = {}, labelNoteStyle = {} } = this.props, gc = [], degree = 180, pdeg = degree / Object.keys(labels).length, csize = parseFloat(size), cs2 = csize / 2, cs3 = csize / 6;
    this.animatedValue = new Animated.Value(0); this.rot = '0deg';
    if (!Fct.isnull(value)) { value = parseFloat(value); let label = Fct.limitValue(value, labels); v1 = parseFloat(value.toFixed(1)).toString() + unit; v2 = label.textl; v3 = label.bgcolor; } else { value = -100; v2 = gvar[2][57012]; v3 = Cnt.clrs.mgraycolor; }
    for(index in labels) {
        const cdeg = 90 + (parseFloat(index) * pdeg);
        gc.push(<View key={index} style={{ position: 'absolute', top: 0, left: 0, borderRadius: cs2, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: labels[index].bgcolor, width: cs2, height: csize, transform: [{ translateX: csize / 4 }, { rotate: `${cdeg}deg` }, { translateX: csize / 4 * -1 }] }}></View>);
      }
    Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: value, duration: 1, easing: Easing.linear(Easing.ease) }).start();
    this.rot = this.animatedValue.interpolate({ inputRange: [minValue, maxValue], outputRange: ['-90deg', '90deg'] });
    return (
      <View style={[Stl.nodata, { minWidth: csize, padding: 2 }, style]}>
        <View style={{ justifyContent: 'flex-end', alignItems: 'center', position: 'relative', overflow: 'hidden', borderColor: Cnt.clrs.blackcolor, width: csize, height: cs2, borderTopLeftRadius: cs2, borderTopRightRadius: cs2 }}>{gc}
          <View style={{ justifyContent: 'flex-end', alignItems: 'center', overflow: 'hidden', zIndex: 19, backgroundColor: Cnt.clrs.blackcolor, width: 0.6 * csize, height: 0.6 * cs2, borderTopLeftRadius: cs2, borderTopRightRadius: cs2 }} />
          <Animated.View style={{ position: 'absolute', left: 0, zIndex: 20, top: -csize / 30, transform: [{ rotate: this.rot }] }}>
            <Image source={nedle} style={{ resizeMode: 'stretch', width: csize, height: csize }} />
          </Animated.View>
        </View>
        <View style={[Stl.txtcont]}>{labelScore ? <Text style={[Stl.nttext, Stl.rtext2, { fontSize: dimsz[2] }, labelStyle]}>{v1}</Text> : null}
          {labelNote ? <Text style={[Stl.nttext, Stl.txth1, { fontSize: dimsz[3], paddingTop: 2, color: v3 }, labelNoteStyle]}>{v2.toUpperCase()}</Text> : null}
        </View>
      </View>
    );
  }
}

