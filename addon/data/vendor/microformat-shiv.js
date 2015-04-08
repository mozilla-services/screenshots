/* Copied in from:
   https://raw.githubusercontent.com/glennjones/microformat-shiv/4b8d049307f008b1c0b3afda89f7a93dc7baf05c/microformat-shiv.js 
*/

/*!
	Parser
	Copyright (C) 2012 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

	*/

var microformats = {};



// The module pattern
microformats.Parser = function () {
    this.version = '0.3.1';
	this.rootPrefix = 'h-';
	this.propertyPrefixes = ['p-', 'dt-', 'u-', 'e-'];
	this.options = {
		'baseUrl': '',
		'filters': [],
		'version1': true,
		'children': true,
		'childrenRel': false,
		'rel': true,
		'includes': true,
		'textFormat': 'normalised'
	};
	this.maps = {};
	this.rels = {};
};


microformats.Parser.prototype = {

	// internal parse function 
	get: function(dom, rootNode, options) {
		var errors = null,
			items, 
			children, 
			data = [],
			ufs = [],
			x,
			i,
			z,			
			y,
			rels,
			baseTag,
			href;

		this.mergeOptions(options);
		this.rootID = 0;

		if(!dom || !rootNode){
			errors = [{'error': 'No DOM or rootNode given'}];
			return {'errors': errors, 'data': {}};
		}else{

			// add includes
			if(this.options.includes){
				this.addIncludes(dom, rootNode);
			}
			
			// find base tag to set baseUrl
 			baseTag = dom.querySelector('base');
			if(baseTag) {
				href = this.domUtils.getAttribute(dom, baseTag, 'href');
				if(href){
					this.options.baseUrl = href;
				}
			}

			// find starts points in the DOM
			items = this.findRootNodes(dom, rootNode);
			if(items && !errors) {
				x = 0;
				i = items.length;
				while(x < i) {
					if(!this.domUtils.hasAttribute(dom, items[x], 'data-include')) {
						// find microformats - return as an array, there maybe more than one root on a element
						ufs = this.walkTree(dom, items[x], true);
						z = 0;
						y = ufs.length;
						while(z < y) {
							// make sure its a valid structure and apply filter if its requested  
							if(ufs[z] && this.utils.hasProperties(ufs[z].properties) && this.shouldInclude(ufs[z], this.options.filters)) {
								// find any children in the microformats dom tree that are not attached toa property
								if(this.options.children){
									children = this.findChildItems(dom, items[x], ufs[z].type[0]);
									if(children.length > 0) {
										ufs[z].children = children;
									}
								}
								data.push(ufs[z]);
							}
							z++;
						}
					}
					x++;
				}
			}

			// find any rel
			if(this.options.rel){
				rels = this.findRels(dom, rootNode);
				if(rels && this.shouldInclude(rels, this.options.filters)) {
					data.push(rels);
				}
			}

		}
		this.clearUpDom(dom);
		return {'items': data};
	},


	// get the count of items
	count: function(dom, rootNode, options) {
		var out = {},
			keys = [],
			count,
			x,
			i;

		items = this.findRootNodes(dom, rootNode);	
		i = items.length;
		while(i--) {
			classItems = this.domUtils.getAttributeList(dom, items[i], 'class');
			x = classItems.length;
			while(x--) {
				// find v2 names
				if(this.utils.startWith( classItems[x], 'h-' )){
					append(classItems[x], 1);
				}
				// find v1 names
				for(key in this.maps) {
					// has v1 root but not also a v2 root so we dont double count
					if(this.maps[key].root === classItems[x] && classItems.indexOf(key) === -1) {
						append(key, 1);
					}
				}
			}
		}
		
		function append(name, count){
			if(out[name]){
				out[name] = out[name] + count;
			}else{
				out[name] = count;
			}
		}
	
		return out;
	},


	// is the uf type in the filter list
	shouldInclude: function(uf, filters) {
		var i;

		if(this.utils.isArray(filters) && filters.length > 0) {
			i = filters.length;
			while(i--) {
				if(uf.type[0] === filters[i]) {
					return true;
				}
			}
			return false;
		} else {
			return true;
		}
	},


	// finds uf within the tree of a parent uf but where they have on property
	findChildItems: function(dom, rootNode, ufName) {
		var items, 
			out = [],
			ufs = [],
			x,
			i,
			z,			
			y,
			rels;


		items = this.findRootNodes(dom, rootNode, true);
		if(items.length > 0) {
			i = items.length;
			x = 0; // 1 excludes parent
			while(x < i) {
				var classes = this.getUfClassNames(dom, items[x], ufName);
				if(classes.root.length > 0 && classes.properties.length === 0) {
					ufs = this.walkTree(dom, items[x], true);
					y = ufs.length;
					z = 0;
					while(z < y) {
						// make sure its a valid structure 
						if(ufs[z] && this.utils.hasProperties(ufs[z].properties)) {
							out.push(ufs[z]);
						}
						z++;
					}
				}
				x++;
			}
		}

		// find any rel add them as child even if the node a property
		if(this.options.rel && this.options.childrenRel){
			rels = this.findRels(dom, rootNode);
			if(rels) {
				out.push(rels);
			}
		}

		return out;
	},





	// returns all the root nodes in a document
	findRootNodes: function(dom, rootNode, fromChildren) {
		var arr = null,			
			out = [], 
			classList = [],
			test,
			items,
			x,
			i,
			y,
			key;


		// build any array of v1 root names    
		for(key in this.maps) {
			classList.push(this.maps[key].root);
		}

		// get all elements that have a class attribute  
		fromChildren = (fromChildren) ? fromChildren : false;
		if(fromChildren) {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'class');
		} else {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'class');
		}


		// loop elements that have a class attribute
		x = 0;    
		i = arr.length;
		while(x < i) {

			items = this.domUtils.getAttributeList(dom, arr[x], 'class');

			// loop classes on an element
			y = items.length;
			while(y--) {
				// match v1 root names 
				if(classList.indexOf(items[y]) > -1) {
					out.push(arr[x]);
					break;
				}

				// match v2 root name prefix
				if(this.utils.startWith(items[y], 'h-')) {
					out.push(arr[x]);
					break;
				}
			}

			x++;
		}
		return out;
	},


	// starts the tree walking for a single microformat
	walkTree: function(dom, node) {
		var classes,
			out = [],
			obj,
			itemRootID,
			x,
			i;

		// loop roots found on one element
		classes = this.getUfClassNames(dom, node);
		if(classes){
			x = 0;
			i = classes.root.length;
			while(x < i) {
				this.rootID++;
				itemRootID = this.rootID,
				obj = this.createUfObject(classes.root[x]);

				this.walkChildren(dom, node, obj, classes.root[x], itemRootID);
				this.impliedRules(dom, node, obj);
				out.push(obj);
				x++;
			}
		}
		return out;
	},


	// test for the need to apply the "implied rules" for name, photo and url
	impliedRules: function(dom, node, uf) {
		var context = this,
			value,
			descendant,
			newDate;


		function getNameAttr(dom, node) {
			var value = context.domUtils.getAttrValFromTagList(dom, node, ['img'], 'alt');
			if(!value) {
				value = context.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
			}
			return value;
		}

		function getPhotoAttr(dom, node) {
			var value = context.domUtils.getAttrValFromTagList(dom, node, ['img'], 'src');
			if(!value) {
				value = context.domUtils.getAttrValFromTagList(dom, node, ['object'], 'data');
			}
			return value;
		}


		if(uf && uf.properties) {
			
			// implied name rule
			/*
				img.h-x[alt]
				abbr.h-x[title] 
				.h-x>img:only-node[alt] 
				.h-x>abbr:only-node[title] 
				.h-x>:only-node>img:only-node[alt]
				.h-x>:only-node>abbr:only-node[title] 
			*/

			if(!uf.properties.name) {
				value = getNameAttr(dom, node);
				if(!value) {
					descendant = this.domUtils.isSingleDescendant(dom, node, ['img', 'abbr']);
					if(descendant){
						value = getNameAttr(dom, descendant);
					}
					if(node.children.length > 0){
						child = this.domUtils.isSingleDescendant(dom, node);
						if(child){
							descendant = this.

							domUtils.isSingleDescendant(dom, child, ['img', 'abbr']);
							if(descendant){
								value = getNameAttr(dom, descendant);
							}
						}
					}
				}
				if(!value) {
					value = this.text.parse(dom, node, this.options.textFormat);
				}
				if(value) {
					uf.properties.name = [this.utils.trim(value).replace(/[\t\n\r ]+/g, ' ')];
				}
			}


			// implied photo rule
			/*
				img.h-x[src] 
				object.h-x[data] 
				.h-x>img[src]:only-of-type
				.h-x>object[data]:only-of-type 
				.h-x>:only-child>img[src]:only-of-type 
				.h-x>:only-child>object[data]:only-of-type 
			*/
			if(!uf.properties.photo) {
				value = getPhotoAttr(dom, node);
				if(!value) {
					descendant = this.domUtils.isOnlySingleDescendantOfType(dom, node, ['img', 'object']);
					if(descendant){
						value = getPhotoAttr(dom, descendant);
					}

					// single child that has a single descendant that is a img or object i.e. .h-x>:only-child>img[src]:only-of-type
					if(node.children.length > 0){
						child = this.domUtils.isSingleDescendant(dom, node);
						if(child){
							descendant = this.domUtils.isOnlySingleDescendantOfType(dom, child, ['img', 'object']);
							if(descendant){
								value = getPhotoAttr(dom, descendant);
							}
						}
					}
				}
				if(value) {
					// if we have no protocal separator, turn relative url to absolute ones
					if(value && value !== '' && value.indexOf(':') === -1) {
						value = this.domUtils.resolveUrl(dom, value, this.options.baseUrl);
					}
					uf.properties.photo = [this.utils.trim(value)];
				}
			}
			// implied url rule
			if(!uf.properties.url) {
				value = this.domUtils.getAttrValFromTagList(dom, node, ['a'], 'href');
				if(value) {
					uf.properties.url = [this.utils.trim(value)];
				}
			}

		}

		// implied date rule - temp fix
		// only apply to first date and time match
		if(uf.times.length > 0 && uf.dates.length > 0) {
			newDate = this.dates.dateTimeUnion(uf.dates[0][1], uf.times[0][1]);
			uf.properties[this.removePropPrefix(uf.times[0][0])][0] = newDate.toString();
		}
		delete uf.times;
		delete uf.dates;

	},


	// find child properties of microformat
	walkChildren: function(dom, node, out, ufName, rootID) {
		var context = this,
			childOut = {},
			rootItem,
			itemRootID,
			value,
			propertyName,
			i,
			x,
			y,
			z, 
			child;

		y = 0;
		z = node.children.length;
		while(y < z) {
			child = node.children[y];
	
			// get uf classes for this single element
			var classes = context.getUfClassNames(dom, child, ufName);

			// a property which is a microformat
			if(classes.root.length > 0 && classes.properties.length > 0) {
				// create object with type, property and value
				rootItem = context.createUfObject(
					classes.root, 
					this.text.parse(dom, child, this.options.textFormat)
				);

				// add the microformat as an array of properties
				propertyName = context.removePropPrefix(classes.properties[0]);
				if(out.properties[propertyName]) {
					out.properties[propertyName].push(rootItem);
				} else {
					out.properties[propertyName] = [rootItem];
				}
				context.rootID++;

				x = 0;
				i = rootItem.type.length;
				itemRootID = context.rootID;
				while(x < i) {
					context.walkChildren(dom, child, rootItem, rootItem.type[x], itemRootID);
					x++;
				}
				context.impliedRules(dom, child, rootItem);
			}

			// a property which is NOT a microformat and has not been use for a given root element
			if(classes.root.length === 0 && classes.properties.length > 0) {
				
				x = 0;
				i = classes.properties.length;
				while(x < i) {

					value = context.getValue(dom, child, classes.properties[x], out);
					propertyName = context.removePropPrefix(classes.properties[x]);

					// if the value is not empty 
					// and we have not added this value into a property with the same name already
					if(value !== '' && !context.hasRootID(dom, child, rootID, propertyName)) {
					//if(value !== '') {
						// add the property as a an array of properties 
						if(out.properties[propertyName]) {
							out.properties[propertyName].push(value);
						} else {
							out.properties[propertyName] = [value];
						}
						// add rootid to node so we track it use
						context.appendRootID(dom, child, rootID, propertyName);
					}
					x++;
				}

				context.walkChildren(dom, child, out, ufName, rootID);
			}

			// if the node has no uf classes, see if its children have
			if(classes.root.length === 0 && classes.properties.length === 0) {
				context.walkChildren(dom, child, out, ufName, rootID);
			}

			y++;
		}

	},



	// gets the value of a property
	getValue: function(dom, node, className, uf) {
		var value = '';

		if(this.utils.startWith(className, 'p-')) {
			value = this.getPValue(dom, node, true);
		}

		if(this.utils.startWith(className, 'e-')) {
			value = this.getEValue(dom, node);
		}

		if(this.utils.startWith(className, 'u-')) {
			value = this.getUValue(dom, node, true);
		}

		if(this.utils.startWith(className, 'dt-')) {
			value = this.getDTValue(dom, node, className, uf, true);
		}
		return value;
	},


	// gets the value of node which contain 'p-' property
	getPValue: function(dom, node, valueParse) {
		var out = '';
		if(valueParse) {
			out = this.getValueClass(dom, node, 'p');
		}

		if(!out && valueParse) {
			out = this.getValueTitle(dom, node);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['data'], 'value');
		}

		if(node.name === 'br' || node.name === 'hr') {
			out = '';
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['img', 'area'], 'alt');
		}

		if(!out) {
			out = this.text.parse(dom, node, this.options.textFormat);
		}

		return(out) ? out : '';
	},


	// get the value of node which contain 'e-' property
	getEValue: function(dom, node) {
		node = this.expandURLs(dom, node, this.options.baseUrl)
		return this.domUtils.innerHTML(dom, node);
	},


	// get the value of node which contain 'u-' property
	getUValue: function(dom, node, valueParse) {
		// not sure this should be used for u property
		var out = '';
		if(valueParse) {
			out = this.getValueClass(dom, node, 'u');
		}

		if(!out && valueParse) {
			out = this.getValueTitle(dom, node);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['a', 'area'], 'href');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['img'], 'src');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['object'], 'data');
		}

		// if we have no protocal separator, turn relative url to absolute ones
		if(out && out !== '' && out.indexOf(':') === -1) {
			out = this.domUtils.resolveUrl(dom, out, this.options.baseUrl);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['data'], 'value');
		}

		if(!out) {
			out = this.text.parse(dom, node, this.options.textFormat);
		}

		return(out) ? out : '';
	},


	// get the value of node which contain 'dt-' property
	getDTValue: function(dom, node, className, uf, valueParse) {
		var out = '',
			format = 'uf';

		if(valueParse) {
			out = this.getValueClass(dom, node, 'dt');
		}

		if(!out && valueParse) {
			out = this.getValueTitle(dom, node);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['time', 'ins', 'del'], 'datetime');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['data'], 'value');
		}

		if(!out) {
			out = this.text.parse(dom, node, this.options.textFormat);
		}

		if(out) {
			if(this.dates.isDuration(out)) {
				// just duration
				return out;
			} else if(this.dates.isTime(out)) {
				// just time or time+timezone
				if(uf) {
					uf.times.push([className, this.dates.parseAmPmTime(out)]);
				}
				return this.dates.parseAmPmTime(out);
			} else {
				// returns a date - uf profile 
				if(out.indexOf(' ') > 0){
					format = 'HTML5'
				}
				if(uf) {
					uf.dates.push([className, new ISODate(out).toString( format )]);
				}

				return new ISODate(out).toString( format );
			}
		} else {
			return '';
		}
	},


	// appends a new rootid to a given node
	appendRootID: function(dom, node, id, propertyName) {
		var rootids = [];
		if(this.domUtils.hasAttribute(dom, node,'rootids')){
			rootids = this.domUtils.getAttributeList(dom, node,'rootids');
		}
		rootids.push('id' + id + '-' + propertyName);
		this.domUtils.setAttribute(dom, node, 'rootids', rootids.join());
	},


	// does a given node already have a rootid
	hasRootID: function(dom, node, id, propertyName) {
		var rootids = [];
		if(!this.domUtils.hasAttribute(dom, node,'rootids')){
			return false;
		} else {
			rootids = this.domUtils.getAttributeList(dom, node, 'rootids');
			return(rootids.indexOf('id' + id + '-' + propertyName) > -1);
		}
	},


	// gets the text of any child nodes with the class value
	getValueClass: function(dom, node, propertyType) {
		var context = this,
			out = [],
			child,
			x,
			i;

		x = 0;
		i = node.children.length;
		while(x < i) {
			child = node.children[x];
			var value = null;
			if(this.domUtils.hasAttributeValue(dom, child, 'class', 'value')) {
				switch(propertyType) {
				case 'p':
					value = context.getPValue(dom, child, false);
					break;
				case 'u':
					value = context.getUValue(dom, child, false);
					break;
				case 'dt':
					value = context.getDTValue(dom, child, '', null, false);
					break;
				}
				if(value) {
					out.push(this.utils.trim(value));
				}
			}
			x++;
		}
		if(out.length > 0) {
			if(propertyType === 'p') {
				return out.join(' ').replace(/[\t\n\r ]+/g, ' ');
			}
			if(propertyType === 'u') {
				return out.join('');
			}
			if(propertyType === 'dt') {
				return this.dates.concatFragments(out).toString();
			}
		} else {
			return null;
		}
	},


	// returns a single string of the 'title' attr from all 
	// the child nodes with the class 'value-title' 
	getValueTitle: function(dom, node) {
		var out = [],
			items,
			i,
			x;

		items = this.domUtils.getNodesByAttributeValue(dom, node, 'class', 'value-title');
		x = 0;
		i = items.length;		
		while(x < i) {
			if(this.domUtils.hasAttribute(dom, items[x], 'title')) {
				out.push(this.domUtils.getAttribute(dom, items[x], 'title'));
			}
			x++;
		}
		return out.join('');
	},



	// returns any uf root and property assigned to a single element
	getUfClassNames: function(dom, node, ufName) {
		var out = {
				'root': [],
				'properties': []
			},
			classNames,
			key,
			items,
			item,
			i,
			x,
			z,
			y,
			map,
			prop,
			propName,
			v2Name,
			impiedRel;


		classNames = this.domUtils.getAttribute(dom, node, 'class');
		if(classNames) {
			items = classNames.split(' ');
			x = 0;
			i = items.length;
			while(x < i) {

				item = this.utils.trim(items[x]);

				// test for root prefix - v2
				if(this.utils.startWith(item, this.rootPrefix) && out.root.indexOf(item) === -1) {
					out.root.push(item);
				}

				// test for property prefix - v2
				z = this.propertyPrefixes.length;
				while(z--) {
					if(this.utils.startWith(item, this.propertyPrefixes[z]) && out.properties.indexOf(item) === -1) {
						out.properties.push(item);
					}
				}

				if(this.options.version1){

					// test for mapped root classnames v1
					for(key in this.maps) {
						if(this.maps.hasOwnProperty(key)) {
							// only add a root once
							if(this.maps[key].root === item && out.root.indexOf(key) === -1) {
								// if root map has subTree set to true
								// test to see if we should create a property or root
								if(this.maps[key].subTree && this.isSubTreeRoot(dom, node, this.maps[key], items) === false) {
									out.properties.push('p-' + this.maps[key].root);
								} else {
									out.root.push(key);
								}
								break;
							}
						}
					}

					// test for mapped property classnames v1
					map = this.getMapping(ufName);
					if(map) {
						for(key in map.properties) {
							prop = map.properties[key];
							propName = (prop.map) ? prop.map : 'p-' + key;

							if(key === item) {
								if(prop.uf) {
									// loop all the classList make sure 
									//   1. this property is a root
									//   2. that there is not already a equivalent v2 property ie url and u-url on the same element
									y = 0;
									while(y < i) {
										v2Name = this.getV2RootName(items[y]);
										// add new root
										if(prop.uf.indexOf(v2Name) > -1 && out.root.indexOf(v2Name) === -1) {
											out.root.push(v2Name);
										}
										y++;
									}
									//only add property once
									if(out.properties.indexOf(propName) === -1) {
										out.properties.push(propName);
									}
								} else {
									if(out.properties.indexOf(propName) === -1) {
										out.properties.push(propName);
									}
								}
								break;
							}

						}
					}
				}
				x++;

			}
		}

		impiedRel = this.findRelImpied(dom, node, ufName);
		if(impiedRel && out.properties.indexOf(impiedRel) === -1) {
			out.properties.push(impiedRel);
		}

		return out;
	},



	// given a V1 or V2 root name return mapping object
	getMapping: function(name) {
		var key;
		for(key in this.maps) {
			if(this.maps[key].root === name || key === name) {
				return this.maps[key];
			}
		}
		return null;
	},


	// given a V1 root name returns a V2 root name ie vcard >>> h-card
	getV2RootName: function(name) {
		var key;
		for(key in this.maps) {
			if(this.maps[key].root === name) {
				return key;
			}
		}
		return null;
	},


	// use to find if a subTree mapping should be a property or root
	isSubTreeRoot: function(dom, node, map, classList) {
		var out,
			hasSecondRoot,
			i,
			x;

		out = this.createUfObject(map.name);
		hasSecondRoot = false;	

		// loop the classList to see if there is a second root
		x = 0;
		i = classList.length;	
		while(x < i) {
			var item = this.utils.trim(classList[x]);
			for(var key in this.maps) {
				if(this.maps.hasOwnProperty(key)) {
					if(this.maps[key].root === item && this.maps[key].root !== map.root) {
						hasSecondRoot = true;
						break;
					}
				}
			}
			x++;
		}

		// walk the sub tree for properties that match this subTree
		this.walkChildren(dom, node, out, map.name, null);

		if(this.utils.hasProperties(out.properties) && hasSecondRoot === false) {
			return true;
		} else {
			return false;
		}
	},


	// finds any alt rel=* mappings for a given node/microformat
	findRelImpied: function(dom, node, ufName) {
		var out,
			map,
			i;

		map = this.getMapping(ufName);
		if(map) {
			for(var key in map.properties) {
				var prop = map.properties[key],
					propName = (prop.map) ? prop.map : 'p-' + key,
					relCount = 0;

				// if property as an alt rel=* mapping run test
				if(prop.relAlt && this.domUtils.hasAttribute(dom, node, 'rel')) {
					i = prop.relAlt.length;
					while(i--) {
						if(this.domUtils.hasAttributeValue(dom, node, 'rel', prop.relAlt[i])) {
							relCount++;
						}
					}
					if(relCount === prop.relAlt.length) {
						out = propName;
					}
				}
			}
		}
		return out;
	},


	// creates a blank uf object
	createUfObject: function(names, value) {
		var out = {};

		if(value) {
			out.value = value;
		}
		if(this.utils.isArray(names)) {
			out.type = names;
		} else {
			out.type = [names];
		}
		out.properties = {};
		out.times = [];
		out.dates = [];
		return out;
	},




	// removes uf property prefixs from a string
	removePropPrefix: function(str) {
		var i;

		i = this.propertyPrefixes.length;
		while(i--) {
			var prefix = this.propertyPrefixes[i];
			if(this.utils.startWith(str, prefix)) {
				str = str.substr(prefix.length);
			}
		}
		return str;
	},




	findRels: function(dom, rootNode, fromChildren) {
		var uf,
			out = {},
			x,
			i,
			y,
			z,
			relList,
			items,
			item,
			key,
			value,
			arr;


		// get all elements that have a rel attribute
		fromChildren = (fromChildren) ? fromChildren : false; 
		if(fromChildren) {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'rel');
		} else {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'rel');
		}

		x = 0;
		i = arr.length;
		while(x < i) {
			relList = this.domUtils.getAttribute(dom, arr[x], 'rel');

			if(relList) {
				items = relList.split(' ');

				z = 0;
				y = items.length;
				while(z < y) {
					item = this.utils.trim(items[z]);
					for(key in this.rels) {
						if(key === item) {
							value = this.domUtils.getAttrValFromTagList(dom, arr[x], ['a', 'area'], 'href');
							if(!value) {
								value = this.domUtils.getAttrValFromTagList(dom, arr[x], ['link'], 'href');
							}
							if(!out[key]) {
								out[key] = [];
							}
							// turn relative to abosulte urls
							if(value && value !== '' && value.indexOf(':') === -1) {
								value = this.domUtils.resolveUrl(dom, value, this.options.baseUrl);
							}
							out[key].push(value);
						}
					}
					z++;
				}
			}
			x++;
		}

		if(this.utils.hasProperties(out)) {
			uf = this.createUfObject('rel');
			delete uf.times;
			delete uf.dates;
			uf.properties = out;
		}
		return uf;
	},


	// add all the includes ino the dom structure
	addIncludes: function(dom, rootNode) {
		this.addAttributeIncludes(dom, rootNode, 'itemref');
		this.addAttributeIncludes(dom, rootNode, 'headers');
		this.addClassIncludes(dom, rootNode);
	},


	// add attribute based includes ie 'itemref' and 'headers'
	addAttributeIncludes: function(dom, rootNode, attributeName) {
		var out = {},
			arr,
			idList,
			i,
			x,
			z,
			y;

		arr = this.domUtils.getNodesByAttribute(dom, rootNode, attributeName);
		x = 0;
		i = arr.length;
		while(x < i) {
			idList = this.domUtils.getAttributeList(dom, arr[x], attributeName);
			if(idList) {
				z = 0;
				y = idList.length;
				while(z < y) {
					this.apppendInclude(dom, arr[x], idList[z]);
					z++;
				}
			}
			x++;
		}
	},


	// add class based includes
	addClassIncludes: function(dom, rootNode) {
		var out = {},
			node,
			id,
			clone,
			arr,
			x = 0,
			i;

		arr = this.domUtils.getNodesByAttributeValue(dom, rootNode, 'class', 'include');
		i = arr.length;
		while(x < i) {
			id = this.domUtils.getAttrValFromTagList(dom, arr[x], ['a'], 'href');
			if(!id) {
				id = this.domUtils.getAttrValFromTagList(dom, arr[x], ['object'], 'data');
			}
			this.apppendInclude(dom, arr[x], id);
			x++;
		}
	},


	// appends a clone of an element into another node
	apppendInclude: function(dom, node, id){
		var include,
			clone;

		id = this.utils.trim(id.replace('#', ''));
		include = dom.getElementById(id);
		if(include) {
			clone = this.domUtils.clone(dom, include);
			this.markIncludeChildren(dom, clone);
			this.domUtils.appendChild(dom, node, clone);
		}
	},


	// add a attribute to all the child microformats roots  
	markIncludeChildren: function(dom, rootNode) {
		var arr,
			x,
			i;

		// loop the array and add the attribute
		arr = this.findRootNodes(dom, rootNode);
		x = 0;
		i = arr.length;
		this.domUtils.setAttribute(dom, rootNode, 'data-include', 'true');
		this.domUtils.setAttribute(dom, rootNode, 'style', 'display:none');
		while(x < i) {
			this.domUtils.setAttribute(dom, arr[x], 'data-include', 'true');
			x++;
		}
	},


	// looks at nodes in DOM structures find href and src and expandes relative URLs
	expandURLs: function(dom, node, baseUrl){
		var context = this;
		node = this.domUtils.clone(dom, node)
		expand( this.domUtils.getNodesByAttribute(dom, node, 'href'), 'href' );
		expand( this.domUtils.getNodesByAttribute(dom, node, 'src'), 'src' );

		function expand( nodeList, attrName ){
			if(nodeList && nodeList.length){
				var i = nodeList.length;
				while (i--) {
					// this gives the orginal text
				    href =  nodeList[i].getAttribute(attrName)
				    if(href.toLowerCase().indexOf('http') !== 0){
				    	nodeList[i].setAttribute(attrName, context.domUtils.resolveUrl(dom, href, context.options.baseUrl));
				    }
				}
			}
		}
		return node;
	},


	// merges passed and default options -single level clone of properties
	mergeOptions: function(options) {
		var key;
		for(key in options) {
			if(options.hasOwnProperty(key)) {
				this.options[key] = options[key];
			}
		}
	},

	// removes an changes made to dom during parse process
	clearUpDom: function(dom){
		var arr,
			i;

		// remove all the items that where added as includes
		arr = this.domUtils.getNodesByAttribute(dom, dom, 'data-include');
		i = arr.length;
		while(i--) {
			this.domUtils.removeChild(dom,arr[i]);
		}
		// remove additional attibutes
		arr = this.domUtils.getNodesByAttribute(dom, dom, 'rootids');
		i = arr.length;
		while(i--) {
			this.domUtils.removeAttribute(dom, arr[i],'rootids');
		}
	}

};


