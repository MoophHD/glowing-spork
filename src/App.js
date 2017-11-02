import React, { Component } from 'react';
import * as THREE from 'three'
var OrbitControls = require('three-orbit-controls')(THREE)

export default class App extends Component {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this); 
  }

  clearCanvas() {
    if (document.body.querySelector('canvas')) document.body.removeChild(document.body.querySelector('canvas'));
  }

  getRandomHex() {
    let result = '#';
    for (let i = 0; i < 3; i++) {
      result += (~~(Math.random()*257)).toString(16);
    }
    return result;
  }

  init() {
    const screenX = window.innerWidth;
    const screenY = window.innerHeight;
    

    this.clearCanvas();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75,  screenX/screenY , 0.1, 1000 );
    
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( screenX, screenY );
    renderer.setClearColor( 0xfff6e6 );
    document.body.appendChild( renderer.domElement );

    camera.position.set(0,0,20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let controls = new OrbitControls(camera, renderer.domElement);

    const MAX_POINTS = 250;
    let geometry = new THREE.BufferGeometry();
    let geometryPositions = new Float32Array( MAX_POINTS * 3 );
    geometry.addAttribute( 'position', new THREE.BufferAttribute( geometryPositions, 3 ) );

    var line = new THREE.Line( 
      geometry,  
      new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 3 } ) );
      
    scene.add( line );



    
    let positions = line.geometry.attributes.position.array;

    let x = 0,
        y = 0,
        z = 0;

    for ( var i = 0, l = MAX_POINTS; i < l; i ++ ) {
      
          positions[i] = x;
          positions[i] = y;
          positions[i] = z;
      
          x += 1
          y += 1
          z += 1
      
      }

      line.geometry.setDrawRange( 0, 3 );

      // var geo = new THREE.BoxGeometry(10,10,10)
      // var mat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x111111 })
      // var box = new THREE.Mesh(geo, mat)
      // scene.add(box)


      setTimeout(() => {
        let lineClone = line.clone();

        lineClone.material = line.material.clone();
        line.material.color = new THREE.Color(this.getRandomHex());

        scene.add(lineClone)

        let rot = new THREE.Quaternion();
        rot.setFromAxisAngle(new THREE.Vector3(0,0.5,0.5),  Math.PI / 2);
        // rot.setFromAxisAngle( new THREE.Vector3( Math.random(), Math.random(), Math.random() ), Math.PI / 2 );

        lineClone.quaternion.copy(rot);  
      },500)


      
    function animate() {
      requestAnimationFrame( animate );
      
      // line.geometry.setDrawRange( 0, ~~(Math.random()*10));
      // line.position.copy(new THREE.Vector3(Math.random()*10, Math.random()*10, Math.random()*10));
      // line.quaternion.copy(rot);
      renderer.render( scene, camera );
    }
    animate();
  }

  render() {
    this.init();
    return (    
    <div id="vp">
      <div id="info">Test</div>
    </div>
    )
  }
}
