var fs      = require('fs');

var cmd     = require('../lib/cmdhelper.js');
var config  = require('../lib/config.js');
var h       = require('../lib/helper.js');
var fsh     = require('../lib/fshelper.js');
var tplh    = require('../lib/tplhelper.js');
var C       = require('../lib/colors.js');
 
module.exports = {
  /**
   * adds a model with the given attributes to the meteor app
   * @param {Object} model
   * @param {Object} attr
   */
  add : function(filename, attr) {  
	// prepare attributes tor Handlebars
    var attrParsed = [];
    if (attr){
      for (var i = 0; i < attr.length; i++){
        attrParsed.push({name:attr[i], Name:h.capitalize(attr[i]), Model: h.capitalize(filename), model: filename.toLowerCase()});
      }
    }
    
    // parse config-section model and do what it says
    cmd.addFromConfig(config.get('collection'),{filename: filename},
    {
        Model : h.capitalize(filename),
        model : filename.toLowerCase(),
        attr  : attrParsed,
        collection: h.capitalize(filename) + "Collection",   		 
    });
  },

  /**
   * deletes the model with the the name "filename"
   * @param {String} filename 
   */
  del : function(filename){
  	cmd.delFromConfig(config.get('collection'), {filename: filename});
  },
  help : {'collection': "creates a collection (adds a collection and some stuff).\n"+
                        "  usage: abee collection add <collectionName1> ... <collectionNameN>\n"+
                        "         abee collection remove <collectionName1> ... <collectionNameN>\n"
         }
};
