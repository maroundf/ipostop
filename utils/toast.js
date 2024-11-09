export default class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: null, display: 'none' }; this.animatedValue = new Animated.Value(-150); this.isloaded = 1; this.isone = false;
    }
    show(content, duration, loader, cbfct, sb) {
        if (this.isloaded) {
            this.clrt(); this.isone = true; this.loader = loader; this.cbfct = cbfct; this.sb = sb;
            if (content && Array.isArray(content)) {
                var mix = '', arrlen = content.length, ocontent = [], oduration = 0, ocolor, oicon, stl1, stl2;
                if(this.loader) { stl1 = { justifyContent: 'center' }; stl2 = { textAlign: 'center' }; }
                for (i = 0; i < arrlen; i++) if(content[i][0]) {
                    switch (content[i][1]) {
                        case 2:
                            ocolor = 'rgba(237,84,84,0.95)'; oicon = "exclamation-triangle";
                            break;
                        default:
                            ocolor = 'rgba(250,175,64,0.95)'; oicon = "info-circle";
                            break;
                    }
                    mix += content[i][1]; oduration += content[i][0].length / 20;
                    ocontent.push(<View key={i} style={[Stl.itmcont, Stl.w100, { marginVertical: dimsz[19] }]}>{oicon && !content[i][2] ? <Icon2 name={oicon} style={[Stl.wicon, { fontSize: dimsz[13], paddingEnd: dimsz[3] }]} /> : null}<View style={[Stl.txtwrap, stl1]}><Text style={[Stl.tsttext, { fontSize: dimsz[1] }, stl2]}>{content[i][0]}</Text></View></View>);
                }
                if (this.loader) { this.ocolor = 'rgba(38,37,37,0.95)'; ocontent.push(<View key="ldr" style={[{ height: dimsz[18], marginVertical: dimsz[1], alignItems: 'center' }]}><Image source={loadind} style={[Stl.image]} /></View>); } else if (mix.indexOf('1') != -1 && mix.indexOf('2') != -1) this.ocolor = 'rgba(237,84,84,0.95)'; else this.ocolor = ocolor;
                if(ocontent.length) {
                    oduration *= 1000; this.setState({ content: ocontent, display: 'flex' }, () => { this.isone = false; Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(0), duration: loader ? 1 : Cnt.prps.animdur, easing: Easing.inOut(Easing.ease)}).start(duration == -1 ? () => this.clrt() : () => this.close(oduration)); });
                }
            }
        }
    }
    close(duration) {
        this.clrt(); if (!duration) { this.animatedValue.setValue(-150); if (this.isloaded) { this.setState({ content: null, display: 'none' }); } } else this.ttmr = setTimeout(() => Animated.timing(this.animatedValue, { useNativeDriver: true, toValue: new Animated.Value(-150), duration: this.loader ? 1 : Cnt.prps.animdur, easing: Easing.inOut(Easing.ease) }).start(() => { if (this.isloaded && !this.isone) { this.setState({ content: null, display: 'none' }, this.cbfct); } }), duration);
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
            return (
                <Animated.View style={[Stl.cptlst, Stl.sepdiv, { elevation: 5, transform: [{ translateY: this.animatedValue }], backgroundColor: this.ocolor }]}>
                <SafeAreaView>
                <TouchableOpacity activeOpacity={1} onPress={() => this.close(0.1)} style={{ flex: 1, paddingTop: stsbrht, alignItems: this.loader ? 'center' : 'flex-start' }}><View style={{ paddingHorizontal: dimsz[2], paddingVertical: dimsz[4] }}>{this.state.content}</View>
                </TouchableOpacity>
                </SafeAreaView>
                </Animated.View>
            );
        } else return <Animated.View style={{ transform: [{ translateY: this.animatedValue }], display: 'none' }}></Animated.View>;
    }
}
