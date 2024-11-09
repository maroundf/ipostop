class RAnalytics extends React.PureComponent {
    render() {
    var { item, index, pdhl, rtn, flkey } = this.props;
    let srgf = surglist.find(elm => elm.id == scrnid[rtn][4][0].id), seve = [], comp = [], indc, sevelbl, complbl, tempv, indic;
    switch (index) {
        case 0:
            sevelbl = gvar[2][57018]; complbl = gvar[2][57019];
            break;
        case 1:
            sevelbl = gvar[2][5702]; complbl = gvar[2][5707];
            break;
    }
    if (/*srgf && */item.length && item[0].adate) {
        seve.push(<View key={0} style={[Stl.colcen]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[1], textAlign: 'center', marginTop: dimsz[19], marginBottom: dimsz[1] }]}>{item[0].adate.substr(0, 16)}</Text><Gag size={dimsz[20]} value={item[0].asev} minValue={gvar[13][24][0]} maxValue={gvar[13][24][1]} labels={gvar[2]['lstsevind']} /></View>);
        comp.push(<View key={0} style={[Stl.colcen]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[1], textAlign: 'center', marginTop: dimsz[19], marginBottom: dimsz[1] }]}>{item[0].adate.substr(0, 16)}</Text><Prg size={dimsz[20]} value={item[0].perc} labels={gvar[2]['lstcmpind']} /></View>);
        if (index == 1) {
            let icns = { fontSize: dimsz[18], marginVertical: -dimsz[1] }; scrnid[rtn][4][0].idmp=item[0].idmp;
            if (item.length > 1) {
                if (!Fct.isnull(item[0].asev) && !Fct.isnull(item[1].asev)) {
                    tempv = parseFloat(item[0].asev) - parseFloat(item[1].asev); if (tempv > gvar[13][18][0]) indic = <Icon3 name="trending-down" style={[Stl.ricon, icns]} />; else if (tempv < gvar[13][18][1]) indic = <Icon3 name="trending-up" style={[Stl.gricon, icns]} />; else indic = <Icon3 name="repeat" style={[Stl.hicon, icns]} />;
                } else indic = <Icon3 name="infinite" style={[Stl.mgicon, icns]} />;
            } else indic = <Icon3 name="infinite" style={[Stl.mgicon, icns]} />;
            indc = <View style={[Stl.btmtab, { paddingHorizontal: pdhl }]}>
                <View style={[Stl.colcen, Stl.lsepdiv, { paddingEnd: pdhl, paddingVertical: dimsz[6]}]}><View style={[Stl.coldiv, { flex: 1}]}><Text style={[Stl.txth1, { fontSize: dimsz[1], textAlign: 'center' }]}>{gvar[2][57021].toUpperCase()}</Text><Text style={[Stl.lbrdtext, { fontSize: dimsz[1], textAlign: 'center', marginTop: dimsz[19] }]}>{item[0].adate.substr(0, 16)}</Text></View></View><View style={[Stl.coldiv, Stl.lsepdiv, { paddingStart: pdhl, paddingVertical: dimsz[6], flex: 1}]}>{indic}<Text style={[Stl.rtext2, { fontSize: dimsz[2] }]}>{gvar[2][95041] + ' ' + (item.length < 2 || Fct.isnull(item[1].asev) ? '?' : item[1].asev) + ' ' + gvar[2][95042] + ' ' + (Fct.isnull(item[0].asev) ? '?' : item[0].asev)}</Text></View></View>;
        }
    } else {
        seve = comp = this.props.tt.eptlpg({style:{ paddingHorizontal: 0 }}, null, dimsz[2], 'g'+index);
        if (index == 1) indc = <View style={[Stl.btmtab, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colcen, Stl.lsepdiv, { paddingEnd: pdhl, paddingBottom: dimsz[0] }]}><View style={[Stl.nodata, { flex: 1, justifyContent: 'center' }]}><Text style={[Stl.txth1, { fontSize: dimsz[1], textAlign: 'center' }]}>{gvar[2][57021].toUpperCase()}</Text></View></View><View style={[Stl.colcen, Stl.lsepdiv, { paddingStart: pdhl, paddingBottom: dimsz[0] }]}>{seve}</View></View>;
    }
    return (
        <View key={index}>
        <View style={[Stl.scont, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colcen, Stl.lsepdiv, { paddingEnd: pdhl, paddingBottom: dimsz[0] }]}>
                <Text style={[Stl.txth1, { fontSize: dimsz[1], textAlign: 'center' }]}>{sevelbl.toUpperCase()}</Text>
                {seve}</View>
            <View style={[Stl.colcen, Stl.lsepdiv, { paddingStart: pdhl, paddingBottom: dimsz[0] }]}>
                <Text style={[Stl.txth1, { fontSize: dimsz[1], textAlign: 'center' }]}>{complbl.toUpperCase()}</Text>
                {comp}</View>
        </View>
        {indc}
        </View>
    )
    }
}
class RSfiles extends React.Component {
    render() {
    var { item, index, pdhl, rtn, flkey } = this.props;
    let secdet = [], secname = item[1].toUpperCase(), hdr = index % 2 == 0, icn, estl; if (!hdr) index -= 1;
    if (this.props.tt.state.secst[flkey][index]) {
        icn = "chevron-up";
        if (this.props.tt.state.data[index]) {
            if (this.props.tt.state.data[index].length) {
                if (!hdr) switch (item[0]) {
                    case '55':
                        let subsec = {}; this.props.tt.state.data[index].map((ival, idx) => { if (!subsec[ival.icat]) subsec[ival.icat] = []; subsec[ival.icat].push(<Fct.R55 key={idx} tt={this.props.tt} item={ival} index={idx} pdhl={pdhl} dets={1} />); });
                        Object.keys(subsec).map((okey) => secdet.push(<View key={okey} style={[Stl.txtwrap, { backgroundColor: Cnt.clrs.blackcolor4, paddingHorizontal: pdhl, paddingVertical: dimsz[4] }]}><Text style={[Stl.txts1, { fontSize: dimsz[0] }]}>{Fct.capitalize(gvar[2][(150 + parseInt(okey))+"00"])}</Text></View>, subsec[okey]));
                        break;
                    default:
                        let Ri = Fct['R' + item[0]];
                        this.props.tt.state.data[index].map((ival, idx) => secdet.push(<Ri key={idx} tt={this.props.tt} item={ival} index={idx} pdhl={pdhl} dets={1} />));
                }
            } else secdet = this.props.tt.eptlpg({style:{ height: dimsz[20] }}, null, null, 'g'+index);
        } else {
            secdet = this.props.tt.eptlpg({style:{ height: dmns.lrgs ? dimsz[20] : dmns.h4 }}, null, null, null, 'g'+index); estl = Stl.ybrdr;
            if (!this.props.tt.fetsec[flkey][index]) {
                this.props.tt.fetsec[flkey][index] = true; var fdata = new FormData(), sobj, tempv = {}; fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'gsec'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('uid', scrnid[rtn][4][0].id); fdata.append('myusers', myusers); fdata.append('atab', item[0]);
                fetch(gvar[1][0] + gvar[1][1], { method: 'POST', timeout: gvar[13][65], body: fdata })
                    .then((resp) => resp.json())
                    .then((data) => {
                        if (data) {
                            lstpages[rtn][flkey].data[index] = JSON.parse(TRANS_DECRYPT(data));
                        } else lstpages[rtn][flkey].data[index] = [];
                        if (!this.props.tt.fetsec[flkey].find((elm, ej) => elm && ej != index)) tempv['fload'] = 0;
                        tempv['data'] = []; lstpages[rtn][flkey].data.map((osec, osid) => { tempv['data'][osid] = []; tempv['data'][osid] = lstpages[rtn][flkey].data[osid].map((value) => ({ ...value })); });
                        sobj = [tempv, () => { this.props.tt.fetsec[flkey][index] = null; clearTimeout(this.props.tt.svmr); this.props.tt.svmr = setTimeout(() => this.props.tt.mnscrlvw.scrollToIndex({ index, viewOffset: 0, viewPosition: 0, animated: true }), 0); }, flkey];
                        if (this.props.tt.isloaded && flkey == this.props.tt.state.flkey) this.props.tt.setState(sobj[0], sobj[1]); else scrnid[rtn][3] = sobj;
                    }).catch((error) => { if (this.props.tt.isloaded) { if (!this.props.tt.fetsec[flkey].find((elm, ej) => elm && ej != index)) tempv['fload'] = 0; this.props.tt.setState(tempv, () => { this.props.tt.fetsec[flkey][index] = null; if (this.props.tt.state.secst[flkey][index]) this.props.tt.shitm('secst', index); mntst.show([[gvar[2][14605] + ' [' + secname + ']\n' + gvar[2][11209], 2]]); }); } });
            }
        }
    } else icn = "chevron-down";
    return (
        hdr ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.shitm('secst', index, 'sec')} style={[Stl.rbox2, Stl.secstl, estl]}>
            <View style={[Stl.tabicn, Stl.etbi]}><Icon2 name={Fct.tabicn(item[0])} style={[Stl.lbdicon, { fontSize: dimsz[24], alignSelf: 'center' }]} /></View><View style={[Stl.itmhdiv, { width: '80%', paddingHorizontal: pdhl, paddingVertical: dimsz[0] }]}><View style={[Stl.txtwrap]}><Text style={[Stl.txth1, { fontSize: dimsz[0] }]}>{secname}</Text></View><Icon3 name={icn} style={[Stl.lbdicon, { fontSize: dimsz[6], paddingStart: dimsz[3] }]} /></View>
        </TouchableOpacity> : <View>{secdet}</View>
    )
    }
}

