import Image from "next/image"
import Link from 'next/link'
import React, { Suspense, useRef, useState } from "react"
import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { proxy, useSnapshot } from "valtio"

const state = proxy({
  current: null,
})

function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/model_72a_-_juvenile_leatherback_sea_turtle/scene.gltf')
  const [hovered, set] = useState(null)
  return (
    <group ref={group} {...props} dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group name="leatherbackjuv_armature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              geometry={nodes.leatherbackjuv_body_leatherbackjuv_body_0.geometry}
              material={nodes.leatherbackjuv_body_leatherbackjuv_body_0.material}
              skeleton={nodes.leatherbackjuv_body_leatherbackjuv_body_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.leatherbackjuv_eye_leatherbackjuv_eye_0.geometry}
              material={materials.leatherbackjuv_eye}
              skeleton={nodes.leatherbackjuv_eye_leatherbackjuv_eye_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.leatherbackjuv_eye_leatherbackjuv_body_0.geometry}
              material={nodes.leatherbackjuv_eye_leatherbackjuv_body_0.material}
              skeleton={nodes.leatherbackjuv_eye_leatherbackjuv_body_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.leatherbackjuv_membrane_leatherbackjuv_membrane_0.geometry}
              material={materials.leatherbackjuv_membrane}
              skeleton={nodes.leatherbackjuv_membrane_leatherbackjuv_membrane_0.skeleton}
            />
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
          <Image width="250" height="250" src="/Juvenile_leatherback Sea Turtle QR.png" alt="" />
        </div>
        <a href="https://go.echo3d.co/RPuu" target="_blank" rel="noreferrer">
          <button className="h-12 px-8 ml-8 text-base font-semibold tracking-wider text-white border rounded-full shadow-sm mt-16 bg-red-50 bg-gradient-to-r from-secondary to-tertiary hover:shadow-lg">View in AR</button>
        </a>
      </div>
    </div>
  )
}

export default function seaTurtle() {
  return (
    <div className="pt-8">

      <Link href="/" passHref><span className="ml-8 cursor-pointer">Go Back</span></Link>

      <div className="grid w-full py-10 place-items-center">
        <h1 className="pb-2 text-5xl font-semibold tracking-wide lg:text-6xl">
          Caribbean reef shark
        </h1>
        <div className="inline-flex mt-2 h-1 bg-secondary rounded-full w-96"></div>
        <p className="text-justify text-xl w-86 mt-2 mx-4 md:mx-44">Once hatchlings leave the nest, they are often not seen again until they return to coastal waters years later as juveniles. Loggerheads that are born on the east coast of the U.S. however, have been tracked out into the Atlantic, into an area known as the Sargasso Sea.</p>
      </div>

      <div className="md:grid md:grid-cols-3 md:pr-15 pr-1">

        <div className="w-full h-96 px-4 outline-none cursor-grab md:col-span-2 lg:block">
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <Suspense fallback={null}>
              <Model scale={0.65} />
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
