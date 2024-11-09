var CryptoJS = function (t, e) { var r = {}, i = r.lib = {}, n = function () { }, o = i.Base = { extend: function (t) { n.prototype = this; var e = new n; return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function () { e.super.init.apply(this, arguments) }), e.init.prototype = e, e.super = this, e }, create: function () { var t = this.extend(); return t.init.apply(t, arguments), t }, init: function () { }, mixIn: function (t) { for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]); t.hasOwnProperty("toString") && (this.toString = t.toString) }, clone: function () { return this.init.prototype.extend(this) } }, s = i.WordArray = o.extend({ init: function (t, e) { t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length }, toString: function (t) { return (t || a).stringify(this) }, concat: function (t) { var e = this.words, r = t.words, i = this.sigBytes; if (t = t.sigBytes, this.clamp(), i % 4) for (var n = 0; n < t; n++) e[i + n >>> 2] |= (r[n >>> 2] >>> 24 - n % 4 * 8 & 255) << 24 - (i + n) % 4 * 8; else if (65535 < r.length) for (n = 0; n < t; n += 4) e[i + n >>> 2] = r[n >>> 2]; else e.push.apply(e, r); return this.sigBytes += t, this }, clamp: function () { var e = this.words, r = this.sigBytes; e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, e.length = t.ceil(r / 4) }, clone: function () { var t = o.clone.call(this); return t.words = this.words.slice(0), t }, random: function (e) { for (var r = [], i = 0; i < e; i += 4) r.push(4294967296 * t.random() | 0); return new s.init(r, e) } }), c = r.enc = {}, a = c.Hex = { stringify: function (t) { var e = t.words; t = t.sigBytes; for (var r = [], i = 0; i < t; i++) { var n = e[i >>> 2] >>> 24 - i % 4 * 8 & 255; r.push((n >>> 4).toString(16)), r.push((15 & n).toString(16)) } return r.join("") }, parse: function (t) { for (var e = t.length, r = [], i = 0; i < e; i += 2) r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4; return new s.init(r, e / 2) } }, f = c.Latin1 = { stringify: function (t) { var e = t.words; t = t.sigBytes; for (var r = [], i = 0; i < t; i++) r.push(String.fromCharCode(e[i >>> 2] >>> 24 - i % 4 * 8 & 255)); return r.join("") }, parse: function (t) { for (var e = t.length, r = [], i = 0; i < e; i++) r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8; return new s.init(r, e) } }, h = c.Utf8 = { stringify: function (t) { try { return decodeURIComponent(escape(f.stringify(t))) } catch (t) { throw Error("Malformed UTF-8 data") } }, parse: function (t) { return f.parse(unescape(encodeURIComponent(t))) } }, u = i.BufferedBlockAlgorithm = o.extend({ reset: function () { this._data = new s.init, this._nDataBytes = 0 }, _append: function (t) { "string" == typeof t && (t = h.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes }, _process: function (e) { var r = this._data, i = r.words, n = r.sigBytes, o = this.blockSize, c = n / (4 * o); if (e = (c = e ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0)) * o, n = t.min(4 * e, n), e) { for (var a = 0; a < e; a += o) this._doProcessBlock(i, a); a = i.splice(0, e), r.sigBytes -= n } return new s.init(a, n) }, clone: function () { var t = o.clone.call(this); return t._data = this._data.clone(), t }, _minBufferSize: 0 }); i.Hasher = u.extend({ cfg: o.extend(), init: function (t) { this.cfg = this.cfg.extend(t), this.reset() }, reset: function () { u.reset.call(this), this._doReset() }, update: function (t) { return this._append(t), this._process(), this }, finalize: function (t) { return t && this._append(t), this._doFinalize() }, blockSize: 16, _createHelper: function (t) { return function (e, r) { return new t.init(r).finalize(e) } }, _createHmacHelper: function (t) { return function (e, r) { return new p.HMAC.init(t, r).finalize(e) } } }); var p = r.algo = {}; return r } (Math); !function () { var t = CryptoJS, e = t.lib.WordArray; t.enc.Base64 = { stringify: function (t) { var e = t.words, r = t.sigBytes, i = this._map; t.clamp(), t = []; for (var n = 0; n < r; n += 3) for (var o = (e[n >>> 2] >>> 24 - n % 4 * 8 & 255) << 16 | (e[n + 1 >>> 2] >>> 24 - (n + 1) % 4 * 8 & 255) << 8 | e[n + 2 >>> 2] >>> 24 - (n + 2) % 4 * 8 & 255, s = 0; 4 > s && n + .75 * s < r; s++) t.push(i.charAt(o >>> 6 * (3 - s) & 63)); if (e = i.charAt(64)) for (; t.length % 4; ) t.push(e); return t.join("") }, parse: function (t) { var r = t.length, i = this._map; (n = i.charAt(64)) && (-1 != (n = t.indexOf(n)) && (r = n)); for (var n = [], o = 0, s = 0; s < r; s++) if (s % 4) { var c = i.indexOf(t.charAt(s - 1)) << s % 4 * 2, a = i.indexOf(t.charAt(s)) >>> 6 - s % 4 * 2; n[o >>> 2] |= (c | a) << 24 - o % 4 * 8, o++ } return e.create(n, o) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="} } (), function (t) { function e(t, e, r, i, n, o, s) { return ((t = t + (e & r | ~e & i) + n + s) << o | t >>> 32 - o) + e } function r(t, e, r, i, n, o, s) { return ((t = t + (e & i | r & ~i) + n + s) << o | t >>> 32 - o) + e } function i(t, e, r, i, n, o, s) { return ((t = t + (e ^ r ^ i) + n + s) << o | t >>> 32 - o) + e } function n(t, e, r, i, n, o, s) { return ((t = t + (r ^ (e | ~i)) + n + s) << o | t >>> 32 - o) + e } for (var o = CryptoJS, s = (a = o.lib).WordArray, c = a.Hasher, a = o.algo, f = [], h = 0; 64 > h; h++) f[h] = 4294967296 * t.abs(t.sin(h + 1)) | 0; a = a.MD5 = c.extend({ _doReset: function () { this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878]) }, _doProcessBlock: function (t, o) { for (var s = 0; 16 > s; s++) { var c = t[a = o + s]; t[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8) } s = this._hash.words; var a = t[o + 0], h = (c = t[o + 1], t[o + 2]), u = t[o + 3], p = t[o + 4], d = t[o + 5], l = t[o + 6], y = t[o + 7], _ = t[o + 8], v = t[o + 9], g = t[o + 10], B = t[o + 11], x = t[o + 12], S = t[o + 13], k = t[o + 14], m = t[o + 15], z = e(z = s[0], D = s[1], w = s[2], C = s[3], a, 7, f[0]), C = e(C, z, D, w, c, 12, f[1]), w = e(w, C, z, D, h, 17, f[2]), D = e(D, w, C, z, u, 22, f[3]); z = e(z, D, w, C, p, 7, f[4]), C = e(C, z, D, w, d, 12, f[5]), w = e(w, C, z, D, l, 17, f[6]), D = e(D, w, C, z, y, 22, f[7]), z = e(z, D, w, C, _, 7, f[8]), C = e(C, z, D, w, v, 12, f[9]), w = e(w, C, z, D, g, 17, f[10]), D = e(D, w, C, z, B, 22, f[11]), z = e(z, D, w, C, x, 7, f[12]), C = e(C, z, D, w, S, 12, f[13]), w = e(w, C, z, D, k, 17, f[14]), z = r(z, D = e(D, w, C, z, m, 22, f[15]), w, C, c, 5, f[16]), C = r(C, z, D, w, l, 9, f[17]), w = r(w, C, z, D, B, 14, f[18]), D = r(D, w, C, z, a, 20, f[19]), z = r(z, D, w, C, d, 5, f[20]), C = r(C, z, D, w, g, 9, f[21]), w = r(w, C, z, D, m, 14, f[22]), D = r(D, w, C, z, p, 20, f[23]), z = r(z, D, w, C, v, 5, f[24]), C = r(C, z, D, w, k, 9, f[25]), w = r(w, C, z, D, u, 14, f[26]), D = r(D, w, C, z, _, 20, f[27]), z = r(z, D, w, C, S, 5, f[28]), C = r(C, z, D, w, h, 9, f[29]), w = r(w, C, z, D, y, 14, f[30]), z = i(z, D = r(D, w, C, z, x, 20, f[31]), w, C, d, 4, f[32]), C = i(C, z, D, w, _, 11, f[33]), w = i(w, C, z, D, B, 16, f[34]), D = i(D, w, C, z, k, 23, f[35]), z = i(z, D, w, C, c, 4, f[36]), C = i(C, z, D, w, p, 11, f[37]), w = i(w, C, z, D, y, 16, f[38]), D = i(D, w, C, z, g, 23, f[39]), z = i(z, D, w, C, S, 4, f[40]), C = i(C, z, D, w, a, 11, f[41]), w = i(w, C, z, D, u, 16, f[42]), D = i(D, w, C, z, l, 23, f[43]), z = i(z, D, w, C, v, 4, f[44]), C = i(C, z, D, w, x, 11, f[45]), w = i(w, C, z, D, m, 16, f[46]), z = n(z, D = i(D, w, C, z, h, 23, f[47]), w, C, a, 6, f[48]), C = n(C, z, D, w, y, 10, f[49]), w = n(w, C, z, D, k, 15, f[50]), D = n(D, w, C, z, d, 21, f[51]), z = n(z, D, w, C, x, 6, f[52]), C = n(C, z, D, w, u, 10, f[53]), w = n(w, C, z, D, g, 15, f[54]), D = n(D, w, C, z, c, 21, f[55]), z = n(z, D, w, C, _, 6, f[56]), C = n(C, z, D, w, m, 10, f[57]), w = n(w, C, z, D, l, 15, f[58]), D = n(D, w, C, z, S, 21, f[59]), z = n(z, D, w, C, p, 6, f[60]), C = n(C, z, D, w, B, 10, f[61]), w = n(w, C, z, D, h, 15, f[62]), D = n(D, w, C, z, v, 21, f[63]); s[0] = s[0] + z | 0, s[1] = s[1] + D | 0, s[2] = s[2] + w | 0, s[3] = s[3] + C | 0 }, _doFinalize: function () { var e = this._data, r = e.words, i = 8 * this._nDataBytes, n = 8 * e.sigBytes; r[n >>> 5] |= 128 << 24 - n % 32; var o = t.floor(i / 4294967296); for (r[15 + (n + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), r[14 + (n + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), e.sigBytes = 4 * (r.length + 1), this._process(), r = (e = this._hash).words, i = 0; 4 > i; i++) n = r[i], r[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8); return e }, clone: function () { var t = c.clone.call(this); return t._hash = this._hash.clone(), t } }), o.MD5 = c._createHelper(a), o.HmacMD5 = c._createHmacHelper(a) } (Math), function () { var t, e = CryptoJS, r = (t = e.lib).Base, i = t.WordArray, n = (t = e.algo).EvpKDF = r.extend({ cfg: r.extend({ keySize: 4, hasher: t.MD5, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, e) { for (var r = (c = this.cfg).hasher.create(), n = i.create(), o = n.words, s = c.keySize, c = c.iterations; o.length < s; ) { a && r.update(a); var a = r.update(t).finalize(e); r.reset(); for (var f = 1; f < c; f++) a = r.finalize(a), r.reset(); n.concat(a) } return n.sigBytes = 4 * s, n } }); e.EvpKDF = function (t, e, r) { return n.create(r).compute(t, e) } } (), CryptoJS.lib.Cipher || function (t) { var e = (d = CryptoJS).lib, r = e.Base, i = e.WordArray, n = e.BufferedBlockAlgorithm, o = d.enc.Base64, s = d.algo.EvpKDF, c = e.Cipher = n.extend({ cfg: r.extend(), createEncryptor: function (t, e) { return this.create(this._ENC_XFORM_MODE, t, e) }, createDecryptor: function (t, e) { return this.create(this._DEC_XFORM_MODE, t, e) }, init: function (t, e, r) { this.cfg = this.cfg.extend(r), this._xformMode = t, this._key = e, this.reset() }, reset: function () { n.reset.call(this), this._doReset() }, process: function (t) { return this._append(t), this._process() }, finalize: function (t) { return t && this._append(t), this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (t) { return { encrypt: function (e, r, i) { return ("string" == typeof r ? l : p).encrypt(t, e, r, i) }, decrypt: function (e, r, i) { return ("string" == typeof r ? l : p).decrypt(t, e, r, i) } } } }); e.StreamCipher = c.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }); var a = d.mode = {}, f = function (t, e, r) { var i = this._iv; i ? this._iv = void 0 : i = this._prevBlock; for (var n = 0; n < r; n++) t[e + n] ^= i[n] }, h = (e.BlockCipherMode = r.extend({ createEncryptor: function (t, e) { return this.Encryptor.create(t, e) }, createDecryptor: function (t, e) { return this.Decryptor.create(t, e) }, init: function (t, e) { this._cipher = t, this._iv = e } })).extend(); h.Encryptor = h.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize; f.call(this, t, e, i), r.encryptBlock(t, e), this._prevBlock = t.slice(e, e + i) } }), h.Decryptor = h.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = t.slice(e, e + i); r.decryptBlock(t, e), f.call(this, t, e, i), this._prevBlock = n } }), a = a.CBC = h, h = (d.pad = {}).Pkcs7 = { pad: function (t, e) { for (var r, n = (r = (r = 4 * e) - t.sigBytes % r) << 24 | r << 16 | r << 8 | r, o = [], s = 0; s < r; s += 4) o.push(n); r = i.create(o, r), t.concat(r) }, unpad: function (t) { t.sigBytes -= 255 & t.words[t.sigBytes - 1 >>> 2] } }, e.BlockCipher = c.extend({ cfg: c.cfg.extend({ mode: a, padding: h }), reset: function () { c.reset.call(this); var t = (e = this.cfg).iv, e = e.mode; if (this._xformMode == this._ENC_XFORM_MODE) var r = e.createEncryptor; else r = e.createDecryptor, this._minBufferSize = 1; this._mode = r.call(e, this, t && t.words) }, _doProcessBlock: function (t, e) { this._mode.processBlock(t, e) }, _doFinalize: function () { var t = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { t.pad(this._data, this.blockSize); var e = this._process(!0) } else e = this._process(!0), t.unpad(e); return e }, blockSize: 4 }); var u = e.CipherParams = r.extend({ init: function (t) { this.mixIn(t) }, toString: function (t) { return (t || this.formatter).stringify(this) } }), p = (a = (d.format = {}).OpenSSL = { stringify: function (t) { var e = t.ciphertext; return ((t = t.salt) ? i.create([1398893684, 1701076831]).concat(t).concat(e) : e).toString(o) }, parse: function (t) { var e = (t = o.parse(t)).words; if (1398893684 == e[0] && 1701076831 == e[1]) { var r = i.create(e.slice(2, 4)); e.splice(0, 4), t.sigBytes -= 16 } return u.create({ ciphertext: t, salt: r }) } }, e.SerializableCipher = r.extend({ cfg: r.extend({ format: a }), encrypt: function (t, e, r, i) { i = this.cfg.extend(i); var n = t.createEncryptor(r, i); return e = n.finalize(e), n = n.cfg, u.create({ ciphertext: e, key: r, iv: n.iv, algorithm: t, mode: n.mode, padding: n.padding, blockSize: t.blockSize, formatter: i.format }) }, decrypt: function (t, e, r, i) { return i = this.cfg.extend(i), e = this._parse(e, i.format), t.createDecryptor(r, i).finalize(e.ciphertext) }, _parse: function (t, e) { return "string" == typeof t ? e.parse(t, this) : t } })), d = (d.kdf = {}).OpenSSL = { execute: function (t, e, r, n) { return n || (n = i.random(8)), t = s.create({ keySize: e + r }).compute(t, n), r = i.create(t.words.slice(e), 4 * r), t.sigBytes = 4 * e, u.create({ key: t, iv: r, salt: n }) } }, l = e.PasswordBasedCipher = p.extend({ cfg: p.cfg.extend({ kdf: d }), encrypt: function (t, e, r, i) { return r = (i = this.cfg.extend(i)).kdf.execute(r, t.keySize, t.ivSize), i.iv = r.iv, (t = p.encrypt.call(this, t, e, r.key, i)).mixIn(r), t }, decrypt: function (t, e, r, i) { return i = this.cfg.extend(i), e = this._parse(e, i.format), r = i.kdf.execute(r, t.keySize, t.ivSize, e.salt), i.iv = r.iv, p.decrypt.call(this, t, e, r.key, i) } }) } (), function () { for (var t = CryptoJS, e = t.lib.BlockCipher, r = t.algo, i = [], n = [], o = [], s = [], c = [], a = [], f = [], h = [], u = [], p = [], d = [], l = 0; 256 > l; l++) d[l] = 128 > l ? l << 1 : l << 1 ^ 283; var y = 0, _ = 0; for (l = 0; 256 > l; l++) { var v = (v = _ ^ _ << 1 ^ _ << 2 ^ _ << 3 ^ _ << 4) >>> 8 ^ 255 & v ^ 99; i[y] = v, n[v] = y; var g = d[y], B = d[g], x = d[B], S = 257 * d[v] ^ 16843008 * v; o[y] = S << 24 | S >>> 8, s[y] = S << 16 | S >>> 16, c[y] = S << 8 | S >>> 24, a[y] = S, S = 16843009 * x ^ 65537 * B ^ 257 * g ^ 16843008 * y, f[v] = S << 24 | S >>> 8, h[v] = S << 16 | S >>> 16, u[v] = S << 8 | S >>> 24, p[v] = S, y ? (y = g ^ d[d[d[x ^ g]]], _ ^= d[d[_]]) : y = _ = 1 } var k = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]; r = r.AES = e.extend({ _doReset: function () { for (var t = (r = this._key).words, e = r.sigBytes / 4, r = 4 * ((this._nRounds = e + 6) + 1), n = this._keySchedule = [], o = 0; o < r; o++) if (o < e) n[o] = t[o]; else { var s = n[o - 1]; o % e ? 6 < e && 4 == o % e && (s = i[s >>> 24] << 24 | i[s >>> 16 & 255] << 16 | i[s >>> 8 & 255] << 8 | i[255 & s]) : (s = i[(s = s << 8 | s >>> 24) >>> 24] << 24 | i[s >>> 16 & 255] << 16 | i[s >>> 8 & 255] << 8 | i[255 & s], s ^= k[o / e | 0] << 24), n[o] = n[o - e] ^ s } for (t = this._invKeySchedule = [], e = 0; e < r; e++) o = r - e, s = e % 4 ? n[o] : n[o - 4], t[e] = 4 > e || 4 >= o ? s : f[i[s >>> 24]] ^ h[i[s >>> 16 & 255]] ^ u[i[s >>> 8 & 255]] ^ p[i[255 & s]] }, encryptBlock: function (t, e) { this._doCryptBlock(t, e, this._keySchedule, o, s, c, a, i) }, decryptBlock: function (t, e) { var r = t[e + 1]; t[e + 1] = t[e + 3], t[e + 3] = r, this._doCryptBlock(t, e, this._invKeySchedule, f, h, u, p, n), r = t[e + 1], t[e + 1] = t[e + 3], t[e + 3] = r }, _doCryptBlock: function (t, e, r, i, n, o, s, c) { for (var a = this._nRounds, f = t[e] ^ r[0], h = t[e + 1] ^ r[1], u = t[e + 2] ^ r[2], p = t[e + 3] ^ r[3], d = 4, l = 1; l < a; l++) { var y = i[f >>> 24] ^ n[h >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & p] ^ r[d++], _ = i[h >>> 24] ^ n[u >>> 16 & 255] ^ o[p >>> 8 & 255] ^ s[255 & f] ^ r[d++], v = i[u >>> 24] ^ n[p >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & h] ^ r[d++]; p = i[p >>> 24] ^ n[f >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & u] ^ r[d++], f = y, h = _, u = v } y = (c[f >>> 24] << 24 | c[h >>> 16 & 255] << 16 | c[u >>> 8 & 255] << 8 | c[255 & p]) ^ r[d++], _ = (c[h >>> 24] << 24 | c[u >>> 16 & 255] << 16 | c[p >>> 8 & 255] << 8 | c[255 & f]) ^ r[d++], v = (c[u >>> 24] << 24 | c[p >>> 16 & 255] << 16 | c[f >>> 8 & 255] << 8 | c[255 & h]) ^ r[d++], p = (c[p >>> 24] << 24 | c[f >>> 16 & 255] << 16 | c[h >>> 8 & 255] << 8 | c[255 & u]) ^ r[d++], t[e] = y, t[e + 1] = _, t[e + 2] = v, t[e + 3] = p }, keySize: 8 }); t.AES = e._createHelper(r) } ();
global.TRANS_ENCRYPT = function(data) { return CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(gvar[14][0]), { iv: CryptoJS.enc.Utf8.parse(gvar[14][1]), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(); }
global.TRANS_DECRYPT = function(data) { return CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(gvar[14][0]), { iv: CryptoJS.enc.Utf8.parse(gvar[14][1]), padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8); }
export var mimtyp = { "jpg": "image/jpeg", "gif": "image/gif", "png": "image/png", "jpeg": "image/jpeg", "mp4": "video/mp4", "m4v": "video/mp4", "webm": "video/webm", "ogv": "video/ogg", "mpeg": "video/mpeg", "mp1": "audio/mpeg", "mp2": "audio/mpeg", "mp3": "audio/mpeg", "mpg": "audio/mpeg", "wav": "audio/wav", "m4a": "audio/mp4", "oga": "audio/ogg", "ogg": "audio/ogg", "txt": "text/plain", "doc": "application/msword", "rtf": "application/rtf", "htm": "text/html", "pdf": "application/pdf", "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "html": "text/html", "csv": "text/csv", "xls": "application/vnd.ms-excel", "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ppt": "application/vnd.ms-powerpoint", "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptm": "application/vnd.ms-powerpoint.presentation.macroenabled.12" };
function is(x, y) { if (x === y) return x !== 0 || y !== 0 || 1 / x === 1 / y; else return x !== x && y !== y; }
export function isequal(objA, objB) {
    if (is(objA, objB)) return true;
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) return false;
    const keysA = Object.keys(objA), keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (let i = 0; i < keysA.length; i++) if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) return false;
    return true;
}
export function isempty(obj) { return !obj || (typeof obj === 'object' && Object.keys(obj).length == 0); }
export function isnull(obj) { return obj === '' || obj === null || obj === undefined; }
export function capitalize(obj) { if (obj) return obj.charAt(0).toUpperCase() + obj.slice(1); else return ''; }
export function sanitizeinput(str, notrim) {
    var istr = str.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, '').replace(/"/g, '”').replace(/'/g, '’');
    return notrim ? istr : istr.trim();
}
export function hexToRgb(hex) {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        let c = hex.substring(1).split('');
        if (c.length == 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]]; c = `0x${c.join('')}`;
        return [parseFloat((c >> 16) & 255), parseFloat((c >> 8) & 255), parseFloat(c & 255)];
    }
}
export function interpolate(x, [minX, maxX], [minY, maxY]) { return ((maxX - x)*minY + (x - minX)*maxY) / (maxX - minX); }
export function match(condsAndResPairs, offset = 0) {
  if (condsAndResPairs.length - offset === 1) return condsAndResPairs[offset];
  else if (condsAndResPairs.length - offset === 0) return undefined;
  return Animated.cond(condsAndResPairs[offset], condsAndResPairs[offset + 1], match(condsAndResPairs, offset + 2));
}
export function colorHSV(h, s, v, a) {
  const {cond, add, multiply, lessThan, abs, modulo, round, divide, sub, color} = Animated;
  const c = multiply(v, s), hh = divide(h, 60), x = multiply(c, sub(1, abs(sub(modulo(hh, 2), 1)))), m = sub(v, c);
  const colorRGB = (r, g, b) => color(round(multiply(255, add(r, m))), round(multiply(255, add(g, m))), round(multiply(255, add(b, m))), a);
  return match([
    lessThan(h, 60),
    colorRGB(c, x, 0),
    lessThan(h, 120),
    colorRGB(x, c, 0),
    lessThan(h, 180),
    colorRGB(0, c, x),
    lessThan(h, 240),
    colorRGB(0, x, c),
    lessThan(h, 300),
    colorRGB(x, 0, c),
    colorRGB(c, 0, x)
  ]);
}
export function strim(str, chars) {
    return str.replace(new RegExp("^[" + chars + "]+|[" + chars + "]+$", "gi"), '');
}
export function arconvertdigit0(ival) {
    if (gvar[2][0][0] == 'ar' && ival) {
        ival = ival.toString();
        var tempv = ival.replace(ival.match(/[0-9]*\.[0-9]+/), function (txt) { return txt.replace(/\./g, ','); });
        tempv = tempv.replace(/\d/g, function (v) { return String.fromCharCode(v.charCodeAt(0) + 1584); });
        return tempv;
    } else return ival;
}
export function arconvertdigit(ival) {
    if (ival) {
        var tempv = ival.replace(ival.match(/[0-9]*\.[0-9]+/), function (txt) { return txt.replace(/\./g, ','); });
        tempv = tempv.replace(/\d/g, function (v) { return String.fromCharCode(v.charCodeAt(0) + 1584); });
        return tempv;
    } else return ival;
}
export function leftPad(str, len, ch) {
    str = String(str); var i = -1;
    if (!ch && ch !== 0) ch = ' ';
    len = len - str.length;
    while (++i < len) str = ch + str;
    return str;
}
export function calage(idob) {
    var today = new Date(), birthDate = new Date(idob), age = today.getFullYear() - birthDate.getFullYear(), m = today.getMonth() - birthDate.getMonth();
    if (today.getDate() < birthDate.getDate()) m--; if (m < 0) { age--; m += 12; }
    return [age, m];
}
export function calbmi(oweight, oheight) {
    if (oweight && oheight) { oweight = oweight.replace(/\,/g, '.'); oheight = oheight.replace(/\,/g, '.'); if (!isNaN(oweight) && !isNaN(oheight)) return parseFloat(parseFloat(oweight / Math.pow(oheight / 100, 2)).toFixed(2)).toString(); else return ''; } else return '';
}
export function calavg(ival) {
    var arrlen = 0, oavg = 0;
    ival.map((value, j) => { value = value.replace(/\,/g, '.'); if (!isNaN(value)) { value = parseFloat(value); if (value >= 0) { oavg += parseFloat(value); arrlen++; } } });
    if (arrlen > 0) return parseFloat(parseFloat(oavg / arrlen).toFixed(2)).toString(); else return '';
}
export function checknum(ival, ttle, dv) {
    ival = ival.replace(/\,/g, '.'); if (isNaN(ival)) { mntst.show([[ttle + ': ' + gvar[2][6701], 2]]); return dv; } else return ival;
}
export function veriflogpwd(pvalue, ptitle) {
    var fltr = /^[\w@*#$&%.-]{4,}$/;
    if (pvalue != '') if (!fltr.test(pvalue)) return ptitle + ': ' + gvar[2][200]; else return ''; else return '';
}
export function verifemail(pvalue, ptitle) {
    var fltr = /\w+([\-\+\.]\w+)*@\w+([\-\.]\w+)*\.\w+([\-\.]\w+)*/;
    if (pvalue != '') if (!fltr.test(pvalue)) return ptitle + ': ' + gvar[2][5031] + '.'; else return ''; else return '';
}
export function verifpwd(pvalue, ptitle) {
    var fltr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (pvalue != '') if (!fltr.test(pvalue)) return ptitle + ': ' + gvar[2][23010]; else return ''; else return '';
}
export function verifpincode(pvalue, ptitle) {
    var fltr = /^\d{4}$/;
    if (pvalue != '') if (!fltr.test(pvalue)) return ptitle + ': ' + gvar[2][11700]; else return ''; else return '';
}
function verifalphanum(pvalue, ptitle, minnb) {
    var fltr, extmsg = '', nbt = '+';
    if (minnb) { extmsg = ' ' + gvar[2][3501] + ' ' + minnb + ' ' + gvar[2][3502] + '.'; nbt = '{' + minnb + ',}'; }
    fltr = new RegExp('^[a-zA-Z0-9-_]' + nbt + '$');
    if (pvalue != '') if (!fltr.test(pvalue)) return ptitle + ': ' + gvar[2][2012] + extmsg; else return ''; else return '';
}
function verifphone(pvalue, ptitle, dc) {
    var fltr = /^\+?\d{4,}$/;
    if (pvalue != '') if (!fltr.test(pvalue)) return ptitle + ': ' + gvar[2][2016];
    else {
        fltr = /^(\+|00)\d+$/; if (!fltr.test(pvalue) && dc != '') return ['+' + dc + pvalue.replace(/^0+/, '')]; else return '';
    } else return '';
}
function verifdate(pvalue, ptitle, txtmsg3, op) {
    if (pvalue != '') {
        var fltr = /^\d{4}\-(0?[1-9]|1[012])\-([012]?[1-9]|[12]0|3[01])$/, today = new Date(), odate = pvalue.split('-');
        today.setHours(0, 0, 0, 0); odate = new Date(odate[0], --odate[1], odate[2]);
        if (!fltr.test(pvalue)) return ptitle + ': ' + gvar[2][2017];
        else if (txtmsg3 && op && odate < today) return ptitle + ': ' + gvar[2][2019] + ' ' + gvar[2][11000];
        else if (txtmsg3 && !op && odate > today) return ptitle + ': ' + gvar[2][2019] + ' ' + gvar[2][2020];
        else return '';
    } else return '';
}
function verifdatetime(pvalue, ptitle, txtmsg3, op) {
    if (pvalue != '') {
        var fltr = /^\d{4}\-(0?[1-9]|1[012])\-([012]?[1-9]|[12]0|3[01])(\s([0-1]?[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])(:(0?[0-9]|[1-5][0-9]))?)?$/, today = new Date(), odate = pvalue.split(' '), tdt;
        today.setSeconds(0, 0); tdt = odate[0].split('-'); odate = odate[1].split(':'); odate = new Date(tdt[0], --tdt[1], tdt[2], odate[0], odate[1]);
        if (!fltr.test(pvalue)) return ptitle + ': ' + gvar[2][1200];
        else if (txtmsg3 && op && odate < today) return ptitle + ': ' + gvar[2][2019] + ' ' + gvar[2][11000];
        else if (txtmsg3 && !op && odate > today) return ptitle + ': ' + gvar[2][2019] + ' ' + gvar[2][2020];
        else return stddt(pvalue);
    } else return '';
}
function veriftime(pvalue, ptitle) {
    if (pvalue != '') {
        var fltr = /^([0-1]?[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])(:(0?[0-9]|[1-5][0-9]))?$/;
        if (!fltr.test(pvalue)) return ptitle + ': ' + gvar[2][18800]; else return stddt(pvalue);
    } else return '';
}
function stddt(pvalue) {
    var fltr, odate = pvalue.split(' '), ot = '';
    if (odate.length == 1) { pvalue = ''; odate = odate[0].split(':'); } else { pvalue = odate[0] + ' '; odate = odate[1].split(':'); }
    fltr = odate.length; for (i = 0; i < fltr; i++) ot += ':' + leftPad(odate[i], 2, '0'); return [pvalue + ot.substring(1)];
}
export function checkdata(rtn, fkey, okey, ptitle) {
    let csrn = crnscrn || dshscrn, rtnc =  csrn ? csrn.props.route.name : null, res, chk;
    if(rtn == rtnc) {
        chk = true; res = eval('lstpages["'+rtn+'"]['+scrnid[rtn][2]+'].' + okey);
        if(res !== undefined) chk = eval('lstpages["'+rtn+'"]['+scrnid[rtn][2]+'].' + okey + '!=this.state.' + okey);
        if(chk) {
            res = eval('verif' + fkey + '(this.state.' + okey + ', "' + ptitle + '")');
            if (res != '') mntst.show([[res, 2]]); return res;
        }
    }
}
export function checkeq(okey, ptitle, showt) {
    var res = eval('(!this.state.' + okey[0] + '&&!this.state.' + okey[1] + ')||this.state.' + okey[0] + '==this.state.' + okey[1]);
    if (!res) res = ptitle[0] + ' ' + gvar[2][2300] + ' ' + ptitle[1] + ' ' + gvar[2][109]; else res = '';
    if(showt) { if (res != '') mntst.show([[res, 2]]); } else return res;
}
export function cpuedt(withsec, noadd) {
    var puedt = new Date(); if (!noadd) puedt.setMinutes(puedt.getMinutes() + 15); return convert_dt_date(puedt, withsec);
}
export function convert_ts_date(ts, dtformat, withtime) {
    if (!isNaN(ts)) {
        var dateobj = new Date(ts), res;
        switch (dtformat) {
            case 1:
                res = i18n[gvar[2][0][0]].months[dateobj.getMonth()].substr(0, 3) + "-" + leftPad(dateobj.getDate(), 2, '0');
                break;
            case 2:
                res = convert_d_date(dateobj);
                break;
        }
        return res + (withtime ? " " + leftPad(dateobj.getHours(), 2, '0') + ":" + leftPad(dateobj.getMinutes(), 2, '0') : "");
    } else return "—";
}
export function convt_sdate(ts, withyear, withtime) { return moment(ts).tz(userarray.timezone).format('DD-MM' + (withyear ? '-YYYY' : '') + (withtime ? ' HH:mm' : '')); }
export function convert_d_date(dateobj) {
    if (dateobj && dateobj.toString() != '') return dateobj.getFullYear() + "-" + leftPad(dateobj.getMonth() + 1, 2, '0') + "-" + leftPad(dateobj.getDate(), 2, '0'); else return "—";
}
export function convert_dt_date(dateobj, withsec) {
    if (dateobj && dateobj.toString() != '')
        return dateobj.getFullYear() + "-" + leftPad(dateobj.getMonth() + 1, 2, '0') + "-" + leftPad(dateobj.getDate(), 2, '0') + " " + leftPad(dateobj.getHours(), 2, '0') + ":" + leftPad(dateobj.getMinutes(), 2, '0') + (withsec ? ":" + leftPad(dateobj.getSeconds(), 2, '0') : "");
    else return "—";
}
export function limitValue(value, labels) { for(index in labels) if(parseFloat(index) >= value) return labels[index]; return labels[index]; }
export function isview(urt, etab) { if (urt === undefined || urt == etab) return true; else return false; }
export function isinsert(urt) { if (urt && urt.indexOf('+') != -1) return true; else return false; }
export function isdelete(urt) { if (urt && urt.indexOf('-') != -1) return true; else return false; }
export function isupdate(urt) { if (urt && urt.indexOf('*') != -1) return true; else return false; }
export function isextra(urt) { if (urt && urt.indexOf('@') != -1) return true; else return false; }
export function disptext(idx,cnt,htm,ldngv,rfr,lfc) {
    if(!cnt) cnt=[[0,Object.keys(gvar[2][idx]).length]]; var arl=cnt.length; if(!htm) htm=""; for(j=0;j<arl;j++)if(Array.isArray(cnt[j])){for(i=cnt[j][0];i<cnt[j][1];i++)if(gvar[2][idx][i])htm+=gvar[2][idx][i];}else{if(gvar[2][idx][cnt[j]])htm+=gvar[2][idx][cnt[j]];}
    return [<WebView key={'de0'} ref={(ref)=>rfr.mnwv=ref} source={{baseUrl:gvar[1][0], html:'<html><head><style>html,body{margin:0;padding:0;width:100%;height:100%;scroll-behavior:smooth;background-color:#2f2e2e;color:#fff;font-family:Montserrat,Arial;font-size:'+dimsz[1]+'px;}h1,h2,h3,h4,h5,h6{text-transform:uppercase;margin-top:5vh;}</style><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div style="padding:0 5vw 2vh 5vw;">'+htm+'</div></body></html>'}} textZoom={100} startInLoadingState={true} renderLoading={()=><View style={[Stl.pzp, Stl.w100, { position: 'absolute', height: '100%' }]}>{ldngv}</View>} originWhitelist={['*']} allowFileAccess={true} allowFileAccessFromFileURLs={true} allowUniversalAccessFromFileURLs={true} mixedContentMode={"always"} javaScriptEnabled={true} domStorageEnabled={true} thirdPartyCookiesEnabled={true} allowUniversalAccessFromFileURLs={true} mediaPlaybackRequiresUserAction={false} androidHardwareAccelerationDisabled={false} allowsFullscreenVideo={true} allowsInlineMediaPlayback={true} style={{backgroundColor:'transparent',flex:1,flexGrow:1}} />,lfc];
}
export function tbi(svref) {
    let otbi = [];
    if(this[svref]) {
        if(this.state.si1 > 0 && this.state.si1 < (this.state.si9 - 20)) otbi.push(<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} key="a0" onPress={() => this[svref].scrollToEnd({ animated: true })} style={[Stl.inptclear, { bottom: dimsz[14]+sai[2], right: sai[1], padding: dimsz[4], opacity: Cnt.prps.layeropcty }]}><Icon3 name="arrow-down-circle" style={{ color: Cnt.clrs.lightbg, fontSize: dimsz[24] }} /></TouchableOpacity>);
        if(this.state.si1 < this.state.si9 && this.state.si1 > 20) otbi.push(<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} key="a1" onPress={() => this[svref].scrollToOffset({ animated: true, offset: 0 })} style={[Stl.inptclear, { bottom: dimsz[25]+dimsz[14]+sai[2], right: sai[1], padding: dimsz[4], opacity: Cnt.prps.layeropcty }]}><Icon3 name="arrow-up-circle" style={{ color: Cnt.clrs.lightbg, fontSize: dimsz[24] }} /></TouchableOpacity>);
    }
    return otbi;
}
export function fcs() {
    if (Platform.OS == 'android') { if (appstt[1] == 1) { appstt[2] = ks; this.setState({ display: this.state.display }); } }
}
export function focusinput(svref, idx) {
    this.fcs(); this.kbmr = setTimeout(() => { if(this.inputs[idx]) this[svref].getScrollResponder().scrollResponderScrollNativeHandleToKeyboard(findNodeHandle(this.inputs[idx]), dmns.hk, true); }, 400);
}
export function cntscrl(width, height) {
    let sobj = {};
    if (Math.abs(height - this.state.si7) > 10) {
        sobj.si6 = width; sobj.si7 = height; sobj.si8 = width - this.state.si2; sobj.si9 = height - this.state.si3;
        if (this.isloaded) this.setState(sobj);
    }
}
export function lytscrl(e, mdl) {
    UIManager.measure(findNodeHandle(mdl || this.mnscrlvw), (sx, sy, swidth, sheight, spageX, spageY) => {
        let sobj = {}; sobj.si2 = swidth; sobj.si3 = sheight; sobj.si8 = this.state.si6 - swidth; sobj.si9 = this.state.si7 - sheight;
        if (!mdl) scrnid[this.props.route.name][11] = spageY; sobj.svo = spageY; if (this.isloaded) this.setState(sobj);
    });
}
export function hdlscrl(e) {
    let sobj = {};
    if (Math.abs(e.nativeEvent.contentOffset.y - this.state.si1) > 10) {
        sobj.si0 = e.nativeEvent.contentOffset.x; sobj.si1 = e.nativeEvent.contentOffset.y; sobj.si4 = sobj.si0 > 0 && sobj.si0 > this.state.si0 ? 'right' : 'left'; sobj.si5 = sobj.si1 > 0 && sobj.si1 > this.state.si1 ? 'down' : 'up';
        if (this.isloaded) this.setState(sobj);
    }
}
export function getlngcd() {
    var syslang = Platform.OS == 'android' ? NativeModules.I18nManager.localeIdentifier : NativeModules.SettingsManager.settings.AppleLocale;
    if (syslang != 'en' && syslang != 'fr' && syslang != 'it' && syslang != 'ru' && syslang != 'ar' && syslang != 'es' && syslang != 'am') syslang = 'en';
    return syslang.substring(0, 2);
}
export function sgp() {
    if(!gvar[13]) gvar[13]={ 65: 10000, 34: { en: 'English', fr: 'Français', es: 'Español', it: 'Italiano', ru: 'Pусский', am: 'հայերեն', ar: 'العربية' } };
}
export function wdim(nost) {
    var tempv = Dimensions.get('window');
    dmns = { width: tempv.width, height: tempv.height, lrgs: tempv.width > tempv.height, w: tempv.width / 110, w50: tempv.width * 0.5, w75: tempv.width * 0.75, w60: tempv.width * 0.6, w30: tempv.width * 0.3, w1: tempv.width * 0.25, w0: tempv.width * 0.1, w2: tempv.width * 0.35, w3: tempv.width / 13, w4: tempv.width * 0.2, w5: tempv.width / 15, w6: tempv.width / 16, w7: tempv.width / 17, w8: tempv.width * 0.4, w9: tempv.width * 0.4, w10: tempv.width / 20, w11: tempv.width / 21, w12: tempv.width / 22, w13: tempv.width / 23, w14: tempv.width / 24, w15: tempv.width / 25, w16: tempv.width / 30, w17: tempv.width / 40, w18: tempv.width / 45, h: tempv.height / 110, h50: tempv.height * 0.5, h75: tempv.height * 0.75, h60: tempv.height * 0.6, h25: tempv.height * 0.24, hk: tempv.height / 6, h0: tempv.height * 0.1, h1: tempv.height / 13, h2: tempv.height / 14, h3: tempv.height / 16, h4: tempv.height * 0.17, h5: tempv.height / 20, h6: tempv.height / 22, h7: tempv.height / 24, h8: tempv.height / 26, h10: tempv.height / 30, h11: tempv.height / 32, h12: tempv.height / 34, h13: tempv.height / 36, h14: tempv.height / 38, h15: tempv.height * 0.2, h16: tempv.height / 42, h17: tempv.height / 57, h18: tempv.height * 0.3 };
    tempv = StatusBar.currentHeight || 22; stsbrht = 0; sai = [0, 0, 0, 0, tempv]; if (Platform.OS === 'ios') { if(dmns.width >= 812 || dmns.height >= 812) sai = dmns.lrgs ? [20, 44, 20, 44, tempv] : [44, 0, 34, 0, tempv]; inpttyp = 'default'; } else { inpttyp = 'visible-password'; if (Platform.Version >= 21) stsbrht = tempv; }
    dimsz = [1.5 * dmns.w + 1.5 * dmns.h, , , , , , 1.5 * dmns.w + 2.5 * dmns.h, , , , , , , , , dmns.w17 + (dmns.lrgs ? dmns.h8 : dmns.h6)]; dimsz[1] = 0.9 * dimsz[0]; dimsz[2] = 0.8 * dimsz[0]; dimsz[3] = 0.7 * dimsz[0]; dimsz[4] = 0.5 * dimsz[0]; dimsz[5] = 0.4 * dimsz[0]; dimsz[7] = 3 * dimsz[6]; dimsz[8] = 1.5 * dimsz[6]; dimsz[9] = 1.9 * dimsz[6]; dimsz[10] = 0.85 * dimsz[6]; dimsz[11] = 3.8 * dimsz[6]; dimsz[12] = 1.4 * dimsz[6]; dimsz[13] = 0.75 * dimsz[6]; dimsz[14] = 1.7 * dimsz[6]; dimsz[16] = (dimsz[15] - dimsz[0]) / 2; dimsz[17] = 1.3 * dimsz[6]; dimsz[18] = 2.6 * dimsz[6]; dimsz[19] = 0.3 * dimsz[0]; dimsz[20] = 12 * dmns.w + 7 * dmns.h; dimsz[21] = 0.1 * dimsz[20]; dimsz[22] = 0.5 * dimsz[6]; dimsz[23] = 0.95 * dimsz[6]; dimsz[24] = 1.15 * dimsz[6]; dimsz[25] = 1.24 * dimsz[6]; dimsz[26] = dmns.h3 + dmns.w18; dimsz[27] = [Stl.enotif, Stl.btmsec, Stl.smalltext, Stl.nttext, { minWidth: dimsz[6], height: dimsz[6], lineHeight: dimsz[6], borderRadius: dimsz[22], fontSize: dimsz[2], overflow: 'hidden' }];
    if (nost == 1) { userarray = {}; lstpages = {}; sgp(); scrnid = { 'notscrn': [], 'Home': [null, null, null, null, [{}], null, null, null, null, null, null, null, null, [null, null, null, null, 20], null], 'Login': [null, null, null, null, [{}], null, null, null, null, null, null, null, null, [null, null, null, null, 0], null], 'Dashboard': [0, [[4800,4500], [4801,4501]], 0, null, [{}, '', 0, null, null, [['8,18,19', '8,18,19,38,48,49,68,78,79'], ['8,18,19', '8,18,19,38,48,49,68,78,79']], 0, [['Questions', 57, 0, '19'], ['Tasks', 60, 2, '18'], ['Instructions', 55, 0, '8'], ['Appointments', 104, 0, '104']], [null, null]], [], null, null, 'Dashboard', [], [], 0, ['', ''], [null, null, null, null, 7], ['', ''], null], 'Appointments': [0, [[117,117], [118,118]], 0, null, [{}, null, 0, null, null, null, 0, null, [null, null]], [], null, null, 'Appointments', [], [], 0, ['Id_plan', 'Id_plan'], [null, null, null, null, 104], ['Id_plan', 'Id_plan'], null], 'Notifications': [0, [[4503,4503], [4504,4504]], 0, null, [{}, null, 0, null, null, null, 0, null, [null, null]], [], null, null, 'Notifications', [], [], 0, ['Id_not', 'Id_not'], [null, null, null, null, 105], ['Id_not', 'Id_not'], null], 'Messenger': [0, [[]], 0, null, [{}, null, 0, null, null, null, 0, null, [null]], ['Chatroom'], null, null, 'Messenger', [], [], 0, ['Id_msg'], [null, null, null, null, 103], ['Id_target'], null], 'Chatroom': [0, [[]], 0, null, [{}, null, 0, null, null, null, 0, null, [null]], [], null, null, 'Messenger', [], [], 0, ['Id_msg'], [null, null, null, null, 21], ['Id_msg'], null], 'Details': [0, [[3800,3800], [10100,10100]], 0, null, [{}, null, 0, null, null, null, 0, [['Profile', 9501, '2'], ['Chatroom', 103017, '1']], [null]], ['Analytics'], null, null, 'Dashboard', [{'140': [14000], '128': [12800], '129': [12900], '143': [14300], '141': [14100], '139': [13900], '137': [13700], '54': [5400], '61': [6100], '55': [5500], '60': [6000], '56': [5600], '57': [5700], '38': [3800], 'nv': [54030], 'qst': [54031]}, []], [null, []], 0, ['', ''], [null, null, null, null, 25], ['', ''], null], 'Questions': [0, [[15200,15200]], 0, null, [{}, 7, 7, 19, 49, null, 0, null, [null]], [], null, 0, 'Dashboard', [], [], 0, ['qdate'], [null, null, null, null, 57], ['idqr'], null], 'Tasks': [0, [[15200,15200]], 0, null, [{}, 6, 7, 18, 48, null, 0, null, [null]], [], null, 0, 'Dashboard', [], [], 0, ['qdate'], [null, null, null, null, 60], ['idqr'], null], 'Instructions': [0, [[15100,15100], [15200,15200], [15300,15300], [15400,15400]], 0, null, [{}, 8, 7, 8, 38, null, 0, null, [null, null, null, null]], [], null, null, 'Dashboard', [], [], 0, ['qdate', 'qdate', 'qdate', 'qdate'], [null, null, null, null, 55], ['dlid', 'dlid', 'dlid', 'dlid'], null], 'Documentation': [0, [['']], 0, null, [{}, null, null, null, null, null, 0, null, [null, null, null]], [], null, null, 'Dashboard', [], [], 0, ['', '', ''], [null, null, null, null, 22], ['', '', ''], null], 'Caregivers': [0, [[]], 0, null, [{}, null, 0, null, null, null, 0, null, [null]], [], null, null, 'Dashboard', [], [], 0, ['pdate', 'pdate'], [null, null, null, null, 61], ['id', 'id'], null], 'Reminders': [0, [[18100,18100], [18200,18200]], 0, null, [{}, null, 0, null, null, null, 0, null, [null, null, null]], [], null, null, 'Dashboard', [], [], 0, ['ids', 'ids'], [null, null, null, null, 56], ['ids', 'ids'], null], 'Analytics': [0, [[38020,38020,"stats-chart"], [38018,38018,"stats-chart"]], 0, null, [{}, null, 0, null, null, null, 0, null, [null, null, null]], [], null, null, 'Dashboard', [], [], 0, ['adate', 'rdate'], [null, null, null, null, 38], ['adate', 'idquest'], null], 'Profile': [0, [[12502,12502], [12504,12504], [125034,125034]], 0, null, [{}, null, 0, null, null, null, 0, null, [null, null, null], [true, true, true]], [], null, null, 'Dashboard', [], [1,1], 0, ['', '', ''], [null, null, null, null, 23], ['', '', ''], null], 'Legal': [0, [[]], 0, null, [{}, null, 0, null, null, null, 0, null, [null, null, null]], [], null, null, 'Dashboard', [], [1], 0, ['', '', ''], [null, null, null, null, 24], null] }; } else { if (this.isloaded) { var sobj = { }; this.setState(sobj, adjpage); } if(mnldr.getst() == 'flex') mnldr.setState({a: !mnldr.state.a}); if(wstream) mnwcl.setState({a: !mnwcl.state.a}); }
    // scrnid['notscrn']:   on receive and open notification, to redirect to specific screen/sub-screen
    // scrnid['Messenger'],    [0]: notification count,    [1]: list of tabs in array where each tab (flkey) is an array of attributes,    [2]: last opened tab index (flkey),    [3]: indicator to refresh screen onfocus,    [4]: [0]=>params to be used on receive/open notification to perform any update, [1]=>category of notification, [2]=>index of scrnid (0, 7) for notification count, [3]=>type of notification, [4]=>type of wall information, [5]=>array of notification types (ntype at index [0]) and wall types (wtype at index [1]) for each tab, [6]=>notification count to be subtracted later on screen blur/focus, [7]=>tabs to be displayed besides main tab to navigate to different screens, [8]=>indicator for each tab (flkey) if 'mstate' attribute should be updated from 'tstate', [9]=>indicator for each tab (flkey) to enable/disable editing of data,    [5]: list of stacked/child screens,    [6]: back screen,    [7]: count of unreplied questions, undone tasks, unread instructions...,    [8]: parent route,    [9]: sub-sections for each tab,    [10]: indicator for each tab if it should not be loaded using loadlpg,    [11]: top offset of flatlist/scrollview,    [12]: default sort for each tab,    [13]: [0] extra parameter for different purposes to update the screen [1] if is 1 it serves to hide the status bar [2] status bar style [3] querystring parameter to send in fetch of loadlpg [4] id of screen to be used in activity Table,    [14]: id/primary key for each tab,    [15]: indicator to open a specific sub-section upon navigation/redirection/opennotif
    // fload key (flkey) in state   0: none, 1: loading, 2: loading more, 3: searching, 4: refreshing
}
export function adjpage(nors) {
    let csrn = crnscrn || dshscrn; if (csrn) {
        setTimeout(async () => {
            if (csrn.isloaded) {
                if (csrn.mnscrlvw && csrn.mnscrlvw.props && csrn.mnscrlvw.props.horizontal && csrn.state.data && csrn.state.data.length && csrn.state.qidx > 0) setTimeout(() => { try { csrn.mnscrlvw.scrollToIndex({ index: csrn.state.qidx - 1, animated: true }); } catch (error) { } }, 0);
            }
            if(!nors) {
                if(mndrw && mndrw.getst() == 'flex') mndrw.forceUpdate(); if(mnldr && mnldr.getst() == 'flex') mnldr.forceUpdate(); if(mnwcl && mnwcl.getst() == 'flex') mnwcl.forceUpdate();
                //if (!isempty(peerconn)) { if(!isaudio) if (callData.initid == userarray.id) await vcstart(2); else sserver({ id: userarray.id, type: 'vcstart', conid: conid, users: [callData.tid] }); }
                if(mnlst && mnlst.getst() == 'flex') mnlst.showclose('flex', mnlst.state.idx, null, mnlst.state.lid, mnlst.state.indx, mnlst.state.okey);
            }
        }, 200); if(csrn.props.route.name != 'Login') lstactv = new Date();
    }
}
export function cltf() {
    RNFB.session('appsess').list().map((tempv) => RNFB.session('appsess').remove(tempv)); ImagePicker.clean().then(() => { }).catch((error) => { });
}
export function appfile(resp) {
    var tempv = resp.path.replace('file://', ''); RNFB.session('appsess').add(tempv); if (tempv.indexOf('-compressed') == -1) { tempv = tempv.split('.'); RNFB.session('appsess').add(tempv[0] + '-compressed.' + tempv[1]); } else RNFB.session('appsess').add(tempv.replace('-compressed', ''));
}
export function treatfile(resp, tempv, ouid, idx) {
    var rtn = this.props.route.name; appfile(resp);
    switch (parseInt(tempv)) {
        case 1:
            this.chgti(idx, [['photouri', resp.path], ['phototype', resp.mime]], null, null, null, null, () => this.fscan(idx));
            break;
        default:
            var sobj = { photouri: resp.path, phototype: resp.mime }; if (rtn == 'Chatroom') sobj['reqfld'] = {};
            if (this.isloaded) this.setState(sobj, this.fscan);
    }
}
export function fscan(idx) {
    /*var fdata = new FormData(), robj, sobj = idx != null ? this.state.data.slice(0)[idx] : Object.assign({}, this.state), objid = 'ufile', fname, tempv;
    fdata.append('fct', 'fscan'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('inpt', objid); tempv = sobj.photouri.split('/'); fname = tempv[tempv.length - 1]; fdata.append(objid, { uri: sobj.photouri, name: fname, type: sobj.phototype });
    fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata, headers: Platform.OS === 'ios' ? { 'Content-Type': 'multipart/form-data' } : {} })
    .then((resp) => resp.json())
    .then((data) => {
        if(idx != null) {
            robj = this.state.data.slice(0); sobj = robj[idx]; tempv = sobj.photouri.split('/');
            if (fname == tempv[tempv.length - 1]) if (data) { mntst.show([[gvar[2][6302], 2]]); robj[idx].photouri = null; robj[idx].phototype = null;
            if (this.isloaded) this.setState({ data: robj }); delete this.pass; } else { this.pass = 1; }
          }
          else {
            robj = Object.assign({}, this.state); tempv = robj.photouri.split('/');
            if (fname == tempv[tempv.length - 1]) if (data) { mntst.show([[gvar[2][6302], 2]]); robj.photouri = null; robj.phototype = null;
            if (this.isloaded) this.setState(robj); delete this.pass; } else { this.pass = 1; }
          }
      }).catch((error) => { });*/
}
export function invitevc() {
    mntst.show([[gvar[2][6600], 1, 1]], -1, 1);
    var fdata = new FormData(), svalue, photo, cpicon, uvalue, idconvpool, Id_obj, Id_login = fndtrgt(scrnid['Chatroom'][4][0], 7);
    if (scrnid['Chatroom'][4][0].id.substr(0, 2) == 'cp') { svalue = scrnid['Chatroom'][4][0].cpname; photo = ''; cpicon = scrnid['Chatroom'][4][0].cpicon; uvalue = userarray.value; idconvpool = scrnid['Chatroom'][4][0].idconvpool; Id_obj = scrnid['Chatroom'][4][0].id; } else { svalue = userarray.value; photo = userarray.photo; cpicon = ''; uvalue = scrnid['Chatroom'][4][0].value; idconvpool = ''; Id_obj = vctab; } fdata.append('utoken', userarray.utoken); fdata.append('fct', 'pnotif'); fdata.append('alrtmails', userarray.alrtmails); fdata.append('infomails', userarray.infomails); fdata.append('admnmails', userarray.admnmails); fdata.append('alrtids', userarray.alrtids); fdata.append('infoids', userarray.infoids); fdata.append('admnids', userarray.admnids); fdata.append('ntext', uvalue + ' ' + gvar[2][95030]); fdata.append('atab', vctab); fdata.append('ntype', 20); fdata.append('idconvpool', idconvpool); fdata.append('uvalue', uvalue);
    fetch(gvar[1][0] + gvar[1][5] + '?timezone=' + userarray.timezone + '&smode=,1,&Id_login=' + Id_login + '&Id_sender=' + userarray.id + '&sId_typeuser=' + userarray.Id_typeuser + '&svalue=' + svalue + '&photo=' + photo + '&cpicon=' + cpicon + '&minfo=' + uvalue + '&Id_obj=' + Id_obj, { method: 'POST', timeout: gvar[13][65], body: fdata }).then((resp) => resp.json()).then((pdta) => { sserver({ id: userarray.id, type: 'notif', conid: conid, users: pdta[6].split(','), data: { nid: pdta[2], idreceiver: pdta[6], id: userarray.id, Id_typeuser: userarray.id.Id_typeuser, value: svalue, photo: photo, cpicon: cpicon, minfo: uvalue, date: pdta[3], mtext: pdta[7], mfile: '', ntype: 20, idconvpool: idconvpool, cmplct: '', webconf: '', status: '', wbicon: '', wcicon: '', wid: pdta[5][0][0], wdate1: pdta[5][0][1], wdate2: pdta[5][0][2], wdate3: pdta[5][0][3], winfo1: pdta[5][0][4], Id_obj: pdta[5][0][5] || Id_obj, winfo3: pdta[5][0][6], wtype: pdta[5][0][7], wobj: pdta[5][0][8], wmedia: pdta[5][0][9]} }); if(pdta[0] == -1) mntst.show([[gvar[2][95034], 2]]); else if(pdta[1]) mntst.show(pdta[1]); else mntst.show([[gvar[2][95033], 1]]); }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); });
}
export function gtmw() { dash = !this.state.dash; LayoutAnimation.easeInEaseOut(); this.setState({ dash }); }
export function renderhead(data) {
    var rtn = this.props.route.name, lftsd = [], rgtsd = [], olst = '', eicn, icstl, cbfo, cbf0 = () => { if (this.mnscrlvw) try { this.mnscrlvw.scrollToOffset({ offset: 0, animated: true }); } catch (error) { try { this.mnscrlvw.scrollTo({ y: 0, animated: true }); } catch (error) { } } else if (this.mnwv) try { this.mnwv.injectJavaScript('window.scroll({top:0,behavior:\"smooth\"});'); } catch (error) { } }, urt;
    switch (rtn) {
        case 'Login':
            let alwdth = appstt[1] * (this.state.alwdth || dmns.h3), ttle, icnm;
            if(this.state.e29 == 'flex') { ttle = data[2]; icnm = "close"; } else { ttle = data[1]; icnm = "key"; }
            return (
                <View style={[Stl.itmhdiv, { paddingTop: appstt[1] * stsbrht, paddingBottom: appstt[1] * dimsz[0] }]}>
                    <View style={[Stl.bkdiv, { width: '15%' }]}><View style={{ paddingHorizontal: dimsz[0], paddingVertical: appstt[1] * dmns.h }}><Image source={aplogo} style={[Stl.dbrd, { height: alwdth, width: alwdth }]} onLoad={(value) => this.setState({ alwdth: dmns.h3 * value.nativeEvent.source.width / value.nativeEvent.source.height })} /></View></View>
                    <View style={{flex:1}}><Text style={[Stl.txts1, Stl.tabtxt, { fontSize: appstt[1] * dimsz[6], paddingVertical: appstt[1] * dimsz[2] }]}>{ttle}</Text></View>
                    <View style={[Stl.srdiv, { width: '15%' }]}>{gvar[0]?<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => { if(!this.logclick) { let sobj = {}; if(this.state.e29 == 'flex') { sobj.e29 = 'none'; sobj.pjid = gvar[0]; } else { sobj.e29 = 'flex'; } LayoutAnimation.easeInEaseOut(); this.setState(sobj); } }} style={{ paddingHorizontal: dimsz[2], paddingVertical: appstt[1] * dimsz[2] }}><Icon3 name={icnm} style={[Stl.uicon, { fontSize: appstt[1] * dimsz[12] }]} /></TouchableOpacity>:null}</View>
                </View>
            );
            break;
            case 'Home':
                return (
                    <View style={[Stl.itmhdiv, { paddingTop: appstt[1] * stsbrht, paddingBottom: appstt[1] * dimsz[0] }]}>
                        <View style={[Stl.bkdiv, { width: '15%' }]}></View>
                        <View style={{flex:1}}><Text style={[Stl.txts1, Stl.tabtxt, { fontSize: appstt[1] * dimsz[6], paddingVertical: appstt[1] * dimsz[2] }]}>{data[1]}</Text></View>
                        <View style={[Stl.srdiv, { width: '15%' }]}></View>
                    </View>
                );
                break;
        case 'Chatroom':
            var ovalue = scrnid[rtn][4][0].cpname || scrnid[rtn][4][0].value, tstl, urt = useright.find(function (et) { return et.match(new RegExp('^[\*\@\+\-]*103$', 'i')) });
            if (isextra(urt)) {
                data[1] = ovalue;
                if (this.state.ostts == 1) {
                    var cbf1, cbf2;
                    if(isempty(peerconn)) { icstl = Stl.lbicon; cbf1 = () => callhangup('video'); cbf2 = () => callhangup('audio'); } else { icstl = Stl.dsbicon; cbf1 = cbf2 = () => { }; } tstl = Stl.lgricon; olst = gvar[2][95026]; eicn = <Icon3 name="checkmark-circle" style={[tstl, { fontSize: dimsz[13], paddingEnd: dimsz[4] }]} />;
                    rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={cbf1} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="videocam" style={[icstl, { fontSize: appstt[1] * dimsz[12] }]} /></TouchableOpacity>, <TouchableOpacity key={1} activeOpacity={Cnt.prps.tchblopcty} onPress={cbf2} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="call" style={[icstl, { fontSize: appstt[1] * dimsz[12] }]} /></TouchableOpacity>);
                }
                else {
                    if (this.state.ostts == 2) { tstl = Stl.luicon; olst = gvar[2][95022]; eicn = <Icon3 name="close-circle" style={[tstl, { fontSize: dimsz[13], paddingEnd: dimsz[4] }]} />; } else if (!isnull(this.state.ostts)) { tstl = Stl.dsbicon; olst = gvar[2][95027]; eicn = <Icon3 name="remove-circle" style={[tstl, { fontSize: dimsz[13], paddingEnd: dimsz[4] }]} />; }
                    rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={invitevc} style={[Stl.srdiv/*Stl.txtwrap*/, { paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h/*, justifyContent: 'center'*/ }]}><Icon1 name="call-out" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[6] }]} /><Text style={[Stl.txts2, { fontSize: dimsz[2], paddingStart: dimsz[19]/*, textAlign: 'center'*/ }]}>{gvar[2][95029]}</Text></TouchableOpacity>);
                }
            } else { olst = ovalue; }
            lftsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => { Keyboard.dismiss(); if (scrnid[rtn][6]) this.props.navigation.navigate(scrnid[rtn][6]); else this.props.navigation.goBack(); }} style={[Stl.bkdiv, { paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="arrow-back" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity>, setpht(scrnid[rtn][4][0], null, [appstt[1] * dimsz[9], appstt[1] * dimsz[23], null, { marginBottom: 0 }], [this.dsrc, 2, gvar[2][103025] + ': ' + ovalue]));
            break;
        case 'Dashboard':
            if (!phys) {
                if(this.state.dash) if (this.state.data && this.state.fload == 0) if (this.state.data.length) if (this.state.flkey == 0) rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.updnot1('uwall', scrnid['Dashboard'][4][5][this.state.flkey][0])} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="checkmark-done" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[12]}]} /></TouchableOpacity>);
            }
            break;
        case 'Notifications':
            if (this.state.data && this.state.fload == 0) if (this.state.data.length) if (this.state.flkey == 0) rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.updnot1()} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="checkmark-done" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[12]}]} /></TouchableOpacity>);
            break;
        case 'Questions':
        case 'Tasks':
            cbf0 = () => { let index = this.state.qidx - 1; if (this['svw' + index]) this['svw' + index].scrollTo({ y: 0, animated: true }); };
            lftsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.askbefquit(() => { Keyboard.dismiss(); if (scrnid[rtn][6]) this.props.navigation.navigate(scrnid[rtn][6]); else this.props.navigation.goBack(); }, 1)} style={[Stl.bkdiv, { paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="close" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity>);
            if (this.state.data && this.state.fload == 0) if (this.state.data.length) rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.squest(this.state.qidx, 2)} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="checkmark" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[12]}]} /></TouchableOpacity>);
            break;
        case 'Caregivers':
            urt = useright.find(function (et) { return et.match(new RegExp('^[\*\@\+\-]*61$', 'i')) });
            if (this.state.fload == 0) if (gvar[1][6] && isinsert(urt)) rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.opndp(-1, null, Object.assign({}, iuarray, { Id_typeuser: "8" }), 'Profile')} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="add" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[12]}]} /></TouchableOpacity>);
        case 'Reminders':
            if (!rgtsd.length) { urt = useright.find(function (et) { return et.match(new RegExp('^[\*\@\+\-]*56$', 'i')) }); if (this.state.fload == 0) if (gvar[1][6] && isinsert(urt)) rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.u56({ ids: "-1" })} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="add" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[12]}]} /></TouchableOpacity>); }
        case 'Instructions':
        case 'Appointments':
            lftsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => { Keyboard.dismiss(); if (scrnid[rtn][6]) this.props.navigation.navigate(scrnid[rtn][6]); else this.props.navigation.goBack(); }} style={[Stl.bkdiv, { paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="arrow-back" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity>);
            break;
        case 'Profile':
            urt = useright.find(function (et) { return et.match(new RegExp('^[\*\@\+\-]*' + ((',1,2,3,4,5,6,').indexOf(',' + scrnid[rtn][4][0].Id_typeuser + ',') != -1 ? 1 : 2) + '$', 'i')) });
            if (this.state.data && this.state.fload == 0) if (this.state.data.length && scrnid[rtn][4][9][this.state.flkey]) if(gvar[1][7] && isupdate(urt)) rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={async () => await this.suser()} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="checkmark" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[12]}]} /></TouchableOpacity>);
        case 'Details':
            olst = data[2];
            lftsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.askbefquit(() => { Keyboard.dismiss(); if (scrnid[rtn][6]) this.props.navigation.navigate(scrnid[rtn][6]); else this.props.navigation.goBack(); }, 1)} style={[Stl.bkdiv, { paddingVertical: appstt[1] * dmns.h }]}><Icon3 name="arrow-back" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity>, setpht(scrnid[rtn][4][0], "person-outline", [appstt[1] * dimsz[9], appstt[1] * dimsz[23], null, { marginBottom: 0 }], [this.dsrc, 2, gvar[2][45022] + ': ' + (olst || data[3])]));
            break;
        case 'Analytics':
            data[1] = setval(scrnid[rtn][4][0]); olst = ' ';
            lftsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => { Keyboard.dismiss(); if (scrnid[rtn][6]) this.props.navigation.navigate(scrnid[rtn][6]); else this.props.navigation.goBack(); }} style={[Stl.bkdiv, { paddingVertical: 1 }]}><Icon3 name="arrow-back" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[8], paddingHorizontal: dimsz[4] }]} /></TouchableOpacity>);
            if (this.state.data && this.state.fload == 0) if (this.state.data.length) if (this.chart) rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.setState({ mload: Date.now() })} style={{ paddingHorizontal: dimsz[4], paddingVertical: 1 }}><Icon3 name="refresh" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[12]}]} /></TouchableOpacity>, dmns.lrgs ? <TouchableOpacity key={1} activeOpacity={Cnt.prps.tchblopcty} onPress={() => mntst.show([[gvar[2][57020], 1]])} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: 1 }]}><Icon3 name="grid" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[12]}]} /></TouchableOpacity> : null); else if (!dmns.lrgs) rgtsd.push(<TouchableOpacity key={0} activeOpacity={Cnt.prps.tchblopcty} onPress={() => mntst.show([[gvar[2][5701], 1]])} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: 1 }]}><Icon3 name="stats-chart" style={[Stl.lbicon, { fontSize: appstt[1] * dimsz[12]}]} /></TouchableOpacity>);
            break;
    }
    return (
        <View style={[Stl.itmhdiv, { paddingTop: mnwcl&&mnwcl.getst() == 'flex'&&!sai[0]&&!stsbrht?sai[4]:/*scrnid[rtn]&&scrnid[rtn][13][1]?0:*/stsbrht}]}>
            <View style={[Stl.bkdiv, { width: '15%', alignSelf: 'flex-start' }]}>{lftsd}</View>
            <View style={[Stl.coldiv, {flex:1}]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={cbf0} style={{ paddingTop: appstt[1] * 3 }}><Text style={[Stl.txts1, Stl.tabtxt, { fontSize: appstt[1] * dimsz[6] }]}>{data[1]}</Text></TouchableOpacity><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={cbfo} style={[Stl.itmhdiv, { paddingBottom: appstt[1] * 3 }]}>{eicn}<Text style={[Stl.txts2, tstl || icstl, { fontSize: olst == ' ' ? 1 : dimsz[2], textAlign: 'center' }]}>{olst}</Text></TouchableOpacity></View>
            <View style={[Stl.srdiv, { width: '15%', alignSelf: 'flex-start' }]}>{rgtsd}</View>
        </View>
    );
}
export function renderfoot(data) {
    var rtn = this.props.route.name;
    switch (rtn) {
        case 'Login':
            return (
                <View style={[Stl.pcont, { height: (appstt[1] == 1 ? 1 : 0.3) * dmns.h25 * data[2], padding: (appstt[1] == 1 ? 1 : 0.15) * data[1], backgroundColor: data[0] }]}><Image source={mglogo} style={[Stl.image]} /></View>
            );
            break;
        case 'Chatroom':
            var iurl2, cmplct, nbi = 2, fext, isvid;
            if (!phys) { cmplct = <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => { if (!this.state.cmplct) mnldr.showclose('flex', [12, null, null, () => { this.inputs[0].focus(); this.setState({ cmplct: 1 }); }, gvar[2][45031]]); else this.setState({ cmplct: null }); }} style={{ paddingEnd: dimsz[4], paddingVertical: dimsz[5] }}><Icon3 name="warning" style={[this.state.cmplct ? Stl.uicon : Stl.dsbicon, { fontSize: dimsz[12] }]} /></TouchableOpacity>; nbi = 2.5; }
            if (this.state.photouri) {
                fext = this.state.photouri.substring(this.state.photouri.lastIndexOf('.') + 1).toLowerCase(); isvid = gvar[13][6].indexOf(fext) != -1;
                if (gvar[13][5].indexOf(fext) != -1) {
                    iurl2 = <View style={[Stl.srdiv]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => dispimg(0, 1)} style={[Stl.pzp, { width: dimsz[9], height: dimsz[9] }]}><Image source={{ uri: this.state.photouri }} style={[Stl.image2, { borderRadius: dimsz[23] }]} /></TouchableOpacity><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.setState({ photouri: null, phototype: null }, cltf)} style={[Stl.pzp, Stl.inptclear, { top: -5, right: -5, padding: 3 }]}><Icon2 name="times" style={[Stl.uicon, { fontSize: dimsz[10] }]} /></TouchableOpacity></View>;
                    this.dsrc[1] = [{ url: this.state.photouri, props: { title: gvar[2][45021] } }];
                }
                else {
                    iurl2 = <View style={[Stl.srdiv]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => mnldr.showclose('flex', [9, null, this.state.photouri, null, fext, gvar[2][45021], 'http://docs.google.com/gview?embedded=true&url=', isvid])} style={[Stl.pzp, { width: dimsz[9], height: dimsz[9], borderRadius: dimsz[23], backgroundColor: Cnt.clrs.blackcolor2 }]}><Icon2 name="file-video" style={[Stl.lbicon, { fontSize: dimsz[24] }]} /></TouchableOpacity><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.setState({ photouri: null, phototype: null }, cltf)} style={[Stl.pzp, Stl.inptclear, { top: -5, right: -5, padding: 3 }]}><Icon2 name="times" style={[Stl.uicon, { fontSize: dimsz[10] }]} /></TouchableOpacity></View>;
                }
            } else iurl2 = <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => mnldr.showclose('flex', [5, null, 3, 1, 3])} style={{ paddingHorizontal: dimsz[3], paddingVertical: dimsz[5] }}><Icon3 name="add" style={[Stl.lbicon, { fontSize: dimsz[12] }]} /></TouchableOpacity>;
            return (
                <View style={[Stl.btmtab, Stl.bluetab]}>{iurl2}{cmplct}<TextInput ref={(ref) => this.inputs[0] = ref} keyboardType="default" textContentType="none" autoFill={false} autoCompleteType="off" autoCorrect={false} onFocus={this.fcs} onChangeText={(value) => this.chgti(null, [['mtext', value]])} value={this.state.mtext} placeholder={gvar[2][10304]} placeholderTextColor={Cnt.clrs.dbrdcolor} style={[Stl.linpt, { width: dmns.width - nbi * dimsz[18], minHeight: dimsz[15], fontSize: dimsz[1], paddingHorizontal: dimsz[0], marginVertical: dimsz[19], textAlignVertical: 'top' }, this.state['reqfld']['mtext'] ? Stl.reqfld : null]} maxLength={1000} onContentSizeChange={(e) => { LayoutAnimation.easeInEaseOut(); this.inputs[0].setNativeProps({ style: { height: e.nativeEvent.contentSize.height + 10 } }); }} onEndEditing={(e) => { if(this.state.mtext && !this.state.mtext.trim()) this.setState({ mtext: null }); }} multiline={true} /><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.smsg()} style={{ paddingHorizontal: dimsz[3], paddingVertical: dimsz[5] }}><Icon3 name="send" style={[Stl.lbicon, { fontSize: dimsz[12] }]} /></TouchableOpacity>
                </View>
            );
            break;
        case 'Home':
        case 'Analytics':
        case 'Profile':
            break;
        case 'Questions':
        case 'Tasks':
            var prev, next, qidx = <View style={{ paddingHorizontal: dimsz[3], paddingVertical: dimsz[5] }}><Icon3 name="code" style={{ fontSize: dimsz[12], opacity: 0 }} /></View>;
            if(this.state.fload == 0) if (this.state.data && this.state.data.length) {
                prev = <View style={{ width: '30%' }}>{this.state.qidx > 1 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.onpr()} style={[Stl.bkdiv, { paddingHorizontal: dimsz[4], paddingVertical: dimsz[5] }]}><Icon3 name="chevron-back" style={[Stl.lbicon, { fontSize: dimsz[12] }]} /><Text style={[Stl.txts2, { fontSize: dimsz[1], paddingStart: dimsz[5] }]}>{gvar[2][19205]}</Text></TouchableOpacity> : null}</View>;
                next = <View style={{ width: '30%' }}>{this.state.qidx < this.state.data.length ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.onne()} style={[Stl.srdiv, { paddingHorizontal: dimsz[3], paddingVertical: dimsz[5] }]}><Text style={[Stl.txts2, { fontSize: dimsz[1], paddingEnd: dimsz[5] }]}>{gvar[2][19204]}</Text><Icon3 name="chevron-forward" style={[Stl.lbicon, { fontSize: dimsz[12] }]} /></TouchableOpacity> : <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.squest(this.state.qidx, 1, () => { Keyboard.dismiss(); if (scrnid[rtn][6]) this.props.navigation.navigate(scrnid[rtn][6]); else this.props.navigation.goBack(); })} style={[Stl.srdiv, { paddingHorizontal: dimsz[3], paddingVertical: dimsz[5] }]}><Text style={[Stl.txts2, { fontSize: dimsz[1], paddingEnd: dimsz[5] }]}>{gvar[2][45025]}</Text><Icon3 name="checkmark" style={[Stl.lbicon, { fontSize: dimsz[12] }]} /></TouchableOpacity>}</View>;
                qidx = <Text style={[Stl.txts1, { fontSize: dimsz[1] }]}>{this.state.qidx}{' '}{gvar[2][45024]}{' '}{this.state.data.length}</Text>;
            } else if (this.state.edata) { prev = <View></View>; next = <View></View>; qidx = <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.rquest()} style={[Stl.rbox, { backgroundColor: Cnt.clrs.yellowcolor }]}><Icon3 name="repeat" style={[Stl.wicon, { fontSize: dimsz[8] }]} /><Text style={[Stl.smalltext, { fontSize: dimsz[1] }]}>{gvar[2][112]}</Text></TouchableOpacity>; }
            return (<View style={[Stl.itmhdiv, Stl.bluetab, Stl.w100]}>{prev}{qidx}{next}</View>);
            break;
        default:
            var tbs = [Stl.tabicn, { paddingVertical: appstt[1] * (dmns.lrgs ? 1 : 3) }], ntst = [Stl.inptclear, Stl.nodata, { top: -1, left: dimsz[0] }], dp = () => this.tabpress('Dashboard');
            if(rtn == 'Dashboard') { if(!userarray.ispo) { if(this.state.dash) dp = this.gtmw; } }
            return (
                <View style={[Stl.btmtab, Stl.bluetab, Stl.w100]}>
                    <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={dp} style={tbs}><View><Icon3 name="home" style={{ fontSize: appstt[1] * dimsz[14], color: rtn == 'Dashboard' ? Cnt.clrs.lightbg : Cnt.clrs.lbluecolor }} />{scrnid['Dashboard'][scrnid['Dashboard'][4][2]] > 0 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={dp} style={ntst}><Text allowFontScaling={false} style={dimsz[27]}>{scrnid['Dashboard'][scrnid['Dashboard'][4][2]]}</Text></TouchableOpacity> : null}</View></TouchableOpacity>
                    {useright.find(function (et) { return et.match(new RegExp('^[\*\@\+\-]*105$', 'i')) })?<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.tabpress('Notifications')} style={tbs}><View><Icon3 name="notifications" style={{ fontSize: appstt[1] * dimsz[14], color: rtn == 'Notifications' ? Cnt.clrs.lightbg : Cnt.clrs.lbluecolor }} />{scrnid['Notifications'][scrnid['Notifications'][4][2]] > 0 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.tabpress('Notifications')} style={ntst}><Text style={dimsz[27]}>{scrnid['Notifications'][scrnid['Notifications'][4][2]]}</Text></TouchableOpacity> : null}</View></TouchableOpacity>:null}
                    {useright.find(function (et) { return et.match(new RegExp('^[\*\@\+\-]*103$', 'i')) })?<TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.tabpress('Messenger')} style={tbs}><View><Icon3 name="chatbubble" style={{ fontSize: appstt[1] * dimsz[14], color: rtn == 'Messenger' ? Cnt.clrs.lightbg : Cnt.clrs.lbluecolor }} />{scrnid['Messenger'][scrnid['Messenger'][4][2]] > 0 ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.tabpress('Messenger')} style={ntst}><Text style={dimsz[27]}>{scrnid['Messenger'][scrnid['Messenger'][4][2]]}</Text></TouchableOpacity> : null}</View></TouchableOpacity>:null}
                    <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.opndp(userarray.id, null, Object.assign({}, userarray), 'Profile')} style={tbs}><View><Icon3 name="person" style={{ fontSize: appstt[1] * dimsz[14], color: rtn == 'Profile' && scrnid[rtn][4][0].id == userarray.id ? Cnt.clrs.lightbg : Cnt.clrs.lbluecolor }} /></View></TouchableOpacity>
                    <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => mndrw.toggle()} style={tbs}><View><Icon3 name="reorder-four" style={{ fontSize: appstt[1] * dimsz[14], color: Cnt.clrs.lbluecolor }} /></View></TouchableOpacity>
                </View>
            )
    }
}
export function eqp(q, res) {
    clnp(q); if(mnwcl.state.e3 && mnwcl.state.e3[0] == 14) mnwcl.setState({display: 'flex'}); mntst.show([res]);
}
export async function suqp0(uri) {
    var vcfdata = new FormData(), usrarr = await finduser(mainvid), infomsg, tempv;
    vcfdata.append('atab', vctab); vcfdata.append('hex', uri[1]); vcfdata.append('mcid', userarray.id); vcfdata.append('muid', usrarr.id); vcfdata.append('msid', callData.msid); vcfdata.append('stext', TRANS_ENCRYPT(gvar[2][9039])); vcfdata.append('minfo', usrarr.value); if (callData.idconvpool) vcfdata.append('idconvpool', callData.idconvpool); tempv = uri[0].split('/'); vcfdata.append('mfile' + vctab, { uri: uri[0], name: tempv[tempv.length - 1], type: mimtyp[uri[2]] });
    mntst.show([[gvar[2][9043], 1]], -1);
    infomsg = [usrarr.id, usrarr.Id_typeuser, usrarr.value, null, callData.mtid, usrarr.value, usrarr.photo, callData.cpicon, callData._cpname]; usrarr = () => { eqp(0, [gvar[2][9036], 1]); };
    if (!isonline) lclstrm = setInterval(() => { if (isonline) savecall(vcfdata, infomsg, usrarr, 1); }, 1000); else savecall(vcfdata, infomsg, usrarr, 1);
}
export async function qp0(cbfct) {
    var fext = 'jpg', mnw, mnh; if(dmns.lrgs) { mnw = dmns.w1; mnh = dmns.height; } else { mnw = dmns.width; mnh = dmns.h25; }
    NativeModules.Wc.screenShot(findNodeHandle(mnwcl.rvid), { format: fext, quality: 0.8, minw: mnw, minh: mnh }).then((uri) => cbfct([uri, ''/*Platform.OS === 'android' ? '' : '255,255,255'*/, fext])).catch((error) => eqp(0, [gvar[2][11209], 2]));
}
export async function suqp1(uri) {
    var vcfdata = new FormData(), usrarr = finduser(mainvid), infomsg;
    vcfdata.append('atab', vctab); vcfdata.append('mcid', userarray.id); vcfdata.append('muid', usrarr.id); vcfdata.append('msid', callData.msid); vcfdata.append('stext', TRANS_ENCRYPT(gvar[2][9038])); vcfdata.append('mfile' + vctab, vcblob, vcdwnld); vcfdata.append('minfo', usrarr.value); if (callData.idconvpool) vcfdata.append('idconvpool', callData.idconvpool);
    mntst.show([[gvar[2][9042], 1]], -1);
    infomsg = [usrarr.id, usrarr.Id_typeuser, usrarr.value, null, callData.mtid, usrarr.value, usrarr.photo, callData.cpicon, callData._cpname]; usrarr = () => { eqp(1, [gvar[2][9035], 1]); callData._sp[1] = null; };
    if (!isonline) vcchunks = setInterval(() => { if (isonline) savecall(vcfdata, infomsg, usrarr, 1); }, 1000); else savecall(vcfdata, infomsg, usrarr, 1);
}
export async function qp1(cbfct) {
    if (window.MediaRecorder) {
        vcrecorder = new window.MediaRecorder(peerconn[callData.tid].stream, { mimeType: smt }); callData._sp[1] = 1;
        vcrecorder.onstop = async function (event) { clearInterval(recordTimer); cbfct([new Blob(vcchunks, { type: smt }), Date.now() + '.' + smt.split(';')[0].split('/').pop()]); };
        vcrecorder.ondataavailable = function (e) { if (e.data && e.data.size > 0) vcchunks.push(e.data); };
        vcchunks = []; clearInterval(recordTimer); recordTime = 0; vcrecorder.start(); recordTimer = setInterval(() => { recordTime++; mntst.show([[gvar[2][9032] + ' ' + gvar[13][36] + ' ' + gvar[2][9046] + ' [' + gvar[2][134023] + ': ' + arconvertdigit0(('0' + recordTime).slice(-2)) + ']', 1]]); if (recordTime >= gvar[13][36]) vcrecorder.stop(); }, 1000);
    } else mntst.show([[gvar[2][20027],2]]);
}
export function clnp(q) {
    callData._pp[q] = null; if(callData._fp[q].length) callData._fp[q].map((uri, j) => RNFB.fs.unlink(uri[0]).then((res) => { callData._fp[q].splice(j, 1); }).catch((error) => {}));
}
export async function qp(q, etm) {
    if (mainvid != -1) { if(callData._pp[q] && Date.now() - callData._pp[q] > 2 * (gvar[13][65] + (etm || 0))) clnp(q);
    if(!callData._pp[q]) {
        callData._pp[q] = Date.now(); mnwcl.setState({display: 'flex'});
        if(callData._rp[q] == 1) Fct['qp'+q](Fct['suqp'+q]); else Fct['qp'+q](async (uri) => {
            var vcfdata = new FormData(), ousr = await finduser(callData.tid), infomsg = [userarray.id, userarray.Id_typeuser, userarray.value, null, callData.mtid, callData.svalue, callData.photo, callData.cpicon, callData._cpname]; callData._fp[q].push(uri);
            vcfdata.append('atab', vctab); vcfdata.append('mcid', userarray.id); vcfdata.append('muid', userarray.id); vcfdata.append('minfo', userarray.value); vcfdata.append('tinfo', ousr.value); vcfdata.append('msid', callData.msid); vcfdata.append('tid', callData.tid); vcfdata.append('mtid', callData.mtid); vcfdata.append('idconvpool', callData.idconvpool); vcfdata.append('timezone', callData.timezone); vcfdata.append('stext', TRANS_ENCRYPT('qp')); vcfdata.append('q', q); vcfdata.append('r', 0);
            if (!isonline) ringTimer = setInterval(() => { if (isonline) { savecall(vcfdata, infomsg, null, 1); mntst.show([[gvar[2][11010], 1]], -1); sserver({ id: userarray.id, type: "qp", conid: conid, users: [callData.tid], q: q }); } }, 1000); else { savecall(vcfdata, infomsg, null, 1); mntst.show([[gvar[2][11010], 1]], -1); sserver({ id: userarray.id, type: "qp", conid: conid, users: [callData.tid], q: q }); }
        });
    } else { if (callData._sp[q]) { if (vcrecorder) vcrecorder.stop(); } else mntst.show([[callData._rp[q] == 1 ? gvar[2][6600] : gvar[2][11010], 1]], -1); } }
}
export async function rp(r) {
    var vcfdata = new FormData(), ousr = await finduser(callData.tid), infomsg = [userarray.id, userarray.Id_typeuser, userarray.value, null, callData.mtid, callData.svalue, callData.photo, callData.cpicon, callData._cpname];
    vcfdata.append('atab', vctab); vcfdata.append('mcid', userarray.id); vcfdata.append('muid', userarray.id); vcfdata.append('minfo', userarray.value); vcfdata.append('tinfo', ousr.value); vcfdata.append('msid', callData.msid); vcfdata.append('tid', callData.tid); vcfdata.append('mtid', callData.mtid); vcfdata.append('idconvpool', callData.idconvpool); vcfdata.append('timezone', callData.timezone); vcfdata.append('stext', TRANS_ENCRYPT('rp')); vcfdata.append('q', qrp.q); vcfdata.append('r', r);
    if (!isonline) ringTimer = setInterval(() => { if (isonline) { savecall(vcfdata, infomsg, null, 1); sserver({ id: userarray.id, type: "rp", conid: conid, users: [qrp.id], q: qrp.q, r: r, oid: qrp.id, tid: userarray.id }); } }, 1000); else { savecall(vcfdata, infomsg, null, 1); sserver({ id: userarray.id, type: "rp", conid: conid, users: [qrp.id], q: qrp.q, r: r, oid: qrp.id, tid: userarray.id }); }
}
export async function handleRequest(msg) {
    if(wstream && !isempty(peerconn)) {
        var ousr = await finduser(msg.id); qrp = msg;
        mnsly.showclose('flex', [15, null, ousr.value + ' ' + gvar[2][11011] + ' ' + gvar[2]["110"+(msg.q==0?15:16)]]/*, () => { if(mnwcl.e3[1]) mnwcl.vcminmax(); }*/);
    }
}
export async function handleResponse(msg) {
    if(wstream && !isempty(peerconn) && msg.oid == userarray.id && msg.tid == callData.tid) {
        var ousr = await finduser(msg.id); callData._rp[msg.q] = msg.r;
        if(msg.r == 1) {
            mntst.show([[ousr.value + ' ' + gvar[2][11017] + ' ' + gvar[2][907] + ' ' + gvar[2]["110"+(msg.q==0?15:16)], 1]]);
            ousr = callData._fp[msg.q].length; if(ousr) Fct['suqp'+msg.q](callData._fp[msg.q][ousr-1]);
        } else eqp(msg.q, [ousr.value + ' ' + gvar[2][11018] + ' ' + gvar[2][907] + ' ' + gvar[2]["110"+(msg.q==0?15:16)]]);
    }
}
export function vcstop(k, atr) {
    if(wstream && mnwcl.state.e3 && mnwcl.state.e3[0] == 14) {
        wstream.getTracks().forEach(track => track.kind == k && (track.enabled = atr));
        var sobj = {}; sobj.e3 = mnwcl.state.e3.slice(0); sobj.e3[k == 'audio' ? 4 : 5] = !atr;
        mnwcl.setState(sobj);
        sserver({
            id: userarray.id,
            type: "vcstop",
            conid: conid,
            users: [callData.tid],
            k: k,
            atr: atr
        });
    }
}
export function swtcam() {
    if (wstream) {
        facing = facing == "user" ? "environment" : "user";
        wstream.getVideoTracks()[0]._switchCamera();
    }
}
export function setspkr(spkr) {
    speaker = spkr;
    InCallManager.setForceSpeakerphoneOn(speaker);
    this.setState({ display: this.state.display });
}
export function hidepb(rmvc) {
    clearInterval(ringTimer); InCallManager.stopRingtone(); InCallManager.stopRingback();
    if (rmvc) {
        if(mnwcl.otmr) mnwcl.otmr.stop(); mnwcl.showclose('none'); mnsly.showclose('none');
        //InCallManager.setForceSpeakerphoneOn(false); InCallManager.setKeepScreenOn(false); InCallManager.stop({busytone: '_BUNDLE_'});
        InCallManager.stop(); setTimeout(() => NativeModules.Utils.pSound(Platform.OS === 'ios'?1070:20), 40);//20,22,33,96//1257,1070
        if(rmvc == 1) cleansession();
    }
}
export function cleansession() {
    clearInterval(recordTimer); clearInterval(restint);
    peerconn = {}; wstream = null; lclstrm = null; ices = []; renego = null; ringTime = 0; ringTimer = null; vcrecorder = null; recordTime = 0; recordTimer = null; restint = null; mxrest = 0; mainvid = -1; remotecntr = 0; vctab = 103; facing = "user"; speaker = null; if(callData._fp) callData._fp.map((v, q) => clnp(q)); callData = { cstatus: null, _track: null, _rp: [null, null], _pp: [null, null], _sp: [null, null], _fp: [[], []] };
}
export function createPeerConnection() {
    peerconn[callData.tid] = new RTCPeerConnection({
        iceServers: [
            {
                "urls": gvar[13][103]
            },
            {
                "urls": gvar[13][99],
                "username": gvar[13][102][0],
                "credential": gvar[13][102][1]
            }
        ]
    });
    peerconn[callData.tid].onicecandidate = handleICECandidate;
    peerconn[callData.tid].oniceconnectionstatechange = handleICEConnectionStateChange;
    peerconn[callData.tid].onsignalingstatechange = handleSignalingStateChange;
    peerconn[callData.tid].onnegotiationneeded = handleNegotiationNeeded;
    peerconn[callData.tid].onaddstream = handleTrack;
}
export function ft() {
    if (renego == 2) {
        mntst.show([[gvar[2][9037] + '... ' + gvar[2][9023] + '.', 1]]);
    }
}
export async function vcstart(reng) {
    if(!reng || peerconn[callData.tid]) { renego = reng; ft(); createPeerConnection(); if (!isempty(peerconn)) await attachstream(); }
}
export async function callhangup(caltyp) {
    if (!isonline) { mntst.show([[gvar[2][9024], 2]]); } else if (conn) {
        if (callData.tid) mntst.show([[gvar[2][20025], 2]]); else {
        var cpusers = scrnid['Chatroom'][4][0].cpusers ? scrnid['Chatroom'][4][0].cpusers.split(',') : [callData.tid], arrlen = cpusers.length, usrarr = scrnid['Chatroom'][4][0], sobj;
        callData.tid = fndtrgt(scrnid['Chatroom'][4][0], 7); callData.mtid = scrnid['Chatroom'][4][0].id; callData.initid = userarray.id;
        callData.idconvpool = scrnid['Chatroom'][4][0].idconvpool; callData.svalue = scrnid['Chatroom'][4][0].value; callData.photo = scrnid['Chatroom'][4][0].photo; callData.cpicon = scrnid['Chatroom'][4][0].cpicon; callData._cpname = scrnid['Chatroom'][4][0].cpname; callData.msid = scrnid['Chatroom'][4][0].cpusers; callData.cstatus = 'cancelled'; callData.timezone = usrarr.timezone; callData._opp = []; callData.cduration = '00:00:00'; callData.cdate = convert_dt_date(new Date(), true); isaudio = caltyp == 'audio';
        for (i = 0; i < arrlen; i++) { if (cpusers[i] == callData.tid) callData._opp.push(cpusers[i]); } callData._opp.push(callData.initid);
        mnsly.showclose('flex', [13, null, 2, usrarr, false, false], async () => await vcstart()); usrarr = await finduser(callData.tid);
        if(callData._opp) {
        if(mnsly.state.e3 && mnsly.state.e3[0] == 13) { sobj = {}; sobj.e3 = mnsly.state.e3.slice(0); sobj.e3[3] = usrarr; mnsly.setState(sobj); }
        arrlen = callData._opp.length; for (i = 0; i < arrlen; i++) { usrarr = await finduser(callData._opp[i]); if(callData._opp[i] == callData.tid) callData.tinfo = usrarr.value; }
        /*if (callData._opp[i] != userarray.id && !document.getElementById("remote_video_" + callData._opp[i])) {
            usrarr = await finduser(callData._opp[i]);
            videos += '<div class="frmscallee callee">\
                        <div class="frmscallee_inner">\
                            <p class="frmscallee_status d j-callee_status_' + callData._opp[i] + '" title="' + gvar[2][9022] + '">' + gvar[2][9022] + '</p>\
                            <video autoplay playsinline muted class="j-callee_vid" id="remote_video_' + callData._opp[i] + '" uid="' + callData._opp[i] + '" onclick="calleevideo($(this));"></video>\
                            </div><label class="frmscallee_name center w100">' + (usrarr.value || setval(usrarr)) + '</label>\
                        </div>';
        } $('.j-callees').append(videos);*/
        } }
    } else mntst.show([[gvar[2][9022] + '... ' + gvar[2][9023] + '.', 2]]);
}
export async function attachstream() {
    if (peerconn[callData.tid]) {
        try {
            let videoSourceId;
            if(!isaudio) {
                let sourceInfos = await mediaDevices.enumerateDevices(), arrlen = sourceInfos.length;
                for (i = 0; i < arrlen; i++) {
                    if(sourceInfos[i].kind == "videoinput" && sourceInfos[i].facing == (facing == "user" ? "front" : "environment")) videoSourceId = sourceInfos[i].deviceId;
                }
            }
            wstream = await mediaDevices.getUserMedia({
            audio: true,
            video: isaudio ? false : {
              mandatory: {
                minWidth: dmns.width,
                minHeight: dmns.height,
                minFrameRate: 30
              },
              facingMode: facing,
              optional: videoSourceId ? [{sourceId: videoSourceId}] : []
            }
          });
          if(mnsly.state.e3 && mnsly.state.e3[0] == 13) mnsly.setState({display: 'flex'}); else if(mnwcl.state.e3 && mnwcl.state.e3[0] == 14) mnwcl.setState({display: 'flex'});
            try {
                peerconn[callData.tid].addStream(wstream);
            } catch (error) {
                handleGetUserMediaError(error);
            }
        } catch (error) {
            handleGetUserMediaError(error);
            return;
        }
    }
}
export async function vcshw() { var usrarr = await finduser(callData.tid); mnwcl.showclose('flex', [14, false, 'flex', usrarr, false, false]); }
export async function vcshow(recv) {
    var usrarr = await finduser(callData.tid);
    mnldr.showclose('none'); mnsly.showclose('none'); mnwcl.showclose('flex', [14, false, 'flex', usrarr, false, false], () => { if(mnwcl.otmr) mnwcl.otmr.start(0, async (vctime) => { callData.cduration = vctime; if (!isonline) mntst.show([[gvar[2][9024], 2]]); if(!mnwcl.state.e3 || mnwcl.getst() != 'flex') await vcshw(); }); mnwcl.hdltch(); }); if(recv || speaker === null) mnwcl.setspkr(!isaudio); let csrn = crnscrn || dshscrn; if(csrn && csrn.props.route.name == 'Chatroom') csrn.setState({ initiaload: csrn.state.initiaload });
}
export async function handleTrack(event) {
    if (event.stream && peerconn[callData.tid] && peerconn[callData.tid].stream !== event.stream) {
        peerconn[callData.tid].stream = event.stream; if (remotecntr == 0) { /*if(mnwcl.state.e3 && mnwcl.state.e3[0] == 14)*/ mnwcl.setState({display: 'flex'}); mainvid = callData.tid; }
        /*document.getElementById("remote_video_" + callData.tid).srcObject = peerconn[callData.tid].stream;
        if (remotecntr == 0) { var obj = $("#remote_video_" + callData.tid); obj.closest('.callee').addClass('vcactv'); }
        $('.j-callee_status_' + callData.tid).attr('title', gvar[2][9031]).text(gvar[2][9031]);*/
    }
}
export async function coffer(reng) {
    if(peerconn[callData.tid]) {
        chkis(peerconn[callData.tid].iceConnectionState); renego = reng;
        if (callData.initid == userarray.id) {
            await peerconn[callData.tid].setLocalDescription(await peerconn[callData.tid].createOffer(Object.assign({ offerToReceiveAudio: 1, offerToReceiveVideo: !isaudio }, renego == 1 ? { iceRestart: true } : {})));
            sserver({
                id: userarray.id,
                type: "vcoffer",
                conid: conid,
                users: [callData.tid],
                sdp: peerconn[callData.tid].localDescription,
                renego: renego,
                vctab: vctab,
                mtid: callData.mtid,
                idconvpool: callData.idconvpool,
                value: callData.svalue,
                photo: callData.photo,
                cpicon: callData.cpicon,
                cpname: callData._cpname,
                msid: callData.msid,
                _opp: callData._opp,
                isaudio: isaudio
            });
        } else if(renego) sserver({ id: userarray.id, type: "coffer", conid: conid, users: [callData.tid], renego: renego });
    } else clearInterval(restint);
}
export function precall(recv) {
    clearInterval(ringTimer); ringTime = 0; ringTimer = setInterval(() => { ringTime++; if (ringTime == gvar[13][38]) endcall('unanswered'); }, 1000);
    var sobj = {media: isaudio ? 'audio' : 'video'}; if(recv) { InCallManager.startRingtone('_BUNDLE_'); mnsly.setspkr(true); } else { sobj=Object.assign(sobj, {ringback: '_BUNDLE_'}); InCallManager.start(sobj); mnsly.setspkr(!isaudio); } //InCallManager.setKeepScreenOn(true);
}
export async function handleNegotiationNeeded() {
    try {
        if (peerconn[callData.tid].signalingState != "stable") return;
        if(!renego) precall();
        await coffer(renego);
    } catch (error) { }
}
export async function handleVideoOffer(msg) {
    lclstrm = msg;
    if(msg.renego) { if(peerconn[callData.tid]) { chkis(peerconn[callData.tid].iceConnectionState); renego = msg.renego; ft(); acceptcall(); } } else {
        if(peerconn[callData.tid]) sserver({ id: userarray.id, type: 'occupied', conid: conid, users: [msg.id] }); else {
            var usrarr = {}, sobj;
            vctab = msg.vctab; callData.initid = msg.id; callData.cstatus = 'rejected'; callData.tid = msg.id; callData.mtid = msg.mtid; callData.idconvpool = msg.idconvpool; callData.svalue = msg.value; callData.photo = msg.photo; callData.cpicon = msg.cpicon; callData._cpname = msg.cpname; callData.msid = msg.msid; callData._opp = msg._opp; callData.cduration = '00:00:00'; isaudio = msg.isaudio;
            mnsly.showclose('flex', [13, null, 1, usrarr, false, false]); usrarr = await finduser(callData.initid);
            if(mnsly.state.e3 && mnsly.state.e3[0] == 13) { sobj = {}; sobj.e3 = mnsly.state.e3.slice(0); sobj.e3[3] = usrarr; mnsly.setState(sobj); } precall(1);
        }
    }
}
export async function acceptcall() {
    if(!renego) { callData.cstatus = 'ended'; hidepb(); mntst.show([[gvar[2][95036], 1]]); }
    if (isempty(peerconn) || renego == 2) createPeerConnection();
    if (peerconn[callData.tid]) {
        if (peerconn[callData.tid].signalingState != "stable") {
            await Promise.all([peerconn[callData.tid].setLocalDescription({ type: "rollback" }), peerconn[callData.tid].setRemoteDescription(desc)]);
            return;
        }
        var desc = new RTCSessionDescription(lclstrm.sdp), videos = '', arrlen, usrarr;
        /*arrlen = callData._opp.length; for (i = 0; i < arrlen; i++)
        if (callData._opp[i] != userarray.id && !document.getElementById("remote_video_" + callData._opp[i])) {
            usrarr = await finduser(callData._opp[i]);
            videos += '<div class="frmscallee callee">\
                        <div class="frmscallee_inner">\
                            <p class="frmscallee_status d j-callee_status_' + callData._opp[i] + '" title="' + gvar[2][9022] + '">' + gvar[2][9022] + '</p>\
                            <video autoplay playsinline muted class="j-callee_vid" id="remote_video_' + callData._opp[i] + '" uid="' + callData._opp[i] + '" onclick="calleevideo($(this));"></video>\
                            </div><label class="frmscallee_name center w100">' + (usrarr.value || setval(usrarr)) + '</label>\
                        </div>';
        } $('.j-callees').append(videos);*/
        await peerconn[callData.tid].setRemoteDescription(desc);
        ices.map(async function (candidate) {
            try {
                await peerconn[callData.tid].addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error) { }
        }); ices = [];
        if(renego != 1) await attachstream();
        await peerconn[callData.tid].setLocalDescription(await peerconn[callData.tid].createAnswer());
        sserver({
            id: userarray.id,
            type: "vcanswer",
            conid: conid,
            users: [callData.tid],
            sdp: peerconn[callData.tid].localDescription,
            renego: renego
        });
        if(!renego) {
            sserver({
                id: userarray.id,
                type: "vcaccept",
                conid: conid,
                users: [userarray.id]
            });
            await vcshow(1);
        } else await vcshw();
    }
}
export async function handleVideoAnswer(msg) {
    if(!msg.renego) {
        hidepb(); await vcshow(); callData.cstatus = 'ended'; mntst.show([[gvar[2][95036], 1]]);
    } else await vcshw();
    if (peerconn[callData.tid]) {
        var desc = new RTCSessionDescription(msg.sdp);
        /*if (peerconn[callData.tid].signalingState != "stable")*/ await peerconn[callData.tid].setRemoteDescription(desc);
        ices.map(async function (candidate) {
            try {
                await peerconn[callData.tid].addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error) { }
        }); ices = [];
    }
}
export async function handleNewICECandidate(msg) {
    if(msg.id == callData.tid)
        if (peerconn[callData.tid] && peerconn[callData.tid].remoteDescription) {
            try {
                await peerconn[callData.tid].addIceCandidate(new RTCIceCandidate(msg.candidate));
            } catch (error) { }
        } else ices.push(msg.candidate);
}
export function handleICECandidate(event) {
    if (event.candidate) {
        sserver({
            id: userarray.id,
            type: "icecandidate",
            conid: conid,
            users: [callData.tid],
            candidate: event.candidate
        });
    }
}
export function chkis(cs, ttle) {
    clearInterval(restint); if(ttle) { mntst.show([[ttle, 1]]); }
    restint = setInterval(async function () { mxrest++; if(peerconn[callData.tid] && (peerconn[callData.tid].iceConnectionState != 'new' || (mnwcl.otmr && mnwcl.otmr.gettm()[0] > 5000)) && peerconn[callData.tid].iceConnectionState != 'completed' && peerconn[callData.tid].iceConnectionState != 'connected') { if (isonline) { if(mxrest < 5) await coffer(1); else endcall(cs); } } else clearInterval(restint); }, 10000);
}
export function handleICEConnectionStateChange(event) {
    if (peerconn[callData.tid]) {
        var cs = peerconn[callData.tid].iceConnectionState;
        switch (cs) {
            case 'closed':
            case 'failed':
            case 'disconnected':
            case 'checking':
                chkis(cs, gvar[2][20028] + '... ' + gvar[2][9023] + '.');
                break;
            case 'new':
                if (mnwcl.otmr && mnwcl.otmr.gettm()[0] > 5000) chkis(cs, gvar[2][20028] + '... ' + gvar[2][9023] + '.');
                break;
            case 'connected':
                clearInterval(restint); mxrest = 0; mntst.show([[gvar[2][9031], 1]]);
                break;
        }
    }
}
export function handleSignalingStateChange(event) {
    if (peerconn[callData.tid]) {
        var cs = peerconn[callData.tid].signalingState;
        switch (cs) {
            case 'closed':
                endcall(cs);
                break;
        }
    }
}
export function stopvids(streams) { streams.map((stream) => { if(stream) stream.getTracks().forEach((track) => track.stop()); }); }
export function savecall(fdata, cdata, cbfct, pass) {
    let csrn = crnscrn || dshscrn, rtn = csrn ? csrn.props.route.name : null, flkey, sobj = {}, atab = 103, tempv, mdate, mtext, lmsg, cnt = 0;
    clearInterval(lclstrm); clearInterval(ringTimer); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'smsg'); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('sId_typeuser', cdata[1]);
    if(rtn == 'Chatroom' && cdata[4] == scrnid['Chatroom'][4][0].id) {
        flkey = scrnid['Chatroom'][2]; if (!lstpages['Chatroom'][flkey].data) lstpages['Chatroom'][flkey].data = [];
        lstpages['Chatroom'][flkey].data.unshift({ Id_msg: fdata._parts[0][1].toString(), id: cdata[0], senderv: cdata[2], sending: 1 });
        if (csrn.isloaded) csrn.setState({ data: lstpages['Chatroom'][flkey].data.slice(0) });
    }
    fetch(gvar[1][0] + gvar[1][1] + '?pass=' + pass, { method: 'POST', timeout: gvar[13][65], body: fdata, headers: Platform.OS === 'ios' ? { 'Content-Type': 'multipart/form-data' } : {} })
    .then((resp) => resp.json())
    .then((data) => {
        if (data) {
            csrn = crnscrn || dshscrn; rtn = csrn ? csrn.props.route.name : null; mdate = moment.tz(data[1], systz).tz(userarray.timezone).format('YYYY-MM-DD HH:mm:ss'); data[2] = TRANS_DECRYPT(data[2]);
          if(cdata[4] == scrnid['Chatroom'][4][0].id) {
                flkey = scrnid['Chatroom'][2];
                if (!lstpages['Chatroom'][flkey].data) lstpages['Chatroom'][flkey].data = []; else { tempv = lstpages['Chatroom'][flkey].data.findIndex(elm => elm[scrnid['Chatroom'][14][flkey]] == fdata._parts[0][1] && elm.sending); if (tempv != -1) lstpages['Chatroom'][flkey].data.splice(tempv, 1); }
                if (!data.error) lstpages['Chatroom'][flkey].data.unshift({ Id_msg: data[0], id: cdata[0], Id_typeuser: cdata[1], senderv: cdata[2], nbsent: scrnid['Chatroom'][4][0].nbsent, nbread: '', mdate, mtext: data[2], mfile: data[3], cmplct: cdata[3], webconf: data[4], status: data[5], wcicon: data[6] }); tempv = { data: lstpages['Chatroom'][flkey].data.slice(0) };
                if (rtn != 'Chatroom') scrnid['Chatroom'][3] = [tempv]; else sobj = tempv;
            }
            if (data.error) { mntst.show(data.error); } else {
                flkey = scrnid['Messenger'][2];
                if (lstpages['Messenger'] && lstpages['Messenger'][flkey].data) {
                    lmsg = lstpages['Messenger'][flkey].data[0] ? lstpages['Messenger'][flkey].data[0].lmsg : data[0];
                    tempv = lstpages['Messenger'][flkey].data.findIndex(elm => elm[scrnid['Messenger'][14][flkey]] == cdata[4]);
                    if (tempv != -1) { cnt = lstpages['Messenger'][flkey].data[tempv].cnt; lstpages['Messenger'][flkey].data.splice(tempv, 1); }
                    lstpages['Messenger'][flkey].data.unshift({ Id_target: cdata[4], Id_msg: data[0], id: cdata[0], Id_typeuser: cdata[1], senderv: cdata[2], value: cdata[5], photo: cdata[6], cpicon: cdata[7], cpname: cdata[8], mdate, mtext: data[2], mfile: data[3], cmplct: cdata[3], webconf: data[4], status: data[5], wcicon: data[6], cnt, lmsg });
                    if (rtn != 'Messenger') scrnid['Messenger'][3] = scrnid['Messenger'][3] == 1 ? scrnid['Messenger'][3] : [[['data', flkey, 1]]]; else sobj = { data: csrn.srhlpg('', flkey, 1) };
                }
            }
            if (csrn.isloaded) { if (!isempty(sobj)) csrn.setState(sobj, cbfct); }
            if (!data.error) {
                if (data[7]) mntst.show(data[7]);
                if(data[4]) {
                    data[12] += ',' + data[16]; sserver({ id: userarray.id, type: 'notif', conid: conid, users: data[12].split(','), data: { nid: '', idreceiver: data[12], id: data[16], Id_typeuser: data[8], value: data[9], photo: data[10], cpicon: data[6], minfo: data[13], date: data[1], Id_obj: data[18], mtext: data[2], mfile: data[3], ntype: data[15], idconvpool: data[19], cmplct: data[17], webconf: data[4], status: data[5], wbicon: data[20], wcicon: data[6]} });
                } else {
                    fdata = new FormData(); fdata.append('fct', 'pnotif'); fdata.append('alrtmails', userarray.alrtmails); fdata.append('infomails', userarray.infomails); fdata.append('admnmails', userarray.admnmails); fdata.append('alrtids', userarray.alrtids); fdata.append('infoids', userarray.infoids); fdata.append('admnids', userarray.admnids); fdata.append('utoken', userarray.utsoken); fdata.append('ntext', data[14]); fdata.append('mtext', data[2]); fdata.append('mfile', data[3]); fdata.append('atab', atab); fdata.append('ntype', data[15]); fdata.append('idconvpool', data[19]); fdata.append('cmplct', data[17]); fdata.append('webconf', data[4]); fdata.append('status', data[5]); fdata.append('wbicon', data[20]); fdata.append('wcicon', data[6]); fetch(gvar[1][0] + gvar[1][5] + '?timezone=' + userarray.timezone + '&smode=,1,&Id_login=' + data[12] + '&Id_sender=' + data[16] + '&sId_typeuser=' + data[8] + '&svalue=' + data[9] + '&photo=' + data[10] + '&cpicon=' + data[6] + '&minfo=' + data[13] + '&Id_obj=' + data[18], { method: 'POST', body: fdata }).then((resp) => resp.json()).then((pdta) => { data[12] += ',' + data[16]; sserver({ id: userarray.id, type: 'notif', conid: conid, users: pdta[6].split(','), data: { nid: pdta[2], idreceiver: pdta[6], id: data[16], Id_typeuser: data[8], value: data[9], photo: data[10], cpicon: data[6], minfo: data[13], date: pdta[3], mtext: pdta[7], mfile: data[3], ntype: data[15], idconvpool: data[19], cmplct: data[17], webconf: data[4], status: data[5], wbicon: data[20], wcicon: data[6], wid: pdta[5][0][0], wdate1: pdta[5][0][1], wdate2: pdta[5][0][2], wdate3: pdta[5][0][3], winfo1: pdta[5][0][4], Id_obj: pdta[5][0][5] || data[18], winfo3: pdta[5][0][6], wtype: pdta[5][0][7], wobj: pdta[5][0][8], wmedia: pdta[5][0][9]} }); if(pdta[1]) { mntst.show(pdta[1]); scrnid['Dashboard'][3] = 1; scrnid['Notifications'][3] = 1; } }).catch((error) => { });
                }
            }
        } else { /*suggestion to put alert icon to resend message*/ }
    }).catch((error) => { /*suggestion to put alert icon to resend message*/ });
}
export function smsg() {
    var fdata = new FormData(), atab = 103, tempv, cmplct = this.state.cmplct ? this.state.cmplct : '', mtext = this.state.mtext ? this.state.mtext.trim() : '', muid = userarray.id, sId_typeuser = userarray.Id_typeuser, minfo = userarray.value;
    if (mtext || this.state.photouri) {
        fdata.append('inreq', Date.now()); fdata.append('mcid', userarray.id); fdata.append('muid', muid); fdata.append('msid', scrnid['Chatroom'][4][0].msid); fdata.append('mtext' + atab, TRANS_ENCRYPT(sanitizeinput(mtext))); fdata.append('minfo', minfo); fdata.append('atab', atab); fdata.append('cmplct', cmplct); fdata.append('svalue', scrnid['Chatroom'][4][0].value); fdata.append('photo', scrnid['Chatroom'][4][0].photo); fdata.append('cpicon', scrnid['Chatroom'][4][0].cpicon); fdata.append('idconvpool', scrnid['Chatroom'][4][0].idconvpool);
        if (this.state.photouri) { tempv = this.state.photouri.split('/'); fdata.append('mfile' + atab, { uri: this.state.photouri, name: tempv[tempv.length - 1], type: this.state.phototype }); }
        this.setState({ photouri: null, phototype: null, mtext: null, cmplct: null, reqfld: {} }, cltf); savecall(fdata, [muid, sId_typeuser, minfo, cmplct, scrnid['Chatroom'][4][0].id, scrnid['Chatroom'][4][0].value, scrnid['Chatroom'][4][0].photo, scrnid['Chatroom'][4][0].cpicon, scrnid['Chatroom'][4][0].cpname], null, this.pass || '');
    } else { this.setState({ reqfld: { mtext: 1 } }, () => mntst.show([[gvar[2][201], 2]])); }
}
export function closecall(cs) {
    hidepb(2); callData.cstatus = cs;
    var infomsg, errormsg;
    switch (callData.cstatus) {
        case 'rejected':
            infomsg = gvar[2][95038];
            break;
        case 'cancelled':
            infomsg = gvar[2][95037];
            break;
        case 'ended':
            infomsg = gvar[2][95040];
            break;
        case 'unanswered':
            infomsg = gvar[2][95039];
            break;
        case 'occupied':
            infomsg = gvar[2][20029];
            break;
        default:
            errormsg = gvar[2][20026];
    }
    if(infomsg) mntst.show([[infomsg, 1]], null, null, null, 1); else mntst.show([[errormsg, 2]], null, null, null, 1);
    if (vcrecorder) vcrecorder.stop();
    if (callData.initid == userarray.id) {
        callData.atab = vctab; callData.mcid = userarray.id; callData.muid = userarray.id; callData.sId_typeuser = userarray.Id_typeuser; callData['stext'] = TRANS_ENCRYPT('wc'); callData.ctype = isaudio ? 'audio' : 'video'; callData.minfo = userarray.value;
        var fdata = new FormData(); errormsg = [callData.muid, callData.sId_typeuser, callData.minfo, null, callData.mtid, callData.svalue, callData.photo, callData.cpicon, callData._cpname]; fdata.append('inreq', Date.now()); for (infomsg in callData) if(infomsg[0] != '_') fdata.append(infomsg, callData[infomsg]);
        if (!isonline) lclstrm = setInterval(() => { if (isonline) savecall(fdata, errormsg, null, 1); }, 1000); else savecall(fdata, errormsg, null, 1);
    }
    stopvids([wstream]);
    if (peerconn[callData.tid]) {
        stopvids([peerconn[callData.tid].stream]);
        peerconn[callData.tid].onnicecandidate = null;
        peerconn[callData.tid].oniceconnectionstatechange = null;
        peerconn[callData.tid].onsignalingstatechange = null;
        peerconn[callData.tid].onaddstream = null;
        peerconn[callData.tid].onnegotiationneeded = null;
        peerconn[callData.tid].close();
    }
    cleansession();
}
export function endcall(cs) {
    cs = cs || callData.cstatus;
    sserver({ id: userarray.id, type: cs, conid: conid, users: [callData.tid, userarray.id] });
    closecall(cs);
}
export function handleGetUserMediaError(err) {
    endcall(); mntst.show([[gvar[2][9028], 2]]);
}
export function clsws() { vcmmint = -1; if (!isempty(peerconn)) endcall(); if(conn && conn.readyState === conn.OPEN) conn.close(4001); ostts = null; vcusers = null; clearTimeout(vctmr); }
export function sserver(msg, ttext) {
    if(conn && conn.readyState === conn.OPEN) { conn.send(JSON.stringify(msg)); lstactv = new Date(); } else { ostts = null; mxrcnt = 0; clearTimeout(vctmr); vctmr = setTimeout(() => vcconnect(msg), 3000); if(ttext) mntst.show(ttext); }
}
function usrst(msg) {
    let csrn = crnscrn || dshscrn;
    if(csrn) {
        var rtn = csrn.props.route.name; if(rtn == 'Chatroom') {
        var tuid = fndtrgt(scrnid['Chatroom'][4][0], 7);
        if(ostts == 1) Object.keys(msg.users).map((uid) => { if(uid == tuid) { scrnid[rtn][4][0].ostts = msg.users[uid][0]; csrn.setState({ ostts: scrnid[rtn][4][0].ostts }); } }); else { scrnid[rtn][4][0].ostts = 0; csrn.setState({ ostts: scrnid[rtn][4][0].ostts }); }
        }
    }
}
export function getstatus() {
    let csrn = crnscrn || dshscrn;
    if(ostts == 1) sserver({ id: userarray.id, type: 'userlist', conid: conid, users: [fndtrgt(scrnid['Chatroom'][4][0], 7)] }); else if(csrn) { var rtn = csrn.props.route.name; if(rtn == 'Chatroom') { scrnid[rtn][4][0].ostts = 0; csrn.setState({ ostts: scrnid[rtn][4][0].ostts }); } }
}
export function setstatus() {
    let csrn = crnscrn || dshscrn;
    if(mndrw && mndrw.getst() == 'flex') mndrw.setState({ display: 'flex' });
    if(csrn) { var rtn = csrn.props.route.name; if(ostts == null) if(rtn == 'Chatroom') { scrnid[rtn][4][0].ostts = null; csrn.setState({ ostts: scrnid[rtn][4][0].ostts }); } }
}
export function swtstatus() { sserver({ id: userarray.id, type: "ostts", conid: conid }, [[gvar[2][9022] + '... ' + gvar[2][9023] + '.', 1]]); }
export function vcconnect(imsg) {
    if (useright.find(function (et) { return et.match(new RegExp('^[+*\-@]*103$', 'i')) })) {
    if(vcusers == null) {
        vcusers = myusers ? myusers.split(',') : []; convpoolarray.map(function (e) { e['cpusers'].split(',').map(function (uid) { if (uid != userarray.id && !vcusers.find(function (el) { return el == uid; })) vcusers.push(uid); }); });
    }
    if (!isonline) { clearTimeout(vctmr); vctmr = setTimeout(() => vcconnect(imsg), 3000); } else {
        conn = new WebSocket(gvar[13][33], "json");
        conn.onopen = function (event) { mxrcnt = 0; if(imsg) sserver(imsg); };
        conn.onclose = function (err) { conn = null; if(vcmmint != -1) { ostts = null; mxrcnt++; if(mxrcnt < mxrtimes) { clearTimeout(vctmr); vctmr = setTimeout(() => vcconnect(imsg), 3000); } setstatus(); } };
        conn.onerror = function (err) { try { conn.close(4002); } catch (e) { conn = null; } };
        conn.onmessage = async function (event) {
            let msg = JSON.parse(event.data), ousr, odiv, sobj, tempv, flkey, csrn, rtn;
            switch (msg.type) {
                case 'conid':
                    conid = msg.conid; if(ostts == null) { ostts = 1; setstatus(); }
                    csrn = crnscrn || dshscrn; if(csrn && csrn.props.route.name == 'Chatroom') getstatus();
                    sserver({
                        id: userarray.id,
                        type: "id",
                        conid: conid,
                        ostts: ostts,
                        users: vcusers
                    });
                    break;

                case 'userstts':
                    usrst(msg);
                    break;

                case 'userlist':
                    usrst(msg);
                    break;

                case 'ostts':
                    ostts = msg.ostts; setstatus();
                    break;

                case 'vcoffer':
                    handleVideoOffer(msg);
                    break;

                case 'vcanswer':
                    handleVideoAnswer(msg);
                    break;

                case 'vcaccept':
                    hidepb(1);
                    break;

                case 'icecandidate':
                    handleNewICECandidate(msg);
                    break;

                case 'rejected': case 'cancelled': case 'ended': case 'unanswered': case 'occupied':
                case 'closed': case 'failed': case 'disconnected': case 'checking': case 'new':
                    closecall(msg.type);
                    break;

                case 'vcstop':
                    if (peerconn[callData.tid] && peerconn[callData.tid].stream) peerconn[callData.tid].stream.getTracks().forEach(track => track.kind == msg.k && (track.enabled = msg.atr));
                    break;

                case 'vcstart':
                    await vcstart(2);
                    break;

                case 'coffer':
                    await coffer(msg.renego);
                    break;

                case 'qp':
                    await handleRequest(msg);
                    break;

                case 'rp':
                    await handleResponse(msg);
                    break;

                case 'notif':
                    notif(msg);
                    break;

                case 'updmsgs':
                    if (msg.users.find(elm => elm == userarray.id)) {
                        csrn = crnscrn || dshscrn; rtn = csrn ? csrn.props.route.name : null; sobj = []; flkey = scrnid['Chatroom'][2];
                        if (lstpages['Chatroom'] && lstpages['Chatroom'][flkey].data) {
                            if (!isempty(scrnid['Chatroom'][4][0]) && scrnid['Chatroom'][4][0].id == msg.Id_target) {
                                lstpages['Chatroom'][flkey].data.map((value, idx) => { if (value.id == userarray.id && msg.id != userarray.id) { if (value.nbread) { if ((',' + value.nbread + ',').indexOf(',' + msg.id + ',') == -1) lstpages['Chatroom'][flkey].data[idx]['nbread'] += ',' + msg.id; } else lstpages['Chatroom'][flkey].data[idx]['nbread'] = msg.id; } }); tempv = [{ data: lstpages['Chatroom'][flkey].data.slice(0), a: Date.now() }, null, flkey];
                                if (rtn != 'Chatroom') scrnid['Chatroom'][3] = tempv; else sobj = tempv;
                            }
                        }
                        if (sobj.length) tempv = sobj[0]['data'].length; else { sobj = -1; tempv = null; }
                        if (csrn) csrn.orfrsh(scrnid[rtn][3] == 1 ? scrnid[rtn][3] : sobj, tempv);
                    }
                    break;
            }
        };
    }
    }
}
export function notif(idata) {
    let tempv, flkey, odata = idata.data;
    if ((',' + odata.idreceiver + ',').indexOf(',' + userarray.id + ',') != -1) {
        let csrn = crnscrn || dshscrn, rtn = csrn ? csrn.props.route.name : null, mp = ismp(odata, rtn), Id_target, cgrp, ovalue, photo, cpicon, cpname, sobj = [], mdate = moment.tz(odata.date, systz).tz(userarray.timezone).format('YYYY-MM-DD HH:mm:ss');
        if (mp[2]) {
            if (odata.idconvpool) { cgrp = convpoolarray.find(elm => elm.idconvpool == odata.idconvpool); if (!cgrp) { cgrp = odata.idreceiver.split(',').fill(1); cgrp = { id: 'cp' + odata.idconvpool, idconvpool: odata.idconvpool, value: odata.value, photo: odata.photo, cpicon: odata.cpicon, cpname: odata.cpname || odata.value, timezone: userarray.timezone, cpusers: odata.idreceiver, uactive: cgrp.join(','), Id_center: userarray.Id_center, show: 1, ephi: "" }; convpoolarray.push(cgrp); } } else cgrp = amuarray.find(elm => elm.id == odata.id); if (cgrp) { Id_target = cgrp.id; ovalue = cgrp.value; photo = cgrp.photo; cpicon = cgrp.cpicon; cpname = cgrp.cpname; }
        } //if (!csrn.isloaded) csrn = null;
        switch (parseInt(odata.ntype)) {
            case 17:
            case 21:
                rfdsh(odata, csrn, rtn, mp[1], ovalue, photo, cpicon, cpname, 1, mdate);
            case 1:
                var doinc = odata.id != userarray.id, cnt = 0, nbsent;
                flkey = scrnid['Chatroom'][2];
                if (lstpages['Chatroom'] && lstpages['Chatroom'][flkey].data) {
                    if (!isempty(scrnid['Chatroom'][4][0]) && scrnid['Chatroom'][4][0].id == Id_target) {
                        //if(!lstpages['Chatroom'][flkey].data.length&&csrn.state.fload==-3)
                        tempv = lstpages['Chatroom'][flkey].data.findIndex(elm => elm[scrnid['Chatroom'][14][flkey]] == odata.Id_obj); if (tempv != -1) doinc = 0;
                        if (doinc) {
                            lstpages['Chatroom'][flkey].data.unshift({ Id_msg: odata.Id_obj, id: odata.id, Id_typeuser: odata.Id_typeuser, senderv: odata.minfo, mdate, mtext: odata.mtext, mfile: odata.mfile, cmplct: odata.cmplct, webconf: odata.webconf, status: odata.status, wcicon: odata.wcicon, ephi: "", hshtext: "" }); tempv = [{ data: lstpages['Chatroom'][flkey].data.slice(0) }, null, flkey];
                            if (rtn != 'Chatroom') scrnid['Chatroom'][3] = scrnid['Chatroom'][3] == 1 ? scrnid['Chatroom'][3] : tempv; else { sobj = tempv; csrn.updmsgs(1); }
                        }
                    }
                }
                if (doinc && (rtn != 'Chatroom' || scrnid['Chatroom'][4][0].id != Id_target)) scrnid['Messenger'][scrnid['Messenger'][4][2]]++; else doinc = 0;
                flkey = scrnid['Messenger'][2];
                if (lstpages['Messenger'] && lstpages['Messenger'][flkey].data) {
                    nbsent = lstpages['Messenger'][flkey].data[0].lmsg;
                    tempv = lstpages['Messenger'][flkey].data.findIndex(elm => elm[scrnid['Messenger'][14][flkey]] == Id_target);
                    if (tempv != -1) { cnt = parseInt(lstpages['Messenger'][flkey].data[tempv].cnt); lstpages['Messenger'][flkey].data.splice(tempv, 1); }
                    lstpages['Messenger'][flkey].data.unshift({ Id_target: Id_target, Id_msg: odata.Id_obj, id: odata.id, Id_typeuser: odata.Id_typeuser, senderv: odata.minfo, value: ovalue, photo: photo, cpicon: cpicon, cpname: cpname, mdate, mtext: odata.mtext, mfile: odata.mfile, cmplct: odata.cmplct, webconf: odata.webconf, status: odata.status, wcicon: odata.wcicon, cnt: cnt + doinc, lmsg: nbsent, ephi: "", hshtext: "" });
                    if (rtn != 'Messenger') scrnid['Messenger'][3] = scrnid['Messenger'][3] == 1 ? scrnid['Messenger'][3] : [[['data', flkey, 1]]]; else sobj = [{ data: csrn.srhlpg('', flkey, 1) }, null, flkey];
                }
                if (sobj.length) tempv = sobj[0]['data'].length; else { sobj = -1; tempv = null; }
                if (csrn) csrn.orfrsh(scrnid[rtn][3] == 1 ? scrnid[rtn][3] : sobj, tempv);
                break;
            case 8: case 18: case 19:
            case 123: case 124: case 125: case 126: case 127: case 128:
            case 133: case 134: case 135: case 136: case 137: case 138:
            case 143: case 144: case 145: case 146: case 147: case 148:
                scrnid[mp[1]][3] = 1; rfdsh(odata, csrn, rtn, mp[1], ovalue, photo, cpicon, cpname, null, mdate);
                break;
            default:
                if(mp[1] != 'Notifications') {
                    if (odata.flkey && (',' + odata.flkey + ',').indexOf(',' + (scrnid[mp[1]][2] + 1) + ',') == -1) { flkey = parseInt(odata.flkey.split(',')[0]) - 1; scrnid[mp[1]][2] = flkey; tempv = [{ flkey: flkey }, 1]; } else tempv = 1;
                    if (csrn && rtn == mp[1]) csrn.orfrsh(tempv); else scrnid[mp[1]][3] = tempv;
                } rfdsh(odata, csrn, rtn, mp[1], ovalue, photo, cpicon, cpname, null, mdate);
        }
    }
}
export function prepat() {
    if (gvar[13][90]) if (gvar[4]) { gttk(getpat, function () { gstk(getpat); }); } else gstk(getpat);
}
export function gttk(cbfct, flfct) {
    if (gvar[8] && gvar[5]) { if (new Date().getTime() > parseInt(gvar[8])) { var fdata = new FormData(); fdata.append('fct', 'gettoken'); fdata.append('gp90', gvar[13][90]); fdata.append('gp91', gvar[13][91]); fdata.append('gp92', gvar[13][92]); fdata.append('gp96', gvar[13][96]); fdata.append('gp74', gvar[13][74]); fdata.append('refresh_token', gvar[5]); fetch(gvar[1][0] + gvar[1][5], { method: 'POST', body: fdata }).then((resp) => resp.json()).then((data) => { if(data.js) { eval(data.js); if (cbfct) cbfct(); } }).catch((error) => { }); } else if (cbfct) cbfct(); } else if (flfct) flfct();
}
export function gstk(cbfct) {
    var fdata = new FormData(); fdata.append('fct', 'gstk'); fdata.append('gp90', gvar[13][90]); fdata.append('gp91', gvar[13][91]); fdata.append('gp92', gvar[13][92]); fdata.append('gp96', gvar[13][96]); fdata.append('gp74', gvar[13][74]); fetch(gvar[1][0] + gvar[1][5], { method: 'POST', body: fdata }).then((resp) => resp.json()).then((data) => { if(data.js) { eval(data.js); if (cbfct) cbfct(); } }).catch((error) => { });
}
export function checkinactivity() {
    if (!inactivityTimer) {
        lstactv = new Date(); inactivityTimer = setInterval(() => {
            if(parseInt(userarray.id) > 0) {
            var mnval = gvar[13][11] - (new Date() - lstactv);
            if (mnval > 0) { if (gvar[13][90]) gttk(); } else { let csrn = crnscrn || dshscrn; csrn.logout(1); } } else clearInterval(inactivityTimer);
        }, 60000);
    }
}
export function rdash(device, imsg) {
    msg = imsg; scrnid['Home'][0] = device && !isempty(device) ? device : null; var tempv = 'Dashboard'; gcnt = null; conid=0;
    if (vcusers) {
        if((',' + vcusers + ',').indexOf(',' + userarray.id + ',') != -1) tempv = parseInt(scrnid['notscrn'][1])>0?scrnid['notscrn'][0]:phys?'Notifications':'Dashboard';
        switch(tempv)
        {
            case 'Notifications':
                if(userarray['enb105'][phys]) tempv = 'Dashboard';
                break;
            case 'Messenger':
            case 'Chatroom':
                if(userarray['enb103'][phys]) tempv = 'Dashboard';
                break;
        }
        inactivityTimer = JSON.stringify(scrnid['notscrn']);
    } else { inactivityTimer = null; } this.navsrn(null, null, 0, inactivityTimer); inactivityTimer = null;
    scrnid['notscrn'] = []; vcusers = null; this.tabpress('Dashboards', tempv, 1); cleansession(); vcconnect(); checkinactivity();
    gttk(); /*prepat();*/ if(!this.rk) setTimeout(async () => await grk(devicedata[3], 1), 1000); AsyncStorage.multiSet([['gvar', JSON.stringify(gvar)]]).then((res) => { });
}
export function logout(sesexp) {
    clsws(); mnldr.showclose('none', 0); mnwcl.showclose('none', 0); mnsly.showclose('none', 0); mntst.show([[gvar[2][6600], 1, 1]], -1, 1);
    //iuarray.login = userarray.login; iuarray.pwd = userarray.pwd;
    msg = sesexp; clearInterval(inactivityTimer);
    var fdata = new FormData(); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'logout'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('deviceid', devicedata[0]);
    fetch(gvar[1][0] + gvar[1][5] + '?fct=logout', { method: 'POST', timeout: gvar[13][65], body: fdata }).then((resp) => resp.json()).then((data) => { }).catch((error) => { }); conid = true;
    this.props.navigation.reset({ index: 0, routes: [{ name: gvar[1][3] && gvar[13][90]?'Home':'Login' }] });
}
export function askbefquit(cbfct, difpg) {
    var rtn = this.props.route.name, epta = scrnid[rtn][1].length, ischg = false;
    if (difpg) { for (i = 0; i < epta; i++) if (this.changsec[i]) { ischg = true; break; } } else { if (this.changsec[scrnid[rtn][2]]) ischg = true; }
    if (ischg) mnldr.showclose('flex', [2, null, difpg, cbfct]); else cbfct();
}
export function orfrsh(rfrsh, lngth, cbfct) {
    if (this.isloaded) {
        var rtn = this.props.route.name, sobj = {};
        scrnid[rtn][3] = null;
        switch (rtn) {
            case 'Questions':
            case 'Tasks':
                sobj['qidx'] = 1;
            case 'Dashboard':
            case 'Appointments':
            case 'Notifications':
            case 'Messenger':
            case 'Chatroom':
            case 'Instructions':
            case 'Details':
            case 'Analytics':
            case 'Caregivers':
            case 'Reminders':
                if(!cbfct) cbfct = () => { if (lngth || (this.state.data && this.state.data.length)) if (this.mnscrlvw) try { this.mnscrlvw.scrollToOffset({ offset: 0, animated: true }); } catch (error) { try { this.mnscrlvw.scrollTo({ y: 0, animated: true }); } catch (error) { } } };
                break;
        }
        if (Array.isArray(rfrsh)) {
            if (Array.isArray(rfrsh[0])) { rfrsh[0].map((value, j) => { if (value[0] == 'data') { /*if(value[1] == this.state.flkey)*/ sobj['data'] = this.srhlpg('', value[1], value[2]); } else sobj[value[0]] = value[1]; }); rfrsh[0] = sobj; } if (!rfrsh[2] || rfrsh[2] == this.state.flkey) this.setState(Object.assign(rfrsh[0], { initiaload: true }), rfrsh[1] ? (typeof rfrsh[1] === 'function' ? rfrsh[1] : () => this.precase(rfrsh[1], cbfct, sobj)) : cbfct);
        } else this.precase(rfrsh, cbfct, sobj);
    }
}
export function glstg(rfrsh) {
    var rtn = this.props.route.name, sobj = {};
    switch (rtn) {
        case 'Login':
            AsyncStorage.multiGet(['gvar']).then(async (data) => {
                if (data != null) data.map((res, i, store) => {
                    if (store[i]) switch (store[i][0]) {
                        case 'gvar':
                            if (store[i][1] != null) {
                                gvar = JSON.parse(store[i][1]); if(!inactivityTimer || this.prelog === 0) [4].map((gval) => gvar[gval] = null);
                                if (gvar[0]) sobj.pjid = gvar[0]; else sobj.e29 = 'flex';
                            } else sobj.e29 = 'flex';
                            if (this.isloaded) if (!isempty(sobj)) this.setState(sobj);
                            if (!isempty(gvar[2])) Cnt.langlb = gvar[2]; if (gvar[3]) Tchid.isSensorAvailable({}).then(({ available, biometryType }) => { if (this.isloaded) if(available && biometryType) this.setState({ e1: biometryType }); else this.setState({ e1: null }); }).catch((error) => { if (this.isloaded) this.setState({ e1: null }); }); sgp();
                            break;
                    }
                });
                await this.prelogin(rfrsh);
            });
            break;
        default:
            lstactv = new Date(); if (Array.isArray(rfrsh)) this.orfrsh(rfrsh); else this.precase(rfrsh);
    }
}
export function fndtrgt(item, Id_typeuser) {
    if (item.id && item.id.substr(0, 2) == 'cp') {
        var cpusers, arrlen; if (item.cpusers) cpusers = item.cpusers.split(','); else {
            cpusers = convpoolarray.find(elm => elm.id == item.id);
            if (cpusers !== undefined) cpusers = cpusers.cpusers.split(','); else cpusers = [];
        }
        arrlen = cpusers.length; var tgrp;
        switch (Id_typeuser) {
            case 7:
                tgrp = aparray;
                break;
        }
        for (i = 0; i < arrlen; i++) if (tgrp.find(elm => elm.id == cpusers[i]) !== undefined) return cpusers[i];
    } else return item.id;
}
export function fndgrp(Id_login) {
    var grplst = [];
    convpoolarray.map((elm, j) => { if (elm.cpactive == 1 && (',' + elm.cpusers + ',').indexOf(',' + Id_login + ',') != -1) grplst.push(elm.id); });
    if (amuarray.concat(aparray).find(elm => elm.id == Id_login) !== undefined) grplst.push(Id_login);
    return grplst;
}
export function fndcht(Id_login, nousr) {
    var cht = convpoolarray.find(elm => elm.cpactive == 1 && (',' + elm.cpusers + ',').indexOf(',' + Id_login + ',') != -1); if (cht !== undefined) return Object.assign({}, cht);
    if (!nousr) cht = amuarray.concat(aparray).find(elm => elm.id == Id_login); if (cht !== undefined) return Object.assign({}, cht); else return cht;
}
export function fnduid(pat) {
    switch (parseInt(userarray.Id_typeuser)) {
        case 1: case 2: case 3: case 4: case 5: case 6:
            return !pat ? userarray : scrnid['Details'][4][0];
            break;
        case 7:
            return userarray;
            break;
        case 8:
            return aparray[0];
            break;
    }
}
export function fndpat(idpat) { var rid = parseInt(idpat); return rid < -9 ? aparray.find(elm => elm.Id_pop == -rid) : aparray.find(elm => elm.id == idpat); }
export async function finduser(uid, ispat, ispo, frce) {
    var rid = parseInt(uid), usrarr; if(!frce) if(rid > 0) {
        if (uid == userarray.id) usrarr = userarray;
        if((ispat || ispat !== undefined) && !usrarr) usrarr = aparray.find(elm => elm.id == uid);
        if(!usrarr) usrarr = allusr.find(elm => elm.id == uid);
        if(!ispat && !usrarr) {
            if(uid.substr(0, 2) == 'cp') usrarr = convpoolarray.find(elm => elm.id == uid);
            if(!usrarr) usrarr = amuarray.find(elm => elm.id == uid);
            if(!usrarr) usrarr = aouarray.find(elm => elm.id == uid);
        }
     } else if (rid < -9) usrarr = aparray.find(elm => elm.Id_pop == -rid);
     if (!usrarr || !usrarr.value) {
        var fdata = new FormData(); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'gdusri'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]);
        try { const response = await fetch(gvar[1][0] + gvar[1][1] + '?ispo=' + (ispo || 0) + '&ocpus=' + uid + '&ispat=' + (ispat || 0), { method: 'POST', timeout: gvar[13][65], body: fdata }); const data = await response.json(); usrarr = JSON.parse(TRANS_DECRYPT(data))[0]; if (usrarr !== undefined) allusr.push(usrarr); } catch (error) { }
    }
    return usrarr;
}
export function compmsg(rtn) {
    var usrarr = fndcht(scrnid[rtn][4][0].id, 1); if (usrarr !== undefined) { scrnid[rtn][4][0].idconvpool = usrarr.idconvpool; scrnid[rtn][4][0].mcid = usrarr.Id_creator; var mdate = usrarr.cpusers ? usrarr.cpusers.split(',') : [scrnid[rtn][4][0].id], mtext = usrarr.uactive ? usrarr.uactive.split(',') : [1], tempv = mdate.length, msid = []; for (i = 0; i < tempv; i++) if (mtext[i] == 1 && mdate[i] != scrnid[rtn][4][0].id) msid.push(mdate[i]); scrnid[rtn][4][0].msid = msid.join(','); }
}
export function precase(rfrsh, cbfct, esobj) {
    var rtn = this.props.route.name, fdata = new FormData(), ldng = 1, fct = '', cfct = [], sobj = Object.assign({}, esobj), ldlp, uid;
    if (rfrsh == 3) { if(!gcnt) fct = 'eDashboard'; } else {
        ldlp = rfrsh == 1 || ((!lstpages[rtn] || !lstpages[rtn][this.state.flkey] || !lstpages[rtn][this.state.flkey].data) && rfrsh != 2);
        switch (rtn) {
            case 'Dashboard':
                if (ldlp) { if (rfrsh == 1) { gcnt = null; lstpages = {}; Object.keys(scrnid).map((i) => scrnid[i][3] = null); scrnid[rtn][2] = '-'+this.state.flkey; } this.loadlpg(ldng, rfrsh); } else if (rfrsh == 2) { this.precase(3); if (!phys) this.updnot(2, null, 'uwal'); }
                break;
            case 'Notifications':
                if (ldlp) this.loadlpg(ldng, rfrsh); else if (rfrsh == 2) this.updnot(2, 3);
                break;
            case 'Chatroom':
                fdata.append('Id_target', scrnid[rtn][4][0].id);
                if (ldlp) this.loadlpg(ldng, rfrsh); else if (rfrsh == 2) this.updmsgs(null, 3);
                break;
            case 'Questions':
            case 'Tasks':
            case 'Instructions':
                if (ldlp) this.loadlpg(ldng, rfrsh); else if (rfrsh == 2) this.updnot2(2, 3);
                break;
            case 'Home':
                break;
            case 'Details':
            case 'Analytics':
                uid = 1;
            default:
                if (ldlp) this.loadlpg(ldng, rfrsh); else if (rfrsh == 2) this.precase(3);
        }
    }
    if (fct != '') {
        fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', fct); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); uid = fnduid(uid); fdata.append('uid', uid ? uid.id : 0); fdata.append('gp22', gvar[13][22]); fdata.append('gp23', gvar[13][23]); fdata.append('enb105', userarray['enb105'][phys] || ''); fdata.append('enb103', userarray['enb103'][phys] || ''); fdata.append('enb104', userarray['enb104'][phys] || ''); fdata.append('logged', scrnid['Dashboard'][4][1]); fdata.append('dir', 'temp');
        fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
        .then((resp) => resp.json())
        .then((data) => {
            let csrn = crnscrn || dshscrn; if (!csrn.isloaded) csrn = null; scrnid['Dashboard'][4][1] = 1; sobj['initiaload'] = true; //sobj['fload'] = 0;
            if (data) {
                Object.keys(data).map((okey) => {
                    if (data[okey])
                        switch (okey) {
                            case 'ocnt':
                            case 'ncnt':
                                Object.keys(data[okey][0]).map((skey) => { scrnid[skey][scrnid[skey][4][2]] = !isnull(data[okey][0][skey]) ? parseInt(data[okey][0][skey]) : 0; scrnid[skey][4][6] = 0; }); gcnt = 1;
                                break;
                            case rtn:
                                Object.keys(data[okey][0]).map((skey) => sobj[skey] = data[okey][0][skey]);
                                break;
                            default:
                                global[okey] = data[okey];
                        }
                });
                try { if (this.isloaded) this.setState(sobj, cbfct); else if (csrn) csrn.setState(sobj, cbfct); } catch (error) { if (csrn) csrn.setState(sobj, cbfct); }
            } else { try { if (this.isloaded) this.setState(sobj, cbfct); else if (csrn) csrn.setState(sobj, cbfct); if (rfrsh) mntst.show([[gvar[2][11209], 2]]); } catch (error) { if (csrn) { csrn.setState(sobj, cbfct); if (rfrsh) mntst.show([[gvar[2][11209], 2]]); } } }
        }).catch((error) => { let csrn = crnscrn || dshscrn; if (!csrn.isloaded) csrn = null; try { if (this.isloaded) this.setState(sobj, cbfct); else if (csrn) csrn.setState(sobj, cbfct); if (rfrsh) mntst.show([[gvar[2][11209], 2]]); } catch (error) { if (csrn) { csrn.setState(sobj, cbfct); if (rfrsh) mntst.show([[gvar[2][11209], 2]]); } } });
    } else {
        if(cbfct) cfct.push(cbfct);
        if(scrnid[rtn][15]) { let abcd = scrnid[rtn][15]; cfct.push(() => this.tosec(abcd)); scrnid[rtn][15] = null; }
        if (rfrsh != 2) { sobj['initiaload'] = true; if (this.isloaded) this.setState(sobj, () => cfct.map((fxt) => fxt())); } else cfct.map((fxt) => fxt());
    }
}
export function gl(u, i) {
    var glang; if (!gvar[2]) glang = getlngcd(); else glang = gvar[2][0][0]; if (!gvar[1]) gvar[1] = Cnt.surl; else { if (!gvar[1][4]) gvar[1][4]=Cnt.surl[4]; if (!gvar[1][5]) gvar[1][5]=Cnt.surl[5]; } if (!gvar[2]) gvar[2] = Cnt.langlb; if(u) userarray.lang = glang; if(i) iuarray.lang = glang; return glang;
}
export function postlogin(usrclk, glang) {
    if (gvar[3] && (!userarray.login || !userarray.pwd)) {
        var fdata = new FormData(), sobj = {}; /*mntst.show([[gvar[2][9022] + '. ' + gvar[2][9023] + '...', 1, 1]], -1, 1);*/
        fdata.append('fct', 'glogin'); fdata.append('Id_login', gvar[3]); fdata.append('appver', devicedata[4]); fdata.append('lang', glang);
        fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
        .then((resp) => resp.json())
        .then((data) => {
            if (data) {
                if (this.state.updapp[1][0]=='+') { mntst.show([[gvar[2][20035], 2], [gvar[2][20036], 2]], -1); this.postlog = 1; return; }
                if (data.login) { let ulogin = TRANS_DECRYPT(data.login), upwd = this.state.pwd || (data.pwd ? TRANS_DECRYPT(data.pwd) : ''); sobj.e20 = gvar[2][102]; sobj.e21 = gvar[2][506]; sobj.e22 = 20; sobj.e23 = false; sobj.e24 = true; sobj.e25 = Cnt.clrs.lbrdcolor; sobj.e26 = Cnt.clrs.footbg; sobj.e27 = 'default'; if (usrclk) sobj.e29 = 'none'; sobj.login = this.state.login || ulogin.replace(/.(?=.{7,}$)/g, '*'); sobj.pwd = upwd; sobj.ulogin = ulogin; sobj.upwd = upwd; if (this.isloaded) if (!this.state.ulogin || this.state.ulogin != ulogin) this.setState(sobj/*, () => { this.inputs[2].setNativeProps({ text: ' ' }); setTimeout(() => this.inputs[2].setNativeProps({ text: upwd }), 0); }*/); this.postlog = 1; }
            }
        }).catch((error) => { });
    }
}
export async function prelogin(usrclk) {
    var fdata = {}, glang = gl(1,1), pjid = this.state.e29 == 'flex' ? this.state.pjid : gvar[0], sobj = {}, res = [], tempv;
    if (!this.btnclick) {
        if (usrclk) { if(this.state.pjid != gvar[0]) this.prelog = 0; else if(!this.prelog) this.prelog = null; } else { if(gvar[3]) if (this.isloaded) this.setState({ lrgs: this.state.lrgs }); }
        if (!this.prelog) {
            if (pjid) {
                if (this.invldpk.find(elm => elm == pjid) === undefined) {
                    this.btnclick = 1; fdata = new FormData(); if(usrclk) { Keyboard.dismiss(); mntst.show([[gvar[2][6600], 1, 1]], -1, 1); } else if(gvar[1][3] && gvar[13][90]) { mntst.show([[gvar[2][9022] + '. ' + gvar[2][9023] + '...', 1, 1]], -1, 1); fdata.append('gp90', gvar[13][90]); }
                    
                    //gvar[4] = 'Sec-PdRl9nO-mYAS25STRhv7WQc2TfI-ceS'; gvar[5] = 'Sec-0-hY8ScRWCYRyXTsN7EspGIyHaU-ceS'; gvar[8] = new Date().getTime(); AsyncStorage.multiSet([['gvar', JSON.stringify(gvar)]]).then((res) => { });
                    
                    fdata.append('ifct', 'gurl'); fdata.append('pjid', pjid); fdata.append('Id_login', gvar[3]); fdata.append('appver', devicedata[4]); fdata.append('lang', glang); if(vcusers) fdata.append('notscrn', JSON.stringify(scrnid['notscrn']));
                    if (conid) { if (gvar[5]) { fdata.append('access_token', gvar[4]); fdata.append('refresh_token', gvar[5]); fdata.append('token_type', gvar[6]); fdata.append('scope', gvar[7]); }
                    if (gvar[4]&&gvar[8]) { if(new Date().getTime() > parseInt(gvar[8])) { this.prelog = 0; fdata.append('tokuif', '1'); } fdata.append('deviceid', devicedata[0]); fdata.append('devicename', devicedata[2]); this.rk=devicedata[3]; fdata.append('regkey', this.rk); } } fdata.append('regtype', devicedata[1]);
                    fetch(gvar[1][4][wsurl], { method: 'POST', timeout: gvar[13][65], body: fdata })
                    .then(async (resp) => { if(!resp.ok) { wsurl=(wsurl+1)%(gvar[1][4].length); await this.prelogin(usrclk); throw new Error("WSNF"); } return resp.json(); })
                    .then(async (data) => {
                        delete this.btnclick;
                        if (data.url) {
                            gvar[0] = data.url[4]; if(data.js) eval(data.js); if(this.prelog === 0) [4].map((gval) => gvar[gval] = null);
                            if(data.url[0]) data.url[0].split(',').map((ival) => res.push([gvar[2][ival], 1]));
                            if (data.updapp) {
                                this.setState({ updapp: data.updapp });
                                if (data.updapp[1][0]=='+') { mntst.show([[gvar[2][20035], 2], [gvar[2][20036], 2]], -1); return; }
                                if (data.updapp[0][0]=='+') res.push([gvar[2][120], 1], [gvar[2][121], 1]);
                            }
                            if(!gcnt&&res.length) mntst.show(res, -1); gcnt = 1;
                            if (data.login) {
                                let ulogin = TRANS_DECRYPT(data.login), upwd = this.state.pwd || (data.pwd ? TRANS_DECRYPT(data.pwd) : ''); sobj.e20 = gvar[2][102]; sobj.e21 = gvar[2][506]; sobj.e22 = 20; sobj.e23 = false; sobj.e24 = true; sobj.e25 = Cnt.clrs.lbrdcolor; sobj.e26 = Cnt.clrs.footbg; sobj.e27 = 'default'; if (usrclk) sobj.e29 = 'none'; sobj.login = this.state.login || ulogin.replace(/.(?=.{7,}$)/g, '*'); sobj.pwd = upwd; sobj.ulogin = ulogin; sobj.upwd = upwd; if (this.isloaded) if (!this.state.ulogin || this.state.ulogin != ulogin) this.setState(sobj/*, () => { this.inputs[2].setNativeProps({ text: ' ' }); setTimeout(() => this.inputs[2].setNativeProps({ text: upwd }), 0); }*/); this.postlog = 1;
                            }
                            iuarray.notifmode = gvar[13][32]; gvar[1] = data.url[1]; if(data.url[2]) eval(data.url[2]); gvar[15] = data.url[3]; this.prelog = 1;
                            if(data.usr) this.poslog(data); else {
                                if(gvar[1][3] && gvar[13][90]&&conid&&gvar[9]&&!gvar[4]) {
                                    mntst.show([[gvar[2][1031], 1, 1]], -1, 1);
                                    try {
                                        const result = await authorize({ serviceConfiguration: { authorizationEndpoint: gvar[9], tokenEndpoint: gvar[10] }, clientId: gvar[13][91], clientSecret: gvar[13][92], redirectUrl: gvar[13][96], scopes: gvar[7].split('%20'), dangerouslyAllowInsecureHttpRequests: true, clientAuthMethod: 'basic' });
                                        mntst.show([[gvar[2][9022] + '. ' + gvar[2][9023] + '...', 1, 1]], -1, 1); //console.warn(result);
                                        gvar[4] = result.accessToken; gvar[5] = result.refreshToken; gvar[6] = result.tokenType; gvar[7] = result.scopes.join('%20'); gvar[8] = new Date(result.accessTokenExpirationDate).getTime()-gvar[13][74]*1000;
                                        fdata = new FormData(); fdata.append('fct', 'tokuif'); fdata.append('gp90', gvar[13][90]); fdata.append('gp91', gvar[13][91]); fdata.append('gp92', gvar[13][92]); fdata.append('gp96', gvar[13][96]); fdata.append('gp74', gvar[13][74]); fdata.append('lang', glang); if(vcusers) fdata.append('notscrn', JSON.stringify(scrnid['notscrn'])); fdata.append('access_token', gvar[4]); fdata.append('refresh_token', gvar[5]); fdata.append('token_type', gvar[6]); fdata.append('scope', gvar[7]); fdata.append('deviceid', devicedata[0]); fdata.append('devicename', devicedata[2]); this.rk=devicedata[3]; fdata.append('regkey', this.rk); fdata.append('regtype', devicedata[1]);
                                        fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
                                        .then((oresp) => oresp.json())
                                        .then((odata) => {
                                            if (odata) this.poslog(odata); else mntst.show([[gvar[2][112011], 2]]);
                                        }).catch((error) => { mntst.show([[gvar[2][112011], 2]]); });
                                    } catch (error) { mntst.close(); }
                                } else { if(usrclk||(gvar[1][3] && gvar[13][90])) mntst.close(); }
                            AsyncStorage.multiSet([['gvar', JSON.stringify(gvar)]]).then((res) => { });
                        }
                        if(!data.userdata) { if (!this.postlog) this.postlogin(usrclk, glang); if (this.isloaded) this.setState({ e29: usrclk ? 'none' : this.state.e29, pjid: gvar[0] }); }
                    } else { this.invldpk.push(pjid); mntst.show([[gvar[2][45042], 2]]); }
                }).catch((error) => { if(usrclk&&error.message.indexOf("WSNF")==-1) mntst.show([[gvar[2][112010], 2]]); delete this.btnclick; wsurl=(wsurl+1)%(gvar[1][4].length); });
                } else { this.setState({ pjid: '' }); mntst.show([[gvar[2][45042], 2]]); }
            } else { if (usrclk) mntst.show([[gvar[2][1025], 2]]); }
        } else { if (usrclk) { if(this.state.pjid == gvar[0]) { if (this.isloaded) this.setState({ e29: 'none', pjid: gvar[0] }); } } if (!this.postlog) this.postlogin(usrclk, glang); }
    }
}
export async function login(usrclk, glang) {
//NativeModules.Utils.screenShot(findNodeHandle(this.ovsht), 'jpg', 100).then((uri) => { this.setState({ uri }); console.warn(uri); }); return;
//callData={};callData.tid = "1";peerconn[callData.tid]={};await attachstream();peerconn[callData.tid].stream=wstream;aparray = [{id:"1",fname:"Maroun",lname:"Bercachi",gender:1,Id_typeuser:7,photo:'5a635ab13b890.png'}];var usrarr = await finduser(callData.tid);gvar[13][39]=10;mnwcl.showclose('flex', [14, false, 'flex', usrarr||{}, null, null],()=>{console.warn(mnwcl.lvid);});if(mnwcl.otmr)mnwcl.otmr.start(0);/*setTimeout(() => { var sobj = {}; sobj.e3 = mnwcl.state.e3.slice(0); sobj.e3[6] = 'Dr. John SMITH is requesting your permission to take a snapshot.'; mnwcl.setState(sobj,()=>{if(sobj.e3[1])mnwcl.vcminmax();}); },2000);*/ return;
    var fdata = new FormData(); if(!glang) glang = gl(1);
    if (!this.logclick) {
        if(gcnt || !gvar[3]) {
            if(gvar[0]) {
                if (usrclk == 2 || (this.state.login != '' && this.state.pwd != '')) {
                    if (gvar[1]) {
                        this.logclick = 1; Keyboard.dismiss(); mntst.show([[gvar[2][6600], 1, 1]], -1, 1); fdata.append('fct', 'login'); if (usrclk == 2) fdata.append('Id_login', gvar[3]); else { if (this.state.ulogin && this.state.e24) { fdata.append('log', TRANS_ENCRYPT(this.state.ulogin)); fdata.append('pincode', 1); } else fdata.append('log', TRANS_ENCRYPT(this.state.login)); fdata.append('pwd', TRANS_ENCRYPT(this.state.pwd)); } fdata.append('lang', glang); if(vcusers) fdata.append('notscrn', JSON.stringify(scrnid['notscrn'])); fdata.append('deviceid', devicedata[0]); fdata.append('regtype', devicedata[1]); fdata.append('devicename', devicedata[2]); this.rk=devicedata[3]; fdata.append('regkey', this.rk); fdata.append('appver', devicedata[4]);
                        fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
                        .then((resp) => resp.json())
                        .then((data) => {
                            delete this.logclick; //if (!userarray.login || !userarray.pwd) userarray = Object.assign({}, iuarray);
                            if (data) this.poslog(data); else mntst.show([[gvar[2][11209], 2]]);
                        }).catch(async (error) => { delete this.logclick; await this.cleanapp(usrclk,[[gvar[2][11209], 2]]); });
                    } else { await this.cleanapp(usrclk); }
                } else { mntst.show([[this.state.e21, 2]]); }
            } else { mntst.show([[gvar[2][1025], 2]]); }
        } else { await this.cleanapp(usrclk,null,1); }
    }
}
export function poslog(data) {
    if (data.error) { mntst.show(data.error); } else {
        if(data.js) eval(data.js); systz = data.systz;
        iuarray.city = userarray.city; iuarray.zipcode = userarray.zipcode; iuarray.country = userarray.country; iuarray.contract = userarray.contract; iuarray.lang = userarray.lang; iuarray.timezone = userarray.timezone; iuarray.Id_sup = userarray.id; iuarray.Id_shd = userarray.id; iuarray.Id_center = userarray.Id_center; iuarray.idcp = userarray.idcp; iuarray.clogo = userarray.clogo; iuarray.clabel = userarray.clabel; moment.updateLocale(userarray.lang, { months: Object.values(gvar[2]['lstmnthss']), weekdays: Object.values(gvar[2]['lstwekdys']), week: { dow: 1 } });
        switch (parseInt(userarray.Id_typeuser)) {
            case 1: case 2: case 3: case 4: case 5: case 6:
                scrnid['Dashboard'][12] = ['nsev', 'adate']; scrnid['Dashboard'][14] = ['id', 'id']; phys = 1;
                userpar['medfiles'].concat(userpar['psp']).map((a, i) => { if(scrnid['Details'][9][0][a]) { fdata = gvar[2][scrnid['Details'][9][0][a][0]]; scrnid['Details'][9][1].push([a, fdata], [a, fdata]); scrnid['Details'][10][1].push(i * 2 + 1); } });
                break;
            case 7: case 8:
                scrnid['Dashboard'][12] = ['Id_not', 'Id_not']; scrnid['Dashboard'][14] = ['Id_not', 'Id_not']; phys = 0; dash = userarray.ispo;
                break;
        }
        if (data.agcf) mnldr.showclose('flex', [3, null, data.device], null, { agcf: false, chgpass: data.chgpass }); else if (data.chgpass) mnldr.showclose('flex', [4, null, data.device, data.agcf], null, { pincode: '', pincode2: '' }); else { gvar[3] = userarray.id; this.rdash(data.device); } /*else if (!userarray.pincode) mnldr.showclose('flex', [0, null, data.device, data.agcf], null, { pincode: '' });*/ mntst.close();
    } AsyncStorage.multiSet([['gvar', JSON.stringify(gvar)]]).then((res) => { }); scrnid['Documentation'][1] = [[gvar[2][37017],gvar[2][37017]], [gvar[2][37018],gvar[2][37018]], [gvar[2][15300],gvar[2][15300]]];
}
export async function cleanapp(usrclk,mtxt,pre) {
    let ttxt = this.state.updapp[1][0]=='+' ? [[gvar[2][20035], 2], [gvar[2][20036], 2]] : mtxt;
    if(ttxt) mntst.show(mtxt); if (!isonline) mntst.show([[gvar[2][9024], 2]]); else if(!mtxt) setTimeout(() => { if(mntst.getst() != 'flex') mntst.show([[gvar[2][4505], 1]]); }, 400); if(pre) await this.prelogin(usrclk);
}
export async function grk(regkey, frce, im) {
    //let hp = await messaging().hasPermission(); if(hp == messaging.AuthorizationStatus.NOT_DETERMINED) await messaging().requestPermission();
    if(im) {
        await messaging().requestPermission({ alert: true, badge: true, sound: true, criticalAlert: true });
        await messaging().registerDeviceForRemoteMessages();
        await messaging().setAutoInitEnabled(true);
        messaging().onTokenRefresh(async (rky) => await grk(rky, 1));
    }
    if(!regkey) regkey = await messaging().getToken();
    if (regkey) devicedata[3] = regkey;
    if(frce && devicedata[3] && parseInt(userarray.id) > 0) {
        var fdata = new FormData(); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'regkey'); fdata.append('Id_login', userarray.id); fdata.append('Id_sup', userarray.Id_sup); fdata.append('deviceid', devicedata[0]); fdata.append('devicename', devicedata[2]); fdata.append('regkey', devicedata[3]); fdata.append('regtype', devicedata[1]); fetch(gvar[1][0] + gvar[1][5], { method: 'POST', body: fdata }).catch((error) => { });
    }
}
export function chglogin() {
    var ulogin = this.state.ulogin, upwd = this.state.upwd, sobj = {};
    if (!this.state.e24) { sobj.e20 = gvar[2][102]; sobj.e21 = gvar[2][506]; sobj.e22 = 20; sobj.e23 = false; sobj.e24 = true; sobj.e25 = Cnt.clrs.lbrdcolor; sobj.e26 = Cnt.clrs.footbg; sobj.e27 = 'default'; ulogin = ulogin.replace(/.(?=.{7,}$)/g, '*'); }
    else { sobj.e20 = gvar[2][102]; sobj.e21 = gvar[2][506]; sobj.e22 = 20; sobj.e23 = true; sobj.e24 = false; sobj.e25 = Cnt.clrs.dgraycolor; sobj.e26 = Cnt.clrs.lightbg; sobj.e27 = 'default'; } sobj.login = ulogin; sobj.pwd = upwd;
    this.setState(sobj, () => this.inputs[2].setNativeProps({ secureTextEntry: true }));
}
export function defpin(device) {
    var reqfld = {};
    if (!this.state.pincode) reqfld.pincode = 1;
    if (isempty(reqfld)) {
        var fdata = new FormData(), res;
        res = verifpincode(this.state.pincode, gvar[2][1026]);
        if (res == '') {
            Keyboard.dismiss(); mntst.show([[gvar[2][6600], 1, 1]], -1, 1); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'defpin'); fdata.append('Id_login', userarray.id); fdata.append('pincode', TRANS_ENCRYPT(this.state.pincode)); fdata.append('agrcons', this.state.agrcons); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]);
            fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
            .then((resp) => resp.json())
            .then((data) => {
                if (data) {
                    let csrn = crnscrn || dshscrn;
                    res = userarray.pincode != this.state.pincode ? [[gvar[2][37019], 1]] : userarray.consdate != this.state.agrcons ? [[gvar[2][19900], 1]] : null; userarray.pincode = this.state.pincode; userarray.consdate = this.state.agrcons; gvar[3] = userarray.id; userarray.pdate = data; userarray.Id_upd = userarray.id; mnldr.toggle(() => csrn.rdash(device, res));
                } else { mntst.show([[gvar[2][11209], 2]]); }
            }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); });
        } else { mntst.show([[res, 2]]); }
    } else { this.setState({ reqfld }, () => mntst.show([[gvar[2][1027], 2]])); }
}
export function chgpass(device, agcf) {
    var reqfld = {};
    if (!this.state.pincode) reqfld.pincode = 1; if (!this.state.pincode2) reqfld.pincode2 = 1;
    if (isempty(reqfld)) {
        var fdata = new FormData(), result = '', res = '', l7p, arrlen;
        if (!userarray.l7p) l7p = userarray.pwd; else {
            l7p = userarray.l7p.split(' '); arrlen = l7p.length;
            for (i = 0; i < arrlen; i++) if (this.state.pincode == l7p[i]) { res = 1; break; }
            if (res == '') { if (arrlen < 7) l7p = userarray.l7p; else l7p = l7p.slice(1).join(' '); l7p += ' ' + userarray.pwd; }
        }
        if (res == '' && this.state.pincode != userarray.pwd) {
            res = verifpwd(this.state.pincode, gvar[2][107]);
            if (res == '')
                if (this.state.pincode == this.state.pincode2) {
                    Keyboard.dismiss(); mntst.show([[gvar[2][6600], 1, 1]], -1, 1); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'chgpass'); fdata.append('Id_login', userarray.id); fdata.append('l7p', TRANS_ENCRYPT(l7p)); fdata.append('pwd', TRANS_ENCRYPT(this.state.pincode2)); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('gp4t', userarray.usertypes[userarray.Id_typeuser]['consentdirectory']);
                    fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
                    .then((resp) => resp.json())
                    .then((data) => {
                        if (data) {
                            let csrn = crnscrn || dshscrn;
                            userarray.pwd = this.state.pincode2; userarray.l7p = l7p; userarray.lsp = data; userarray.pdate = data; userarray.Id_upd = userarray.id; userarray.alocked = 0; userarray.active = 1; gvar[3] = userarray.id; if (agcf) mnldr.showclose('flex', [3, null, device], null, { agcf: false, chgpass: 1 }); else mnldr.toggle(() => csrn.rdash(device, [[gvar[2][37013], 1]]));
                        } else { mntst.show([[gvar[2][11209], 2]]); }
                    }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); });
                } else { mntst.show([[gvar[2][107] + ' ' + gvar[2][2300] + ' ' + gvar[2][105] + ': ' + gvar[2][109], 2]]); }
            else { mntst.show([[res, 2]]); }
        } else { mntst.show([[gvar[2][1020], 2]]); }
    } else { this.setState({ reqfld }, () => mntst.show([[gvar[2][202], 2]])); }
}
export function sagcf(device, dchgpass) {
    var reqfld = {};
    if (!this.state.agcf) reqfld.agcf = 1;
    if (isempty(reqfld)) {
        var fdata = new FormData();
        mntst.show([[gvar[2][6600], 1, 1]], -1, 1); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'sagcf'); fdata.append('Id_login', userarray.id); fdata.append('agcf', this.state.agcf); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]);
        fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
        .then((resp) => resp.json())
        .then((data) => {
            if (data) {
                let csrn = crnscrn || dshscrn;
                fdata = new FormData(); fdata.append('utoken', userarray.utoken); fdata.append('fct', 'pnotif'); fdata.append('alrtmails', userarray.alrtmails); fdata.append('infomails', userarray.infomails); fdata.append('admnmails', userarray.admnmails); fdata.append('alrtids', userarray.alrtids); fdata.append('infoids', userarray.infoids); fdata.append('admnids', userarray.admnids); fdata.append('ntext', gvar[2][94] + '\n' + gvar[2][95]); fdata.append('ntype', 13); fdata.append('wtype', 6); fdata.append('mpdfname', userarray.usertypes[userarray.Id_typeuser]['consentdirectory']); fdata.append('nochk', 1); fdata.append('nostl', 1); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('value', TRANS_ENCRYPT(userarray.value)); fdata.append('fname', TRANS_ENCRYPT(userarray.fname)); fdata.append('lname', TRANS_ENCRYPT(userarray.lname));
                fetch(gvar[1][0] + gvar[1][5] + '?timezone=' + userarray.timezone + '&smode=,2,&Id_login=' + userarray.id + '&Id_sender=&sId_typeuser=&svalue=&photo=&minfo=&Id_obj=ddm3&dir=' + userarray.usertypes[userarray.Id_typeuser]['consentdirectory'] + '&pdffile=' + userarray.usertypes[userarray.Id_typeuser]['consentpdf'] + '&nocookie=1', { method: 'POST', timeout: gvar[13][65], body: fdata }).then((resp) => resp.json()).then((pdta) => { sserver({ id: userarray.id, type: 'notif', conid: conid, users: pdta[6].split(','), data: { nid: pdta[2], idreceiver: pdta[6], id: '', Id_typeuser: userarray.Id_typeuser, value: '', photo: '', cpicon: '', minfo: '', date: pdta[3], mtext: pdta[7], mfile: '', ntype: 13, idconvpool: '', cmplct: '', webconf: '', status: '', wbicon: '', wcicon: '', wid: pdta[5][0][0], wdate1: pdta[5][0][1], wdate2: pdta[5][0][2], wdate3: pdta[5][0][3], winfo1: pdta[5][0][4], Id_obj: pdta[5][0][5] || 'ddm3', winfo3: pdta[5][0][6], wtype: pdta[5][0][7], wobj: pdta[5][0][8], wmedia: pdta[5][0][9]} }); if(pdta[1]) mntst.show(pdta[1]); });
                userarray.cfdate = data; userarray.pdate = data; if (dchgpass) mnldr.showclose('flex', [4, null, device], null, { pincode: '', pincode2: '' }); else mnldr.toggle(() => csrn.rdash(device, this.state.chgpass ? [[gvar[2][37013], 1]] : [[gvar[2][3707]/*gvar[2][19900]*/, 1]]));
            } else mntst.show([[gvar[2][11209], 2]]);
      }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); });
    } else { mntst.show([[gvar[2][5010], 2]]); if (this.mnwv) this.mnwv.injectJavaScript('window.scroll({top:document.body.scrollHeight,behavior:\"smooth\"});'); }
}
export function respass() {
    var reqfld = {};
    if (!this.state.lemail) reqfld.lemail = 1; if (!this.state.fdigit) reqfld.fdigit = 1; if (this.state.slogin && !this.state.login) reqfld.login = 1;
    if (isempty(reqfld)) {
        var fdata = new FormData(), glang = gl(), res = '';
        res = verifemail(this.state.lemail, gvar[2][137014]); if (res != '') { mntst.show([[res, 2]]); return; }
        mntst.show([[gvar[2][6600], 1, 1]], -1, 1);
        fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'respass'); fdata.append('lemail', TRANS_ENCRYPT(this.state.lemail)); fdata.append('fdigit', this.state.fdigit); fdata.append('login', TRANS_ENCRYPT(this.state.login)); fdata.append('lang', glang);
        fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
        .then((resp) => resp.json())
        .then((data) => {
            if (data) {
                let csrn = crnscrn || dshscrn;
                if (data.res == 1) mnldr.toggle(() => mntst.show([[data.msg, 1]])); else mnldr.setState({ slogin: data.res == -3 ? 1 : null, login: csrn ? csrn.state.ulogin || '' : '' }, () => mntst.show([[data.msg, 2]]));
            } else mntst.show([[gvar[2][11209], 2]]);
        }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); });
    } else { this.setState({ reqfld }, () => mntst.show([[gvar[2][202], 2]])); }
}
export function actdev(device) {
    if (this.changeeval[7]) {
        var fdata = new FormData(), deviceid0 = [], deviceid1 = [], deviceid2 = [];
        mntst.show([[gvar[2][6600], 1, 1]], -1, 1);
        Object.keys(device).map((key) => {
            //if(this.state.tempvar[key] == 0) deviceid0.push(key); else
            if (this.state.tempvar[key] == 1) deviceid1.push(key); else if (this.state.tempvar[key] == 2) deviceid2.push(key);
        });
        fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'actdev'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]);
        //if(deviceid0.length) fdata.append('deviceid0', "'"+deviceid0.join("','")+"'");
        if (deviceid1.length) fdata.append('deviceid1', "'" + deviceid1.join("','") + "'");
        if (deviceid2.length) fdata.append('deviceid2', "'" + deviceid2.join("','") + "'");
        fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
        .then((resp) => resp.json())
        .then((data) => {
            if (data) {
                mnldr.toggle(() => mntst.show([[gvar[2][19900], 1]]));
            } else { mntst.show([[gvar[2][11209], 2]]); }
        }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); });
    } else mnldr.toggle();
}
export function fileicn(dname, fext) {
    if (!fext && dname) fext = dname.substring(dname.lastIndexOf('.') + 1).toLowerCase();
    if(gvar[13]['fileicn'] && gvar[13]['fileicn'][fext]) return gvar[13]['fileicn'][fext]; else {
        var icn;
        switch (fext) {
            case 'pdf': icn = 'file-pdf'; break;
            case 'csv': icn = 'file-csv'; break;
            case 'jpg': case 'gif': case 'png': case 'jpeg': icn = 'file-image'; break;
            case 'mp1': case 'mp2': case 'mp3': case 'mpg': case 'wav': case 'm4a': case 'oga': case 'ogg': icn = 'file-audio'; break;
            case 'mp4': case 'm4v': case 'webm': case 'ogv': case 'mpeg': icn = 'file-video'; break;
            case 'xls': case 'xlsx': icn = 'file-excel'; break;
            case 'ppt': case 'pptx': case 'pptm': icn = 'file-powerpoint'; break;
            case 'doc': case 'docx': icn = 'file-word'; break;
            case 'htm': case 'html': icn = 'html5'; break;
            case 'http': case 'https': case 'com': case 'net': case 'org': case 'app': case 'fr': case 'uk': icn = 'globe'; break;//globe,link,external-link-alt,external-link-square-alt
            case 'ftp': icn = 'file-download'; break;
            default: icn = 'file';
        } return icn;
    }
}
export function tabicn(otab) {
    if(gvar[13]['tabicn'] && gvar[13]['tabicn'][otab]) return gvar[13]['tabicn'][otab]; else {
        var icn;
        switch (parseInt(otab)) {
            case 1: icn = 'comments'; break;//comment-dots,comment
            case 2: icn = 'user'; break;
            case 60: icn = 'tasks'; break;//walking,tasks
            case 104: icn = 'calendar-alt'; break;
            case 140: icn = 'diagnoses'; break;
            case 128: icn = 'user-injured'; break;
            case 129: icn = 'briefcase-medical'; break;//pills,briefcase-medical
            case 143: icn = 'pills'; break;//pills,allergies,syringe,prescription-bottle-alt,capsules
            case 141: icn = 'procedures'; break;//procedures,cut,bed,band-aid
            case 139: icn = 'edit'; break;
            case 137: icn = 'file-alt'; break;//file-contract,file-alt,file-medical-alt
            case 61: icn = 'user-nurse'; break;//hand-holding-heart,hands,user-nurse
            case 54: icn = 'hand-holding-heart'; break;//list-ol,business-time,openid,recycle,share-square,hands,hand-holding-heart
            case 55: icn = 'file-alt'; break;
            case 56: icn = 'bell'; break;
            case 57: icn = 'list-ol'; break;
            case 38: icn = 'chart-bar'; break;//chart-bar,chart-line,chart-area
            default: icn = 'pager';
        } return icn;
    }
}
export function noticn(ntype) {
    if(gvar[13]['noticn'] && gvar[13]['noticn'][ntype]) return gvar[13]['noticn'][ntype]; else {
        var icn;
        switch (parseInt(ntype)) {
            case 1: icn = 'comments'; break;//comment-dots,comment
            case 2: icn = 'calendar-plus'; break;
            case 4: case 5: icn = 'user-clock'; break; //bell,clock,user-clock
            case 6: case 51: case 61: case 71: icn = 'calendar-day'; break;
            case 7: case 50: case 60: case 70: icn = 'calendar-minus'; break;
            case 8: case 58: case 127: case 128: case 137: case 138: case 147: case 148: icn = 'file-alt'; break;
            case 10: icn = 'calendar-check'; break;
            case 13: icn = 'handshake'; break;
            case 15: icn = 'calendar-day'; break;
            case 17: icn = 'exclamation-triangle'; break;
            case 18: case 56: case 123: case 124: case 133: case 134: case 143: case 144: icn = 'tasks'; break;
            case 19: case 57: case 125: case 126: case 135: case 136: case 145: case 146: icn = 'list-ol'; break;
            case 20: icn = 'video'; break;
            case 21: icn = 'radiation-alt'; break; //radiation-alt,user-injured
            case 22: icn = 'ban'; break;
            case 23: case 24: case 52: case 62: case 72: icn = 'phone-square'; break;
            case 31: case 32: case 33: icn = 'user-slash'; break; //user-lock,user-slash,
            case 36: case 37: case 38: case 46: case 47: case 48: icn = 'user-times'; break;//user-times,history
            default: icn = 'exclamation-circle';
        } return icn;
    }
}
export function walicn(wtype) {
    if(gvar[13]['walicn'] && gvar[13]['walicn'][wtype]) return gvar[13]['walicn'][wtype]; else {
        var icn;
        switch (parseInt(wtype)) {
            case 1: icn = 'laugh'; break;
            case 2: icn = 'info-circle'; break;
            case 3: icn = 'exclamation-triangle'; break;
            case 4: icn = 'info-circle'; break;
            case 5: icn = 'exclamation-triangle'; break;
            case 6: icn = 'handshake'; break;
            case 8: case 38: case 68: icn = 'file-alt'; break;
            case 19: case 49: case 79: icn = 'list-ol'; break;
            case 18: case 48: case 78: icn = 'tasks'; break;
            default: icn = 'exclamation-circle';
        } return icn;
    }
}
export function srhlpg(srkey, flkey, ldng) {
    var rtn = this.props.route.name, sobj = {}, cbfct, data = [], skey, issrch, tempv, arrlen, physd = rtn == 'Dashboard' && phys; if (isnull(flkey)) flkey = this.state.flkey; if (ldng) srkey = this.state.srkey; skey = srkey.trim(); issrch = skey && skey.length > 1;
    if (physd) {
        if (issrch) this.setState({ fload: -1, srkey }, () => this.loadlpg(3)); else {
            sobj['srkey'] = srkey; sobj['fload'] = 0; if (!lstpages[rtn] || !lstpages[rtn][flkey] || !lstpages[rtn][flkey].data) cbfct = () => this.loadlpg(1); else sobj['data'] = lstpages[rtn][flkey].data.map((value) => ({ ...value })); /*JSON.parse(JSON.stringify(lstpages[rtn][flkey].data));*/ this.setState(sobj, cbfct);
        }
    } else if (lstpages[rtn][flkey] && lstpages[rtn][flkey].data) {
        if (issrch) {
            tempv = skey.toLowerCase().split(' '); arrlen = tempv.length;
            switch (rtn) {
                case 'Dashboard':
                    lstpages[rtn][flkey].data.map((value, j) => { for (i = 0; i < arrlen; i++) if (value.winfo3.toLowerCase().indexOf(tempv[i]) != -1 || value.wdate1.indexOf(tempv[i]) != -1 || value.wobj.toLowerCase().indexOf(tempv[i]) != -1 || gvar[2]['lstwaltyp'][value.wtype].toLowerCase().indexOf(tempv[i]) != -1) data.push(Object.assign({}, value)); });
                    break;
                case 'Messenger':
                    lstpages[rtn][flkey].data.map((value, j) => { for (i = 0; i < arrlen; i++) if ((value.cpname && value.cpname.toLowerCase().indexOf(tempv[i]) != -1) || value.fname.toLowerCase().indexOf(tempv[i]) != -1 || value.lname.toLowerCase().indexOf(tempv[i]) != -1) data.push(Object.assign({}, value)); });
                    break;
                case 'Instructions':
                    lstpages[rtn][flkey].data.map((value, j) => { for (i = 0; i < arrlen; i++) if (value.dlid.toLowerCase().indexOf(tempv[i]) != -1 || value.qdate.indexOf(tempv[i]) != -1 || value.url.toLowerCase().indexOf(tempv[i]) != -1 || value.idesc.toLowerCase().indexOf(tempv[i]) != -1 || value.details.toLowerCase().indexOf(tempv[i]) != -1 || gvar[2]['lstdoclnk'][value.itype].toLowerCase().indexOf(tempv[i]) != -1) data.push(Object.assign({}, value)); });
                    break;
            }
            if (!data.length && this.state.ldmr && !this.inreq) { sobj['fload'] = -1; cbfct = () => this.loadlpg(3); }
        } else {
            switch (rtn) {
                case 'Details':
                    tempv = true;
                    break;
                default:
                    tempv = false;
            }
            if (tempv) {
                data = []; lstpages[rtn][flkey].data.map((osec, osid) => { data[osid] = []; data[osid] = lstpages[rtn][flkey].data[osid].map((value) => ({ ...value })); });
            } else { data = lstpages[rtn][flkey].data.map((value) => ({ ...value })); /*JSON.parse(JSON.stringify(lstpages[rtn][flkey].data));*/ }
        }
        if (ldng) return data; else { sobj['data'] = data; sobj['srkey'] = srkey; this.setState(sobj, cbfct); }
    } else this.setState({ srkey });
}
export function srtlpg(sort, sord) {
    if(!sort) sort = this.state.sort; if(!sord) sord = this.state.sord;
    if (sort)
        switch (sort) {
            case 'perc':
            case 'Id_msg':
            case 'Id_not':
            case 'mstate':
            case 'ntype':
            case 'wtype':
            case 'itype':
                if (sord == 'DESC') return this.state.data.sort((a, b) => parseFloat(b[sort]) - parseFloat(a[sort]));
                else return this.state.data.sort((a, b) => parseFloat(a[sort]) - parseFloat(b[sort]));
                break;
            default:
                if(Platform.OS === 'ios')
                    if (sord == 'DESC') return this.state.data.sort((a, b) => b[sort].localeCompare(a[sort], undefined, { numeric: true, sensitivity: 'base' }));
                    else return this.state.data.sort((a, b) => a[sort].localeCompare(b[sort], undefined, { numeric: true, sensitivity: 'base' }));
                else
                    if (sord == 'DESC') return this.state.data.sort((a, b) => b[sort].localeCompare(a[sort]));
                    else return this.state.data.sort((a, b) => a[sort].toLowerCase().localeCompare(b[sort].toLowerCase()));
        } else return this.state.data;
}
export function initlpg(flkey, noinit, osort, osord) {
    var rtn = this.props.route.name, epta = scrnid[rtn][1].length, arrlen = scrnid[rtn][5].length, sobj = {}, doinit = false, rdrct = false, tempv = false, secst, qtipl;
    if (scrnid[rtn][2].toString().substr(0,1) == '-') { rdrct = true; scrnid[rtn][2] = Math.abs(scrnid[rtn][2]); }
    flkey = Math.abs(flkey); sobj['sort'] = osort || scrnid[rtn][12][flkey];
    switch (rtn) {
        case 'Chatroom':
            this.changsec = new Array(epta); for (i = 0; i < epta; i++) { this.changsec[i] = false; }
            break;
        case 'Questions':
        case 'Tasks':
        case 'Profile':
            this.changsec = new Array(epta); this.reqsec = new Array(epta); qtipl = new Array(epta); for (i = 0; i < epta; i++) { qtipl[i] = []; this.changsec[i] = false; this.reqsec[i] = []; }
            sobj['qtipl'] = qtipl; sobj['qidx'] = 1; sobj['sldng'] = null;
            break;
        case 'Details':
            secst = new Array(epta); this.fetsec = new Array(epta); this.changsec = new Array(epta); this.reqsec = new Array(epta); for (i = 0; i < epta; i++) { secst[i] = []; this.fetsec[i] = []; this.changsec[i] = false; this.reqsec[i] = []; }
            sobj['secst'] = secst; tempv = true;
            break;
        case 'Analytics':
            secst = new Array(epta); this.fetsec = new Array(epta); this.changsec = new Array(epta); this.reqsec = new Array(epta); qtipl = new Array(epta); for (i = 0; i < epta; i++) { secst[i] = []; this.fetsec[i] = []; this.changsec[i] = false; this.reqsec[i] = []; qtipl[i] = []; }
            sobj['secst'] = secst; sobj['qtipl'] = qtipl;
            break;
    }
    if (!lstpages[rtn] || noinit == 4) { if (!lstpages[rtn]) { flkey = rdrct ? scrnid[rtn][2] : Cnt.ost2.flkey; } lstpages[rtn] = new Array(epta); for (i = 0; i < epta; i++) lstpages[rtn][i] = {}; doinit = true; } else if (!noinit || noinit < 0) { lstpages[rtn][flkey] = { data: [] }; doinit = true; }
    if (doinit) { for (i = 0; i < arrlen; i++) if (isempty(scrnid[scrnid[rtn][5][i]][4][0]) || noinit == 4/* || noinit < 0*/) { lstpages[scrnid[rtn][5][i]] = null; scrnid[scrnid[rtn][5][i]][4][0] = {}; } }
    if (noinit != 4) {
        if (lstpages[rtn][flkey].data)
            if (tempv) {
                sobj['data'] = []; lstpages[rtn][flkey].data.map((osec, osid) => { sobj['data'][osid] = []; sobj['data'][osid] = lstpages[rtn][flkey].data[osid].map((value) => ({ ...value })); });
            } else { sobj['data'] = lstpages[rtn][flkey].data.map((value) => ({ ...value })); /*JSON.parse(JSON.stringify(lstpages[rtn][flkey].data));*/ }
        else sobj['data'] = null;
    }
    sobj['mload'] = Date.now(); sobj['flkey'] = flkey; sobj['sord'] = osord || 'DESC'; if (scrnid[rtn][11]) sobj['svo'] = scrnid[rtn][11]; else sobj['svo'] = dimsz[20];
    this.dsrc = [[], [], []]; return sobj;
}
export function rstlpg(rtn, scrl) { scrl[0] = true; scrnid[rtn][3] = null; scrnid[rtn][13][3] = null; }
export async function loadlpg(ldng, rfrsh, osort, osord, cbfct) {
    var rtn = this.props.route.name, flkey = this.state.flkey, srkey = this.state.srkey, skey = srkey.trim(), issrch = skey && skey.length > 1, physd = rtn == 'Dashboard' && phys, arrlen = false, ofst, mld, extf, csrn = crnscrn || dshscrn, scnm = csrn ? csrn.props.route.name : null, yload = !scrnid[rtn][10][flkey], cfct = [() => { try { delete this.inreq; } catch (error) { } }];
    if (ldng == 1 || rtn == scnm) {
        if (rfrsh == 1) ldng = 4; if (ldng == 4) extf = 3;
        if (this.state.fload < 1) {
            this.inreq = Date.now();
            var fdata = new FormData(), ilpg = false, scrl = [], extp = '', sobj = {}, tempv = 1; fdata.append('inreq', this.inreq);
            if (physd && issrch) {
                switch (ldng) {
                    case 1: case 4: case 3:
                        sobj = { data: [] }; rstlpg(rtn, scrl);
                        break;
                } mld = ldng == 2; ofst = this.state.data ? this.state.data.length : 0;
            } else {
                switch (ldng) {
                    case 1:
                    case 4:
                        sobj = this.initlpg(flkey, ldng == 4 ? ldng : rfrsh ? rfrsh == -1 ? null : rfrsh > 0 ? -ldng : ldng : null, osort, osord);
                        ilpg = true; rstlpg(rtn, scrl);
                        break;
                    case 3:
                        scrl[0] = true;
                        break;
                } mld = Math.abs(ldng) == 2 || ldng == 3; ofst = lstpages[rtn][flkey].data ? lstpages[rtn][flkey].data.length : 0;
            }
            if (this.isloaded) this.setState(Object.assign({ fload: ldng, ldmr: false }, sobj), cbfct);
            if (yload) {
                fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'g' + rtn); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('flkey', flkey); if (sobj['sort']) { fdata.append('sort', sobj['sort']); fdata.append('sord', sobj['sord']); } else { fdata.append('sort', this.state.sort); fdata.append('sord', this.state.sord); } fdata.append('uid', scrnid[rtn][4][0].id);
                switch (rtn) {
                    case 'Dashboard':
                        switch (parseInt(userarray.Id_typeuser)) {
                            case 1: case 2: case 3: case 4: case 5: case 6:
                                if (issrch) { skey = skey.toLowerCase().split(' '); tempv = ''; arrlen = skey.length; (flkey == 0 ? surglist : aparray).map((value, j) => { for (i = 0; i < arrlen; i++) if (value.fname.toLowerCase().indexOf(skey[i]) != -1 || value.lname.toLowerCase().indexOf(skey[i]) != -1) { tempv += ',' + value.id; break; } }); arrlen = true; }
                                fdata.append('patids', tempv == 1 ? flkey == 0 ? cpids : patids : tempv.substring(1)); fdata.append('gp16', userarray['fupdur']); fdata.append('gp21', gvar[13][21]); //fdata.append('myusers', myusers);
                                break;
                            case 7: case 8:
                                /*if (ofst > 0) ofst = lstpages[rtn][flkey].data[ofst - 1].Id_not;*/
                                /*fdata.append('ntype', scrnid['Dashboard'][4][5][flkey][0]); fdata.append('wtype', scrnid['Dashboard'][4][5][flkey][1]);*/
                                break;
                        }
                        break;
                    case 'Appointments':
                        if (ofst > 0) ofst = lstpages[rtn][flkey].data[ofst - 1].Id_plan;
                        break;
                    case 'Notifications':
                        if (ofst > 0) ofst = lstpages[rtn][flkey].data[ofst - 1].Id_not;
                        break;
                    case 'Chatroom':
                        if (ofst > 0) ofst = lstpages[rtn][flkey].data[ofst - 1].Id_msg;
                        fdata.append('Id_target', scrnid[rtn][4][0].id);
                        break;
                    case 'Messenger':
                        if (ofst > 0) ofst = lstpages[rtn][flkey].data[0].lmsg;
                        if(scrnid[rtn][13][3]) { if(scrnid[rtn][13][3][0].length > 0) extp += " AND Id_cp NOT IN ("+ scrnid[rtn][13][3][0].join(',') +")"; if(scrnid[rtn][13][3][1].length > 0) extp += " AND Id_receiver NOT IN ("+ scrnid[rtn][13][3][1].join(',') +")"; }
                        break;
                    case 'Questions':
                    case 'Tasks':
                        if (ofst > 0) ofst = lstpages[rtn][flkey].data[ofst - 1].idqr;
                        fdata.append('gp22', gvar[13][22]); fdata.append('gp23', gvar[13][23]);
                        break;
                    case 'Reminders':
                        fdata.append('myusers', scrnid[rtn][4][0].id);
                        break;
                    case 'Details':
                    case 'Analytics':
                        fdata.append('idmp', scrnid[rtn][4][0].idmp); fdata.append('gp16', userarray['fupdur']); fdata.append('gp21', gvar[13][21]);
                        break;
                } if (!mld) ofst = 0;
                if (tempv != '') {
                    fdata.append('extp', extp);
                    fetch(gvar[1][0] + gvar[1][1] + '?limit=' + gvar[13][14] + '&offset=' + ofst, { method: 'POST', timeout: gvar[13][65], body: fdata })
                    .then((resp) => resp.json())
                    .then((data) => {
                        tempv = { edata: null }; sobj = this.inreq == fdata._parts[0][1]; srkey = this.state.srkey.trim(); issrch = srkey && srkey.length > 1;
                        if (data) { if (rtn != 'Documentation') { data = JSON.parse(TRANS_DECRYPT(data)); if (!Array.isArray(data)) { tempv['edata'] = data; data = []; } } } else data = []; ofst = data.length;
                        if (mld) { if (arrlen && sobj) data = this.state.data.concat(data); else data = lstpages[rtn][flkey].data.concat(data); }
                        if (ofst > 0 && !issrch) { tempv['mload'] = Date.now(); }
                        if (sobj) {
                            if (ilpg) {
                                switch (rtn) {
                                    case 'Chatroom':
                                        if (scrnid[rtn][13][0] == 1 || ofst == 0) setTimeout(() => { this.inputs[0].focus(); scrnid[rtn][13][0] = null; }, 0);
                                        break;
                                    case 'Details':
                                        scrnid[rtn][4][0].idmp=0;
                                        break;
                                    case 'Analytics':
                                        if (rfrsh != 1 && ofst > 0 && flkey == 0) cfct.push(() => mntst.show([[dmns.lrgs ? gvar[2][57020] : gvar[2][5701], 1]], 1000));
                                        break;
                                }
                            } //srtlpg() if (this.state.sort)
                            tempv['fload'] = 0; if(this.state.rfp) tempv['rfp'] = -1; if (!mld || ofst > 0) tempv['ldmr'] = true;
                            if (arrlen) { tempv['data'] = data.map((value) => ({ ...value })); } else { if (rtn != 'Documentation') { lstpages[rtn][flkey].data = data; if (physd) tempv['data'] = data.map((value) => ({ ...value })); else tempv['data'] = this.srhlpg('', flkey, 1); } else docu(data, rtn, flkey, tempv); }
                        } else { if (!arrlen) { if (rtn != 'Documentation') lstpages[rtn][flkey].data = data; else docu(data, rtn, flkey, tempv); } }
                        if(scrnid[rtn][13][0] && typeof scrnid[rtn][13][0] === 'function') { cfct.push(scrnid[rtn][13][0]); scrnid[rtn][13][0]=null; }
                        if(scrnid[rtn][15]) { let abcd = scrnid[rtn][15]; cfct.push(() => this.tosec(abcd)); scrnid[rtn][15] = null; }
                        if (!isempty(tempv)) {
                            sobj = [tempv, () => { cfct.map((fxt) => fxt()); setTimeout(() => { /*updtabs(null, null, [rtn], [flkey], data); if (ofst > 0 && scrl[0]) if (this.mnscrlvw) try { this.mnscrlvw.scrollToOffset({ offset: 0, animated: true }); } catch (error) { try { this.mnscrlvw.scrollTo({ y: 0, animated: true }); } catch (error) { } }*/ setTimeout(() => { var robj = {}; if(this.state.rfp == -1) robj['rfp'] = false; if (this.isloaded) if (!isempty(robj)) this.setState(robj); }, 400); }, 0); this.precase(extf || 2); if (ofst > 0 && issrch && !physd) this.loadlpg(-2); }, flkey];
                            if (this.isloaded && flkey == this.state.flkey) { this.setState(sobj[0], sobj[1]); } else scrnid[rtn][3] = sobj;
                        }
                    }).catch((error) => { if (this.isloaded && this.inreq == fdata._parts[0][1]) this.setState({ fload: -3, data: [] }, () => { delete this.inreq; scrnid[rtn][3] = 1; }); });
                } else { if (this.isloaded && this.inreq == fdata._parts[0][1]) this.setState({ fload: 0, data: [] }, () => { delete this.inreq; }); }
            } else {
                tempv = {}; tempv['fload'] = 0; if(this.state.rfp) tempv['rfp'] = -1; tempv['mload'] = Date.now();
                if (this.inreq == fdata._parts[0][1]) cfct.push(() => { delete this.inreq; });
                switch (rtn) {
                    case 'Profile':
                        if(isempty(scrnid[rtn][4][0])) scrnid[rtn][4][0] = userarray;
                        issrch = parseInt(scrnid[rtn][4][0].id); mld = parseInt(userarray.id) > 0 ? scrnid[rtn][4][0].id == userarray.id ? userarray : issrch < 0 && issrch > -10 ? scrnid[rtn][4][0] : await finduser(scrnid[rtn][4][0].id, null, null, 1) : scrnid[rtn][4][0];
                        ofst = await finduser(mld.Id_sup, null); scrnid[rtn][4][0] = mld;
                        tempv['data'] = [Object.assign({ isup: ofst ? setval(ofst) : null, dtb: false, reqfld: {} }, mld)]; lstpages[rtn][flkey].data = tempv['data'].map((value) => ({ ...value }));
                        break;
                    default:
                        tempv['data'] = [];
                }
                if(scrnid[rtn][15]) { let abcd = scrnid[rtn][15]; cfct.push(() => this.tosec(abcd)); scrnid[rtn][15] = null; }
                sobj = [tempv, () => { cfct.map((fxt) => fxt()); setTimeout(() => { var robj = {}; if(this.state.rfp == -1) robj['rfp'] = false; if (this.isloaded) if (!isempty(robj)) this.setState(robj); }, 400); }];
                if (this.isloaded && flkey == this.state.flkey) this.setState(sobj[0], sobj[1]); else scrnid[rtn][3] = sobj;
            }
        }
    }
}
export function docu(docu, rtn, flkey, tempv) {
    scrnid[rtn][1] = []; if(docu) Object.keys(docu).map((key, i) => {
        scrnid[rtn][1][i] = [key,key]; lstpages[rtn][i].data = [];
        Object.keys(docu[key]).forEach(function (dkey) {
            lstpages[rtn][i].data.push({ idesc: dkey, url: docu[key][dkey] });
        });
    }); tempv['data'] = lstpages[rtn][flkey].data.map((value) => ({ ...value }));;
}
export function stslpg(srh) {
    var etxt, ldng = <View style={[{ height: dimsz[9], marginTop: dimsz[4], alignSelf: 'center' }]}><Image source={loadind} style={[Stl.image]} /></View>;
    switch (parseInt(this.state.fload)) {
        /*case -4: case 4:
            if (!srh) etxt = gvar[2][45020] + '...';
            break;*/
        case -1: case 3:
            if (srh) etxt = gvar[2][45019] + '...';
            break;
    }
    //if(!etxt && this.state.rfp && this.state.rfp != -1) etxt = gvar[2][45020] + '...';
    return (etxt ? <View key={'sts0'} style={[Stl.nodata, /*Stl.sepdiv,*/ { padding: dimsz[2], justifyContent: 'center' }]}><Text style={[Stl.alrttxt, { fontSize: dimsz[1] }]}>{etxt.toUpperCase()}</Text>{ldng}</View> : null);
}
export function fotlpg() {
    var rtn = this.props.route.name, exstl, etxt = null, ldng = <View style={[{ height: dimsz[9], marginTop: dimsz[4], alignSelf: 'center' }]}><Image source={loadind} style={[Stl.image]} /></View>;
    switch (rtn) {
        case 'Questions':
        case 'Tasks':
            exstl = { width: dmns.width };
            break;
    }
    switch (parseInt(this.state.fload)) {
        case -2:
            etxt = <View style={[Stl.nodata, /*Stl.sepdiv,*/ { padding: dimsz[2], justifyContent: 'center', backgroundColor: Cnt.clrs.blackcolor }, exstl]}>{ldng}</View>;
            break;
        case 2:
            etxt = <View style={[Stl.nodata, /*Stl.sepdiv,*/ { padding: dimsz[2], justifyContent: 'center', backgroundColor: Cnt.clrs.blackcolor }, exstl]}><Text style={[Stl.alrttxt, { fontSize: dimsz[1] }]}>{gvar[2][192017].toUpperCase() + '...'}</Text>{ldng}</View>;
            break;
    }
    return etxt;
}
export function eptlpg(exstl, eptxt, tfs, isept, ikey) {
    var rtn = this.props.route.name, etxt, ldng, v1, v2, rfc, drfc = <RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.state.rfp && this.state.rfp != -1} onRefresh={() => { if (!this.state.rfp) this.setState({ rfp: true, fload: -4 }, () => this.orfrsh(1)); }} />; exstl = exstl.style;
    switch (rtn) {
        case 'Caregivers':
            v2 = [gvar[2][61013]];
            break;
        case 'Chatroom':
            v2 = [gvar[2][10301]];
            break;
        case 'Dashboard':
            v2 = phys ? [gvar[2][4502], gvar[2][4502]] : [gvar[2][48019], gvar[2][48023]];
            break;
        case 'Instructions':
            v2 = [gvar[2][55015], gvar[2][55015], gvar[2][55015]];
            break;
        case 'Messenger':
            v2 = [gvar[2][45023]];
            break;
        case 'Notifications':
            v2 = [gvar[2][10501], gvar[2][48023]];
            break;
        case 'Questions':
            v1 = { width: dmns.width }; v2 = [gvar[2][54023]+(this.state.edata?'\n\n'+gvar[2][115]:'')]; rfc = drfc;
            break;
        case 'Tasks':
            v1 = { width: dmns.width }; v2 = [gvar[2][54024]]; rfc = drfc;
            break;
        case 'Reminders':
            v2 = [gvar[2][1304], gvar[2][1304]];
            break;
        case 'Profile':
            v2 = [null, null, gvar[2][36014]];
            break;
    } if(!exstl) exstl = v1; if(isempty(eptxt)) eptxt = v2;
    if (isept) etxt = eptxt && eptxt[this.state.flkey] ? eptxt[this.state.flkey] : gvar[2][14500]; else {
        ldng = <View style={[{ height: dimsz[18], marginTop: dimsz[0], alignSelf: 'center' }]}><Image source={loadind} style={[Stl.image]} /></View>;
        switch (parseInt(this.state.fload)) {
            case 1:
                etxt = gvar[2][192011] + '...';
                break;
            case -3:
                etxt = gvar[2][11209]; ldng = null;
                break;
            case 0: case 2:
                etxt = this.state.srkey == '' && eptxt && eptxt[this.state.flkey] ? eptxt[this.state.flkey] : gvar[2][14500]; ldng = null;
                break;
        }
    }
    return (etxt ? <ScrollView key={isept || ikey || 'ept0'} contentContainerStyle={[Stl.svcont, Stl.nodata, { padding: dimsz[6], flex: 1, justifyContent: 'center' }]} style={exstl} refreshControl={rfc}><Text style={[Stl.alrttxt, { fontSize: tfs || dimsz[0] }]}>{etxt.toUpperCase()}</Text>{ldng}</ScrollView> : null);
}
export function hedlpg() {
    var rtn = this.props.route.name, srkey = this.state.srkey, hdr = [], ldlp = srkey != '' || (lstpages[rtn] && lstpages[rtn][this.state.flkey] && lstpages[rtn][this.state.flkey].data && lstpages[rtn][this.state.flkey].data.length), estl = { paddingVertical: dmns.h };
    switch (rtn) {
        case 'Dashboard':
            if (ldlp) hdr.push(<View key={0} style={[Stl.itmhdiv, { borderRadius: Cnt.prps.borderradiusxlrg, backgroundColor: Cnt.clrs.footbg }]}><Icon2 name="search" style={[Stl.dbcolor, { fontSize: dimsz[10], paddingHorizontal: dimsz[0], paddingVertical: dimsz[4] }]} /><TextInput key={1} ref={(ref) => this.inputs[0] = ref} keyboardType={inpttyp} textContentType="none" autoFill={false} autoCompleteType="off" onChangeText={(value) => this.srhlpg(value)} value={srkey} placeholder={phys ? gvar[2][67022] : this.state.flkey == 0 ? gvar[2][48033] : gvar[2][48034]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.dbrdcolor} style={[Stl.srinpt, { width: dmns.w60, height: dimsz[14], fontSize: dimsz[1], paddingVertical: dmns.h }]} maxLength={100} returnKeyType="search" onSubmitEditing={() => this.srhlpg(srkey)} />{srkey == '' ? <View key={2} style={{ width: dimsz[9] }}></View> : <TouchableOpacity key={2} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.srhlpg('')} style={{ width: dimsz[9] }}><Icon2 name="times" style={[Stl.uicon, { fontSize: dimsz[10], padding: dimsz[4] }]} /></TouchableOpacity>}</View>, <TouchableOpacity key={1} activeOpacity={Cnt.prps.tchblopcty} ref={(ref) => this.inputs[1] = ref} onPress={() => mnlst.showclose('flex', 1)}><Icon2 name="sort" style={[Stl.uicon, { fontSize: dimsz[6], padding: dimsz[4] }]} /></TouchableOpacity>);
            break;
        case 'Messenger':
            hdr.push(<View key={0} style={[Stl.itmhdiv, { borderRadius: Cnt.prps.borderradiusxlrg, backgroundColor: Cnt.clrs.footbg }]}><Icon2 name="search" style={[Stl.dbcolor, { fontSize: dimsz[10], paddingHorizontal: dimsz[0], paddingVertical: dimsz[4] }]} /><TextInput key={1} ref={(ref) => this.inputs[0] = ref} keyboardType={inpttyp} textContentType="none" autoFill={false} autoCompleteType="off" onChangeText={(value) => this.srhlpg(value)} value={srkey} placeholder={gvar[2][45037]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.dbrdcolor} style={[Stl.srinpt, { width: dmns.w60, height: dimsz[14], fontSize: dimsz[1], paddingVertical: dmns.h }]} maxLength={100} returnKeyType="search" onSubmitEditing={() => this.srhlpg(srkey)} />{srkey == '' ? <View key={2} style={{ width: dimsz[9] }}></View> : <TouchableOpacity key={2} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.srhlpg('')} style={{ width: dimsz[9] }}><Icon2 name="times" style={[Stl.uicon, { fontSize: dimsz[10], padding: dimsz[4] }]} /></TouchableOpacity>}</View>, <TouchableOpacity key={1} activeOpacity={Cnt.prps.tchblopcty} ref={(ref) => this.inputs[2] = ref} onPress={() => mnlst.showclose('flex', 2)}><Icon2 name="chevron-down" style={[Stl.uicon, { fontSize: dimsz[6], padding: dimsz[4] }]} /></TouchableOpacity>);
            break;
        case 'Instructions':
            if (ldlp) hdr.push(<View key={0} style={[Stl.itmhdiv, { borderRadius: Cnt.prps.borderradiusxlrg, backgroundColor: Cnt.clrs.footbg }]}><Icon2 name="search" style={[Stl.dbcolor, { fontSize: dimsz[10], paddingHorizontal: dimsz[0], paddingVertical: dimsz[4] }]} /><TextInput key={1} ref={(ref) => this.inputs[0] = ref} keyboardType={inpttyp} textContentType="none" autoFill={false} autoCompleteType="off" onChangeText={(value) => this.srhlpg(value)} value={srkey} placeholder={gvar[2][45038]} autoCapitalize="none" autoCorrect={false} placeholderTextColor={Cnt.clrs.dbrdcolor} style={[Stl.srinpt, { width: dmns.w60, height: dimsz[14], fontSize: dimsz[1], paddingVertical: dmns.h }]} maxLength={100} returnKeyType="search" onSubmitEditing={() => this.srhlpg(srkey)} />{srkey == '' ? <View key={2} style={{ width: dimsz[9] }}></View> : <TouchableOpacity key={2} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.srhlpg('')} style={{ width: dimsz[9] }}><Icon2 name="times" style={[Stl.uicon, { fontSize: dimsz[10], padding: dimsz[4] }]} /></TouchableOpacity>}</View>, <TouchableOpacity key={1} activeOpacity={Cnt.prps.tchblopcty} ref={(ref) => this.inputs[3] = ref} onPress={() => mnlst.showclose('flex', 3)}><Icon2 name="sort" style={[Stl.uicon, { fontSize: dimsz[6], padding: dimsz[4] }]} /></TouchableOpacity>);
            break;
        case 'Details':
            estl = null; let tbs = [Stl.tabicn, { alignItems: 'flex-end', paddingVertical: dmns.h }], ics = [Stl.uicon, { fontSize: dimsz[25] }], epta = scrnid['Analytics'][1].length;
            if (this.state.flkey == 0) if (ldlp) for (i = 0; i < epta; i++) { let fi = i; hdr.push(<TouchableOpacity key={i} activeOpacity={Cnt.prps.tchblopcty} onPress={() => { scrnid['Analytics'][4][0] = scrnid[rtn][4][0]; scrnid['Analytics'][2] = '-'+fi; this.nvgscrn('Analytics', rtn); }} style={tbs}><Text style={[Stl.ytxt, { fontSize: dimsz[2], paddingEnd: dimsz[19] }]}>{gvar[2][scrnid['Analytics'][1][i][0]].toUpperCase()}</Text><Icon3 name={scrnid['Analytics'][1][i][2]} style={ics} /></TouchableOpacity>); }
            break;
    }
    return hdr.length ? <View key={10}><Animated.View style={[Stl.btmtab, Stl.w100, Stl.bsepdiv, { backgroundColor: Cnt.clrs.blackcolor3 }, estl]}>{hdr}</Animated.View>{this.stslpg(1)}</View> : null;
}
export function swipetab(flkey) {
    if (flkey != this.state.flkey) {
        var rtn = this.props.route.name, skey = this.state.srkey.trim(), issrch = skey && skey.length > 1, sobj = {}, cfct = [], physd = rtn == 'Dashboard' && phys;
        sobj['flkey'] = flkey; scrnid[rtn][2] = flkey; sobj['fload'] = 0; sobj['mload'] = Date.now(); sobj['sort'] = scrnid[rtn][12][flkey]; //sobj['sord'] = 'DESC';
        if (!lstpages[rtn] || !lstpages[rtn][flkey] || !lstpages[rtn][flkey].data || (physd && issrch)) {
            sobj['data'] = null; cfct.push(() => this.loadlpg(1));
        } else {
            if (physd) sobj['data'] = lstpages[rtn][flkey].data.map((value) => ({ ...value })); /*JSON.parse(JSON.stringify(lstpages[rtn][flkey].data));*/ else sobj['data'] = this.srhlpg('', flkey, 1); sobj.si0 = 0; sobj.si1 = 0;
            if(scrnid[rtn][13][0] && typeof scrnid[rtn][13][0] === 'function') { cfct.push(scrnid[rtn][13][0]); scrnid[rtn][13][0]=null; } if (sobj['data'].length) cfct.push(() => setTimeout(() => { if (this.mnscrlvw) try { this.mnscrlvw.scrollToOffset({ offset: 0, animated: true }); } catch (error) { try { this.mnscrlvw.scrollTo({ y: 0, animated: true }); } catch (error) { } } setTimeout(() => this.setState({ ldmr: true }), 400); }, 0));
        }
        if (this.isloaded) { this.setState(sobj, () => { cfct.map((fxt) => fxt()); }); }
    }
}
export function setval(item, sender) {
    if (sender && item.id == userarray.id) return gvar[2][907]; else if (sender && item.senderv) return item.senderv.trim(); else if (!sender && item.value) return item.value.trim(); else if (!sender && item.cpname) return item.cpname.trim().toUpperCase(); else {
        var ttle = '';
        if (item.Id_typeuser && item.gender) {
            switch (parseInt(item.Id_typeuser)) {
                case 1: case 2: case 3: case 4: case 5: case 6:
                    ttle = gvar[2]['lstusrtle'][item.gender];
                    break;
                case 7: case 8:
                    ttle = gvar[2]['lstpattle'][item.gender];
                    break;
            }
            return ttle + (ttle ? ' ' : '') + capitalize(item.fname) + ' ' + item.lname.toUpperCase();
        } else if (sender) { if (item.value) return item.value.trim(); else if (item.clabel) return item.clabel.toUpperCase(); else return gvar[2][104]; } else if (item.fname && item.lname) return capitalize(item.fname) + ' ' + item.lname.toUpperCase(); else if (item.clabel) return item.clabel.toUpperCase(); else return gvar[2][137056];
    }
}
export function setpht(item, dicn, wdhi, dsrc) {
    var uri, vstl = [Stl.pzp, { width: wdhi[0], height: wdhi[0], alignSelf: 'center', marginBottom: dimsz[1] }, wdhi[3]], cstl = [{ borderRadius: wdhi[1], backgroundColor: Cnt.clrs.footbg }, wdhi[4]], istl = [Stl.image2].concat(cstl), abcd, url;
    if (item.cpicon) {
        uri = gvar[1][0] + 'convpool/' + (item.idconvpool || (item.Id_target && item.Id_target.substr(2)) || (item.Id_obj && item.Id_obj.substr(2))) + '/images/_thumb/' + item.cpicon; url = uri.replace('_thumb/', '');
        if (Array.isArray(dsrc)) { abcd = dsrc[0][dsrc[1]].findIndex(elm => elm.url == url); if(abcd == -1) { abcd=dsrc[0][dsrc[1]].length; dsrc[0][dsrc[1]][abcd] = { url, props: { title: dsrc[3] ? gvar[2][103025] + ': ' + dsrc[3] : (dsrc[2] || item.cpicon) }, id: abcd }; } return <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => dispimg(0, dsrc[1], null, abcd, null, wdhi[9])} key={item.id}><View style={vstl.concat(cstl)}><Image source={{ uri }} style={istl} loadingIndicatorSource={loadind} /></View></TouchableOpacity>; }
        else return <View key={item.id} style={vstl}><Image source={{ uri }} style={istl} loadingIndicatorSource={loadind} /></View>;
    }
    else if (item.photo && !item.cpname) {
        uri = item.photo.substr(0, 4) == 'http' ? item.photo : gvar[1][0] + 'login/' + ((item.Id_msg && item.id) || item.Id_login || item.id) + '/images/'+(dsrc == -1 ? '' : '_thumb/') + item.photo; url = uri.replace('_thumb/', '');
        if (Array.isArray(dsrc)) { abcd = dsrc[0][dsrc[1]].findIndex(elm => elm.url == url); if(abcd == -1) { abcd=dsrc[0][dsrc[1]].length; dsrc[0][dsrc[1]][abcd] = { url, props: { title: dsrc[3] ? gvar[2][45022] + ': ' + dsrc[3] : (dsrc[2] || item.photo) }, id: abcd }; } return <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => dispimg(0, dsrc[1], null, abcd, null, wdhi[9])} key={item.id}><View style={vstl.concat(cstl)}><Image source={{ uri }} style={istl} loadingIndicatorSource={loadind} /></View></TouchableOpacity>; }
        else return <View key={item.id} style={vstl}><Image source={{ uri }} style={istl} loadingIndicatorSource={loadind} /></View>;
    }
    else if (item.clogo && !dicn) {
        uri = gvar[1][0] + 'dept/' + (item.Id_center || item.situation) + '/logo/_thumb/' + item.clogo; url = uri.replace('_thumb/', '');
        if (Array.isArray(dsrc)) { abcd = dsrc[0][dsrc[1]].findIndex(elm => elm.url == url); if(abcd == -1) { abcd=dsrc[0][dsrc[1]].length; dsrc[0][dsrc[1]][abcd] = { url, props: { title: dsrc[3] ? gvar[2][11208] + ': ' + dsrc[3] : (dsrc[2] || item.clogo) }, id: abcd }; } return <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => dispimg(0, dsrc[1], null, abcd, null, wdhi[9])} key={item.id}><View style={vstl.concat(cstl)}><Image source={{ uri }} style={istl} loadingIndicatorSource={loadind} /></View></TouchableOpacity>; }
        else return <View key={item.id} style={vstl}><Image source={{ uri }} style={istl} loadingIndicatorSource={loadind} /></View>;
    }
    else if (item.wmedia && !dicn) {
        if (item.wobj && item.wobj.indexOf('/') != -1) { uri = url = (item.wobj.indexOf('http') != -1 ? '' : gvar[1][0]) + item.wobj + '/' + item.wmedia; } else { uri = gvar[1][0] + wdhi[7] + '/' + (item[wdhi[8]] || item.id) + '/media/_thumb/' + item.wmedia; url = uri.replace('_thumb/', ''); }
        if (Array.isArray(dsrc)) { abcd = dsrc[0][dsrc[1]].findIndex(elm => elm.url == url); if(abcd == -1) { abcd=dsrc[0][dsrc[1]].length; dsrc[0][dsrc[1]][abcd] = { url, props: { title: dsrc[2] || item.wmedia }, id: abcd }; } return <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => dispimg(0, dsrc[1], null, abcd, null, wdhi[9])} key={item.id}><View style={vstl.concat(cstl)}><Image source={{ uri }} style={istl} loadingIndicatorSource={loadind} /></View></TouchableOpacity>; }
        else return <View key={item.id} style={vstl}><Image source={{ uri }} style={istl} loadingIndicatorSource={loadind} /></View>;
    }
    else {
        if (!dicn) { if (item.cpname) dicn = "people-outline"; else if (item.value && (item.Id_login || item.id)) dicn = "person-outline"; else if (item.clabel) dicn = "business-outline"; else dicn = "image-outline"; /*help-outline,image-outline*/ }
        abcd = dicn ? dsrc == 2 ? <Icon2 name={dicn} style={[wdhi[5] || Stl.uicon, { fontSize: wdhi[2] || wdhi[1] }]} /> : <Icon3 name={dicn} style={[wdhi[5] || Stl.uicon, { fontSize: wdhi[1] }]} /> : <Image source={aplogo} style={istl} />;
        if(wdhi[6]) return <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={wdhi[6]} key={item.id}><View style={vstl.concat(cstl)}>{abcd}</View></TouchableOpacity>;
        else return <View key={item.id}><View style={vstl.concat(cstl)}>{abcd}</View></View>;
    }
}
export function setxt(dtext) {
    var tle, srch, i1, usrarr = [];
    tle = gvar[2][13704]; srch = tle + ' #'; i1 = dtext.toLowerCase().indexOf(srch.toLowerCase()); if (i1 != -1) usrarr = aparray; else {
        tle = gvar[2][13706]; srch = tle + ' #'; i1 = dtext.toLowerCase().indexOf(srch.toLowerCase()); if (i1 != -1) usrarr = amuarray; else {
            tle = gvar[2][137056]; srch = tle + ' #'; i1 = dtext.toLowerCase().indexOf(srch.toLowerCase()); if (i1 != -1) usrarr = amuarray.concat(aparray);
        }
    }
    if (usrarr.length) {
        var spid = '', sl = dtext.length; for (c = i1 + srch.length; c < sl; c++) if (dtext[c] !== ' ' && !isNaN(dtext[c])) spid += dtext[c].toString(); else break;
        if (spid != '') {
            var lbl = usrarr.find(elm => elm.id == spid), re = new RegExp(srch + spid, 'ig');
            if (lbl) dtext = dtext.replace(re, tle + ' ' + setval(lbl));
        }
    }
    return dtext;
}
export function sphn(phone, country) {
    if (phone) { phone = phone.replace(/[\(\)-\/\s]/g, ''); var fltr = /^(\+|00)\d+$/; country = gvar[2]['lstcntrys'][country]; if (country) if (!fltr.test(phone)) phone = '+' + country['pcode'] + phone.replace(/^0+/, ''); }
    return phone;
}
export function setephi(restr, res, ispat) {
    var x, temp1; restr['ephi'] = 1;
    if (res['name']) { x = res['name'].find(function (tlcm) { return tlcm['use'].toLowerCase() == 'official'; }); if (!x) x = res['name'][0]; if (x['given']) restr['fname'] = x['given'][0]; if (x['family']) restr['lname'] = x['family']; if (x['text']) { restr['value'] = x['text']; if (!x['given'] && !x['family'] && restr['value']) { temp1 = restr['value'].replace(/mr.|mrs.|ms./ig, "").trim().split(' '); restr['lname'] = temp1.pop(); if (temp1.length) restr['fname'] = temp1.join(" "); } } else { if (x['prefix']) temp1 = x['prefix'][0] + " "; else temp1 = ""; restr['value'] = temp1 + restr['fname'] + " " + restr['lname']; } }
    if (res['birthDate']) { restr['birthday'] = res['birthDate']; }
    if (res['address']) { restr['contract'] = res['address'][0]['state']; restr['country'] = res['address'][0]['country']; if (restr['country']) restr['country'] = restr['country'].substr(0, 2); restr['zipcode'] = res['address'][0]['postalCode']; restr['timezone'] = gvar[13]['contract'][restr['contract']]; if (restr['timezone']) restr['timezone'] = restr['timezone'][0]; if (res['address'][0]['line']) restr['address'] = res['address'][0]['line'][0]; restr['city'] = res['address'][0]['city']; } if (!restr['country']) restr['country'] = gvar[13][26]; if (!restr['timezone']) restr['timezone'] = gvar[13][29];
    if (res['telecom']) { res['telecom'].map(function (tlcm) { switch (tlcm['system']) { case 'phone': x = sphn(tlcm['value'], restr['country']); switch (tlcm['use'].toLowerCase()) { case 'mobile': case 'work': restr['phone'] = x; break; case 'home': restr['ophone'] = x; break; } break; case 'email': restr['lemail'] = tlcm['value']; break; } }); }
    if (res['photo']) { if (res['photo'][0]['url']) restr['photo'] = res['photo'][0]['url']; }
    if (res['identifier']) { res['identifier'].map(function (tlcm) { temp1 = tlcm['system'].toLowerCase(); if (temp1.indexOf('/mrn') != -1 || temp1.indexOf('/npi') != -1) restr['hsid'] = tlcm['value']; /*else if (temp1.indexOf('/us-ssn') != -1) restr['insee'] = tlcm['value'];*/ }); }
    if (res['communication'] && res['communication'][0]['language']['coding']) { restr['lang'] = res['communication'][0]['language']['coding'][0]['code'].substr(0, 2); }
    if (ispat) { if (res['maritalStatus'] && res['maritalStatus']['coding']) { restr['situation'] = gvar[13][73][res['maritalStatus']['coding'][0]['code'].toLowerCase()]; } if (res['gender']) { restr['gender'] = gvar[13][71][res['gender'].toLowerCase()]; } else if (res['name'] && x['prefix']) { restr['gender'] = gvar[13][71][x['prefix'][0].toLowerCase()]; } } else { if (res['name'] && x['prefix']) { restr['gender'] = gvar[13][72][x['prefix'][0].toLowerCase()]; } else if (res['gender']) { restr['gender'] = gvar[13][72][res['gender'].toLowerCase()]; } }
}
export function updephi(data, i, k, rtn, flkey, csrn, grpusr, frce) {
    var doadj = false; if(data) { data.map((value, idx) => { if (value.ephi !== undefined && (!value.ephi || frce)) { tempv = grpusr.find(elm => elm.ephi && elm.id == value.id); if(tempv) { data[idx].fname = tempv.fname; data[idx].lname = tempv.lname; data[idx].value = tempv.value; data[idx].birthday = tempv.birthday; data[idx].phone = tempv.phone; data[idx].lemail = tempv.lemail; data[idx].ophone = tempv.ophone; data[idx].address = tempv.address; data[idx].city = tempv.city; data[idx].zipcode = tempv.zipcode; data[idx].photo = tempv.photo; data[idx].hsid = tempv.hsid; data[idx].insee = tempv.insee; data[idx].ephi = 1; doadj = true; } } }); if (i == rtn && k == flkey && doadj) if (csrn.isloaded) csrn.setState({ data: data.map((value) => ({ ...value })) }); }
}
export function updtabs(ulist, frce, rdx, rkey, data) {
    var grpusr, csrn = crnscrn || dshscrn, rtn, flkey, skey, issrch, tempv;
    if(csrn) { rtn = csrn.props.route.name; flkey = csrn.state.flkey; skey = csrn.state.srkey ? csrn.state.srkey.trim() : ''; issrch = skey && skey.length > 1; }
    switch (ulist) {
        case 7:
            grpusr = aparray.concat(surglist);
            break;
        case 5:
            grpusr = amuarray.concat(aouarray);
            break;
        default:
            grpusr = amuarray.concat(aouarray).concat(aparray).concat(surglist); //.concat(allusr)
    }
    if(rdx && rkey && issrch && csrn) updephi(data, rtn, flkey, rtn, flkey, csrn, grpusr, frce); else (rdx || Object.keys(lstpages)).map((i) => { (rkey || Object.keys(lstpages[i])).map((k) => updephi(lstpages[i][k].data, i, k, rtn, flkey, csrn, grpusr, frce)); });
}
export function upduar(data, grpusr, chua) {
    if (data.entry) { var gval; grpusr.map(function (usrarr) { if (usrarr.extid) { gval = data.entry.find(elm => elm.resource.id == usrarr.extid); if (gval) { setephi(usrarr, gval.resource); if (chua && usrarr.id == userarray.id) setephi(userarray, gval.resource); } } }); }
}
export function getpract(ulist, frce) {
    if (gvar[13][90]&&gvar[12] && gvar[4]) {
       var fdata = new FormData(); fdata.append('fct', 'getbundle'); fdata.append('pth', gvar[12] + 'Practitioner'); fdata.append('acto', gvar[4]);
       fetch(gvar[1][0] + gvar[1][5], { method: 'POST', body: fdata })
        .then((resp) => resp.json())
        .then((data) => {// url: gvar[12] + 'Person' -> to get other persons (admins, ...)
            upduar(data, amuarray.concat(aouarray), 1); updtabs(ulist, frce);
        }).catch((error) => { /*updtabs(ulist, frce);*/ });
    }
}
export function getpat(ulist, frce) {
    if (gvar[13][90]) {
        var mnusr = userarray.Id_typeuser == 7 ? userarray : userarray.Id_typeuser == 8 ? aparray[0] : null, pth;
        if (mnusr) { if (mnusr.extid) pth = 'Patient/' + mnusr.extid; } else pth = 'Patient';
        if (gvar[12] && gvar[4]) if (pth) {
            var fdata = new FormData(); fdata.append('fct', 'getbundle'); fdata.append('pth', gvar[12] + pth); fdata.append('acto', gvar[4]);
            fetch(gvar[1][0] + gvar[1][5], { method: 'POST', body: fdata })
            .then((resp) => resp.json())
            .then((data) => {
                if (mnusr) setephi(mnusr, data, userarray.Id_typeuser); else upduar(data, aparray.concat(surglist)); if (ulist) updtabs(ulist, 1); else getpract();
            }).catch((error) => { /*if (ulist) updtabs(ulist, 1); else getpract();*/ });
        } else { if (!ulist) getpract(); }
    }
}
export function updscrnnot(rtn, cnt, ldng) {
    if (ldng) scrnid[rtn][4][6] += cnt; else { scrnid[rtn][0] -= cnt; if (scrnid[rtn][0] < 0) scrnid[rtn][0] = 0; }
    //Object.keys(scrnid).map((i) => { if (i != 'notscrn' && i != rtn) scrnid[i][3] = scrnid[i][3] ? scrnid[i][3] : 1; });
}
export function updnot(mstate, rfrsh, fct) {
    var rtn = this.props.route.name, fdata = new FormData(), csrn = crnscrn || dshscrn, tempv; csrn = csrn ? csrn.props.route.name : null;
    if (rtn == csrn) {
        if (this.enotif && this.enotif.length) {
            var enotif = this.enotif.slice(0); this.enotif = [];
            fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', fct || 'unot'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('mstate', mstate); fdata.append('idnot', enotif.join(','));
            fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
            .then((resp) => resp.json())
            .then((data) => {
                if (data) {
                    lstpages[rtn][this.state.flkey].data.map((value, idx) => { if (enotif.indexOf(value['Id_not']) != -1) lstpages[rtn][this.state.flkey].data[idx]['tstate'] = mstate; }); scrnid[rtn][4][8][this.state.flkey] = 1; scrnid[rtn][3] = [[['data', this.state.flkey, 1]]];
                    updscrnnot(rtn, parseInt(data), 1);
                } if (rfrsh) this.precase(rfrsh);
            }).catch((error) => { });
        } else if (rfrsh) this.precase(rfrsh);
    } else { if (rfrsh) this.precase(rfrsh); scrnid[rtn][3] = [{}, () => this.updnot(mstate, null, fct)]; }
}
export function updnot1(fct, ntype) {
    var rtn = this.props.route.name, fdata = new FormData(); this.enotif = [];
    fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', fct || 'unott'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('mstate', 3); if (ntype) fdata.append('ntype', ntype);
    fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
    .then((resp) => resp.json())
    .then((data) => {
        if (data) {
            lstpages[rtn][this.state.flkey].data.map((value, idx) => { lstpages[rtn][this.state.flkey].data[idx]['mstate'] = 3; });
            if (scrnid[rtn][scrnid[rtn][4][2]] > 0) updscrnnot(rtn, parseInt(data));
            if (this.isloaded) this.setState({ data: this.srhlpg('', this.state.flkey, 1) }); else scrnid[rtn][3] = [[['data', this.state.flkey, 1]]];
        }
    }).catch((error) => { });
}
export function updnot2(mstate, rfrsh) {
    var rtn = this.props.route.name, flkey = 0, fdata = new FormData(), ntype = [];
    if (scrnid[rtn][scrnid[rtn][4][2]] > 0) {
        if (!mstate) mstate = 2; fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'unott'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('mstate', mstate); Object.keys(gvar[13]['ntype']).map((skey) => { if (gvar[13]['ntype'][skey].findIndex(elm => elm == rtn) != -1) ntype.push(skey); }); fdata.append('ntype', ntype.join(','));
        fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
        .then((resp) => resp.json())
        .then((data) => {
            if (data) {
                updscrnnot(rtn, parseInt(data));
                if (lstpages['Notifications'] && lstpages['Notifications'][flkey].data) {
                    lstpages['Notifications'][flkey].data.map((value, idx) => { if (ntype.indexOf(lstpages['Notifications'][flkey].data[idx]['ntype']) != -1) { if (mstate > 1 && parseInt(lstpages['Notifications'][flkey].data[idx]['mstate']) == 1) scrnid['Notifications'][scrnid['Notifications'][4][2]]--; lstpages['Notifications'][flkey].data[idx]['mstate'] = mstate; } }); if (scrnid['Notifications'][scrnid['Notifications'][4][2]] < 0) scrnid['Notifications'][scrnid['Notifications'][4][2]] = 0; this.orfrsh(-1);
                } else this.orfrsh(3);
            } if (rfrsh) this.precase(rfrsh);
        }).catch((error) => { });
    } else if (rfrsh) this.precase(rfrsh);
}
export function updmsgs(noupd, rfrsh) {
    var rtn = this.props.route.name, flkey, fdata = new FormData(), cnt, tempv, Id_target = scrnid['Chatroom'][4][0].id, users = scrnid['Chatroom'][4][0].cpusers ? scrnid['Chatroom'][4][0].cpusers.split(',') : [Id_target];
    fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'updmsgs'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('Id_target', Id_target);
    fetch(gvar[1][0] + gvar[1][1], { method: 'POST', timeout: gvar[13][65], body: fdata }).then((resp) => resp.json()).then((data) => {
        if (data) {
            sserver({ id: userarray.id, type: 'updmsgs', conid: conid, users: users, Id_target: Id_target });
            if (!noupd) {
                cnt = !isnull(data) ? parseInt(data) : 0; flkey = scrnid['Messenger'][2];
                if (lstpages['Messenger'] && lstpages['Messenger'][flkey].data) {
                    tempv = lstpages['Messenger'][flkey].data.findIndex(elm => elm[scrnid['Messenger'][14][flkey]] == Id_target);
                    if (tempv != -1) {
                        fdata = parseInt(lstpages['Messenger'][flkey].data[tempv].cnt); cnt = Math.max(cnt, fdata); lstpages['Messenger'][flkey].data[tempv].cnt = fdata - cnt; if (lstpages['Messenger'][flkey].data[tempv].cnt < 0) lstpages['Messenger'][flkey].data[tempv].cnt = 0;
                        if (rtn == 'Messenger') this.orfrsh(scrnid['Messenger'][3] == 1 ? scrnid['Messenger'][3] : [[['data', flkey, 1]]]); else scrnid['Messenger'][3] = scrnid['Messenger'][3] == 1 ? scrnid['Messenger'][3] : [[['data', flkey, 1]]];
                    }
                }
                scrnid['Messenger'][scrnid['Messenger'][4][2]] -= cnt; if (scrnid['Messenger'][scrnid['Messenger'][4][2]] < 0) scrnid['Messenger'][scrnid['Messenger'][4][2]] = 0;
            }
        } if (rfrsh) this.precase(rfrsh);
    }).catch((error) => { });
}
export function ismp(item, rtn) {
    let ntype = item.ntype ? item.ntype : item.winfo1 && item.winfo1.indexOf('ntype:') != -1 ? item.winfo1.split('ntype:').pop() : null, snms = (ntype ? gvar[13]['ntype'][ntype] : gvar[13]['wtype'][item.wtype]) || [rtn || 'Notifications'], l = snms.length - 1, scrnm; if(Array.isArray(snms[l])) { scrnm = snms[l-1]; ntype = snms[l]; l--; } else { scrnm = snms[l]; ntype = null; } return [snms, scrnm, scrnm == 'Chatroom', scrnm == 'Details', l, ntype];
}
export function ininot(odata, mp) {
    let tempv, flkey = odata.flkey, arrlen;
    if(!flkey && mp[5]) { flkey = mp[5][0]; arrlen = mp[5][1]; } else arrlen = null;
    if(flkey) { flkey = flkey.toString().split(',')[0]; flkey = '-'+(parseInt(flkey)-1); }
    tempv = mp[0][mp[4]]; if(flkey) { scrnid[tempv][2] = flkey; scrnid[tempv][15] = arrlen; } flkey = mp[0][mp[4]-1]; scrnid[tempv][6] = flkey || 'Dashboard'; scrnid['notscrn'] = [tempv, odata.ntype]; vcusers = odata.idreceiver;
    if (mp[2]) scrnid['Chatroom'][4][0] = odata.idconvpool ? 'cp' + odata.idconvpool : odata.id;
    if (mp[3]) scrnid['Details'][4][0] = odata.id;
}
export function opnnot(item, fct, cbfct, flkey) {
    var rtn = this.props.route.name, fdata = new FormData(), idx, mp = ismp(item, rtn);
    if (cbfct) cbfct(); else this.rdrnot(item, mp[2], mp[3], flkey);
    if (parseInt(item.mstate) < 3) {
        fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', fct || 'unot'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('mstate', 3); fdata.append('idnot', item.Id_not);
        fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata })
        .then((resp) => resp.json())
        .then((data) => {
            flkey = this.state.flkey; idx = lstpages[rtn][flkey].data.findIndex(elm => elm[scrnid[rtn][14][flkey]] == item.Id_not);
            if (idx != -1) {
                lstpages[rtn][flkey].data[idx]['mstate'] = 3;
                if (scrnid[rtn][scrnid[rtn][4][2]] > 0) updscrnnot(rtn, parseInt(data));
                if (this.isloaded) this.setState({ data: this.srhlpg('', flkey, 1) }); else scrnid[rtn][3] = [[['data', flkey, 1]]];
            }
        }).catch((error) => { });
    }
}
export function rdrnot(item, ismsg, ispat, flkey, isrd) {
    var rtn = this.props.route.name, isold = 0, mp = ismp(item, rtn), arrlen, tempv;
    if (ismsg) {
        if (item.Id_obj && !item.priority) arrlen = item.Id_obj; else arrlen = item.idconvpool ? 'cp' + item.idconvpool : item.id;
        if (!isempty(scrnid['Chatroom'][4][0])) { if ((scrnid['Chatroom'][4][0].id && scrnid['Chatroom'][4][0].id != arrlen) || (!scrnid['Chatroom'][4][0].id && scrnid['Chatroom'][4][0] != arrlen)) { lstpages['Chatroom'] = null; scrnid['Chatroom'][3] = null; } else isold = 1; } scrnid['Chatroom'][4][0] = arrlen; opnchat(scrnid['Chatroom'][4][0], 1, Object.assign({}, item), isrd);
    } else if (ispat) {
        arrlen = item.id;
        if (!isempty(scrnid['Details'][4][0])) { if ((scrnid['Details'][4][0].id && scrnid['Details'][4][0].id != arrlen) || (!scrnid['Details'][4][0].id && scrnid['Details'][4][0] != arrlen)) { lstpages['Details'] = null; scrnid['Details'][3] = null; } else isold = 2; } scrnid['Details'][4][0] = arrlen; opndp(scrnid['Details'][4][0], 1, Object.assign({}, item), 'Details', isrd);
    }
    if(!flkey && mp[5]) { flkey = mp[5][0]; arrlen = mp[5][1]; } else arrlen = null;
    if(flkey) { flkey = flkey.toString().split(',')[0]; flkey = '-'+(parseInt(flkey)-1); }
    if (rtn == mp[1]) {
        if(flkey) scrnid[rtn][2] = flkey;
        switch (rtn) {
            case 'Notifications':
                if (item.id == userarray.id) { scrnid['Reminders'][2] = '-'+(item.ntype==4?1:0); this.nvgscrn('Reminders', rtn, 0); }
                break;
            default:
                this.navsrn(rtn); //this.props.navigation.replace(rtn);
        }
    } else {
        tempv = mp[0][mp[4]]; if(flkey) { scrnid[tempv][2] = flkey; scrnid[tempv][15] = arrlen; } flkey = mp[0][mp[4]-1]; this.fnpg(isrd && flkey ? flkey : rtn, tempv, isold);
    }
}
export function opnchat(item, nonvg, extobj, isrd) {
    var otem = undefined, isold = 0; if (typeof item === 'object') otem = Object.assign(extobj, item); else { if (item.substr(0, 2) == 'cp') otem = convpoolarray.find(elm => elm.id == item); else otem = fndcht(item); otem = Object.assign(extobj, otem || convpoolarray[0] || { id: item, cpusers: item + ',' + userarray.id, uactive: '1,1' }); }
    if (!otem.value) otem['value'] = setval(otem); if (!otem.cpusers) { mntst.show([[otem.value + ' ' + gvar[2][36018], 2], [gvar[2][108019], 2]]); return; /*otem.cpusers = otem.id + ',' + userarray.id; otem.uactive = '1,1';*/ }
    if (!isempty(scrnid['Chatroom'][4][0])) { if ((scrnid['Chatroom'][4][0].id && scrnid['Chatroom'][4][0].id != otem.id) || (!scrnid['Chatroom'][4][0].id && scrnid['Chatroom'][4][0] != otem.id)) rsr('Chatroom'); else isold = 1; }
    scrnid['Chatroom'][4][0] = otem; var mdate = scrnid['Chatroom'][4][0].cpusers ? scrnid['Chatroom'][4][0].cpusers.split(',') : [scrnid['Chatroom'][4][0].id], mtext = scrnid['Chatroom'][4][0].uactive ? scrnid['Chatroom'][4][0].uactive.split(',') : [1], tempv = mdate.length, msid = [], nombm = false;
    for (i = 0; i < tempv; i++) { if (mtext[i] == 1 && mdate[i] != userarray.id) msid.push(mdate[i]); if (mtext[i] != 1 && mdate[i] == userarray.id) { nombm = true; break; } } if (nombm) { mntst.show([[gvar[2][103034], 2]]); return; } scrnid['Chatroom'][4][0].msid = msid.join(','); scrnid['Chatroom'][4][0].nbsent = msid.length; if (!nonvg) this.fnpg(isrd ? 'Messenger' : this.props.route.name, 'Chatroom', isold);
}
export function opndp(item, nonvg, extobj, rtn, isrd) {
    var otem = undefined, isold = 0; if (typeof item === 'object') otem = Object.assign(extobj, item); else { otem = aparray.find(elm => elm.id == item); otem = Object.assign(extobj, otem === undefined ? { id: item } : otem); }
    if (!isempty(scrnid[rtn][4][0])) { if ((scrnid[rtn][4][0].id && scrnid[rtn][4][0].id != otem.id) || (!scrnid[rtn][4][0].id && scrnid[rtn][4][0] != otem.id)) rsr(rtn); else isold = 2; }
    scrnid[rtn][4][0] = otem; if (!nonvg) this.fnpg(isrd ? (rtn == 'Details' ? 'Dashboard' : 'Details') : this.props.route.name, rtn, isold);
}
export function fnpg(rtn, scrnm, isold) {
    this.nvgscrn(scrnm, rtn, isold);
    switch (scrnm) {
        case 'Chatroom':
            var flkey = scrnid['Messenger'][2], tempv, cnt;
            if (lstpages['Messenger'] && lstpages['Messenger'][flkey].data) {
                tempv = lstpages['Messenger'][flkey].data.findIndex(elm => elm[scrnid['Messenger'][14][flkey]] == scrnid['Chatroom'][4][0].id);
                if (tempv != -1) { cnt = parseInt(lstpages['Messenger'][flkey].data[tempv].cnt); if(cnt > 0) if(isold == 1) this.updmsgs(); else lstpages['Messenger'][flkey].data[tempv].cnt = 0; }
            }
            break;
    }
}
export function rsr(rtn) {
    var arrlen = scrnid[rtn][5].length;
    lstpages[rtn] = null; scrnid[rtn][3] = null;
    for (i = 0; i < arrlen; i++) { lstpages[scrnid[rtn][5][i]] = null; scrnid[scrnid[rtn][5][i]][4][0] = {}; }
}
export function vldscr(routeName, tscrn) {
    if(routeName=='Notifications'||tscrn=='Notifications')
    {
        if(userarray['enb105'][phys]) { mntst.show([[gvar[2][userarray['enb105'][phys]],1]]); return false; }
    }
    if(routeName=='Messenger'||tscrn=='Messenger'||routeName=='Chatroom'||tscrn=='Chatroom')
    {
        if(userarray['enb103'][phys]) { mntst.show([[gvar[2][userarray['enb103'][phys]],1]]); return false; }
    }
    return true;
}
export function nvgscrn(routeName, rtn, isold) {
    Keyboard.dismiss();
    let bs = rtn || this.props.route.name; if(bs != routeName) scrnid[routeName][6] = bs;
    this.tabpress(scrnid[routeName][8], routeName);
    //if (isold == 0) this.tabpress(scrnid[routeName][8], routeName); else if(vldscr(routeName)) this.navsrn(routeName);
}
export function tabpress(routeName, tscrn, isl) {
    if(vldscr(routeName, tscrn)) {
        Keyboard.dismiss();
        if (scrnid[this.props.route.name][8] != routeName) {
            switch (routeName) {
                case 'Notifications':
                case 'Profile':
                    this.navsrn(routeName);
                    //if(tscrn && tscrn != routeName) this.navsrn(tscrn);
                    break;
                default:
                    let index = 0, routes = [{ name: routeName }], cbfct; if(tscrn && tscrn != routeName) if(isl) cbfct = () => this.navsrn(tscrn); else { index = 1; routes.push({ name: tscrn }); }
                    this.props.navigation.reset({ index, routes }); if(cbfct) cbfct(); else this.navsrn(null, null, scrnid[tscrn || routeName][13][4]);
            }
        } else this.navsrn(tscrn || routeName);
    }
}
export function navsrn(nroute, params, atype, Id_obj) {
    if(nroute) { this.props.navigation.navigate(nroute, params); atype = scrnid[nroute][13][4]; }
    if (parseInt(userarray.id) > 0) {
        //console.warn(nroute, atype, Id_obj);
        var fdata = new FormData(); fdata.append('fct', 'sactv'); fdata.append('Id_login', userarray.id); fdata.append('apptype', 1); fdata.append('atype', atype); fdata.append('Id_obj', Id_obj || ''); fdata.append('tmzn', userarray.timezone); fetch(gvar[1][0] + gvar[1][5], { method: 'POST', timeout: gvar[13][65], body: fdata }).then((resp) => resp.json()).then((data) => { }).catch((error) => { });
    }
}
export async function aalrt(atle, amsg) {
    return new Promise((resolve) => Alert.alert(atle, amsg, [{ text: gvar[2][2301], onPress: () => resolve(1) }, { text: gvar[2][67012], onPress: () => resolve(0) }], { cancelable: false }));
}
export async function suser(difpg, cbfct) {
    var rtn = this.props.route.name, flkey = parseInt(this.state.flkey), epta = scrnid[rtn][1].length, fdata = new FormData(), reqfld = {}, result = [], res = '', pref = '', sobj = {}, tempv, arrlen, ischg = false, change = '', qstr = '', l7p, passchg, robj, uid = scrnid[rtn][4][0].id, nusr = parseInt(uid) < 0 ? true : false, Id_typeuser, scra = [], lsta = [];
    for (i = 0; i < epta; i++) if (this.changsec[i]) { ischg = true; break; }
    switch (flkey) {
        case 0:
        case 1:
            robj = this.glp(nusr, 0); if(!robj) robj = this.state.data.slice(0); robj = robj[0]; qstr += '&ephi=' + lstpages[rtn][flkey].data[0].ephi;
            robj.fname = sanitizeinput(robj.fname.trim()); robj.lname = sanitizeinput(robj.lname.trim()); robj.phone = sanitizeinput(robj.phone.trim()); robj.lemail = sanitizeinput(robj.lemail.trim()); robj.login = sanitizeinput(robj.login.trim()); robj.pwd = sanitizeinput(robj.pwd.trim()); if (nusr) robj.confpwd = sanitizeinput(robj.confpwd.trim());
            passchg = robj.pwd != lstpages[rtn][flkey].data[0].pwd; change += 'p';
            if (!robj.fname) reqfld.fname = 1; if (!robj.lname) reqfld.lname = 1; if (!robj.birthday) reqfld.birthday = 1; if (!robj.gender) reqfld.gender = 1; if (!robj.country) reqfld.country = 1; if (!robj.timezone) reqfld.timezone = 1; if (!robj.phone) reqfld.phone = 1; if (!robj.lemail) reqfld.lemail = 1; if (!robj.login) reqfld.login = 1; if (!robj.pwd) reqfld.pwd = 1; if (!robj.confpwd && (passchg || reqfld.pwd)) reqfld.confpwd = 1; if (!robj.Id_sup) reqfld.Id_sup = 1; if (!robj.lang) reqfld.lang = 1; if (!robj.Id_typeuser) reqfld.Id_typeuser = 1; else { qstr += '&Id_typeuser=' + robj.Id_typeuser; Id_typeuser = parseInt(robj.Id_typeuser); }
            res = this.adjphone(0, [['phone', gvar[2][137022]]], null, null, ''); if (res != '') result.push([res, 2]);
            res = verifemail(robj.lemail, gvar[2][137014]); if (res != '') result.push([res, 2]);
            if(passchg) {
                res = veriflogpwd(robj.login, gvar[2][101]); if (res != '') result.push([res, 2]);
                res = this.checkeq(['data[0].pwd', 'data[0].confpwd'], [gvar[2][102], gvar[2][105]]); if (res != '') result.push([res, 2]);
                change += 'c'; res = '';
                if (nusr) { l7p = ''; } else {
                    res = verifpwd(robj.pwd, gvar[2][102]); if (res != '') result.push([res, 2]);
                    if (!lstpages[rtn][flkey].data[0].l7p) l7p = lstpages[rtn][flkey].data[0].pwd; else {
                        l7p = lstpages[rtn][flkey].data[0].l7p.split(' '); arrlen = l7p.length;
                        for (i = 0; i < arrlen; i++) if (robj.pwd == l7p[i]) { res = 1; break; }
                        if (res == '') { if (arrlen < gvar[13][61]) l7p = lstpages[rtn][flkey].data[0].l7p; else l7p = l7p.slice(1).join(' '); l7p += ' ' + lstpages[rtn][flkey].data[0].pwd; }
                    }
                    if (res != '') result.push([gvar[2][1020], 2]);
                }
            } else l7p = lstpages[rtn][flkey].data[0].l7p; fdata.append('l7p', TRANS_ENCRYPT(l7p)); fdata.append('barcode', robj.barcode);
            if (robj.birthday != '') { pref = robj.birthday.split('-'); pref = pref[1] + pref[0].substr(2); } else if (robj.fname != '' && robj.lname != '') pref = (robj.fname.substr(0, 1) + robj.lname.substr(0, 1)).toLowerCase(); qstr += '&pref=' + pref;
            if(robj.lang != lstpages[rtn][flkey].data[0].lang) change += 'g';
            if(robj.timezone != lstpages[rtn][flkey].data[0].timezone) change += 'z';
            fdata.append('fname' + uid, TRANS_ENCRYPT(robj.fname)); fdata.append('lname' + uid, TRANS_ENCRYPT(robj.lname)); fdata.append('birthday' + uid, TRANS_ENCRYPT(robj.birthday)); fdata.append('phone' + uid, TRANS_ENCRYPT(robj.phone)); fdata.append('lemail' + uid, TRANS_ENCRYPT(robj.lemail)); fdata.append('login' + uid, TRANS_ENCRYPT(robj.login)); fdata.append('confpwd' + uid, TRANS_ENCRYPT(robj.pwd)); fdata.append('gender' + uid, robj.gender); fdata.append('country' + uid, robj.country); fdata.append('timezone' + uid, robj.timezone); fdata.append('Id_sup' + uid, robj.Id_sup); fdata.append('lang' + uid, robj.lang); fdata.append('puserid' + uid, userarray.id);
            fdata.append('ophone' + uid, TRANS_ENCRYPT(robj.ophone)); fdata.append('city' + uid, TRANS_ENCRYPT(robj.city)); fdata.append('detail' + uid, TRANS_ENCRYPT(robj.detail)); fdata.append('address' + uid, TRANS_ENCRYPT(robj.address)); fdata.append('zipcode' + uid, robj.zipcode); fdata.append('contract' + uid, robj.contract); fdata.append('profession' + uid, robj.profession); fdata.append('extid' + uid, robj.extid); fdata.append('hsid' + uid, robj.hsid); fdata.append('mname' + uid, robj.mname);
            if (robj.photouri) { if(lstpages[rtn][flkey].data[0].photo) { tempv = await aalrt(gvar[2][4509], gvar[2][125030]); if(tempv === 0) { /*if(cbfct) cbfct();*/ return; } } tempv = robj.photouri.split('/'); fdata.append('attdf' + uid, { uri: robj.photouri, name: tempv[tempv.length - 1], type: robj.phototype }); } else if(lstpages[rtn][flkey].data[0].photo && !robj.photo) { tempv = await aalrt(gvar[2][4509], gvar[2][125029]); if(tempv === 0) { /*if(cbfct) cbfct();*/ return; } fdata.append('removephoto' + uid, 1); }
            switch (Id_typeuser) {
                case 1: case 2: case 3: case 4: case 5: case 6:
                    scra = [amuarray, aouarray];
                    var omete1 = [], omete0 = [];
                    robj.idcp.slice(1, -1).split(',').map((item, j) => { if (lstpages[rtn][flkey].data[0].idcp.indexOf(',' + item + ',') == -1) omete1.push(item); });
                    lstpages[rtn][flkey].data[0].idcp.slice(1, -1).split(',').map((item, j) => { if (robj.idcp.indexOf(',' + item + ',') == -1) omete0.push(item); });
                    if(omete1.length || omete0.length) { qstr += '&omete=' + robj.idcp + '&omete1=' + omete1.join(',') + '&omete0=' + omete0.join(','); change += 'm'; }
                    qstr += '&clogo=' + encodeURIComponent(userarray.clogo) + '&clabel=' + encodeURIComponent(userarray.clabel);
                    fdata.append('footer' + uid, TRANS_ENCRYPT(robj.footer)); fdata.append('signature' + uid, TRANS_ENCRYPT(robj.signature)); fdata.append('dept' + uid, robj.Id_center); fdata.append('tolang' + uid, robj.tolang);
                break;
                case 7: case 8:
                    scra = [aparray, surglist]; if(phys) lsta = ['Dashboard']; else { if(Id_typeuser==8) lsta = ['Caregivers']; }
                    if(nusr) {
                        var ousers = [], otabs = '', tab136 = '', opsp = '';
                        userarray.idcp.slice(1, -1).split(',').map((item, j) => { tempv = medteamarray.find(elm => elm.idconvpool == item); if(tempv) { tempv.cpusers.split(',').map((ov, oj) => { if(!ousers.find(elm => elm == ov)) ousers.push(ov); }); } });
                        if(ousers.length) { qstr += '&ousers=' + ousers.join(',') + '&otabs=' + otabs + '&tab136=' + tab136 + '&opsp=' + opsp; }    
                    }
                    qstr += '&planid=-1&cpname=' + encodeURIComponent(lstpages[rtn][flkey].data[0].value) + '&Id_creator=' + lstpages[rtn][flkey].data[0].Id_sup + '&Id_user=' + userarray.id;
                    fdata.append('situation' + uid, robj.situation); fdata.append('nbchild' + uid, robj.nbchild); fdata.append('ethnicity' + uid, robj.ethnicity); fdata.append('doctor' + uid, robj.doctor); fdata.append('emergcontact' + uid, robj.emergcontact); fdata.append('cfdate', robj.cfdate);
                break;
            }
            qstr += '&active=' + robj.active + '&alocked=' + robj.alocked + '&photo=' + encodeURIComponent(lstpages[rtn][flkey].data[0].photo) + '&notifmode=' + lstpages[rtn][flkey].data[0].notifmode + '&change=' + change;
        break;
        case 2:
            robj = this.state.data.slice(0); arrlen = robj.length; var adv = [], dvn = [];
            for (i = 0; i < arrlen; i++) if(robj[i].notif != lstpages[rtn][flkey].data[i].notif) { adv.push(robj[i].deviceid); dvn.push(robj[i].notif);  }
            if(adv.length) qstr += '&adv=' + adv.join(',') + '&dvn=' + dvn.join(',');
            fdata.append('error', gvar[2][11209]); fdata.append('info', gvar[2][19900]);
        break;
    }
    if (isempty(reqfld)) {
    if (ischg) {
        if (!result.length) {
            mntst.show([[gvar[2][6600], 1, 1]], -1, 1); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'suser'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]);
            fetch(gvar[1][0] + gvar[1][1] + '?uid=' + uid + qstr, { method: 'POST', timeout: gvar[13][65], body: fdata, headers: Platform.OS === 'ios' ? { 'Content-Type': 'multipart/form-data' } : {} })
            .then((resp) => resp.json())
            .then((data) => {
                if (data) {
                    if (data.error) { mntst.show(data.error); } else {
                        if (data.info) mntst.show(data.info);
                        switch (flkey) {
                            case 0:
                            case 1:
                                if (data.narr) {
                                    if (data.langlb) { gvar[2] = data.langlb; moment.updateLocale(robj.lang, { months: Object.values(gvar[2]['lstmnthss']), weekdays: Object.values(gvar[2]['lstwekdys']) }); } cltf();
                                    scrnid[rtn][4][0] = JSON.parse(TRANS_DECRYPT(data.narr));
                                    sobj['data'] = [Object.assign({ isup: robj.isup, dtb: false, reqfld: {} }, scrnid[rtn][4][0])];
                                    if (uid == userarray.id) { userarray = scrnid[rtn][4][0]; } else {
                                    scra.map((item, j) => { tempv = item.findIndex(elm => elm.id == uid); if (tempv != -1) scra[j][tempv] = Object.assign(item[tempv], scrnid[rtn][4][0]); else scra[j].push(Object.assign({}, scrnid[rtn][4][0])); });
                                    lsta.map((item, j) => { for (i = 0; i < scrnid[item][1]; i++) if (lstpages[item] && lstpages[item][i] && lstpages[item][i].data) { tempv = lstpages[item][i].data.findIndex(elm => elm[scrnid[item][14][i]] == uid); if (tempv != -1) lstpages[item][i].data[tempv] = Object.assign(lstpages[item][i].data[tempv], scrnid[rtn][4][0]); else lstpages[item][i].data.push(Object.assign({}, scrnid[rtn][4][0])); } });
                                    Object.keys(scrnid).map((i) => { if (i != 'notscrn' && i != rtn && scrnid[i][4][0].id == uid) scrnid[i][4][0] = scrnid[rtn][4][0]; });
                                    }
                                }
                            break;
                            case 2:
                                sobj['data'] = robj;
                            break;
                        }
                        lstpages[rtn][flkey].data = sobj['data'].map((value) => ({ ...value }));
                        for (i = 0; i < epta; i++) this.changsec[i] = false;
                        if(cbfct) cbfct(); else if (this.isloaded) { this.setState(sobj); }
                    }
                } else { mntst.show([[gvar[2][11209], 2]]); }
            }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); });
        } else { mntst.show(result); }
    } else { mntst.show([[gvar[2][14200], 2]]); }
    } else { robj.reqfld = reqfld; this.setState({ data: [robj] }, () => mntst.show([[gvar[2][20032], 2]])); }
}
export function sndreq(rtn, flkey, idx, item, atab, vdate, ovalue) {
    mntst.show([[gvar[2][6600], 1, 1]], -1, 1);
    var fdata = new FormData(), oitem = JSON.stringify(item), odet = this.state.det ? this.state.det.trim() : '', res, tempv = this.state.reqs.slice(0); tempv[idx]=1; this.setState({ e3: [13, null, item, atab, vdate, ovalue], reqs: tempv });
    fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'sndreq'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('Id_center', userarray.Id_center); fdata.append('atab', atab); fdata.append('idx', idx); fdata.append('item', oitem); fdata.append('det', odet);
    fetch(gvar[1][0] + gvar[1][1], { method: 'POST', timeout: gvar[13][65], body: fdata })
    .then((resp) => resp.json())
    .then((data) => {
        if (data) {
            let csrn = crnscrn || dshscrn, Id_obj; res=[];
            if (data.error) { data.error.map((elm) => res.push([gvar[2][elm], 2])); mntst.show(res); tempv = this.state.reqs.slice(0); tempv[idx]=null; if (this.isloaded) this.setState({ reqs: tempv }); } else {
                mnldr.toggle(() => { data.msg.map((elm) => res.push([gvar[2][elm], 1])); mntst.show(res); });
                tempv = lstpages[rtn][flkey].data.findIndex(elm => elm[scrnid[rtn][14][flkey]] == item[scrnid[rtn][14][flkey]]);
                if (tempv != -1) {
                    Object.keys(data.res).map((okey) => lstpages[rtn][flkey].data[tempv][okey] = data.res[okey]);
                    if (csrn.isloaded) csrn.setState({ data: lstpages[rtn][flkey].data.slice(0) });
                }
                tempv = 10*(parseInt(item.vtype)+4) + idx; Id_obj = item.vtype == 1 || item.vtype == 2 ? item.Id_ord : item.Id_plan; fdata = new FormData(); fdata.append('utoken', userarray.utoken); fdata.append('fct', 'pnotif'); fdata.append('alrtmails', userarray.alrtmails); fdata.append('infomails', userarray.infomails); fdata.append('admnmails', userarray.admnmails); fdata.append('alrtids', userarray.alrtids); fdata.append('infoids', userarray.infoids); fdata.append('admnids', userarray.admnids); fdata.append('atab', atab); fdata.append('idx', idx); fdata.append('item', oitem); fdata.append('det', odet); fdata.append('ntype', tempv); fdata.append('lemail', userarray.lemail); fdata.append('phone', userarray.phone); fdata.append('ophone', userarray.ophone); fdata.append('uvalue', userarray.value);
                fetch(gvar[1][0] + gvar[1][5] + '?timezone=' + userarray.timezone + '&smode=,1,&Id_login=&Id_sender=' + userarray.id + '&sId_typeuser=' + userarray.Id_typeuser + '&svalue=' + userarray.value + '&photo=' + userarray.photo + '&cpicon=&minfo=' + userarray.value + '&Id_obj=' + Id_obj, { method: 'POST', timeout: gvar[13][65], body: fdata }).then((resp) => resp.json()).then((pdta) => { sserver({ id: userarray.id, type: 'notif', conid: conid, users: pdta[6].split(','), data: { nid: pdta[2], idreceiver: pdta[6], id: userarray.id, Id_typeuser: userarray.id.Id_typeuser, value: userarray.value, photo: userarray.photo, cpicon: '', minfo: userarray.value, date: pdta[3], mtext: pdta[7], mfile: '', ntype: tempv, idconvpool: '', cmplct: '', webconf: '', status: '', wbicon: '', wcicon: '', wid: pdta[5][0][0], wdate1: pdta[5][0][1], wdate2: pdta[5][0][2], wdate3: pdta[5][0][3], winfo1: pdta[5][0][4], Id_obj: pdta[5][0][5] || Id_obj, winfo3: pdta[5][0][6], wtype: pdta[5][0][7], wobj: pdta[5][0][8], wmedia: pdta[5][0][9]} }); if(pdta[0] == -1) mntst.show([[gvar[2][123], 2]]); else if(pdta[1]) mntst.show(pdta[1]); else mntst.show([[gvar[2][122], 1]]); }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); });
            }
        } else { mntst.show([[gvar[2][11209], 2]]); tempv = this.state.reqs.slice(0); tempv[idx]=null; if (this.isloaded) this.setState({ reqs: tempv }); }
    }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); tempv = this.state.reqs.slice(0); tempv[idx]=null; if (this.isloaded) this.setState({ reqs: tempv }); });
}
export function rquest() {
    var rtn = this.props.route.name, flkey = this.state.flkey, fdata = new FormData(); mntst.show([[gvar[2][6600], 1, 1]], -1, 1);
    fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'rquest'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('qdata', JSON.stringify(this.state.edata)); fdata.append('ckey', scrnid[rtn][4][1]);
    fetch(gvar[1][0] + gvar[1][1], { method: 'POST', timeout: gvar[13][65], body: fdata })
    .then((resp) => resp.json())
    .then((data) => {
        if (data == -1) mntst.show([[gvar[2][11209], 2]]); else { this.orfrsh(1); mntst.close(); }
    }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); });
}
export function squest(oqidx, difpg, cbfct) {
    var rtn = this.props.route.name, epta = scrnid[rtn][1].length, flkey = this.state.flkey, fdata = new FormData(), /*idx = oqidx - 1,*/ result = [], res = '', sobj = {}, tempv, ischg = false, newq = 0, remq = 0, updarr = {}, txtaval = {}, lbl = rtn == 'Questions' ? gvar[2][4807] : gvar[2][4808], arrlen, usrarr;
    for (i = 0; i < epta; i++) if (this.changsec[i]) { ischg = true; break; }
    if (ischg) {
        ischg = false; lstpages[rtn][flkey].data.map((item, j) => {
            if (!this.reqsec[flkey][j]) {
                let idquest = item.idquest, qtype = parseInt(item.qtype), qconv = parseInt(item.qconv), qrkey = item.idqr + ";" + item.vdate + ";" + scrnid[rtn][4][0].lang + ";" + scrnid[rtn][4][0].timezone + ";#" + scrnid[rtn][4][0].id + ";" + scrnid[rtn][4][0].Id_sup + ";" + item.idmp, aqrange, minv, maxv, qcond, qres, rscore = ''; txtaval[qrkey] = '';
                if (!isnull(this.state.data[j].vresp))
                    switch (qtype) {
                        case 1:
                            txtaval[qrkey] = this.state.data[j].vresp;
                            tempv = item.resps.findIndex(elm => elm.idress == txtaval[qrkey]); if (tempv != -1) rscore = item.resps[tempv].rseverity;
                            break;
                        case 5:
                            txtaval[qrkey] = this.state.data[j].vresp;
                            txtaval[qrkey].split(',').map((ival, ij) => { tempv = item.resps.findIndex(elm => elm.idress == ival); if (tempv != -1) rscore = rscore !== '' ? Math.max(rscore, parseFloat(item.resps[tempv].rseverity)) : parseFloat(item.resps[tempv].rseverity); });
                            break;
                        case 2:
                            txtaval[qrkey] = parseFloat(this.state.data[j].vresp.trim().replace(/\,/g, '.')); tempv = null;
                            aqrange = item.qrange.split('|'); arrlen = aqrange.length; minv = parseFloat(item.resps[0].min); maxv = parseFloat(item.resps[0].max);
                            res = this.checkminmax(txtaval[qrkey], j, gvar[2][2306], minv, maxv, parseFloat(item.resps[0].min2), parseFloat(item.resps[0].max2), '*'); if (res != '') result.push([res, 2]); else {
                                if (txtaval[qrkey] < minv || txtaval[qrkey] > maxv)
                                    switch (qconv) {
                                        case 1:
                                            if (minv < 90) txtaval[qrkey] = parseFloat((txtaval[qrkey] - 32) / 1.8).toFixed(1); else txtaval[qrkey] = parseFloat(txtaval[qrkey] * 1.8 + 32).toFixed(1);
                                            break;
                                    }
                                for (i = 0; i < arrlen; i++) {
                                    qcond = aqrange[i].split(';'); qcond[0] = parseFloat(qcond[0]); qcond[1] = parseFloat(qcond[1]); qres = qcond[0] != tempv ? txtaval[qrkey] >= qcond[0] : txtaval[qrkey] > qcond[0];
                                    if (qres && txtaval[qrkey] <= qcond[1]) { rscore = qcond[2]; break; } else tempv = qcond[1];
                                }
                            }
                            break;
                        case 3:
                            txtaval[qrkey] = parseFloat(this.state.data[j].vresp); tempv = null;
                            aqrange = item.qrange.split('|'); arrlen = aqrange.length;
                            for (i = 0; i < arrlen; i++) {
                                qcond = aqrange[i].split(';'); qcond[0] = parseFloat(qcond[0]); qcond[1] = parseFloat(qcond[1]); qres = qcond[0] != tempv ? txtaval[qrkey] >= qcond[0] : txtaval[qrkey] > qcond[0];
                                if (qres && txtaval[qrkey] <= qcond[1]) { rscore = qcond[2]; break; } else tempv = qcond[1];
                            }
                            break;
                        case 4:
                            let qinpts = item.qrange.split('*'), oval; txtaval[qrkey] = [];
                            item.resps.map((rval, ij) => {
                                oval = !isnull(this.state.data[j].resps[ij].vresp) ? parseFloat(this.state.data[j].resps[ij].vresp.trim().replace(/\,/g, '.')) : ''; tempv = null; txtaval[qrkey].push(oval);
                                if (oval !== '') {
                                    aqrange = qinpts[ij].split('|'); arrlen = aqrange.length; minv = parseFloat(item.resps[ij].min); maxv = parseFloat(item.resps[ij].max);
                                    res = this.checkminmax(oval, j, gvar[2][item.resps[ij].ttle][ij] ? gvar[2][item.resps[ij].ttle][ij] : gvar[2][2306] + ij, minv, maxv, null, null, '*'); if (res != '') result.push([res, 2]); else {
                                        for (i = 0; i < arrlen; i++) {
                                            qcond = aqrange[i].split(';'); qcond[0] = parseFloat(qcond[0]); qcond[1] = parseFloat(qcond[1]); qres = qcond[0] != tempv ? oval >= qcond[0] : oval > qcond[0];
                                            if (qres && oval <= qcond[1]) { rscore = rscore !== '' ? Math.max(rscore, parseFloat(qcond[2])) : parseFloat(qcond[2]); break; } else tempv = qcond[1];
                                        }
                                    }
                                }
                            }); if (rscore !== '') txtaval[qrkey] = txtaval[qrkey].join(item.vsep); else txtaval[qrkey] = '';
                            break;
                        default:
                            txtaval[qrkey] = sanitizeinput(this.state.data[j].vresp.trim()); rscore = item.qrange;
                    } else remq++;
                if (!item.rdate) { if (txtaval[qrkey] !== '') { newq++; ischg = true; updarr[qrkey] = [txtaval[qrkey], rscore]; if (!result.length) this.reqsec[flkey][item.idqr] = true; } }
                else { if (txtaval[qrkey] != item.vresp) { if (item.vresp === '') newq++; ischg = true; updarr[qrkey] = [txtaval[qrkey], rscore]; if (!result.length) this.reqsec[flkey][item.idqr] = true; } }
            }
        });
        if (!result.length) {
            if (ischg) {
                if (difpg) mntst.show([[gvar[2][6600], 1, 1]], -1, 1); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'squest'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('pid', scrnid[rtn][4][0].id); fdata.append('updarr', JSON.stringify(updarr)); fdata.append('ckey', scrnid[rtn][4][1]); fdata.append('wtype', scrnid[rtn][4][4]); fdata.append('ntype', scrnid[rtn][4][3]); fdata.append('idconvpool', scrnid[rtn][4][0].idconvpool); fdata.append('mcid', scrnid[rtn][4][0].mcid); fdata.append('msid', scrnid[rtn][4][0].msid); fdata.append('Id_sup', scrnid[rtn][4][0].Id_sup); fdata.append('langlb_137_4', gvar[2][13704]); fdata.append('langlb_40_7', gvar[2][4007]); fdata.append('langlb_40_8', gvar[2][4008]);
                fetch(gvar[1][0] + gvar[1][1], { method: 'POST', timeout: gvar[13][65], body: fdata })
                .then((resp) => resp.json())
                .then((data) => {
                    if (data) {
                        ischg = this.state.data.slice(0); res = convert_dt_date(new Date()); qcond = 0;
                        Object.keys(updarr).map((okey) => {
                            qrkey = okey.split(';')[0]; if (isnull(updarr[okey][0])) qcond++;
                            tempv = lstpages[rtn][flkey].data.findIndex(elm => elm[scrnid[rtn][14][flkey]] == qrkey);
                            if (tempv != -1) {
                                lstpages[rtn][flkey].data[tempv].vresp = updarr[okey][0].toString(); lstpages[rtn][flkey].data[tempv].rscore = updarr[okey][1]; lstpages[rtn][flkey].data[tempv].rdate = res;
                                if (lstpages[rtn][flkey].data[tempv].vsep) {
                                    aqrange = lstpages[rtn][flkey].data[tempv].vresp.split(lstpages[rtn][flkey].data[tempv].vsep);
                                    lstpages[rtn][flkey].data[tempv].resps.map((pval, pj) => lstpages[rtn][flkey].data[tempv].resps[pj].vresp = aqrange[pj]);
                                }
                            }
                            tempv = ischg.findIndex(elm => elm.idqr == qrkey);
                            if (tempv != -1) {
                                ischg[tempv].vresp = updarr[okey][0].toString(); ischg[tempv].rscore = updarr[okey][1]; ischg[tempv].rdate = res;
                                if (ischg[tempv].vsep) {
                                    aqrange = ischg[tempv].vresp.split(ischg[tempv].vsep);
                                    ischg[tempv].resps.map((pval, pj) => ischg[tempv].resps[pj].vresp = aqrange[pj]);
                                }
                            }
                            this.reqsec[flkey][qrkey] = false;
                        }); sobj['data'] = ischg; scrnid['Dashboard'][2] = 0; scrnid['Dashboard'][3] = [{ flkey: 0 }, 1];
                        for (i = 0; i < epta; i++) this.changsec[i] = false; scrnid[rtn][scrnid[rtn][4][2]] = scrnid[rtn][scrnid[rtn][4][2]] - newq + qcond; if (scrnid[rtn][scrnid[rtn][4][2]] < 0) scrnid[rtn][scrnid[rtn][4][2]] = 0;
                        if (difpg) { if (difpg == 2) mntst.show([[gvar[2][19900] + (remq > 0 ? '\n' + lbl + ': ' + remq : ''), 1]]); else msg = [[gvar[2][19900] + (remq > 0 ? '\n' + lbl + ': ' + remq : ''), 1]]; } else { mntst.show([[gvar[2][45040], 1]], 500); if (cbfct) cbfct(); }
                        if (this.isloaded) { this.setState(sobj, () => { if (difpg) if (cbfct) cbfct(); }); }
                        if (data[4]) {
                            Object.keys(data[4]).forEach(function (key) {
                                usrarr = convpoolarray.find(e => e.cpactive == 1 && (',' + e.cpusers + ',').indexOf(',' + key + ',') != -1);
                                if (usrarr !== undefined) {
                                    res = ''; result = usrarr.cpusers.split(','); tempv = usrarr.uactive.split(','); arrlen = result.length;
                                    for (i = 0; i < arrlen; i++) if (tempv[i] == 1 && result[i] != userarray.id) res += ',' + result[i]; if (res != '') res = res.substring(1);
                                    fdata = new FormData(); fdata.append('fct', 'msend'); fdata.append('pid', key); fdata.append('qdate', data[4][key][0]); fdata.append('stext', TRANS_ENCRYPT(gvar[2][13704] + ' ' + data[4][key][1][2] + ' ' + gvar[2][4007] + '\n' + gvar[2][4008])); fdata.append('atab', 103); fdata.append('lang', data[4][key][1][0]); fdata.append('tmzn', data[4][key][1][1]); fdata.append('cmplct', 1); fdata.append('usint', 1); fdata.append('sId_typeuser', 5); fdata.append('urmv', key); fdata.append('ntype', 21); fdata.append('utoken', userarray.utoken); fdata.append('Id_sender', key); fdata.append('Id_login', userarray.id); fdata.append('uid', userarray.Id_typeuser == 8 ? userarray.Id_sup : (userarray.Id_typeuser == 7 ? userarray.id : key)); fdata.append('idconvpool', usrarr.idconvpool); fdata.append('mcid', usrarr.Id_creator); fdata.append('msid', res); fdata.append('Id_sup', data[4][key][1][3]);
                                    fetch(gvar[1][0] + gvar[1][1], { method: 'POST', timeout: gvar[13][65], body: fdata })
                                    .then((resp) => resp.json())
                                    .then((data) => {
                                        if (data != -1) {
                                            data[2] = TRANS_DECRYPT(data[2]);
                                            fdata = new FormData(); fdata.append('fct', 'pnotif'); fdata.append('alrtmails', userarray.alrtmails); fdata.append('infomails', userarray.infomails); fdata.append('admnmails', userarray.admnmails); fdata.append('alrtids', userarray.alrtids); fdata.append('infoids', userarray.infoids); fdata.append('admnids', userarray.admnids); fdata.append('utoken', userarray.utoken); fdata.append('ntext', data[14]); fdata.append('mtext', data[2]); fdata.append('mfile', data[3]); fdata.append('atab', 103); fdata.append('ntype', data[15]); fdata.append('idconvpool', data[19]); fdata.append('cmplct', data[17]); fdata.append('webconf', data[4]); fdata.append('status', data[5]); fdata.append('wbicon', data[20]); fdata.append('wcicon', data[6]); fetch(gvar[1][0] + gvar[1][5] + '?timezone=' + userarray.timezone + '&smode=,1,&Id_login=' + data[12] + '&Id_sender=' + data[16] + '&sId_typeuser=' + data[8] + '&svalue=' + data[9] + '&photo=' + data[10] + '&cpicon=' + data[6] + '&minfo=' + data[13] + '&Id_obj=' + data[18], { method: 'POST', body: fdata }).then((resp) => resp.json()).then((pdta) => { sserver({ id: userarray.id, type: 'notif', conid: conid, users: pdta[6].split(','), data: { nid: pdta[2], idreceiver: pdta[6], id: data[16], Id_typeuser: data[8], value: data[9], photo: data[10], cpicon: data[6], minfo: data[13], date: pdta[3], mtext: pdta[7], mfile: data[3], ntype: data[15], idconvpool: data[19], cmplct: data[17], webconf: data[4], status: data[5], wbicon: data[20], wcicon: data[6], wid: pdta[5][0][0], wdate1: pdta[5][0][1], wdate2: pdta[5][0][2], wdate3: pdta[5][0][3], winfo1: pdta[5][0][4], Id_obj: pdta[5][0][5] || data[18], winfo3: pdta[5][0][6], wtype: pdta[5][0][7], wobj: pdta[5][0][8], wmedia: pdta[5][0][9]} }); if(pdta[1]) { mntst.show(pdta[1]); scrnid['Dashboard'][3] = 1; scrnid['Notifications'][3] = 1; } }).catch((error) => { });
                                        }
                                    }).catch((error) => { });
                                }
                            });
                        }
                    } else { mntst.show([[gvar[2][11209], 2]]); Object.keys(updarr).map((okey) => this.reqsec[flkey][okey.split(';')[0]] = false); }
                }).catch((error) => { mntst.show([[gvar[2][11209], 2]]); Object.keys(updarr).map((okey) => this.reqsec[flkey][okey.split(';')[0]] = false); });
            } else { if (difpg) { if (difpg == 2) mntst.show([[gvar[2][14200], 2]]); else if (remq > 0) msg = [[lbl + ': ' + remq, 2]]; } if (cbfct) cbfct(); }
        } else { mntst.show(result); }
    } else { lstpages[rtn][flkey].data.map((item, j) => { if (isnull(this.state.data[j].vresp)) remq++; }); if (difpg) { if (difpg == 2) mntst.show([[gvar[2][14200], 2]]); else if (remq > 0) msg = [[lbl + ': ' + remq, 2]]; } if (cbfct) cbfct(); }
}
export function onsqst(idx, scrl) { Keyboard.dismiss(); this.squest(this.state.qidx); this.setState({ qidx: idx + 1 }); if (scrl) this.mnscrlvw.scrollToIndex({ index: idx, animated: true }); }
export function onse(e, idx) { if (isnull(idx)) idx = Math.floor(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width); if (idx != this.state.qidx - 1 || this.state.qidx == this.state.data.length) this.onsqst(idx); }
export function onpr() { if (this.state.qidx > 1) this.onsqst(this.state.qidx - 2, 1); }
export function onne() { if (this.state.qidx < this.state.data.length) this.onsqst(this.state.qidx, 1); }
export function shitm(skey, index, secid, rind, exdt) {
    var sobj = {}, robj = this.state[skey].slice(0), cbfct;
    if (!this.state[skey][this.state.flkey][index] && secid) {
        this.state[skey][this.state.flkey].map((rval, rj) => robj[this.state.flkey][rj] = null); let cond = exdt ? !this.state.data[index][exdt] : !this.state.data[index];
        if (!this.fetsec[this.state.flkey][index] && cond) sobj['fload'] = 1; clearTimeout(this.svmr); cbfct = () => this.svmr = setTimeout(() => { if (!this.chart) this.mnscrlvw.scrollToIndex({ index: rind || index, animated: true }); }, 500);
    } robj[this.state.flkey][index] = !robj[this.state.flkey][index];
    sobj[skey] = robj; this.setState(sobj, cbfct);
}
export function checkval(skey, idx, resval, checked, nochg, cbfct) {
    var rtn = this.props.route.name, sobj = {};
    if (idx != null) {
        var robj = this.state.data.slice(0);
        if (checked) { if (robj[idx][skey]) robj[idx][skey] += ',' + resval; else robj[idx][skey] = resval; } else robj[idx][skey] = strim((',' + robj[idx][skey] + ',').replace(',' + resval + ',', ','), ','); if (robj[idx]['reqfld']) delete robj[idx]['reqfld'][skey]; sobj['data'] = robj;
    } else {
        sobj = Object.assign({}, this.state);
        if (checked) { if (sobj[skey]) sobj[skey] += ',' + resval; else sobj[skey] = resval; } else sobj[skey] = strim((',' + sobj[skey] + ',').replace(',' + resval + ',', ','), ','); if (sobj['reqfld']) delete sobj['reqfld'][skey];
    } if (this.isloaded) { this.setState(sobj, cbfct); if (!nochg) this.changsec[scrnid[rtn][2]] = true; }
}
export function radioval(skey, idx, resval, nochg, cbfct) {
    var rtn = this.props.route.name, sobj = {};
    if (idx != null) {
        if (this.state.data[idx][skey] != resval) {
            var robj = this.state.data.slice(0);
            robj[idx][skey] = resval; if (robj[idx]['reqfld']) delete robj[idx]['reqfld'][skey]; sobj['data'] = robj;
        }
    } else {
        if (this.state[skey] != resval) {
            sobj = Object.assign({}, this.state);
            sobj[skey] = resval; if (sobj['reqfld']) delete sobj['reqfld'][skey];
        }
    } if (this.isloaded) { this.setState(sobj, cbfct); if (!nochg) this.changsec[scrnid[rtn][2]] = true; }
}
export function chgti(idx, objs, edx, ekey, vsep, nochg, cbfct) {
    var rtn = this.props.navigation ? this.props.route.name : null, sobj = {}; cbfct = cbfct?[cbfct]:[];
    if (idx != null) {
        var robj = this.state.data.slice(0), ival = [], skey; sobj = {};
        if (objs) { skey = objs[0][0]; if (edx != null) if (ekey != null) objs.map((item, i) => { robj[idx][item[0]][edx][ekey] = item[1]; if (robj[idx][item[0]][edx][ekey]['reqfld']) { delete robj[idx][item[0]][edx][ekey]['reqfld']; if(item[2]&&item[3]) cbfct.push(()=>this.inputs[item[2]].setNativeProps(item[3])); } }); else objs.map((item, i) => { robj[idx][item[0]][edx] = item[1]; if (robj[idx][item[0]][edx]['reqfld']) { delete robj[idx][item[0]][edx]['reqfld']; if(item[2]&&item[3]) cbfct.push(()=>this.inputs[item[2]].setNativeProps(item[3])); } }); else objs.map((item, i) => { robj[idx][item[0]] = item[1]; if (robj[idx]['reqfld']) { delete robj[idx]['reqfld'][item[0]]; if(item[2]&&item[3]) cbfct.push(()=>this.inputs[item[2]].setNativeProps(item[3])); } }); if (vsep) if (edx != null) { if (robj[idx][skey]) { robj[idx][skey].map((item, i) => ival.push(item[ekey])); ival = ival.join(vsep); if (ival == vsep) ival = ''; robj[idx][ekey] = ival; } } else { if (robj[idx][ekey]) { robj[idx][ekey].map((item, i) => { robj[idx][ekey][i][skey] = objs[0][1]; ival.push(objs[0][1]); }); ival = ival.join(vsep); if (ival == vsep) ival = ''; robj[idx][skey] = ival; } } sobj['data'] = robj; }
    } else { sobj = Object.assign({}, this.state); if (objs) objs.map((item, i) => { sobj[item[0]] = item[1]; if (sobj['reqfld']) delete sobj['reqfld'][item[0]]; }); }
    if (this.isloaded) { this.setState(sobj, () => cbfct.map((fxt) => fxt())); if(this.changsec) if (!nochg) this.changsec[scrnid[rtn][2]] = true; else if (nochg==2) this.changsec[scrnid[rtn][2]] = false; else if (!nochg) this.changeeval[this.state.e3[0]] = true; else if (nochg==2) this.changeeval[this.state.e3[0]] = false; }
}
export function checkminmax(skey, idx, ttle, min, max, min2, max2, dv, edx, ekey, vsep) {
    var sobj = {}, res = '', ival, check2 = true, text2 = '';
    if (dv == '*') ival = parseFloat(skey); else if (idx != null) if (edx != null) if (ekey != null) ival = this.state.data[idx][skey][edx][ekey]; else ival = this.state.data[idx][skey][edx]; else ival = this.state.data[idx][skey]; else ival = this.state[skey];
    if (!isnull(ival)) {
        if (!isNaN(min2)) { check2 = ival < min2 || ival > max2; text2 = ' ' + gvar[2][2305] + ' ' + min2 + ' ' + gvar[2][2300] + ' ' + max2; }
        if (isNaN(ival) || ((ival < min || ival > max) && check2)) {
            res = ttle + ': ' + gvar[2][20900] + ' ' + min + ' ' + gvar[2][2300] + ' ' + max + text2;
            if (dv != '*') {
                if (idx != null) { var robj = this.state.data.slice(0); ival = []; if (edx != null) if (ekey != null) robj[idx][skey][edx][ekey] = dv; else robj[idx][skey][edx] = dv; else robj[idx][skey] = dv; if (vsep && robj[idx][skey]) { robj[idx][skey].map((item, i) => ival.push(item[ekey])); ival = ival.join(vsep); if (ival == vsep) ival = ''; robj[idx][ekey] = ival; } sobj['data'] = robj; } else sobj[skey] = dv;
                mntst.show([[res, 2]]); if (this.isloaded) { this.setState(sobj); }
            }
        }
    } return res;
}
export function adjphone(idx, objs, showt, regx, dv) {
    var sobj, result = [], res = '', dc, tempv;
    if (idx != null) {
        var robj = this.state.data.slice(0); sobj = {}; dc = robj[idx]['country'] != '' ? gvar[2]['lstcntrys'][robj[idx]['country']]['pcode'] : '';
        if (objs) objs.map((item, i) => {
            tempv = robj[idx][item[0]].replace(/ /g, ''); if (regx) tempv = tempv.replace(regx, '');
            res = verifphone(tempv, item[1], dc); if (Array.isArray(res)) robj[idx][item[0]] = res[0]; else if (res != '') { result.push([res, 2]); if(dv !== undefined) robj[idx][item[0]] = dv; }
        }); sobj['data'] = robj;
    } else {
        sobj = Object.assign({}, this.state); dc = sobj['country'] != '' ? gvar[2]['lstcntrys'][sobj['country']]['pcode'] : '';
        if (objs) objs.map((item, i) => {
            tempv = sobj[item[0]].replace(/ /g, ''); if (regx) tempv = tempv.replace(regx, '');
            res = verifphone(tempv, item[1], dc); if (Array.isArray(res)) sobj[item[0]] = res[0]; else if (res != '') { result.push([res, 2]); if(dv !== undefined) robj[idx][item[0]] = dv; }
        });
    } if (this.isloaded) { this.setState(sobj); if (showt && result.length) mntst.show(result); }
    return result;
}
export function glp(nusr, idx) {
    if (nusr) {
        var sobj, dou = false;
        if (idx != null) {
            var robj = this.state.data.slice(0); sobj = {};
            if (robj[idx]['login'] == '') { robj[idx]['login']=robj[idx]['lemail']; dou = true; } if (robj[idx]['pwd'] == '') { var cpwd = Math.floor(100000 + Math.random() * 900000).toString(); robj[idx]['pwd']=cpwd; robj[idx]['confpwd']=cpwd; dou = true; } sobj['data'] = robj;
        } else {
            sobj = Object.assign({}, this.state);
            if (sobj['login'] == '') { sobj['login']=sobj['lemail']; dou = true; } if (sobj['pwd'] == '') { var cpwd = Math.floor(100000 + Math.random() * 900000).toString(); sobj['pwd']=cpwd; sobj['confpwd']=cpwd; dou = true; }
        }
        if (this.isloaded) { if(dou) this.setState(sobj); return sobj.data.slice(0); }
    }
}
export function ept(w, extstl) {
    return (<View style={[{ width: w }, extstl]}><Text style={{ fontSize: 2 }}>{' '}</Text></View>);
}
export function udls(item, cbfct) {
    var rtn = this.props.route.name, flkey, idx; cbfct();
    if (parseInt(item.mstate) < 3) {
        var fdata = new FormData(); fdata.append('Id_typeuser', userarray.Id_typeuser); fdata.append('lang', userarray.lang); fdata.append('ispo', userarray.ispo); fdata.append('fct', 'udls'); fdata.append('Id_login', userarray.id); fdata.append('tmzn', userarray.timezone); fdata.append('utoken', userarray.utoken); fdata.append('acto', gvar[4]); fdata.append('gp90', gvar[13][90]); fdata.append('uid', scrnid[rtn][4][0].id); fdata.append('dlid', item.dlid); fdata.append('ckey', scrnid[rtn][4][1]); fdata.append('wtype', scrnid[rtn][4][4]); fdata.append('ntype', scrnid[rtn][4][3]); fdata.append('wobj', item.dlid); fdata.append('winfo1', item.icat); fdata.append('Id_obj', item.itype); fdata.append('winfo3', item.idesc); fdata.append('qdate', item.vdate);
        fetch(gvar[1][0] + gvar[1][1], { method: 'POST', timeout: gvar[13][65], body: fdata })
        .then((resp) => resp.json())
        .then((data) => {
            flkey = this.state.flkey; idx = lstpages[rtn][flkey].data.findIndex(elm => elm[scrnid[rtn][14][flkey]] == item.dlid);
            if (idx != -1) {
                lstpages[rtn][flkey].data[idx]['mstate'] = 3; scrnid[rtn][scrnid[rtn][4][2]] -= 1; if (scrnid[rtn][scrnid[rtn][4][2]] < 0) scrnid[rtn][scrnid[rtn][4][2]] = 0; scrnid['Dashboard'][2] = 0; scrnid['Dashboard'][3] = [{ flkey: 0 }, 1];
                if (this.isloaded) this.setState({ data: this.srhlpg('', flkey, 1) }); else scrnid[rtn][3] = [[['data', flkey, 1]]];
            }
        }).catch((error) => { });
    }
}
export function u56(item) {
}
export function u140(item) {
}
export function u128(item) {
}
export function u143(item) {
}
export function u129(item) {
}
export function u139(item) {
}
export function u141(item) {
}
export function u54(item) {
}
export function unv(item) {
}
export class R55 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    let ibg0, ibg1, ibg2, mstate = parseInt(item.mstate), qdate = item.qdate.substr(0, 16), fext = item.iext.toLowerCase(), isvid = gvar[13][6].indexOf(fext) != -1, cbfct;
    if (mstate == 1/*&&!dets*/) { ibg0 = { backgroundColor: Cnt.clrs.blackcolor2 }; ibg1 = { color: Cnt.clrs.bluecolor }; ibg2 = Stl.lbicon; /*this.props.tt.enotif.push(item.dlid);*/ }
    if (gvar[13][5].indexOf(fext) != -1) { let ourl = item.url, abcd = this.props.tt.dsrc[0].findIndex(elm => elm.url == ourl); if (abcd == -1) { abcd = this.props.tt.dsrc[0].length; this.props.tt.dsrc[0].push({ url: ourl, props: { title: item.idesc + ' [' + qdate + ']' }, id: abcd }); } if (!dets) cbfct = () => this.props.tt.udls(item, () => dispimg(0, 0, null, abcd, Cnt.clrs.lightbg)); else cbfct = () => dispimg(0, 0, null, abcd, Cnt.clrs.lightbg); } else { if (!dets) cbfct = () => this.props.tt.udls(item, () => mnldr.showclose('flex', [9, null, item.url, Cnt.clrs.lightbg, fext, item.idesc + ' [' + qdate + ']', 'http://docs.google.com/gview?embedded=true&url=', isvid])); else cbfct = () => mnldr.showclose('flex', [9, null, item.url, Cnt.clrs.lightbg, fext, item.idesc + ' [' + qdate + ']', 'http://docs.google.com/gview?embedded=true&url=', isvid]); }
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={cbfct} style={[Stl.itmcont, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }, ibg0]}>
            {setpht(item, fileicn(item.idesc, fext), [dimsz[9], 2, dimsz[17], null, { backgroundColor: 'rgba(255,255,255,0)', alignSelf: 'flex-start' }], 2)}
            <View style={[Stl.itmhdiv, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1, marginStart: dmns.w16 }]}>
                <View style={[Stl.colico, { flex: 1 }]}>
                    <View style={[Stl.txtwrap]}><Text numberOfLines={item.details ? 1 : undefined} style={[Stl.alrttxt, { fontSize: dimsz[13], textAlign: 'left' }]}>{item.idesc}</Text></View><View style={[Stl.txtwrap]}><Text numberOfLines={3} style={[Stl.smalltext, { fontSize: dimsz[2], marginTop: dimsz[4] }]}>{item.details}</Text></View>
                </View>
                <View style={[Stl.colico, { alignItems: 'flex-end', width: '34%' }]}>
                    <Text style={[Stl.lbrdtext, { fontSize: dimsz[2], textAlign: 'right' }, ibg1]}>{qdate}</Text>
                    <Text style={[Stl.txts4, { fontSize: dimsz[2], textAlign: 'right', marginTop: dimsz[4] }, ibg2]}>{gvar[2]['lstdoclnk'][item.itype]}</Text>
                    {dets ? <Text style={{ textAlign: 'right' }}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6] }]} />{'  '}<Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}>{setval(item)}</Text></Text> : null}
                </View>
            </View>
        </TouchableOpacity>
    )
    }
}
export class R61 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.opndp(item.id, null, Object.assign({}, item), 'Profile')} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            {setpht(item, "person-outline", [dimsz[11], dimsz[9]])}
            <View style={[Stl.itmhdiv, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1, marginStart: dmns.w16 }]}>
                <View style={[Stl.colico, { flex: 1 }]}>
                    <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{setval(item)}</Text></View>
                    <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => Linking.openURL('tel://' + item.phone).catch((error) => mntst.show([[gvar[2][45049] + ' ' + item.phone, 2]]))} style={[Stl.rbox2, { alignSelf: 'flex-start' }]}><Icon3 name="call" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[24] }]} /><Text numberOfLines={1} style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1], textDecorationLine: 'underline' }]}>{item.phone}</Text></TouchableOpacity>
                    <View style={[Stl.txtwrap, { marginTop: dimsz[4] }]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}><Text style={[Stl.linktext,{lineHeight:dimsz[6]}]}>{gvar[2][137011]}{'\n'}</Text>{item.address}</Text></View>
                </View>
                <View style={[Stl.colico, { alignItems: 'flex-end', width: '34%' }]}>
                    <View style={{ flex: 1 }}></View>
                    <Text style={[Stl.lbrdtext, { fontSize: dimsz[2], textAlign: 'right' }]}><Text style={[Stl.linktext,{lineHeight:dimsz[6]}]}>{gvar[2][9508]}{'\n'}</Text>{item.pdate.substr(0, 16)}</Text>
                </View></View>
        </TouchableOpacity>
    )
    }
}
export class R56 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    let todate = item.enddate ? ' ➞ ' + item.enddate.substr(0, 10) : '', freq = [], days, times = [], repet = [], smode = [];
    switch (parseInt(item.category)) {
        case 2: case 6: case 7:
            switch (parseInt(item.datatype)) {
                case 1:
                    freq.push(gvar[2]['lstdtatyp'][1]);
                    break;
                case 2:
                    strim(item.repeats, ',').split(',').map((value, j) => freq.push(gvar[2]['lstwekdys'][value]));
                    break;
                case 3:
                    freq.push(gvar[2]['lstdtatyp'][3]); days = [];
                    strim(item.days, ',').split(',').map((value, j) => days.push(parseInt(value)));
                    days = <Text>{' ('}{gvar[2][18203]}{' '}{gvar[2][182017]}{': '}<Text style={[Stl.linktext]}>{days.join(', ')}</Text>{')'}</Text>;
                    break;
            }
            item.times.split(',').map((value, j) => times.push(value));
            repet.push(<Icon3 name="repeat" key={0} style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} />, <Text key={1} style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}><Text style={[Stl.linktext]}>{freq.join(', ')}</Text>{days}{' '}{gvar[2][18204]}{' '}<Text style={[Stl.linktext]}>{times.join(', ')}</Text></Text>);
            break;
    }
    strim(item.smode, ',').split(',').map((value, j) => smode.push(gvar[2]['lstnotmod'][value]));
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.u56(Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colico, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1 }]}>
                <View style={[Stl.colico]}>
                    <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{item.stext}</Text></View>
                    {item.qsymptom ? <View style={[Stl.rbox2, { marginTop: 1 }]}><Icon3 name="flash" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.txts1, { fontSize: dimsz[1] }]}>{item.qsymptom}</Text></View> : null}
                    <View style={[Stl.rbox2, { marginTop: dimsz[22] }]}><Icon3 name="calendar" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{item.startdate.substr(0, 10)}{todate}</Text></View>
                </View>
                <View style={[Stl.itmhdiv]}>
                    <View style={[Stl.colico]}>
                        <View style={[Stl.rbox2, { flex: 1 }]}>{repet}</View>
                        {(',6,7,').indexOf(',' + item.category + ',') == -1 ? <View style={[Stl.rbox2, { marginTop: dimsz[2] }]}><Icon3 name="send" style={{ fontSize: dimsz[6], width: dimsz[12], color: Cnt.clrs.lgraycolor2 }} /><Text style={[Stl.txth1, { fontSize: dimsz[1] }]}>{smode.join(', ')}</Text></View> : null}
                    </View>
                    {dets ? <View style={[Stl.colico, { alignItems: 'flex-end', width: '34%' }]}>
                        <View style={[Stl.txtwrap]}><Text style={[Stl.txts4, { fontSize: dimsz[2], textAlign: 'right', marginVertical: dimsz[4] }]}>{gvar[2][(150+gvar[13]['cat'][item.category][0])+"00"]}{'\n'}{gvar[2][(180+parseInt(item.tidx))+"00"]}</Text></View>
                        <Text style={{ textAlign: 'right' }}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6] }]} />{'  '}<Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}>{setval(item)}</Text></Text>
                    </View> : null}
                </View>
            </View>
        </TouchableOpacity>
    )
    }
}
export class R60 extends React.PureComponent { render() { return <R56 {...this.props} /> } }
export class R140 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    let olist = [];
    item.olist.map((rval, rj) => olist.push(<View key={rj} style={[Stl.rbox2, { marginVertical: 1 }]}><Icon3 name={rval.idress ? "pricetag" : "remove"} style={[Stl.dsbicon, { fontSize: dimsz[10], paddingEnd: dimsz[3] }]} /><View style={{ flex: 0.4, paddingEnd: dimsz[5] }}><Text style={[Stl.txth8, { fontSize: dimsz[2] }]}>{rval.idress}</Text></View><View style={[Stl.txtwrap]}><Text numberOfLines={3} style={[Stl.txth9, { fontSize: dimsz[2] }]}>{rval.textl}</Text></View></View>));
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.u140(Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colico, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1 }]}>
                <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{gvar[2][14009]}{' #'}{item.Id_ord}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[22] }]}><Icon3 name="calendar" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{item.vdate.substr(0, 16)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{setval(item)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="ellipsis-horizontal" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{item.comments}</Text></View></View>
                <Text style={[Stl.txts1, { fontSize: dimsz[1], marginTop: dimsz[4] }]}>{gvar[2][140018]}</Text><View style={[Stl.itmres, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4], marginTop: dimsz[19] }]}>{olist}</View>
            </View>
        </TouchableOpacity>
    )
    }
}
export class R128 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    let olist = [];
    item.olist.map((rval, rj) => olist.push(<View key={rj} style={[Stl.rbox2, { marginVertical: 1 }]}><Icon3 name={rval.idress ? "pricetag" : "remove"} style={[Stl.dsbicon, { fontSize: dimsz[10], paddingEnd: dimsz[3] }]} /><View style={{ flex: 0.4, paddingEnd: dimsz[5] }}><Text style={[Stl.txth8, { fontSize: dimsz[2] }]}>{rval.idress}</Text></View><View style={[Stl.txtwrap]}><Text numberOfLines={3} style={[Stl.txth9, { fontSize: dimsz[2] }]}>{rval.textl}</Text></View></View>));
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.u128(Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colico, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1 }]}>
                <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{gvar[2][12809]}{' #'}{item.Id_ord}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[22] }]}><Icon3 name="calendar" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{item.vdate.substr(0, 16)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{setval(item)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="ellipsis-horizontal" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{item.comments}</Text></View></View>
                <Text style={[Stl.txts1, { fontSize: dimsz[1], marginTop: dimsz[4] }]}>{gvar[2][140018]}</Text><View style={[Stl.itmres, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4], marginTop: dimsz[19] }]}>{olist}</View>
            </View>
        </TouchableOpacity>
    )
    }
}
export class R143 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    let olist = [];
    item.olist.map((rval, rj) => olist.push(<View key={rj} style={[Stl.rbox2, { marginVertical: 1 }]}><Icon3 name={rval.idress ? "pricetag" : "remove"} style={[Stl.dsbicon, { fontSize: dimsz[10], paddingEnd: dimsz[3] }]} /><View style={{ flex: 0.4, paddingEnd: dimsz[5] }}><Text style={[Stl.txth8, { fontSize: dimsz[2] }]}>{rval.idress}</Text></View><View style={[Stl.txtwrap]}><Text numberOfLines={3} style={[Stl.txth9, { fontSize: dimsz[2] }]}>{rval.textl}</Text></View></View>));
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.u143(Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colico, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1 }]}>
                <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{gvar[2][14309]}{' #'}{item.Id_ord}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[22] }]}><Icon3 name="calendar" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{item.vdate.substr(0, 16)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{setval(item)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="ellipsis-horizontal" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{item.comments}</Text></View></View>
                <Text style={[Stl.txts1, { fontSize: dimsz[1], marginTop: dimsz[4] }]}>{gvar[2][143018]}</Text><View style={[Stl.itmres, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4], marginTop: dimsz[19] }]}>{olist}</View>
            </View>
        </TouchableOpacity>
    )
    }
}
export class R129 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    let olist = [];
    item.olist.map((rval, rj) => olist.push(<View key={rj} style={[Stl.rbox2, { marginVertical: 1 }]}><Icon3 name={rval.idress ? "pricetag" : "remove"} style={[Stl.dsbicon, { fontSize: dimsz[10], paddingEnd: dimsz[3] }]} /><View style={[Stl.txtwrap, { paddingEnd: dimsz[5] }]}><Text style={[Stl.txth8, { fontSize: dimsz[2] }]}>{rval.textl}</Text></View>{rval.posology?<View style={[Stl.txtwrap]}><Text style={[Stl.txth9, { fontSize: dimsz[2] }]}>{rval.posology}{' '}{gvar[2]['lstphrfrm'][rval.posology]}{' '}{gvar[2]['lstmedfrq'][rval.frequency]}{rval.durationdetail == 4 ? '' : ' ' + gvar[2][129010] + ' ' + rval.duration + ' ' + gvar[2]['lstmeddur'][rval.durationdetail]}</Text></View>:null}</View>));
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.u129(Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colico, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1 }]}>
                <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{gvar[2][12909]}{' #'}{item.Id_ord}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[22] }]}><Icon3 name="calendar" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{item.vdate.substr(0, 16)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{setval(item)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="ellipsis-horizontal" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{item.comments}</Text></View></View>
                <Text style={[Stl.txts1, { fontSize: dimsz[1], marginTop: dimsz[4] }]}>{gvar[2][129018]}</Text><View style={[Stl.itmres, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4], marginTop: dimsz[19] }]}>{olist}</View>
            </View>
        </TouchableOpacity>
     )
    }
}
export class R139 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.u139(Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colico, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1 }]}>
                <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{gvar[2][13906]}{' #'}{item.Id_ord}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[22] }]}><Icon3 name="calendar" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{item.vdate.substr(0, 16)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{setval(item)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="ellipsis-horizontal" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{item.comments}</Text></View></View>
            </View>
        </TouchableOpacity>
    )
    }
}
export class R141 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    let olist = [];
    item.olist.map((rval, rj) => olist.push(<View key={rj} style={[Stl.rbox2, { marginVertical: 1 }]}><Icon3 name={rval.idress ? "pricetag" : "remove"} style={[Stl.dsbicon, { fontSize: dimsz[10], paddingEnd: dimsz[3] }]} /><View style={{ flex: 0.4, paddingEnd: dimsz[5] }}><Text style={[Stl.txth8, { fontSize: dimsz[2] }]}>{rval.idress}</Text></View><View style={[Stl.txtwrap]}><Text numberOfLines={3} style={[Stl.txth9, { fontSize: dimsz[2] }]}>{rval.textl}</Text></View></View>));
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.u141(Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colico, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1 }]}>
                <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{gvar[2][14104]}{' #'}{item.Id_ord}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[22] }]}><Icon3 name="calendar" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{item.vdate.substr(0, 16)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{setval(item, 1)}</Text></View>
                {item.cpname ? <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="people" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{item.cpname.toUpperCase()}</Text></View> : null}
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="ellipsis-horizontal" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{item.sproc}</Text></View></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="location" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}>{item.sloc}</Text></View></View>
                {item.diagnosisid ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.tosec(140)} style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon2 name="diagnoses" style={[Stl.wicon, { fontSize: dimsz[13], width: dimsz[12] }]} /><Text style={[Stl.linktext, { fontSize: dimsz[1] }]}>{gvar[2][14009]}{' #'}{item.diagnosisid}</Text></TouchableOpacity> : null}
                <Text style={[Stl.txts1, { fontSize: dimsz[1], marginTop: dimsz[4] }]}>{gvar[2][141011]}</Text><View style={[Stl.itmres, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4], marginTop: dimsz[19] }]}>{olist}</View>
            </View>
        </TouchableOpacity>
    )
    }
}
export class R54 extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    let secdet = [], smode = [], questions = [], srgf = surglist.find(elm => elm.id == scrnid['Details'][4][0].id);
    if (srgf) {
        strim(item.smode, ',').split(',').map((value, j) => smode.push(gvar[2]['lstnotmod'][value]));
        item.questions.map((ival, idx) => questions.push(<R56 key={idx} tt={this.props.tt} item={ival} index={idx} pdhl={pdhl} />));
        secdet.push(<View key={'g0'} style={[Stl.txtwrap, { backgroundColor: Cnt.clrs.blackcolor4, paddingHorizontal: pdhl, paddingVertical: dimsz[4] }]}><Text style={[Stl.txts1, { fontSize: dimsz[0] }]}>{capitalize(gvar[2][54029])}</Text></View>, <TouchableOpacity key={'g1'} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.u54(Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colico, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1 }]}>
                <View style={[Stl.rbox2]}><Icon3 name="calendar" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{item.startdate.substr(0, 16)}{' ➞ '}{item.enddate.substr(0, 16)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{setval(item)}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="ellipsis-horizontal" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{item.details}</Text></View></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="send" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{smode.join(', ')}</Text></View>
                <Text style={[Stl.txts1, { fontSize: dimsz[1], marginTop: dimsz[4] }]}>{gvar[2][54048]}</Text><View style={[Stl.itmres, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4], marginTop: dimsz[19] }]}>{lsurg(scrnid['Details'][4][0], srgf)}</View>
            </View></TouchableOpacity>, <View key={'g2'} style={[Stl.txtwrap, { backgroundColor: Cnt.clrs.blackcolor4, paddingHorizontal: pdhl, paddingVertical: dimsz[4] }]}><Text style={[Stl.txts1, { fontSize: dimsz[0] }]}>{capitalize(gvar[2][54031])}</Text></View>, questions.length ? questions : this.props.tt.eptlpg({style:{ height: dimsz[20] }}, [gvar[2][54023], gvar[2][54023]], null, 'g3'), <View key={'g6'} style={[Stl.txtwrap, { backgroundColor: Cnt.clrs.blackcolor4, paddingHorizontal: pdhl, paddingVertical: dimsz[4] }]}><Text style={[Stl.txts1, { fontSize: dimsz[0] }]}>{capitalize(gvar[2][54030])}</Text></View>, item.nextvisit.Id_plan ? <Rnv key={'g5'} tt={this.props.tt} item={item.nextvisit} index={index} pdhl={pdhl} dets={dets} /> : this.props.tt.eptlpg({style:{ height: dimsz[20] }}, [gvar[2][48037], gvar[2][48037]], null, 'g5'));
    } else secdet = this.props.tt.eptlpg({style:{ height: dimsz[20] }}, [gvar[2][54044], gvar[2][54044]], null, 'g7');
    return (
        <View key={index}>{secdet}</View>
    )
    }
}
export class Rnv extends React.PureComponent {
    render() {
    var { item, index, pdhl, dets } = this.props;
    let ttle, purpose, alarms = [];
    if (item.nvalarms) {
        ttle = gvar[2]['lstvispur'][item.purpose]; let acnt = 0;
        item.nvalarms.split(',').map((value, j) => { if (value) { alarms.push(<Text key={j} style={[Stl.qtext, { fontSize: dimsz[2] }]}>{acnt > 0 ? ',  ' : ''}<Text key={j} style={[Stl.linktext, { fontSize: dimsz[2] }]}>{value}{' '}{j == 0 ? gvar[2]['lstmeddur'][1] : j == 1 ? gvar[2]['lstmeddur'][1] : gvar[2][54041]}</Text>{' '}{gvar[2][54040]}</Text>); acnt++; } }); alarms = <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="alarm" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.rbox2, Stl.txtwrap]}>{alarms}</View></View>;
    } else {
        ttle = gvar[2][104032] + ' #' + item.Id_plan;
        purpose = <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="arrow-forward-circle" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{gvar[2]['lstvispur'][item.purpose]}</Text></View>;
    }
    return (
        <TouchableOpacity key={index} activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.unv(Object.assign({}, item))} style={[Stl.rbox2, { paddingHorizontal: pdhl, paddingTop: dimsz[6] }]}>
            <View style={[Stl.colico, Stl.lsepdiv, { flex: 1, paddingBottom: dimsz[1], marginBottom: 1 }]}>
                <View style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[0], textAlign: 'left' }]}>{ttle}</Text></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[22] }]}><Icon3 name="calendar" style={[Stl.hicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.graytext, Stl.hicon, { fontSize: dimsz[1] }]}>{item.pdate.substr(0, 16)}</Text></View>
                {item.id ? <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="person" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><Text style={[Stl.lbrdtext, { fontSize: dimsz[1] }]}>{setval(item)}</Text></View> : null}
                {purpose}
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="ellipsis-horizontal" style={[Stl.wicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{item.details}</Text></View></View>
                <View style={[Stl.rbox2, { marginTop: dimsz[19] }]}><Icon3 name="location" style={[Stl.lbdicon, { fontSize: dimsz[6], width: dimsz[12] }]} /><View style={[Stl.txtwrap]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}>{item.place ? item.place.toUpperCase() + '\n' : ''}{item.address}</Text></View></View>
                {alarms}
            </View>
        </TouchableOpacity>
    )
    }
}
export class R57 extends React.PureComponent {
    render() {
    var { item, index, pdhl, pdhv, stips, btnstl, istl, vstl, sstl, mnwd, cstl } = this.props;
    let mcnt = [], textl = [/*<Text key={0} style={[Stl.alrttxt, Stl.dyicon, { fontSize: dimsz[6], textAlign: 'left', paddingEnd: dimsz[0] }]}>{index + 1}{'.'}</Text>,*/<View key={1} style={[Stl.txtwrap]}><Text style={[Stl.alrttxt, { fontSize: dimsz[10], textAlign: 'left' }]}>{item.textl}</Text></View>], dis = Boolean(item.dis), vsep, stxt, scb, rtn = this.props.tt.props.route.name;
    switch (parseInt(item.qtype)) {
        case 1:
        case 10:
            item.resps.map((rval, rj) => {
                let ibg, chkd; if (this.props.tt.state.data[index]['vresp'] == rval.idress) { ibg = Cnt.prps.d2opcty; chkd = true; } else { ibg = 'transparent'; chkd = false; }
                mcnt.push(<Rbn key={rj} style={cstl.concat([{ backgroundColor: ibg }])} label={rval.textl} desc={rval.descl} descstl={stips} btnStyle={btnstl} sbtnStyle={[Stl.lbicon]} stxts={[Stl.hicon]} labelStyle={[Stl.qtext, { fontSize: dimsz[0] }]} nowrap={false} disabled={dis} checked={chkd} onPress={() => this.props.tt.radioval('vresp', index, rval.idress)} />);
            });
            break;
        case 2:
            mcnt.push(<TextInput key={0} ref={(ref) => this.props.tt.inputs[item.idqr] = ref} editable={!dis} contextMenuHidden={dis} onEndEditing={(e) => this.props.tt.checkminmax('vresp', index, gvar[2][2306], parseFloat(item.resps[0].min), parseFloat(item.resps[0].max), parseFloat(item.resps[0].min2), parseFloat(item.resps[0].max2), '')} onChangeText={(value) => { let tempv = this.props.tt.checknum(value, gvar[2][2306], ''); this.props.tt.chgti(index, [['vresp', tempv]]); }} value={this.props.tt.state.data[index]['vresp']} placeholder={gvar[2][2306]} placeholderTextColor={Cnt.clrs.lbrdcolor} autoCorrect={false} style={istl} keyboardType="numeric" onSubmitEditing={() => this.props.tt.squest(this.props.tt.state.qidx)} />);
            break;
        case 3:
            let smin = parseFloat(item.resps[0].min);
            mcnt.push(<View key={0} style={vstl}><Slider {...this.props.tt._panResponder.panHandlers} minimumValue={smin} maximumValue={parseFloat(item.resps[0].max)} step={parseFloat(item.resps[0].step)} value={!this.props.tt.state.data[index]['vresp'] ? smin : parseFloat(this.props.tt.state.data[index]['vresp'])} onValueChange={(value) => this.props.tt.chgti(index, [['vresp', value]])} onSlidingStart={() => this.props.tt.setState({ sldng: 1 })} onSlidingComplete={() => this.props.tt.setState({ sldng: null })} disabled={dis} minimumTrackTintColor={Cnt.clrs.redcolor} maximumTrackTintColor={Cnt.clrs.greencolor} style={sstl} /><View style={[Stl.itmhdiv, Stl.w100, { paddingHorizontal: dimsz[12], height: dimsz[6] }]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[13] }]}>{item.resps[0].min}</Text><Text style={[Stl.txth1, { fontSize: dimsz[23], color: Cnt.prps.sbgc[this.props.tt.state.data[index]['vresp']] }]}>{this.props.tt.state.data[index]['vresp']}</Text><Text style={[Stl.lbrdtext, { fontSize: dimsz[13] }]}>{item.resps[0].max}</Text></View></View>, <View key={1} style={[Stl.itmhdiv, Stl.w100, { paddingHorizontal: dimsz[6], marginBottom: dmns.h17 }]}><Icon2 name="smile" style={{ color: Cnt.clrs.greencolor, fontSize: dimsz[8] }} /><Icon2 name="tired" style={{ color: Cnt.clrs.redcolor, fontSize: dimsz[8] }} /></View>);
            break;
        case 4:
            vsep = this.props.tt.state.data[index]['vsep']; let ival = vsep ? this.props.tt.state.data[index]['vresp'].split(vsep) : [];
            item.resps.map((rval, rj) => {
                let ttle = gvar[2][item.resps[rj].ttle][rj] ? gvar[2][item.resps[rj].ttle][rj] : gvar[2][2306] + rj;
                mcnt.push(<TextInput key={rj} ref={(ref) => this.props.tt.inputs[item.idqr + rj] = ref} editable={!dis} contextMenuHidden={dis} onEndEditing={(e) => this.props.tt.checkminmax('resps', index, ttle, parseFloat(item.resps[rj].min), parseFloat(item.resps[rj].max), NaN, NaN, '', rj, 'vresp', vsep)} onChangeText={(value) => { let tempv = this.props.tt.checknum(value, ttle, ''); this.props.tt.chgti(index, [['resps', tempv]], rj, 'vresp', vsep); }} value={ival[rj]} placeholder={ttle} placeholderTextColor={Cnt.clrs.lbrdcolor} autoCorrect={false} style={istl} keyboardType="numeric" onSubmitEditing={() => this.props.tt.squest(this.props.tt.state.qidx)} />);
            });
            break;
        case 5:
            item.resps.map((rval, rj) => {
                let ibg, chkd; if ((',' + this.props.tt.state.data[index]['vresp'] + ',').indexOf(',' + rval.idress + ',') != -1) { ibg = Cnt.prps.d2opcty; chkd = true; } else { ibg = 'transparent'; chkd = false; }
                mcnt.push(<Cbx key={rval.idress} style={cstl.concat([{ backgroundColor: ibg }])} label={rval.textl} desc={rval.descl} descstl={stips} btnStyle={btnstl} sbtnStyle={[Stl.lbicon]} stxts={[Stl.hicon]} labelStyle={[Stl.qtext, { fontSize: dimsz[0] }]} nowrap={false} disabled={dis} checked={chkd} onPress={(checked) => this.props.tt.checkval('vresp', index, rval.idress, checked)} />);
            });
            break;
        default:
            mcnt.push(<TextInput key={0} ref={(ref) => this.props.tt.inputs[item.idqr] = ref} keyboardType="email-address" textContentType="none" autoFill={false} autoCompleteType="off" autoCorrect={false} editable={!dis} contextMenuHidden={dis} onChangeText={(value) => this.props.tt.chgti(index, [['vresp', value]])} value={this.props.tt.state.data[index]['vresp']} placeholder={gvar[2][2306]} placeholderTextColor={Cnt.clrs.lbrdcolor} style={istl} maxLength={300} onContentSizeChange={(e) => this.props.tt.inputs[item.idqr].setNativeProps({ style: { height: e.nativeEvent.contentSize.height + 10 } })} multiline={true} />);
    }
    if(this.props.tt.state.qidx < this.props.tt.state.data.length) { stxt = gvar[2][45057]; scb = () => this.props.tt.onne(); } else { stxt = gvar[2][45025]; scb = () => this.props.tt.squest(this.props.tt.state.qidx, 1, () => { Keyboard.dismiss(); if (scrnid[rtn][6]) this.props.tt.props.navigation.navigate(scrnid[rtn][6]); else this.props.tt.props.navigation.goBack(); }); }
    return (
        <ScrollView ref={(ref) => this.props.tt['svw' + index] = ref} scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"} style={[Stl.svcont, { width: dmns.width }]} contentContainerStyle={[Stl.svcont, { width: dmns.width }, pdhv]} refreshControl={<RefreshControl colors={[Cnt.clrs.yellowcolor]} tintColor={Cnt.clrs.yellowcolor} refreshing={this.props.tt.state.rfp && this.props.tt.state.rfp != -1} onRefresh={() => this.props.tt.setState({ fload: -4 }, () => this.props.tt.orfrsh(1))} />}>
            {item.qtipl ? <TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.shitm('qtipl', index)} style={[Stl.itmhdiv, {alignItems: 'flex-start'}]}>{textl}<Icon3 name="information-circle-outline" style={[Stl.lbdicon, { fontSize: dimsz[17], paddingStart: dimsz[0] }]} /></TouchableOpacity> : <View style={[Stl.itmhdiv]}>{textl}</View>}
            <View style={[Stl.rbox2, { paddingTop: dimsz[5] }]}><Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}><Text style={{ textDecorationLine: 'underline' }}>{gvar[2][45035].toUpperCase()}{':'}</Text>{' '}{item.qdate.substr(0, 16)}</Text></View>
            {this.props.tt.state.qtipl[this.props.tt.state.flkey][index] ? <View style={[Stl.itmres, { paddingHorizontal: dimsz[2], paddingVertical: dimsz[4], marginTop: dimsz[19] }]}><Text style={[Stl.fwdtext, Stl.dsbicon, Stl.txtwrap, { fontSize: dimsz[2] }]}>{item.qtipl}</Text></View> : null}
            <View style={{ paddingTop: dimsz[17] }}>{mcnt}</View>
            {dis ? item.rdate ? <View style={[Stl.coldiv, { paddingHorizontal: dimsz[6], paddingTop: dimsz[8] }]}><View style={[Stl.rectres, Stl.shdw, { paddingVertical: appstt[1] * dimsz[4], paddingHorizontal: dimsz[0], marginVertical: dimsz[19], minWidth: mnwd, backgroundColor: Cnt.clrs.dyellowcolor }]}><Text style={[Stl.txts1, { fontSize: dimsz[1], textAlign: 'center' }]}>{gvar[2][45034].toUpperCase()}{': '}{item.rdate.substr(0, 16)}</Text></View></View> : null : <View style={[Stl.coldiv, { paddingHorizontal: dimsz[6], paddingTop: dimsz[8] }]}><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={scb} style={[Stl.rectres, Stl.shdw, { paddingVertical: appstt[1] * dimsz[3], paddingHorizontal: dimsz[0], marginVertical: appstt[1] * dimsz[4], minWidth: mnwd, backgroundColor: Cnt.clrs.dyellowcolor }]}><Text style={[Stl.txts1, { fontSize: dimsz[1], textAlign: 'center' }]}>{stxt.toUpperCase()}</Text></TouchableOpacity><TouchableOpacity activeOpacity={Cnt.prps.tchblopcty} onPress={() => this.props.tt.chgti(index, [['vresp', '']], null, 'resps', vsep, 2)} style={[Stl.rectres, Stl.shdw, { paddingVertical: appstt[1] * dimsz[3], paddingHorizontal: dimsz[0], marginVertical: appstt[1] * dimsz[4], minWidth: mnwd, backgroundColor: Cnt.clrs.dredcolor }]}><Text style={[Stl.txts1, { fontSize: dimsz[1], textAlign: 'center' }]}>{gvar[2][45032].toUpperCase()}</Text></TouchableOpacity></View>}
        </ScrollView>
    )
    }
}
export function lsurg(item, srgf) {
    let srgd = [], vdate, cptlist; if (!srgf) srgf = surglist.find(elm => elm.id == item.id);
    if (srgf && srgf.vdate) {
        vdate = srgf.vdate.split('|'); cptlist = srgf.cptlist.split('|'); vdate.map((sval, sj) => {
            srgd.push(<View key={sj} style={[Stl.clmndiv, { marginVertical: dimsz[5] }]}>
                <View style={[Stl.itmcont, Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{gvar[2][14108]}{':  '}</Text><Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}>{vdate[sj]}</Text></View>
                <View style={[Stl.itmcont, Stl.txtwrap]}><Text style={[Stl.smalltext, { fontSize: dimsz[2] }]}>{gvar[2][141015]}{':  '}</Text><Text style={[Stl.lbrdtext, { fontSize: dimsz[2] }]}>{cptlist[sj]}</Text></View></View>);
        });
    }
    return srgd;
}
export function tosec(idx) {
    var rtn = this.props.route.name, flkey = this.state.flkey, index;
    index = scrnid[rtn][9][flkey].findIndex(elm => elm[0] == idx); if (index == -1) index = 0;
    if (this.state.secst&&this.state.secst[flkey][index]) this.mnscrlvw.scrollToIndex({ index, animated: true }); else this.shitm('secst', index, 'sec');
}
export function dispimg(idx, typ, id, index, bgc, cbfct) {
    let csrn = crnscrn || dshscrn;
    if(csrn)
        switch (idx) {
            case 0:
            if (csrn.dsrc[typ] != -1) {
                var imageUrls;
                if (id) imageUrls = csrn.dsrc[typ].filter(elm => { return elm.id == id }); else imageUrls = csrn.dsrc[typ];
                if (imageUrls.length == 0) imageUrls = [{ url: '', props: { title: gvar[2][45033] } }];
                mnldr.showclose('flex', [1, null, index || 0, bgc, imageUrls], cbfct);
            }
            break;
        }
}
export function viewfile(url, dname, fext) {
    mnldr.showclose('flex', [null, null, 1]);
    if (!dname) dname = url.split('/').pop(); if (!fext && dname) fext = dname.substring(dname.lastIndexOf('.') + 1).toLowerCase(); var fpath = RNFB.fs.dirs.DocumentDir + '/' + dname;
    if (Platform.OS == 'android') RNFB.config({ path: fpath, fileCache: true }).fetch('GET', url).then((res) => { mnldr.toggle(() => setTimeout(() => RNFB.android.actionViewIntent(fpath, mimtyp[fext]).then((success) => { RNFB.session('appsess').add(fpath); }).catch((error) => { mnldr.toggle(() => { if (error) mntst.show([[gvar[2][110], 2], [gvar[2][111], 2]]); }); }), 1000)); });
    else RNFB.config({ path: fpath, fileCache: true }).fetch('GET', url).then((res) => { mnldr.toggle(() => setTimeout(() => RNFB.ios.previewDocument(fpath).then((success) => { RNFB.session('appsess').add(fpath); }).catch((error) => { mnldr.toggle(() => { if (error) mntst.show([[gvar[2][110], 2], [gvar[2][111], 2]]); }); }), 1000)); });
}
export function downloadsave(url) {
    var fpath = RNFB.fs.dirs.PictureDir + '/' + url.split('/').pop();
    RNFB.config({ path: fpath }).fetch('GET', url).then((data) => { RNFB.fs.scanFile([{ path: fpath }]); }); mntst.show([[gvar[2][19900], 1]]);
}
export function rfdsh(idata, csrn, rtn, scrnm, ovalue, photo, cpicon, cpname, noinc, mdate) {
    var flkey = 0, tempv, sobj = [];
    if (idata.wtype) { if (rtn == 'Dashboard') { if (csrn) csrn.orfrsh(1); } else scrnid['Dashboard'][3] = 1; }
    if(idata.nid) {
        if (!noinc && scrnm != 'Notifications') scrnid[scrnm][scrnid[scrnm][4][2]] += idata.cnt ? parseInt(idata.cnt) : 1;
        if (lstpages['Notifications'] && lstpages['Notifications'][flkey].data) {
            tempv = lstpages['Notifications'][flkey].data.findIndex(elm => elm[scrnid['Notifications'][14][flkey]] == idata.nid);
            if (tempv == -1) {
                lstpages['Notifications'][flkey].data.unshift({ id: idata.id, Id_typeuser: idata.Id_typeuser, photo: idata.photo || photo, cpicon: idata.cpicon || cpicon, cpname: cpname, value: idata.value, Id_not: idata.nid, ndate: mdate, mtext: idata.mtext, ntype: idata.ntype, Id_obj: idata.Id_obj, mstate: 1, ephi: "", hshtext: "" });
                scrnid['Notifications'][2] = flkey; scrnid['Notifications'][scrnid['Notifications'][4][2]]++;
                if (rtn != 'Notifications') {
                    scrnid['Notifications'][3] = scrnid['Notifications'][3] == 1 ? scrnid['Notifications'][3] : [[['data', flkey, 2], ['flkey', 0]], 2];
                } else {
                    sobj = [{ data: csrn.srhlpg('', flkey, 2), flkey: 0 }, 2];
                    if (sobj.length) tempv = sobj[0]['data'].length; else { sobj = 2; tempv = null; }
                    if (csrn) csrn.orfrsh(scrnid['Notifications'][3] == 1 ? scrnid['Notifications'][3] : sobj, tempv);
                }
            }
        }
    }
}
