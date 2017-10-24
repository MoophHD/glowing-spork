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

  init() {
    this.clearCanvas();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color:0xBDA01D } );
    let cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      renderer.render( scene, camera );
    }
    animate();
  }
  render() {
    this.init();
    return (    
    <div id="vp">
    </div>
    )
  }
}
