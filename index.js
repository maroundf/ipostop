import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'; global.PanGestureHandler = PanGestureHandler; global.PinchGestureHandler = PinchGestureHandler; global.State = State;
import RN from 'react-native'; global.BackHandler = RN.BackHandler; global.View = RN.View; global.Keyboard = RN.Keyboard; global.Text = RN.Text; global.TextInput = RN.TextInput; global.TouchableOpacity = RN.TouchableOpacity; global.Button = RN.Button; global.Dimensions = RN.Dimensions; global.NativeModules = RN.NativeModules; global.View = RN.View; global.ScrollView = RN.ScrollView; global.RefreshControl = RN.RefreshControl; global.PermissionsAndroid = RN.PermissionsAndroid; global.PanResponder = RN.PanResponder; global.Alert = RN.Alert; global.UIManager = NativeModules.UIManager; global.findNodeHandle = RN.findNodeHandle; global.Linking = RN.Linking; global.SafeAreaView = RN.SafeAreaView;

Text.defaultProps = { ...(Text.defaultProps || {}), allowFontScaling: false };
TextInput.defaultProps = { ...(TextInput.defaultProps || {}), allowFontScaling: false };

import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage'; global.AsyncStorage = AsyncStorage;
import DateTimePickerModal from 'react-native-modal-datetime-picker'; global.DateTimePickerModal = DateTimePickerModal;
import DeviceInfo from 'react-native-device-info';
import { VictoryChart, VictoryAxis, VictoryLegend, VictoryBar, VictoryScatter, VictoryLine, VictoryArea, createContainer } from "victory"; global.VictoryChart = VictoryChart; global.VictoryAxis = VictoryAxis; global.VictoryLegend = VictoryLegend; global.VictoryBar = VictoryBar; global.VictoryScatter = VictoryScatter; global.VictoryLine = VictoryLine; global.VictoryArea = VictoryArea; global.VictoryZoomContainer = createContainer("zoom", "voronoi");
import moment from './utils/moment-timezone'; global.moment = moment;
import { addEventListener } from '@react-native-community/netinfo';
//npm install --save https://github.com/dramilj/react-native-webrtc/tarball/image_capture
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, RTCView, mediaDevices } from 'react-native-webrtc'; global.RTCPeerConnection = RTCPeerConnection; global.RTCIceCandidate = RTCIceCandidate; global.RTCSessionDescription = RTCSessionDescription; global.RTCView = RTCView; global.mediaDevices = mediaDevices;
import InCallManager from 'react-native-incall-manager'; global.InCallManager = InCallManager;
import Slider from '@react-native-community/slider'; global.Slider = Slider;

