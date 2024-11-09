export default class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this._onPress.bind(this);
    }
    _onPress() {
        if (!this.props.disabled) this.props.onPress();
    }
    render() {
        this.props.disabled = this.props.disabled || false;
        this.props.checked = this.props.checked || false;
        let bicon, icns = this.props.btnStyle, txts = [this.props.labelStyle], smls = {}, dtxts = [this.props.descstl];
        if (this.props.btnStyle)
            if (this.props.bicon) {
                smls['alignItems'] = 'center'; if (this.props.smlsscn) smls['flexDirection'] = 'column';
                if (this.props.checked) { icns = icns.concat(this.props.sbtnStyle); txts = txts.concat(this.props.stxts); }
                if (this.props.disabled) { icns = icns.concat([Stl.dsbicon]); txts = txts.concat([Stl.dsbtext]); /*dtxts = dtxts.concat([Stl.dsbtext]);*/ }
                bicon = <View style={this.props.bwdth}><Iml source={{ uri: this.props.bicon }} style={icns} /></View>;
            }
            else {
                let icnn;
                if (this.props.checked) { icnn = "dot-circle"; icns = icns.concat(this.props.sbtnStyle); txts = txts.concat(this.props.stxts); } else icnn = "circle";
                if (this.props.disabled) { icns = icns.concat([Stl.dsbtext]); txts = txts.concat([Stl.dsbtext]); /*dtxts = dtxts.concat([Stl.dsbtext]);*/ }
                bicon = <Icon2 name={icnn} style={icns} />;
            }
        let dtbd = [<View key={0} style={[Stl.radiocheckdiv, { paddingVertical: dmns.h, backgroundColor: this.props.checked && this.props.disabled ? 'rgba(0,132,137,0.06)' : 'transparent' }, this.props.style, smls]}>{bicon}{this.props.label ? <View style={[Stl.cstl, this.props.nowrap ? null : Stl.txtwrap, { paddingHorizontal: 10 }]}><Text style={txts}>{this.props.label}</Text>{this.props.desc ? <Text style={dtxts}>{this.props.desc}</Text> : null}</View> : this.props.children || null}</View>];
        return (
            this.props.disabled ? dtbd : <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={this.onPress}>{dtbd}</TouchableOpacity>
        );
    }
}