microformats.parser = new microformats.Parser();
microformats.getItems = function(options){
	var dom,
		node;

	dom = (options && options.document)? options.document : document;
	node = (options && options.node)? options.node : dom;

	options = (options)? options : {};
	if(!options.baseUrl && dom && dom.location){
		options.baseUrl = dom.location.href;
	}

	return this.parser.get(dom, node, options);
};

microformats.getCounts = function(options) {
	var dom,
		node;

	dom = (options && options.document)? options.document : document;
	node = (options && options.node)? options.node : dom;
	options = (options)? options : {};

	return this.parser.count(dom, node, options);
}


// Simple support for CommonJS
if (typeof exports !== 'undefined') {
	exports.microformats = microformats;
}
	









/*
   Utilities
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */

microformats.parser.utils = {

    // is the object a string
    isString: function( obj ) {
        return typeof( obj ) === 'string';
    },


    // does a string start with the test
    startWith: function( str, test ) {
        return(str.indexOf(test) === 0);
    },


    // remove spaces at front and back of string
    trim: function( str ) {
        if(this.isString(str)){
            return str.replace(/^\s+|\s+$/g, '');
        }else{
            return '';
        }
    },


    // is a string only contain white space chars
    isOnlyWhiteSpace: function( str ){
        return !(/[^\t\n\r ]/.test( str ));
    },


    // removes white space from a string
    removeWhiteSpace: function( str ){
        return str.replace(/[\t\n\r ]+/g, ' ');
    },


    // is the object a array
    isArray: function( obj ) {
        return obj && !( obj.propertyIsEnumerable( 'length' ) ) && typeof obj === 'object' && typeof obj.length === 'number';
    },


    // simple function to find out if a object has any properties. 
    hasProperties: function( obj ) {
        var key;
        for(key in obj) {
            if( obj.hasOwnProperty( key ) ) {
                return true;
            }
        }
        return false;
    }

};