global.systz = null; global.dmns = {}; global.dimsz = []; global.msg = null; global.gvar = { 13: {'ntype': { 1: ['Messenger', 'Chatroom'], 2: ['Notifications'], 3: ['Notifications'], 4: ['Notifications'], 5: ['Notifications'], 6: ['Notifications'], 7: ['Notifications'], 8: ['Instructions'], 9: ['Notifications'], 10: ['Notifications'], 11: ['Notifications'], 12: ['Notifications'], 13: ['Notifications'], 14: ['Notifications'], 15: ['Notifications'], 16: ['Notifications'], 7: ['Notifications'], 17: ['Messenger', 'Chatroom'], 18: ['Tasks'], 19: ['Questions'], 20: ['Messenger', 'Chatroom'], 21: ['Details'], 22: ['Messenger', 'Chatroom'], 31: ['Details'], 32: ['Details'], 33: ['Details'], 36: ['Details'], 37: ['Details'], 38: ['Details'] } } }; global.iuarray = { id: "-1", value: "", fname: "", lname: "", city: "", login: "", pwd: "", pincode: "", l7p: "", ophone: "", insee: "", lemail: "", notifmode: "", mname: "", zipcode: "", country: "", logo: "", Id_center: "", uselogo: "", contract: "", tolang: "", clogo: "", clabel: "", idcp: "", Id_sup: "", Id_upd: "", pdate: "", gender: "", lang: "en", cfdate: "", active: "1", Id_typeuser: "", photo: "", timezone: "", extid: "", birthday: "", address: "", phone: "", detail: "", barcode: "", signature: "", footer: "", Id_pop: "-1", accpt: "", regtype: "", sttus: "", cptlist: "", surgtype: "", surgoth: "", surgdate: "", povdate: "", odate: "", Id_shd: "", situation: "", nbchild: "", ethnicity: "", doctor: "", emergcontact: "", profession: "", hsid: "" }; global.userarray = {}; global.lstpages = null; global.amuarray = [{ id: "-1", value: "Admin iPostOp", fname: "Admin", lname: "iPostOp", Id_typeuser: "-1", idcp: ",-1," }]; global.convpoolarray = []; global.medteamarray = [{ id: "cp-1", value: "TEAM IPOSTOP", cpname: "Team iPostOp", Id_typeuser: "-1", idconvpool: "-1" }]; global.myusers = ""; global.patids = ""; global.aparray = []; global.acarray = []; global.srgtype = []; global.cpids = ""; global.surglist = []; global.userpar = {}; global.conn = null; global.peerconn = {}; global.vcmmint = null; global.wstream = null; global.lclstrm = null; global.qrp = null; global.ices = []; global.ringTime = null; global.ringTimer = null; global.restint = null; global.renego = null; global.mxrest = 0; global.mxrcnt = 0; global.mxrtimes = 10; global.vctab = 103; global.mainvid = -1; global.remotecntr = 0; global.isaudio = false; global.callData = {}; global.vcusers = null; global.facing = "user"; global.speaker = null; global.ostts = null; global.useright = []; global.allusr = []; global.aouarray = []; global.gcnt = null; global.vcchunks = null; global.vcrecorder = null; global.recordTime = null; global.recordTimer = null; global.snpTimer = null; global.wsurl = 0; global.conid = true; global.dash = false; global.scrnid = null; global.dshscrn = null; global.crnscrn = null; global.phys = 1; global.appstt = ['unknown', 1]; global.inactivityTimer = null; global.lstactv = null; global.devicedata = ['', Platform.OS, '', '', DeviceInfo.getVersion()]; global.isonline = null; global.vctmr = null; global.ks = 225; global.kfct = null; global.mndrw = null; global.mnldr = null; global.mnlst = null; global.mntst = null; global.mnwcl = null; global.mnsly = null;

global.aplogo = require('./assets/images/logo.png');
global.mglogo = require('./assets/images/logo-meges.png');
global.loadind = require('./assets/images/loading.gif');
global.nedle = require('./assets/images/needle.png');
global.wlogo = require('./assets/images/ic_notification.png');

import { authorize } from 'react-native-app-auth'; global.authorize = authorize;
import ReactNativeBiometrics from 'react-native-biometrics'; global.Tchid = ReactNativeBiometrics;
import RNFB from 'rn-fetch-blob'; global.RNFB = RNFB;
import { WebView } from 'react-native-webview'; global.WebView = WebView;
import ImagePicker from 'react-native-image-crop-picker'; global.ImagePicker = ImagePicker;
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'; global.Icon1 = Icon1;
import Icon2 from 'react-native-vector-icons/FontAwesome5'; global.Icon2 = Icon2;
import Icon3 from 'react-native-vector-icons/Ionicons'; global.Icon3 = Icon3;
import Izv from './utils/imagezoomviewer'; global.Izv = Izv;
import Spc from './utils/spacer'; global.Spc = Spc;
import Stl from './utils/style'; global.Stl = Stl;
import Drw from './utils/drawer'; import Wcl from './utils/wcl'; import Ldr from './utils/loader'; import Lst from './utils/list'; import Tst from './utils/toast'; import Sly from './utils/sly';
import Tmr from './utils/timer'; global.Tmr = Tmr;
import Cbx from './utils/checkbox'; global.Cbx = Cbx;
import Rbn from './utils/radiobutton'; global.Rbn = Rbn;
import * as Fct from './utils/funct'; global.Fct = Fct;
import Mcnt from './utils/mcont'; global.Mcnt = Mcnt;
import Iml from './utils/imageload'; global.Iml = Iml;
import Gag from './utils/gauge'; global.Gag = Gag;
import Prg from './utils/progress'; global.Prg = Prg;
import Pnz from './utils/pinchzoom'; global.Pnz = Pnz;
import Prs from './utils/parsetext'; global.Prs = Prs;

