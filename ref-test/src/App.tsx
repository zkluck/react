import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';

interface RefType {
  aaa: () => void;
}

const ForwardRefMyInput = forwardRef<RefType>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      aaa() {
        inputRef.current?.focus();
      },
    };
  });
  return <input {...props} ref={inputRef} type="text" />;
});

export default function App() {
  const apiRef = useRef<RefType>(null);

  useEffect(() => {
    apiRef.current?.aaa();
  }, []);

  return (
    <div className="App">
      <ForwardRefMyInput ref={apiRef} />
    </div>
  );
}
