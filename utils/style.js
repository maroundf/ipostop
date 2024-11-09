export default StyleSheet.create({
  mcont: {
    flex: 1,
    backgroundColor: Cnt.clrs.blackcolor
  },
  svcont: {
    flexGrow: 1
  },
  image0: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  image: {
    flex: 1,
    resizeMode: 'contain'
  },
  image2: {
    width: '100%',
    height: undefined,
    aspectRatio: 1
  },
  cstl: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  istl: {
    borderRadius: Cnt.prps.borderradius,
    backgroundColor: Cnt.clrs.lgraycolor
  },
  vlyr: {
    borderRadius: Cnt.prps.borderradius,
    backgroundColor: 'rgba(0,0,0,.4)'
  },
  pcont: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pzp: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  scont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  clmndiv: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  clmndiv2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  ccont: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  txtcont: {
    flex: 1,
    flexDirection: 'column'
  },
  txtwrap: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  w100: {
    width: '100%'
  },
  tsttext: {
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
    color: Cnt.clrs.lightbg
  },
  tabicn: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0.6,
    height: '100%'
  },
  etbi: {
    width: '20%',
    flex: undefined
  },
  bcont: {
    flex: 0.3,
    backgroundColor: Cnt.clrs.lightbg
  },
  rectres: {
    backgroundColor: Cnt.clrs.yellowcolor,
    borderRadius: Cnt.prps.borderradius,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shdw: {
    shadowOffset: { width: 2, height: 2, },
    shadowColor: Cnt.clrs.dgraycolor,
    shadowOpacity: Cnt.prps.layeropcty,
    elevation: 2,
    marginVertical: 3
  },
  mshdw: {
    shadowOffset: { width: 3, height: 3, },
    shadowColor: Cnt.clrs.dgraycolor,
    shadowOpacity: Cnt.prps.layeropcty,
    elevation: 3
  },
  lshdw: {
    shadowOffset: { width: 4, height: 4, },
    shadowColor: Cnt.clrs.dgraycolor,
    shadowOpacity: Cnt.prps.layeropcty,
    elevation: 4
  },
  drwr: {
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  agitems: {
    flex: 1
  },
  agitem: {
    backgroundColor: Cnt.clrs.lightbg,
    borderBottomColor: Cnt.clrs.lbrdcolor,
    borderBottomWidth: 1
  },
  lredtext: {
    fontFamily: 'Montserrat-Bold',
    color: Cnt.clrs.lightredcolor,
  },
  btntext: {
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 0.5,
    color: Cnt.clrs.bluecolor
  },
  srinpt: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.blackcolor,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  linpt: {
    backgroundColor: Cnt.clrs.lightbg,
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.dgraycolor,
    borderRadius: Cnt.prps.borderradiusxlrg,
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingVertical: 5
  },
  sinpt: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.dgraycolor,
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingVertical: 5
  },
  rtext: {
    fontFamily: 'Montserrat-SemiBold',
    color: Cnt.clrs.blackcolor
  },
  rtext1: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.blackcolor
  },
  rtext2: {
    fontFamily: 'Montserrat-Bold',
    color: Cnt.clrs.lgraycolor2
  },
  lbltext0: {
    marginTop: 7,
    marginBottom: 2,
    padding: 7,
    borderRadius: Cnt.prps.borderradius,
    textAlign: 'center'
  },
  lbltext: {
    flex: 0.49,
    marginEnd: 1,
    padding: 7,
    borderRadius: Cnt.prps.borderradius
  },
  lbltextshad: {
    backgroundColor: Cnt.prps.d1opcty
  },
  rdbtn: {
    backgroundColor: Cnt.clrs.redcolor,
    marginBottom: 3,
    justifyContent: 'center'
  },
  rbtn: {
    backgroundColor: Cnt.clrs.greencolor,
    marginBottom: 3,
    justifyContent: 'center'
  },
  orbtn: {
    borderWidth: 1,
    borderColor: Cnt.prps.l1opcty
  },
  dbtn: {
    backgroundColor: Cnt.prps.d2opcty,
    borderRadius: Cnt.prps.borderradius
  },
  secstl: {
    backgroundColor: Cnt.clrs.blackcolor3,
    borderColor: Cnt.clrs.blackcolor,
    borderBottomWidth: 1
  },
  ybrdr: {
    borderColor: Cnt.clrs.yellowcolor,
    borderWidth: 1,
    borderRadius: 2
  },
  linktext: {
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
    letterSpacing: -0.25,
    color: Cnt.clrs.lightbg
  },
  lnktext: {
    textDecorationLine: 'underline',
    color: Cnt.clrs.bluecolor
  },
  dbrd: {
    borderColor: Cnt.prps.d2opcty,
    borderWidth: 1
  },
  lbrd: {
    borderColor: Cnt.prps.l2opcty,
    borderWidth: 1
  },
  mdlbg: {
    flex: 1,
    backgroundColor: Cnt.prps.mdlbgc
  },
  itmcont: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  txth0: {
    fontFamily: 'Montserrat-Bold',
    color: Cnt.clrs.dgraycolor
  },
  txth1: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.lgraycolor2
  },
  txth2: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.mgraycolor,
    textAlign: 'center'
  },
  txth3: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.dbrdcolor
  },
  txth4: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.footbg
  },
  txth5: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.blackcolor2
  },
  txth6: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.blackcolor2
  },
  txth7: {
    fontFamily: 'Montserrat-SemiBold',
    color: Cnt.clrs.blackcolor2
  },
  txth8: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.disabledbg
  },
  txth9: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.disabledbg
  },
  alrttxt: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.yellowcolor,
    textAlign: 'center'
  },
  ytxt: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.yellowcolor
  },
  itmres: {
    borderRadius: 2,
    backgroundColor: Cnt.prps.d2opcty,
    //minHeight: 30
  },
  btmsec: {
    shadowOffset: { width: 1, height: 1, },
    shadowColor: Cnt.clrs.dgraycolor,
    shadowOpacity: Cnt.prps.layeropcty,
    elevation: 1
  },
  alrtbg: {
    borderRadius: Cnt.prps.borderradius,
    backgroundColor: Cnt.clrs.lightbg
  },
  aptbg: {
    borderRadius: Cnt.prps.borderradius
  },
  itmhdiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  enotif: {
    backgroundColor: Cnt.clrs.dyellowcolor,
    textAlignVertical: 'center'
  },
  vertbar: {
    height: '100%',
    marginEnd: 5,
    borderEndWidth: 10
  },
  content: {
    backgroundColor: Cnt.clrs.lightbg,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Cnt.prps.d2opcty
  },
  headertext: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.bluecolor
  },
  fwdtext: {
    fontFamily: Platform.OS == 'ios' ? 'Courier' : 'monospace',
    letterSpacing: -1
  },
  dbicon: {
    color: Cnt.clrs.dbluecolor
  },
  gricon: {
    color: Cnt.clrs.greencolor
  },
  lgricon: {
    color: Cnt.clrs.lgreencolor
  },
  dyicon: {
    color: Cnt.clrs.dyellowcolor
  },
  lbicon: {
    color: Cnt.clrs.lbluecolor
  },
  bicon: {
    color: Cnt.clrs.blackcolor
  },
  bicon2: {
    color: Cnt.clrs.blackcolor2
  },
  uicon: {
    color: Cnt.clrs.yellowcolor
  },
  luicon: {
    color: Cnt.clrs.lyellowcolor
  },
  ricon: {
    color: Cnt.clrs.redcolor
  },
  dricon: {
    color: Cnt.clrs.dredcolor
  },
  hicon: {
    color: Cnt.clrs.bluecolor
  },
  ihicon: {
    tintColor: Cnt.clrs.bluecolor
  },
  gicon: {
    color: Cnt.clrs.graycolor
  },
  dbcolor: {
    color: Cnt.clrs.dbrdcolor
  },
  mgicon: {
    color: Cnt.clrs.mgraycolor
  },
  wicon: {
    color: Cnt.clrs.lightbg
  },
  lbdicon: {
    color: Cnt.clrs.lbrdcolor
  },
  dgicon: {
    color: Cnt.clrs.dgraycolor
  },
  fgicon: {
    color: Cnt.clrs.fgraycolor
  },
  bsepdiv: {
    borderColor: Cnt.clrs.blackcolor,
    borderBottomWidth: 1
  },
  lsept: {
    borderColor: Cnt.prps.l2opcty,
    borderTopWidth: 1
  },
  lsepdiv: {
    borderColor: Cnt.prps.l2opcty,
    borderBottomWidth: 1
  },
  sepdiv: {
    borderColor: Cnt.prps.l1opcty,
    borderBottomWidth: 1
  },
  dsepdiv: {
    borderColor: Cnt.prps.d2opcty,
    borderBottomWidth: 1
  },
  lbrdtext: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.lbrdcolor
  },
  mgraytext: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.mgraycolor
  },
  graytext: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.graycolor
  },
  rgraytext: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.graycolor
  },
  headerlabel: {
    backgroundColor: Cnt.clrs.bluecolor,
    marginTop: 20,
    marginBottom: 14,
    padding: 10,
    borderRadius: Cnt.prps.borderradiuslrg,
    shadowOffset: { width: 2, height: 2, },
    shadowColor: Cnt.clrs.dgraycolor,
    shadowOpacity: Cnt.prps.layeropcty,
    elevation: 2
  },
  thicon: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.graycolor,
    textAlign: 'center'
  },
  tcldg: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.lgraycolor2
  },
  itlctxt: {
    fontFamily: 'Montserrat-Italic',
    color: Cnt.clrs.lbrdcolor
  },
  filename: {
    fontFamily: 'Montserrat-Italic',
    color: Cnt.clrs.lbluecolor
  },
  txts: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.bluecolor,
    textAlign: 'center'
  },
  txts1: {
    fontFamily: 'Montserrat-SemiBold',
    color: Cnt.clrs.lightbg
  },
  txts2: {
    fontFamily: 'Montserrat-SemiBold',
    color: Cnt.clrs.lbluecolor
  },
  txts3: {
    fontFamily: 'Montserrat-SemiBold',
    color: Cnt.clrs.redcolor
  },
  txts4: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.lbluecolor
  },
  txts5: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.lbluecolor
  },
  txts6: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.lyellowcolor
  },
  glbicon: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.fgraycolor
  },
  wcicon: {
    fontFamily: 'Montserrat-Bold',
    color: Cnt.clrs.lightbg
  },
  squarerow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10
  },
  rbox: {
    backgroundColor: Cnt.clrs.lightbg,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    borderRadius: Cnt.prps.borderradius,
    shadowOffset: { width: 2, height: 2, },
    shadowColor: Cnt.clrs.dgraycolor,
    shadowOpacity: Cnt.prps.layeropcty,
    elevation: 2
  },
  squarebox: {
    aspectRatio: 1 / 1
  },
  rectanglebox: {
    aspectRatio: 1 / 0.27
  },
  rectanglebox2: {
    aspectRatio: 1 / 0.5
  },
  rectanglebox3: {
    aspectRatio: 1 / 0.34
  },
  hrdiv: {
    borderTopWidth: 1,
    borderColor: Cnt.clrs.graycolor,
    alignSelf: 'center'
  },
  nttext: {
    paddingHorizontal: 4,
    textAlign: 'center'
  },
  titletext: {
    fontFamily: 'Montserrat-Bold',
    color: Cnt.clrs.footbg,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  qtext: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.lightbg
  },
  smalltext: {
    fontFamily: 'Montserrat-Medium',
    color: Cnt.clrs.lightbg
  },
  labeltext: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.graycolor
  },
  radiocheckdiv: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  blcont: {
    flexDirection: 'row'
  },
  ogeno: {
    borderRadius: Cnt.prps.borderradiusxlrg,
    height: '100%'
  },
  linpt2: {
    color: Cnt.clrs.bluecolor,
    width: '100%'
  },
  inptclear: {
    position: 'absolute',
    zIndex: 10,
    elevation: 3
  },
  hdrcont: {
    borderColor: Cnt.clrs.lbrdcolor,
    borderBottomWidth: 1
  },
  lstcont: {
    borderColor: Cnt.clrs.dgraycolor,
    borderBottomWidth: 1
  },
  rbox1: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  rbox2: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reqfld: {
    backgroundColor: Cnt.clrs.lredcolor2,
    color: Cnt.clrs.dgraycolor,
    borderColor: Cnt.clrs.redcolor,
    borderWidth: 1
  },
  fdcol: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start'
  },
  rbox3: {
    flexDirection: 'column',
    alignSelf: 'flex-start'
  },
  rbox4: {
    flex: 1,
    justifyContent: 'space-around'
  },
  colico: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  coldiv: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  colcen: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  remotevid:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 1
    },
  localvid:{
    position: 'absolute',
    width: '25%',
    height: '25%',
    overflow: 'hidden',
    zIndex: 20,
    borderRadius: Cnt.prps.borderradiusmed
    },
  icnvid: {
    position: 'absolute',
    left: 0,
    width: '100%',
    zIndex: 10
  },
  bkdiv: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  srdiv: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btmtab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  darktab: {
    backgroundColor: Cnt.prps.d2opcty
  },
  blacktab: {
    backgroundColor: Cnt.clrs.blackcolor
  },
  lighttab: {
    backgroundColor: Cnt.clrs.lightbg
  },
  yellowtab: {
    backgroundColor: Cnt.clrs.yellowcolor
  },
  bluetab: {
    backgroundColor: Cnt.clrs.bluecolor
  },
  redtab: {
    backgroundColor: Cnt.clrs.redcolor
  },
  dtext: {
    fontFamily: 'Montserrat-Medium',
    letterSpacing: -0.75,
    color: Cnt.clrs.lightbg,
    textAlign: 'center'
  },
  srchcont: {
    backgroundColor: Cnt.prps.d1opcty
  },
  ltbg4: {
    backgroundColor: Cnt.prps.l4opcty
  },
  nodata: {
    width: '100%',
    alignItems: 'center'
  },
  tabtxt: {
    textAlign: 'center',
    letterSpacing: -0.5
  },
  dgtext: {
    fontFamily: 'Montserrat-Regular',
    color: Cnt.clrs.dgraycolor
  },
  disabled: {
    backgroundColor: Cnt.clrs.disabledbg
  },
  dsbtext: {
    color: Cnt.clrs.disabledcolor
  },
  dsbicon: {
    color: Cnt.clrs.disabledbg
  },
  sitem: {
    borderColor: Cnt.prps.d1opcty,
    borderTopWidth: 1
  },
  ditem: {
    borderColor: Cnt.prps.d1opcty,
    borderBottomWidth: 1
  },
  cptlst: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000
  },
  chron: {
    backgroundColor: Cnt.clrs.blackcolor,
    borderRadius: Cnt.prps.borderradius
  },
  chronhead: {
    backgroundColor: Cnt.prps.l1opcty,
    borderColor: Cnt.prps.l1opcty,
    borderBottomWidth: 1
  },
  centered: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
