#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_img;
uniform sampler2D images;
uniform sampler2D smaller;

uniform vec2 u_resolution;
uniform vec2 u_res_sm;
uniform vec2 images_resolution;

uniform vec3 colors_avg_img[173];


uniform int scale_img;

float divisions = 1.0;

vec2 pos_img(vec2 original){
	vec2 small = original/u_resolution*divisions;
	return vec2(mod(small.x,1.0),mod(small.y,1.0));
}

vec4 get_px_img(vec2 original){
	return vec4(texture2D(u_img,pos_img(original)).rgb, 1);
}

vec2 pos_images(int pos,vec2 original){
    vec2 pos_pix = vec2(float(pos*scale_img)+mod(float(original.x),float(scale_img)),mod(float(original.y),float(scale_img)));
    return pos_pix/images_resolution;
}

float deltaE(vec3 col1,vec3 col2){
    float acum = 0.0;
    for(int i=0;i<3;i++){
        float temp = float(col1[i] - col2[i]);
        acum += temp*temp;
    }
    return acum;//sqrt(acum)
}

int loadImageCloser(vec3 col){
    float min = 1e8;
    int pos = -1;
    for(int i=0;i<173;i++){
        float de = deltaE(col*255.0,colors_avg_img[i]);
        if(min>de){
            min = de;
            pos = i;
        }
    }
    return pos;
}

vec4 get_px(int pos,vec2 original){
	return vec4(texture2D(images,pos_images(pos,original)).rgb, 1);
}

void draw() {
    vec2 cord = vec2(int(gl_FragCoord.x)/scale_img,int(gl_FragCoord.y)/scale_img);
    vec2 position = cord/u_res_sm;
    vec4 texel = texture2D(u_img,position);//color of the image 
    vec3 rgb_val = vec3(texel[0],texel[1],texel[2]);
    int pxcol = loadImageCloser(rgb_val);

    gl_FragColor = get_px(pxcol,gl_FragCoord.xy);
}

void main() {
	vec2 original = gl_FragCoord.xy;
	gl_FragColor = get_px_img(original);
    draw();
}