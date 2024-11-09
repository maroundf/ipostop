class Rgstats extends React.Component {
    render() {
    var { item, index, flkey, withtime, llbl } = this.props;
    let mnvw, tempv = item.length;
    if (tempv > 0) {
        let lm1 = tempv - 1, tempv2, color, wdth = dmns.width - sai[1] - sai[3], hght = dmns.height - sai[2] - this.props.tt.state.svo - dimsz[6], cdata = [], sdata = [], cgrh, sgrh, cax, bbtm, clgnd = [], varx, vary, minx = moment.tz(item[lm1].adate, userarray.timezone).valueOf(), maxx = minx, miny = 0, maxy, fctr, xaxstl = { axis: { stroke: Cnt.clrs.lgraycolor2 }, ticks: { stroke: Cnt.clrs.lgraycolor2, size: 5 }/*, grid: { stroke: Cnt.prps.l2opcty, strokeWidth: 1, strokeDasharray: '7, 3' }*/, tickLabels: { fontSize: dimsz[22], fontFamily: 'Montserrat-Light', fill: Cnt.clrs.lgraycolor2, padding: 3/*angle: 90*/ } }
            , saxstl = { axis: { stroke: Cnt.clrs.lgraycolor2 }, ticks: { size: 0 }/*, grid: { stroke: Cnt.prps.l2opcty, strokeWidth: 1, strokeDasharray: '7, 3' }*/, tickLabels: { fontSize: dimsz[22], fontFamily: 'Montserrat-Light', fill: Cnt.clrs.lgraycolor2, padding: dimsz[19] } }
            , slstl = { data: { fill: ({ datum }) => datum.fill }, labels: { fontSize: dimsz[4], fontFamily: 'Montserrat-Light', fill: Cnt.clrs.lightbg } };
        if(flkey == 0)
        {
            maxy = 100; fctr = maxy / gvar[13][24][1]; item.map((orow, rj) => { varx = moment.tz(orow.adate, userarray.timezone).valueOf(); cdata.unshift({ x: varx, y: parseFloat(orow.perc) || 0.9009, label: orow.perc + '%' }); if (Fct.isnull(orow.asev)) { vary = -0.01; tempv2 = '?'; color = Cnt.clrs.mgraycolor; } else { vary = parseFloat(orow.asev); color = Fct.limitValue(vary, gvar[2]['lstsevind']).bgcolor; vary *= fctr; tempv2 = orow.asev; } sdata.unshift({ x: varx, y: vary || 0.0609, label: tempv2, fill: color }); minx = Math.min(minx, varx); maxx = Math.max(maxx, varx); });
        }
        else
        {
            maxy = gvar[13][10][1]; fctr = 1; item.map((orow, rj) => { varx = moment.tz(orow.adate, userarray.timezone).valueOf(); if (Fct.isnull(orow.asev)) { vary = -0.01; tempv2 = '?'; color = Cnt.clrs.mgraycolor; } else { vary = parseFloat(orow.asev); color = Fct.limitValue(vary, gvar[2]['lstrspind']).bgcolor; tempv2 = orow.asev; } sdata.unshift({ x: varx, y: vary || 0.0609, label: tempv2, fill: color }); minx = Math.min(minx, varx); maxx = Math.max(maxx, varx); });
        }
        if (minx == maxx) { tempv2 = 3600000; minx -= tempv2; maxx += tempv2; }
        if (flkey == 0) {
            let caxstl = { axis: { stroke: Cnt.clrs.lgraycolor2 }, ticks: { size: 0 }/*, grid: { stroke: Cnt.prps.l2opcty, strokeWidth: 1, strokeDasharray: '7, 3' }*/, tickLabels: { fontSize: dimsz[22], fontFamily: 'Montserrat-Light', fill: Cnt.clrs.lgraycolor2, padding: -dimsz[12] } }, clstl = { data: { stroke: Cnt.clrs.lightbg, strokeWidth: 4 }, labels: { fontSize: dimsz[4], fontFamily: 'Montserrat-Light', fill: Cnt.clrs.lightbg } }
            if (tempv == 1) cgrh = <VictoryScatter style={clstl} data={cdata} />; else cgrh = <VictoryLine style={clstl} data={cdata} />; cax = <VictoryAxis style={caxstl} fixLabelOverlap={true} dependentAxis tickFormat={(t) => t + '%'} offsetX={wdth - dimsz[8]} />;
            for(tempi in gvar[2]['lstsevind']) clgnd.push(<Icon3 name="square" key={"i0"+tempi} style={{ fontSize: dimsz[0], color: gvar[2]['lstsevind'][tempi].bgcolor, paddingEnd: 1 }} />); clgnd.push(<Text key={"t0"} style={[Stl.txth1, { fontSize: dimsz[3], paddingStart: 2 }]}>{gvar[2][57011]}</Text>, <Icon3 name="remove" key={"i10"} style={{ fontSize: dimsz[12], color: Cnt.clrs.lightbg, paddingEnd: 1, paddingStart: dimsz[9] }} />, <Text key={"t1"} style={[Stl.txth1, { fontSize: dimsz[3], paddingStart: 2 }]}>{gvar[2][5704]}</Text>); bbtm=-dimsz[19];
        }
        else {
            for(tempi in gvar[2]['lstrspind']) clgnd.push(<Icon3 name="square" key={"i0"+tempi} style={{ fontSize: dimsz[0], color: gvar[2]['lstrspind'][tempi].bgcolor, paddingEnd: 1 }} />); clgnd.push(<Text key={"t0"} style={[Stl.txth1, { fontSize: dimsz[3], paddingStart: 2 }]}>{gvar[2][57011]}</Text>); bbtm=0;
        }
        sgrh = <VictoryBar style={slstl} data={sdata} />;

        mnvw = <View style={{ flex: 1 }}><VictoryChart key={'c' + this.props.tt.state.mload} width={wdth} height={hght} padding={{ left: dimsz[6], right: dimsz[8], bottom: dimsz[6] }} /*animate={{ duration: 2000, easing: "linear" }}*/ containerComponent={<VictoryZoomContainer />} scale={{ x: 'linear', y: 'linear' }} domain={{ x: [minx, maxx], y: [miny, maxy] }} domainPadding={dimsz[23]}>
            <VictoryAxis style={xaxstl} fixLabelOverlap={true} tickFormat={(t) => Fct.convt_sdate(t, null, withtime)} />
            <VictoryAxis style={saxstl} fixLabelOverlap={true} dependentAxis tickFormat={(t) => (t / fctr).toFixed(1)} />{cax}
            {sgrh}{cgrh}</VictoryChart><View key={'l' + this.props.tt.state.mload} style={[Stl.btmtab, { position: 'absolute', left: 0, right: 0, bottom: bbtm }]}>{llbl ? <View style={[Stl.rbox2]}><Icon3 name="flash" style={[Stl.uicon, { fontSize: dimsz[0], paddingEnd: 1 }]} /><Text numberOfLines={1} style={[Stl.ytxt, { fontSize: dimsz[3], paddingStart: 2 }]}>{this.props.tt.state.data[index][llbl]}</Text></View> : null}<View style={[Stl.rbox2]}>{clgnd}</View></View></View>;
    } else mnvw = <View style={[Stl.pzp, { flex: 1 }]}>{this.props.tt.eptlpg({}, null, null, null, 'g'+index)}</View>;
    return (
        mnvw
    )
    }
}
class Rdstats extends React.Component {
    render() {
    var { item, index, pdhl, rtn, flkey, ps, rstl } = this.props;
    let secdet = [], extdet = [], hdr = index % 2 == 0, icn, estl, rind; if (!hdr) index -= 1; rind = index; index /= 2;
    if (this.props.tt.state.secst[flkey][index]) {
        icn = "chevron-up";
        if (this.props.tt.state.data[index].stats) {
            if (this.props.tt.state.data[index].stats.length) {
                if (hdr) extdet.push(<View key={'h' + index} style={[Stl.itmcont, { backgroundColor: Cnt.clrs.blackcolor4, paddingVertical: dimsz[4], paddingHorizontal: dmns.w }]}>
                    <View style={{ width: '40%' }}><View style={[Stl.txtwrap]}><Text style={[Stl.txts1, { fontSize: dimsz[2] }]}>{gvar[2][18204].toUpperCase()}{' - '}{gvar[2][54034].toUpperCase()}</Text></View></View>
                    <View style={{ width: '40%', paddingHorizontal: dimsz[19] }}><View style={[Stl.txtwrap]}><Text style={[Stl.txts1, { fontSize: dimsz[2] }]}>{gvar[2][18204].toUpperCase()}{' - '}{gvar[2][38014].toUpperCase()}</Text></View></View>
                    <View style={{ width: '20%' }}><View style={[Stl.txtwrap,{justifyContent: 'center'}]}><Text style={[Stl.txts1, { fontSize: dimsz[2] }]}>{gvar[2][57011].toUpperCase()}</Text></View></View>
                </View>);
                if (!hdr) this.props.tt.state.data[index].stats.map((ival, idx) => { let label; if(!Fct.isnull(ival.asev)) { label = Fct.limitValue(ival.asev, gvar[2]['lstrspind']); label = <Text style={rstl.concat([{ backgroundColor: label.bgcolor }])}>{label.textl}</Text>; } secdet.push(<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => { scrnid[rtn][13][0] = () => { let sindex = this.props.tt.state.data.findIndex(elm => elm.qsymptom == ival.qsymptom); if (sindex != -1) { sindex *= 2; let shdr = sindex % 2 == 0, srind; if (!shdr) sindex -= 1; srind = sindex; sindex /= 2; this.props.tt.shitm('secst', sindex, 'sec', srind, 'stats'); } }; this.props.tt.swipetab(1); }} key={idx} style={[Stl.itmcont, Stl.lsepdiv, { paddingVertical: dimsz[3], marginHorizontal: dmns.w, marginBottom: 1 }]}>
                    <View style={{ width: '41%' }}><View style={[Stl.txtwrap]}><Text style={[Stl.qtext, { fontSize: dimsz[2] }]}><Text style={{ fontSize: dimsz[2] }}>{ival.qdate.substr(11, 5)}{'\n'}</Text>{ival.textl}</Text></View></View>
                    <View style={{ width: '41%', paddingHorizontal: dimsz[19] }}><View style={[Stl.txtwrap]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}>{ival.rdate ? <Text style={{ fontSize: dimsz[2] }}>{ival.rdate.substr(11, 5)}{ival.rdate.substr(0, 10) == ival.qdate.substr(0, 10) ? '' : '+'}{'\n'}</Text> : gvar[2][38017]}{ival.textl2}</Text></View></View>
                    <View style={{ width: '18%' }}>{label}</View>
                </TouchableOpacity>); });
            }
            else secdet = this.props.tt.eptlpg({style:{ height: dimsz[20] }}, null, null, 'g'+index);
        } else {
            secdet = this.props.tt.eptlpg({style:{ height: dmns.lrgs ? dimsz[20] : dmns.h4 }}, null, null, null, 'g'+index); estl = Stl.ybrdr;
            if (!this.props.tt.fetsec[flkey][index]) {
                this.props.tt.fetsec[flkey][index] = true; var fdata = new FormData(), sobj, tempv = {}; fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'dstats'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('uid', scrnid[rtn][4][0].id); fdata.append('adate', item.adate); fdata.append('idmp', scrnid[rtn][4][0].idmp);
                fetch(gvar[1][0] + gvar[1][1], { method: 'POST', timeout: gvar[13][65], body: fdata })
                    .then((resp) => resp.json())
                    .then((data) => {
                        if (data != 0) {
                            lstpages[rtn][flkey].data[index].stats = JSON.parse(TRANS_DECRYPT(data));
                        } else lstpages[rtn][flkey].data[index].stats = [];
                        if (!this.props.tt.fetsec[flkey].find((elm, ej) => elm && ej != index)) tempv['fload'] = 0;
                        tempv['data'] = lstpages[rtn][flkey].data.map((value) => ({ ...value }));
                        sobj = [tempv, () => { this.props.tt.fetsec[flkey][index] = null; clearTimeout(this.props.tt.svmr); this.props.tt.svmr = setTimeout(() => this.props.tt.mnscrlvw.scrollToIndex({ index: rind, viewOffset: 0, viewPosition: 0, animated: true }), 0); }, flkey];
                        if (this.props.tt.isloaded && flkey == this.props.tt.state.flkey) this.props.tt.setState(sobj[0], sobj[1]); else scrnid[rtn][3] = sobj;
                    }).catch((error) => { if (this.props.tt.isloaded) { if (!this.props.tt.fetsec[flkey].find((elm, ej) => elm && ej != index)) tempv['fload'] = 0; this.props.tt.setState(tempv, () => { this.props.tt.fetsec[flkey][index] = null; if (this.props.tt.state.secst[flkey][index]) this.props.tt.shitm('secst', index, null, rind, 'stats'); mntst.show([[gvar[2][2901] + ' [' + item.adate + ']\n' + gvar[2][11209], 2]]); }); } });
            }
        }
    } else icn = "chevron-down";
    return (
        hdr ? <View style={{ minHeight: dimsz[9] }}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.shitm('secst', index, 'sec', rind, 'stats')} style={[Stl.itmcont, Stl.secstl, { paddingVertical: dimsz[4], paddingHorizontal: pdhl, justifyContent: 'space-between' }, estl]}>
            <View style={{ minWidth: '22%' }}>
                <View style={[Stl.txtwrap]}><Text style={[Stl.txth9, { fontSize: dimsz[2] }]}>{item.adate}</Text></View>
            </View>
            <View style={{ width: '33%', alignItems: 'center', paddingHorizontal: dimsz[19] }}>
                <Prg labelScore={false} size={dimsz[20]} value={item.asev} minValue={gvar[13][24][0]} maxValue={gvar[13][24][1]} labels={gvar[2]['lstsevind']} unit="" />
            </View>
            <View style={{ width: '33%', alignItems: 'center', paddingHorizontal: dimsz[19] }}>
                <Prg size={dimsz[20]} value={item.perc} labels={gvar[2]['lstcmpind']} />
            </View>
            <Icon3 name={icn} style={[Stl.lbdicon, { fontSize: dimsz[6] }]} />
        </TouchableOpacity>{extdet}</View> : <View>{secdet}</View>
    )
    }
}
class Rsstats extends React.Component {
    render() {
    var { item, index, pdhl, rtn, flkey, ps, rstl } = this.props;
    let secdet = [], extdet = [], hdr = index % 2 == 0, icn, estl, rind; if (!hdr) index -= 1; rind = index; index /= 2;
    if (this.props.tt.state.secst[flkey][index]) {
        icn = "chevron-up";
        if (this.props.tt.state.data[index].stats) {
            if (this.props.tt.state.data[index].stats.length) {
                if (hdr) extdet.push(<View key={'h' + index} style={[Stl.itmcont, { backgroundColor: Cnt.clrs.blackcolor4, paddingVertical: dimsz[4], paddingHorizontal: dmns.w }]}>
                    <View style={{ width: '40%', paddingEnd: dimsz[19] }}><View style={[Stl.txtwrap]}><Text style={[Stl.txts1, { fontSize: dimsz[2] }]}>{gvar[2][38012].toUpperCase()}</Text></View></View>
                    <View style={{ width: '40%', paddingEnd: dimsz[19] }}><View style={[Stl.txtwrap]}><Text style={[Stl.txts1, { fontSize: dimsz[2] }]}>{gvar[2][18204].toUpperCase()}{' - '}{gvar[2][38014].toUpperCase()}</Text></View></View>
                    <View style={{ width: '20%' }}><View style={[Stl.txtwrap,{justifyContent: 'center'}]}><Text style={[Stl.txts1, { fontSize: dimsz[2] }]}>{gvar[2][57011].toUpperCase()}</Text></View></View>
                </View>);
                if (!hdr) this.props.tt.state.data[index].stats.map((ival, idx) => { let label; if(!Fct.isnull(ival.asev)) { label = Fct.limitValue(ival.asev, gvar[2]['lstrspind']); label = <Text style={rstl.concat([{ backgroundColor: label.bgcolor }])}>{label.textl}</Text>; } secdet.push(<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => { scrnid[rtn][13][0] = () => { let xd=ival.adate.substr(0, 10), sindex = this.props.tt.state.data.findIndex(elm => elm.adate == xd); if (sindex != -1) { sindex *= 2; let shdr = sindex % 2 == 0, srind; if (!shdr) sindex -= 1; srind = sindex; sindex /= 2; this.props.tt.shitm('secst', sindex, 'sec', srind, 'stats'); } }; this.props.tt.swipetab(0); }} key={idx} style={[Stl.itmcont, Stl.lsepdiv, { paddingVertical: dimsz[3], marginHorizontal: dmns.w, marginBottom: 1 }]}>
                    <View style={{ width: '39%', paddingEnd: dimsz[19] }}><View style={[Stl.txtwrap]}><Text style={[Stl.qtext, { fontSize: dimsz[2] }]}>{ival.adate.substr(0, 16)}</Text></View></View>
                    <View style={{ width: '43%', paddingEnd: dimsz[19] }}><View style={[Stl.txtwrap]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}>{ival.rdate ? <Text style={{ fontSize: dimsz[2] }}>{ival.rdate.substr(11, 5)}{ival.rdate.substr(0, 10) == ival.adate.substr(0, 10) ? '' : '+'}{' - '}</Text> : gvar[2][38017]}{ival.textl2}</Text></View></View>
                    <View style={{ width: '18%' }}>{label}</View>
                </TouchableOpacity>); });
            }
            else secdet = this.props.tt.eptlpg({style:{ height: dimsz[20] }}, null, null, 'g'+index);
        } else {
            secdet = this.props.tt.eptlpg({style:{ height: dmns.lrgs ? dimsz[20] : dmns.h4 }}, null, null, null, 'g'+index); estl = Stl.ybrdr;
            if (!this.props.tt.fetsec[flkey][index]) {
                this.props.tt.fetsec[flkey][index] = true; var fdata = new FormData(), sobj, tempv = {}; fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'sstats'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('uid', scrnid[rtn][4][0].id); fdata.append('idquest', item.idquest); fdata.append('idmp', scrnid[rtn][4][0].idmp); fdata.append('gp16', userarray['fupdur']); fdata.append('gp21', gvar[13][21]);
                fetch(gvar[1][0] + gvar[1][1], { method: 'POST', timeout: gvar[13][65], body: fdata })
                    .then((resp) => resp.json())
                    .then((data) => {
                        if (data != 0) {
                            lstpages[rtn][flkey].data[index].stats = JSON.parse(TRANS_DECRYPT(data));
                        } else lstpages[rtn][flkey].data[index].stats = [];
                        if (!this.props.tt.fetsec[flkey].find((elm, ej) => elm && ej != index)) tempv['fload'] = 0;
                        tempv['data'] = lstpages[rtn][flkey].data.map((value) => ({ ...value }));
                        sobj = [tempv, () => { this.props.tt.fetsec[flkey][index] = null; clearTimeout(this.props.tt.svmr); this.props.tt.svmr = setTimeout(() => { if (!this.props.tt.chart) this.props.tt.mnscrlvw.scrollToIndex({ index: rind, viewOffset: 0, viewPosition: 0, animated: true }); }, 0); }, flkey];
                        if (this.props.tt.isloaded && flkey == this.props.tt.state.flkey) this.props.tt.setState(sobj[0], sobj[1]); else scrnid[rtn][3] = sobj;
                    }).catch((error) => { if (this.props.tt.isloaded) { if (!this.props.tt.fetsec[flkey].find((elm, ej) => elm && ej != index)) tempv['fload'] = 0; this.props.tt.setState(tempv, () => { this.props.tt.fetsec[flkey][index] = null; if (this.props.tt.state.secst[flkey][index]) this.props.tt.shitm('secst', index, null, rind, 'stats'); mntst.show([[gvar[2][2901] + ' [' + item.qsymptom + ']\n' + gvar[2][11209], 2]]); }); } });
            }
        }
    } else icn = "chevron-down";
    return (
        hdr ? <View style={{ minHeight: dimsz[9] }}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.shitm('secst', index, 'sec', rind, 'stats')} style={[Stl.itmcont, Stl.secstl, { paddingVertical: dimsz[4], paddingHorizontal: pdhl, justifyContent: 'space-between' }, estl]}>
            <View style={{ width: '33%', paddingEnd: dimsz[19] }}>
                <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.shitm('qtipl', index)} style={[Stl.itmcont]}><Icon3 name="help" style={[Stl.uicon, { fontSize: dimsz[0], paddingEnd: dmns.w, paddingTop: 1 }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.qtext, { fontSize: dimsz[2] }]}>{item.qsymptom}</Text></View></TouchableOpacity>
                {this.props.tt.state.qtipl[flkey][index] ? <View style={[Stl.txtwrap]}><Text style={[Stl.ytxt, { fontSize: dimsz[2] }]}>{item.textl}</Text></View> : null}
            </View>
            <View style={{ width: '33%' }}><View style={[Stl.txtwrap]}><Text numberOfLines={3} style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}>{item.rdate ? <Text style={{ fontSize: dimsz[2] }}>{item.rdate.substr(0, 16)}{'\n'}</Text> : gvar[2][38017]}{item.textl2}</Text></View>
            </View>
            <View style={{ width: '27%', alignItems: 'center', paddingHorizontal: dimsz[19] }}>
                <Prg labelScore={false} size={dimsz[7] + dimsz[3]} value={item.asev} minValue={gvar[13][10][0]} maxValue={gvar[13][10][1]} labels={gvar[2]['lstrspind']} unit="" />
            </View>
                <Icon3 name={icn} style={[Stl.lbdicon, { fontSize: dimsz[6] }]} />
        </TouchableOpacity>{extdet}</View> : <View>{secdet}</View>
    )
    }
}
export default class Analytics extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this);
        this.state = Object.assign({}, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading; this.chart = false;
        if (this.state.initiaload) {
            let pdhl, hdrs = [], odata, orndr, oke, oshi = [], oner, estl;
            if (dmns.lrgs) { pdhl = dmns.w14; } else { pdhl = dmns.w18; }
            let ps = 0.2*(dmns.width-2*dmns.w), rstl = [Stl.txts1, Stl.orbtn, { fontSize: dimsz[3], textAlign: 'center', paddingVertical: dimsz[5], borderRadius: Cnt.prps.borderradius }];
            for (i = 0; i < epta; i++) { let fi = i; if (flkey == i) hdrs.push(<View key={fi} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center', borderBottomWidth: 2, borderColor: Cnt.clrs.blackcolor }}><Text style={[Stl.rtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></View>); else hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.swipetab(fi)} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center' }}><Text style={[Stl.txth3, { fontSize: dimsz[2], textAlign: 'center' }]}>{gvar[2][scrnid[rtn][1][i][0]].toUpperCase()}</Text></TouchableOpacity>); }
            if (this.state.data)
                switch (parseInt(flkey)) {
                    case 0:
                        if (dmns.lrgs) { this.chart = true; odata = this.state.data.length ? [this.state.data] : []; orndr = ({ item, index }) => <Rgstats tt={this} item={item} index={index} flkey={flkey} />; oke = (item) => item.length && item[0].adate || 'd0'; estl = Stl.pzp; oner = false; } else { odata = this.state.data.reduce((r, a, i) => { oshi.push(i * 2 + 1); return r.concat(a, { adate: i + a.adate }); }, []); /*odata = this.srtlpg();*/ orndr = ({ item, index }) => <Rdstats tt={this} item={item} index={index} pdhl={pdhl} rtn={rtn} flkey={flkey} ps={ps} rstl={rstl} />; oke = (item) => item.adate; /*oshi = this.state.secst[flkey].reduce((arr, e, i) => (e && arr.push(i * 2 + 1), arr), []);*/ oner = true; }
                        break;
                    case 1:
                        let tempv = this.state.secst[flkey].findIndex(elm => elm);
                        if (dmns.lrgs && tempv != -1 && this.state.data.length && this.state.data[tempv] && this.state.data[tempv].stats) { this.chart = true; odata = this.state.data[tempv].stats.length ? [this.state.data[tempv].stats] : []; orndr = ({ item, index }) => <Rgstats tt={this} item={item} index={tempv} flkey={flkey} withtime={1} llbl={'qsymptom'} />; oke = (item) => item.length && item[0].adate || 's0'; estl = Stl.pzp; oner = false; } else { odata = this.state.data.reduce((r, a, i) => { oshi.push(i * 2 + 1); return r.concat(a, { idquest: i + a.idquest }); }, []); orndr = ({ item, index }) => <Rsstats tt={this} item={item} index={index} pdhl={pdhl} rtn={rtn} flkey={flkey} ps={ps} rstl={rstl} />; oke = (item) => String(item.idquest); /*oshi = this.state.secst[flkey].reduce((arr, e, i) => (e && arr.push(i * 2 + 1), arr), []);*/ oner = true; }
                        break;
                }
            children = [<View key={0} style={[Stl.rbox2, Stl.w100, { backgroundColor: Cnt.clrs.lightbg }]}>{hdrs}</View>, this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f'+dmns.lrgs} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: this.chart ? 0 : dimsz[5] }, estl]} scrollEnabled={!this.chart} data={odata} renderItem={orndr}
                keyExtractor={oke}
                ListHeaderComponent={this.hedlpg} stickyHeaderIndices={oshi} removeClippedSubviews={false}
                ListEmptyComponent={this.eptlpg}
                ListFooterComponent={this.fotlpg}
                onEndReached={(info) => { if (this.state.fload == 0 && this.state.ldmr && oner) this.loadlpg(2); }}
                onEndReachedThreshold={0.01}
                refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />}
            /> : loading];
        }
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, gvar[2][3800]]} renderfoot={[Cnt.clrs.blackcolor]}>{children}</Mcnt>
        );
    }
}