import Login from './screens/login';
import Home from './screens/home';
import Dashboard from './screens/dashboard';
import Appointments from './screens/appointments';
import Notifications from './screens/notifications';
import Messenger from './screens/messenger';
import Chatroom from './screens/chatroom';
import Details from './screens/details';
import Questions from './screens/questions';
import Tasks from './screens/tasks';
import Instructions from './screens/instructions';
import Documentation from './screens/documentation';
import Caregivers from './screens/caregivers';
import Reminders from './screens/reminders';
import Analytics from './screens/analytics';
import Profile from './screens/profile';
import Legal from './screens/legal';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; const Stack = createStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ presentation: "card", headerShown: false, cardStyle: { backgroundColor: Cnt.clrs.blackcolor, opacity: 1 }, gestureEnabled: false/*, animationEnabled: false*/ }}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Appointments" component={Appointments} />
    <Stack.Screen name="Notifications" component={Notifications} />
    <Stack.Screen name="Messenger" component={Messenger} />
    <Stack.Screen name="Chatroom" component={Chatroom} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Analytics" component={Analytics} />
    <Stack.Screen name="Questions" component={Questions} />
    <Stack.Screen name="Tasks" component={Tasks} />
    <Stack.Screen name="Instructions" component={Instructions} />
    <Stack.Screen name="Documentation" component={Documentation} />
    <Stack.Screen name="Caregivers" component={Caregivers} />
    <Stack.Screen name="Reminders" component={Reminders} />
    <Stack.Screen name="Legal" component={Legal} />
    <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ presentation: "card", headerShown: false, cardStyle: { backgroundColor: Cnt.clrs.blackcolor, opacity: 1 }, gestureEnabled: false/*, animationEnabled: false*/ }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Dashboards" component={DashboardStack} />
    </Stack.Navigator>
  );
}

