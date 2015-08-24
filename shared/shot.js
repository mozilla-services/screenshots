// Note: in this library we can't use any "system" dependencies because this can be used from multiple
// environments
/* globals console */

/** Throws an error if the condition isn't true.  Any extra arguments after the condition
    are used as console.error() arguments. */
function assert(condition) {
  if (! condition) {
    console.error.apply(console, ["Failed assertion:"].concat(Array.prototype.slice.call(arguments, 1)));
    if (arguments.length > 1) {
      throw new Error("Failed assertion: " + Array.prototype.slice.call(arguments, 1).join(" "));
    } else {
      throw new Error("Failed assertion");
    }
  }
}

/** True if `url` is a valid URL */
function isUrl(url) {
  // FIXME: this is rather naive, obviously
  if ((/^about:.+$/i).test(url)) {
    return true;
  }
  if ((/^file:\/.*$/i).test(url)) {
    return true;
  }
  if ((/^data:.*$/i).test(url)) {
    return true;
  }
  return (/^https?:\/\/[a-z0-9\.\-]+[a-z]\/?/i).test(url);
}

/** Tests if a value is a set of attribute pairs, like [["name", "value"], ...] */
function isAttributePairs(val) {
  if (! Array.isArray(val)) {
    return false;
  }
  let good = true;
  val.forEach((pair) => {
    if (typeof pair[0] != "string" || (! pair[0]) || typeof pair[1] != "string") {
      good = false;
    }
  });
  return good;
}

/** Check if the given object has all of the required attributes, and no extra
    attributes exception those in optional */
function checkObject(obj, required, optional) {
  if (typeof obj != "object" || obj === null) {
    throw new Error("Cannot check non-object: " + (typeof obj) + " that is " + JSON.stringify(obj));
  }
  required = required || [];
  for (let attr of required) {
    if (! (attr in obj)) {
      return false;
    }
  }
  optional = optional || [];
  for (let attr in obj) {
    if (required.indexOf(attr) == -1 && optional.indexOf(attr) == -1) {
      return false;
    }
  }
  return true;
}

/** Create a JSON object from a normal object, given the required and optional
    attributes (filtering out any other attributes).  Optional attributes are
    only kept when they are truthy. */
function jsonify(obj, required, optional) {
  required = required || [];
  let result = {};
  for (let attr of required) {
    result[attr] = obj[attr];
  }
  optional = optional || [];
  for (let attr of optional) {
    if (obj[attr]) {
      result[attr] = obj[attr];
    }
  }
  return result;
}

