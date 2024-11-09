class RNotifications extends React.PureComponent {
    render() {
    var { item, index, pdhl } = this.props;
    let ibg0, ibg1, mstate = parseInt(item.mstate), s07 = Fct.setval(item, 1), wdate1 = item.ndate.substr(0, 16), s08, ttle, mtext, fext, isvid, icn, hdr, ibg, fldnam = 'notification', atbnam = 'ntype';
    if (mstate == 1) { ibg = Stl.bicon2; ibg0 = { backgroundColor: Cnt.clrs.blackcolor2 }; ibg1 = { color: Cnt.clrs.bluecolor }; this.props.tt.enotif.push(item.Id_not); } else { ibg = Stl.bicon; }
    mtext = item.mtext; //mtext = item.mtext.indexOf(': '); if (mtext == -1) mtext = item.mtext; else mtext = item.mtext.substring(mtext + 2);
    if (item.cpname) ttle = item.cpname.toUpperCase();
    if (!item.id || gvar[13][94].indexOf(',' + item[atbnam] + ',') != -1) { ttle = gvar[2][137056]; s07 = null; icn = Fct.setpht({}, null, [dimsz[7], dimsz[8], dimsz[17], null, { backgroundColor: Cnt.clrs.yellowcolor }, ibg]); }
    if (item.wmedia) {
        fext = item.wmedia.substring(item.wmedia.lastIndexOf('.') + 1).toLowerCase(); isvid = gvar[13][6].indexOf(fext) != -1;
        if (gvar[13][5].indexOf(fext) != -1) icn = Fct.setpht(item, null, [dimsz[7], dimsz[8], dimsz[17], null, { backgroundColor: Cnt.clrs.yellowcolor }, ibg, null, fldnam, atbnam, () => this.props.tt.opnnot(item, null, () => {})], [this.props.tt.dsrc, 0, item.wmedia + ' [' + wdate1 + ']']); else icn = Fct.setpht(item, Fct.fileicn(item.wmedia, fext), [dimsz[7], dimsz[8], dimsz[17], null, { backgroundColor: Cnt.clrs.yellowcolor }, ibg, () => { let tempv = item.wobj && item.wobj.indexOf('/') != -1; mnldr.showclose('flex', [9, null, (tempv && item.wobj.indexOf('http') != -1 ? '' : gvar[1][0]) + (tempv ? item.wobj : fldnam + '/' + item[atbnam] + '/media') + '/' + item.wmedia, null, fext, item.wmedia + ' [' + wdate1 + ']', 'http://docs.google.com/gview?embedded=true&url=', isvid], () => this.props.tt.opnnot(item, null, () => {})); }, fldnam, atbnam], 2); mtxt = '\n' + gvar[2][48036];
    } else if(!icn) icn = Fct.setpht(item, Fct.noticn(item[atbnam]), [dimsz[7], dimsz[8], dimsz[17], null, { backgroundColor: 'rgba(255,255,255,0)', borderColor: Cnt.prps.l2opcty, borderWidth: 1 }], 2);
    if(s07) s08 = mtext.substring(0, s07.length).toLowerCase() == s07.toLowerCase();
    if (!ttle && !s08) { ttle = s07; s07 = null; }
    if (s07 && s08) s07 = null;
    if(parseInt(item.ntype)>0) hdr=gvar[2]['lstnottyp'][item.ntype]; else hdr=gvar[2]['lstwaltyp'][-item.ntype];
    return (
        <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.opnnot(item)} style={[Stl.rbox2, Stl.aptbg, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }, ibg0]}>
            {icn}<View style={[Stl.fdcol, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1, marginStart: dmns.w16 }]}>
                <View style={[Stl.itmcont, { flex: 1 }]}>
                    <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{hdr}</Text></View>
                    <View style={{ width: '34%', alignItems: 'flex-end' }}><Text style={[Stl.lbrdtext, { fontSize: dimsz[2], textAlign: 'right', paddingTop: 3 }, ibg1]}>{wdate1}</Text></View>
                </View>
                <View style={[Stl.itmhdiv, { flex: 1, marginTop: dimsz[4] }]}>
                    {ttle || s07 ? <View style={[Stl.txtwrap]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[3] }]}>{ttle}{s07 ? ' (' + s07 + ')' : ''}{':'}</Text></View> : null}
                </View>
                <View style={[Stl.rbox2, { paddingTop: dimsz[19] }]}>
                    <View style={[Stl.txtwrap]}><Prs style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{Fct.setxt(mtext)}</Prs></View></View>
            </View>
        </TouchableOpacity>
    )
    }
}
export default class Notifications extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this); scrnid[rtn][4][0] = Fct.fnduid(); this.updnot = Fct.updnot.bind(this); this.updnot1 = Fct.updnot1.bind(this);
        this.state = Object.assign({}, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading;
        if (this.state.initiaload) {
            let pdhl, hdrs = []; this.enotif = [];
            if (dmns.lrgs) { pdhl = dmns.w14; } else { pdhl = dmns.w18; }
            for (i = 0; i < epta; i++) { let fi = i; if (flkey == i) hdrs.push(<View key={fi} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center', borderBottomWidth: 2, borderColor: Cnt.clrs.blackcolor }}><Text style={[Stl.rtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></View>); else hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.swipetab(fi)} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center' }}><Text style={[Stl.txth3, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></TouchableOpacity>); }
            children = [<View key={0} style={[Stl.rbox2, Stl.w100, { backgroundColor: Cnt.clrs.lightbg }]}>{hdrs}</View>, this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f0'} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5] }]} data={this.state.data} renderItem={({ item, index }) => <RNotifications tt={this} item={item} index={index} pdhl={pdhl} />}
                keyExtractor={(item) => String(item[scrnid[rtn][14][flkey]])}
                ListHeaderComponent={this.hedlpg}
                ListEmptyComponent={this.eptlpg}
                ListFooterComponent={this.fotlpg}
                onEndReached={(info) => { if (this.state.fload == 0 && this.state.ldmr) this.loadlpg(2); }}
                onEndReachedThreshold={0.01}
                refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />}
            /> : loading];
        }
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, gvar[2][10504]]} renderfoot={[]}>{children}</Mcnt>
        );
    }
}
