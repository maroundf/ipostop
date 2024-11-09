class RDashboard5 extends React.PureComponent {
    render() {
    var { item, index, pdhl, rsw } = this.props;
    let srgf = surglist.find(elm => elm.id == item.id), iscr, tempv = item.asev.split('|'), tempv2, indic;
    if (srgf && item.adate && tempv[0] != -1) {
        if (tempv.length > 1) { if (!Fct.isnull(tempv[0]) && !Fct.isnull(tempv[1])) { tempv2 = parseFloat(tempv[0]) - parseFloat(tempv[1]); if (tempv2 > gvar[13][18][0]) indic = <Icon3 name="trending-down" style={[Stl.ricon, { fontSize: dimsz[17], marginStart: dimsz[5] }]} />; else if (tempv2 < gvar[13][18][1]) indic = <Icon3 name="trending-up" style={[Stl.gricon, { fontSize: dimsz[17], marginStart: dimsz[5] }]} />; else indic = <Icon3 name="repeat" style={[Stl.hicon, { fontSize: dimsz[17], marginStart: dimsz[5] }]} />; } else indic = <Icon3 name="infinite" style={[Stl.mgicon, { fontSize: dimsz[17], marginStart: dimsz[5] }]} />; } else indic = <Icon3 name="infinite" style={[Stl.mgicon, { fontSize: dimsz[17], marginStart: dimsz[5] }]} />;
        iscr = [<View key={0} style={[Stl.rbox2, { justifyContent: 'center', marginVertical: -dimsz[5] }]}><Text style={[Stl.smalltext, { fontSize: dimsz[3] }]}>{gvar[2][57011]}</Text>{indic}</View>, <Gag key={1} size={dimsz[20]} value={tempv[0]} minValue={gvar[13][24][0]} maxValue={gvar[13][24][1]} labels={gvar[2]['lstsevind']} style={{ alignSelf: 'center' }} />, <Text key={2} style={[Stl.smalltext, { fontSize: dimsz[3], textAlign: 'center', marginTop: dimsz[5], marginBottom: 1 }]}>{gvar[2][5704]}</Text>, <Prg key={3} size={dimsz[20]} value={item.perc} labels={gvar[2]['lstcmpind']} style={{ alignSelf: 'center' }} />];
        iscr = <View style={[Stl.colcen]}>{iscr}</View>;
    }
    return (
        <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.opndp(Object.assign({}, item), null, {}, 'Details')} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            {Fct.setpht(item, null, [dimsz[11], dimsz[9]])}
            <View style={[Stl.itmhdiv, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1, marginStart: dmns.w16 }]}>
                <View style={[Stl.colico, { flex: 1 }]}>
                    <View style={[Stl.colico]}>
                        <View style={[Stl.txtwrap]}>
                            <Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{Fct.setval(item)}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Linking.openURL('tel://' + item.phone).catch((error) => mntst.show([[gvar[2][45049] + ' ' + item.phone, 2]]))} style={[Stl.rbox2, { alignSelf: 'flex-start' }]}><Icon3 name="call" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[24] }]} /><Text numberOfLines={1} style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1], textDecorationLine: 'underline' }]}>{item.phone}</Text></TouchableOpacity>
                    </View>
                    <View style={{ marginTop: dimsz[4] }}>{Fct.lsurg(item, srgf)}</View>
                </View>
                <View style={{ width: rsw, alignItems: 'flex-end' }}>{iscr}</View>
            </View>
        </TouchableOpacity>
    )
    }
}
class RDashboard7 extends React.PureComponent {
    render() {
    var { item, index, pdhl, s } = this.props;
    let ibg0, ibg1, ibg2, mstate = parseInt(item.mstate), wdate1 = item.wdate1.substr(0, 16), fext, isvid, icn, details = [], flkey, tempv, tempv1, tempv2, tempv3, tempv4, tempv5, arrlen, mtxt = '', ibg, fldnam = 'mywall', atbnam = 'wtype';
    if (mstate == 1) { ibg = Stl.bicon2; ibg0 = { backgroundColor: Cnt.clrs.blackcolor2 }; ibg1 = { color: Cnt.clrs.bluecolor }; ibg2 = Stl.lbicon; this.props.tt.enotif.push(item.Id_not); } else { ibg = Stl.bicon; }
    if (item.wmedia) {
        fext = item.wmedia.substring(item.wmedia.lastIndexOf('.') + 1).toLowerCase(); isvid = gvar[13][6].indexOf(fext) != -1;
        if (gvar[13][5].indexOf(fext) != -1) icn = Fct.setpht(item, null, [dimsz[7], dimsz[8], dimsz[17], null, { backgroundColor: Cnt.clrs.yellowcolor }, ibg, null, fldnam, atbnam, () => this.props.tt.opnnot(item, 'uwal', () => {}, flkey)], [this.props.tt.dsrc, 0, item.wmedia + ' [' + wdate1 + ']']); else icn = Fct.setpht(item, Fct.fileicn(item.wmedia, fext), [dimsz[7], dimsz[8], dimsz[17], null, { backgroundColor: Cnt.clrs.yellowcolor }, ibg, () => { let tempv = item.wobj && item.wobj.indexOf('/') != -1; mnldr.showclose('flex', [9, null, (tempv && item.wobj.indexOf('http') != -1 ? '' : gvar[1][0]) + (tempv ? item.wobj : fldnam + '/' + item[atbnam] + '/media') + '/' + item.wmedia, null, fext, item.wmedia + ' [' + wdate1 + ']', 'http://docs.google.com/gview?embedded=true&url=', isvid], () => this.props.tt.opnnot(item, 'uwal', () => {}, flkey)); }, fldnam, atbnam], 2); mtxt = '\n' + gvar[2][48036];
    } else if(!icn) icn = Fct.setpht(item, Fct.walicn(item[atbnam]), [dimsz[7], dimsz[8], dimsz[17], null, { backgroundColor: 'rgba(255,255,255,0)', borderColor: Cnt.prps.l2opcty, borderWidth: 1 }], 2);
    switch (parseInt(item.wtype)) {
        case 8:
            if (parseInt(item.Id_obj) > 1) tempv2 = gvar[2]['lstdoslns']; else tempv2 = gvar[2]['lstdoclnk']; flkey = item.winfo1.split('|'); tempv3 = flkey[0].split(','); flkey = flkey[1]; arrlen = tempv3.length - 1; tempv3.map((e, j) => { if (j == 0) tempv = tempv2[e]; else if (j == arrlen) tempv += ' ' + gvar[2][2300] + ' ' + tempv2[e]; else tempv += ', ' + tempv2[e]; });
            details.push(<View key={0} style={[Stl.fdcol]}><View style={[Stl.rbox2, Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{gvar[2][48013]}</Text><Text style={dimsz[27].concat([{ backgroundColor: Cnt.clrs.bluecolor, marginHorizontal: dimsz[5] }])}>{item.Id_obj}</Text><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{tempv}{':'}</Text></View><Text numberOfLines={3} style={[Stl.linktext, { fontSize: dimsz[2] }]}>{item.winfo3}</Text></View>);
            break;
        case 38:
            tempv2 = item.Id_obj.split(','); flkey = item.winfo1.split('|'); tempv3 = flkey[0].split(','); flkey = flkey[1];
            details.push(<Text key={0} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{gvar[2][48014]}{' '}{tempv2[0]}{' '}{gvar[2][5705]}{' '}{tempv2[1]}{' '}{parseInt(tempv2[1]) > 1 ? gvar[2][48028] : gvar[2][48027]}{'.\n'}{gvar[2][48026]}{' '}{gvar[2]['lstdoclnk'][tempv3[0]]}{': '}<Text numberOfLines={3} style={[Stl.linktext, { fontSize: dimsz[2] }]}>{item.winfo3}</Text></Text>);
            break;
        case 68:
            flkey = item.winfo1.split('|'); flkey = flkey[1];
            if (moment.tz(item.wobj, systz).tz(moment.tz.guess()).isSameOrAfter(moment().subtract({ hours: gvar[13][23] }))) tempv = gvar[2][48018]; else tempv = gvar[2][48032];
            details.push(<Text key={0} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{tempv}{' '}{item.Id_obj}{' '}{parseInt(item.Id_obj) > 1 ? gvar[2][48028] : gvar[2][48027]}{' '}{gvar[2][48029]}{' '}<Text style={[Stl.linktext]}>{moment.tz(item.wobj, systz).tz(userarray.timezone).format('LLLL')}</Text>{'.'}{mtxt}</Text>);
            break;
        case 19:
            details.push(<Text key={0} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{gvar[2][4809]}</Text>, <Text key={1} style={dimsz[27].concat([{ backgroundColor: Cnt.clrs.bluecolor, marginHorizontal: dimsz[5] }])}>{item.Id_obj}</Text>, <Text key={2} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{parseInt(item.Id_obj) > 1 ? gvar[2][48022] : gvar[2][48021]}{'.'}{mtxt}</Text>);
            break;
        case 49:
            tempv3 = item.Id_obj.split(','); tempv1 = parseInt(tempv3[1]); tempv = tempv1 > 0 ? parseInt(tempv3[0]) / tempv1 * 100 : 0;
            details.push(<Text key={0} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{gvar[2][48012]}{' '}{tempv3[0]}{' '}{gvar[2][5705]}{' '}{tempv3[1]}{' '}{tempv1 > 1 ? gvar[2][48022] : gvar[2][48021]}{'.\n'}</Text>, <View key={1} style={[Stl.itmcont]}><Prg size={dimsz[20]} value={tempv} labels={gvar[2]['lstcmpind']} style={{ flex: 1 }} /><View style={{ flex: 1 }}></View></View>);
            break;
        case 79:
            if (moment.tz(item.wobj, systz).tz(moment.tz.guess()).isSameOrAfter(moment().subtract({ hours: gvar[13][22] }))) tempv = gvar[2][48015]; else tempv = gvar[2][48030];
            details.push(<Text key={0} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{tempv}{' '}{item.Id_obj}{' '}{parseInt(item.Id_obj) > 1 ? gvar[2][48022] : gvar[2][48021]}{' '}{gvar[2][48029]}{' '}<Text style={[Stl.linktext]}>{moment.tz(item.wobj, systz).tz(userarray.timezone).format('LLLL')}</Text>{'.'}{mtxt}</Text>);
            break;
        case 18:
            details.push(<Text key={0} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{gvar[2][48010]}</Text>, <Text key={1} style={dimsz[27].concat([{ backgroundColor: Cnt.clrs.bluecolor, marginHorizontal: dimsz[5] }])}>{item.Id_obj}</Text>, <Text key={2} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{parseInt(item.Id_obj) > 1 ? gvar[2][48020] : gvar[2][48024]}{'.'}{mtxt}</Text>);
            break;
        case 48:
            tempv3 = item.Id_obj.split(',');
            details.push(<Text key={0} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{gvar[2][48011]}{' '}{tempv3[0]}{' '}{gvar[2][5705]}{' '}{tempv3[1]}{' '}{parseInt(tempv3[1]) > 1 ? gvar[2][48025] : gvar[2][48017]}{'.'}{mtxt}</Text>);
            break;
        case 78:
            if (moment.tz(item.wobj, systz).tz(moment.tz.guess()).isSameOrAfter(moment().subtract({ hours: gvar[13][23] }))) tempv = gvar[2][48016]; else tempv = gvar[2][48031];
            details.push(<Text key={0} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{tempv}{' '}{item.Id_obj}{' '}{parseInt(item.Id_obj) > 1 ? gvar[2][48025] : gvar[2][48017]}{' '}{gvar[2][48029]}{' '}<Text style={[Stl.linktext]}>{moment.tz(item.wobj, systz).tz(userarray.timezone).format('LLLL')}</Text>{'.'}{mtxt}</Text>);
            break;
        default:
            details.push(<Prs key={0} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{item.winfo3}</Prs>);
    }
    return (
        <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.opnnot(item, 'uwal', null, flkey)} style={[Stl.rbox2, Stl.aptbg, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }, ibg0]}>
            {icn}<View style={[Stl.fdcol, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1, marginStart: dmns.w16 }]}>
                <View style={[Stl.itmcont, { flex: 1 }]}>
                    <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], paddingEnd: dmns.w16, textAlign: 'left' }]}>{gvar[2]['lstwaltyp'][item.wtype]}</Text></View>
                    <View style={{ width: '34%', alignItems: 'flex-end' }}><Text style={[Stl.lbrdtext, { fontSize: dimsz[2], textAlign: 'right' }, ibg1]}>{wdate1}</Text></View>
                </View>
                <View style={[Stl.rbox2, { paddingTop: dimsz[19] }]}>
                <View style={[Stl.txtwrap]}>{details}</View></View>
            </View>
        </TouchableOpacity>
    )
    }
}
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this); scrnid[rtn][4][0] = Fct.fnduid(); this.updnot = Fct.updnot.bind(this); this.updnot1 = Fct.updnot1.bind(this); this.gtmw = Fct.gtmw.bind(this);
        this.state = Object.assign({ dash }, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading, htxt = gvar[2][95018];
        if (this.state.initiaload) {
            let pdhl, hdrs = [], rsw = dimsz[20] + dimsz[19], ntst = [Stl.inptclear, Stl.nodata, { top: dimsz[5], left: dimsz[3] }]; this.enotif = [];
            if (dmns.lrgs) { pdhl = dmns.w14; } else { pdhl = dmns.w18; }
            switch (parseInt(userarray.Id_typeuser)) {
                case 1: case 2: case 3: case 4: case 5: case 6:
                    for (i = 0; i < epta; i++) { let fi = i; if (flkey == i) hdrs.push(<View key={fi} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center', borderBottomWidth: 2, borderColor: Cnt.clrs.blackcolor }}><Text style={[Stl.rtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][1]].toUpperCase()}</Text></View>); else hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.swipetab(fi)} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center' }}><Text style={[Stl.txth3, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][1]].toUpperCase()}</Text></TouchableOpacity>); }
                    children = [<View key={0} style={[Stl.rbox2, Stl.w100, { backgroundColor: Cnt.clrs.lightbg }]}>{hdrs}</View>, this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f0'} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5] }]} data={this.state.data} renderItem={({ item, index }) => <RDashboard5 tt={this} item={item} index={index} pdhl={pdhl} rsw={rsw} />}
                        keyExtractor={(item) => String(item[scrnid[rtn][14][flkey]])}
                        ListHeaderComponent={this.hedlpg} stickyHeaderIndices={[0]}
                        ListEmptyComponent={this.eptlpg}
                        ListFooterComponent={this.fotlpg}
                        onEndReached={(info) => { if (this.state.fload == 0 && this.state.ldmr) this.loadlpg(2); }}
                        onEndReachedThreshold={0.01}
                        refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />}
                    /> : loading];
                    break;
                case 7: case 8:
                    if(this.state.dash) {
                        for (i = 0; i < epta; i++) { let fi = i; if (flkey == i) hdrs.push(<View key={fi} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center', borderBottomWidth: 2, borderColor: Cnt.clrs.blackcolor }}><Text style={[Stl.rtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></View>); else hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.swipetab(fi)} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center' }}><Text style={[Stl.txth3, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></TouchableOpacity>); }
                        epta = scrnid[rtn][4][7].length; if (epta > 0) { hdrs.push(<View key={i} style={{ marginHorizontal: dimsz[6], height: '70%', borderLeftWidth: 1, borderColor: Cnt.clrs.lgraycolor2 }}></View>); for (i = 0; i < epta; i++) { let fi = scrnid[rtn][4][7][i][0]; hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.nvgscrn(fi, rtn, 0)} style={[Stl.tabicn]}><Icon2 name={Fct.tabicn(scrnid[rtn][4][7][i][1])} style={[Stl.dbcolor, { fontSize: dimsz[24], alignSelf: 'center' }]} />{scrnid[fi][scrnid[fi][4][2]] > 0 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.nvgscrn(fi, rtn, 0)} style={ntst}><Text style={dimsz[27]}>{scrnid[fi][scrnid[fi][4][2]]}</Text></TouchableOpacity> : null}</TouchableOpacity>); } }
                        children = [<View key={0} style={[Stl.rbox2, Stl.w100, { backgroundColor: Cnt.clrs.lightbg }]}>{hdrs}</View>, this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f0'} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5] }]} data={this.state.data} renderItem={({ item, index }) => <RDashboard7 tt={this} item={item} index={index} pdhl={pdhl} />}
                            keyExtractor={(item) => String(item[scrnid[rtn][14][flkey]])}
                            ListHeaderComponent={this.hedlpg} stickyHeaderIndices={[0]}
                            ListEmptyComponent={this.eptlpg}
                            ListFooterComponent={this.fotlpg}
                            onEndReached={(info) => { if (this.state.fload == 0 && this.state.ldmr) this.loadlpg(2); }}
                            onEndReachedThreshold={0.01}
                            refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />}
                        /> : loading];
                    }
                    else {
                        let clsn, ptb, ar, mrg, icns, fis, fid = 'Dashboard';
                        epta = scrnid[rtn][4][7].length; if (epta > 0) {
                        if (dmns.lrgs) { clsn = Stl.rectanglebox; ptb = dmns.h; ar = 0.125; icns = [Stl.lbicon, { fontSize: dimsz[14], alignSelf: 'center', marginBottom: dmns.h16 }]; } else { clsn = Stl.squarebox; ptb = dmns.h7; ar = 0.35; mrg = { margin: 10 }; icns = [Stl.lbicon, { fontSize: dimsz[9], alignSelf: 'center' }]; }
                        for (i = 0; i < epta; i+=2) { let fi = scrnid[rtn][4][7][i][0], fi2 = scrnid[rtn][4][7][i+1]?scrnid[rtn][4][7][i+1][0]:null; fis = fi2; hdrs.push(<View key={fi} style={[Stl.squarerow]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.nvgscrn(fi, rtn, 0)} style={[Stl.rbox, clsn, mrg]}><View style={[Stl.rbox4, { alignItems: 'center', paddingVertical: dmns.h }]}><Icon2 name={Fct.tabicn(scrnid[rtn][4][7][i][1])} style={icns} />{scrnid[fi][scrnid[fi][4][2]] > 0 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.nvgscrn(fi, rtn, 0)} style={ntst}><Text allowFontScaling={false} style={dimsz[27]}>{scrnid[fi][scrnid[fi][4][2]]}</Text></TouchableOpacity> : null}<Text allowFontScaling={false} style={[Stl.txts, { fontSize: dimsz[0], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][4][7][i][1]+"0"+scrnid[rtn][4][7][i][2]].toUpperCase()}</Text></View></TouchableOpacity>{fi2?<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.nvgscrn(fi2, rtn, 0)} style={[Stl.rbox, clsn, mrg]}><View style={[Stl.rbox4, { alignItems: 'center', paddingVertical: dmns.h }]}><Icon2 name={Fct.tabicn(scrnid[rtn][4][7][i+1][1])} style={icns} />{scrnid[fi2][scrnid[fi2][4][2]] > 0 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.nvgscrn(fi2, rtn, 0)} style={ntst}><Text allowFontScaling={false} style={dimsz[27]}>{scrnid[fi2][scrnid[fi2][4][2]]}</Text></TouchableOpacity> : null}<Text allowFontScaling={false} style={[Stl.txts, { fontSize: dimsz[0], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][4][7][i+1][1]+"0"+scrnid[rtn][4][7][i+1][2]].toUpperCase()}</Text></View></TouchableOpacity>:<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={this.gtmw} style={[Stl.rbox, clsn, mrg]}><View style={[Stl.rbox4, { alignItems: 'center', paddingVertical: dmns.h }]}><Icon2 name="newspaper" style={icns} />{scrnid[fid][scrnid[fid][4][2]] > 0 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={this.gtmw} style={ntst}><Text allowFontScaling={false} style={dimsz[27]}>{scrnid[fid][scrnid[fid][4][2]]}</Text></TouchableOpacity> : null}<Text allowFontScaling={false} style={[Stl.txts, { fontSize: dimsz[0], textAlign: 'center' }]}>{gvar[2][48000].toUpperCase()}</Text></View></TouchableOpacity>}</View>); }
                        }
                        if(fis) hdrs.push(<View key={fid} style={[Stl.squarerow]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={this.gtmw} style={[Stl.rbox, { aspectRatio: 1 / ar }, mrg]}><View style={[Stl.rbox4, { alignItems: 'center', paddingVertical: dmns.h }]}><Icon2 name="newspaper" style={icns} />{scrnid[fid][scrnid[fid][4][2]] > 0 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={this.gtmw} style={ntst}><Text allowFontScaling={false} style={dimsz[27]}>{scrnid[fid][scrnid[fid][4][2]]}</Text></TouchableOpacity> : null}<Text allowFontScaling={false} style={[Stl.txts, { fontSize: dimsz[0], textAlign: 'center' }]}>{gvar[2][4800].toUpperCase()}</Text></View></TouchableOpacity></View>);
                        children = <ScrollView ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5], paddingTop: dmns.h16 }]} refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />}>{hdrs}</ScrollView>;
                        htxt = gvar[2][5206] + ' ' + userarray.value;
                    }
                    break;
            }
        }
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, htxt]} renderfoot={[]}>{children}</Mcnt>
        );
    }
}
