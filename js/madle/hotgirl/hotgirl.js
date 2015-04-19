
function loadBoat(HotGirl)
{
	 create_geometry_0(HotGirl.group);
	 create_geometry_1(HotGirl.group);
	 create_geometry_2(HotGirl.group);
	 create_geometry_3(HotGirl.group);
}

// boat constructor
var HotGirl = function (scene, position, theta) {
	this.group = new THREE.Object3D();
	this.pos = (position !== undefined) ? position.clone() : new THREE.Vector3(0,0,0);
	this.vel = new THREE.Vector3();
	this.force = new THREE.Vector3();
	this.power = 0;
	this.theta = (theta !== undefined) ? theta : 0;
	
	loadBoat (this);
	scene.add (this.group);

	this.group.scale.set (1.5,1.5,1.5);
	this.group.position.set (this.pos.x, this.pos.y+3, this.pos.z);
	this.group.rotation.x = -Math.PI/2;
	
};

HotGirl.prototype.step = function (pa, pb) 
{
		
    var tmp = new THREE.Vector3();
    tmp.copy(pa);
    tmp.add(pb).multiplyScalar(0.5); // (pa+pb)/2
    girl.pos = (tmp.x, tmp.y, tmp.z);
    tmp.copy(pa);
    tmp.sub(pb); // pa - pb;
    angle = Math.atan2(tmp.x, tmp.z) - Math.PI / 2;
	girl.group.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
	
}

HotGirl.prototype.accumForce = function (pa, pb, sa, sb)
{
    var center = new THREE.Vector3();
    var tmp = new THREE.Vector3();
    var l = tmp.subVectors(pa, pb).length();
	var k = 0;
	
    k = l * sa / (sb - sa);
    this.omega = (sb - sa) / l;
    //if (omega === 0.0) {
    if (Math.abs(sa-sb) < 1e-5) {    // this gives better result (no jerk)
    tmp.subVectors(pa, pb).normalize().cross(new THREE.Vector3(0, 1, 0)).multiplyScalar(sa * dt);
        pa.add(tmp);
        pb.add(tmp);
        return; // do a pure translation then return
    }

    tmp.subVectors(pa, pb).normalize().multiplyScalar(k);
    center.copy(tmp.add(pa));

    tmp.subVectors(pa, center)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), omega * dt)
        .add(center);
    pa.copy(tmp);

    tmp.subVectors(pb, center)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), omega * dt)
        .add(center);
    pb.copy(tmp);

}
 