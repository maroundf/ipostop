export default class Wcl extends React.Component {
    constructor(props) {
        super(props); this.setspkr = Fct.setspkr.bind(this); this.vcminmax = this.vcminmax.bind(this); this.hdltch = this.hdltch.bind(this);
        this.state = { e3: null, display: 'none' }; this.animatedValue = new Animated.Value(dmns.height); this.isloaded = 1;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => { lstactv = new Date(); this.hdltch(); return false; },
            onMoveShouldSetPanResponder: (evt, gestureState) => { lstactv = new Date(); return false; },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => { lstactv = new Date(); return false; },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => { lstactv = new Date(); return false; },
            onPanResponderTerminationRequest: () => true,
            onShouldBlockNativeResponder: () => false
        });
    }
    showclose(dv, e3, cbfct, eobj) {
        if (this.isloaded) {
            this.bcolor = [new Animated.Value(0),dmns.width];
            if (dv == 'flex') { Keyboard.dismiss(); if(mntst) mntst.close(); this.setState(Object.assign(eobj || {}, { e3: e3, display: dv }), () => {
                StatusBar.setHidden(true); Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(0), duration: 1, easing: Easing.linear(Easing.ease) }).start(cbfct); this.hdltch();
            }); } else { StatusBar.setHidden(false); if(e3===0) { this.animatedValue.setValue(dmns.height); this.clrt(); this.setState({ e3: null, display: dv }); } else Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(dmns.height), duration: 1, easing: Easing.linear(Easing.ease) }).start(() => { this.clrt(); this.setState({ e3: null, display: dv }, e3 ? e3[1] : null); }); }
        }
    }
    toggle(cbfct, nocl) {
        this.showclose(this.state.display == 'flex' ? 'none' : 'flex', cbfct ? [null, cbfct] : this.state.e3, nocl);
    }
    getst() {
        return this.state.display;
    }
    clrt() {
        clearTimeout(this.ttmr); clearInterval(this.ttmr); clearTimeout(this.htmr);
    }
    hdltch() {
        switch (parseInt(this.state.e3[0])) {
            case 14:
            if(!this.state.e3[1]) {
                clearTimeout(this.htmr); let e3 = this.state.e3.slice(0); e3[2] = 'flex'; this.setState({ e3 }, () => this.htmr = setTimeout(() => { let e3 = this.state.e3.slice(0); e3[2] = 'none'; this.setState({ e3 }); }, gvar[13][39] * 1000));
            }
            break;
        }
    }
    vcminmax() {
        this.clrt(); let e3 = this.state.e3.slice(0), chgc = ()=>this.bcolor[1]=this.bcolor[1]==0?dmns.width:0, cbfct; e3[1] = !e3[1];
        if(e3[1]) { this.bcolor = [new Animated.Value(0),dmns.width]; cbfct = () => Animated.timing(this.bcolor[0], { toValue: new Animated.Value(this.bcolor[1]), duration: 1000, easing: Easing.inOut(Easing.ease) }).start(()=>{chgc();this.ttmr = setInterval(() => Animated.timing(this.bcolor[0], { toValue: new Animated.Value(this.bcolor[1]), duration: 1000, easing: Easing.inOut(Easing.ease) }).start(chgc), 3000);}); } else { e3[2] = 'flex'; cbfct = this.hdltch; Keyboard.dismiss(); } this.setState({e3}, cbfct);
    }
    componentWillUnmount() {
        delete this.isloaded; this.clrt(); lstactv = new Date();
    }
    render() {
        if (this.state.display == 'flex' && this.state.e3) {
            let csrn = crnscrn || dshscrn, rtn; if(csrn) rtn =  csrn.props.route.name;
            let idx = parseInt(this.state.e3[0]), tempv, sc, children, btmmenu, topmenu, bs, tc = Cnt.clrs.yellowcolor, bc = Cnt.clrs.yellowcolor, mc, lbgc = Cnt.clrs.blackcolor, mdls={bottom: 0};
            switch (idx) {
                case 14:
                    bc=tc='rgba(0,0,0,0)'; var usrarr = this.state.e3[3] || {}, icw = dimsz[9] + 0.1 * dimsz[6], icns=[Stl.pzp, { width: icw, height: icw, borderRadius: dimsz[6], marginHorizontal: dimsz[4], marginVertical: dimsz[1] }], acal = [<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.setspkr(!speaker)} style={icns.concat([speaker ? Stl.bluetab : Stl.ltbg4])}><Icon3 name="volume-high" style={[Stl.wicon, { fontSize: dimsz[24] }]} /></TouchableOpacity>], ecal, rdsp = Stl.remotevid, ldsp = Stl.localvid, stsb,sht=(sai[0]?sai[0]+dimsz[5]:stsbrht)||sai[4],pss={paddingEnd: dimsz[1],paddingStart: dimsz[1] };
                    if (phys && !isaudio) ecal = [<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} key={30} onPress={() => Fct.qp(0)} style={icns.concat([callData._pp[0] ? Stl.bluetab : Stl.ltbg4])}><Icon3 name="image" style={[Stl.wicon, { fontSize: dimsz[24] }]} /></TouchableOpacity>, <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} key={31} onPress={() => Fct.qp(1, gvar[13][36])} style={icns.concat([callData._pp[1] ? Stl.bluetab : Stl.ltbg4,{display:'none'}])}><Icon3 name="recording" style={[Stl.wicon, { fontSize: dimsz[24] }]} /></TouchableOpacity>];
                    if(!this.state.e3[1]) {
                    if(isaudio) { } else { acal.push(<TouchableOpacity key={1} activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.vcstop('video', this.state.e3[5])} style={icns.concat([this.state.e3[5] ? Stl.bluetab : Stl.ltbg4])}><Icon2 name="video-slash" style={[Stl.wicon, { fontSize: dimsz[10] }]} /></TouchableOpacity>, <TouchableOpacity key={2} activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.swtcam()} style={icns.concat([Stl.ltbg4])}><Icon3 name="reverse-camera" style={[Stl.wicon, { fontSize: dimsz[24] }]} /></TouchableOpacity>, <TouchableOpacity key={3} activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.swtcam()} style={icns.concat([Stl.ltbg4, {display: 'none'}])}><Icon3 name="image" style={[Stl.wicon, { fontSize: dimsz[24] }]} /></TouchableOpacity>); }
                    bs = Stl.icnvid; if(this.state.e3[2] == 'flex') bc=Cnt.clrs.blackcolor; btmmenu = [<View key={4} style={{backgroundColor: bc}}><View style={[Stl.btmtab, {flex:1,display:this.state.e3[2]}]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.vcstop('audio', this.state.e3[4])} style={icns.concat([this.state.e3[4] ? Stl.bluetab : Stl.ltbg4])}><Icon3 name="mic-off" style={[Stl.wicon, { fontSize: dimsz[24] }]} /></TouchableOpacity>{acal}{ecal}<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.endcall()} style={icns.concat([Stl.redtab])}><Icon3 name="close" style={[Stl.wicon, { fontSize: dimsz[24] }]} /></TouchableOpacity></View></View>];
                    stsb = <Animated.View key={1} style={[Stl.icnvid,{top: 0,backgroundColor:'rgba(0,0,0,0)'}]}><View style={{flex:1,display:this.state.e3[2]}}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={this.vcminmax} style={[Stl.itmhdiv,pss]}>
                        <View style={[Stl.bkdiv]}><Icon3 name="remove" style={[Stl.wicon, { fontSize: dimsz[14] }]} /></View><View style={[Stl.srdiv]}><Icon3 name="call" style={{ width: 0, height: 0 }} /><Tmr ref={(ref) => mnwcl.otmr = ref} style={[Stl.wicon, { fontSize: dimsz[2], textAlign: 'right' }]} /></View></TouchableOpacity><View style={{ marginTop: dimsz[4]}}>
                        <Text style={[Stl.smalltext, { fontSize: dimsz[25], textAlign: 'center' }]}>{usrarr.value || Fct.setval(usrarr)}</Text><View style={[Stl.pzp,Stl.blcont,{marginTop: dimsz[5]}]}><Image source={wlogo} style={{width:dimsz[0],height:dimsz[0],marginEnd:dimsz[4]}} /><Text style={[Stl.qtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{(gvar[2][104] + '...').toUpperCase()}</Text></View></View></View></Animated.View>;
                    }
                    else {
                        rdsp = { left: -9999, top: -9999, width: dmns.width, height: dmns.height }; ldsp = { display:'none' }; mdls=[Stl.btmsec, { height: sht, overflow: 'hidden' }]; lbgc = 'transparent';
                        const h = Animated.interpolate(this.bcolor[0], {inputRange: [0, dmns.width], outputRange: [0, 36], extrapolate: 'clamp'});
                        const s = Animated.interpolate(this.bcolor[0], {inputRange: [0, dmns.width], outputRange: [0, 0.74], extrapolate: 'clamp'});
                        const v = Animated.interpolate(this.bcolor[0], {inputRange: [0, dmns.width], outputRange: [0.18, 0.98], extrapolate: 'clamp'});
                    stsb = <Animated.View key={1} style={[Stl.icnvid,{top: 0,backgroundColor:Fct.colorHSV(h, s, v, 0.95)}]}><View style={{flex:1}}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={this.vcminmax} style={[Stl.itmhdiv,pss,{height: sht, paddingVertical: 2}]}>
                        <View style={[Stl.bkdiv]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{usrarr.value || Fct.setval(usrarr)}</Text><Image source={wlogo} style={{width:dimsz[0],height:dimsz[0],marginStart:dimsz[5]}} /></View><View style={[Stl.srdiv]}><Icon3 name={isaudio?"call":"videocam"} style={[Stl.lbicon, { fontSize: dimsz[24],marginEnd:dimsz[5],lineHeight:sht }]} /><Tmr ref={(ref) => mnwcl.otmr = ref} style={[Stl.wicon, { fontSize: dimsz[2], textAlign: 'right' }]} /></View></TouchableOpacity></View></Animated.View>;
                    }
                    sc = isaudio ? [/*<RTCView key={'rv'+this.state.e3[1]} style={{ display: 'none' }} ref={(ref) => mnwcl.rvid = ref} streamURL={peerconn[callData.tid]&&peerconn[callData.tid].stream?peerconn[callData.tid].stream.toURL():''} />,*/<View key={3} style={[Stl.pzp, Stl.remotevid, { paddingHorizontal: dimsz[0], paddingVertical: dimsz[6] }]}>{Fct.setpht(usrarr, null, [3 * dimsz[7], 3 * dimsz[8], null], -1)}</View>,stsb] : [<Pnz key={0} style={[rdsp]} minscale={1} maxscale={2}>
                        <RTCView key={'rv'+this.state.e3[1]} style={{ flex: 1 }} ref={(ref) => mnwcl.rvid = ref} streamURL={peerconn[callData.tid]&&peerconn[callData.tid].stream?peerconn[callData.tid].stream.toURL():''} collapsable={false} />
                        </Pnz>,
                        stsb,<Pnz key={2} style={[ldsp, Stl.btmsec, Stl.dbrd, {top: sht+sai[0],right: sht+sai[1],overflow:'hidden'}]} minscale={1} maxscale={1.5}>
                        <RTCView key={'lv'+this.state.e3[1]+this.state.e3[5]} zOrder={1} style={{ flex: 1, backgroundColor: '#000000' }} streamURL={wstream?wstream.toURL():''} objectFit='cover' mirror={true} />
                        </Pnz>];
                    break;
            } mc = lbgc && lbgc != 'transparent' ? { backgroundColor: lbgc } : null;
            return (
                <Animated.View {...this.panResponder.panHandlers} keyboardShouldPersistTaps={"handled"} style={[Stl.mdlbg, Stl.cptlst, mdls, { transform: [{ translateY: this.animatedValue }] }, mc]}>
                {topmenu?<SafeAreaView style={{ flex:0, backgroundColor: tc }}>{topmenu}</SafeAreaView>:null}
                <SafeAreaView style={{ flex:1 }}>{sc ? sc : null}</SafeAreaView>
                {btmmenu?<SafeAreaView style={[{ flex:0, backgroundColor: bc, bottom: 0 }, bs]}>{btmmenu}</SafeAreaView>:null}
                </Animated.View>
            );
        } else return <Animated.View style={{ transform: [{ translateY: this.animatedValue }], display: 'none' }}></Animated.View>;
    }
}
