/* ---- PALETTE ---- */

@motorway: #90BFE0; /* #90BFE0 */
@trunk: #FFFABB;
@primary: @trunk;
@secondary: @trunk;
@road: #444;
@track: @road;
@footway: #6B9;
@cycleway: #69B;

/* ---- ROAD COLORS ---- */

#maconga[highway='motorway'] {
  [zoom>=7]  { 
    line-color:spin(darken(@motorway,36),-10);
    line-cap:round;
    line-join:round;
  }
  .fill[zoom>=10] {
    line-color:@motorway;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='motorway_link'] {
  [zoom>=7]  { 
    line-color:spin(darken(@motorway,36),-10);
    line-cap:round;
    line-join:round;
  }
  .fill[zoom>=12] {
    line-color:@motorway;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='trunk'],
#maconga[highway='trunk_link'] {
  [zoom>=7] {
    line-color:spin(darken(@trunk,36),-10);
    line-cap:round;
    line-join:round;
  }
  .fill[zoom>=11] {
    line-color:@trunk;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='primary'],
#maconga[highway='primary_link'] {
  [zoom>=7] {
    line-color:spin(darken(@primary,36),-10);
    line-cap:round;
    line-join:round;
  }
  .fill[zoom>=12] {
    line-color:@primary;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='secondary'] {
  [zoom>=8] {
    line-color:spin(darken(@secondary,36),-10);
    line-cap:round;
    line-join:round;
  }
  .fill[zoom>=12] {
    line-color:@secondary;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='secondary_link'] {
  [zoom>=12] {
    line-color:spin(darken(@secondary,36),-10);
    line-cap:round;
    line-join:round;
  }
  .fill[zoom>=14] {
    line-color:@secondary;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='living_street'],
#maconga[highway='residential'],
#maconga[highway='road'],
#maconga[highway='tertiary'],
#maconga[highway='unclassified'] {
  [zoom>=10] {
    line-color:@road;
    line-cap:round;
    line-join:round;
  }
  .fill[zoom>=14] {
    line-color:#fff;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='service'] {
  [zoom>=13] {
    line-color:@road;
    line-cap:round;
    line-join:round;
  }
  .fill[zoom>=16] {
    line-color:#fff;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='track'] {
  [zoom>=13] {
    line-color:@track;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='footway'],
#maconga[highway='path'],
#maconga[highway='pedestrian'] {
  [zoom>=14] {
    line-color:@footway;
    line-cap:round;
    line-join:round;
  }
}

#maconga[highway='cycleway'] {
  [zoom>=14] {
    line-color:@cycleway;
    line-cap:round;
    line-join:round;
  }
}

/* ---- ROAD WIDTHS ---- */

#maconga[zoom=7] {
  [highway='motorway'] { line-width: 1.0; }
  [highway='trunk']    { line-width: 0.8; }
  [highway='primary']  { line-width: 0.6; }
}

#maconga[zoom=8] {
  [highway='motorway'] { line-width: 1.0; }
  [highway='trunk']    { line-width: 0.8; }
  [highway='primary']  { line-width: 0.5; }
  [highway='secondary']{ line-width: 0.3; }
}

#maconga[zoom=9] {
  [highway='motorway'] { line-width: 1.0; }
  [highway='trunk']    { line-width: 0.8; }
  [highway='primary']  { line-width: 0.6; }
  [highway='secondary']{ line-width: 0.4; }
}

#maconga[zoom=10] {
  [highway='motorway'] { line-width: 0.8 + 1.6; }
  .fill[highway='motorway'] { line-width: 0.8; }
  
  [highway='trunk']    { line-width: 1.4; }
  
  [highway='primary']  { line-width: 1.2; }
  
  [highway='secondary']{ line-width: 0.8; }
  
  [highway='living_street'],
  [highway='residential'],
  [highway='road'],
  [highway='tertiary'],
  [highway='unclassified'] { line-width: 0.2; }
}

#maconga[zoom=11] {
  [highway='motorway']      { line-width: 1.0 + 1.8; }
  .fill[highway='motorway']      { line-width: 1.0; }
  [highway='trunk']         { line-width: 0.8 + 1.6; }
  .fill[highway='trunk']         { line-width: 0.8; }
  [highway='primary']       { line-width: 1.4; }
  [highway='secondary']     { line-width: 1.0; }
  
  [highway='motorway_link'] { line-width: 0.6; }
  [highway='trunk_link']    { line-width: 0.5; }
  [highway='primary_link']  { line-width: 0.4; }
  
  [highway='living_street'],
  [highway='residential'],
  [highway='road'],
  [highway='tertiary'],
  [highway='unclassified'] { line-width: 0.4; }
}