export default class Details extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this); if (typeof scrnid[rtn][4][0] !== 'object') Fct.opndp(scrnid[rtn][4][0], 1, {}, rtn); this.opnchat = Fct.opnchat.bind(this); this.u56 = Fct.u56.bind(this); this.u140 = Fct.u140.bind(this); this.u128 = Fct.u128.bind(this); this.u143 = Fct.u143.bind(this); this.u129 = Fct.u129.bind(this); this.u139 = Fct.u139.bind(this); this.u141 = Fct.u141.bind(this); this.u54 = Fct.u54.bind(this); this.unv = Fct.unv.bind(this);
        this.state = Object.assign({}, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading;
        if (this.state.initiaload) {
            let pdhl, hdrs = [], odata, orndr, oshi;
            if (dmns.lrgs) { pdhl = dmns.w14; } else { pdhl = dmns.w18; }
            for (i = 0; i < epta; i++) { let fi = i; if (flkey == i) hdrs.push(<View key={fi} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center', borderBottomWidth: 2, borderColor: Cnt.clrs.blackcolor }}><Text style={[Stl.rtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></View>); else hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.swipetab(fi)} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center' }}><Text style={[Stl.txth3, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></TouchableOpacity>); }
            epta = scrnid[rtn][4][7].length; if (epta > 0) { hdrs.push(<View key={i} style={{ marginHorizontal: dimsz[6], height: '70%', borderLeftWidth: 1, borderColor: Cnt.clrs.lgraycolor2 }}></View>); for (i = 0; i < epta; i++) { let fi = scrnid[rtn][4][7][i][0], cbfct; switch (fi) { case 'Chatroom': cbfct = () => this.opnchat(scrnid[rtn][4][0].id, null, Object.assign({}, scrnid[rtn][4][0])); break; case 'Profile': cbfct = () => this.opndp(scrnid[rtn][4][0].id, null, Object.assign({}, scrnid[rtn][4][0]), fi); break; default: cbfct = () => this.nvgscrn(fi, rtn, 0); } hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={cbfct} style={[Stl.tabicn]}><Icon2 name={Fct.tabicn(scrnid[rtn][4][7][i][2])} style={[Stl.dbcolor, { fontSize: dimsz[24], alignSelf: 'center' }]} /></TouchableOpacity>); } }
                switch (parseInt(flkey)) {
                    case 0:
                        if (this.state.data) {
                            odata = this.state.data; orndr = ({ item, index }) => <RAnalytics tt={this} item={item} index={index} pdhl={pdhl} rtn={rtn} flkey={flkey} />; oshi = [0];
                        }
                        break;
                    case 1:
                        odata = scrnid[rtn][9][flkey]; orndr = ({ item, index }) => <RSfiles tt={this} item={item} index={index} pdhl={pdhl} rtn={rtn} flkey={flkey} />; oshi = scrnid[rtn][10][flkey];
                        break;
                }
            children = [<View key={0} style={[Stl.rbox2, Stl.w100, { backgroundColor: Cnt.clrs.lightbg }]}>{hdrs}</View>, this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f0'} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5] }]} data={odata} renderItem={orndr}
                keyExtractor={(item, index) => String(index)}
                ListHeaderComponent={this.hedlpg} stickyHeaderIndices={oshi} removeClippedSubviews={false}
                ListEmptyComponent={this.eptlpg}
                refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />} /> : loading];
        }
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, gvar[2][45043], Fct.setval(scrnid[rtn][4][0])]} renderfoot={[]}>{children}</Mcnt>
        );
    }
}
