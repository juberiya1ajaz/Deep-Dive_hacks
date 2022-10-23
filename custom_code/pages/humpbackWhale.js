import Image from "next/image"
import Link from 'next/link'
import React, { Suspense, useRef, useState } from "react"
import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, useAnimations, OrbitControls } from "@react-three/drei"
import { proxy, useSnapshot } from "valtio"

const state = proxy({
  current: null,
})

function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/humpback_whale_-_animation_test/scene.gltf')
  const { actions } = useAnimations(animations, group)
  const [hovered, set] = useState(null)
  return (
    <group ref={group} {...props} dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="aefbe05b311642f2a7781fd311e3a39dfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <group name="Object_6" />
                  <group name="polySurface7" />
                  <skinnedMesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.lambert2} skeleton={nodes.Object_7.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

function Details() {

  const snap = useSnapshot(state)
  return (
    <div className="h-full md:flex md:flex-col md:justify-center">
      <p className="self-center mx-8 text-xl tracking-wide text-justify">To view the 3D model in AR, scan the QR code or click on the button below.</p>

      <div className="grid justify-center grid-cols-1 gap-2 pb-8 mx-8 md:grid-cols-2 lg:grid-cols-2">
        <div className="flex p-6 text-6xl rounded-xl h-48 w-48">
          <Image width="250" height="250" src="/humpback whale QR.png" alt="" />
        </div>
        <a href="https://go.echo3d.co/2d4y" target="_blank" rel="noreferrer">
          <button className="h-12 px-8 ml-8 text-base font-semibold tracking-wider text-white border rounded-full shadow-sm mt-16 bg-red-50 bg-gradient-to-r from-secondary to-tertiary hover:shadow-lg">View in AR</button>
        </a>
      </div>
    </div>
  )
}

export default function humpBack() {
  return (
    <div className="pt-8">

      <Link href="/" passHref><span className="ml-8 cursor-pointer">Go Back</span></Link>

      <div className="grid w-full py-10 place-items-center">
        <h1 className="pb-2 text-5xl font-semibold tracking-wide lg:text-6xl">
          Humpback whale
        </h1>
        <div className="inline-flex mt-2 h-1 bg-secondary rounded-full w-96"></div>
        <p className="text-justify text-xl w-86 mt-2 mx-4 md:mx-44">The humpback whale (Megaptera novaeangliae) is a species of baleen whale. It is one of the larger rorqual species, with adults ranging in length from 12–16 m (39–52 ft) and weighing around 25–30 t (28–33 short tons). The humpback has a distinctive body shape, with long pectoral fins and a knobbly head. It is known for breaching and other distinctive surface behaviors, making it popular with whale watchers. This work is based on &quot;Humpback whale&quot; (https://sketchfab.com/3d-models/humpback-whale-2a83b52bfe7f47a1b6c404a90b100dca) by AVINAS (https://sketchfab.com/AVINAS) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</p>
      </div>

      <div className="md:grid md:grid-cols-3 md:pr-15 pr-1">

        <div className="w-full h-96 px-4 outline-none cursor-grab md:col-span-2 lg:block">
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <Suspense fallback={null}>
              <Model scale={0.4} />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls autoRotate addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} />
          </Canvas>
        </div>

        <div className="mt-56 md:mt-0 md:col-span-1 p-4">
          <Details />
        </div>

      </div>

    </div>
  )
}