#maconga[zoom=12] {
  [highway='motorway']      { line-width: 1.2 + 2; }
  .fill[highway='motorway']      { line-width: 1.2; }
  [highway='trunk']         { line-width: 1.0 + 1.8; }
  .fill[highway='trunk']         { line-width: 1.0; }
  [highway='primary']       { line-width: 0.8 + 1.6; }
  .fill[highway='primary']       { line-width: 0.8; }
  [highway='secondary']     { line-width: 0.8 + 1.6; }
  .fill[highway='secondary']     { line-width: 0.8; }
  
  [highway='motorway_link'] { line-width: 1.0 + 1.8; }
  .fill[highway='motorway_link'] { line-width: 1.0; }
  [highway='trunk_link']    { line-width: 0.8 + 1.6; }
  .fill[highway='trunk_link']    { line-width: 0.8; }
  [highway='primary_link']  { line-width: 0.8 + 1.6; }
  .fill[highway='primary_link']  { line-width: 0.8; }
  [highway='secondary_link']  { line-width: 0.8; }
  
  [highway='living_street'],
  [highway='residential'],
  [highway='road'],
  [highway='tertiary'],
  [highway='unclassified']  { line-width: 0.6; }
}

#maconga[zoom=13] {
  [highway='motorway']      { line-width: 2.0 + 2; }
  .fill[highway='motorway']      { line-width: 2.0; }
  [highway='trunk']         { line-width: 1.4 + 2; }
  .fill[highway='trunk']         { line-width: 1.4; }
  [highway='primary']       { line-width: 1.2 + 2; }
  .fill[highway='primary']       { line-width: 1.2; }
  [highway='primary_link'],
  [highway='secondary']     { line-width: 1.0 + 2; }
  .fill[highway='primary_link'],
  .fill[highway='secondary']     { line-width: 1.0; }
  
  [highway='motorway_link'] { line-width: 1.0 + 2; }
  .fill[highway='motorway_link'] { line-width: 1.0; }
  [highway='trunk_link']    { line-width: 1.0 + 2; }
  .fill[highway='trunk_link']    { line-width: 1.0; }
  [highway='primary_link']  { line-width: 1.0 + 2; }
  .fill[highway='primary_link']  { line-width: 1.0; }
  [highway='secondary_link']{ line-width: 0.8; }
  
  [highway='living_street'],
  [highway='residential'],
  [highway='road'],
  [highway='tertiary'],
  [highway='unclassified']  { line-width: 1.0; }
  [highway='service']       { line-width: 0.5; }
  
  [highway='track']         { line-width: 0.5; line-dasharray:2,3; }
}

#maconga[zoom=14] {
  [highway='motorway']      { line-width: 4 + 2; }
  .fill[highway='motorway']      { line-width: 4; }
  [highway='trunk']         { line-width: 3 + 2; }
  .fill[highway='trunk']         { line-width: 3; }
  [highway='primary']       { line-width: 2 + 2; }
  .fill[highway='primary']       { line-width: 2; }
  [highway='secondary']     { line-width: 2 + 2; }
  .fill[highway='secondary']     { line-width: 2; }
  
  [highway='motorway_link'] { line-width: 1.4 + 2; }
  .fill[highway='motorway_link'] { line-width: 1.4; }
  [highway='trunk_link']    { line-width: 1.2 + 2; }
  .fill[highway='trunk_link']    { line-width: 1.2; }
  [highway='primary_link']  { line-width: 1.0 + 2; }
  .fill[highway='primary_link']  { line-width: 1.0; }
  [highway='secondary_link']{ line-width: 0.8 + 2; }
  .fill[highway='secondary_link']{ line-width: 0.8; }
  
  [highway='living_street'],
  [highway='residential'],
  [highway='road'],
  [highway='tertiary'],
  [highway='unclassified']  { line-width: 1.6 + 1.6; }
  .fill[highway='living_street'],
  .fill[highway='residential'],
  .fill[highway='road'],
  .fill[highway='tertiary'],
  .fill[highway='unclassified']  { line-width: 1.6; }
  [highway='service']       { line-width: 0.6; }
  
  [highway='track']         { line-width: 0.6; line-dasharray:2,3; }
  
  [highway='cycleway'],
  [highway='footway'],
  [highway='path'],
  [highway='pedestrian'] {
    line-dasharray:1,2;
    line-width:0.6;
  }
}

