export default class Loader extends React.Component {
    constructor(props) {
        super(props); this.cntscrl = Fct.cntscrl.bind(this); this.lytscrl = Fct.lytscrl.bind(this); this.hdlscrl = Fct.hdlscrl.bind(this); this.fcs = Fct.fcs.bind(this); this.tbm = this.tbm.bind(this); this.focusinput = Fct.focusinput.bind(this); this.defpin = Fct.defpin.bind(this); this.chgpass = Fct.chgpass.bind(this); this.respass = Fct.respass.bind(this); this.sagcf = Fct.sagcf.bind(this); this.actdev = Fct.actdev.bind(this); this.tbi = Fct.tbi.bind(this); this.chgti = Fct.chgti.bind(this); this.sndreq = Fct.sndreq.bind(this);
        this.state = { e3: null, display: 'none', si0: 0, si1: 0, si2: 0, si3: 0, si4: '', si5: '', si6: 0, si7: 0, si8: 0, si9: 0 }; this.animatedValue = new Animated.Value(dmns.height); this.isloaded = 1; this.inputs = [];
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => { let csrn = crnscrn || dshscrn; if (csrn && appstt[1] != 1) this.ttmr = setTimeout(() => Keyboard.dismiss(), 300); lstactv = new Date(); return false; },
            onMoveShouldSetPanResponder: (evt, gestureState) => { if (gestureState.numberActiveTouches > 0 && (Math.abs(gestureState.dx) > 4 || Math.abs(gestureState.dy) > 4)) clearTimeout(this.ttmr); lstactv = new Date(); return false; },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => { clearTimeout(this.ttmr); lstactv = new Date(); return false; },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => { lstactv = new Date(); return false; },
            onPanResponderTerminationRequest: () => true,
            onShouldBlockNativeResponder: () => false
        });
    }
    showclose(dv, e3, cbfct, eobj) {
        if (this.isloaded) {
            this.e3 = e3; this.cbfct = cbfct; if(!eobj) eobj = {}; this.eobj = JSON.parse(JSON.stringify(eobj));
            if (dv == 'flex') { Keyboard.dismiss(); if(mntst) mntst.close(); this.setState(Object.assign(eobj, { e3: e3, display: dv, reqfld: {} }), () => Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(0), duration: 1, easing: Easing.linear(Easing.ease) }).start(cbfct)); this.changeeval = []; } else if(e3===0) { this.animatedValue.setValue(dmns.height); this.clrt(); this.setState({ e3: null, display: dv }); } else Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(dmns.height), duration: 1, easing: Easing.linear(Easing.ease) }).start(() => { this.clrt(); this.setState({ e3: null, display: dv }, e3 ? e3[1] : null); });
        }
    }
    toggle(cbfct, nocl) {
        this.showclose(this.state.display == 'flex' ? 'none' : 'flex', cbfct ? [null, cbfct] : this.state.e3, nocl);
    }
    rfrsh() {
        let cbfct = () => this.setState({refreshing: true}, () => { this.e3[8] = null; this.showclose('flex', this.e3, this.cbfct, Object.assign(this.eobj, {refreshing: false, a: !this.state.a})); });
        if(this.changeeval[this.state.e3[0]]) Alert.alert(gvar[2][4509], gvar[2][14601]+' '+gvar[2][14602], [{ text: gvar[2][2301], onPress: cbfct }, { text: gvar[2][67012], onPress: () => this.setState({refreshing: false}) }], { cancelable: false }); else cbfct();
    }
    getst() {
        return this.state.display;
    }
    clrt() {
        clearTimeout(this.ttmr); clearInterval(this.ttmr); clearTimeout(this.htmr); clearTimeout(this.kbmr); this.mscrlvw = null;
    }
    tbm(ctx) {
        return <View style={[Stl.itmhdiv]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={{ flex: 1 }}><Icon3 name="arrow-back" style={[Stl.wicon, { fontSize: ctx[1], textAlign: 'left', padding: ctx[3], paddingTop: ctx[4], paddingStart: ctx[3] }]} /></TouchableOpacity><View style={{ flex: 6 }}><Text numberOfLines={1} style={[Stl.smalltext, { fontSize: ctx[2], textAlign: 'center', paddingBottom: ctx[3], paddingTop: ctx[4] }]}>{this.state.e3[5]}</Text></View><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.rfrsh()} style={{ flex: 1 }}><Icon3 name="refresh" style={[Stl.wicon, { fontSize: ctx[1], textAlign: 'right', padding: ctx[3], paddingTop: ctx[4], paddingEnd: ctx[3] }]} /></TouchableOpacity></View>;
    }
    mediafile(csrn, resp, pobj, tempv, ouid, oidx, dc) {
        var fext = resp.path.substring(resp.path.lastIndexOf('.') + 1).toLowerCase();
        Fct.appfile(resp); pobj.path = resp.path; if(dc && wstream) { if(callData._track == 1) { Fct.vcstop('video', true); callData._track = null; } } if (gvar[13][5].indexOf(fext) != -1) ImagePicker.openCropper(pobj).then((image) => csrn.treatfile(image, tempv, ouid, oidx)).catch((error) => { if(error.message.indexOf("cancelled")==-1) mntst.show([[gvar[2][11209], 2]]); }); else csrn.treatfile(resp, tempv, ouid, oidx);
    }
    componentWillUnmount() {
        delete this.isloaded; this.clrt(); lstactv = new Date();
    }
    render() {
        if (this.state.display == 'flex' && this.state.e3) {
            let csrn = crnscrn || dshscrn, rtn = csrn ? csrn.props.route.name : null, mnwd, ares, v0, v1;
            if(dmns.lrgs) { mnwd='80%'; ares = [Stl.pcont, Stl.alrtbg, { padding: dimsz[6], width: mnwd }]; v0='80%'; v1=1; } else { mnwd='90%'; ares = [Stl.pcont, Stl.alrtbg, { padding: dimsz[0], width: mnwd }]; v0='90%'; v1=3; }
            let flkey = Array.isArray(scrnid[rtn]) ? scrnid[rtn][2] : 0, idx = parseInt(this.state.e3[0]), mrgh = dmns.w18, width = dmns.w50 - 2 * mrgh, istyle = [Stl.linpt, Stl.shdw, { height: dimsz[15], fontSize: dimsz[0], paddingHorizontal: dimsz[0], paddingVertical: dmns.h, marginVertical: dimsz[4], marginHorizontal: mrgh, width: Math.min(500, dmns.w60) }], arrlen, tempv, sc, children, btmmenu, topmenu, bmstl = [Stl.btmtab, Stl.yellowtab, Stl.w100], bs, tc = Cnt.clrs.yellowcolor, bc = Cnt.clrs.yellowcolor, mc, tbs = [Stl.tabicn, { paddingVertical: appstt[1] * v1 }], ics = [Stl.luicon, { fontSize: appstt[1] * dimsz[14] }], btxt = [Stl.smalltext, { fontSize: dimsz[1], textAlign: 'center' }], lbgc = Cnt.clrs.blackcolor, ldngv = <View style={[{ height: dimsz[11], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View>, mdls={bottom: 0}, sstl = [Stl.yellowtab], atxt = [Stl.rtext, { fontSize: dimsz[6], textAlign: 'center' }], dtxt = [Stl.dgtext, { fontSize: dimsz[1], textAlign: 'center', paddingTop: dimsz[0] }], abtn = [Stl.rectres, Stl.shdw, { padding: dimsz[3], marginVertical: dmns.h, minWidth: v0 }], ctx = [Stl.blacktab, dimsz[24], dimsz[2], dimsz[4], dimsz[5]];
            switch (idx) {
                case 0:
                    topmenu = <View style={[Stl.itmhdiv, sstl]}>
                        <View style={[Stl.bkdiv, { width: dmns.w0 }]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={{ paddingVertical: appstt[1] * dmns.h }}><Icon3 name="arrow-back" style={[Stl.luicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity></View>
                        <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.mscrlvw.scrollTo({ y: 0, animated: true })} style={{ flex: 1 }}><Text style={[Stl.dtext, { fontSize: appstt[1] * dimsz[13], paddingHorizontal: dimsz[19], paddingBottom: dimsz[19] }]}>{gvar[2][1028]}</Text></TouchableOpacity>
                        <View style={[Stl.srdiv, { width: dmns.w0 }]}></View>
                    </View>;
                    children = [<View key={0} style={[Stl.pzp, { paddingHorizontal: dimsz[0], paddingVertical: dimsz[6] }]}>
                        <TextInput ref={(ref) => this.inputs[3] = ref} onFocus={() => this.focusinput('mscrlvw', 3)} onChangeText={(value) => this.chgti(null, [['pincode', value]])} value={this.state.pincode} placeholder={gvar[2][1026]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istyle.concat([this.state['reqfld']['pincode'] ? Stl.reqfld : null])} maxLength={4} onSubmitEditing={() => this.defpin(this.state.e3[2])} keyboardType="numeric" blurOnSubmit={false} secureTextEntry={true} selectTextOnFocus={true} contextMenuHidden={true} /></View>];
                    btmmenu = <View style={bmstl}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.defpin(this.state.e3[2])} style={tbs}><Icon3 name="checkmark" style={ics} /></TouchableOpacity></View>;
                    break;
                case 1:
                    btmmenu = <Izv ctx={ctx} onCancel={() => this.toggle()} imageUrls={this.state.e3[4]} index={this.state.e3[2]} bgc={lbgc} onSave={(url) => Fct.downloadsave(url)} loadingRender={() => ldngv} failRender={() => <Icon3 name="images" style={[Stl.uicon, { fontSize: 1.75 * dimsz[20] }]} />} />;
                    bc=tc=lbgc; topmenu=[];
                    break;
                case 2:
                    let difpg = this.state.e3[2], cbfct = this.state.e3[3];
                    bc=tc='rgba(0,0,0,0)'; lbgc = 'transparent';
                    children = <View style={ares}>
                        <Text style={atxt}>{gvar[2][4509]}</Text>
                        <Text style={dtxt}>{gvar[2][45028]}{'\n'}{gvar[2][45029]}</Text>
                        <View style={[Stl.coldiv, { paddingHorizontal: dimsz[6], paddingTop: dimsz[24] }]}>
                            <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => {
                                switch (rtn) {
                                    case 'Questions':
                                    case 'Tasks':
                                        this.toggle(() => csrn.squest(csrn.state.qidx, difpg, cbfct));
                                        break;
                                    case 'Profile':
                                        this.toggle(async () => await csrn.suser(difpg, cbfct));
                                        break;
                                }
                            }} style={abtn.concat([{ backgroundColor: Cnt.clrs.yellowcolor }])}><Text style={btxt}>{gvar[2][45025].toUpperCase()}</Text></TouchableOpacity>
                            <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle(() => { csrn.changsec[flkey] = false; if(difpg) scrnid[rtn][3] = [[['data', flkey, 1]]]; if (cbfct) cbfct(); })} style={abtn.concat([{ backgroundColor: Cnt.clrs.bluecolor }])}><Text style={btxt}>{gvar[2][45027].toUpperCase()}</Text></TouchableOpacity>
                            <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={abtn.concat([{ backgroundColor: Cnt.clrs.redcolor }])}><Text style={btxt}>{gvar[2][67012].toUpperCase()}</Text></TouchableOpacity>
                        </View></View>;
                    break;
                case 3:
                    let cfct;
                    if(this.state.e3[3]) {
                        bc=Cnt.clrs.blackcolor; tempv = this.state.e3[3]+':  '+(this.state.e3[4]?this.state.e3[4]:'N/A');
                    } else {
                        tempv = gvar[2]['lstcnsfrm'][0];
                        cfct = <View key={'de1'}><Cbx label={gvar[2]['lstcnsfrm'][1]} style={[Stl.lsept, { marginHorizontal: dimsz[6], marginTop: dimsz[0], paddingVertical: dimsz[0] }]} checked={this.state.agcf} btnStyle={[Stl.hicon, { fontSize: dimsz[6] }]} labelStyle={[Stl.mgraytext, { fontSize: dimsz[0] }]} nowrap={true} onPress={() => this.setState({ agcf: !this.state.agcf })} /></View>;
                        btmmenu = <View style={bmstl}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.sagcf(this.state.e3[2], this.eobj.chgpass)} style={tbs}><Icon3 name="checkmark" style={ics} /></TouchableOpacity></View>;
                    }
                    topmenu = [<View key={0} style={[Stl.itmhdiv, sstl]}>
                        <View style={[Stl.bkdiv, { width: dmns.w0 }]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={{ paddingVertical: appstt[1] * dmns.h }}><Icon3 name="arrow-back" style={[Stl.luicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity></View>
                        <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => { if (this.mnwv) this.mnwv.injectJavaScript('window.scroll({top:0,behavior:\"smooth\"});'); }} style={{ flex: 1 }}><Text style={[Stl.dtext, { fontSize: appstt[1] * dimsz[13], paddingHorizontal: dimsz[19], paddingBottom: dimsz[19] }]}>{tempv}</Text></TouchableOpacity>
                        <View style={[Stl.srdiv, { width: dmns.w0 }]}></View>
                    </View>]; sc = Fct.disptext('lstcnsfrm', [[2, Object.keys(gvar[2]['lstcnsfrm']).length]], null, ldngv, this, cfct);
                    break;
                case 4:
                    topmenu = <View style={[Stl.itmhdiv, sstl]}>
                        <View style={[Stl.bkdiv, { width: dmns.w0 }]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={{ paddingVertical: appstt[1] * dmns.h }}><Icon3 name="arrow-back" style={[Stl.luicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity></View>
                        <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.mscrlvw.scrollTo({ y: 0, animated: true })} style={{ flex: 1 }}><Text style={[Stl.dtext, { fontSize: appstt[1] * dimsz[13], paddingHorizontal: dimsz[19], paddingBottom: dimsz[19] }]}>{gvar[2][1021]}</Text></TouchableOpacity>
                        <View style={[Stl.srdiv, { width: dmns.w0 }]}></View>
                    </View>;
                    children = [<View key={0} style={[Stl.pzp, { paddingHorizontal: dimsz[0], paddingVertical: dimsz[6] }]}>
                        <TextInput ref={(ref) => this.inputs[3] = ref} onFocus={() => this.focusinput('mscrlvw', 3)} onChangeText={(value) => this.chgti(null, [['pincode', value]])} value={this.state.pincode} placeholder={gvar[2][107]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istyle.concat([this.state['reqfld']['pincode'] ? Stl.reqfld : null])} maxLength={20} returnKeyType="next" onSubmitEditing={() => this.inputs[4].focus()} blurOnSubmit={false} secureTextEntry={true} selectTextOnFocus={true} contextMenuHidden={true} /><TextInput ref={(ref) => this.inputs[4] = ref} onFocus={() => this.focusinput('mscrlvw', 4)} onChangeText={(value) => this.chgti(null, [['pincode2', value]])} value={this.state.pincode2} placeholder={gvar[2][105]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istyle.concat([this.state['reqfld']['pincode2'] ? Stl.reqfld : null])} maxLength={20} onSubmitEditing={() => this.chgpass(this.state.e3[2], this.state.e3[3])} blurOnSubmit={false} secureTextEntry={true} selectTextOnFocus={true} contextMenuHidden={true} /></View>];
                    btmmenu = <View style={bmstl}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.chgpass(this.state.e3[2], this.state.e3[3])} style={tbs}><Icon3 name="checkmark" style={ics} /></TouchableOpacity></View>;
                    break;
                case 5:
                    tempv = this.state.e3[2]; let ouid = this.state.e3[3], oidx = this.state.e3[4], idim = 600, maxw, maxh, pobj, mt = this.state.e3[5] || ['any', 'video', 'photo'];
                    if (!ouid) { maxw = dmns.w75; maxh = dmns.h75; idim = 0.8; } else {
                        if (dmns.lrgs) { maxw = dmns.width < idim ? dmns.width : Math.min(dmns.w50, idim); maxh = dmns.height < idim ? dmns.height : Math.min(dmns.h75, idim); } else { maxw = dmns.width < idim ? dmns.width : Math.min(dmns.w75, idim); maxh = dmns.height < idim ? dmns.height : Math.min(dmns.h75, idim); }
                        idim = 0.8;
                    } pobj = { width: maxw, height: maxh, compressImageMaxWidth: maxw, compressImageMaxHeight: maxh, compressImageQuality: idim, cropperActiveWidgetColor: Cnt.clrs.blackcolor, cropperStatusBarColor: Cnt.clrs.blackcolor, cropperToolbarColor: Cnt.clrs.blackcolor, cropperToolbarTitle: gvar[2][45017], loadingLabelText: gvar[2][6600], cropperChooseText: gvar[2]['lstupdsts'][11], cropperCancelText: gvar[2][67012], showCropGuidelines: false, hideBottomControls: true };
                    bc=tc='rgba(0,0,0,0)'; lbgc = 'transparent';
                    children = <View style={ares}>
                        <Text style={atxt}>{!ouid ? gvar[2][6704] : gvar[2][6703]}</Text>
                        <View style={[Stl.coldiv, { paddingHorizontal: dimsz[6], paddingTop: dimsz[24] }]}>
                            {mt.map((value, j) => { if(j>0) { let btbg,tidx; switch(value) { case 'video': btbg=Cnt.clrs.lbrdcolor; tidx=45010; break; case 'photo': btbg=Cnt.clrs.yellowcolor; tidx=4507; break; } return (<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} key={j} onPress={() => { if(wstream) { wstream.getTracks().forEach(track => { if(track.kind == 'video' && track.enabled) callData._track = 1; }); if(callData._track == 1) Fct.vcstop('video', false); } ImagePicker.openCamera({ mediaType: value/*, useFrontCamera: true*/ }).then((resp) => this.mediafile(csrn, resp, pobj, tempv, ouid, oidx, 1)).catch((error) => { callData._track = null; if(error.message.indexOf("cancelled")==-1) mntst.show([[gvar[2][11209], 2]]); }); setTimeout(() => this.toggle(null, 1), 1000); }} style={abtn.concat([{ backgroundColor: btbg }])}><Text style={btxt}>{gvar[2][tidx].toUpperCase()}</Text></TouchableOpacity>); } })}
                            {mt[0] ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => { ImagePicker.openPicker({ mediaType: mt[0] }).then((resp) => this.mediafile(csrn, resp, pobj, tempv, ouid, oidx)).catch((error) => { if(error.message.indexOf("cancelled")==-1) mntst.show([[gvar[2][6302], 2]]); }); setTimeout(() => this.toggle(null, 1), 1000); }} style={abtn.concat([{ backgroundColor: Cnt.clrs.bluecolor }])}><Text style={btxt}>{gvar[2][45011].toUpperCase()}</Text></TouchableOpacity>: null}
                            <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={abtn.concat([{ backgroundColor: Cnt.clrs.redcolor }])}><Text style={btxt}>{gvar[2][67012].toUpperCase()}</Text></TouchableOpacity>
                        </View></View>;
                    break;
                case 7:
                let device = this.state.e3[2], alldev = []; scrnid['Home'][0] = null;
                Object.keys(device).map((key) => {
                    let mchc = []; Object.keys(gvar[2]['lstagrdis']).map((okey) => {
                        mchc.push(<Rbn key={okey} label={gvar[2]['lstagrdis'][okey]} style={{ paddingHorizontal: mrgh }} checked={this.state.tempvar[key] == okey} btnStyle={[Stl.hicon, { fontSize: dimsz[6] }]} labelStyle={[Stl.mgraytext, { fontSize: dimsz[0] }]} nowrap={true} onPress={() => { if (this.state.tempvar[key] != okey) { let tempvar = Object.assign({}, this.state.tempvar); tempvar[key] = okey; this.setState({ tempvar }); this.changeeval[idx] = true; } }} />);
                    });
                    alldev.push(<View key={key} style={[Stl.coldiv, Stl.lsepdiv, { width: dmns.width, padding: dimsz[0], marginVertical: dimsz[0] }]}><Text style={[Stl.wcicon, { fontSize: dimsz[10], paddingBottom: dimsz[19] }]}>{device[key]}</Text><View style={[Stl.radiocheckdiv]}>{mchc}</View></View>);
                });
                topmenu = <View style={[Stl.itmhdiv, sstl]}>
                    <View style={[Stl.bkdiv, { width: dmns.w0 }]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={{ paddingVertical: appstt[1] * dmns.h }}><Icon3 name="arrow-back" style={[Stl.luicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity></View>
                    <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.mscrlvw.scrollTo({ y: 0, animated: true })} style={{ flex: 1 }}><Text style={[Stl.dtext, { fontSize: appstt[1] * dimsz[13], paddingHorizontal: dimsz[19], paddingBottom: dimsz[19] }]}>{gvar[2][36013]}</Text></TouchableOpacity>
                    <View style={[Stl.srdiv, { width: dmns.w0 }]}></View>
                </View>;
                children = [<View key={0} style={[Stl.pzp]}>{alldev}</View>];
                btmmenu = <View style={bmstl}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.actdev(device)} style={tbs}><Icon3 name="checkmark" style={ics} /></TouchableOpacity></View>;
                break;
                case 8:
                    let text = this.state.e3[2], endln, otext = [], ocolor, oicon; arrlen = text.length; tempv = arrlen - 1;
                    for (i = 0; i < arrlen; i++) {
                        switch (text[i][1]) {
                            case 2:
                                ocolor = Cnt.clrs.redcolor;
                                if (text[i][2]) oicon = null; else oicon = <Icon2 name="exclamation-triangle" style={[Stl.ricon, { fontSize: dimsz[6] }]} />;
                                break;
                            default:
                                ocolor = Cnt.clrs.bluecolor;
                                if (text[i][2]) oicon = null; else oicon = <Icon2 name="info-circle" style={[Stl.hicon, { fontSize: dimsz[6] }]} />;
                                break;
                        }
                        if (i == tempv) endln = ''; else endln = '\n';
                        otext.push(<Text key={i} style={{ color: ocolor }}>{oicon}{oicon ? '    ' : ''}{text[i][0]}{endln}</Text>);
                    }
                    children = [<View key={0} style={[Stl.pzp]}><Text style={[Stl.dtext, { fontSize: dimsz[10] }]}>{otext}</Text></View>];
                    tc='rgba(0,0,0,0)'; btmmenu = <View style={bmstl}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={tbs}><Icon3 name="checkmark" style={ics} /></TouchableOpacity></View>;
                    break;
                case 9:
                    var jscode = '', rdrld = this.state.e3[8] ? null : <View style={[Stl.pzp, Stl.w100, { position: 'absolute', height: '100%' }]}>{ldngv}</View>;
                    if (this.state.e3[7]) {
                        bc=tc=lbgc; istyle = this.state.e3[2]; if(istyle.indexOf('file://')!=-1) mrgh = ''; else mrgh = gvar[1][0];
                        sc = <WebView textZoom={100} ref={(ref) => this.mnwbvw = ref} source={{ baseUrl: mrgh, html: '<html><head><style>html,body{margin:0;padding:0;width:100%;height:100%;background-color:'+lbgc+';text-align:center;}</style><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><video autoplay controls playsinline style="width:100%;height:100%;background-color:'+lbgc+';"><source src="'+istyle+'" type="'+Fct.mimtyp[this.state.e3[4]]+'" /><source src="'+istyle.replace('.'+this.state.e3[4], '.mp4')+'" type="video/mp4" />'+gvar[2][908]+'</video></body></html>' }} originWhitelist={['*']} allowFileAccess={true} allowFileAccessFromFileURLs={true} allowUniversalAccessFromFileURLs={true} mixedContentMode="always" javaScriptEnabled={true} domStorageEnabled={true} thirdPartyCookiesEnabled={true} allowUniversalAccessFromFileURLs={true} mediaPlaybackRequiresUserAction={false} androidHardwareAccelerationDisabled={false} allowsFullscreenVideo={true} allowsInlineMediaPlayback={true} scrollEnabled={false} bounces={false} style={[{ flex: 1, backgroundColor: 'transparent' }]} startInLoadingState={true} renderLoading={() => rdrld} onShouldStartLoadWithRequest={() => true} onLoadProgress={(e) => { if (e.nativeEvent.progress > 0.7) if (this.isloaded) { let e3 = this.state.e3.slice(); e3[8] = 1; this.setState({ e3: e3 }); } }} onLoad={e => { if (jscode) this.mnwbvw.injectJavaScript(jscode); }} />;
                    } else {
                    var uri; istyle = this.state.e3[4];
                    if (Platform.OS === 'android') {
                        if (istyle.substr(0, 4) == 'http') {
                            istyle = this.state.e3[2].split(/[#?]/)[0].split(/[\/]/); uri = istyle.length; if(uri > 1) { istyle = istyle[uri - 1].split('.'); uri = istyle.length; if(uri > 1) istyle[uri - 1]; else istyle = this.state.e3[4]; } else istyle = this.state.e3[4];
                        }
                        var excd = 'var css="html,body{width:100%;height:100%;}*{-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;}.doc,.docx{height:20px;background-color:#fff;position:absolute;bottom:1px;right:39px;width:49px;}.xls,.xlsx{height:26px;background-color:#3f4244;position:absolute;bottom:-26px;width:100%;}' + (istyle == 'xls' || istyle == 'xlsx' ? '#wacframe{height:calc(100% + 26px);}' : '') + '",head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style");style.type="text/css";if(style.styleSheet){style.styleSheet.cssText=css;}else{style.appendChild(document.createTextNode(css));}head.appendChild(style);function ecancel(e){if(!e)return false;if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();if(e.cancelBubble)e.cancelBubble=true;if(e.cancel!=null)e.cancel=true;if(document.selection&&document.selection.empty)document.selection.empty();else if(window.getSelection)window.getSelection().removeAllRanges();};document.onselectstart=ecancel;document.onselect=ecancel;document.onmousedown=ecancel;document.onclick=ecancel;';
                        switch (istyle) {
                            case 'pdf':
                                lbgc = '#808080'; uri = gvar[1][0] + 'pdfjs/web/viewer.html?file=' + this.state.e3[2] + '&nosave=1'; jscode = ';(function(){if(window.location.href.indexOf("about:blank")!=-1){window.ReactNativeWebView.postMessage("reload");}else{' + excd + '}})();';
                                break;
                            case 'doc': case 'docx': case 'xls': case 'xlsx': case 'ppt': case 'pptx':
                                lbgc = '#f1f1f1'; uri = 'https://view.officeapps.live.com/op/embed.aspx?src=' + this.state.e3[2] + '&wdInConfigurator=True&AllowTyping=False&wdAllowInteractivity=True&wdDownloadButton=False&wdPrint=0&wdEmbedCode=0&wdAccPdf=0'; jscode = ';(function(){if(window.location.href.indexOf("about:blank")!=-1){window.ReactNativeWebView.postMessage("reload");}else{' + excd + '/*alert(location.host);alert(document.cookie);*/var CookieDate=new Date();CookieDate.setFullYear(CookieDate.getFullYear()+10);CookieDate=CookieDate.toUTCString();document.cookie="NL3-ARRAffinity=dd55233def026ee6edb7c86bd813700e2ffbe370f236b93b93563cd3fc73d7a9; expires="+CookieDate+"; domain=.view.officeapps.live.com; path=/; sameSite=no_restriction; httpOnly=false; secure=false; session=true; storeId=0; hostOnly=false; id=1";document.cookie="NL3-Excel-ARRAffinity=da4cf01a451c81d520a8fbb52d30f317afb27ea3a1b92aee0265fced7fc76c90; expires="+CookieDate+"; domain=.nl3-excel.officeapps.live.com; path=/; sameSite=no_restriction; httpOnly=false; secure=false; session=true; storeId=0; hostOnly=false; id=1";var sbdiv=document.createElement("div");sbdiv.className="' + istyle + '";sbdiv.onclick=ecancel;document.getElementsByTagName("body")[0].appendChild(sbdiv);}})();';
                                break;
                            case 'htm': case 'html': case 'http': case 'https': case 'com': case 'net': case 'org': case 'app': case 'fr': case 'uk':
                                lbgc = this.state.e3[3]; uri = this.state.e3[2];
                                break;
                            default:
                                lbgc = '#d1d1d1'; uri = this.state.e3[6] + this.state.e3[2]; jscode = ';(function(){if(window.location.href.indexOf("about:blank")!=-1){window.ReactNativeWebView.postMessage("reload");}else{if(document.querySelectorAll("[role=toolbar]").length)document.querySelectorAll("[role=toolbar]")[0].style.visibility="hidden";' + excd + '}})();';
                        }
                        //&em=2&wdHideGridlines=False&wdHideHeaders=False&waccluster=NL3&wdStartOn=0&ui=fr-FR&rs=fr-FR
                        //source={{ html: '<div style="height:100%;display:flex;justify-content:center;align-items:center;"><img src="https://e-corelab.com/erol.web/disease/0/icon/g0.png" /></div>' }}return undefined;void(0);'http://docs.google.com/gview?embedded=true&url=' + this.state.e3[2] 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + this.state.e3[2] 'https://e-corelab.com/erol.web/disease/0/docs/5c2d0d8b9677b.xlsx'
                        sc = <WebView textZoom={100} ref={(ref) => this.mnwbvw = ref} source={{ uri: uri }} originWhitelist={['*']} allowFileAccess={true} allowFileAccessFromFileURLs={true} allowUniversalAccessFromFileURLs={true} mixedContentMode="always" javaScriptEnabled={true} domStorageEnabled={true} thirdPartyCookiesEnabled={true} allowUniversalAccessFromFileURLs={true} style={[{ flex: 1 }, lbgc ? { backgroundColor: lbgc } : null]} startInLoadingState={true} renderLoading={() => rdrld} onShouldStartLoadWithRequest={() => true} onLoadProgress={(e) => { if (e.nativeEvent.progress > 0.7) if (this.isloaded) { let e3 = this.state.e3.slice(); e3[8] = 1; this.setState({ e3: e3 }); } }} onLoad={e => { if (jscode) this.mnwbvw.injectJavaScript(jscode); }} onMessage={e => { if (e.nativeEvent.data == 'reload') { let e3 = this.state.e3.slice(0); e3[6] = e3[6] == 'http://docs.google.com/gview?embedded=true&url=' ? 'https://drive.google.com/viewerng/viewer?embedded=true&url=' : 'http://docs.google.com/gview?embedded=true&url='; this.setState({ e3 }); }}} />;
                    } else {
                        lbgc = '#808080';
                        sc = <WebView textZoom={100} ref={(ref) => this.mnwbvw = ref} source={{ uri: this.state.e3[2] }} originWhitelist={['*']} allowFileAccess={true} allowFileAccessFromFileURLs={true} allowUniversalAccessFromFileURLs={true} mixedContentMode="always" javaScriptEnabled={true} style={[{ flex: 1 }, lbgc ? { backgroundColor: lbgc } : null]} startInLoadingState={true} renderLoading={() => rdrld} onShouldStartLoadWithRequest={() => true} onLoadProgress={(e) => { if (e.nativeEvent.progress > 0.7) if (this.isloaded) { let e3 = this.state.e3.slice(); e3[8] = 1; this.setState({ e3: e3 }); } }} onLoad={e => { if (jscode) this.mnwbvw.injectJavaScript(jscode); }} onMessage={e => { if (e.nativeEvent.data == 'reload') { let e3 = this.state.e3.slice(0); e3[6] = e3[6] == 'http://docs.google.com/gview?embedded=true&url=' ? 'https://drive.google.com/viewerng/viewer?embedded=true&url=' : 'http://docs.google.com/gview?embedded=true&url='; this.setState({ e3 }); }}} />;
                    }
                    bc=tc=Cnt.clrs.blackcolor;
                    }
                    topmenu = this.tbm(ctx); btmmenu = [];
                    break;
                case 10:
                    topmenu = <View style={[Stl.itmhdiv, sstl]}>
                        <View style={[Stl.bkdiv, { width: dmns.w0 }]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={{ paddingVertical: appstt[1] * dmns.h }}><Icon3 name="arrow-back" style={[Stl.luicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity></View>
                        <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.mscrlvw.scrollTo({ y: 0, animated: true })} style={{ flex: 1 }}><Text style={[Stl.dtext, { fontSize: appstt[1] * dimsz[13], paddingHorizontal: dimsz[19], paddingBottom: dimsz[19] }]}>{gvar[2][1012]}</Text></TouchableOpacity>
                        <View style={[Stl.srdiv, { width: dmns.w0 }]}></View>
                    </View>;
                    children = [<View key={0} style={[Stl.pzp, { paddingHorizontal: dimsz[0], paddingVertical: dimsz[6] }]}>
                        <TextInput ref={(ref) => this.inputs[2] = ref} onFocus={this.fcs} onChangeText={(value) => this.chgti(null, [['lemail', value]])} value={this.state.lemail} placeholder={gvar[2][137014]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istyle.concat([this.state['reqfld']['lemail'] ? Stl.reqfld : null])} maxLength={50} blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => this.inputs[12].focus()} keyboardType="email-address" /><TextInput ref={(ref) => this.inputs[12] = ref} onFocus={this.fcs} onChangeText={(value) => this.chgti(null, [['fdigit', value]])} value={this.state.fdigit} placeholder={gvar[2][1013]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istyle.concat([this.state['reqfld']['fdigit'] ? Stl.reqfld : null])} maxLength={4} returnKeyType="go" onSubmitEditing={() => this.respass()} keyboardType="numeric" />{this.state.slogin?<TextInput ref={(ref) => this.inputs[11] = ref} onFocus={this.fcs} onChangeText={(value) => this.chgti(null, [['login', value]])} value={this.state.login} placeholder={gvar[2][505]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istyle.concat([this.state['reqfld']['login'] ? Stl.reqfld : null])} maxLength={50} returnKeyType="go" onSubmitEditing={() => this.respass()} keyboardType={inpttyp} />:null}</View>];
                    btmmenu = <View style={bmstl}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.respass()} style={tbs}><Icon3 name="checkmark" style={ics} /></TouchableOpacity></View>;
                    break;
                case 11:
                    let tabid = this.state.e3[2], secid = this.state.e3[3], tkey = 'gxtra' + tabid, mnvw = ldngv;
                    if (csrn.state['pfetch' + this.state.e3[2]] == '' && csrn.state[tkey] != undefined) {
                        tempv = csrn.state[tkey][secid].length;
                        if (!tempv) mnvw = <View/*style={[Stl.rbox]}*/><Text style={[Stl.dtext, { fontSize: dimsz[23], margin: 40 }]}>{gvar[2][14500]}</Text></View>; else
                            switch (secid) {
                                case 'weights':
                                    let data = [], grph, varx = new Date(csrn.state[tkey][secid][0].xdate), vary = parseFloat(csrn.state[tkey][secid][0].oweight), minx = varx.getTime(), maxx = minx, miny = vary, maxy = miny, axstl = { axis: { stroke: Cnt.clrs.dgraycolor }, ticks: { stroke: Cnt.clrs.dgraycolor, size: 7 }, grid: { stroke: Cnt.prps.d1opcty, strokeWidth: 1, strokeDasharray: '7, 3' }, tickLabels: { fontSize: dimsz[4], fontFamily: 'Montserrat-Light', color: Cnt.clrs.graycolor, padding: 1/*angle: 90*/ }, axisLabel: { fontSize: dimsz[3], fontFamily: 'Montserrat-Regular', color: Cnt.clrs.medgraycolor, padding: dimsz[12] } }, lblstl = { data: { fill: Cnt.clrs.redcolor, stroke: Cnt.clrs.redcolor, strokeWidth: 0.25 * dmns.w }, labels: { fontSize: dimsz[3], fontFamily: 'Montserrat-Light', fill: Cnt.clrs.dgraycolor } };
                                    csrn.state[tkey][secid].map((orow, rj) => { varx = new Date(orow.xdate); vary = parseFloat(orow.oweight); data.push({ x: varx, y: vary, label: orow.edate + '\n' + orow.oweight + ' ' + gvar[2][1002] }); varx = varx.getTime(); minx = Math.min(minx, varx); maxx = Math.max(maxx, varx); miny = Math.min(miny, vary); maxy = Math.max(maxy, vary); });
                                    if (minx == maxx) { minx -= 0.01 * minx; maxx += 0.01 * maxx; } if (miny == maxy) { miny -= 0.01 * miny; maxy += 0.01 * maxy; }
                                    if (tempv == 1) grph = <VictoryScatter style={lblstl} data={data} />; else grph = <VictoryLine style={lblstl} data={data} />;
                                    mnvw = <VictoryChart width={dmns.width - dimsz[14]} height={dmns.height - (dimsz[8] + dimsz[14])} padding={{ left: dimsz[14], bottom: dimsz[14] }} animate={{ duration: Cnt.prps.animdur, easing: "linear" }} containerComponent={<VictoryZoomContainer />} scale={{ x: 'time', y: 'linear' }} domain={{ x: [minx, maxx], y: [miny, maxy] }} domainPadding={dimsz[9]} style={{ parent: { /*backgroundColor: Cnt.clrs.footbg, */paddingTop: dimsz[8] } }}>
                                        <VictoryAxis style={axstl} fixLabelOverlap label={gvar[2][137019]} tickFormat={(t) => `${Fct.convert_d_date(t)}`} />
                                        <VictoryAxis style={axstl} fixLabelOverlap label={gvar[2][13102]} dependentAxis />
                                        {grph}</VictoryChart>;//tickValues={[2, 4, 6, 8, 20, 33]} tickCount={4}// bubbleProperty="y" minBubbleSize={dmns.w} maxBubbleSize={dmns.w17}
                                    break;
                            }
                    }
                    bc='rgba(0,0,0,0)'; children = <View style={[Stl.w100, { flex: 1 }]}>{this.tbm(ctx)}<View style={[Stl.pzp, { flex: 1 }]}>{mnvw}</View></View>;
                    break;
                case 12:
                    bc=tc='rgba(0,0,0,0)'; lbgc = 'transparent';
                    children = <View style={ares}>
                        <Text style={atxt}>{gvar[2][4509]}</Text>
                        <Text style={dtxt}>{this.state.e3[4]}</Text>
                        <View style={[Stl.coldiv, { paddingHorizontal: dimsz[6], paddingTop: dimsz[24] }]}>
                            <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle(this.state.e3[3])} style={abtn.concat([{ backgroundColor: Cnt.clrs.bluecolor }])}><Text style={btxt}>{(this.state.e3[2] || gvar[2][2301]).toUpperCase()}</Text></TouchableOpacity>
                            <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle(this.state.e3[5])} style={abtn.concat([{ backgroundColor: Cnt.clrs.redcolor }])}><Text style={btxt}>{gvar[2][67012].toUpperCase()}</Text></TouchableOpacity>
                        </View></View>;
                    break;
                case 13:
                    bc=tc='rgba(0,0,0,0)'; lbgc = 'transparent'; arrlen = this.state.e3[2].reqsts.length; tempv = []; let bts, s1 = [Stl.itmcont, { marginVertical: 1 }], s2 = [Stl.rtext, { fontSize: dimsz[1], width: '28%' }], s3 = [Stl.txtwrap, Stl.dgtext, { fontSize: dimsz[1], paddingStart: dimsz[19] }];
                    for(i=0;i<arrlen;i++) {
                        let fi = i, reqsts = this.state.e3[2].reqsts[fi], sts;
                        if((fi==0&&this.state.e3[2].reqsts[1]!=0)||(fi==1&&this.state.e3[2].reqsts[0]!=0)) sts=1;
                        if(fi==2&&reqsts==1&&moment.tz(this.state.e3[2].reqdat[fi], userarray.timezone).tz(moment.tz.guess()).isSameOrBefore(moment().subtract({ hours: gvar[13][16] }))) reqsts = 0;
                        if(reqsts==0&&!this.state.reqs[fi]&&!sts) bts=[Cnt.prps.tchblopcty,() => mnldr.showclose('flex', [14, null, this.state.e3[2], this.state.e3[3], this.state.e3[4], this.state.e3[5], fi], null, { reqs: [], det: null }),null,null,'']; else bts=[Cnt.prps.dsbopcty,null,{ opacity: Cnt.prps.dsbopcty },{ color: Cnt.clrs.lgraycolor2 },sts?'':':\n'+gvar[2]['lstreqsts'][this.state.e3[2].reqsts[fi]]];
                        tempv.push(<TouchableOpacity activeOpacity={bts[0]} key={fi+'0'+this.state.reqs[fi]} onPress={bts[1]} style={abtn.concat([{ backgroundColor: Cnt.prps.reqa[fi] }, bts[2]])}><Text style={btxt.concat([bts[3]])}>{gvar[2][67000+fi].toUpperCase()}{bts[4]}</Text></TouchableOpacity>);
                    }
                    children = <View style={ares}>
                        <Text style={atxt}>{gvar[2][10403]}</Text>
                        <View style={[Stl.cstl, { marginTop: dimsz[0] }]}><View style={s1}><Text style={s2}>{gvar[2]['lstvistyp'][this.state.e3[2].vtype]}{':'}</Text><Text numberOfLines={4} style={s3}>{this.state.e3[2].details}</Text></View><View style={s1}><Text style={s2}>{gvar[2][18901]}{':'}</Text><Text style={s3}>{this.state.e3[4]}</Text></View><View style={s1}><Text style={s2}>{gvar[2][1022]}{':'}</Text><Text style={s3}>{this.state.e3[5]}</Text></View></View>
                        <View style={[Stl.coldiv, { paddingHorizontal: dimsz[6], paddingTop: dimsz[0] }]}>
                            {tempv}<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle()} style={abtn.concat([{ backgroundColor: Cnt.clrs.fgraycolor }])}><Text style={btxt}>{gvar[2][67020].toUpperCase()}</Text></TouchableOpacity>
                        </View></View>;
                    break;
                case 14:
                    bc=tc='rgba(0,0,0,0)'; lbgc = 'transparent'; tempv=this.state.e3[6];
                    children = <View style={ares}>
                        <Text style={atxt}>{gvar[2][210+tempv]}</Text>
                        <Text style={dtxt.concat([{ paddingTop: dimsz[24] }])}>{gvar[2][220+tempv]}</Text>
                        <View style={[Stl.coldiv, { paddingHorizontal: dimsz[6] }]}>
                            <TextInput ref={(ref) => this.inputs[0] = ref} onFocus={() => this.focusinput('mscrlvw', 0)} onChangeText={(value) =>  this.chgti(null, [['det', value]])} value={this.state.det} keyboardType="default" textContentType="none" autoFill={false} autoCompleteType="off" autoCorrect={false} style={[Stl.sinpt, Stl.aptbg, { minWidth: v0, minHeight: dmns.h0, fontSize: dimsz[1], paddingHorizontal: dimsz[0], marginVertical: dimsz[0], textAlignVertical: 'top', borderColor: Cnt.prps.reqa[tempv], borderWidth: 1 }]} onContentSizeChange={(e) => { LayoutAnimation.easeInEaseOut(); this.inputs[0].setNativeProps({ style: { height: e.nativeEvent.contentSize.height + 10 } }); }} onEndEditing={(e) => { if(this.state.det && !this.state.det.trim()) this.setState({ det: null }); }} multiline={true} />
                            <View style={[Stl.itmhdiv]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.sndreq(rtn, flkey, tempv, this.state.e3[2], this.state.e3[3], this.state.e3[4], this.state.e3[5])} style={abtn.concat([{ backgroundColor: Cnt.prps.reqa[tempv], marginHorizontal: dmns.w, minWidth: '45%' }])}><Text style={btxt}>{gvar[2][99].toUpperCase()}</Text></TouchableOpacity><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.setState({ e3: [13, null, this.state.e3[2], this.state.e3[3], this.state.e3[4], this.state.e3[5]] })} style={abtn.concat([{ backgroundColor: Cnt.clrs.fgraycolor, marginHorizontal: dimsz[3], minWidth: '45%' }])}><Text style={btxt}>{gvar[2][67012].toUpperCase()}</Text></TouchableOpacity></View>
                        </View></View>;
                    break;
                default: //mnldr.showclose('flex', [null, null]); lbgc = 'transparent';
                    let ldtxt = ''; if (gvar[2] && !this.state.e3[2]) { ldtxt = gvar[2][6600].split('. '); ldtxt = ldtxt[0] + '.\n' + ldtxt[1]; }
                    children = <View style={[Stl.pzp]}>{ldtxt != '' ? <Text style={[Stl.dtext, { fontSize: dimsz[23] }]}>{ldtxt}</Text> : null}{ldngv}</View>;
            } mc = lbgc && lbgc != 'transparent' ? { backgroundColor: lbgc } : null;
            return (
                <Animated.View {...this.panResponder.panHandlers} key={this.state.a} keyboardShouldPersistTaps={"handled"} style={[Stl.mdlbg, Stl.cptlst, mdls, { transform: [{ translateY: this.animatedValue }], elevation: 1 }, mc]}>
                {topmenu?<SafeAreaView style={{ flex:0, backgroundColor: tc, paddingTop: stsbrht }}>{topmenu}</SafeAreaView>:null}
                <SafeAreaView style={{ flex:1 }}>
                    {sc ? sc : children ? <ScrollView ref={(ref) => this.mscrlvw = ref} contentContainerStyle={[Stl.svcont, { justifyContent: 'space-around', alignItems: 'center' }, mc]} keyboardShouldPersistTaps={"handled"} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e, this.mscrlvw)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16}>{children}</ScrollView> : null}
                </SafeAreaView>
                {btmmenu?<SafeAreaView style={[{ flex:0, backgroundColor: bc, bottom: 0 }, bs]}>{btmmenu}</SafeAreaView>:null}
                <Spc />{this.tbi('mscrlvw')}
                </Animated.View>
            );
        } else return <Animated.View style={{ transform: [{ translateY: this.animatedValue }], display: 'none' }}></Animated.View>;
    }
}
