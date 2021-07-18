#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_img;
uniform vec2 u_resolution;

float divisions = 1.0;

int getBit(int n, int a) {
  float value = float(n);
  for(float i = 27.0; i >= 0.0; i -= 1.0) {
    float val = pow(2.0,i*1.0);
    
    if (val <= value) {
      value -= val;
      if(i == float(a)) return 1;
    }
  }
  return 0;
}

float character(int n, vec2 p){
	p = floor(p*vec2(4.0, 4.0) + 2.5);
    if (clamp(p.x, 0.0, 4.0) == p.x)
	{
        if (clamp(p.y, 0.0, 4.0) == p.y)	
		{
        	int a = int(floor(p.x+0.5) + 5.0 * floor(p.y+0.5));
			if (getBit(n,a) == 1) return 1.0;
		}	
    }
	return 0.0;
}

vec2 pos_img(vec2 original){
	//return original/u_resolution*2.0;
	//vec2 tsize = u_img.xy;//vec2(textureSize(u_img,0).x,textureSize(u_img,0).y);
	vec2 small = original/u_resolution*divisions;
	return vec2(mod(small.x,1.0),mod(small.y,1.0));
	//return mod(small,u_resolution*1.0);
}

vec4 get_px_img(vec2 original){
	return vec4(texture2D(u_img,pos_img(original)).rgb, 1);
}

void main() {

	vec2 original = gl_FragCoord.xy;
	gl_FragColor = get_px_img(original);

	vec2 st = gl_FragCoord.xy/u_resolution;
}