/** Resolve url relative to base */
function resolveUrl(base, url) {
  // FIXME: totally ad hoc and probably incorrect, but we can't
  // use any libraries in this file
  if (url.search(/^https?:/) != -1) {
    // Absolute url
    return url;
  }
  if (url.indexOf("//") === 0) {
    // Protocol-relative URL
    return (/^https?:/i).exec(base)[0] + url;
  }
  if (url.indexOf("/") === 0) {
    // Domain-relative URL
    return (/^https?:\/\/[a-z0-9\.\-]+/i).exec(base)[0] + url;
  }
  // Otherwise, a full relative URL
  while (url.indexOf("./") === 0) {
    url = url.substr(2);
  }
  let match = (/.*\//).exec(base)[0];
  if (match.search(/^https?:\/$/i) === 0) {
    // Domain without path
    match = match + "/";
  }
  return match + url;
}

/** True if the two objects look alike.  Null, undefined, and absent properties
    are all treated as equivalent.  Traverses objects and arrays */
function deepEqual(a, b) {
  if ((a === null || a === undefined) && (b === null || b === undefined)) {
    return true;
  }
  if (typeof a != "object" || typeof b != "object") {
    return a === b;
  }
  if (Array.isArray(a)) {
    if (! Array.isArray(b)) {
      return false;
    }
    for (let i=0; i<a.length; i++) {
      if (! deepEqual(a[i], b[i])) {
        return false;
      }
    }
  }
  if (Array.isArray(b)) {
    return false;
  }
  let seen = {};
  for (let attr of a) {
    if (! deepEqual(a[attr], b[attr])) {
      return false;
    }
    seen[attr] = true;
  }
  for (let attr of b) {
    if (! seen[attr]) {
      if (! deepEqual(a[attr], b[attr])) {
        return false;
      }
    }
  }
  return true;
}

function makeUuid() {
  // FIXME: not a proper uuid
  let id = "";
  while (id.length < 12) {
    // 46656 == Math.pow(36, 3)
    let num;
    if (! id) {
      num = Date.now() % 46656;
    } else {
      num = Math.floor(Math.random() * 46656);
    }
    id += num.toString(36);
  }
  return id;
}

function formatAttributes(attrs) {
  if (! attrs) {
    return "";
  }
  let result = [];
  for (let item of attrs) {
    let name = item[0];
    let value = item[1];
    result.push(` ${name}="${escapeAttribute(value)}"`);
  }
  return result.join("");
}

function escapeAttribute(value) {
  if (! value) {
    return "";
  }
  value = value.replace(/&/g, "&amp;");
  value = value.replace(/"/g, "&quot;");
  return value;
}

class AbstractShot {

  constructor(backend, id, attrs) {
    this.clearDirty();
    attrs = attrs || {};
    assert((/^[a-zA-Z0-9]+\/[a-z0-9\.-]+$/).test(id), "Bad ID (should be alphanumeric):", JSON.stringify(id));
    this._backend = backend;
    this._id = id;
    this.url = attrs.url;
    this.docTitle = attrs.docTitle || null;
    this.ogTitle = attrs.ogTitle || null;
    this.userTitle = attrs.userTitle || null;
    this.createdDate = attrs.createdDate || Date.now();
    this.createdDevice = attrs.createdDevice || null;
    this.favicon = attrs.favicon || null;
    this.body = attrs.body || null;
    this.head = attrs.head || null;
    this.htmlAttrs = attrs.htmlAttrs || null;
    this.bodyAttrs = attrs.bodyAttrs || null;
    this.headAttrs = attrs.headAttrs || null;
    this._history = new this.History(this, attrs.history);
    this._comments = [];
    if (attrs.comments) {
      this._comments = attrs.comments.map(
        (json) => new this.Comment(json));
    }
    this.hashtags = attrs.hashtags || null;
    this.microdata = attrs.microdata || null;
    this.siteName = attrs.siteName || null;
    this.images = [];
    if (attrs.images) {
      this.images = attrs.images.map(
        (json) => new this.Image(json));
    }
    this.readable = null;
    if (attrs.readable) {
      this.readable = new this.Readable(attrs.readable);
    }
    this.deviceId = attrs.deviceId || null;
    this._clips = {};
    if (attrs.clips) {
      for (let clipId in attrs.clips) {
        let clip = attrs.clips[clipId];
        this._clips[clipId] = new this.Clip(this, clipId, clip);
      }
    }

    for (let attr in attrs) {
      if (attr !== "clips" && attr !== "id" && this.REGULAR_ATTRS.indexOf(attr) === -1) {
        throw new Error("Unexpected attribute: " + attr);
      } else if (attr === "id") {
        console.warn("passing id in attrs in AbstractShot constructor");
        console.trace();
        assert(attrs.id === this.id);
      }
    }
    // Reset all the dirty items that were unnecessarily set:
    this.clearDirty();
  }

  /** Update any and all attributes in the json object, with deep updating
      of `json.clips` */
  update(json) {
    let ALL_ATTRS = ["clips"].concat(this.REGULAR_ATTRS);
    assert(checkObject(json, [], ALL_ATTRS), "Bad attr to new Shot():", Object.keys(json));
    for (let attr in json) {
      if (attr == "clips") {
        continue;
      }
      if (typeof json[attr] == "object" && typeof this[attr] == "object" && this[attr] !== null) {
        let val = this[attr];
        if (val.asJson) {
          val = val.asJson();
        }
        if (! deepEqual(json[attr], val)) {
          this[attr] = json[attr];
        }
      } else if (json[attr] !== this[attr] &&
          (json[attr] || this[attr])) {
        this[attr] = json[attr];
      }
    }
    if (json.clips) {
      for (let clipId in json.clips) {
        if (! json.clips[clipId]) {
          this.delClip(clipId);
        } else if (! this.getClip(clipId)) {
          this.setClip(clipId, json.clips[clipId]);
        } else if (! deepEqual(this.getClip(clipId).asJson(), json.clips[clipId])) {
          this.setClip(clipId, json.clips[clipId]);
        }
      }
    }

  }

  _dirty(name) {
    this._dirtyItems[name] = true;
  }

  _dirtyClip(clipId) {
    this._dirtyClips[clipId] = true;
  }

  /** Clears the dirty attribute checking (e.g., to use after save) */
  clearDirty() {
    this._dirtyItems = {};
    this._dirtyClips = {};
  }

  /** Returns a JSON version of this shot */
  asJson() {
    let result = {};
    for (let attr of this.REGULAR_ATTRS) {
      var val = this[attr];
      if (val && val.asJson) {
        val = val.asJson();
      }
      result[attr] = val;
    }
    result.clips = {};
    for (let attr in this._clips) {
      result.clips[attr] = this._clips[attr].asJson();
    }
    return result;
  }

  /** A more minimal JSON representation for creating indexes of shots */
  asRecallJson() {
    let result = {};
    for (let attr of this.RECALL_ATTRS) {
      var val = this[attr];
      if (val && val.asJson) {
        val = val.asJson();
      }
      result[attr] = val;
    }
    return result;
  }

  /** Returns a JSON version of any dirty attributes of this object */
  dirtyJson() {
    var result = {};
    for (let attr in this._dirtyItems) {
      let val = this[attr];
      if (val && val.asJson) {
        val = val.asJson();
      }
      result[attr] = val;
    }
    for (let clipId of this._dirtyClips) {
      if (! result.clips) {
        result.clips = {};
      }
      var clip = this.getClip(clipId);
      if (clip) {
        result.clips[clipId] = clip.asJson();
      } else {
        result.clips[clipId] = null;
      }
    }
    return result;
  }

  staticHtml(options) {
    options = options || "";
    return `<!DOCTYPE html>
<html${formatAttributes(this.htmlAttrs)}>
<head${formatAttributes(this.headAttrs)}>
<meta charset="UTF-8">
${options.addHead || ""}
<base href="${this.url}">
${this.head}
</head>
<body${formatAttributes(this.bodyAttrs)}>
${this.body}
${options.addBody || ""}
</body>
</html>`;
  }

  get backend() {
    return this._backend;
  }

  get id() {
    return this._id;
  }

  get url() {
    return this._url;
  }
  set url(val) {
    assert(val && isUrl(val), "Bad URL:", val);
    this._dirty("url");
    this._url = val;
  }

  get urlDisplay() {
    if (this.url.search(/^https?/i) != -1) {
      let txt = this.url;
      txt = txt.replace(/^[a-z]+:\/\//i, "");
      txt = txt.replace(/\/.*/, "");
      txt = txt.replace(/^www\./i, "");
      return txt;
    } else if (this.url.startsWith("data:")) {
      return "data:url";
    } else {
      let txt = this.url;
      txt = txt.replace(/\?.*/, "");
      return txt;
    }
  }

  get viewUrl() {
    let url = this.backend + "/" + this.id;
    if (this.url.startsWith("http://")) {
      url = url.replace(/^https/i, "http");
    }
    return url;
  }

  get jsonUrl() {
    return this.backend + "/data/" + this.id;
  }

  get oembedUrl() {
    return this.backend + "/oembed?url=" + encodeURIComponent(this.viewUrl);
  }

  get createdDevice() {
    return this._createdDevice;
  }
  set createdDevice(val) {
    assert(val === null || (typeof val == "string" && val), "Bad createdDevice:", val);
    this._dirty("createdDevice");
    this._createdDevice = val;
  }

  get docTitle() {
    return this._title;
  }
  set docTitle(val) {
    assert(val === null || typeof val == "string", "Bad docTitle:", val);
    this._dirty("docTitle");
    this._title = val;
  }

  get comments() {
    // Kind of a simulation of a read-only array:
    // (because writes are ignored)
    return this._comments.slice();
  }
  addComment(json) {
    let comment = new this.Comment(json);
    this._comments.push(comment);
    this._dirty("comments");
  }
  updateComment(index, json) {
    let comment = new this._shot.Comment(json);
    this._comments[index] = comment;
    this._dirty("comments");
  }
  // FIXME: no delete, nor comment editing

  get ogTitle() {
    return this._ogTitle;
  }
  set ogTitle(val) {
    assert(val === null || typeof val == "string", "Bad ogTitle:", val);
    this._dirty("ogTitle");
    this._ogTitle = val;
  }

  get userTitle() {
    return this._userTitle;
  }
  set userTitle(val) {
    assert(val === null || typeof val == "string", "Bad userTitle:", val);
    this._dirty("userTitle");
    this._userTitle = val;
  }

  get title() {
    return this.userTitle || this.ogTitle || this.docTitle || this.url;
  }

  get createdDate() {
    return this._createdDate;
  }
  set createdDate(val) {
    assert(val === null || typeof val == "number", "Bad createdDate:", val);
    this._dirty("createdDate");
    this._createdDate = val;
  }

  get favicon() {
    return this._favicon;
  }
  set favicon(val) {
    assert(val === null || isUrl(val), "Bad favicon URL:", val);
    if (val) {
      val = resolveUrl(this.url, val);
    }
    this._dirty("favicon");
    this._favicon = val;
  }

  get history() {
    return this._history;
  }

  get hashtags() {
    return this._hashtags || [];
  }
  set hashtags(val) {
    assert (val === null || Array.isArray(val), ".hashtags must be an array:", val, typeof val);
    if (val) {
      val.forEach(
        (v) => assert(typeof v == "string", "hashtags array may only contain strings:", v));
    }
    this._dirty("hashtags");
    this._hashtags = val;
  }

  get readable() {
    return this._readable;
  }
  set readable(val) {
    assert(typeof val == "object" || ! val, "Bad Shot readable:", val);
    if (! val) {
      this._readable = val;
    } else {
      this._readable = new this.Readable(val);
    }
    this._dirty("readable");
  }

  clipNames() {
    let names = Object.getOwnPropertyNames(this._clips);
    names.sort(function (a, b) {
      return a.sortOrder < b.sortOrder ? 1 : 0;
    });
    return names;
  }
  getClip(name) {
    return this._clips[name];
  }
  addClip(val) {
    let name = makeUuid();
    this.setClip(name, val);
    return name;
  }
  setClip(name, val) {
    let clip = new this.Clip(this, name, val);
    this._dirtyClip(name);
    this._clips[name] = clip;
  }
  delClip(name) {
    if (! this._clips[name]) {
      throw new Error("No existing clip with id: " + name);
    }
    this._dirtyClip(name);
    delete this._clips[name];
  }
  biggestClipSortOrder() {
    let biggest = 0;
    for (let clipId in this._clips) {
      biggest = Math.max(biggest, this._clips[clipId].sortOrder);
    }
    return biggest;
  }
  updateClipUrl(clipId, clipUrl) {
    let clip = this.getClip(clipId);
    if ( clip && clip.image ) {
      clip.image.url = clipUrl;
    } else {
      console.warn("Tried to update the url of a clip with no image:", clip);
    }
  }

  // FIXME: we should check this object more thoroughly
  get microdata() {
    return this._microdata;
  }
  set microdata(val) {
    assert(typeof val == "object" || ! val);
    this._dirty("microdata");
    this._microdata = val;
  }

  get siteName() {
    return this._siteName || null;
  }
  set siteName(val) {
    assert(typeof val == "string" || ! val);
    this._dirty("siteName");
    this._siteName = val;
  }

  get head() {
    return this._head;
  }
  set head(val) {
    assert(typeof val == "string" || ! val, "Bad head:", val);
    this._dirty("head");
    this._head = val;
  }

  get body() {
    return this._body;
  }
  set body(val) {
    assert(typeof val == "string" || ! val, "Bad body:", val);
    this._dirty("body");
    this._body = val;
  }

  get bodyAttrs() {
    return this._bodyAttrs;
  }
  set bodyAttrs(val) {
    if (! val) {
      this._bodyAttrs = null;
    } else {
      assert(isAttributePairs(val), "Bad bodyAttrs:", val);
      this._bodyAttrs = val;
    }
    this._dirty("bodyAttrs");
  }

  get htmlAttrs() {
    return this._htmlAttrs;
  }
  set htmlAttrs(val) {
    if (! val) {
      this._htmlAttrs = null;
    } else {
      assert(isAttributePairs(val), "Bad htmlAttrs:", val);
      this._htmlAttrs = val;
    }
    this._dirty("htmlAttrs");
  }

  get headAttrs() {
    return this._headAttrs;
  }
  set headAttrs(val) {
    if (! val) {
      this._headAttrs = null;
    } else {
      assert(isAttributePairs(val), "Bad headAttrs:", val);
      this._headAttrs = val;
    }
    this._dirty("headAttrs");
  }

  get deviceId() {
    return this._deviceId;
  }
  set deviceId(val) {
    assert(typeof val == "string" || ! val);
    val = val || null;
    this._deviceId = val;
    this._dirty("deviceId");
  }

}

AbstractShot.prototype.REGULAR_ATTRS = (`
deviceId url docTitle ogTitle userTitle createdDate createdDevice favicon
history comments hashtags images readable head body htmlAttrs bodyAttrs
headAttrs microdata siteName
`).split(/\s+/g);

AbstractShot.prototype.RECALL_ATTRS = (`
deviceId url docTitle ogTitle userTitle createdDate createdDevice favicon
`).split(/\s+/g);

/** Represents the list of history items leading up to the given shot */
class _History {
  constructor(shot, json) {
    this._shot = shot;
    this._history = [];
    if (json && json.items) {
      json.items.forEach((val) => this.add(val));
    }
  }

  add(val) {
    assert(checkObject(val, ["url"], ["opened", "viewingTime", "docTitle", "favicon", "public"]), "Bad attrs in history item:", Object.keys(val));
    val.public = !! val.public;
    assert(isUrl(val.url), "Bad history item URL:", val.url);
    assert(typeof val.docTitle == "string" || ! val.docTitle, "Bad history item title:", val.docTitle);
    assert(typeof val.opened == "number" || ! val.opened, "Bad history item opened timestamp:", val.opened);
    assert(typeof val.viewingTime == "number" || ! val.viewingTime, "Bad history item viewingTime:", val.viewingTime);
    assert(typeof val.docTitle == "string" || ! val.docTitle, "Bad history item docTitle:", val.docTitle);
    assert((! val.favicon) || isUrl(val.favicon), "Bad history item favicon:", val.favicon);
    this._shot._dirty("history");
    this._history.push(val);
  }

  asJson() {
    return {
      items: this._history
    };
  }
  // FIXME: needs a way to toggle public without changing the entire history
}

// All classes are set on the AbstractShot prototype so that AbstractShot can be
// subclassed, and subclasses can subclass these contained classes
AbstractShot.prototype.History = _History;

/** Represents one comment, on a clip or shot */
class _Comment {
  // FIXME: either we have to notify the shot of updates, or make
  // this read-only (as a result this is read-only *but not enforced*)
  constructor(json) {
    assert(checkObject(json, ["user", "createdDate", "text"], ["hidden", "flagged"]), "Bad attrs for Comment:", Object.keys(json));
    assert(typeof json.user == "string" && json.user, "Bad Comment user:", json.user);
    this.user = json.user;
    assert(typeof json.createdDate == "number", "Bad Comment createdDate:", json.createdDate);
    this.createdDate = json.createdDate;
    assert(typeof json.text == "string", "Bad Comment text:", json.text);
    this.text = json.text;
    this.hidden = !! json.hidden;
    this.flagged = !! json.flagged;
  }

  asJson() {
    return jsonify(this, ["user", "createdDate", "text"], ["hidden", "flagged"]);
  }
}

AbstractShot.prototype.Comment = _Comment;

/** Represents one found image in the document (not a clip) */
class _Image {
  // FIXME: either we have to notify the shot of updates, or make
  // this read-only
  constructor(json) {
    assert(typeof json === "object", "Clip Image given a non-object", json);
    assert(checkObject(json, ["url"], ["dimensions", "isReadable", "title", "alt"]), "Bad attrs for Image:", Object.keys(json));
    assert(isUrl(json.url), "Bad Image url:", json.url);
    this.url = json.url;
    assert((! json.dimensions) ||
           (typeof json.dimensions.x == "number" && typeof json.dimensions.y == "number"),
           "Bad Image dimensions:", json.dimensions);
    this.dimensions = json.dimensions;
    assert(typeof json.title == "string" || ! json.title, "Bad Image title:", json.title);
    this.title = json.title;
    assert(typeof json.alt == "string" || ! json.alt, "Bad Image alt:", json.alt);
    this.alt = json.alt;
    this.isReadable = !! json.isReadable;
  }

  asJson() {
    return jsonify(this, ["url"], ["dimensions", "isReadable"]);
  }
}

AbstractShot.prototype.Image = _Image;

/** Represents the readable representation of the page that the Readability library returns */
class _Readable {
  // FIXME: either we have to notify the shot of updates, or make
  // this read-only
  constructor(json) {
    assert(checkObject(json, ["content"], ["title", "byline", "dir", "length", "excerpt", "readableIds"]), "Bad attrs for Readable:", Object.keys(json));
    assert(typeof json.title == "string" || ! json.title, "Bad Readable title:", json.title);
    this.title = json.title;
    assert(typeof json.byline == "string" || ! json.byline, "Bad Readable byline:", json.byline);
    this.byline = json.byline;
    this.dir = json.dir;
    assert(typeof json.content == "string" && json.content, "Bad Readable content:", json.content);
    this.content = json.content;
    assert(typeof json.length == "number" || ! json.length, "Bad Readable length:", json.length);
    this.length = json.length;
    assert(typeof json.excerpt == "string" || ! json.excerpt, "Bad Readable excerpt:", json.excerpt);
    this.excerpt = json.excerpt;
  }

  asJson() {
    return jsonify(this, ["content"], ["title", "byline", "dir", "length", "excerpt"]);
  }
}

AbstractShot.prototype.Readable = _Readable;

/** Represents a clip, either a text or image clip */
class _Clip {
  constructor(shot, id, json) {
    this._shot = shot;
    this._initialized = false;
    assert(checkObject(json, ["createdDate"], ["sortOrder", "image", "text", "comments"]), "Bad attrs for Clip:", Object.keys(json));
    assert(typeof id == "string" && id, "Bad Clip id:", id);
    this._id = id;
    this.createdDate = json.createdDate;
    assert(typeof json.sortOrder == "number" || ! json.sortOrder, "Bad Clip sortOrder:", json.sortOrder);
    if (json.sortOrder) {
      this.sortOrder = json.sortOrder;
    } else {
      let biggestOrder = shot.biggestClipSortOrder();
      this.sortOrder = biggestOrder + 100;
    }
    assert(! (json.image && json.text), "Clip cannot have both .image and .text", Object.keys(json));
    if (json.image) {
      this.image = json.image;
    } else if (json.text) {
      this.text = json.text;
    } else {
      assert(false, "No .image or .text");
    }
    if (json.comments) {
      this._comments = json.comments.map(
        (commentJson) => new shot.Comment(commentJson));
    } else {
      this._comments = [];
    }
    // From here after we track dirty attributes:
    this._initialized = true;
  }

  toString() {
    let s = `[Shot Clip id=${this.id} sortOrder=${this.sortOrder}`;
    if (this.image) {
      s += ` image ${this.image.dimensions.x}x${this.image.dimensions.y}]`;
    } else {
      s += ` text length ${this.text.text.length}]`;
    }
    return s;
  }

  _dirty(property) {
    if (this._initialized) {
      this._shot._dirtyClip(this.id);
    }
  }

  asJson() {
    var result = jsonify(this, ["createdDate", "type"], ["sortOrder", "image", "text"]);
    if (this.comments.length) {
      result.comments = this.comments.map(
        (comment) => comment.asJson());
    }
    return result;
  }

  get id() {
    return this._id;
  }

  get comments() {
    return this._comments.slice();
  }
  addComment(json) {
    let comment = new this._shot.Comment(json);
    this._comments.push(comment);
    this._dirty("comments");
  }
  updateComment(index, json) {
    let comment = new this._shot.Comment(json);
    this._comments[index] = comment;
    this._dirty("comments");
  }

  get createdDate() {
    return this._createdDate;
  }
  set createdDate(val) {
    assert(typeof val == "number" || ! val, "Bad Clip createdDate:", val);
    this._dirty("createdDate");
    this._createdDate = val;
  }

  get image() {
    return this._image;
  }
  set image(image) {
    if (! image) {
      this._image = undefined;
      this._dirty("image");
      return;
    }
    assert(checkObject(image, ["url"], ["dimensions", "text", "location", "captureType"]), "Bad attrs for Clip Image:", Object.keys(image));
    assert(isUrl(image.url), "Bad Clip image URL:", image.url);
    assert(image.captureType == "selection" || image.captureType == "visible" || image.captureType == "auto" || ! image.captureType, "Bad image.captureType:", image.captureType);
    assert(typeof image.text == "string" || ! image.text, "Bad Clip image text:", image.text);
    if (image.dimensions) {
      assert(typeof image.dimensions.x == "number" && typeof image.dimensions.y == "number", "Bad Clip image dimensions:", image.dimensions);
    }
    assert(image.location &&
      typeof image.location.left == "number" &&
      typeof image.location.right == "number" &&
      typeof image.location.top == "number" &&
      typeof image.location.bottom == "number", "Bad Clip image pixel location:", image.location);
    if (image.location.topLeftElement || image.location.topLeftOffset ||
        image.location.bottomRightElement || image.location.bottomRightOffset) {
      assert(typeof image.location.topLeftElement == "string" &&
        image.location.topLeftOffset &&
        typeof image.location.topLeftOffset.x == "number" &&
        typeof image.location.topLeftOffset.y == "number" &&
        typeof image.location.bottomRightElement == "string" &&
        image.location.bottomRightOffset &&
        typeof image.location.bottomRightOffset.x == "number" &&
        typeof image.location.bottomRightOffset.y == "number",
        "Bad Clip image element location:", image.location);
    }
    assert(! this._text, "Clip with .image cannot have .text", JSON.stringify(this._text));
    this._dirty("image");
    this._image = image;
  }

  isDataUrl() {
    if (this.image) {
      return this.image.url.startsWith("data:");
    }
  }

  get text() {
    return this._text;
  }
  set text(text) {
    if (! text) {
      this._text = undefined;
      this._dirty("text");
      return;
    }
    assert(checkObject(text, ["html"], ["text", "location"]), "Bad attrs in Clip text:", Object.keys(text));
    assert(typeof text.html == "string" && text.html, "Bad Clip text html:", text.html);
    assert(typeof text.text == "string" || ! text.text, "Bad Clip text text:", text.text);
    if (text.location) {
      assert(
        typeof text.location.contextStart == "string" &&
        typeof text.location.contextEnd == "string" &&
        typeof text.location.selectionStart == "string" &&
        typeof text.location.selectionEnd == "string" &&
        typeof text.location.startOffset == "number" &&
        typeof text.location.endOffset == "number",
        "Bad Clip text location:", JSON.stringify(text.location));
    }
    assert(! this._image, "Clip with .text cannot have .image", JSON.stringify(this._image));
    this._dirty("text");
    this._text = text;
  }

  get sortOrder() {
    return this._sortOrder || null;
  }
  set sortOrder(val) {
    assert(typeof val == "number" || ! val, "Bad Clip sortOrder:", val);
    this._dirty("sortOrder");
    this._sortOrder = val;
  }

}

AbstractShot.prototype.Clip = _Clip;

exports.AbstractShot = AbstractShot;
