/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var {components, Cc, Ci, Cu, Cr} = require("chrome");

let {XPCOMUtils} = Cu.import("resource://gre/modules/XPCOMUtils.jsm");
let {NetUtil} = Cu.import("resource://gre/modules/NetUtil.jsm");

function Server(port, allowedIPs, callback)
{
  this.port = port;
  this._setAllowedIPs(allowedIPs);
  this.callback = callback;
  this._reinitSocket();
}

Server.prototype =
{
  socket: null,
  port: 0,
  loopbackOnly: false,
  allowedIPs: null,
  callback: null,
  timer: null,

  _reinitSocket: function()
  {
    if (this.socket)
    {
      try
      {
        this.socket.close();
      }
      catch (e)
      {
        Cu.reportError(e);
      }
      this.socket = null;
    }

    if (this.port)
    {
      try
      {
        this.socket = Cc["@mozilla.org/network/server-socket;1"].createInstance(Ci.nsIServerSocket);
        this.socket.init(this.port, this.loopbackOnly, -1);
        this.socket.asyncListen(this);
      }
      catch (e)
      {
        this.socket = null;
        Cu.reportError(e);
      }
    }
  },

  setPort: function(port)
  {
    if (this.port == port)
      {
      return;
      }

    this.port = port;
    this._reinitSocket();
  },

  _setAllowedIPs: function(string)
  {
    this.allowedIPs = {};
    this.loopbackOnly = true;
    let ips = string.split(/[\s,]+/);
    for (let i = 0; i < ips.length; i++)
    {
      if (ips[i])
      {
        this.allowedIPs[ips[i]] = true;
        if (!/^127\./.test(ips[i]) && ips[i] != "::1")
          {
          this.loopbackOnly = false;
          }
      }
    }
  },

  setAllowedIPs: function(string)
  {
    let oldLoopbackOnly = this.loopbackOnly;
    this._setAllowedIPs(string);
    if (oldLoopbackOnly != this.loopbackOnly)
      {
      this._reinitSocket();
      }
  },

  onSocketAccepted: function(server, transport)
  {
    if (!(transport.host in this.allowedIPs))
    {
      Cu.reportError("Extension Auto-Installer: connection attempt from " + transport.host + " rejected, not in the list of allowed IP addresses.");
      transport.close(Cr.NS_ERROR_FAILURE);
      return;
    }
    console.info('======================');
    console.info('recieved query');
    //console.info(transport.toString());
    //Returns [xpconnect wrapped (nsISupports, nsISocketTransport, nsITransport, nsIDNSListener, nsIInterfaceRequestor)]

    // So these 4 lines create a response stream, async fetch handles the rest
    let response = "HTTP/1.1 399 No Content\r\nConnection: close\r\nContent-Length: 0\r\n\r\n";
    let responseStream = Cc["@mozilla.org/io/string-input-stream;1"].createInstance(Ci.nsIStringInputStream);
    responseStream.setData(response, response.length);
    NetUtil.asyncCopy(responseStream, transport.openOutputStream(transport.OPEN_UNBUFFERED, 0, 0));

    NetUtil.asyncFetch(transport.openInputStream(0, 0, 0), (inputStream, result) => {
      //For some reason, this isn't working. Commented out for that reason.
      if (!components.isSuccessCode(result))
      {
        Cu.reportError("Extension Auto-Installer: failed reading data from incoming connection (error code " + result.toString(16) + ")");
        //return;
      }

      let binaryStream = Cc["@mozilla.org/binaryinputstream;1"].createInstance(Ci.nsIBinaryInputStream);
      binaryStream.setInputStream(inputStream);

      let data = binaryStream.readBytes(binaryStream.available());
      binaryStream.close();

      if (!/\r?\n\r?\n/.test(data))
      {
        Cu.reportError("Extension Auto-Installer: data received from incoming connection doesn't seem to be an HTTP request");
        return;
      }

      data = data.replace(/[\x00-\xFF]*?\r?\n\r?\n/, "");
      if (!data.length)
      {
        Cu.reportError("Extension Auto-Installer: no POST data received from incoming connection");
        return;
      }

      this.callback(data);
    });
  },

  onStopListening: function(server, status)
  {
    if (status != components.results.NS_BINDING_ABORTED && !this.timer)
    {
      // Attempt to reconnect after 10 seconds
      this.timer = Cc["@mozilla.org/timer;1"].createInstance(Ci.nsITimer);
      this.timer.initWithCallback(() => {
        this.timer = null;
        if (!this.socket || this.socket == server) {
          this._reinitSocket();
          }
      }, 10000, Ci.nsITimer.TYPE_ONE_SHOT);
    }
  },

  QueryInterface: XPCOMUtils.generateQI([Ci.nsIServerSocketListener])
};

exports.Server = Server;
