export const defpat = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*[-a-zA-Z0-9@:%_\+~#?&\/=])*/i,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
  email: /\S+@\S+\.\S+/,
};
export default class ParseText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { op: [] }; this.text = props.children; this.defpat = this.gpn() || [];
  }
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }
  parse() {
    let parsedTexts = [{children: this.text}];
    this.defpat.forEach((pattern) => {
      let newParts = [];
      parsedTexts.forEach((parsedText) => {
        if (parsedText._matched) {
          newParts.push(parsedText);
          return;
        }
        let parts = [], textLeft = parsedText.children, indexOfMatchedString = 0;
        while (textLeft) {
          let matches = pattern.pattern.exec(textLeft);
          if (!matches) break;
          let previousText = textLeft.substr(0, matches.index);
          indexOfMatchedString += matches.index;
          parts.push({children: previousText});
          parts.push(this.gmp(pattern, matches[0], matches, indexOfMatchedString, parts.length));
          textLeft = textLeft.substr(matches.index + matches[0].length);
          indexOfMatchedString += matches[0].length;
        }
        parts.push({children: textLeft});
        newParts.push(...parts);
      });
      parsedTexts = newParts;
    });
    parsedTexts.forEach((parsedText) => delete(parsedText._matched));
    return parsedTexts.filter(t => !!t.children);
  }
  gmp(matchedPattern, text, matches, idx, index) {
    let props = {};
    Object.keys(matchedPattern).forEach((key) => {
      if (key === 'pattern' || key === 'renderText') return;
      if (typeof matchedPattern[key] === 'function') props[key] = () => { matchedPattern[key](text, idx); let op = this.state.op.slice(); op[index] = 1; this.setState({ op }, () => setTimeout(() => { let op = this.state.op.slice(); op[index] = null; this.setState({ op }); }, 10)); }; else props[key] = matchedPattern[key];
    });
    return { ...props, children: text, _matched: true };
  }
  gpn() {
    return (this.props.parse || [{type: 'url', style: Stl.lnktext, onPress: (e) => mnldr.showclose('flex', [9, null, (e.startsWith('http') ? '' : 'http://') + e, null, 'http', e, ''])}, {type: 'email', style: Stl.lnktext, onPress: (e) => Linking.openURL('mailto:' + e).catch((error) => mntst.show([[gvar[2][45056] + ' ' + e, 2]]))}, {type: 'phone', style: Stl.lnktext, onPress: (e) => Linking.openURL('tel://' + e).catch((error) => mntst.show([[gvar[2][45049] + ' ' + e, 2]]))}]).map((option) => {
      const {type, ...patternOption} = option;
      if (type && defpat[type]) patternOption.pattern = defpat[type];
      return patternOption;
    });
  }
  gpt() {
    return typeof this.props.children !== 'string' ? this.props.children : this.parse().map((props, index) => {
      const { style: parentStyle } = this.props, { style, ...remainder } = props;
      return (
        <Text
          key={index}
          style={[parentStyle, style, props.onPress && this.state.op[index] ? { backgroundColor: Cnt.prps.l1opcty } : null]}
          {...this.props.childrenProps}
          {...remainder}
        />
      );
    });
  }
  render() {
    const { parse, childrenProps, ...remainder } = { ...this.props };
    return (
      <Text ref={ref => (this._root = ref)} {...remainder}>{this.gpt()}</Text>
    );
  }
}
