import React from 'react';
import Particles from '@tsparticles/react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim'; // 👈 Use slim or full if needed

loadSlim(tsParticles); // 👈 Load features into engine

const ParticlesBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true },
        background: {
          color: { value: '#0d0d0d' }
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: 'push' },
            onHover: { enable: true, mode: 'repulse' },
            resize: true
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 }
          }
        },
        particles: {
          color: { value: '#ffffff' },
          links: {
            enable: false
          },
          collisions: {
            enable: true
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce'
            },
            random: true,
            speed: 1,
            straight: false
          },
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800
            }
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'circle'
          },
          size: {
            value: { min: 1, max: 4 }
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default ParticlesBackground;
