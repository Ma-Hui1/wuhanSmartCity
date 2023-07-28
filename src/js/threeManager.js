/*
 * @Author: wangshiyang
 * @Date: 2023-06-29 09:02:00
 * @LastEditors: wangshiyang
 * @LastEditTime: 2023-06-29 10:10:01
 * @Description: 使用L7threeLayer添加gltf
 */
import {ThreeLayer, ThreeRender} from "@antv/l7-three";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

class threeManager {
    constructor(scene) {
        this.scene = scene;
        this.threeJSLayer = null;
    }

    //   构建threejs图层
    initThreeLayer(gltfUrl, modelCenter) {
        if (this.threeJSLayer) {
            return;
        }
        // 2、注册服务
        this.scene.registerRenderService(ThreeRender);
        // 3、构建 threejs 图层对象并在其中添加 threejs 构建的网格对象
        this.threeJSLayer = new ThreeLayer({
            enableMultiPassRenderer: false,
            onAddMeshes: (threeScene, layer) => {
                // 添加环境光
                threeScene.add(new THREE.AmbientLight(0xffffff));

                const sunlight = new THREE.DirectionalLight(0xffffff, 0.25);
                sunlight.position.set(0, 80000000, 100000000);
                sunlight.matrixWorldNeedsUpdate = true;
                threeScene.add(sunlight);

                // 添加立方体
                let cubeGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
                let cubeMaterial = new THREE.MeshNormalMaterial();
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

                layer.setObjectLngLat(
                    cube,
                    [modelCenter.lng + 0.05, modelCenter.lat],
                    0
                );

                threeScene.add(cube);
                if (gltfUrl) {
                    // 加载模型
                    const loader = new GLTFLoader();
                    // 3、加载模型
                    loader.load(gltfUrl, (gltf) => {
                        const model = gltf.scene;
                        layer.adjustMeshToMap(model);
                        layer.setMeshScale(model, 2000, 2000, 2000);
                        console.log(modelCenter);
                        layer.setObjectLngLat(
                            model,
                            [modelCenter.lng, modelCenter.lat],
                            100
                        );

                        // 4、播放模型上绑定的动画
                        const animations = gltf.animations;
                        if (animations && animations.length) {
                            const mixer = new THREE.AnimationMixer(model);
                            const animation = animations[2];
                            const action = mixer.clipAction(animation);
                            action.play();
                            // 5、由 L7 控制模型动画的播放
                            layer.addAnimateMixer(mixer);
                        }
                    });
                }
            },
            zIndex: 2000,
        });

        // 4、添加 threejs 图层对象
        this.scene.addLayer(this.threeJSLayer);
    }
}

export default threeManager;
