"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";

/* ── Keyboard hook ── */
function useKeyboard() {
  const keys = useRef<Set<string>>(new Set());

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => keys.current.add(e.code);
    const onUp = (e: KeyboardEvent) => keys.current.delete(e.code);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return keys;
}

/* ── Vehicle (cube) ── */
function Vehicle() {
  const rigidRef = useRef<import("@react-three/rapier").RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const keys = useKeyboard();
  const speed = 8;

  useFrame(() => {
    if (!rigidRef.current) return;

    const pressed = keys.current;
    const impulse = { x: 0, y: 0, z: 0 };

    if (pressed.has("ArrowUp") || pressed.has("KeyW")) impulse.z = -speed;
    if (pressed.has("ArrowDown") || pressed.has("KeyS")) impulse.z = speed;
    if (pressed.has("ArrowLeft") || pressed.has("KeyA")) impulse.x = -speed;
    if (pressed.has("ArrowRight") || pressed.has("KeyD")) impulse.x = speed;

    rigidRef.current.setLinvel(
      { x: impulse.x, y: rigidRef.current.linvel().y, z: impulse.z },
      true
    );
  });

  return (
    <RigidBody
      ref={rigidRef}
      type="dynamic"
      position={[0, 1, 0]}
      colliders="cuboid"
      lockRotations
    >
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[1, 0.5, 1.8]} />
        <meshStandardMaterial color="#8B5CF6" />
      </mesh>
    </RigidBody>
  );
}

/* ── Follow camera ── */
function FollowCamera() {
  const { scene } = useThree();
  const offset = new THREE.Vector3(0, 6, 10);

  useFrame(({ camera }) => {
    // Find the vehicle mesh by traversing the scene
    const vehicle = scene.getObjectByProperty("type", "Mesh");
    if (!vehicle) return;

    const worldPos = new THREE.Vector3();
    vehicle.getWorldPosition(worldPos);

    const target = worldPos.clone().add(offset);
    camera.position.lerp(target, 0.05);
    camera.lookAt(worldPos);
  });

  return null;
}

/* ── Floor ── */
function Floor() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#150F24" />
      </mesh>
    </RigidBody>
  );
}

/* ── Scene wrapper ── */
export default function CircuitScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 6, 10], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 10]} intensity={1} />

      <Physics gravity={[0, -9.81, 0]}>
        <Floor />
        <Vehicle />
      </Physics>

      <FollowCamera />
    </Canvas>
  );
}
