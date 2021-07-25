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

//valor entre 0-1 que representa la posicion del pixel en la imange que contiene todas las piezas
vec2 pos_images(int pos,vec2 original){
    //calculo explicado en el articulo
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

//Se encuentra la pieza que tiene el color mas cercano utilizando la funcion delta E
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
	return vec4(texture2D(images,pos_images(pos,original)).rgb, 1);//calculo del color correspondiente, nos e usa transparencia
}

void main() {
    vec2 cord = vec2(int(gl_FragCoord.x)/scale_img,int(gl_FragCoord.y)/scale_img);//posicion a la que corresponde en la imagen pequeña
    vec2 position = cord/u_res_sm;//Valor entre 0 y 1
    vec4 texel = texture2D(u_img,position);//color en la imagen pequeña 
    vec3 rgb_val = vec3(texel[0],texel[1],texel[2]);
    int pxcol = loadImageCloser(rgb_val);//posicion de la pieza a la que corresponde

    gl_FragColor = get_px(pxcol,gl_FragCoord.xy);//color del pixel en la piza correspondiente
}