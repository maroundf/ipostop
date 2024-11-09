export default class Drawer extends React.Component {
    constructor(props) {
        super(props); this.state = { display: 'none' }; this.animatedValue = new Animated.Value(dmns.width); this.isloaded = 1;
    }
    showclose(dv, cbfct) {
        if (this.isloaded) {
            if (dv == 'flex') this.setState({ display: dv }, () => Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(0), duration: Cnt.prps.animdur, easing: Easing.inOut(Easing.ease) }).start(cbfct)); else Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(dmns.width), duration: Cnt.prps.animdur, easing: Easing.inOut(Easing.ease) }).start(() => { this.clrt(); this.setState({ display: dv }, cbfct); });
        }
    }
    toggle(cbfct) {
        this.showclose(this.state.display == 'flex' ? 'none' : 'flex', cbfct);
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
            let rtn =  csrn ? csrn.props.route.name : null;
            let mtab = [['Dashboard', 'home', gvar[2][95018]], ['Reminders', 'bell', gvar[2][1300]]], tabs = [], arrlen, olst, eicn, tstl;
            switch (parseInt(userarray.Id_typeuser)) {
                case 1: case 2: case 3: case 4: case 5: case 6:
                    //mtab.push(['Legal', 'notebook', gvar[2][95015]]);
                    break;
                case 7:
                    mtab.push(['Caregivers', 'people'/*'people','heart','user-female'*/, gvar[2][6100]]);
                    break;
            }
            mtab.push(['Legal', 'book-open'/*'notebook','key','lock','book-open'*/, gvar[2][20031]], ['Documentation', 'question', gvar[2][9500]], [null, 'logout', gvar[2][9502]]);
            arrlen = mtab.length;
            for (i = 0; i < arrlen; i++) {
                let nvgt, routeName = mtab[i][0];
                if (rtn == routeName) {
                    tabs.push(<View key={i} style={[Stl.rbox2, Stl.lsepdiv, { backgroundColor: Cnt.clrs.bluecolor }]}><View style={[Stl.tabicn, Stl.etbi]}><Icon1 name={mtab[i][1]} style={[Stl.wicon, { fontSize: dimsz[6], alignSelf: 'center' }]} /></View><View style={[Stl.txtwrap, { paddingVertical: dimsz[2], paddingEnd: dimsz[2] }]}><Text style={[Stl.smalltext, { fontSize: dimsz[0] }]}>{mtab[i][2]}</Text></View></View>);
                } else {
                    if (!routeName) nvgt = () => csrn.logout(2); else nvgt = () => csrn.nvgscrn(routeName, rtn, 0);
                    tabs.push(<TouchableOpacity key={i} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle(nvgt)} style={[Stl.rbox2]}><View style={[Stl.tabicn, Stl.etbi]}><Icon1 name={mtab[i][1]} style={[Stl.lbdicon, { fontSize: dimsz[6], alignSelf: 'center' }]} /></View><View style={[Stl.dsepdiv, Stl.txtwrap, { paddingVertical: dimsz[2], paddingEnd: dimsz[2] }]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[0] }]}>{mtab[i][2]}</Text></View></TouchableOpacity>);
                }
            }
            if (ostts == 1) { tstl = Stl.lgricon; olst = gvar[2][95026]; eicn = <Icon3 name="checkmark-circle" style={[tstl, { fontSize: dimsz[13], paddingEnd: dimsz[4] }]} />; } else if (ostts == 2) { tstl = Stl.luicon; olst = gvar[2][95022]; eicn = <Icon3 name="close-circle" style={[tstl, { fontSize: dimsz[13], paddingEnd: dimsz[4] }]} />; } else { tstl = Stl.dsbicon; olst = gvar[2][95027]; eicn = <Icon3 name="remove-circle" style={[tstl, { fontSize: dimsz[13], paddingEnd: dimsz[4] }]} />; }
            return (
                <Animated.View style={[Stl.cptlst, { bottom: 0, transform: [{ translateX: this.animatedValue }] }]}><TouchableOpacity activeOpacity={1} onPress={() => this.toggle()} style={{ flex: 1, backgroundColor: Cnt.prps.mdlbgc }}>
                <View style={[Stl.lshdw, { width: dmns.lrgs ? dmns.w8 : dmns.w60, height: dmns.height, alignSelf: 'flex-end' }]}>
                <SafeAreaView style={[Stl.agitem, { flex:0, paddingTop: stsbrht }]}>
                    <View style={[Stl.pzp, { paddingEnd: dimsz[4], paddingStart: dimsz[4], paddingTop: dimsz[0], paddingBottom: dimsz[1] }]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.toggle(() => csrn.opndp(userarray.id, null, Object.assign({}, userarray), 'Profile'))}>{Fct.setpht(userarray, "person-outline", [2 * dimsz[18], dimsz[18]])}</TouchableOpacity><Text style={[Stl.headertext, { fontSize: dimsz[10], textAlign: 'center', paddingTop: dimsz[4] }]}>{Fct.setval(userarray)}</Text><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={Fct.swtstatus} style={[Stl.itmhdiv, { paddingVertical: dimsz[5] }]}>{eicn}<Text style={[Stl.txts2, tstl, { fontSize: dimsz[2], textAlign: 'center' }]}>{olst}</Text></TouchableOpacity></View>
                </SafeAreaView>
                <SafeAreaView style={{ flex:1, backgroundColor: Cnt.clrs.blackcolor }}>
                    <ScrollView contentContainerStyle={[Stl.svcont, Stl.w100, { paddingBottom: dimsz[5] }]} keyboardShouldPersistTaps={"handled"}>{tabs}</ScrollView>
                </SafeAreaView>
                </View>
                </TouchableOpacity></Animated.View>
            );
        } else return <Animated.View style={{ transform: [{ translateX: this.animatedValue }], display: 'none' }}></Animated.View>;
    }
}
