export default class Tasks extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this); scrnid[rtn][4][0] = Fct.fnduid(1); Fct.compmsg(rtn); this.onsqst = Fct.onsqst.bind(this); this.onse = Fct.onse.bind(this); this.onpr = Fct.onpr.bind(this); this.onne = Fct.onne.bind(this); this.checkval = Fct.checkval.bind(this); this.radioval = Fct.radioval.bind(this); this.rquest = Fct.rquest.bind(this); this.squest = Fct.squest.bind(this);
        this.state = Object.assign({}, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
        if(Platform.OS == 'android') this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true
        }); else this._panResponder = {};
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading;
        if (this.state.initiaload) {
            let pdhl, pdhv, mnwd;
            if (dmns.lrgs) { pdhl = dmns.w14; pdhv = { paddingHorizontal: dimsz[9], paddingVertical: dimsz[6] }; mnwd = '60%'; } else { pdhl = dmns.w18; pdhv = { paddingHorizontal: dimsz[6], paddingVertical: dimsz[6] }; mnwd = '80%'; }
            let cstl = [Stl.lsepdiv, { paddingStart: dmns.w6, paddingEnd: pdhl, paddingVertical: dimsz[2], marginBottom: 1 }];
            children = [this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f0'} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} removeClippedSubviews={false} onMomentumScrollEnd={(e) => this.onse(e)} scrollEnabled={!this.state.sldng} keyboardShouldPersistTaps={"handled"} style={{ width: dmns.width, height: '100%' }} data={this.state.data} renderItem={({ item, index }) => <Fct.R57 tt={this} item={item} index={index} pdhl={pdhl} pdhv={pdhv} stips={[Stl.filename, { fontSize: dimsz[2], marginTop: 1 }]} btnstl={[Stl.wicon, { fontSize: dimsz[10] }]} istl={[Stl.linpt, Stl.w100, Stl.shdw, { minHeight: dimsz[15], fontSize: dimsz[0], marginBottom: dmns.h17, paddingHorizontal: dimsz[6], paddingVertical: dmns.h }]} vstl={[Stl.orbtn, Stl.dbtn, Stl.shdw, Stl.nodata, { paddingHorizontal: dimsz[1], paddingVertical: dimsz[0], marginBottom: dmns.h17 }]} sstl={{ width: '95%', height: dimsz[9] }} mnwd={mnwd} cstl={cstl} />}
                keyExtractor={(item) => String(item[scrnid[rtn][14][flkey]])}
                ListHeaderComponent={this.hedlpg}
                ListEmptyComponent={this.eptlpg}
                /*ListFooterComponent={this.fotlpg}
                onEndReached={(info) => { if (this.state.fload == 0 && this.state.ldmr) this.loadlpg(2); }}
                onEndReachedThreshold={0.01}*/
            /> : loading];
        }
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, gvar[2][6002]]} renderfoot={[]}>{children}</Mcnt>
        );
    }
}