/*
   DOM Utilities
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */


microformats.parser.domUtils = {

	innerHTML: function(dom, node){
		return node.innerHTML;
	},


	// returns whether attribute exists
	hasAttribute: function(dom, node, attributeName) {
		return (node.attributes[attributeName]) ? true : false;
	},
	

	// returns the string value of an attribute
	getAttribute: function(dom, node, attributeName) {
		return node.getAttribute(attributeName);
	},


	// removes an attribute
	removeAttribute: function(dom, node, attributeName) {
		node.removeAttribute(attributeName);
	},


	// returns the an array of string value of an attribute
	getAttributeList: function(dom, node, attributeName) {
		var out = [],
			attList;

		attList = node.getAttribute(attributeName);
		if(attList && attList !== '') {
			if(attList.indexOf(' ') > -1) {
				out = attList.split(' ');
			} else {
				out.push(attList);
			}
		}
		return out;
	},


	// returns whether an attribute has an item of the given value
	hasAttributeValue: function(dom, node, attributeName, value) {
		var attList = this.getAttributeList(dom, node, attributeName);
		return (attList.indexOf(value) > -1);
	},



	// returns whether an attribute has an item that start with the given value
	hasAttributeValueByPrefix: function(dom, node, attributeName, value) {
		var attList = [],
			x = 0,
			i;

		attList = this.getAttributeList(dom, node, attributeName);
		i = attList.length;
		while(x < i) {
			if(utils.startWith(utils.trim(attList[x]), value)) {
				return true;
			}
			x++;
		}
		return false;
	},


	// return an array of elements that match an attribute/value
	getNodesByAttribute: function(dom, node, name) {
		var selector = '[' + name + ']';
		return node.querySelectorAll(selector);
	},


	// return an arry of elements that match an attribute/value
	getNodesByAttributeValue: function(dom, rootNode, name, value) {
		var arr = [],
			x = 0,
			i,
			out = [];

		arr = this.getNodesByAttribute(dom, rootNode, name);
		if(arr) {
			i = arr.length;
			while(x < i) {
				if(this.hasAttributeValue(dom, arr[x], name, value)) {
					out.push(arr[x]);
				}
				x++;
			}
		}
		return out;
	},


	// set the attribute value
	setAttribute: function(dom, node, name, value){
		node.setAttribute(name, value);
	},


	// returns the attribute value only if the node tagName is in the tagNames list
	getAttrValFromTagList: function(dom, node, tagNames, attributeName) {
		var i = tagNames.length;

		while(i--) {
			if(node.tagName.toLowerCase() === tagNames[i]) {
				var attr = this.getAttribute(dom, node, attributeName);
				if(attr && attr !== '') {
					return attr;
				}
			}
		}
		return null;
	},


	// return a node if it is the only descendant AND of a type ie CSS :only-node
	isSingleDescendant: function(dom, rootNode, tagNames){
		var count = 0,
			out = null,
			child,
			x,
			i,
			y;

		x = 0;
		y = rootNode.children.length;
		while(x < y) {
			child = rootNode.children[x];
			if(child.tagName) {
				// can filter or not by tagNames array
				if(tagNames && this.hasTagName(child, tagNames)){
					out = child;
				}
				if(!tagNames){
					out = child;
				}
				// count all tag/element nodes
				count ++;
			}
			x++;
		}
		if(count === 1 && out) {
			return out;
		} else {
			return null;
		}
	},



	// return a node if it is the only descendant of a type ie CSS :only-of-type 
	isOnlySingleDescendantOfType: function(dom, rootNode, tagNames) {
		var i = rootNode.children.length,
			count = 0,
			child,
			out = null;

		while(i--) {
			child = rootNode.children[i];
			if(child.nodeType === 1) {
				if(this.hasTagName(child, tagNames)){
					out = child;
					count++;
				}
			}
		}
		if(count === 1 && out){
			return out;
		}else{
			return null;
		}
	},


	hasTagName: function(node, tagNames){
		var i = tagNames.length;
		while(i--) {
			if(node.tagName.toLowerCase() === tagNames[i]) {
				return true;
			}
		}
		return false;
	},


	// append a child node
	appendChild: function(dom, node, childNode){
		node.appendChild(childNode);
	},


	// removes child node
	removeChild: function(dom, node){
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	},


	// simple dom node cloning function 
	clone: function(dom, node) {
		var newNode = node.cloneNode(true);
		newNode.removeAttribute('id');
		return newNode;
	},


	// where possible resolves url to absolute version ie test.png to http://example.com/test.png
	resolveUrl: function(dom, url, baseUrl) {
		// its not empty or null and we have no protocal separator
		if(url && url !== '' && url.indexOf(':') === -1){
			var dp = new DOMParser();
			var doc = dp.parseFromString('<html><head><base href="' + baseUrl+ '"><head><body><a href="' + url+ '"></a></body></html>', 'text/html');
			return doc.getElementsByTagName('a')[0].href;
		}
		return url;
	},


	resolveUrliFrame: function(dom, url, baseUrl){
		iframe = dom.createElement('iframe')
		iframe.innerHTML('<html><head><base href="' + baseUrl+ '"><head><body><a href="' + baseUrl+ '"></a></body></html>');
		return iframe.document.getElementsByTagName('a')[0].href;
	}


};   



