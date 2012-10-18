var codelines;
var connectsearch = [ ];
var connectionopen = 0;
var cstreets = { };
var mainindex = 0;

$.runNetworkCheck = function(){
  setTimeout(function(){
    $("#drawer").removeClass("active");
  }, 500);
  $('#modal').html('  <a href="javascript:void(0);" onclick="$(\'#modal\').removeClass(\'active\');" class="close"><span class="icon reverse close">Close</span></a>  <div class="content"><pre class="scrolling">CSV Plugin: could not detect column headers with the name of wkt, geojson, x/y, or latitude/longitude - this is required for reading geometry data</pre></div>');
  $('#modal').addClass('active');
  $('#modal .content').html('<pre class="scrolling">Searching for connects statements\n\nMake sure connect statements are visible in the code editor.</pre>');
  codelines = $(".CodeMirror-lines pre");

  for(var i=3;i<codelines.length;i++){
    // doesn't appear to start visibility until line 3 or 4
    var line = codelines[i];
  
    if(line.innerText.indexOf("//") == 0){
      // any line starting with a // comment is thrown out
      continue;
    }
  
    if($(line).html().indexOf("connects") > -1){
      // has a connects statement
      var stname = line.innerText;
      stname = unescape(stname.substring(stname.indexOf("connects") + 8));
      if(stname.indexOf("'") > -1 && (stname.indexOf('"') == -1 || stname.indexOf("'") < stname.indexOf('"') )){
        // single quotes around street name
        stname = stname.substring(stname.indexOf("'") + 1);
        stname = stname.substring(0, stname.indexOf("'"));
      }
      else if(stname.indexOf("'") > -1 || stname.indexOf('"') > -1){
        // double quotes around street name
        stname = stname.substring(stname.indexOf('"') + 1);
        stname = stname.substring(0, stname.indexOf('"'));
      }
      else{
        // extract OSM way id
        stname = stname.replace(/[^\d.]/g, "");
      }

      connectsearch.push({ intro: line.innerText.split('[')[0], starts: line, name: stname, rules: [ ] });
      connectionopen = 1;
      $('#modal .content').html('<pre class="scrolling">Found ' + stname + '</pre>');
    }
    else if(connectionopen > 0){
      if($(line).html().indexOf("{") > -1){
        connectionopen++;
      }
      if($(line).html().indexOf("}") > -1){
        connectionopen--;
        if(connectionopen == 0){
          connectsearch[ connectsearch.length -1 ].end = line;
        }
      }
      connectsearch[ connectsearch.length - 1 ].rules.push(line.innerText);
    }
  }
  // start the recursive search
  processSt(0);
}

$.processOSM = function(data){
  //console.log(data);
  
  // find the matching street
  var mainnodes;
  for(var s=0;s<data.length;s++){
    if(data[s].wayid && data[s].wayid == connectsearch[ mainindex ].wayid){
      //console.log("found it!");
      mainnodes = data[s].line;
      break;
    }
  }
  cstreets[ connectsearch[ mainindex ].wayid ] = [ ];
  for(var s=0;s<data.length;s++){
    if(data[s].wayid && data[s].highway && data[s].wayid != connectsearch[ mainindex ].wayid){
      for(var mainpt=0;mainpt<mainnodes.length;mainpt++){
        if(data[s].line.indexOf(mainnodes[mainpt]) > -1){
          // found a matching point
          console.log("matching point");
          if(data[s].name){
            cstreets[ connectsearch[ mainindex ].wayid ].push(data[s].name);
            $('#modal .content').html('<pre class="scrolling">Found ' + data[s].name + ' connects to ' + connectsearch[ mainindex ].name + '. <a href="javascript:void(0);" onclick="writeMSS(' + connectsearch[ mainindex ].wayid + ')">View MSS</a> for all connections.</pre>');
          }
          else{
            cstreets[ connectsearch[ mainindex ].wayid ].push("wayid:" + data[s].wayid);
            $('#modal .content').html('<pre class="scrolling">Found ' + data[s].wayid + ' connects to ' + connectsearch[ mainindex ].name + '. <a href="javascript:void(0);" onclick="writeMSS(' + connectsearch[ mainindex ].wayid + ')">View MSS</a> for all connections.</pre>');            
          }
          break;
        }
      }
    }
  }
  
  // move on to the next street
  mainindex++;
  processSt(mainindex);
};

// match street names
var placeMatch = function(a, b){
  a = a.toLowerCase().replace("street","st").replace("drive","dr").replace("lane","ln").replace("terrace","ter").replace("avenue","ave").replace("place","pl").replace("boulevard","blvd").replace("place","pl").replace("trail","trl").replace("st ln","street ln").replace("dr ln","drive ln");
  b = b.toLowerCase().replace("street","st").replace("drive","dr").replace("lane","ln").replace("terrace","ter").replace("avenue","ave").replace("place","pl").replace("boulevard","blvd").replace("place","pl").replace("trail","trl").replace("st ln","street ln").replace("dr ln","drive ln");
  a = a.replace(/\d/g, "");
  b = a.replace(/\d/g, "");
  while(a.indexOf(" ") > -1){
    a = a.replace(" ","");
  }
  while(a.indexOf(",") > -1){
    a = a.replace(",","");
  }
  while(b.indexOf(" ") > -1){
    b = b.replace(" ","");
  }
  while(b.indexOf(",") > -1){
    b = b.replace(",","");
  }
  return (a == b);
};

