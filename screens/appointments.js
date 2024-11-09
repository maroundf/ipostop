class RAppointments extends React.PureComponent {
    render() {
    var { item, index, pdhl, s, cbc, aco, ari } = this.props; if(item.confirmed) { cbc = () => {}; aco = 1; ari = null; }
    let ovalue = Fct.setval(item, 1), icn = Fct.setpht(item, null, [dimsz[14], dimsz[10], null, { marginBottom: 0 }], [this.props.tt.dsrc, 0, null, ovalue]), vdate = item.pdate.substr(0, 16);
    return (
        <TouchableOpacity activeOpacity={aco} onPress={() => cbc(item, vdate, ovalue)} style={[Stl.fdcol, Stl.lshdw, Stl.aptbg, { paddingHorizontal: pdhl, paddingVertical: dimsz[2], marginHorizontal: dimsz[3], marginTop: dimsz[2], flex: 1 }, s[0]]}>
            <View style={[Stl.itmhdiv, { flex: 1 }]}>
            <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[6], textAlign: 'left' }]}>{gvar[2]['lstvistyp'][item.vtype]}</Text></View>
            {ari}
            </View>
            <View style={s[2]}>
                {icn}
                <View style={s[1]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{ovalue}</Text></View>
            </View>
            <View style={s[2]}>
                <Icon3 name="calendar" style={s[3].concat([Stl.hicon])} />
                <View style={s[1]}><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{vdate}</Text></View>
            </View>
            <View style={s[2]}>
                <Icon3 name="location" style={s[3].concat([Stl.lbdicon])} />
                <View style={s[1]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{item.place}</Text></View>
            </View>
            <View style={s[2]}>
                <Icon3 name="ellipsis-vertical" style={s[3]} />
                <View style={s[1]}><Text style={[Stl.smalltext, { fontSize: dimsz[1] }]}>{Fct.setxt(item.details)}</Text></View>
            </View>
        </TouchableOpacity>
    )
    }
}
export default class Appointments extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this); scrnid[rtn][4][0] = Fct.fnduid();
        this.state = Object.assign({}, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading;
        if (this.state.initiaload) {
            let pdhl, hdrs = [], s0, cbc, aco, ari;
            if (dmns.lrgs) { pdhl = dmns.w14; } else { pdhl = dmns.w18; }
            if (this.state.flkey == 1) { cbc = () => {}; aco = Cnt.prps.dsbopcty; s0 = { opacity: Cnt.prps.dsbopcty, backgroundColor: Cnt.prps.l1opcty }; } else { if(!userarray['enb104'][phys]) { cbc = (item, vdate, ovalue) => mnldr.showclose('flex', [13, null, item, 104, vdate, ovalue], null, { reqs: [] }); aco = Cnt.prps.tchblopcty; ari=<Icon3 name="chevron-forward" style={[Stl.uicon, { fontSize: dimsz[8] }]} />; } else { cbc = () => mntst.show([[gvar[2][userarray['enb104'][phys]], 1]]); aco = 1; } s0 = { backgroundColor: Cnt.clrs.blackcolor2 }; }
            for (i = 0; i < epta; i++) { let fi = i; if (flkey == i) hdrs.push(<View key={fi} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center', borderBottomWidth: 2, borderColor: Cnt.clrs.blackcolor }}><Text style={[Stl.rtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></View>); else hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.swipetab(fi)} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center' }}><Text style={[Stl.txth3, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></TouchableOpacity>); }
            children = [<View key={0} style={[Stl.rbox2, Stl.w100, { backgroundColor: Cnt.clrs.lightbg }]}>{hdrs}</View>, this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f0'} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5] }]} data={this.state.data} renderItem={({ item, index }) => <RAppointments tt={this} item={item} index={index} pdhl={pdhl} cbc={cbc} aco={aco} ari={ari} s={[s0, [Stl.txtwrap, { paddingStart: dimsz[2] }], [Stl.rbox2, Stl.lsepdiv, { flex: 1, paddingVertical: dimsz[2] }], [Stl.wicon, { fontSize: dimsz[17], width: dimsz[14], textAlign: 'center' }]]} />}
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
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, gvar[2][10400]]} renderfoot={[]}>{children}</Mcnt>
        );
    }
}
