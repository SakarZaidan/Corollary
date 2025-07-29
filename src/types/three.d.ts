import * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: THREE.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      boxGeometry: THREE.Object3DNode<
        THREE.BoxGeometry,
        typeof THREE.BoxGeometry
      >;
      sphereGeometry: THREE.Object3DNode<
        THREE.SphereGeometry,
        typeof THREE.SphereGeometry
      >;
      meshStandardMaterial: THREE.Object3DNode<
        THREE.MeshStandardMaterial,
        typeof THREE.MeshStandardMaterial
      >;
    }
  }
}