// recursive loading of street geometry
var processSt = function(index){
  if(index >= connectsearch.length){
    return;
  }
  $('#modal .content').html('<pre class="scrolling">Search for ' + connectsearch[ index ].name + ' geometry</pre>');
  if(isNaN( 1 * connectsearch[ index ].name )){
    // search by street name
    $.getJSON("http://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent( connectsearch[ index ].name ), function(data){
      var primaryst;
      if(connectsearch[index].placeval){
        primaryst = data[connectsearch[index].placeval];
      }
      else{
        primaryst = data[0];
        // check for additional parts to the same way
        for(var d=1;d<data.length;d++){
          if(placeMatch(data[d].display_name, primaryst.display_name)){
            connectsearch.push( { placeval: d, intro: connectsearch[index].intro, starts: connectsearch[index].starts, name: connectsearch[index].name, rules: connectsearch[index].rules } );
            console.log("added " + d);
          }
        }
      }

      //console.log(primaryst);
      connectsearch[ index ].wayid = primaryst.osm_id;
      var bbox = primaryst.boundingbox;
      // search the area for intersecting streets

      /* $.ajax({ url: "http://api.openstreetmap.org/api/0.6/map?bbox=" + bbox[2] + "," + bbox[0] + "," + bbox[3] + "," + bbox[1] }).done(function(data){
        console.log(data);
        processSt(index + 1);
      }); */

      // use JSONP and my AppEngine server to retrieve data around this way
      $('#modal .content').html('<pre class="scrolling">Search for ' + connectsearch[ index ].name + ' connections</pre>');
      var myscript = document.createElement("script");
      myscript.type = "text/javascript";
      myscript.src = "http://mapmeld.appspot.com/osmapi?pos=nodes&special=lines&bbox=" + bbox[2] + "," + bbox[0] + "," + bbox[3] + "," + bbox[1];
      document.body.appendChild(myscript);
    });
  }
  else{
    // search by way id
    //$('#modal .content').html('<pre class="scrolling">Search for ' + connectsearch[ index ].name + ' connections</pre>');
    //var myscript = document.createElement("script");
    //myscript.type = "text/javascript";
    //myscript.src = "http://mapmeld.appspot.com/osmapi?pos=nodes&special=lines&bbox=" + bbox[2] + "," + bbox[0] + "," + bbox[3] + "," + bbox[1];
    //document.body.appendChild(myscript);
  }
};

// Write MSS for connected streets
var writeMSS = function(wayid){
  var index;
  var outcode = '';
  $.each(cstreets, function(wayid){
    var streetlist = cstreets[wayid];
    for(var i=0;i<connectsearch.length;i++){
      if(connectsearch[i].wayid == wayid){
        index = i;
        break;
      }
    }
    for(var i=0;i<streetlist.length;i++){
      if(streetlist[i].indexOf("wayid:") == -1){
        // known by street name
        outcode += connectsearch[ index ].intro.replace("/*","") + '[ name = "' + streetlist[i].replace("Street","St").replace("Drive","Dr").replace("Lane","Ln").replace("Terrace","Ter").replace("Avenue","Ave").replace("Place","Pl").replace("Boulevard","Blvd").replace("place","pl").replace("Trail","Trl").replace("St Ln","Street Ln").replace("Dr Ln","Drive Ln").replace("'","").replace("'","") + '" ]{\n';
      }
      else{
        // known by OSM way id
        outcode += connectsearch[ index ].intro.replace("/*","") + "[ osm_id = " + streetlist[i].replace("wayid:","") + " ]{\n";
      }
      outcode += connectsearch[ index ].rules.join("\n").replace("*/","");
      //outcode += '\n';
    }
  });
  $('#modal .content').html('<pre class="scrolling">' + outcode + '</pre>');
};

view = Backbone.View.extend();

view.prototype.events = {
};

view.prototype.initialize = function(options) {
    //_(this).bindAll('render', 'attach', 'update');
    //this.render().attach();
};

view.prototype.render = function() {
    //if (this.$('.tooltips').size()) return this;
    //this.$('.content').html(templates.Tintplates(this.model));
    //return this;
};

view.prototype.attach = function() {
};

view.prototype.update = function(ev) {
};

// Hook in to project view with an augment.
views.Project.augment({
    events: { 'click a[href=#connects]': 'connects' },
    connects: function() {
        $.runNetworkCheck()
    },
    render: function(p) {
        p.call(this);
        this.$('.palette').prepend("<a class='drawer' href='#connects' title='Connects'><img class='icon' src='data:image/png;base64,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'/></a>");
        return this;
    }
});