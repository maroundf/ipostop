class RMessenger extends React.PureComponent {
    render() {
    var { item, index, pdhl } = this.props;
    let ibg0, ibg1, cnt = parseInt(item.cnt), s07, wcicon; if(index == 0) scrnid['Messenger'][13][3] = [[], []];
    if (cnt > 0) { ibg0 = { backgroundColor: Cnt.clrs.blackcolor2 }; ibg1 = { color: Cnt.clrs.bluecolor }; }
    if (item.Id_target.substr(0, 2) == 'cp') { s07 = Fct.setval(item, 1); scrnid['Messenger'][13][3][0].push(item.Id_target.substr(2)); } else { if (item.id == userarray.id) s07 = gvar[2][907]; scrnid['Messenger'][13][3][1].push(item.Id_target); }
    if (s07) s07 = <Text numberOfLines={1} style={[Stl.lbrdtext, { fontSize: dimsz[3], paddingEnd: dmns.w16 }]}>{s07}{':'}</Text>;
    if(item.wcicon) { wcicon = item.wcicon.split('|'); wcicon = <Icon3 name={wcicon[0]} style={{ fontSize: dimsz[6], paddingEnd: dimsz[4], color: Cnt.prps.callst[item.webconf] || Cnt.prps.callst[wcicon[1]] || wcicon[1] }} />; }
    return (
        <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.opnchat(item.Id_target, null, Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }, ibg0]}>
            {Fct.setpht(item, null, [dimsz[7], dimsz[8]])}
            <View style={[Stl.fdcol, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1, marginStart: dmns.w16 }]}>
                <View style={[Stl.itmcont, { flex: 1 }]}>
                    <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{Fct.setval(item)}</Text></View>
                    <View style={{ width: '34%', alignItems: 'flex-end' }}><Text style={[Stl.lbrdtext, { fontSize: dimsz[2], textAlign: 'right', paddingTop: 3 }, ibg1]}>{item.mdate.substr(0, 16)}</Text></View>
                </View>
                <View style={[Stl.itmhdiv, { flex: 1, marginTop: dimsz[4] }]}>
                    <View style={[Stl.rbox2, { paddingEnd: dimsz[4] }]}>{item.Id_typeuser == 8 ? <Icon2 name="user-nurse" style={[Stl.dbicon, { fontSize: dimsz[6] }]} /> : null}{s07}</View>
                    {cnt > 0 ? <View style={{ flexGrow: 1, alignItems: 'flex-end' }}><Text style={dimsz[27].concat([{ backgroundColor: Cnt.clrs.bluecolor }])}>{item.cnt}</Text></View> : null}
                </View>
                <View style={[Stl.rbox2, { paddingTop: dimsz[19] }]}>{wcicon}{item.mtext ? <View style={[Stl.txtwrap]}><Text numberOfLines={2} style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{Fct.setxt(item.mtext)}</Text></View> : <View style={[Stl.rbox2]}><Icon2 name={Fct.fileicn(item.mfile)} style={{ fontSize: dimsz[6], color: Cnt.clrs.disabledbg, marginEnd: dimsz[4] }} /><View style={[Stl.txtwrap]}><Text numberOfLines={2} style={[Stl.linktext, { fontSize: dimsz[2], color: Cnt.clrs.footbg }]}>{item.mfile}</Text></View></View>}</View>
            </View>
        </TouchableOpacity>
    )
    }
}
export default class Messenger extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this); scrnid[rtn][4][0] = Fct.fnduid(); this.opnchat = Fct.opnchat.bind(this);
        this.state = Object.assign({}, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading;
        if (this.state.initiaload) {
            let pdhl;
            if (dmns.lrgs) { pdhl = dmns.w14; } else { pdhl = dmns.w18; }
            children = [this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f0'} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5] }]} data={this.state.data} renderItem={({ item, index }) => <RMessenger tt={this} item={item} index={index} pdhl={pdhl} />}
                keyExtractor={(item) => String(item[scrnid[rtn][14][flkey]])}
                ListHeaderComponent={this.hedlpg} stickyHeaderIndices={[0]}
                ListEmptyComponent={this.eptlpg}
                ListFooterComponent={this.fotlpg}
                onEndReached={(info) => { if (this.state.fload == 0 && this.state.ldmr) this.loadlpg(2); }}
                onEndReachedThreshold={0.01}
                refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />}
            /> : loading];
        }
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, gvar[2][103017]]} renderfoot={[]}>{children}</Mcnt>
        );
    }
}
