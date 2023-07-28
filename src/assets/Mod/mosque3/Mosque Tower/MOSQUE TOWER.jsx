#target AfterEffects

/**************************************
Scene : Scene
Resolution : 1920 x 1080
Duration : 10.416667
FPS : 24.000000
Date : 2019-02-18 21:58:21.392578
Exported with io_export_after_effects.py
**************************************/



function compFromBlender(){

var compName = prompt("Blender Comp's Name \nEnter Name of newly created Composition","BlendComp","Composition's Name");
if (compName){
var newComp = app.project.items.addComp(compName, 1920, 1080, 1.000000, 10.416667, 24.000000);
newComp.displayStartTime = 0.083333;


// **************  CAMERA 3D MARKERS  **************


// **************  OBJECTS  **************


// **************  LIGHTS  **************


// **************  CAMERAS  **************


var _Camera = newComp.layers.addCamera("_Camera",[0,0]);
_Camera.autoOrient = AutoOrientType.NO_AUTO_ORIENT;
_Camera.property("position").setValue([172.124300,-1374.482880,-4434.863663],);
_Camera.property("orientation").setValue([-14.939192,14.748235,3.885789],);
_Camera.property("zoom").setValue(1733.999977,);



}else{alert ("Exit Import Blender animation data \nNo Comp's name has been chosen","EXIT")};}


app.beginUndoGroup("Import Blender animation data");
compFromBlender();
app.endUndoGroup();


