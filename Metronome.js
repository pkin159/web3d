
var Metronome = function (){
	
	this.main = new THREE.Object3D();
	init(this);
	scene.add(this.main);
}
Metronome.prototype.init = function(Metronome){
	
/////////cube for bottom
var geometry = new THREE.BoxGeometry( 10, 10, 5 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );

////////cube for top
var geometry2 = new THREE.BoxGeometry( 1, 30, 1 );
var material2 = new THREE.MeshBasicMaterial( {color: 0x000000} );
var cube2 = new THREE.Mesh( geometry2, material2 );

cube2.position.set (0,15,0);
cube.add( cube2 );
cube.rotation.z -= 30*Math.PI/180;
Metronome.main.add( cube );

}

//////////animate
Metronome.prototype.animate = function(bpm){
	var angle = (bpm * clock.getElapsedTime()) %120;
	if( angle < 60 ){
		this.main.cube.rotation.z = (angle - 30) * Math.PI/180;
	}
	else{
		this.main.cube.rotation.z = ((120-angle)-30)*Math.PI/180;
	}
}

