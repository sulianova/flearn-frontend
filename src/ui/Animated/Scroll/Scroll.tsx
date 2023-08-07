import { useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGetId } from 'hooks';

import classes from './Scroll.module.scss';

interface IProps {
  children: (id: string, className: string) => JSX.Element;
}

export default function Scroll(props: IProps) {
  const id = useGetId()('id');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    createScroll(id);
  },        [id]);

  useEffect(() => {
    const scrollListener = () => {
      const element = document.querySelector(`#${id}`) as HTMLElement;
      if (!element) {
        return;
      }

      const { top } = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (top > viewportHeight && element.style.cssText) {
        element.style.cssText = '';
      }
    };

    document.addEventListener('scroll', scrollListener);

    return () => document.removeEventListener('scroll', scrollListener);
  },        [id]);

  return props.children(id, classes.revealUp);
}

function createScroll(id: string) {
  ScrollTrigger.create({
    trigger: `#${id}`,
    start: 'top 100%',
    end: 'bottom 80%',
    markers: false,
    onEnter () {
      gsap.fromTo(
        `#${id}`,
        { y: 100, autoAlpha: 0.8 },
        {
          duration: 1.25,
          delay: 0.5,
          immediateRender: false,
          y: 0,
          autoAlpha: 1,
          ease: 'power4',
          overwrite: 'auto',
        }
      );
    },
  });
}