(function(DOMParser) {
    "use strict";

    var DOMParser_proto;
    var real_parseFromString;
    var textHTML;         // Flag for text/html support
    var textXML;          // Flag for text/xml support
    var htmlElInnerHTML;  // Flag for support for setting html element's innerHTML

    // Stop here if DOMParser not defined
    if (!DOMParser) return;

    // Firefox, Opera and IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        textHTML = !!(new DOMParser).parseFromString('', 'text/html');

    } catch (er) {
      textHTML = false;
    }

    // If text/html supported, don't need to do anything.
    if (textHTML) return;

    // Next try setting innerHTML of a created document
    // IE 9 and lower will throw an error (can't set innerHTML of its HTML element)
    try {
      var doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = '<title></title><div></div>';
      htmlElInnerHTML = true;

    } catch (er) {
      htmlElInnerHTML = false;
    }

    // If if that failed, try text/xml
    if (!htmlElInnerHTML) {

        try {
            textXML = !!(new DOMParser).parseFromString('', 'text/xml');

        } catch (er) {
            textHTML = false;
        }
    }

    // Mess with DOMParser.prototype (less than optimal...) if one of the above worked
    // Assume can write to the prototype, if not, make this a stand alone function
    if (DOMParser.prototype && (htmlElInnerHTML || textXML)) { 
        DOMParser_proto = DOMParser.prototype;
        real_parseFromString = DOMParser_proto.parseFromString;

        DOMParser_proto.parseFromString = function (markup, type) {

            // Only do this if type is text/html
            if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
                var doc, doc_el, first_el;

                // Use innerHTML if supported
                if (htmlElInnerHTML) {
                    doc = document.implementation.createHTMLDocument("");
                    doc_el = doc.documentElement;
                    doc_el.innerHTML = markup;
                    first_el = doc_el.firstElementChild;

                // Otherwise use XML method
                } else if (textXML) {

                    // Make sure markup is wrapped in HTML tags
                    // Should probably allow for a DOCTYPE
                    if (!(/^<html.*html>$/i.test(markup))) {
                        markup = '<html>' + markup + '<\/html>'; 
                    }
                    doc = (new DOMParser).parseFromString(markup, 'text/xml');
                    doc_el = doc.documentElement;
                    first_el = doc_el.firstElementChild;
                }

                // Is this an entire document or a fragment?
                if (doc_el.childElementCount == 1 && first_el.localName.toLowerCase() == 'html') {
                    doc.replaceChild(first_el, doc_el);
                }

                return doc;

            // If not text/html, send as-is to host method
            } else {
                return real_parseFromString.apply(this, arguments);
            }
        };
    }
}(DOMParser));



