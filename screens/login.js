export default class Login extends React.Component {
    constructor(props) {
        super(props); Fct.wdim(1); this.state = Object.assign({}, Cnt.ost, { updapp: ['',''], e29: conid === 0 ? 'flex' : 'none' }); this.invldpk = [];
        this.prelogin = Fct.prelogin.bind(this); this.postlogin = Fct.postlogin.bind(this); this.login = Fct.login.bind(this); this.poslog = Fct.poslog.bind(this); this.chglogin = Fct.chglogin.bind(this); this.cleanapp = Fct.cleanapp.bind(this);
    }
    componentDidMount() {
        setTimeout(this.hwv.bind(this), Cnt.prps.dispdur);
    }
    hwv() {
        if(this.isloaded) this.setState({ hwv: 1 });
        if (Platform.OS === 'ios') { const [r, g, b] = Fct.hexToRgb(Cnt.clrs.blackcolor); NativeModules.Utils.setBgClr(r, g, b, 1); } else NativeModules.Utils.setBgClr(Cnt.clrs.blackcolor);
    }
    render() {
        let rtn = this.props.route.name, istyle = [Stl.linpt, Stl.w100, Stl.shdw, { height: dimsz[15], fontSize: dimsz[0], marginBottom: dmns.h17, paddingHorizontal: dimsz[6], paddingVertical: dmns.h }], lstl = [Stl.txth1, Stl.linktext, { fontSize: dimsz[1] }], iurl, pd1, pdt1, pdt2, pdt3, fh, cld, dsp, clbc, icnm, istl;
        if (dmns.lrgs) { fh = 0.8; pd1 = dmns.h8; pdt2 = 'none'; pdt1 = dmns.h16; pdt3 = dmns.h11; } else { fh = 1; pd1 = dmns.h1; pdt2 = 'flex'; pdt1 = dmns.h14; pdt3 = dimsz[6]; }
        if (gvar[0] && this.state.e29 != 'flex') {
        clbc = () => this.login(1); cld = [this.state.e28 == 'flex' ? <View key='ii1' style={[Stl.srdiv]}><TextInput ref={(ref) => this.inputs[1] = ref} onChangeText={(value) => this.setState({ login: value })} value={this.state.login} placeholder={gvar[2][505]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istyle.concat([{ color: this.state.e25, backgroundColor: this.state.e26, paddingEnd: dimsz[9] }])} maxLength={50} blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => this.inputs[2].focus()} keyboardType={inpttyp} textContentType="oneTimeCode" autoFill={false} autoCompleteType="off" editable={this.state.e23} contextMenuHidden={true} />{this.state.ulogin ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={this.chglogin} style={[Stl.inptclear, { top: 0, right: 0, paddingHorizontal: dimsz[0], paddingVertical: dimsz[16] }]}><Icon2 name={this.state.e24 ? "pencil-alt" : "sync-alt"} style={[Stl.uicon, { fontSize: dimsz[10] }]} /></TouchableOpacity> : null}</View> : null, <TextInput ref={(ref) => this.inputs[2] = ref} key='ii2' onChangeText={(value) => this.setState({ pwd: value })} value={this.state.pwd} placeholder={this.state.e20} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istyle} maxLength={this.state.e22} returnKeyType="go" onSubmitEditing={clbc} keyboardType={this.state.e27} textContentType="oneTimeCode" autoFill={false} autoCompleteType="off" blurOnSubmit={false} secureTextEntry={true} selectTextOnFocus={true} contextMenuHidden={true} />]; dsp = 'flex'; icnm = "log-in"; istl = Stl.hicon;
        } else {
        clbc = () => this.prelogin(1); cld = <TextInput ref={(ref) => this.inputs[0] = ref} onChangeText={(value) => this.setState({ pjid: value })} value={this.state.pjid} placeholder={gvar[2][45054]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istyle} maxLength={4} onSubmitEditing={clbc} keyboardType={inpttyp} textContentType="oneTimeCode" autoFill={false} autoCompleteType="off" returnKeyType="go" autoCapitalize="none" autoCorrect={false} contextMenuHidden={true} />; dsp = 'none'; icnm = "checkbox"; istl = Stl.uicon;
        }
        if (gvar[3] || this.state.ulogin || (parseInt(userarray.id) > 0)) iurl = <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => mnldr.showclose('flex', [10, null], null, { login: this.state.ulogin, fdigit: '' })} style={{display: dsp}}><Text style={lstl}>{gvar[2][1011]}</Text></TouchableOpacity>;
        //else iurl = <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => { scrnid['Profile'][4][0] = Object.assign({}, iuarray); this.nvgscrn('Profile', rtn); }} style={{display: dsp}}><Text style={lstl}>{gvar[2][20033]}{' '}{gvar[2][20034]}</Text></TouchableOpacity>;
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.blackcolor, gvar[2][103], gvar[2][1024]]} renderfoot={[Cnt.clrs.lightbg, pd1, fh]}>
                <ScrollView nestedScrollEnabled={true} ref={(ref) => this.mnscrlvw = ref} contentContainerStyle={[Stl.svcont, Stl.w100, Stl.pzp, { paddingTop: dmns.h17, borderColor: Cnt.prps.d2opcty, borderTopWidth: 1 }]} keyboardShouldPersistTaps={"handled"} showsVerticalScrollIndicator={false}>
                    <Text style={[Stl.txth1, { fontSize: appstt[1] * dmns.h8, paddingBottom: dmns.h1, textAlign: 'center', display: pdt2 }]}>{gvar[2][104].toUpperCase()}</Text>
                    <View style={{ width: dmns.w60 }}>
                        {cld}
                        <View style={[Stl.rbox2, { marginTop: pdt1, alignSelf: 'center' }]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={clbc}><Icon3 name={icnm} style={[istl, { fontSize: dimsz[26] }]} /></TouchableOpacity>{this.state.e1 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Tchid.simplePrompt({ promptMessage: gvar[2][5019], title: gvar[2][5020], subTitle: gvar[2][5021], cancelButtonText: gvar[2][67012] }).then(({ success }) => { if(success) this.login(2); }).catch((error) => { })} style={{display: dsp}}><Icon3 name="finger-print" style={[Stl.hicon, { fontSize: dimsz[26], marginStart: dimsz[6] }]} /></TouchableOpacity> : null}</View>
                    </View>
                    <View style={[Stl.rbox1, { marginTop: pdt3 }]}>
                    {iurl}{this.state.updapp[0][0]=='+'||this.state.updapp[1][0]=='+'?<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Linking.openURL(this.state.updapp[2]).catch((error) => Linking.openURL(this.state.updapp[3]).catch((error) => mntst.show([[gvar[2][11209], 2]])))} style={{ marginTop: dmns.h17 }}><Text style={lstl}>{gvar[2][20037]}</Text></TouchableOpacity>:null}
                    </View>
                    {this.state.hwv ? null : <View style={{ position: 'absolute', left: -99, top: -99, overflow: 'hidden', width: 1, height: 1 }}><WebView source={{ uri: 'https://www.google.com/accounts/Logout' }} originWhitelist={['*']} mixedContentMode="always" javaScriptEnabled={true} domStorageEnabled={true} thirdPartyCookiesEnabled={true} allowUniversalAccessFromFileURLs={true} style={{ opacity: 0.99, minWidth: 1, minHeight: 1 }} /></View>}
                </ScrollView>
            </Mcnt>
        );
    }
}
