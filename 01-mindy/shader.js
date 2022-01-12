// Fragment Shader

let frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform sampler2D displacement1;

varying vec2 v_texcoord;

vec4 rgb (float r, float g, float b) {
    return vec4(r / 255.0, g / 255.0, b / 255.0, 1.0);
}

void main(void)
{
    vec2 uv = v_texcoord;
    vec2 point = fract(uv * 0.1 + u_time * 0.05);
    vec4 dispColor1 = texture2D(displacement1, point);

    // Color Variables
    vec4 topLeft =  rgb(128.0,  38.0, 243.0);
    vec4 topRight = rgb(240.0, 130.0, 203.0);
    vec4 bottomLeft =  rgb( 52.0, 183.0, 255.0);
    vec4 bottomRight = rgb(132.0, 244.0, 197.0); 
    
    // Displacement
    float dispX = mix(-0.5, 0.5, dispColor1.r);
    float dispY = mix(-0.5, 0.5, dispColor1.r);
    
    vec4 color = mix(
        mix(topLeft, topRight, uv.x + dispX), 
        mix(bottomLeft, bottomRight, uv.x - dispX), 
        uv.y + dispY
    );
    
    gl_FragColor = color;
}

`;