/*!
    ISO Date Parser
    Parses and builds ISO dates to the uf, W3C , HTML5 or RFC3339 profiles
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

    */

function ISODate() {
    this.dY = -1;
    this.dM = -1;
    this.dD = -1;
    this.dDDD = -1;
    this.tH = -1;
    this.tM = -1;
    this.tS = -1;
    this.tD = -1;
    this.tzH = -1;
    this.tzM = -1;
    this.tzPN = '+';
    this.z = false;
    this.format = 'uf'; // uf or W3C or RFC3339 or HTML5
    this.setFormatSep();

    // optional should be full iso date/time string 
    if(arguments[0]) {
        this.parse(arguments[0]);
    }
}

ISODate.prototype = {

    // parses a full iso date/time string i.e. 2008-05-01T15:45:19Z
    parse: function( dateString ) {
        var dateNormalised = '',
            parts = [],
            tzArray = [],
            position = 0,
            datePart = '',
            timePart = '',
            timeZonePart = '';

        dateString = dateString.toString().toUpperCase().replace(' ','T');

        // break on 'T' divider or space
        if(dateString.indexOf('T') > -1) {
            parts = dateString.split('T');
            datePart = parts[0];
            timePart = parts[1];

            // zulu UTC                 
            if(timePart.indexOf( 'Z' ) > -1) {
                this.z = true;
            }

            // timezone
            if(timePart.indexOf( '+' ) > -1 || timePart.indexOf( '-' ) > -1) {
                tzArray = timePart.split( 'Z' ); // incase of incorrect use of Z
                timePart = tzArray[0];
                timeZonePart = tzArray[1];

                // timezone
                if(timePart.indexOf( '+' ) > -1 || timePart.indexOf( '-' ) > -1) {
                    position = 0;

                    if(timePart.indexOf( '+' ) > -1) {
                        position = timePart.indexOf( '+' );
                    } else {
                        position = timePart.indexOf( '-' );
                    }

                    timeZonePart = timePart.substring( position, timePart.length );
                    timePart = timePart.substring( 0, position );
                }
            }

        } else {
            datePart = dateString;
        }

        if(datePart !== '') {
            this.parseDate( datePart );
            if(timePart !== '') {
                this.parseTime( timePart );
                if(timeZonePart !== '') {
                    this.parseTimeZone( timeZonePart );
                }
            }
        }
        return this.toString();
    },


    // parses just the date element of a iso date/time string i.e. 2008-05-01
    parseDate: function( dateString ) {
        var dateNormalised = '',
            parts = [];

        // YYYY-DDD
        parts = dateString.match( /(\d\d\d\d)-(\d\d\d)/ );
        if(parts) {
            if(parts[1]) {
                this.dY = parts[1];
            }
            if(parts[2]) {
                this.dDDD = parts[2];
            }
        }

        if(this.dDDD === -1) {
            // YYYY-MM-DD ie 2008-05-01 and YYYYMMDD ie 20080501
            parts = dateString.match( /(\d\d\d\d)?-?(\d\d)?-?(\d\d)?/ );
            if(parts[1]) {
                this.dY = parts[1];
            }
            if(parts[2]) {
                this.dM = parts[2];
            }
            if(parts[3]) {
                this.dD = parts[3];
            }
        }
        return this.toString();
    },


    // parses just the time element of a iso date/time string i.e. 13:30:45
    parseTime: function( timeString ) {
        var timeNormalised = '',
            parts = [];

        // finds timezone HH:MM:SS and HHMMSS  ie 13:30:45, 133045 and 13:30:45.0135
        parts = timeString.match( /(\d\d)?:?(\d\d)?:?(\d\d)?.?([0-9]+)?/ );
        if(parts[1]) {
            this.tH = parts[1];
        }
        if(parts[2]) {
            this.tM = parts[2];
        }
        if(parts[3]) {
            this.tS = parts[3];
        }
        if(parts[4]) {
            this.tD = parts[4];
        }
        return this.toString();
    },


    // parses just the time element of a iso date/time string i.e. +08:00
    parseTimeZone: function( timeString ) {
        var timeNormalised = '',
            parts = [];

        // finds timezone +HH:MM and +HHMM  ie +13:30 and +1330
        parts = timeString.match( /([\-\+]{1})?(\d\d)?:?(\d\d)?/ );
        if(parts[1]) {
            this.tzPN = parts[1];
        }
        if(parts[2]) {
            this.tzH = parts[2];
        }
        if(parts[3]) {
            this.tzM = parts[3];
        }
        return this.toString();
    },


    // returns iso date/time string in in W3C Note, RFC 3339, HTML5 or Microformat profile
    toString: function( format ) {
        var output = '';

        if(format){
            this.format = format;
        }
        this.setFormatSep();

        if(this.dY  > -1) {
            output = this.dY;
            if(this.dM > 0 && this.dM < 13) {
                output += this.dsep + this.dM;
                if(this.dD > 0 && this.dD < 32) {
                    output += this.dsep + this.dD;
                    if(this.tH > -1 && this.tH < 25) {
                        output += this.sep + this.toTimeString( this );
                    }
                }
            }
            if(this.dDDD > -1) {
                output += this.dsep + this.dDDD;
            }
        } else if(this.tH > -1) {
            output += this.toTimeString( this );
        }

        return output;
    },


    // returns just the time string element of a iso date/time
    toTimeString: function( iso ) {
        var out = '';

        this.setFormatSep();
        // time and can only be created with a full date
        if(iso.tH) {
            if(iso.tH > -1 && iso.tH < 25) {
                out += iso.tH;
                out += (iso.tM > -1 && iso.tM < 61) ? this.tsep + iso.tM : this.tsep + '00';
                out += (iso.tS > -1 && iso.tS < 61) ? this.tsep + iso.tS : this.tsep + '00';
                out += (iso.tD > -1) ? '.' + iso.tD : '';
                // time zone offset 
                if(iso.z) {
                    out += 'Z';
                } else {
                    if(iso.tzH && iso.tzH > -1 && iso.tzH < 25) {
                        out += iso.tzPN + iso.tzH;
                        out += (iso.tzM > -1 && iso.tzM < 61) ? this.tzsep + iso.tzM : this.tzsep + '00';
                    }
                }
            }
        }
        return out;
    },


    // congifures the separators for a given profile
    setFormatSep: function() {
        switch( this.format ) {
            case 'RFC3339':
                this.sep = 'T';
                this.dsep = '';
                this.tsep = '';
                this.tzsep = '';
                break;
            case 'W3C':
                this.sep = 'T';
                this.dsep = '-';
                this.tsep = ':';
                this.tzsep = ':';
                break;
            case 'HTML5':
                this.sep = ' ';
                this.dsep = '-';
                this.tsep = ':';
                this.tzsep = ':';
                break;
            default:
                // uf
                this.sep = 'T';
                this.dsep = '-';
                this.tsep = ':';
                this.tzsep = '';
        }
    },

    hasFullDate: function() {
        return(this.dY !== -1 && this.dM !== -1 && this.dD !== -1);
    },


    hasDate: function() {
        return(this.dY !== -1);
    },


    hasTime: function() {
        return(this.tH !== -1);
    },


    hasTimeZone: function() {
        return(this.tzH !== -1);
    }

};



