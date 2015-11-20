var DEFAULTS = new Object();

DEFAULTS.getPropertyValue = function (key) {
  return true;
};

function addInlineStyle(element) 
{
  var out = "";
  var elementStyle = element.style;
  var computedStyle = window.getComputedStyle(element, null);
  for (var i = 0; i < computedStyle.length; i++) {
    var key = computedStyle[i];
    var value = computedStyle.getPropertyValue(key);
    var originalValue = elementStyle.getPropertyValue(key);

    if ( value === DEFAULTS.getPropertyValue(key) ) {
      continue;
    }
    element.style[key] = value;
    //out += "  " + key + " = '" + originalValue + "' > '" + value + "'\n";
  }
  //console.log(out);
}

function collectCSS () 
{
  var els = document.getElementsByTagName("*");
  var len = els.length;
  for (var i=0; i<len; i++) {
    var el = els[i];
    addInlineStyle(el);
    if ( el.tagName === "HTML" ) {
      DEFAULTS = window.getComputedStyle(el);
    }
  }
}

function removeLinks () 
{
  var links = document.getElementsByTagName("link");
  var len = links.length;
  for (var i=0; i<len; i++) {
    var link = links[i];
    console.debug(link);
    link.parentNode.removeChild(link);
  }
}

collectCSS();
//removeLinks();
