class RProfile extends React.PureComponent {
    render() {
    var { item, index, rtn, flkey, s, gndt, gndi, gndc, ena, supt, supa, edt, edp, nusr, urt } = this.props;
    var children = [], enb = scrnid[rtn][4][9][flkey] && (gvar[1][7] && Fct.isupdate(urt) ? true : false), aco, act, acp, ntxt, tzv;
    ena = enb && ena; edt = enb && edt; edp = enb && edp;
    var edy = edt && phys, acy, tempv, tempv2;
    if(enb) { aco=Cnt.prps.tchblopcty; ntxt=gvar[2][57012]; } else { aco=1; ntxt = '—'; }
    if(edt) { act=Cnt.prps.tchblopcty; } else { act=1; }
    if(edp) { acp=Cnt.prps.tchblopcty; } else { acp=1; }
    if(edy) { acy=Cnt.prps.tchblopcty; } else { acy=1; }
    switch (parseInt(flkey)) {
        case 0:
        let iurl2;
        if (this.props.tt.state.data[index]['photouri']) {
            iurl2 = <View style={[Stl.rbox2]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.dispimg(0, 1)} style={s[8]}><Image source={{ uri: this.props.tt.state.data[index]['photouri'] }} style={[Stl.image2, { borderRadius: Cnt.prps.borderradiuslrg, backgroundColor: Cnt.clrs.footbg }]} /></TouchableOpacity>{enb ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.chgti(index, [['photouri', null], ['phototype', null]], null, null, null, null, Fct.cltf)} style={s[8]}><Icon1 name="trash" style={s[9]} /></TouchableOpacity> : null}</View>;
            this.props.tt.dsrc[1] = [{ url: this.props.tt.state.data[index]['photouri'], props: { title: gvar[2][5204] } }];
        } else if (this.props.tt.state.data[index]['photo']) {
            if(this.props.tt.state.data[index]['photo'].substr(0, 4) == 'http') tempv = tempv2 = this.props.tt.state.data[index]['photo']; else { tempv = gvar[1][0] + 'login/' + this.props.tt.state.data[index]['id'] + '/images/_thumb/' + this.props.tt.state.data[index]['photo']; tempv2 = gvar[1][0] + 'login/' + this.props.tt.state.data[index]['id'] + '/images/' + this.props.tt.state.data[index]['photo']; }
            iurl2 = <View style={[Stl.rbox2]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Fct.dispimg(0, 1)} style={s[8]}><Image source={{ uri: tempv }} style={[Stl.image2, { borderRadius: Cnt.prps.borderradiuslrg, backgroundColor: Cnt.clrs.footbg }]} /></TouchableOpacity>{enb ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.chgti(index, [['photo', null]])} style={s[8]}><Icon1 name="trash" style={s[9]} /></TouchableOpacity> : null}</View>;
            this.props.tt.dsrc[1] = [{ url: tempv2, props: { title: gvar[2][45022] + ': ' + this.props.tt.state.data[index]['value'] } }];
        }
        if(this.props.tt.state.data[index]['country']&&this.props.tt.state.data[index]['timezone']) { gvar[2]['lstcntrys'][this.props.tt.state.data[index]['country']]['tmzn'].split(',').find(elm => { tempv=elm.split('|'); if(tempv[0]==this.props.tt.state.data[index]['timezone']) { tzv=tempv[1]; return true; } }); }
        children.push(<View key={1} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="id-card-alt" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][13707]}</Text>
                </View>
                <View style={s[5]}>
                    <TextInput ref={(ref) => this.props.tt.inputs[1] = ref} keyboardType={inpttyp} textContentType="none" autoFill={false} autoCompleteType="off" editable={enb} contextMenuHidden={!enb} onChangeText={(value) => this.props.tt.chgti(index, [['fname', value]])} value={Fct.capitalize(this.props.tt.state.data[index]['fname'])} autoCapitalize="none" autoCorrect={false} style={s[6].concat([this.props.tt.state.data[index]['reqfld']['fname'] ? Stl.reqfld : null])} maxLength={30} blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => this.props.tt.inputs[2].focus()} />
                </View>
            </View>
        </View>,
        <View key={2} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="id-card" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][13709]}</Text>
                </View>
                <View style={s[5]}>
                    <TextInput ref={(ref) => this.props.tt.inputs[2] = ref} keyboardType={inpttyp} textContentType="none" autoFill={false} autoCompleteType="off" editable={enb} contextMenuHidden={!enb} onChangeText={(value) => this.props.tt.chgti(index, [['lname', value]])} value={this.props.tt.state.data[index]['lname'].toUpperCase()} autoCapitalize="none" autoCorrect={false} style={s[6].concat([this.props.tt.state.data[index]['reqfld']['lname'] ? Stl.reqfld : null])} maxLength={30} blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => {}} />
                </View>
            </View>
        </View>,
        <View key={3} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="calendar-check"/*birthday-cake*/ style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][137010]}</Text>
                </View>
                <View style={s[5]}>
                    <TouchableOpacity activeOpacity={aco} style={{flex:1}} onPress={() => { if (enb) { Keyboard.dismiss(); var sobj = this.props.tt.state.data.slice(0); sobj[index]['dtb'] = true; this.props.tt.setState({ data: sobj }); } }}><Text style={s[6].concat([this.props.tt.state.data[index]['reqfld']['birthday'] ? Stl.reqfld : null])}>{this.props.tt.state.data[index]['birthday']}</Text></TouchableOpacity>
                    <DateTimePickerModal locale={userarray.lang} mode="date" isVisible={this.props.tt.state.data[index]['dtb']} onConfirm={(value) => this.props.tt.chgti(index, [['birthday', Fct.convert_ts_date(value, 2)], ['dtb', false]])} onCancel={() => { var sobj = this.props.tt.state.data.slice(0); sobj[index]['dtb'] = false; this.props.tt.setState({ data: sobj }); }} date={this.props.tt.state.data[index]['birthday']?new Date(this.props.tt.state.data[index]['birthday']):new Date()} maximumDate={new Date()} />
                </View>
            </View>
        </View>,
        <View key={5} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name={gndc} style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gndt}</Text>
                </View>
                <View style={s[5]}>
                    <TouchableOpacity activeOpacity={aco} style={{flex:1}} ref={(ref) => this.props.tt.inputs[5] = ref} onPress={() => { if (enb) mnlst.showclose('flex', 5, null, gvar[2][gndi], index, 'gender'); }}><Text style={s[6].concat([this.props.tt.state.data[index]['reqfld']['gender'] ? Stl.reqfld : null])}>{this.props.tt.state.data[index]['gender']?gvar[2][gndi][this.props.tt.state.data[index]['gender']]:ntxt}</Text></TouchableOpacity>
                </View>
            </View>
        </View>,
        <View key={6} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="flag-checkered" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][137021]}</Text>
                </View>
                <View style={s[5]}>
                    <TouchableOpacity activeOpacity={aco} style={{flex:1}} ref={(ref) => this.props.tt.inputs[6] = ref} onPress={() => { if (enb) mnlst.showclose('flex', 6, null, gvar[2]['lstcntrys'], index, 'country'); }}><Text style={s[6].concat([this.props.tt.state.data[index]['reqfld']['country'] ? Stl.reqfld : null])}>{this.props.tt.state.data[index]['country']?gvar[2]['lstcntrys'][this.props.tt.state.data[index]['country']]['textl']:ntxt}</Text></TouchableOpacity>
                </View>
            </View>
        </View>,
        <View key={7} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="clock" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][125020]}</Text>
                </View>
                <View style={s[5]}>
                    <TouchableOpacity activeOpacity={aco} style={{flex:1}} ref={(ref) => this.props.tt.inputs[7] = ref} onPress={() => { if (enb) mnlst.showclose('flex', 7, null, 'lstcntrys', index, 'timezone'); }}><Text style={s[6].concat([this.props.tt.state.data[index]['reqfld']['timezone'] ? Stl.reqfld : null])}>{tzv||ntxt}</Text></TouchableOpacity>
                </View>
            </View>
        </View>,
        <View key={8} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="phone-square" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][137022]}</Text>
                </View>
                <View style={s[5]}>
                    <TextInput ref={(ref) => this.props.tt.inputs[8] = ref} keyboardType="phone-pad" textContentType="none" autoFill={false} autoCompleteType="off" editable={enb} contextMenuHidden={!enb} onChangeText={(value) => this.props.tt.chgti(index, [['phone', value]])} value={this.props.tt.state.data[index]['phone']} autoCapitalize="none" autoCorrect={false} style={s[6].concat([this.props.tt.state.data[index]['reqfld']['phone'] ? Stl.reqfld : null])} maxLength={20} blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => this.props.tt.inputs[9].focus()} onEndEditing={(e) => this.props.tt.adjphone(index, [['phone', gvar[2][137022]]], 1, null, '')} />
                </View>
            </View>
        </View>,
        <View key={9} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="envelope" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][137014]}</Text>
                </View>
                <View style={s[5]}>
                    <TextInput ref={(ref) => this.props.tt.inputs[9] = ref} keyboardType="email-address" textContentType="none" autoFill={false} autoCompleteType="off" editable={enb} contextMenuHidden={!enb} onChangeText={(value) => this.props.tt.chgti(index, [['lemail', value]])} value={this.props.tt.state.data[index]['lemail']} autoCapitalize="none" autoCorrect={false} style={s[6].concat([this.props.tt.state.data[index]['reqfld']['lemail'] ? Stl.reqfld : null])} maxLength={50} blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => {}} onEndEditing={(e) => { var res=this.props.tt.checkdata(rtn, 'email', 'data['+index+'].lemail', gvar[2][137014]);if(res == '')this.props.tt.glp(nusr, index);}} />
                </View>
            </View>
        </View>,
        <View key={10} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="user-circle" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][137018]}</Text>
                </View>
                <View style={s[5]}>
                {iurl2}{enb ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => mnldr.showclose('flex', [5, null, 1, this.props.tt.state.data[index]['id'], index, ['any', 'photo']])} style={s[8]}><Icon1 name="camera" style={s[9]} /></TouchableOpacity> : null}
                </View>
            </View>
        </View>);
        if(!nusr) break;
        case 1:
        let cpv, cps, mdt, mdtt = ntxt;
        if(ena) {
            cpv = this.props.tt.state.data[index]['confpwd']; cps = [];
        } else {
            cpv = this.props.tt.state.data[index]['pwd']; cps = [{ display: 'none' }];
        }
        if(gndi == 'lstusrtle') {
            if(this.props.tt.state.data[index]['idcp']) {
                tempv = this.props.tt.state.data[index]['idcp'].split(','); tempv = medteamarray.find(elm => elm.idconvpool == tempv[1]);
                if(tempv) mdtt = tempv.value;
            }
            mdt = <View style={s[1]}>
                <Icon2 name="users" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][14107]}</Text>
                </View>
                <View style={s[5]}>
                    <TouchableOpacity activeOpacity={aco} style={{flex:1}} ref={(ref) => this.props.tt.inputs[17] = ref} onPress={() => { if (enb) mnlst.showclose('flex', 17, null, medteamarray, index, 'idcp'); }}><Text style={s[6].concat([this.props.tt.state.data[index]['reqfld']['idcp'] ? Stl.reqfld : null])}>{mdtt}</Text></TouchableOpacity>
                </View>
            </View>;
        } else {
            mdt = <View style={s[1]}>
                <Icon2 name="handshake" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][508]}</Text>
                </View>
                <View style={s[5]}>
                    <TouchableOpacity activeOpacity={aco} style={{flex:1}} onPress={() => { let fext = userarray.usertypes[userarray.Id_typeuser]['consentpdf'].substring(userarray.usertypes[userarray.Id_typeuser]['consentpdf'].lastIndexOf('.') + 1).toLowerCase(), isvid = gvar[13][6].indexOf(fext) != -1; if(this.props.tt.state.data[index]['cfdate'] && userarray.usertypes[userarray.Id_typeuser]['consentdirectory']) mnldr.showclose('flex', [9, null, gvar[1][0] + 'login/' + this.props.tt.state.data[index]['id'] + '/' + userarray.usertypes[userarray.Id_typeuser]['consentdirectory'] + '/' + userarray.usertypes[userarray.Id_typeuser]['consentpdf'], null, fext, userarray.usertypes[userarray.Id_typeuser]['consentpdf']/*gvar[2][509]*/ + ' [' + this.props.tt.state.data[index]['cfdate'] + ']', 'http://docs.google.com/gview?embedded=true&url=', isvid]); /*mnldr.showclose('flex', [3, null, null, gvar[2][509], this.props.tt.state.data[index]['cfdate']], null);*/ }}><Text style={s[6]}>{this.props.tt.state.data[index]['cfdate']?this.props.tt.state.data[index]['cfdate']:'—'}</Text></TouchableOpacity>
                </View>
            </View>;
        }
        children.push(<View key={11} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="user-alt" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][101]}</Text>
                </View>
                <View style={s[5]}>
                    <TextInput ref={(ref) => this.props.tt.inputs[11] = ref} keyboardType="email-address" textContentType="none" autoFill={false} autoCompleteType="off" editable={edt} contextMenuHidden={!edt} onChangeText={(value) => this.props.tt.chgti(index, [['login', value]])} value={this.props.tt.state.data[index]['login']} autoCapitalize="none" autoCorrect={false} style={s[6].concat([this.props.tt.state.data[index]['reqfld']['login'] ? Stl.reqfld : null])} maxLength={50} blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => this.props.tt.inputs[12].focus()} onEndEditing={(e) => this.props.tt.checkdata(rtn, 'logpwd', 'data['+index+'].login', gvar[2][101])} />
                </View>
            </View>
        </View>,
        <View key={12} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="lock" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][102]}</Text>
                </View>
                <View style={s[5]}>
                    <TextInput ref={(ref) => this.props.tt.inputs[12] = ref} keyboardType="default" textContentType="none" autoFill={false} autoCompleteType="off" editable={ena} onChangeText={(value) => this.props.tt.chgti(index, [['pwd', value, 12, { style: { backgroundColor: 'transparent' } }]])} value={this.props.tt.state.data[index]['pwd']} autoCapitalize="none" autoCorrect={false} style={s[6].concat([this.props.tt.state.data[index]['reqfld']['pwd'] ? Stl.reqfld : null])} maxLength={20} returnKeyType="next" onSubmitEditing={() => this.props.tt.inputs[13].focus()} onEndEditing={(e) => this.props.tt.checkdata(rtn, 'pwd', 'data['+index+'].pwd', gvar[2][102])} blurOnSubmit={false} secureTextEntry={true} selectTextOnFocus={true} contextMenuHidden={true} />
                </View>
            </View>
        </View>,
        <View key={13} style={s[0].concat(cps)}>
            <View style={s[1]}>
                <Icon2 name="user-lock" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][105]}</Text>
                </View>
                <View style={s[5]}>
                    <TextInput ref={(ref) => this.props.tt.inputs[13] = ref} keyboardType="default" textContentType="none" autoFill={false} autoCompleteType="off" editable={ena} onChangeText={(value) => this.props.tt.chgti(index, [['confpwd', value, 13, { style: { backgroundColor: 'transparent' } }]])} value={cpv} autoCapitalize="none" autoCorrect={false} style={s[6].concat([this.props.tt.state.data[index]['reqfld']['confpwd'] ? Stl.reqfld : null])} maxLength={20} returnKeyType="next" onSubmitEditing={() => {}} onEndEditing={(e) => this.props.tt.checkeq(['data['+index+'].pwd', 'data['+index+'].confpwd'], [gvar[2][102], gvar[2][105]], 1)} blurOnSubmit={false} secureTextEntry={true} selectTextOnFocus={true} contextMenuHidden={true} />
                </View>
            </View>
        </View>,
        <View key={14} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="user-md" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{supt}</Text>
                </View>
                <View style={s[5]}>
                    <TouchableOpacity activeOpacity={acp} style={{flex:1}} ref={(ref) => this.props.tt.inputs[14] = ref} onPress={() => { if (edp) mnlst.showclose('flex', 14, null, supa, index, 'Id_sup'); }}><Text style={s[6].concat([this.props.tt.state.data[index]['reqfld']['Id_sup'] ? Stl.reqfld : null])}>{this.props.tt.state.data[index]['isup']?this.props.tt.state.data[index]['isup']:this.props.tt.state.data[index]['Id_sup']?this.props.tt.state.data[index]['Id_sup']:ntxt}</Text></TouchableOpacity>
                </View>
            </View>
        </View>,
        <View key={15} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="language" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][137028]}</Text>
                </View>
                <View style={s[5]}>
                    <TouchableOpacity activeOpacity={aco} style={{flex:1}} ref={(ref) => this.props.tt.inputs[15] = ref} onPress={() => { if (enb) mnlst.showclose('flex', 15, null, gvar[13][34], index, 'lang'); }}><Text style={s[6].concat([this.props.tt.state.data[index]['reqfld']['lang'] ? Stl.reqfld : null])}>{this.props.tt.state.data[index]['lang']?gvar[13][34][this.props.tt.state.data[index]['lang']]:ntxt}</Text></TouchableOpacity>
                </View>
            </View>
        </View>,
        <View key={16} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name="briefcase" style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{gvar[2][20017]}</Text>
                </View>
                <View style={s[5]}>
                    <TouchableOpacity activeOpacity={acy} style={{flex:1}} ref={(ref) => this.props.tt.inputs[16] = ref} onPress={() => { if(edy) mnlst.showclose('flex', 16, null, gvar[2]['lstusrtyp'], index, 'Id_typeuser'); }}><Text style={s[6].concat([this.props.tt.state.data[index]['reqfld']['Id_typeuser'] ? Stl.reqfld : null])}>{this.props.tt.state.data[index]['Id_typeuser']?gvar[2]['lstusrtyp'][this.props.tt.state.data[index]['Id_typeuser']]:ntxt}</Text></TouchableOpacity>
                </View>
            </View>
        </View>,
        <View key={17} style={s[0]}>
        {mdt}
        </View>);
        break;
        case 2:
        let picn, nicn, nstl, cbf;
        if(item.apptype==1) { if(item.regtype) switch(item.regtype.toLowerCase()) {
            case 'ios':
                picn="apple";
            break;
            case 'android':
                picn="android";
            break;
            default:
                picn="mobile-alt";
        } } else picn="desktop";
        if (this.props.tt.state.data[index]['notif'] == 1) { nicn="bell"; nstl = []; } else { nicn="bell-slash"; nstl = [Stl.dsbicon]; }
        if(enb) cbf=() => this.props.tt.chgti(index, [['notif', this.props.tt.state.data[index]['notif'] == 1 ? 2 : 1]]);
        children.push(<View key={18} style={s[0]}>
            <View style={s[1]}>
                <Icon2 name={picn} style={s[2]} />
                <View style={s[3]}>
                    <Text style={s[4]}>{(item.devicename || (item.regtype + '_' + (index + 1))).toUpperCase()}</Text>
                </View>
                <View style={s[5].concat([{ justifyContent: 'flex-end' }])}>
                    <TouchableOpacity activeOpacity={aco} onPress={cbf}><Icon2 name={nicn} style={s[7].concat(nstl)} /></TouchableOpacity>
                </View>
            </View>
        </View>);
        break;
    }
    return (
        <View key={index} style={[Stl.cstl]}>{children}</View>
    )
    }
}
export default class Profile extends React.Component {
    constructor(props) {
        super(props); var rtn = props.route.name; this.initlpg = Fct.initlpg.bind(this); if (typeof scrnid[rtn][4][0] !== 'object') Fct.opndp(scrnid[rtn][4][0], 1, {}, rtn); this.checkdata = Fct.checkdata.bind(this); this.adjphone = Fct.adjphone.bind(this); this.suser = Fct.suser.bind(this); this.treatfile = Fct.treatfile.bind(this); this.checkeq = Fct.checkeq.bind(this); this.glp = Fct.glp.bind(this);
        this.state = Object.assign({}, Cnt.ost, Cnt.ost2, this.initlpg(scrnid[rtn][2], 1));
    }
    render() {
        let rtn = this.props.route.name, flkey = this.state.flkey, epta = scrnid[rtn][1].length, loading = <View key={'lod0'} style={[Stl.pzp, { flex: 1 }]}><View style={[{ height: dimsz[9], marginVertical: dimsz[0] }]}><Image source={loadind} style={[Stl.image]} /></View></View>, children = loading, ttle, olst, gndt, gndi, gndc, ena = false, supt, supa, edt = false, edp = false, nusr = false, urt = useright.find(function (et) { return et.match(new RegExp('^[\*\@\+\-]*2$', 'i')) }), Id_typeuser = parseInt(scrnid[rtn][4][0].Id_typeuser);
        switch (Id_typeuser) {
            case 1: case 2: case 3: case 4: case 5: case 6:
            ttle = gvar[2][9501]; gndt = gvar[2][137017]; gndi = 'lstusrtle'; gndc = "user-graduate"; supt = gvar[2][137044]; supa = amuarray; edp = true; urt = useright.find(function (et) { return et.match(new RegExp('^[\*\@\+\-]*1$', 'i')) });
            break;
            case 7:
            ttle = gvar[2][12500]; gndt = gvar[2][137016]; gndi = 'lstmalfem'; gndc = "transgender"; supt = gvar[2][137053]; supa = amuarray;
            break;
            case 8:
            ttle = gvar[2][6109]; gndt = gvar[2][137016]; gndi = 'lstmalfem'; gndc = "transgender"; supt = gvar[2][6108]; supa = [userarray]; /*supa = aparray;*/
            break;
        }
        if(scrnid[rtn][4][0].id == userarray.id) {
            ttle = gvar[2][95020];
            olst = ''; ena = true;
        }
        else {
            olst = Fct.setval(scrnid[rtn][4][0]);
            if(parseInt(scrnid[rtn][4][0].id) < 0) {
                if(parseInt(userarray.id) > 0) {
                    switch (Id_typeuser) {
                        case 1: case 2: case 3: case 4: case 5: case 6:
                        ttle = gvar[2][137030];
                        break;
                        case 7:
                        ttle = gvar[2][137032];
                        break;
                        case 8:
                        ttle = gvar[2][6101];
                        break;
                    }
                } else {
                    ttle = gvar[2][137030]; gndt = gvar[2][137017]; gndi = 'lstusrtle'; gndc = "user-graduate"; supt = gvar[2][137044]; supa = amuarray;
                }
                olst = ''; /*ena = true;*/ edt = true; nusr = true;
            }
        }
        if (this.state.initiaload) {
            let pdhl, hdrs = [], tempv;
            if (dmns.lrgs) { pdhl = dmns.w14; } else { pdhl = dmns.w18; } if(nusr) { epta = 1; tempv = ' & '+gvar[2][scrnid[rtn][1][1][0]]; } else { tempv = ''; }
            for (i = 0; i < epta; i++) { let fi = i; if (flkey == i) hdrs.push(<View key={fi} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center', borderBottomWidth: 2, borderColor: Cnt.clrs.blackcolor }}><Text style={[Stl.rtext, { fontSize: dimsz[2], textAlign: 'center' }]}>{(gvar[2][scrnid[rtn][1][i][0]]+tempv).toUpperCase()}</Text></View>); else hdrs.push(<TouchableOpacity key={fi} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.askbefquit(() => this.swipetab(fi))} style={{ flex: 1, paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h17, height: '100%', alignItems: 'center' }}><Text style={[Stl.txth3, { fontSize: dimsz[2], textAlign: 'center' }]}>{(gvar[2][scrnid[rtn][1][i][0]]+tempv).toUpperCase()}</Text></TouchableOpacity>); }
            children = [<View key={0} style={[Stl.rbox2, Stl.w100, { backgroundColor: Cnt.clrs.lightbg }]}>{hdrs}</View>, this.stslpg(), this.state.data ? <FlatList onScrollToIndexFailed={() => {}} windowSize={100} key={'f0'} ref={(ref) => this.mnscrlvw = ref} onContentSizeChange={(width, height) => this.cntscrl(width, height)} onLayout={(e) => this.lytscrl(e)} onScroll={(e) => this.hdlscrl(e)} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} contentContainerStyle={[Stl.svcont, { paddingBottom: dimsz[5] }]} data={this.state.data} renderItem={({ item, index }) => <RProfile tt={this} item={item} index={index} rtn={rtn} flkey={flkey} s={[[Stl.rbox2, { paddingHorizontal: pdhl }], [Stl.rbox2, Stl.lsepdiv, { flex: 1, paddingVertical: dimsz[2] }], [Stl.wicon, { fontSize: dimsz[10], width: dimsz[8], textAlign: 'center' }], { width: '30%', paddingStart: dimsz[4], paddingEnd: dimsz[5] }, [Stl.txts1, { fontSize: dimsz[1], paddingVertical: dimsz[5] }], [Stl.rbox2, { flex: 1, paddingStart: dimsz[19] }], [Stl.tcldg, Stl.w100, { fontSize: dimsz[1], padding: dimsz[5] }], [Stl.uicon, { fontSize: dimsz[6], width: dimsz[18], textAlign: 'center' }], [Stl.pzp, { width: dimsz[9], height: dimsz[9], marginEnd: dimsz[4] }], [Stl.uicon, { fontSize: dimsz[6] }]]} gndt={gndt} gndi={gndi} gndc={gndc} ena={ena} supt={supt} supa={supa} edt={edt} edp={edp} nusr={nusr} urt={urt} />}
                keyExtractor={(item, index) => String(flkey == 2 ? item.deviceid : index)}
                ListHeaderComponent={this.hedlpg}
                ListEmptyComponent={this.eptlpg}
                ListFooterComponent={this.fotlpg}
                onEndReached={(info) => { if (this.state.fload == 0 && this.state.ldmr && flkey == 2) this.loadlpg(2); }}
                onEndReachedThreshold={0.01}
                refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />} /> : loading];
        }
        return (
            <Mcnt tt={this} renderhead={[Cnt.clrs.bluecolor, ttle, olst, Fct.setval(scrnid[rtn][4][0])]} renderfoot={[Cnt.clrs.blackcolor]}>{children}</Mcnt>
        );
    }
}
