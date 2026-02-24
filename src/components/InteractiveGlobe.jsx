import React, { useRef, useMemo, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TrendingUp, MousePointer2, Plane, Clock, Sparkles, Plus, Minus, Play, Pause, Compass } from 'lucide-react';
import gsap from 'gsap';

// Coordinate converter for precise 3D placement
const latLongToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

const Marker = ({ country, onSelect, isSelected, hideLabels }) => {
    const [hovered, setHovered] = useState(false);
    const pos = useMemo(() => latLongToVector3(country.lat, country.lon, 2.05), [country]);

    return (
        <group
            position={pos}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            onPointerDown={(e) => {
                e.stopPropagation();
                onSelect(country);
            }}
        >
            <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} visible={false} />
            </mesh>

            <mesh scale={hovered || isSelected ? 1.8 : 1.2}>
                <sphereGeometry args={[0.045, 32, 32]} />
                <meshStandardMaterial
                    color={isSelected || hovered ? "#FFD700" : "#d4af37"}
                    emissive={isSelected || hovered ? "#FFD700" : "#d4af37"}
                    emissiveIntensity={isSelected ? 18 : 10}
                />
            </mesh>

            <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.3, 8]} />
                <meshBasicMaterial color="#d4af37" opacity={0.6} transparent />
            </mesh>

            <Html
                distanceFactor={7}
                position={[0, 0.45, 0]}
                center
                style={{
                    pointerEvents: 'auto',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: hideLabels ? 0 : 1,
                    zIndex: hovered || isSelected ? 50 : 10
                }}
            >
                <div
                    className="relative group/label flex flex-col items-center cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(country);
                    }}
                >
                    <div
                        className={`absolute bottom-full mb-10 w-64 sm:w-72 md:w-80 overflow-hidden rounded-[2.5rem] border border-accent/40 shadow-[0_40px_120px_rgba(0,0,0,1)] backdrop-blur-3xl transition-all duration-500 origin-bottom
                            ${hovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10'}`}
                    >
                        <div className="absolute inset-0 z-0 h-[80px]">
                            <img src={country.image} alt={country.name} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1b36]/40 via-[#0b1b36]/90 to-[#0b1b36]"></div>
                        </div>

                        <div className="relative z-10 p-5 pt-12 flex flex-col items-center text-center">
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-[#0b1b36] overflow-hidden shadow-2xl bg-[#0b1b36]">
                                <img src={`https://flagcdn.com/w160/${country.id === 'uk' ? 'gb' : country.id}.png`} alt={country.name} className="w-full h-full object-cover scale-150" />
                            </div>
                            <div className="flex items-center gap-1.5 mb-2 bg-accent/20 px-2.5 py-1 rounded-full border border-accent/30">
                                <Sparkles size={11} className="text-accent" />
                                <span className="text-accent text-[8px] font-black uppercase tracking-widest">ACTIVE HUB</span>
                            </div>
                            <h4 className="text-lg sm:text-xl font-black text-white tracking-[0.1em] uppercase mb-3">{country.name}</h4>
                            <div className="grid grid-cols-2 gap-4 w-full pt-5 border-t border-white/10 mt-2">
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-accent font-black tracking-widest mb-1">SUCCESS</span>
                                    <span className="text-sm font-black text-white">{country.success}</span>
                                </div>
                                <div className="flex flex-col items-center border-l border-white/10">
                                    <span className="text-[10px] text-accent font-black tracking-widest mb-1">TIME</span>
                                    <span className="text-sm font-black text-white">{country.processingTime}</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-accent"></div>
                    </div>

                    <div
                        className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 shadow-2xl border whitespace-nowrap
                            ${isSelected ? 'bg-accent text-primary border-white ring-8 ring-accent/10' :
                                hovered ? 'bg-accent text-primary border-white scale-110' :
                                    'bg-[#0b1b36]/90 text-white/90 backdrop-blur-xl border-white/20'}`}
                    >
                        <img src={`https://flagcdn.com/w40/${country.id === 'uk' ? 'gb' : country.id}.png`} alt={country.name} className="w-5 h-3.5 object-cover rounded" />
                        <span>{country.name}</span>
                        {(isSelected || hovered) && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping ml-1"></div>}
                    </div>
                </div>
            </Html>
        </group>
    );
};

const GlobeMesh = ({ countries, selectedCountry, onSelect }) => {
    const meshRef = useRef();
    const cloudsRef = useRef();

    const textures = useLoader(THREE.TextureLoader, [
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_normal_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2400&auto=format&fit=crop',
        'https://threejs.org/examples/textures/planets/earth_lights_2048.png'
    ]);

    const [colorMap, normalMap, specularMap, cloudsMap, milkyWayMap, nightLightsMap] = textures;

    useFrame((state, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 0.05;
        if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.06;
    });

    const atmosphereMaterial = useMemo(() => new THREE.ShaderMaterial({
        transparent: true, side: THREE.BackSide,
        uniforms: { glowColor: { value: new THREE.Color('#00aaff') }, viewVector: { value: new THREE.Vector3(0, 0, 1) } },
        vertexShader: `varying float intensity; void main() { vec3 vNormal = normalize( normalMatrix * normal ); vec3 vNormel = normalize( normalMatrix * vec3(0.0, 0.0, 1.0) ); intensity = pow( 0.75 - dot(vNormal, vNormel), 4.2 ); gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`,
        fragmentShader: `uniform vec3 glowColor; varying float intensity; void main() { vec3 glow = glowColor * intensity; gl_FragColor = vec4( glow, intensity ); }`
    }), []);

    return (
        <group>
            <mesh scale={[-150, -150, -150]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial map={milkyWayMap} side={THREE.BackSide} opacity={0.4} transparent color="#222222" />
            </mesh>
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 128, 128]} />
                <meshStandardMaterial map={colorMap} normalMap={normalMap} normalScale={new THREE.Vector2(1.5, 1.5)} roughnessMap={specularMap} roughness={0.6} metalness={0.2} emissiveMap={nightLightsMap} emissive={new THREE.Color('#FFECB3')} emissiveIntensity={2.5} />
            </mesh>
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[2.04, 128, 128]} />
                <meshPhongMaterial map={cloudsMap} transparent={true} opacity={0.35} depthWrite={false} color="#ffffff" shininess={0} />
            </mesh>
            <mesh scale={[1.15, 1.15, 1.15]}>
                <sphereGeometry args={[2.1, 128, 128]} />
                <primitive object={atmosphereMaterial} attach="material" />
            </mesh>
            {countries.map(c => <Marker key={c.id} country={c} onSelect={onSelect} isSelected={selectedCountry?.id === c.id} hideLabels={!!selectedCountry} />)}
        </group>
    );
};

