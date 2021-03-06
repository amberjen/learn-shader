const frag = `

#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float seed;

varying vec2 v_texcoord;

// Include 3rd-party codes
${includes}

void main(void)
{
    vec2 uv = v_texcoord;

    // find the distance between the mouse and points
    vec2 mouse = u_mouse / u_resolution;
    float dist = distance(uv, mouse);
    float strength = smoothstep(0.5, 0.0, dist);
    
    // where does the hue start
    float hue = u_time * 0.02 + seed;
    
    // make two hsv colors
    vec3 hsv1 = vec3(hue,          0.8, 0.7);
    vec3 hsv2 = vec3(hue + 0.075, 0.75, 0.95);
    
    // convert hsvs to rgb
    vec3 rgb1 = hsv2rgb(hsv1);
    vec3 rgb2 = hsv2rgb(hsv2);
    
    // colors in rgba
    vec4 color1 = vec4(rgb1, 1.0);
    vec4 color2 = vec4(rgb2, 1.0);
    
    // add some grain
    float grain = rand(uv * 100.0) * mix(0.2, 0.01, strength);
    
    // make movement for fbm
    vec2 movement = vec2(u_time * 0.01, u_time * -0.01);
    // add rotation
    movement *= rotation2d(u_time * 0.0025);
    
    // make a noise pattern
    float f = fbm(uv + movement + seed);
    f *= 15.0;
    f += grain;
    f += u_time * 0.2;
    f = fract(f);
    
    // mix colors based on noise pattern
    float gap = mix(0.5, 0.01, strength);
    //            fade in ------------------ fade out
    float mixer = smoothstep(0.0, gap / 2.0, f) - smoothstep(1.0 - gap / 2.0 , 1.0, f); 

    
    // final pixel color
    vec4 color = mix(color1, color2, mixer);
    
    gl_FragColor = color;
}


`;