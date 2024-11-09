class MList extends React.PureComponent {
    render() {
    var { item, index, csrn, sfs } = this.props;
    var { idx, lid, indx, okey } = this.props.tt.state;
    let acb, cbfct, tempv;
    switch (parseInt(idx)) {
        case 1:
        case 3:
            acb = () => this.props.tt.setState({ a: !this.props.tt.state.a }); tempv = csrn.state.sord == 'DESC' ? 'ASC' : 'DESC'; cbfct = item[2] ? () => { csrn.loadlpg(1, null, item[0], tempv, acb); } : () => csrn.setState({ sort: item[0], sord: tempv, data: csrn.srtlpg(item[0], tempv) }, acb);
            if (item[0] == csrn.state.sort)
                return (<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={cbfct} style={[Stl.itmhdiv, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4], backgroundColor: Cnt.clrs.lbluecolor  }]}><Icon3 name={csrn.state.sord == 'DESC' ? "arrow-down-circle" : "arrow-up-circle"} style={[Stl.wicon, { fontSize: dimsz[6], opacity: item[0] == '' ? 0 : 1 }]} /><View style={[Stl.txtwrap, { paddingStart: dimsz[0] }]}><Text style={[Stl.txts1, { fontSize: sfs }]}>{item[1]}</Text></View></TouchableOpacity>)
            else return (<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={cbfct}style={[Stl.itmhdiv, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4] }]}><Icon3 name="arrow-up-circle" style={[Stl.wicon, { fontSize: dimsz[6], opacity: 0 }]} /><View style={[Stl.txtwrap, { paddingStart: dimsz[0] }]}><Text style={[Stl.glbicon, { fontSize: dimsz[2] }]}>{item[1]}</Text></View></TouchableOpacity>)
        break;
        case 2:
            return (<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.toggle(() => csrn.opnchat(item.id, null, Object.assign({}, item)))} style={[Stl.itmhdiv, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4] }]}>{Fct.setpht(item, null, [dimsz[18], dimsz[17], null, { marginBottom: 0 }])}<View style={[Stl.txtwrap, { paddingStart: dimsz[0] }]}><Text style={[Stl.glbicon, { fontSize: dimsz[2] }]}>{Fct.setval(item)}</Text></View></TouchableOpacity>)
        break;
        case 14:
            let isup = item ? Fct.setval(item) : gvar[2][57012];
            if(item.id == csrn.state.data[indx][okey]) { acb = { backgroundColor: Cnt.clrs.lbluecolor }; cbfct = [Stl.txts1, { fontSize: sfs }]; } else { acb = {}; cbfct = [Stl.glbicon, { fontSize: dimsz[2] }]; }
            return (<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.toggle(() => { if(csrn.state.data[indx][okey] != item.id) csrn.chgti(indx, [[okey, item.id], ['isup', isup]]); })} style={[Stl.itmhdiv, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4] }].concat([acb])}><View style={[Stl.txtwrap, { paddingStart: dimsz[0] }]}><Text style={cbfct}>{isup}</Text></View></TouchableOpacity>)
        break;
        case 5:
        case 15:
        case 16:
            if(item == csrn.state.data[indx][okey]) { acb = { backgroundColor: Cnt.clrs.lbluecolor }; cbfct = [Stl.txts1, { fontSize: sfs }]; } else { acb = {}; cbfct = [Stl.glbicon, { fontSize: dimsz[2] }]; }
            return (<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.toggle(() => { if(csrn.state.data[indx][okey] != item) csrn.chgti(indx, [[okey, item]]); })} style={[Stl.itmhdiv, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4] }].concat([acb])}><View style={[Stl.txtwrap, { paddingStart: dimsz[0] }]}><Text style={cbfct}>{item?lid[item]:gvar[2][57012]}</Text></View></TouchableOpacity>)
        break;
        case 17:
            if(csrn.state.data[indx][okey].indexOf(','+item[0]+',') != -1) { acb = { backgroundColor: Cnt.clrs.lbluecolor }; cbfct = [Stl.txts1, { fontSize: sfs }]; } else { acb = {}; cbfct = [Stl.glbicon, { fontSize: dimsz[2] }]; }
            return (<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => { var aval; if(item[0]) { aval = csrn.state.data[indx][okey]; if(aval.indexOf(','+item[0]+',')==-1) { if(aval=='') aval=','+item[0]+','; else aval+=item[0]+','; } else { aval=aval.replace(','+item[0]+',',','); if(aval==',') aval=''; } } else aval = item[0]; csrn.chgti(indx, [[okey, aval]], null, null, null, null, () => this.props.tt.setState({ a: !this.props.tt.state.a })); }} style={[Stl.itmhdiv, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4] }].concat([acb])}><View style={[Stl.txtwrap, { paddingStart: dimsz[0] }]}><Text style={cbfct}>{item[0]?item[1]:gvar[2][57012]}</Text></View></TouchableOpacity>)
        break;
        case 6:
            if(item == csrn.state.data[indx][okey]) { acb = { backgroundColor: Cnt.clrs.lbluecolor }; cbfct = [Stl.txts1, { fontSize: sfs }]; } else { acb = {}; cbfct = [Stl.glbicon, { fontSize: dimsz[2] }]; }
            return (<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.toggle(() => { if(csrn.state.data[indx][okey] != item) { var regx = csrn.state.data[indx]['country'] != '' ? new RegExp('^(\\+|00)' + gvar[2]['lstcntrys'][csrn.state.data[indx]['country']]['pcode']) : null; csrn.chgti(indx, [[okey, item], ['timezone', lid[item]?(lid[item]['tmzn'].split(',')[0]).split('|')[0]:'']], null, null, null, null, () => csrn.adjphone(indx, [['phone', gvar[2][137022]]], null, regx)); }})} style={[Stl.itmhdiv, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4] }].concat([acb])}><View style={[Stl.txtwrap, { paddingStart: dimsz[0] }]}><Text style={cbfct}>{lid[item]?lid[item]['textl']:gvar[2][57012]}</Text></View></TouchableOpacity>)
        break;
        case 7:
            if(item[0] == csrn.state.data[indx][okey]) { acb = { backgroundColor: Cnt.clrs.lbluecolor }; cbfct = [Stl.txts1, { fontSize: sfs }]; } else { acb = {}; cbfct = [Stl.glbicon, { fontSize: dimsz[2] }]; }
            return (<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.toggle(() => { if(csrn.state.data[indx][okey] != item[0]) csrn.chgti(indx, [[okey, item[0]]]); })} style={[Stl.itmhdiv, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4] }].concat([acb])}><View style={[Stl.txtwrap, { paddingStart: dimsz[0] }]}><Text style={cbfct}>{item[1]||gvar[2][57012]}</Text></View></TouchableOpacity>);
        break;
    }
    }
}
export default class List extends React.Component {
    constructor(props) {
        super(props); this.state = { display: 'none', otp: dmns.height, hed: null, data: null }; this.isloaded = 1;
    }
    showclose(dv, idx, cbfct, lid, indx, okey) {
        let csrn = crnscrn || dshscrn;
        if (this.isloaded) {
            if (dv == 'flex') {
        kfct = () => {
                if (csrn.inputs[idx]) csrn.inputs[idx].measure((ex, ey, ow, oh, ox, oy) => {
                    var wdth = Math.max(ow, dmns.w50), ostl = { backgroundColor: Cnt.clrs.lightbg, width: wdth, position: 'absolute' }, otp = oy + oh, hed, data, sti, itr, hght = dmns.height - otp - sai[2];
                    if (hght < dmns.h25) {
                        ostl['bottom'] = dmns.height - oy + dmns.h; ostl['maxHeight'] = dmns.height - ostl['bottom'] - sai[0];
                    } else {
                        ostl['top'] = otp - dmns.h; ostl['maxHeight'] = hght;
                    }
                    if (ox + wdth > dmns.width - sai[1]) {
                        ostl['right'] = dmns.width - (ox + ow); if (ostl['right'] < sai[1]) ostl['right'] = sai[1];
                    } else {
                        ostl['left'] = ox;
                    }
                    switch (idx) {
                        case 1:
                            hed = gvar[2][4506]; switch (parseInt(userarray.Id_typeuser)) {
                                case 1: case 2: case 3: case 4: case 5: case 6:
                                    data = [['adate', gvar[2][9508]], ['fname', gvar[2][13707]], ['lname', gvar[2][13709]], ['nsev', gvar[2][57011]], ['perc', gvar[2][5704]]];
                                    break;
                                case 7: case 8:
                                    data = [['ntype', gvar[2][132010]], ['Id_not', gvar[2][13209]], ['mstate', gvar[2][95048]], ['wtype', gvar[2][137017]]];
                                    break;
                            }
                            break;
                        case 2:
                            hed = gvar[2][67025]; data = convpoolarray.slice(0);
                            break;
                        case 3:
                            hed = gvar[2][4506]; data = [['itype', gvar[2][132010]], ['qdate', gvar[2][13209]], ['mstate', gvar[2][95048]], ['idesc', gvar[2][137017]]];
                            break;
                        case 14:
                            data = ['']; lid.map((ikey, j) => { data.push(ikey); if(ikey == csrn.state.data[indx][okey]) sti = data.length-1; });
                            break;
                        case 5:
                        case 6:
                        case 15:
                        case 16:
                            data = ['']; Object.keys(lid).map((ikey, j) => { data.push(ikey); if(ikey == csrn.state.data[indx][okey]) sti = data.length-1; });
                            break;
                        case 7:
                            data = [['', '']]; if(csrn.state.data[indx]['country']) gvar[2][lid][csrn.state.data[indx]['country']]['tmzn'].split(',').map((tzkey, tzidx) => { tempv = tzkey.split('|'); data.push([tempv[0], tempv[1]]); if(tempv[0] == csrn.state.data[indx][okey]) sti = data.length-1; });
                            break;
                        case 17:
                            data = [['', '']]; lid.map((ikey, j) => { data.push([ikey.idconvpool, ikey.value]); if(!sti && csrn.state.data[indx][okey].indexOf(','+ikey.idconvpool+',') != -1) sti = data.length-1; });
                            break;
                    }
                    this.setState({ display: dv, idx, lid, indx, okey, ostl, otp: 0, hed, data, itr }, () => {
                    if(cbfct) cbfct();
                    if(sti) { hed = sti + 1; itr = Math.min(data.length, Math.max(20, hed)); setTimeout(() => this.setState({ itr }, () => this.ttmr = setTimeout(() => { try { this.lscrlvw.scrollToIndex({ index: sti, viewPosition: 0.5, animated: false }); } catch (error) { } }, hed)), 0); } });
                    });
                kfct = null; }; if (appstt[1] != 1) Keyboard.dismiss(); else kfct();
            } else this.setState({ display: dv, otp: dmns.height }, () => { if(cbfct) cbfct(); this.clrt(); });
        }
    }
    toggle(cbfct) {
        this.showclose(this.state.display == 'flex' ? 'none' : 'flex', null, cbfct);
    }
    getst() {
        return this.state.display;
    }
    clrt() {
        clearTimeout(this.ttmr); clearInterval(this.ttmr);
    }
    componentWillUnmount() {
        delete this.isloaded; this.clrt(); lstactv = new Date();
    }
    render() {
        if (this.state.display == 'flex') {
            let csrn = crnscrn || dshscrn;
            let lhc, oshi = [], sfs = dimsz[2] + 0.7;
            if(this.state.hed) { lhc = <View style={[Stl.pzp, Stl.txtwrap, { backgroundColor: Cnt.clrs.footbg, padding: dimsz[2] }]}><Text style={[Stl.rtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{this.state.hed.toUpperCase()}</Text></View>; oshi = [0]; }
            return (
                <Animated.View key={this.state.a} style={[Stl.cptlst, { bottom: 0, elevation: 5, top: this.state.otp }]}><TouchableOpacity activeOpacity={1} onPress={() => this.toggle()} style={{ flex: 1 }}>
                    <FlatList onScrollToIndexFailed={(e) => {}} windowSize={100} initialNumToRender={this.state.itr} ref={(ref) => this.lscrlvw = ref} style={[Stl.shdw, this.state.ostl]} scrollEventThrottle={16} data={this.state.data} renderItem={({ item, index }) => <MList tt={this} item={item} index={index} csrn={csrn} sfs={sfs} />}
                        keyExtractor={(item, index) => String(index)}
                        ListHeaderComponent={lhc} stickyHeaderIndices={oshi}
                        ListEmptyComponent={<View style={[Stl.ndata, Stl.lstcont, { padding: dimsz[1] }]}><Text style={[Stl.alrttxt, { fontSize: dimsz[2] }]}>{gvar[2][14500].toUpperCase()}</Text></View>}
                    />
                </TouchableOpacity></Animated.View>
            );
        } else return <Animated.View style={{ display: 'none' }}></Animated.View>;
    }
}
