import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { SpotLight, Text, ScrollControls, Scroll, Html } from '@react-three/drei'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { TextureLoader, Vector3 } from 'three'

const ART_PIECES = [
  {
    title: '08-22-2023 - A special day for you and you chose to see me  ',
    imgPath: '/birthday 2.jpeg',
  },
  {
    title: '08/26/2023 - The day of your brothers wedding. Fun night with you and everyone',
    imgPath: '/us.png',
  },
  {
    title: '09/01/2023 - Dropped off springrolls while you were working hard on your kaws set. Love helping you pick out your nails',
    imgPath: '/springroll.jpeg',
  },
  {
    title: '09/05/2023 - You had a family BBQ and I saw your whole family. Your aunt did the heart around us teasing us. Grandma drank 3 BEERS! Met jaileen for the first time and making you that smore',
    imgPath: '/familybbq.jpeg',
  },
  {
    title: '09/07/2023 - Took me out on my birthday and first time ordering drinks with you ',
    imgPath: '/birthday.jpeg',
  },
  {
    title: '09/09/2023 - Fun night at Sojuba with everyone.',
    imgPath: '/sojuba.jpeg',
  },
  {
    title: '09/11/2023 - The day where you told me ur weird cravings and how u can eat 5 different things at once. Toast with cheese and imitation crab, cake , mochi ,matcha milk tea and noodles.',
    imgPath: '/facetime.png',
  },
  {
    title: '12/25/2023 - First christmas with each other',
    imgPath: '/christmaspt2.jpeg',
  },
  {
    title: '1/2/2024 - 1/9/2024 - First trip together, so many memorable moments. This trip made our connection even stronger and I fell in love with you more',
    imgPath: '/cancunpt2.jpeg',
  },
  {
    title: 'Cancun - LOL! us looking at the beach when your parents took us out on that tour  ',
    imgPath: '/cancun.jpeg',
  },
  {
    title: 'Cancun - Our first night in cancun and it felt surreal that i was here with my favorite person',
    imgPath: '/Cancunpt3.jpeg',
  },
  {
    title: 'Cancun - I love this picture of us and the moment on that image of us just chilling on the bed and having conversations just about anything',
    imgPath: '/Cancunpt4.jpeg',
  },
]

const WallArt = (props) => {
  const { art, i } = props
  const { width: w, height: h } = useThree((state) => state.viewport);
  const gap = 4;
  const imageWidth = 3;
  const texture = useLoader(TextureLoader, art.imgPath)


  return (
    <>
      <group>
        <SpotLight
          position={[(i + 1) * (imageWidth + gap) + (i + 1) - w / 4, 2.5, 1]}
          penumbra={1}
          angle={0.6}
          attenuation={1}
          anglePower={5}
          intensity={10}
          distance={10}
          castShadow
          color={0xffffff}
        />
        <mesh castShadow position={[(i + 1) * (imageWidth + gap) + (i + 1), 0, 0]}>
          <boxBufferGeometry attach="geometry" args={[imageWidth, h / 2, 0.07]} />
          <meshStandardMaterial
            attach="material"
            map={texture}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <mesh position={[(i + 1) * (imageWidth + gap) + (i + 1), -2.5, 0]}>
          {/* <planeGeometry args={[1.25, 0.5]} />
          <meshStandardMaterial color={0xFAEBD7} /> */}
          <Text
            position-z={0}
            scale={[1, 1, 1]}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
            font="/Users/yoseple/Downloads/Oswald/Oswald-VariableFont_wght.ttf"
          >
            {art.title}
          </Text>
        </mesh>
      </group>
    </>
  )
}

const Scene = () => {
  const { width: screenWidth } = useThree((state) => state.viewport);
  console.log("screenWidth", screenWidth)
  const textScale = screenWidth < 5.5 ? 2 : 4



  return (
    <Suspense fallback={
      <Html style={{ fontSize: '6vw', whiteSpace: 'nowrap', color: 'white' }} center>
        Loading Our memories together
      </Html>
    }>
      <ScrollControls infinite={false} horizontal damping={4} pages={39*Math.exp(-0.11 * screenWidth) } distance={1}>
        <Scroll>
          <Text
            position-z={0}
            anchorX="center"
            anchorY="bottom"
            scale={[textScale, textScale, textScale]}
            color="#94A6FF"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
            castShadow
          >
            Read me when you need me
          </Text>
          <Text
            position-z={1}
            anchorX="center"
            anchorY="top"
            scale={[textScale, textScale, textScale]}
            color="#FBA90A"
            // font="https://fonts.gstatic.com/s/cookie/v8/syky-y18lb0tSbf9kgqU.woff"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
            castShadow
          >
            A documentation of Diem and Sep 
          </Text>
          <Text
            position={[0, -0.5, 1.5]}
            anchorX="center"
            anchorY="top"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
          // castShadow
          >
            ~ I love you
          </Text>
            
          {ART_PIECES.map((art, i) => {
            return <WallArt
              key={i}
              i={i}
              art={art}
            />
          })
          }
           <Html position={[100, 0.5, 1]} center>
            <a href="https://transcendent-kulfi-738200.netlify.app" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline', fontSize: '20px' }}>
              ONE LAST SURPRISE!!!
            </a>
          </Html>
          
        </Scroll>
      </ScrollControls>
    </Suspense >
  )
}

const Rig = () => {
  const { camera, mouse } = useThree()
  const vec = new Vector3()
  return useFrame(() => camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, camera.position.z), 0.2))
}


function App() {
  return (
    <Canvas shadows camera >
      <ambientLight intensity={0.6} color={0xffffff} />

      {/* This is the wall that supports shadows */}
      <mesh
        position={[0, 0, -0.1]}
        receiveShadow
      >
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color={0x000000} />
      </mesh>
      <Scene />

      <EffectComposer>
        {/* <Noise opacity={0.01} /> */}
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>

      <Rig />
    </Canvas>
  )
}

export default App;
