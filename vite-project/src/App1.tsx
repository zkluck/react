// import Portal from './portal';

// function App() {
//   const content = (
//     <div className="btn">
//       <button>按钮</button>
//     </div>
//   );

//   return <Portal>{content}</Portal>;
// }

// export default App;

// import { useEffect, useRef } from 'react';
// import Portal from './portal';

// function App() {
//   const containerRef = useRef<HTMLElement>(null);

//   const content = (
//     <div className="btn">
//       <button>按钮</button>
//     </div>
//   );

//   useEffect(() => {
//     console.log(containerRef);
//   }, []);

//   return (
//     <>
//       <div className="aaa">111</div>
//       <Portal attach={'.aaa'} ref={containerRef}>
//         {content}
//       </Portal>
//     </>
//   );
// }

// export default App;

import React, {
  useEffect,
  // useRef,
  useState,
  useLayoutEffect,
  cloneElement,
} from 'react';

export default function App() {
  const [className, setClassName] = useState('aaa');

  useEffect(() => {
    setTimeout(() => setClassName('bbb'), 2000);
  }, []);

  // const containerRef = useRef(null);

  // useEffect(() => {
  //   const targetNode = containerRef.current!;

  //   const callback = function (mutationsList: MutationRecord[]) {
  //     console.log(mutationsList);
  //   };

  //   const observer = new MutationObserver(callback);

  //   observer.observe(targetNode, {
  //     attributes: true,
  //     childList: true,
  //     subtree: true,
  //   });
  // }, []);

  const callback = function (mutationsList: MutationRecord[]) {
    alert(1);
    console.log(mutationsList);
  };

  return (
    <div>
      <MutateObserver onMutate={callback}>
        <div id="container">
          <div className={className}>
            {className === 'aaa' ? (
              <div>aaa</div>
            ) : (
              <div>
                <p>bbb</p>
              </div>
            )}
          </div>
        </div>
      </MutateObserver>
    </div>
  );
}

const MutateObserver = (props: {
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  children: React.ReactElement;
}) => {
  const { onMutate = () => {}, children } = props;

  const elementRef = React.useRef<HTMLElement>(null);

  const [target, setTarget] = React.useState<HTMLElement>();

  let instance: MutationObserver;

  useEffect(() => {
    if (!target) {
      return;
    }

    const nodeList = Array.isArray(target) ? target : [target];

    // const targetNode = target!;

    // const callback = function (mutationsList: MutationRecord[]) {
    //   console.log(mutationsList);
    // };

    // const observer = new MutationObserver(onMutate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    instance = new MutationObserver(onMutate);

    nodeList.forEach((element) => {
      instance.observe(element, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    });

    // observer.observe(targetNode, {
    //   attributes: true,
    //   childList: true,
    //   subtree: true,
    // });
  }, [target]);

  useLayoutEffect(() => {
    setTarget(elementRef.current!);
  }, []);

  if (!children) {
    return null;
  }

  return cloneElement(children, { ref: elementRef });
};
