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
  const { nodes, materials } = useGLTF('/model_73a_-_great_hammerhead_shark/scene.gltf')
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
                  <group position={[0, 0.02, 0.06]}>
                      <primitive object={nodes.GLTF_created_0_rootJoint} />
                      <skinnedMesh
                          geometry={nodes.mesh_0.geometry}
                          material={nodes.mesh_0.material}
                          skeleton={nodes.mesh_0.skeleton}
                      />
                      <skinnedMesh
                          geometry={nodes.mesh_1.geometry}
                          material={materials['eye.003']}
                          skeleton={nodes.mesh_1.skeleton}
                      />
                      <skinnedMesh
                          geometry={nodes.mesh_2.geometry}
                          material={nodes.mesh_2.material}
                          skeleton={nodes.mesh_2.skeleton}
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
                    <Image width="250" height="250" src="/Great Hammerhead Shark QR.png" alt="" />
                </div>
                <a href="https://go.echo3d.co/o56v" target="_blank" rel="noreferrer">
                    <button className="h-12 px-8 ml-8 text-base font-semibold tracking-wider text-white border rounded-full shadow-sm mt-16 bg-red-50 bg-gradient-to-r from-secondary to-tertiary hover:shadow-lg">View in AR</button>
                </a>
            </div>
        </div>
    )
}

export default function greatHammerhead() {
    return (
        <div className="pt-8">

            <Link href="/" passHref><span className="ml-8 cursor-pointer">Go Back</span></Link>

            <div className="grid w-full py-10 place-items-center">
                <h1 className="pb-2 text-5xl font-semibold tracking-wide lg:text-6xl">
                Great hammerhead
                </h1>
                <div className="inline-flex mt-2 h-1 bg-secondary rounded-full w-96"></div>
                <p className="text-justify text-xl w-86 mt-2 mx-4 md:mx-44">The great hammerhead (Sphyrna mokarran) is the largest species of hammerhead shark, belonging to the family Sphyrnidae, attaining an average length of 4.6 m (15 ft) and reaching a maximum length of 6.1 m (20 ft). It is found in tropical and warm temperate waters worldwide, inhabiting coastal areas and the continental shelf. The great hammerhead can be distinguished from other hammerheads by the shape of its &quot;hammer&quot; (called the &quot;cephalofoil&quot;), which is wide with an almost straight front margin, and by its tall, sickle-shaped first dorsal fin. This work is based on &quot;Model 73A - Great Hammerhead Shark&quot; (https://sketchfab.com/3d-models/model-73a-great-hammerhead-shark-77d52f2b0e084fe7bcefbc86b920f080) by DigitalLife3D (https://sketchfab.com/DigitalLife3D) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</p>
            </div>

            <div className="md:grid md:grid-cols-3 md:pr-15 pr-1">

                <div className="w-full h-96 px-4 outline-none cursor-grab md:col-span-2 lg:block">
                    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
                        <ambientLight intensity={0.7} />
                        <Suspense fallback={null}>
                            <Model scale={2} />
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
