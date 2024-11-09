export default class Home extends React.Component {
    constructor(props) {
        super(props); Fct.wdim(1); this.state = Object.assign({}, Cnt.ost);
    }
    render() {
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.blackcolor, gvar[2][104].toUpperCase()]} renderfoot={[]}>
                <ScrollView nestedScrollEnabled={true} ref={(ref) => this.mnscrlvw = ref} contentContainerStyle={[Stl.svcont, Stl.w100, Stl.pzp, { paddingBottom: dimsz[6], borderColor: Cnt.prps.d2opcty, borderTopWidth: 1 }]} keyboardShouldPersistTaps={"handled"} showsVerticalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}><View style={[Stl.pcont, { height: dmns.h25, padding: dmns.h12 }]}><Image source={aplogo} style={[Stl.image]} /></View>
                    <Text style={[Stl.txth1, { fontSize: dmns.h10, textAlign: 'center' }]}>{gvar[2][103]}</Text>
                </TouchableOpacity>
                {gvar[13][90]?<Cbx label={gvar[2][1032]} nowrap={true} style={{ marginVertical: dimsz[0] }} btnStyle={[Stl.lbdicon, { fontSize: dimsz[10] }]} sbtnStyle={[Stl.uicon]} stxts={[Stl.uicon]} labelStyle={[Stl.lbrdtext, { fontSize: dimsz[0] }]} checked={conid} onPress={(checked) =>  { conid = checked; this.setState({ lrgs: this.state.lrgs }); }} />:null}
                <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => { conid = 0; this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); }} style={{ marginVertical: dimsz[6] }}><Icon3 name="key" style={[Stl.uicon, { fontSize: dimsz[12] }]} /></TouchableOpacity>
                </ScrollView>
            </Mcnt>
        );
    }
}
