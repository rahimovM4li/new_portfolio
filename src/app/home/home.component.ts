import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';


@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroRoot', { static: true }) heroRoot!: ElementRef<HTMLElement>;

  yearsCount = 0;
  projectsCount = 0;
  deliveryCount = 0;

  private yearsTarget = 894;
  private projectsTarget = 8;
  private deliveryTarget = 98;

  private gsapContext?: gsap.Context;
  private liquidFrameId?: number;
  private liquidRenderer?: THREE.WebGLRenderer;
  private liquidResizeHandler?: () => void;

  ngOnInit(): void {
    this.animateCount('yearsCount', this.yearsTarget, 10);
    this.animateCount('projectsCount', this.projectsTarget, 1800);
    this.animateCount('deliveryCount', this.deliveryTarget, 1800);
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    this.initHeroAnimations();
    this.initLiquidBackground();
  }

  ngOnDestroy(): void {
    this.gsapContext?.revert();

    if (this.liquidFrameId) {
      cancelAnimationFrame(this.liquidFrameId);
    }

    if (this.liquidResizeHandler) {
      window.removeEventListener('resize', this.liquidResizeHandler);
    }

    this.liquidRenderer?.dispose();
  }

  private animateCount(property: 'yearsCount' | 'projectsCount' | 'deliveryCount', target: number, duration: number) {
    const stepTime = Math.max(Math.floor(duration / target), 10);
    let current = 0;
    const step = () => {
      if (current < target) {
        current++;
        this[property] = current;
        setTimeout(step, stepTime);
      } else {
        this[property] = target;
      }
    };
    step();
  }

  private initHeroAnimations(): void {
    if (!this.heroRoot?.nativeElement) {
      return;
    }

    this.gsapContext = gsap.context(() => {
      const items = this.heroRoot.nativeElement.querySelectorAll('[data-animate="stagger"]');
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12
      });
    }, this.heroRoot.nativeElement);
  }

  private initLiquidBackground(): void {
    const container = this.heroRoot?.nativeElement;
    const canvas = document.getElementById('hero-liquid-canvas') as HTMLCanvasElement | null;

    if (!container || !canvas) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = (navigator.hardwareConcurrency || 4) < 4;
    if (prefersReducedMotion || lowPower || window.innerWidth < 900) {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x071e17, 6, 14);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.set(0, 0.8, 6.5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x071e17, 0);
    this.liquidRenderer = renderer;

    const geometry = new THREE.PlaneGeometry(12, 6, 64, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x145c43,
      transparent: true,
      opacity: 0.35,
      shininess: 80,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.45;
    scene.add(mesh);

    const ambient = new THREE.AmbientLight(0x2affa3, 0.3);
    const directional = new THREE.DirectionalLight(0x2affa3, 0.6);
    directional.position.set(2, 2, 3);
    scene.add(ambient, directional);

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    updateSize();
    this.liquidResizeHandler = updateSize;
    window.addEventListener('resize', updateSize);

    const position = geometry.attributes['position'] as THREE.BufferAttribute;
    const basePositions = position.array.slice(0);

    const animate = (time: number) => {
      for (let i = 0; i < position.count; i++) {
        const x = basePositions[i * 3];
        const y = basePositions[i * 3 + 1];
        const wave = Math.sin(time * 0.0009 + x * 0.7 + y * 0.4) * 0.18;
        position.setZ(i, wave);
      }
      position.needsUpdate = true;
      renderer.render(scene, camera);
      this.liquidFrameId = requestAnimationFrame(animate);
    };

    this.liquidFrameId = requestAnimationFrame(animate);
  }
}
