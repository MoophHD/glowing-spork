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
    let result = '';
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
    document.body.appendChild( renderer.domElement );

    camera.position.z = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let geometry = new THREE.Geometry;
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));

    let material = new THREE.LineBasicMaterial( { color:0x0000ff } );

    let lines = new THREE.Line( geometry, material );


    scene.add( lines );

    function animate() {
      requestAnimationFrame( animate );

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
