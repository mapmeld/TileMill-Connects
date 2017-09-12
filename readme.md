<h3>TileMill Connects</h3>

TileMill-Connects is partly a plugin, partly a hack to leverage TileMill's Carto editor and OpenStreetMap data to make it possible to style road networks.

<h4>How could it be used?</h4>

Suppose you've got some stores in three locations in the city, and would like to highlight the roads leading up to them.

Or you're an urban planner studying quirks in road networks.

Or you want to show which parts of the city have access to fresh fruits and vegetables

<h3>Demo</h3>

1) Create a TileMill map with a shapefile of roads (ideally loaded from osm2pgsql - see http://metro.teczno.com/ for some city downloads).  I've made minor modifications to highway.mss

<img src="http://i.imgur.com/GlIfQ.png"/>

2) I decide to highlight High Street, Lincoln Street, and Morrow Ave - each with their own color.  I added ", Macon, GA" to make sure the first result in OSM Nominatim would be these streets.

The statements are not accepted by Carto, so they should be added surrounded by comments, like this:

    /*
    #maconga.highway[ connects = "High Street, Macon, GA" ] {

[![Greenkeeper badge](https://badges.greenkeeper.io/mapmeld/TileMill-Connects.svg)](https://greenkeeper.io/)
        line-color: #f00;
        line-width: 4;
    }
    #maconga.highway[ connects = "Lincoln Street, Macon, GA" ] {
        line-color: #f0f;
        line-width: 4;
    }
    #maconga.highway[ connects = "Morrow Ave, Macon, GA" ] {
        line-color: #00f;
        line-width: 4;
    }
    */

If you want an actual comment, begin the line with a // comment and no spaces

Enter your code into the Carto editor, and <strong>scroll the code editor so your code is in view</strong>

3) If you have the plugin installed, click the link icon above the usual Teaser / Click menu. If you'd rather not install a plugin, open TileMill inside your browser, on http://localhost:20009. Open the JavaScript console and paste networkpoll.js in directly.

<img src="http://i.imgur.com/yYPZE.png"/>

4) After some processing time, the plugin will return valid, copy-pasteable MSS.  The process is not perfect, so be prepared to remove roads from your MSS, or change the street name if necessary.

<img src="http://i.imgur.com/sKsus.png"/>

5) Don't forget to style the original roads, too!

    #maconga.highway[ name = "High St" ] {
        line-color: #000;
        line-width: 4;
    }
    #maconga.highway[ name = "Lincoln St" ] {
        line-color: #000;
        line-width: 4;
    }
    #maconga.highway[ name = "Morrow Ave" ] {
        line-color: #000;
        line-width: 4;
    }

<h3>Install</h3>
Mac OS X Terminal one-liner:
<code>cp -r TileMill-Connects /Applications/TileMill.app/Contents/Resources/plugins/</code>