/*!
    Date Utilities
    Helper functions for microformat date parsing, and fragment concat
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

    */

microformats.parser.dates = {

    utils:  microformats.parser.utils,

    removeAMPM: function(str) {
        return str.replace('pm', '').replace('p.m.', '').replace('am', '').replace('a.m.', '');
    },


    hasAM: function(time) {
        time = time.toLowerCase();
        return(time.indexOf('am') > -1 || time.indexOf('a.m.') > -1);
    },


    hasPM: function(time) {
        time = time.toLowerCase();
        return(time.indexOf('pm') > -1 || time.indexOf('p.m.') > -1);
    },


    // is str a ISO duration  i.e.  PY17M or PW12
    isDuration: function(str) {
        if(this.utils.isString(str)){
            str = str.toLowerCase();
            str = this.utils.trim( str );
            if(this.utils.startWith(str, 'p') && !str.match(/t|\s/) && !str.match('-') && !str.match(':')) {
                return true;
            }
        }
        return false;
    },


    // is str a time or timezone
    // ie HH-MM-SS or z+-HH-MM-SS 08:43 | 15:23:00:0567 | 10:34pm | 10:34 p.m. | +01:00:00 | -02:00 | z15:00 
    isTime: function(str) {
        if(this.utils.isString(str)){
            str = str.toLowerCase();
            str = this.utils.trim( str );
            // start with timezone char
            if( str.match(':') 
                && ( this.utils.startWith(str, 'z') 
                    || this.utils.startWith(str, '-') 
                    || this.utils.startWith(str, '+') )) {
                return true;
            }
            // has ante meridiem or post meridiem
            if( str.match(/^[0-9]/) && 
                ( this.hasAM(str) || this.hasPM(str) )) {
                return true;
            }
            // contains time delimiter but not datetime delimiter
            if( str.match(':') && !str.match(/t|\s/) ) {
                return true;
            }
        }
        return false;
    },


    // parses a time string and turns it into a 24hr time string
    // 5:34am = 05:34:00 and 1:52:04p.m. = 13:52:04
    parseAmPmTime: function(time) {
        var out = time,
            times = [];

        // if the string has a time : or am or pm
        if(this.utils.isString(out)) {
            time = time.toLowerCase();
            time = time.replace(/[ ]+/g, '');

            if(time.match(':') || this.hasAM(time) || this.hasPM(time)) {

                if(time.match(':')) {
                    times = time.split(':');
                } else {
                    times[0] = time;
                    times[0] = this.removeAMPM(times[0]);
                }

                if(this.hasAM(time)) {
                    if(times[0] === '12') {
                        times[0] = '00';
                    }
                }
                if(this.hasPM(time)) {
                    if(times[0] < 12) {
                        times[0] = parseInt(times[0], 10) + 12;
                    }
                }

                // add leading zero's where needed
                if(times[0] && times[0].length === 1) {
                    times[0] = '0' + times[0];
                }
                if(times[0]) {
                    time = times.join(':');
                }
            }
        }
        return this.removeAMPM(time);
    },


    // overlays a different time on a given data to return the union of the two
    dateTimeUnion: function(date, time) {
        var isodate = new ISODate(date),
            isotime = new ISODate();

        isotime.parseTime(this.parseAmPmTime(time));
        if(isodate.hasFullDate() && isotime.hasTime()) {
            isodate.tH = isotime.tH;
            isodate.tM = isotime.tM;
            isodate.tS = isotime.tS;
            isodate.tD = isotime.tD;
            return isodate;
        } else {
            new ISODate();
        }
    },


    // passed an array of date/time string fragments it creates an iso 
    // datetime string using microformat rules for value and value-title
    concatFragments: function (arr) {
        var out = null,
            i = 0,
            date = '',
            time = '',
            offset = '',
            value = '';

        for(i = 0; i < arr.length; i++) {
            value = arr[i].toUpperCase();
            // if the fragment already contains a full date just return it once its converted W3C profile
            if(value.match('T')) {
                return new ISODate(value);
            }
            // if it looks like a date
            if(value.charAt(4) === '-') {
                date = value;
                // if it looks like a timezone    
            } else if((value.charAt(0) === '-') || (value.charAt(0) === '+') || (value === 'Z')) {
                if(value.length === 2) {
                    offset = value[0] + '0' + value[1];
                } else {
                    offset = value;
                }
            } else {
                // else if could be a time 
                time = this.parseAmPmTime(value);
            }
        }

        if(date !== '') {
            return new ISODate(date + (time ? 'T' : '') + time + offset);
        } else {
            out = new ISODate(value);
            if(time !== '') {
                out.parseTime(time);
            }
            if(offset !== '') {
                out.parseTime(offset);
            }
            return out;
        }
    }

};