const InteractiveGlobe = ({ countries, selectedCountry, onSelect }) => {
    const [autoRotate, setAutoRotate] = useState(true);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const controlsRef = useRef();
    const cameraPosition = [0, 0.8, 8.5];

    useEffect(() => {
        const checkScreen = () => {
            setIsMobileOrTablet(window.innerWidth < 1024);
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const handleZoom = (type) => {
        if (!controlsRef.current) return;
        const camera = controlsRef.current.object;
        const currentDist = controlsRef.current.getDistance();
        const targetDistance = type === 'in' ? Math.max(2.2, currentDist - 2) : Math.min(12, currentDist + 2);
        gsap.to(camera.position, { z: targetDistance, duration: 1, ease: "power3.out" });
    };

    const resetView = () => {
        if (!controlsRef.current) return;
        setAutoRotate(true);
        gsap.to(controlsRef.current.object.position, { x: cameraPosition[0], y: cameraPosition[1], z: cameraPosition[2], duration: 1.5, ease: "expo.inOut" });
    };

    return (
        <div className="w-full h-full relative rounded-[3rem] sm:rounded-[4rem] group/globe touch-pan-y overflow-hidden">
            <Canvas
                gl={{ antialias: true, alpha: true, logarithmicDepthBuffer: true }}
                camera={{ position: cameraPosition, fov: 38 }}
                style={{ overflow: 'visible', touchAction: 'pan-y' }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 8, 5]} intensity={5} />
                <pointLight position={[-15, -10, -5]} intensity={3} color="#00aaff" />
                <Stars radius={250} depth={100} count={12000} factor={10} fade />
                <Suspense fallback={null}>
                    <GlobeMesh countries={countries} selectedCountry={selectedCountry} onSelect={onSelect} />
                </Suspense>
                <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    // STRICTLY DISABLE ZOOM ON MOBILE AND TABLET TO STOP SCROLL INTERFERENCE
                    enableZoom={!isMobileOrTablet}
                    minDistance={2.2}
                    maxDistance={12}
                    rotateSpeed={0.5}
                    autoRotate={autoRotate}
                    autoRotateSpeed={0.4}
                    enableDamping={true}
                    dampingFactor={0.05}
                />
            </Canvas>

            {/* Tactical Switch Panel - Desktop Only */}
            {!isMobileOrTablet && (
                <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 opacity-0 group-hover/globe:opacity-100 transition-opacity duration-500">
                    <div className="flex flex-col bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-1 shadow-2xl">
                        <button onClick={() => handleZoom('in')} className="p-4 text-white/50 hover:text-accent transition-all active:scale-90" title="Focus In"><Plus size={22} /></button>
                        <div className="h-[1px] w-8 bg-white/10 mx-auto"></div>
                        <button onClick={() => handleZoom('out')} className="p-4 text-white/50 hover:text-accent transition-all active:scale-90" title="Zoom Out"><Minus size={22} /></button>
                        <div className="h-[1px] w-8 bg-white/10 mx-auto"></div>
                        <button onClick={() => setAutoRotate(!autoRotate)} className={`p-4 transition-all active:scale-90 ${autoRotate ? 'text-accent' : 'text-white/50 hover:text-accent'}`} title="Rotate Hub">{autoRotate ? <Pause size={22} /> : <Play size={22} />}</button>
                        <div className="h-[1px] w-8 bg-white/10 mx-auto"></div>
                        <button onClick={resetView} className="p-4 text-white/50 hover:text-accent transition-all active:scale-90" title="Reset Sensor"><Compass size={22} /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveGlobe;