import messaging from '@react-native-firebase/messaging'; global.messaging = messaging;
messaging().setBackgroundMessageHandler(async (remoteMessage) => { });
//function HeadlessCheck({ isHeadless }) { return isHeadless ? null : <Index />; }
export default class Index extends React.Component {
    constructor(props) {
        super(props); Fct.gl(); //this.state = { ihd : null };
        this.apstchg = RN.AppState.addEventListener('change', (newappstate) => {
          if (appstt[0].match(/unknown|inactive|background/) && newappstate === 'active') {
            //if(!this.state.ihd) this.setState({ ihd : 1 });
            if(wstream && !Fct.isempty(peerconn)) {
            wstream.getTracks().forEach(track => { if(track.kind == 'video' && track.enabled) setTimeout(() => { track.enabled = false; setTimeout(() => { track.enabled = true; mnwcl.setState({a: !mnwcl.state.a}); }, 200); }, 200); });
            } NativeModules.Utils.rNotifs();
          } appstt[0] = newappstate;
        });
        if (Platform.OS === 'android') {
            this.bckb = () => { return true; };
        }
    }
    componentDidMount() {
        Fct.grk(null, null, 1);
        DeviceInfo.getDeviceName().then((devnam) => devicedata[2] = Fct.sanitizeinput(devnam));
        DeviceInfo.getUniqueId().then((uniqueId) => devicedata[0] = uniqueId);
        if (Platform.OS === 'android') {
            PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]).then((rperms) => { }).catch((error) => { });
            BackHandler.addEventListener('hardwareBackPress', this.bckb);
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        } else {
            if (InCallManager.recordPermission != 'granted') InCallManager.requestRecordPermission().then((rperms) => { }).catch(error => { });
        }
        this.onNetListener = addEventListener((state) => {
            isonline = state.isConnected;
            if(isonline) {
                if (parseInt(userarray.id) > 0) { ostts = null; mxrcnt = 0; clearTimeout(vctmr); vctmr = setTimeout(Fct.vcconnect, 3000); }
            } else {
                ostts = null; Fct.setstatus();
            }
        });
        messaging().onMessage((remoteMessage) => {
            let odata = remoteMessage.data, csrn = crnscrn || dshscrn, rtn = csrn ? csrn.props.route.name : null, mp = Fct.ismp(odata, rtn), Id_target, cgrp;
            if (rtn && rtn != 'Login' && rtn != 'Home') {
                if (!userarray.id || userarray.id == -1 || (',' + odata.idreceiver + ',').indexOf(',' + userarray.id + ',') != -1) {
                    if (mp[2]) {
                        if (odata.idconvpool) cgrp = convpoolarray.find(elm => elm.idconvpool == odata.idconvpool); else cgrp = amuarray.find(elm => elm.id == odata.id); if (cgrp) Id_target = cgrp.id;
                    }
                    if (rtn != mp[1] || (mp[2] && scrnid['Chatroom'][4][0].id != Id_target)) {
                        NativeModules.Utils.pSound(1007); //NativeModules.Beep.pSound(Platform.OS === 'android' ? 94 : 1007); //94,86,1000   1000,1007
                    }
                }
            } else NativeModules.Utils.pSound(1007);
            NativeModules.Utils.rNotifs();
        });
        messaging().onNotificationOpenedApp((remoteMessage) => {
            let odata = remoteMessage.data, csrn = crnscrn || dshscrn, rtn = csrn ? csrn.props.route.name : null, mp = Fct.ismp(odata, rtn), Id_target, cgrp;
            if (rtn && rtn != 'Login') {
                if (rtn == 'Home') {
                    Fct.ininot(odata, mp); csrn.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                } else {
                    if (!userarray.id || userarray.id == -1 || (',' + odata.idreceiver + ',').indexOf(',' + userarray.id + ',') != -1) {
                        if (mp[2]) {
                            if (odata.idconvpool) cgrp = convpoolarray.find(elm => elm.idconvpool == odata.idconvpool); else cgrp = amuarray.find(elm => elm.id == odata.id); if (cgrp) Id_target = cgrp.id;
                        }
                        if (rtn != mp[1] || (mp[2] && scrnid['Chatroom'][4][0].id != Id_target)) {
                            csrn.rdrnot(odata, mp[2], mp[3], odata.flkey, 1);
                        }
                    }
               }
            } else Fct.ininot(odata, mp);
            NativeModules.Utils.rNotifs(); lstactv = new Date();
        });
        messaging().getInitialNotification().then((remoteMessage) => {
            if (remoteMessage) {
                let odata = remoteMessage.data, mp = Fct.ismp(odata);
                Fct.ininot(odata, mp);
            }
        });
    }
    componentWillUnmount() {
        Fct.clsws(); clearInterval(inactivityTimer);
        this.onNetListener(); this.apstchg.remove();
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.bckb);
        }
    }
    render() {
        RN.LogBox.ignoreAllLogs(true);
        return /*!this.state.ihd ? null : */<NavigationContainer><RootStack /><Drw ref={(ref) => mndrw = ref} /><Wcl ref={(ref) => mnwcl = ref} /><Ldr ref={(ref) => mnldr = ref} /><Lst ref={(ref) => mnlst = ref} /><Sly ref={(ref) => mnsly = ref} /><Tst ref={(ref) => mntst = ref} /></NavigationContainer>;
    }
}

RN.AppRegistry.registerComponent(appName, () => Index);
//RN.AppRegistry.registerComponent(appName, () => HeadlessCheck);