/*
    InnerText Parser 
    extracts plain text from DOM nodes
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

    The text parser works like textContent but with five additional parsing rules 
    * It excluded the content from tag in the "excludeTags" list ie noframes script etc
    * It adds a single space behind the text string of any node considered block level
    * It removes all line return/feeds and tabs
    * It turns all whitespace into single spaces
    * It trims the final output

    */



function Text(){
    this.textFormat = 'normalised'; // normalised or whitespace
    this.blockLevelTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'pre', 'table',
        'address', 'article', 'aside', 'blockquote', 'caption', 'col', 'colgroup', 'dd', 'div', 
        'dt', 'dir', 'fieldset', 'figcaption', 'figure', 'footer', 'form',  'header', 'hgroup', 'hr', 
        'li', 'map', 'menu', 'nav', 'optgroup', 'option', 'section', 'tbody', 'testarea', 
        'tfoot', 'th', 'thead', 'tr', 'td', 'ul', 'ol', 'dl', 'details'];

    this.excludeTags = ['noframe', 'noscript', 'script', 'style', 'frames', 'frameset'];
} 


Text.prototype = {

    // gets the text from dom node 
    parse: function(dom, node, textFormat){
        var out;

        this.textFormat = (textFormat)? textFormat : this.textFormat;
        if(this.textFormat === 'normalised'){
            out = this.walkTreeForText( node );
            if(out !== undefined){
                out = out.replace( /&nbsp;/g, ' ') ;    // exchanges html entity for space into space char
                out = this.removeWhiteSpace( out );     // removes linefeeds, tabs and addtional spaces
                out = this.decodeEntities( dom, out );  // decode HTML entities
                out = out.replace( '–', '-' );          // correct dash decoding
                return this.trim( out );
            }else{
                return undefined;
            }
        }else{
           return dom(node).text(); 
        }
    },



    // extracts the text nodes in the tree
    walkTreeForText: function( node ) {
        var out = '',
            j = 0;

        if(this.excludeTags.indexOf( node.name ) > -1){
            return out;
        }

        // if node is a text node get its text
        if(node.nodeType && node.nodeType === 3){
            out += this.getElementText( node ); 
        }

        // get the text of the child nodes
        if(node.childNodes && node.childNodes.length > 0){
            for (j = 0; j < node.childNodes.length; j++) {
                var text = this.walkTreeForText( node.childNodes[j] );
                if(text !== undefined){
                    out += text;
                }
            }
        }

        // if its a block level tag add an additional space at the end
        if(this.blockLevelTags.indexOf( node.name ) !== -1){
            out += ' ';
        } 
        
        return (out === '')? undefined : out ;
    },    


    // get the text from a node in the dom
    getElementText: function( node ){
        if(node.nodeValue){
            return node.nodeValue;
        }else{
            return '';
        }
    },

    // remove spaces at front and back of string
    trim: function( str ) {
        return str.replace(/^\s+|\s+$/g, '');
    },


    // removes white space from a string
    removeWhiteSpace: function( str ){
        return str.replace(/[\t\n\r ]+/g, ' ');
    },

    decodeEntities: function( dom, str ){
        return dom.createTextNode( str ).nodeValue;
    }

};


microformats.parser.text = {};

