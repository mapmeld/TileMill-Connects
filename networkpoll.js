var codelines = $(".CodeMirror-lines pre");
var connectsearch = [ ];
var connectionopen = 0;
var cstreets = { };
var mainindex = 0;

/* Sample input:
#maconga[ connects = 'New St, Macon, GA' ]{
  line-color: #F8D6E0;
  line-cap: round;
  line-join: round;
}
#maconga[ connects = 9030455 ]{
  line-color: #F8D6E0;
  line-cap: round;
  line-join: round;
}
*/

/* Sample output:
// #maconga[ name = '1st St' ]{
//  line-color: #F8D6E0;
//  line-cap: round;
//  line-join: round;
// }
// #maconga[ name = '2nd St' ]{
//  line-color: #F8D6E0;
//  line-cap: round;
//  line-join: round;
// }
*/

$('#modal').html('  <a href="javascript:void(0);" onclick="$(\'#modal\').removeClass(\'active\');" class="close"><span class="icon reverse close">Close</span></a>  <div class="content"><pre class="scrolling">CSV Plugin: could not detect column headers with the name of wkt, geojson, x/y, or latitude/longitude - this is required for reading geometry data</pre></div>');
$('#modal').addClass('active');
$('#modal .content').html('<pre class="scrolling">Searching for connects statements</pre>');

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

var processOSM = function(data){
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
            $('#modal .content').html('<pre class="scrolling">Found ' + data[s].name + ' connects to ' + connectsearch[ mainindex ].name + '. <a href="javascript:void(0);" onclick="writeMSS(' + connectsearch[ mainindex ].wayid + ')">Read code</a> for ' + cstreets[ connectsearch[ mainindex ].wayid ].length + ' connections.</pre>');
          }
          else{
            cstreets[ connectsearch[ mainindex ].wayid ].push("wayid:" + data[s].wayid);
            $('#modal .content').html('<pre class="scrolling">Found ' + data[s].wayid + ' connects to ' + connectsearch[ mainindex ].name + '. <a href="javascript:void(0);" onclick="writeMSS(' + connectsearch[ mainindex ].wayid + ')">Read code</a> for ' + cstreets[ connectsearch[ mainindex ].wayid ].length + ' connections.</pre>');            
          }
          break;
        }
      }
      //for(var pt=0;pt<data[s].line.length;pt++){
        //if(mainlls.indexOf( data[s].line[pt] ) > -1){
        //  // found a matching point
        //  console.log("matching point in " + data[s].name );
        //  break;
        //}
      //}
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

// start the recursive search
processSt(0);