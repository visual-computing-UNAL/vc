var img;
var resdiv;
var options = [' ','`','.',',-',"':",';_~','"','*|','!l',
'+=','>','<L','\\i','/^','1?','Jv','r','()cx','7}','sz',
'3u','2Ckty{','jn','4FVY','5P[]af','qw','Sde','Eo',
'NOZ','9HXgh','GTU','$AIm','QW','KM','%8','#06@','bp',
'D','&','R','B'];

function preload()
{
  img = loadImage('/vc/docs/sketches/imaging/acii-art/test3.jpg');
}

function setup() {
  resdiv = createP('');
  asciify(img);
}

function asciify(pic) {
  var res = '<pre>';
  for (var i=0; i<60; i++) {
    var line = '';
    for (var j=0; j<168; j++) {
      var x = pic.get(2+round(j*5.714),5+i*10);
      var v = round((1-x[0]/255.0)*40);
      var index = floor(random(options[v].length));
      var chr = options[v][index];
      if (chr==' ') chr='&nbsp;';
      if (chr=='<') chr='&lt;';
      if (chr=='>') chr='&gt;';
      if (chr=='"') chr='&quot;';
      line += chr;
    }
    res += line+'<br>';
  }
  res += '</pre>'
  resdiv.html(res);
}