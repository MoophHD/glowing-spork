import React, { Component } from 'react';
import * as THREE from 'three'

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
    this.clearCanvas();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xfff6e6 );
    document.body.appendChild( renderer.domElement );

    camera.position.set(5,10,0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let plane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5, 5, 5),
      new THREE.MeshBasicMaterial( { color: 0x393839, wireframe: true } )
    )

    plane.rotateX(Math.PI/2);
    scene.add( plane );

    function animate() {
      requestAnimationFrame( animate );
      plane.rotateX(0.025);
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