microformats.parser.text.parse = function(dom, node, textFormat){
    var text = new Text();
    return text.parse(dom, node, textFormat);
} 



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-adr'] = {
	root: 'adr',
	name: 'h-adr',
	properties: {
		'post-office-box': {},
		'street-address': {},
		'extended-address': {},
		'locality': {},
		'region': {},
		'postal-code': {},
		'country-name': {}
	}
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-card'] =  {
	root: 'vcard',
	name: 'h-card',
	properties: {
		'fn': {
			'map': 'p-name'
		},
		'adr': {
			'uf': ['h-adr']
		},
		'agent': {
			'uf': ['h-card']
		},
		'bday': {
			'map': 'dt-bday'
		},
		'class': {},
		'category': {
			'map': 'p-category',
			'relAlt': ['tag']
		},
		'email': {
			'map': 'u-email'
		},
		'geo': {
			'map': 'p-geo', 
			'uf': ['h-geo']
		},
		'key': {},
		'label': {},
		'logo': {
			'map': 'u-logo'
		},
		'mailer': {},
		'honorific-prefix': {},
		'given-name': {},
		'additional-name': {},
		'family-name': {},
		'honorific-suffix': {},
		'nickname': {},
		'note': {}, // could be html i.e. e-note
		'org': {},
		'p-organization-name': {},
		'p-organization-unit': {},
		'photo': {
			'map': 'u-photo'
		},
		'rev': {
			'map': 'dt-rev'
		},
		'role': {},
		'sequence': {},
		'sort-string': {},
		'sound': {
			'map': 'u-sound'
		},
		'title': {},
		'tel': {},
		'tz': {},
		'uid': {
			'map': 'u-uid'
		},
		'url': {
			'map': 'u-url'
		}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-entry'] = {
	root: 'hentry',
	name: 'h-entry',
	properties: {
		'entry-title': {
			'map': 'p-name'
		},
		'entry-summary': {
			'map': 'p-summary'
		},
		'entry-content': {
			'map': 'e-content'
		},
		'published': {
			'map': 'dt-published'
		},
		'updated': {
			'map': 'dt-updated'
		},
		'author': { 
			'uf': ['h-card']
		},
		'category': {
			'map': 'p-category',
			'relAlt': ['tag']
		},
		'geo': {
			'map': 'p-geo', 
			'uf': ['h-geo']
		},
		'latitude': {},
		'longitude': {},
		'url': {
            'map': 'u-url',
            'relAlt': ['bookmark']
        }
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-event'] = {  
	root: 'vevent',
	name: 'h-event',
	properties: {
		'summary': {
			'map': 'p-name'
		},
		'dtstart': {
			'map': 'dt-start'
		},
		'dtend': {
			'map': 'dt-end'
		},
		'description': {},
		'url': {
			'map': 'u-url'
		},
		'category': {
			'map': 'p-category',
			'relAlt': ['tag']
		},
		'location': {
			'uf': ['h-card']
		},
		'geo': {
			'uf': ['h-geo']
		},
		'latitude': {},
		'longitude': {},
		'duration': {
			'map': 'dt-duration'
		},
		'contact': {
			'uf': ['h-card']
		},
		'organizer': {
			'uf': ['h-card']},
		'attendee': {
			'uf': ['h-card']},
		'uid': {
			'map': 'u-uid'
		},
		'attach': {
			'map': 'u-attach'
		},
		'status': {},
		'rdate': {}, 
		'rrule': {}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-geo'] = {
	root: 'geo',
	name: 'h-geo',
	properties: {
		'latitude': {},
		'longitude': {}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-item'] = {
	root: 'item',
	name: 'h-item',
	subTree: true,
	properties: {
		'fn': {
			'map': 'p-name'
		},
		'url': {
			'map': 'u-url'
		},
		'photo': {
			'map': 'u-photo'
		}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-listing'] = {
  root: 'hlisting',
  name: 'h-listing',
  properties: {
    'version': {},
    'lister': {
      'uf': ['h-card']
    },
    'dtlisted': {
      'map': 'dt-listed'
    },
    'dtexpired': {
      'map': 'dt-expired'
    },
    'location': {},
    'price': {},
    'item': {
      'uf': ['h-card','a-adr','h-geo']
    },
    'summary': {
      'map': 'p-name'
    },
    'description': {
      'map': 'e-description'
    },
    'listing': {}
  }
};

/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-news'] = {
  root: 'hnews',
  name: 'h-news',
  properties: {
    'entry': {
      'uf': ['h-entry']
    },
    'geo': {
      'uf': ['h-geo']
    },
    'latitude': {},
    'longitude': {},
    'source-org': {
      'uf': ['h-card']
    },
    'dateline': {
      'uf': ['h-card']
    },
    'item-license': {
      'map': 'u-item-license'
    },
    'principles': {
      'map': 'u-principles', 
      'relAlt': ['principles']
    }
  }
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-org'] = {
    root: 'h-x-org',  // drop this from v1 as it causes issue with fn org hcard pattern
    name: 'h-org',
    properties: {
        'organization-name': {},
        'organization-unit': {}
    }
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-product'] = {
  root: 'hproduct',
  name: 'h-product',
  properties: {
    'brand': {
      'uf': ['h-card']
    },
    'category': {
      'map': 'p-category',
      'relAlt': ['tag']
    },
    'price': {},
    'description': {
      'map': 'e-description'
    },
    'fn': {
      'map': 'p-name'
    },
    'photo': {
      'map': 'u-photo'
    },
    'url': {
      'map': 'u-url'
    },
    'review': {
      'uf': ['h-review', 'h-review-aggregate']
    },
    'listing': {
      'uf': ['h-listing']
    },
    'identifier': {
      'map': 'u-identifier'
    }
  }
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-recipe'] = {
  root: 'hrecipe',
  name: 'h-recipe',
  properties: {
    'fn': {
      'map': 'p-name'
    },
    'ingredient': {
      'map': 'e-ingredient'
    },
    'yield': {},
    'instructions': {
      'map': 'e-instructions'
    },
    'duration': {
      'map': 'dt-duration'
    },
    'photo': {
      'map': 'u-photo'
    },
    'summary': {},
    'author': {
      'uf': ['h-card']
    },
    'published': {
      'map': 'dt-published'
    },
    'nutrition': {},
    'tag': {}
  }
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-resume'] = {
	root: 'hresume',
	name: 'h-resume',
	properties: {
		'summary': {},
		'contact': {
			'uf': ['h-card']
		},
		'education': {
			'uf': ['h-card', 'h-event']
		},
		'experience': {
			'uf': ['h-card', 'h-event']
		},
		'skill': {},
		'affiliation': {
			'uf': ['h-card']
		}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-review-aggregate'] = {
    root: 'hreview-aggregate',
    name: 'h-review-aggregate',
    properties: {
        'summary': {
            'map': 'p-name'
        },
        'item': {
            'map': 'p-item',
            'uf': ['h-item', 'h-geo', 'h-adr', 'h-card', 'h-event', 'h-product']
        },
        'rating': {},
        'average': {},
        'best': {},
        'worst': {},       
        'count': {},
        'votes': {},
        'category': {
            'map': 'p-category',
            'relAlt': ['tag']
        },
        'url': {
            'map': 'u-url',
            'relAlt': ['self', 'bookmark']
        }
    }
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-review'] = {
    root: 'hreview',
    name: 'h-review',
    properties: {
        'summary': {
            'map': 'p-name'
        },
        'description': {
            'map': 'e-description'
        },
        'item': {
            'map': 'p-item',
            'uf': ['h-item', 'h-geo', 'h-adr', 'h-card', 'h-event', 'h-product']
        },
        'reviewer': {
            'uf': ['h-card']
        },
        'dtreviewer': {
            'map': 'dt-reviewer'
        },
        'rating': {},
        'best': {},
        'worst': {},
        'category': {
            'map': 'p-category',
            'relAlt': ['tag']
        },
        'url': {
            'map': 'u-url',
            'relAlt': ['self', 'bookmark']
        }
    }
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.rels = {
	// xfn
	//        ['link', 'a or area'] yes, no or external
	'friend': [ 'yes','external'], 
	'acquaintance': [ 'yes','external'],  
	'contact': [ 'yes','external'], 
	'met': [ 'yes','external'], 
	'co-worker': [ 'yes','external'],  
	'colleague': [ 'yes','external'], 
	'co-resident': [ 'yes','external'],  
	'neighbor': [ 'yes','external'], 
	'child': [ 'yes','external'],  
	'parent': [ 'yes','external'],  
	'sibling': [ 'yes','external'],  
	'spouse': [ 'yes','external'],  
	'kin': [ 'yes','external'], 
	'muse': [ 'yes','external'],  
	'crush': [ 'yes','external'],  
	'date': [ 'yes','external'],  
	'sweetheart': [ 'yes','external'], 
	'me': [ 'yes','external'], 

	// other rel= 
	'license': [ 'yes','yes'],
	'nofollow': [ 'no','external'],
	'tag': [ 'no','yes'],
	'self': [ 'no','external'],
	'bookmark': [ 'no','external'],
	'author': [ 'no','external'],
	'home': [ 'no','external'],
	'directory': [ 'no','external'],
	'enclosure': [ 'no','external'],
	'pronunciation': [ 'no','external'],
	'payment': [ 'no','external'],
	'principles': [ 'no','external']

};





