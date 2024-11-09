export default class Mcont extends React.Component {
    constructor(props) {
        super(props);
        Keyboard.dismiss(); if (mndrw) mndrw.showclose('none'); if (mnldr && !scrnid['Home'][0]) mnldr.showclose('none'); if (mnlst) mnlst.showclose('none'); if (mntst) mntst.close();
        var rtn = props.tt.props.route.name;
        props.tt.navsrn = Fct.navsrn.bind(props.tt); props.tt.glstg = Fct.glstg.bind(props.tt); props.tt.wdim = Fct.wdim.bind(props.tt); props.tt.renderhead = Fct.renderhead.bind(props.tt); props.tt.renderfoot = Fct.renderfoot.bind(props.tt); props.tt.precase = Fct.precase.bind(props.tt); props.tt.orfrsh = Fct.orfrsh.bind(props.tt); props.tt.rdash = Fct.rdash.bind(props.tt); props.tt.tabpress = Fct.tabpress.bind(props.tt); props.tt.logout = Fct.logout.bind(props.tt); props.tt.chgti = Fct.chgti.bind(props.tt); props.tt.checknum = Fct.checknum.bind(props.tt); props.tt.checkminmax = Fct.checkminmax.bind(props.tt); props.tt.focusinput = Fct.focusinput.bind(props.tt); props.tt.askbefquit = Fct.askbefquit.bind(props.tt); props.tt.loadlpg = Fct.loadlpg.bind(props.tt); props.tt.fotlpg = Fct.fotlpg.bind(props.tt); props.tt.eptlpg = Fct.eptlpg.bind(props.tt); props.tt.stslpg = Fct.stslpg.bind(props.tt); props.tt.hedlpg = Fct.hedlpg.bind(props.tt); props.tt.swipetab = Fct.swipetab.bind(props.tt); props.tt.srhlpg = Fct.srhlpg.bind(props.tt); props.tt.srtlpg = Fct.srtlpg.bind(props.tt); props.tt.updnot2 = Fct.updnot2.bind(props.tt); props.tt.opnnot = Fct.opnnot.bind(props.tt); props.tt.rdrnot = Fct.rdrnot.bind(props.tt); props.tt.updmsgs = Fct.updmsgs.bind(props.tt); props.tt.fnpg = Fct.fnpg.bind(props.tt); props.tt.shitm = Fct.shitm.bind(props.tt); props.tt.nvgscrn = Fct.nvgscrn.bind(props.tt); props.tt.cntscrl = Fct.cntscrl.bind(props.tt); props.tt.lytscrl = Fct.lytscrl.bind(props.tt); props.tt.hdlscrl = Fct.hdlscrl.bind(props.tt); props.tt.opndp = Fct.opndp.bind(props.tt); props.tt.tbi = Fct.tbi.bind(props.tt); props.tt.fscan = Fct.fscan.bind(props.tt); props.tt.tosec = Fct.tosec.bind(props.tt);
        if (props.tt.change == undefined) props.tt.change = false; props.tt.inputs = {}; this.panResponder = {}; this.sbbs = (scrnid[rtn] && scrnid[rtn][13][2] ? scrnid[rtn][13][2] : "light") + "-content";
        props.tt.isloaded = rtn; this._scs(rtn, 1); this.props.tt.dimchg = Dimensions.addEventListener('change', props.tt.wdim);
        props.tt.scrnblur = props.tt.props.navigation.addListener('blur', (e) => this._scrnblur(e));
        props.tt.scrnfocus = props.tt.props.navigation.addListener('focus', (e) => this._setsbbs(e));
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => { if (appstt[1] != 1) this.ttmr = setTimeout(() => Keyboard.dismiss(), 300); lstactv = new Date(); return false; },
            onMoveShouldSetPanResponder: (evt, gestureState) => { if (gestureState.numberActiveTouches > 0 && (Math.abs(gestureState.dx) > 4 || Math.abs(gestureState.dy) > 4)) clearTimeout(this.ttmr); lstactv = new Date(); return false; },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => { clearTimeout(this.ttmr); lstactv = new Date(); return false; },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => { lstactv = new Date(); return false; },
            onPanResponderTerminationRequest: () => true,
            onShouldBlockNativeResponder: () => false
        });
    }
    componentDidMount() {
        this._setscrn(1);
    }
    componentWillUnmount() {
        delete this.props.tt.isloaded; this.props.tt.scrnfocus(); this.props.tt.scrnblur(); this.props.tt.dimchg.remove(); this.panResponder = null; clearTimeout(this.ttmr); clearInterval(this.timr); clearTimeout(this.sfmr); clearTimeout(this.props.tt.ttmr); clearTimeout(this.props.tt.kbmr); clearTimeout(this.props.tt.svmr); this._scrnblur();
    }
    _scs(rtn, igl) {
        switch (rtn) {
            case 'Login':
            case 'Dashboard':
                dshscrn = this.props.tt; crnscrn = null;
                break;
            default:
                crnscrn = this.props.tt;
        }
        if(igl) { var arrlen; if (parseInt(userarray.id) > 0) { arrlen = scrnid[rtn][3]; scrnid[rtn][3] = null; } this.props.tt.glstg(arrlen); }
    }
    _setscrn(iap) {
        if(iap) { if (!msg || msg == 2) if (this.sbbs) StatusBar.setBarStyle(this.sbbs); Fct.adjpage(1); }
        var rtn = this.props.tt.props.route.name, tmsg = msg, sobj = { reqfld: {} }, cbfct, efct;
        msg = null; this._scs(rtn); clearTimeout(this.sfmr); this.sfmr = setTimeout(() => this._scs(rtn), 1000);
        switch (rtn) {
            case 'Chatroom':
                clearInterval(this.timr); this.timr = setInterval(() => { if (vcusers) { Fct.getstatus(); clearInterval(this.timr); } }, 1000); sobj['cmplct'] = null; if (scrnid[rtn][13][0] == 1 || (this.props.tt.state.initiaload && this.props.tt.state.fload == 0 && lstpages[rtn][scrnid[rtn][2]] && lstpages[rtn][scrnid[rtn][2]].data && lstpages[rtn][scrnid[rtn][2]].data.length == 0)) efct = () => setTimeout(() => { this.props.tt.inputs[0].focus(); scrnid[rtn][13][0] = null; }, 0);
                break;
        }
        if (scrnid['Home'][0]) mnldr.showclose('flex', [7, null, scrnid['Home'][0]], null, { tempvar: {} });
        if (tmsg && tmsg != 2 && mntst) setTimeout(() => mntst.show(tmsg == 1 ? [[gvar[2][400], 1]] : tmsg, tmsg == 1 ? -1 : tmsg[0][3]), 100); else if (this.sbbs) StatusBar.setBarStyle(this.sbbs);
        if (this.props.tt.mnscrlvw) { if (this.props.tt.mnscrlvw.props && this.props.tt.mnscrlvw.props.horizontal) sobj['qidx'] = 1; cbfct = () => { try { this.props.tt.mnscrlvw.scrollToOffset({ offset: 0, animated: true }); } catch (error) { try { this.props.tt.mnscrlvw.scrollTo({ y: 0, animated: true }); } catch (error) { } } }; }
        this.props.tt.setState(sobj, () => { if(cbfct) cbfct(); if(efct) efct(); setTimeout(() => { if(wstream) StatusBar.setHidden(true); }, 1000); });
    }
    _setsbbs(e) {
        var rtn = this.props.tt.props.route.name;
        this._setscrn();
        if (parseInt(userarray.id) > 0) { if (scrnid[rtn][3] && lstpages[rtn]) this.props.tt.orfrsh(scrnid[rtn][3]); }
    }
    _scrnblur(e) {
        var rtn = this.props.tt.props.route.name;
        switch (rtn) {
            case 'Login':
            case 'Dashboard':
                //dshscrn = null;
                break;
            default:
                crnscrn = null;
        } clearInterval(this.timr); clearTimeout(this.sfmr);
        if (scrnid[rtn][4] && lstpages[rtn]) {
            let epta = scrnid[rtn][1].length;
            if (scrnid[rtn][4][6] > 0) { scrnid[rtn][0] -= scrnid[rtn][4][6]; if (scrnid[rtn][0] < 0) scrnid[rtn][0] = 0; scrnid[rtn][4][6] = 0; }
            for (i = 0; i < epta; i++) if (scrnid[rtn][4][8][i] && lstpages[rtn][i] && lstpages[rtn][i].data) { scrnid[rtn][4][8][i] = null; lstpages[rtn][i].data.map((value, idx) => { if (lstpages[rtn][i].data[idx]['tstate']) { lstpages[rtn][i].data[idx]['mstate'] = lstpages[rtn][i].data[idx]['tstate']; delete lstpages[rtn][i].data[idx]['tstate']; } }); }
        }
    }
    render() {
        let adj = mnwcl&&mnwcl.getst() == 'flex'?true:false; if(adj) StatusBar.setHidden(true); else StatusBar.setHidden(false);
        return (
            <View {...this.panResponder.panHandlers} key={'mc'+dmns.lrgs} keyboardShouldPersistTaps={"handled"} style={[Stl.mcont, Stl.w100, this.props.style]}>
                <StatusBar animated={false} translucent backgroundColor='rgba(0,0,0,0)' />
                <SafeAreaView style={{ flex:0, backgroundColor: this.props.renderhead[0] }}>
                {this.props.tt.renderhead(this.props.renderhead)}
                </SafeAreaView>
                <SafeAreaView style={[Stl.mcont]}>
                {this.props.children}
                </SafeAreaView>
                <SafeAreaView style={{ flex:0, backgroundColor: this.props.renderfoot[0] || this.props.renderhead[0] }}>
                {this.props.tt.renderfoot(this.props.renderfoot)}
                </SafeAreaView>
                <Spc tt={this.props.tt} adj={adj} />{this.props.tt.tbi('mnscrlvw')}
            </View>
        );
    }
}
