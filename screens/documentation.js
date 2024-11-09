class RDocumentation extends React.PureComponent {
    render() {
    var { item, index, pdhl } = this.props;
    let fext = item.idesc.substring(item.idesc.lastIndexOf('.') + 1).toLowerCase(), isvid = gvar[13][6].indexOf(fext) != -1, cbfct;
    if (gvar[13][5].indexOf(fext) != -1) { let ourl = item.url, abcd = this.props.tt.dsrc[0].findIndex(elm => elm.url == ourl); if (abcd == -1) { abcd = this.props.tt.dsrc[0].length; this.props.tt.dsrc[0].push({ url: ourl, props: { title: item.idesc }, id: abcd }); } cbfct = () => Fct.dispimg(0, 0, null, abcd, Cnt.clrs.lightbg); } else { cbfct = () => mnldr.showclose('flex', [9, null, item.url, Cnt.clrs.lightbg, fext, item.idesc, 'http://docs.google.com/gview?embedded=true&url=', isvid]); }
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={cbfct} style={[Stl.itmcont, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            {Fct.setpht(item, Fct.fileicn(item.idesc, fext), [dimsz[9], 2, dimsz[17], null, { backgroundColor: 'rgba(255,255,255,0)', alignSelf: 'flex-start' }], 2)}
            <View style={[Stl.itmhdiv, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1, marginStart: dmns.w16 }]}>
                <View style={[Stl.colico, { flex: 1 }]}>
                    <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[13], textAlign: 'left' }]}>{item.idesc}</Text></View>
                </View>
            </View>
        </TouchableOpacity>
    )
    }
}
export default class Documentation extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this); scrnid[rtn][4][0] = Fct.fnduid(1); this.udls = Fct.udls.bind(this);
        this.state = Object.assign({}, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading;
        if (this.state.initiaload) {
            let pdhl, hdrs = [];
            if (dmns.lrgs) { pdhl = dmns.w14; } else { pdhl = dmns.w18; }
            for (i = 0; i < epta; i++) { let fi = i; if (flkey == i) hdrs.push(<View key={fi} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center', borderBottomWidth: 2, borderColor: Cnt.clrs.blackcolor }}><Text style={[Stl.rtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{scrnid[rtn][1][i][0].toUpperCase()}</Text></View>); else hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.swipetab(fi)} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center' }}><Text style={[Stl.txth3, { fontSize: dimsz[2], textAlign: 'center' }]}>{scrnid[rtn][1][i][0].toUpperCase()}</Text></TouchableOpacity>); }
            children = [<View key={0} style={[Stl.rbox2, Stl.w100, { backgroundColor: Cnt.clrs.lightbg }]}>{hdrs}</View>, this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f0'} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5] }]} data={this.state.data} renderItem={({ item, index }) => <RDocumentation tt={this} item={item} index={index} pdhl={pdhl} />}
                keyExtractor={(item, index) => String(index)}
                ListHeaderComponent={this.hedlpg} stickyHeaderIndices={[0]}
                ListEmptyComponent={this.eptlpg}
                /*ListFooterComponent={this.fotlpg}
                onEndReached={(info) => { if (this.state.fload == 0 && this.state.ldmr) this.loadlpg(2); }}
                onEndReachedThreshold={0.01}*/
                refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />}
            /> : loading];
        }
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, gvar[2][9500]]} renderfoot={[]}>{children}</Mcnt>
        );
    }
}
