"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export interface ThreeLaptopApi {
  setProgress: (p: number) => void;
}

const ThreeLaptop = forwardRef<ThreeLaptopApi>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<{ targetP: number; isClosed: boolean; clickFlash: number }>({ 
    targetP: 0, 
    isClosed: false,
    clickFlash: 0 
  });

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      apiRef.current.targetP = Math.max(0, Math.min(1, p));
    },
  }));

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const w = canvas.clientWidth || 600;
    const h = canvas.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 1.4, 8.5);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);

    // ─── Lights ──────────────────────────
    const ambient = new THREE.AmbientLight(0x1a1a22, 1.2);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(4, 6, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xff2ab8, 1.4);
    rim.position.set(-4, 3, -3);
    scene.add(rim);

    const fill = new THREE.PointLight(0xff2ab8, 1.8, 22, 2);
    fill.position.set(0, -2.5, 2);
    scene.add(fill);

    const cyanGlow = new THREE.PointLight(0x9a86c2, 0.8, 14, 2);
    cyanGlow.position.set(0, 1.5, 2.5);
    scene.add(cyanGlow);

    // ─── Materials ───────────────────────
    const caseMat = new THREE.MeshStandardMaterial({ color: 0x15161a, metalness: 0.85, roughness: 0.38 });
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x2a2b32, metalness: 0.9, roughness: 0.25 });
    const screenMat = new THREE.MeshStandardMaterial({ 
      color: 0x07060e, 
      metalness: 0.1, 
      roughness: 0.2,
      emissive: 0xff2ab8, 
      emissiveIntensity: 1.0
    });
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x1a1b20, metalness: 0.4, roughness: 0.7 });

    const laptop = new THREE.Group();
    laptop.scale.set(0.7, 0.7, 0.7);
    scene.add(laptop);

    // Base
    const base = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.18, 2.7), caseMat);
    base.position.y = -0.09;
    laptop.add(base);

    // Keys
    const keycap = new THREE.BoxGeometry(0.22, 0.04, 0.22);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 12; c++) {
        const k = new THREE.Mesh(keycap, keyMat);
        k.position.set((c - 5.5) * 0.27, 0.05, -0.35 + (r - 1.5) * 0.27);
        laptop.add(k);
      }
    }

    // Screen group
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0, -1.32);
    laptop.add(screenGroup);

    const screenBack = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.4, 0.1), caseMat);
    screenBack.position.y = 1.2;
    screenGroup.add(screenBack);

    const screenFace = new THREE.Mesh(new THREE.BoxGeometry(3.7, 2.15, 0.04), screenMat);
    screenFace.position.set(0, 1.2, 0.07);
    screenGroup.add(screenFace);

    // Interactive state
    const OPEN_ROT = -0.22;
    const CLOSED_ROT = -Math.PI / 2 - 0.1;

    // Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(laptop.children, true);

      if (intersects.length > 0) {
        apiRef.current.isClosed = !apiRef.current.isClosed;
        apiRef.current.clickFlash = 1.0;
        
        // Visual feedback: small bounce
        gsap.to(laptop.position, { y: 0.5, duration: 0.1, yoyo: true, repeat: 1 });
      }
    };
    canvas.addEventListener("click", onClick);

    let mouseX = 0, mouseY = 0;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5);
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (!W || !H) return;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    const clock = new THREE.Clock();
    let lidProgress = 1.0;
    let internalP = 0;

    function loop() {
      if (!running) return;
      const dt = clock.getDelta();
      internalP += (apiRef.current.targetP - internalP) * 0.1;
      
      const targetLid = apiRef.current.isClosed ? 0 : 1;
      lidProgress += (targetLid - lidProgress) * 0.15;

      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const isLight = currentTheme === "light";

      // Theme colors
      const targetCaseColor = isLight ? 0x0D0D0D : 0x15161a;
      const targetEmissiveColor = isLight ? 0xE60000 : 0xff2ab8;
      
      caseMat.color.lerp(new THREE.Color(targetCaseColor), 0.1);
      screenMat.emissive.lerp(new THREE.Color(targetEmissiveColor), 0.1);
      rim.color.lerp(new THREE.Color(targetEmissiveColor), 0.1);
      fill.color.lerp(new THREE.Color(targetEmissiveColor), 0.1);
      
      screenGroup.rotation.x = THREE.MathUtils.lerp(CLOSED_ROT, OPEN_ROT, lidProgress);
      screenMat.emissiveIntensity = THREE.MathUtils.lerp(0, 1.2, lidProgress) + (apiRef.current.clickFlash * 2);
      
      if (apiRef.current.clickFlash > 0) {
        apiRef.current.clickFlash -= dt * 3;
      }

      const yawOffset = Date.now() * 0.0005;
      const float = Math.sin(yawOffset) * 0.12;
      const scrollYaw = THREE.MathUtils.lerp(-0.5, 0.7, internalP);
      const slideX = THREE.MathUtils.lerp(-0.6, 0.6, internalP);

      laptop.rotation.y = scrollYaw + mouseX * 0.2;
      laptop.rotation.x = -0.06 + mouseY * 0.1;
      laptop.position.x = slideX + mouseX * 0.15;
      laptop.position.y = 0.15 + float;

      const camZ = 8.5 + internalP * 0.5;
      camera.position.set(mouseX * 0.3, 1.4 + mouseY * -0.15, camZ);
      camera.lookAt(laptop.position.x * 0.4, 0.5, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }

    let running = true;
    loop();

    return () => {
      running = false;
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      renderer.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
          else o.material.dispose();
        }
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full min-h-[300px] block cursor-pointer" />;
});

ThreeLaptop.displayName = "ThreeLaptop";

export default ThreeLaptop;
