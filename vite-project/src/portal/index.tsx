import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { createPortal } from 'react-dom';

export interface PortalPrps {
  attach?: HTMLElement | string;
  children: React.ReactNode;
}

const Portal = forwardRef((props: PortalPrps, ref) => {
  const { attach = document.body, children } = props;

  const container = useMemo(() => {
    const el = document.createElement('div');
    el.className = 'portal-container';
    return el;
  }, []);

  useEffect(() => {
    const parentElement = getAttach(attach);
    parentElement?.appendChild(container);

    return () => {
      parentElement?.removeChild(container);
    };
  }, [attach, container]);

  useImperativeHandle(ref, () => container);

  return createPortal(children, container);
});

export default Portal;

export function getAttach(attach: PortalPrps['attach']) {
  if (typeof attach === 'string') {
    return document.querySelector(attach);
  }
  if (typeof attach === 'object' && attach instanceof HTMLElement) {
    return attach;
  }
  return document.body;
}
