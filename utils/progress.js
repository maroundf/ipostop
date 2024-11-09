export default class Progress extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let v1, v2, v3, v4, v5, { size = dmns.w30, value, minValue = 0, maxValue = 100, labels = {}, labelScore = true, labelNote = true, unit = "%", height = dimsz[21], style, labelStyle = {}, labelNoteStyle = {} } = this.props, csize = parseFloat(size);
    if (!Fct.isnull(value)) { value = parseFloat(value); let label = Fct.limitValue(value, labels); v1 = parseFloat(value.toFixed(1)).toString() + unit; v2 = label.textl; v3 = label.bgcolor; v4 = Fct.interpolate(value, [minValue, maxValue], [-csize, 0]); v5 = label.bgcolor; } else { v2 = gvar[2][57012]; v3 = Cnt.clrs.mgraycolor; v4 = -(csize + 10); v5 = "transparent"; }
    return (
      <View style={[Stl.nodata, { minWidth: csize, padding: 2 }, style]}>
        <View style={{ overflow: 'hidden', width: csize, height: height, borderRadius: Cnt.prps.borderradiusxlrg }}>
          <View style={{ backgroundColor: Cnt.clrs.lgraycolor2, width: csize, height: height, borderRadius: Cnt.prps.borderradiusxlrg }} />
          <View style={{ position: 'absolute', zIndex: 10, top: 0, transform: [{ translateX: v4 }], backgroundColor: v5, width: csize, height: height }} />
        </View>
        <View style={[Stl.txtcont]}>{labelScore ? <Text style={[Stl.nttext, Stl.rtext2, { fontSize: dimsz[2] }, labelStyle]}>{v1}</Text> : null}
          {labelNote ? <Text style={[Stl.nttext, Stl.txth1, { fontSize: dimsz[3], paddingTop: 2, color: v3 }, labelNoteStyle]}>{v2.toUpperCase()}</Text> : null}
        </View>
      </View>
    );
  }
}
