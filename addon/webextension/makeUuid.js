window.makeUuid = (function () {

  // From http://pastebin.com/JSgC7eej
  return function makeUuid() { // eslint-disable-line no-unused-vars
    // get sixteen unsigned 8 bit random values
    var u = window
      .crypto
      .getRandomValues(new Uint8Array(16));

    // set the version bit to v4
    u[6] = (u[6] & 0x0f) | 0x40

    // set the variant bit to "don't care" (yes, the RFC
    // calls it that)
    u[8] = (u[8] & 0xbf) | 0x80

    // hex encode them and add the dashes
    var uid = "";
    uid += u[0].toString(16);
    uid += u[1].toString(16);
    uid += u[2].toString(16);
    uid += u[3].toString(16);
    uid += "-";

    uid += u[4].toString(16);
    uid += u[5].toString(16);
    uid += "-";

    uid += u[6].toString(16);
    uid += u[7].toString(16);
    uid += "-";

    uid += u[8].toString(16);
    uid += u[9].toString(16);
    uid += "-";

    uid += u[10].toString(16);
    uid += u[11].toString(16);
    uid += u[12].toString(16);
    uid += u[13].toString(16);
    uid += u[14].toString(16);
    uid += u[15].toString(16);

    return uid;
  };
})();
null;
