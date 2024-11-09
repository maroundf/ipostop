export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { vctime: '00:00:00' }; this.isloaded = 1; this.updtmr = this.updtmr.bind(this);
    }
    start(callTime, cbfct) {
        if (this.isloaded) {
            this.clrt(); this.callTime = callTime || 0; this.cbfct = cbfct;
            this.ttmr = setInterval(this.updtmr, 1000);
        }
    }
    stop() {
        this.clrt(); this.updtmr();
    }
    resume() {
        this.start(this.callTime, this.cbfct);
    }
    updtmr() {
        this.callTime += 1000; var vctime = new Date(this.callTime).toUTCString().split(/ /)[4];
        this.setState({ vctime: Fct.arconvertdigit0(vctime) }); if(this.cbfct) this.cbfct(vctime); lstactv = new Date();
    }
    gettm() {
        return [this.callTime, this.state.vctime];
    }
    clrt() {
        clearTimeout(this.ttmr); clearInterval(this.ttmr);
    }
    componentWillUnmount() {
        delete this.isloaded; this.clrt(); lstactv = new Date();
    }
    render() {
        return (
            <Text style={[Stl.fwdtext, this.props.style]}>{this.state.vctime}</Text>
        );
    }
}
