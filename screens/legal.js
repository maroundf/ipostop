export default class Legal extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this);
        this.state = Object.assign({}, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, gvar[2][20031]]} renderfoot={[]}>{Fct.disptext('lstprvplc',null,null,null,this)}</Mcnt>
        );
    }
}