#maconga[zoom=15] {
  [highway='motorway']      { line-width: 6 + 2; }
  .fill[highway='motorway']      { line-width: 6; }
  [highway='trunk']         { line-width: 5 + 2; }
  .fill[highway='trunk']         { line-width: 5; }
  [highway='primary']       { line-width: 4 + 2; }
  .fill[highway='primary']       { line-width: 4; }
  [highway='secondary']     { line-width: 4 + 2; }
  .fill[highway='secondary']     { line-width: 4; }
  
  [highway='motorway_link'] { line-width: 2 + 2; }
  .fill[highway='motorway_link'] { line-width: 2; }
  [highway='trunk_link']    { line-width: 1.6 + 2; }
  .fill[highway='trunk_link']    { line-width: 1.6; }
  [highway='primary_link']  { line-width: 1.4 + 2; }
  .fill[highway='primary_link']  { line-width: 1.4; }
  [highway='secondary_link']{ line-width: 1.0 + 2; }
  .fill[highway='secondary_link']{ line-width: 1.0; }
  
  [highway='living_street'],
  [highway='residential'],
  [highway='road'],
  [highway='tertiary'],
  [highway='unclassified']  { line-width: 3 + 2; }
  .fill[highway='living_street'],
  .fill[highway='residential'],
  .fill[highway='road'],
  .fill[highway='tertiary'],
  .fill[highway='unclassified']  { line-width: 2.5; }
  [highway='service']       { line-width: 1; }
  
  [highway='track']         { line-width: 1; line-dasharray:2,3; }
  
  [highway='cycleway'],
  [highway='footway'],
  [highway='path'],
  [highway='pedestrian'] {
    line-dasharray:1,2;
    line-width:0.8;
    line-color:@road;
  }
}

#maconga[zoom=16] {
  [highway='motorway']      { line-width: 9 + 3; }
  .fill[highway='motorway']      { line-width: 9; }
  [highway='trunk']         { line-width: 8 + 2.5; }
  .fill[highway='trunk']         { line-width: 8; }
  [highway='primary']       { line-width: 7 + 2; }
  .fill[highway='primary']       { line-width: 7; }
  [highway='secondary']     { line-width: 6 + 2; }
  .fill[highway='secondary']     { line-width: 6; }
  
  [highway='motorway_link'] { line-width: 3 + 2.5; }
  .fill[highway='motorway_link'] { line-width: 3; }
  [highway='trunk_link']    { line-width: 2 + 2; }
  .fill[highway='trunk_link']    { line-width: 2; }
  [highway='primary_link']  { line-width: 1.8 + 2; }
  .fill[highway='primary_link']  { line-width: 1.8; }
  [highway='secondary_link']{ line-width: 1.4 + 2; }
  .fill[highway='secondary_link']{ line-width: 1.4; }
  
  [highway='living_street'],
  [highway='residential'],
  [highway='road'],
  [highway='tertiary'],
  [highway='unclassified']  { line-width: 3 + 2; }
  .fill[highway='living_street'],
  .fill[highway='residential'],
  .fill[highway='road'],
  .fill[highway='tertiary'],
  .fill[highway='unclassified']  { line-width: 3; }
  [highway='service']       { line-width: 1.4 + 2; }
  .fill[highway='service']       { line-width: 1.4; }
  
  [highway='track']         { line-width: 1.2; line-dasharray:2,3; }
  
  [highway='cycleway'],
  [highway='footway'],
  [highway='path'],
  [highway='pedestrian'] {
    line-dasharray:1,2;
    line-width:1.0;
  }
}

#maconga[zoom>=17] {
  [highway='motorway']      { line-width: 13 + 3; }
  .fill[highway='motorway']      { line-width: 13; }
  [highway='trunk']         { line-width: 10 + 2.5; }
  .fill[highway='trunk']         { line-width: 10; }
  [highway='primary']       { line-width: 9 + 2; }
  .fill[highway='primary']       { line-width: 9; }
  [highway='secondary']     { line-width: 8 + 2; }
  .fill[highway='secondary']     { line-width: 8; }
  
  [highway='motorway_link'] { line-width: 4 + 2.5; }
  .fill[highway='motorway_link'] { line-width: 4; }
  [highway='trunk_link']    { line-width: 3.5 + 2; }
  .fill[highway='trunk_link']    { line-width: 3.5; }
  [highway='primary_link']  { line-width: 3 + 2; }
  .fill[highway='primary_link']  { line-width: 3; }
  [highway='secondary_link']{ line-width: 2.5 + 2; }
  .fill[highway='secondary_link']{ line-width: 2.5; }
  
  [highway='living_street'],
  [highway='residential'],
  [highway='road'],
  [highway='tertiary'],
  [highway='unclassified']  { line-width: 5 + 2; }
  .fill[highway='living_street'],
  .fill[highway='residential'],
  .fill[highway='road'],
  .fill[highway='tertiary'],
  .fill[highway='unclassified']  { line-width: 8; }
  
  [highway='service']       { line-width: 2 + 2; }
  .fill[highway='service']       { line-width: 2; }
  
  [highway='track']         { line-width: 1.4; line-dasharray:2,3; }
  
  [highway='cycleway'],
  [highway='footway'],
  [highway='path'],
  [highway='pedestrian'] {
    line-dasharray:2,3;
    line-width:1.2;
  }
}

/* ---- ONE WAY ARROWS ---- */

#maconga.fill::oneway_arrow[zoom>15][ONEWAY='yes'] {
  marker-highway:arrow;
  marker-width:1;
  marker-line-width:1;
  marker-line-opacity:0.5;
  marker-line-color:#fff;
  marker-spacing: 200;
  marker-fill:#fff;
  marker-opacity:1;
}