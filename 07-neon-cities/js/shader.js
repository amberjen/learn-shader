const frag = (images) => {
  
  let ifLoop = images.map((img, index) => {
    return `
      if (index == ${index}) { 
        return texture2D(textures[${index}], uv);
      }
    `;
  }).join('else ');

  
  return `#ifdef GL_ES
      precision highp float;
      #endif

      #define MAX ${images.length}

      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float timeline;

      // This won't work in KodeLife
      uniform sampler2D textures[MAX];

      uniform float startIndex;
      uniform float endIndex;

      varying vec3 v_normal;
      varying vec2 v_texcoord;

      ${includes}

      vec4 sampleColor(int index, vec2 uv) {
        
        ${ifLoop}
        
        return vec4(0.0, 0.0, 0.0, 0.0);

      }

      void main(void) {
        
        // Resampling uv to start in the center
        vec2 uv = v_texcoord;
        float wave = fbm(2.5 * uv + 0.5 * u_time);
        float strength = smoothstep(0.0, 1.0, timeline) - smoothstep(1.5, 2.5, timeline); // fade in & out
        float distortion = mix(1.0, 1.0 + strength, wave);
        
        uv -= 0.5;
        uv *= distortion;
        uv += 0.5;
        
        // Flip the image in Kodelife
        // uv.y = 1.0 - uv.y;
        
        // Remove px out of bounds
        if (uv.x < 0.0 || uv.x > 1.0|| uv.y < 0.0 || uv.y > 1.0) {
            discard;
        }    
        
        // -------------------    
        
        vec4 texture1 = sampleColor(int(startIndex), uv);
        vec4 texture2 = sampleColor(int(endIndex), uv);
        
        // Tween
        float changeTimeline = smoothstep(1.0, 2.0, timeline);
        float mixer = 1.0 - step(changeTimeline, wave); // wave-based transition
        
        gl_FragColor = mix(texture1, texture2, mixer);
    }`;
};