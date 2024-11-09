export default class Sly extends React.Component {
    constructor(props) {
        super(props); this.setspkr = Fct.setspkr.bind(this);
        this.state = { e3: null, display: 'none' }; this.animatedValue = new Animated.Value(dmns.height); this.isloaded = 1;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => { lstactv = new Date(); return false; },
            onMoveShouldSetPanResponder: (evt, gestureState) => { lstactv = new Date(); return false; },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => { lstactv = new Date(); return false; },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => { lstactv = new Date(); return false; },
            onPanResponderTerminationRequest: () => true,
            onShouldBlockNativeResponder: () => false
        });
    }
    showclose(dv, e3, cbfct, eobj) {
        if (this.isloaded) {
            if (dv == 'flex') { Keyboard.dismiss(); if(mntst) mntst.close(); this.setState(Object.assign(eobj || {}, { e3: e3, display: dv }), () => {
                Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(0), duration: 1, easing: Easing.linear(Easing.ease) }).start(cbfct);
            }); } else if(e3===0) { this.animatedValue.setValue(dmns.height); this.clrt(); this.setState({ e3: null, display: dv }); } else Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(dmns.height), duration: 1, easing: Easing.linear(Easing.ease) }).start(() => { this.clrt(); this.setState({ e3: null, display: dv }, e3 ? e3[1] : null); });
        }
    }
    toggle(cbfct, nocl) {
        this.showclose(this.state.display == 'flex' ? 'none' : 'flex', cbfct ? [null, cbfct] : this.state.e3, nocl);
    }
    getst() {
        return this.state.display;
    }
    clrt() {
        clearTimeout(this.ttmr); clearInterval(this.ttmr);
    }
    componentWillUnmount() {
        delete this.isloaded; this.clrt(); lstactv = new Date();
    }
    render() {
        if (this.state.display == 'flex' && this.state.e3) {
            let idx = parseInt(this.state.e3[0]), sc, children, btmmenu, topmenu, bs, tc = 'rgba(0,0,0,0)', bc = 'rgba(0,0,0,0)', mc, btxt = [Stl.smalltext, { fontSize: dimsz[1] }], lbgc = 'transparent', mdls={bottom: 0}, abtn = [Stl.rectres, Stl.shdw, { paddingVertical: dimsz[4], paddingHorizontal: dimsz[0], minWidth: dmns.w1 }], tempv;
            switch (idx) {
                case 13:
                    lbgc = 'rgba(38,37,37,0.95)';
                    if(!isaudio && wstream) { bc='#000000'; tempv = <View key={0} style={[Stl.remotevid]}><RTCView zOrder={1} style={{ flex: 1, backgroundColor: '#000000' }} streamURL={wstream.toURL()} objectFit='cover' mirror={true} /></View>; } else bc='rgba(0,0,0,0)';
                    var usrarr = this.state.e3[3] || {}, icns=[Stl.pzp, { width: dimsz[7], height: dimsz[7], borderRadius: dimsz[8], margin: dimsz[25] }], typ, acal = [], estl;
                    if(this.state.e3[2] == 1) { typ = gvar[2][9026]; estl = Stl.itmhdiv; acal.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => { var Id_sender=callData.initid, idconvpool = callData.idconvpool; Fct.endcall(); scrnid['Chatroom'][13] = 1; mnldr.showclose('none'); let csrn = crnscrn || dshscrn; csrn.rdrnot({id:Id_sender, idconvpool, ntype: 1}, true, null, null, 1); }} style={icns.concat([Stl.yellowtab])}><Icon3 name="text" style={[Stl.wicon, { fontSize: dimsz[9] }]} /></TouchableOpacity>, <TouchableOpacity key={1} activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.acceptcall()} style={icns.concat([Stl.bluetab])}><Icon3 name="checkmark" style={[Stl.wicon, { fontSize: dimsz[9] }]} /></TouchableOpacity>); } else { typ = gvar[2][9045]; estl = Stl.btmtab; acal.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.setspkr(!speaker)} style={icns.concat([speaker ? Stl.bluetab : Stl.ltbg4])}><Icon3 name="volume-high" style={[Stl.wicon, { fontSize: dimsz[9] }]} /></TouchableOpacity>); }
                    sc = [<View key={3} style={[Stl.pzp, Stl.remotevid, { paddingHorizontal: dimsz[0], paddingVertical: dimsz[6] }]}>{Fct.setpht(usrarr, null, [3 * dimsz[7], 3 * dimsz[8], null], -1)}</View>, tempv,
                                <View key={1} style={[Stl.icnvid,{top: sai[0], padding: dimsz[6]+ dimsz[6] }]}>
                        <View style={[Stl.pzp,Stl.blcont]}><Image source={wlogo} style={{width:dimsz[0],height:dimsz[0],marginEnd:dimsz[4]}} /><Text style={[Stl.qtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{(gvar[2][104] + ' ' + typ + ' ' + (isaudio ? gvar[2][95035] : gvar[2][95028])).toUpperCase()}</Text></View><Text style={[Stl.smalltext, { fontSize: dimsz[25], textAlign: 'center', marginTop: dimsz[6] }]}>{usrarr.value || Fct.setval(usrarr)}</Text></View>];
                    bs = Stl.icnvid; btmmenu = [<View key={4} style={estl}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.endcall()} style={icns.concat([Stl.redtab])}><Icon3 name="close" style={[Stl.wicon, { fontSize: dimsz[9] }]} /></TouchableOpacity>{acal}</View>];
                    break;
                case 15:
                    sc = [<View key={10} style={[Stl.pzp, Stl.remotevid, Stl.mdlbg, { padding: dimsz[9] }]}><Text style={[Stl.smalltext, { fontSize: dimsz[10], textAlign: 'center', marginBottom: dimsz[11] }]}>{this.state.e3[2].toUpperCase()}</Text><View style={[Stl.btmtab]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle(() => Fct.rp(1))} style={abtn.concat([{ backgroundColor: Cnt.clrs.greencolor, marginEnd: dimsz[0] }])}><Text style={btxt}>{gvar[2][11012].toUpperCase()}</Text></TouchableOpacity><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle(() => Fct.rp(0))} style={abtn.concat([{ backgroundColor: Cnt.clrs.redcolor, marginStart: dimsz[0] }])}><Text style={btxt}>{gvar[2][11013].toUpperCase()}</Text></TouchableOpacity></View></View>];
                    break;
            } mc = lbgc && lbgc != 'transparent' ? { backgroundColor: lbgc } : null;
            return (
                <Animated.View {...this.panResponder.panHandlers} key={this.state.a} keyboardShouldPersistTaps={"handled"} style={[Stl.mdlbg, Stl.cptlst, mdls, { transform: [{ translateY: this.animatedValue }], elevation: 1, zIndex: 10010 }, mc]}>
                {topmenu?<SafeAreaView style={{ flex:0, backgroundColor: tc }}>{topmenu}</SafeAreaView>:null}
                <SafeAreaView style={{ flex:1 }}>{sc ? sc : null}</SafeAreaView>
                {btmmenu?<SafeAreaView style={[{ flex:0, backgroundColor: bc, bottom: 0 }, bs]}>{btmmenu}</SafeAreaView>:null}
                </Animated.View>
            );
        } else return <Animated.View style={{ transform: [{ translateY: this.animatedValue }], display: 'none' }}></Animated.View>;
    }
}
