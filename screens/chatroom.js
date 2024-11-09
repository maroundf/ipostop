var idx = 0, Id_sender;
class RChatroom extends React.PureComponent {
    render() {
    var { item, index, idconvpool } = this.props;
    let s07, mrgt = dimsz[19], jsc, vbg, lvw = [], rvw = [], nbread, ttle, fext, isvid, url, mfile, mdate, mnv, wcicon, estl = [Stl.pzp, Stl.istl], ecn, pend = 0, mnstl = [Stl.clmndiv, { maxWidth: '85%', paddingVertical: dimsz[4], paddingHorizontal: dimsz[2], borderRadius: dimsz[23] }];
    if (item.id != Id_sender) { /*mrgt = dimsz[4];*/ Id_sender = item.id; }
    if (item.sending) {
        jsc = 'flex-end'; vbg = Cnt.clrs.lightbg;
        mnv = <View style={mnstl.concat([{ backgroundColor: vbg }])}>
        <View style={[{ height: dimsz[9], marginVertical: dimsz[4], alignSelf: 'center' }]}><Image source={loadind} style={[Stl.image]} /></View>
        </View>;
    } else {
    mdate = item.mdate.substr(0, 16); if(item.wcicon) { wcicon = item.wcicon.split('|'); wcicon = <Icon3 name={wcicon[0]} style={{ fontSize: dimsz[24], paddingEnd: dimsz[4], color: Cnt.prps.callst[item.webconf] || Cnt.prps.callst[wcicon[1]] || wcicon[1] }} />; pend = dimsz[25]; }
    if (item.id == userarray.id) {
        if (item.nbread) nbread = item.nbread.split(',').length; else nbread = 0; ttle = gvar[2][907];
        jsc = 'flex-end'; vbg = Cnt.clrs.lightbg;
        //if (item.Id_typeuser == 8) rvw.push(<Icon2 name="user-nurse" key={0} style={[Stl.hicon, { fontSize: dimsz[24], paddingEnd: dimsz[4] }]} />);
        //if (item.cmplct) rvw.push(<Icon3 name="warning" key={1} style={[Stl.uicon, { fontSize: dimsz[24], paddingStart: dimsz[4] }]} />);
        /*rvw = <Icon3 name="arrow-forward" style={{ fontSize: dimsz[9], marginStart: -0.25, color: vbg }} />;*/
        s07 = <Icon3 name="checkmark-done" style={[nbread >= parseInt(item.nbsent) ? Stl.uicon : Stl.dbcolor, { fontSize: dimsz[23], paddingEnd: dimsz[6], marginTop: -2 }]} />;
    } else {
        ttle = Fct.setval(item, 1); jsc = 'flex-start'; if (!item.Id_typeuser || item.webconf) vbg = Cnt.prps.msgbg[0]; else vbg = Cnt.prps.msgbg[item.Id_typeuser];
        //if (item.Id_typeuser == 8) lvw.push(<Icon2 name="user-nurse" key={0} style={[Stl.hicon, { fontSize: dimsz[24], paddingEnd: dimsz[4] }]} />);
        //if (item.cmplct) lvw.push(<Icon3 name="warning" key={1} style={[Stl.uicon, { fontSize: dimsz[24], paddingEnd: dimsz[4] }]} />);
        /*lvw = <Icon3 name="arrow-back" style={{ fontSize: dimsz[9], marginEnd: -0.25, color: vbg }} />;*/
        s07 = <View style={{minWidth:'40%',maxWidth:'65%'}}><View style={[Stl.txtwrap]}><Text style={[Stl.rtext, { fontSize: dimsz[2], paddingEnd: dimsz[0] }]}>{ttle}</Text></View></View>;
    }
    if (item.mfile) {
        fext = item.mfile.substring(item.mfile.lastIndexOf('.') + 1).toLowerCase(); isvid = gvar[13][6].indexOf(fext) != -1;
        if (idconvpool) url = gvar[1][0] + 'convpool/' + idconvpool + '/message/'; else url = gvar[1][0] + 'login/' + item.id + '/message/';
        if(isvid) { ecn = <Iml source={{ uri: url + '_thumb/' + item.mfile.replace('.'+fext, '.jpg') }} style={[Stl.image]} cstyle={[Stl.cstl]} mwdth={dmns.w60} mhght={dmns.h18} isvid={isvid} />; } else { estl = estl.concat([{ minWidth: dimsz[7], minHeight: dimsz[7] }]); ecn = <Icon2 name={Fct.fileicn(item.mfile, fext)} style={[Stl.lbicon, { fontSize: dimsz[9] }]} />; }
        if (gvar[13][5].indexOf(fext) != -1) { let ourl = url + item.mfile, abcd = this.props.tt.dsrc[0].findIndex(elm => elm.url == ourl); if (abcd == -1) { abcd = this.props.tt.dsrc[0].length; this.props.tt.dsrc[0].push({ url: ourl, props: { title: gvar[2][103033] + ': ' + ttle + ' [' + mdate + ']' }, id: abcd }); } mfile = <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.dispimg(0, 0, null, abcd)}><Iml source={{ uri: url + '_thumb/' + item.mfile }} style={[Stl.image]} cstyle={[Stl.cstl]} mwdth={dmns.w60} mhght={dmns.h18} /></TouchableOpacity>; idx++; } else mfile = <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => mnldr.showclose('flex', [9, null, url + item.mfile, null, fext, gvar[2][103033] + ': ' + ttle + ' [' + mdate + ']', 'http://docs.google.com/gview?embedded=true&url=', isvid])} style={estl}>{ecn}{/*<Text numberOfLines={2} style={[Stl.linktext, { fontSize: dimsz[2], color: Cnt.clrs.dgraycolor }]}>{item.mfile}</Text>*/}</TouchableOpacity>;
    }
    mnv = <View style={mnstl.concat([{ backgroundColor: vbg }])}>
        <View style={[Stl.itmhdiv,{alignItems: 'flex-start'}]}>{s07}<View style={{ flexGrow: 1, alignItems: 'flex-end' }}><Text style={[Stl.dgtext, { fontSize: dimsz[2], textAlign: 'right' }]}>{mdate}</Text></View></View>
        <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}>{wcicon}{item.mtext ? <Prs style={[Stl.txth6, { fontSize: dimsz[2], paddingEnd: pend }]}>{Fct.setxt(item.mtext)}</Prs> : null}</View>{mfile}
        </View>;
    }
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => { }} style={[Stl.rbox2, { paddingHorizontal: dimsz[3], justifyContent: jsc, marginBottom: mrgt }]}>
            {lvw}{mnv}{rvw}
        </TouchableOpacity>
    )//Linking.openURL(e).catch((error) => mnldr.showclose('flex', [9, null, (e.startsWith('http') ? '' : 'http://'), null, 'http', gvar[2][103033] + ': ' + ttle + ' [' + mdate + ']', '']))
    }
}
export default class Chatroom extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this); this.smsg = Fct.smsg.bind(this); this.treatfile = Fct.treatfile.bind(this); if (typeof scrnid[rtn][4][0] !== 'object') Fct.opnchat(scrnid[rtn][4][0], 1, {});
        this.state = Object.assign({ mtext: null, cmplct: null, ostts: scrnid[rtn][4][0].ostts, reqfld: {} }, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading, idconvpool;
        if (this.state.initiaload) {
            idconvpool = scrnid['Chatroom'][4][0].id && scrnid['Chatroom'][4][0].id.substr(0, 2) == 'cp' ? scrnid['Chatroom'][4][0].id.substr(2) : null;
            children = [this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f'+this.state.a} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} inverted={true} keyboardShouldPersistTaps={"never"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5] }, this.state.data.length < 9 ? { justifyContent: 'flex-end' } : null ]} data={this.state.data} renderItem={({ item, index }) => <RChatroom tt={this} item={item} index={index} idconvpool={idconvpool} />}
                keyExtractor={(item) => String(item[scrnid[rtn][14][flkey]])}
                /*ListHeaderComponent={this.hedlpg} stickyHeaderIndices={[0]}*/
                ListEmptyComponent={this.eptlpg}
                ListFooterComponent={this.fotlpg}
                onEndReached={(info) => { if (this.state.fload == 0 && this.state.ldmr) this.loadlpg(2); }}
                onEndReachedThreshold={0.01}
                refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />}
            /> : loading, this.stslpg()];
        }
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, gvar[2][45030]]} renderfoot={[]}>{children}</Mcnt>
        );
    }
}
