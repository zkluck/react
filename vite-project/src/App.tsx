import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  SetStateAction,
} from 'react';

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const { value: propsValue, defaultValue, onChange } = props;

  // const [value, setValue] = useState(() => {
  //   if (propsValue !== undefined) {
  //     return propsValue;
  //   } else {
  //     return defaultValue;
  //   }
  // });

  const [mergedValue, setValue] = useMerageState(new Date(), {
    value: propsValue,
    defaultValue,
    onChange,
  });

  // const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (propsValue === undefined && !isFirstRender.current) {
  //     setValue(propsValue);
  //   }
  //   isFirstRender.current = false;
  // }, [propsValue]);

  // const mergedValue = propsValue === undefined ? value : propsValue;

  // function changeValue(date: Date) {
  //   if (propsValue === undefined) {
  //     setValue(date);
  //   }
  //   onChange?.(date);
  // }

  return (
    <div>
      {mergedValue?.toLocaleDateString()}
      <div
        onClick={() => {
          setValue(() => {
            return new Date('2024-5-4');
          });
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
          setValue(new Date('2024-5-2'));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
          setValue(new Date('2024-5-3'));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
}

function useMerageState<T>(
  defaultStateValue: T,
  props?: { defaultValue?: T; value?: T; onChange?: (value: T) => void }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { defaultValue, value: propsValue, onChange } = props || {};

  const isFirstRender = useRef(true);

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue!;
    } else if (defaultValue !== undefined) {
      return defaultValue!;
    } else {
      return defaultStateValue;
    }
  });

  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }

    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  // eslint-disable-next-line @typescript-eslint/ban-types
  function isFunction(value: unknown): value is Function {
    return typeof value === 'function';
  }

  const setState = useCallback(
    (value: SetStateAction<T>) => {
      const res = isFunction(value) ? value(stateValue) : value;

      if (propsValue === undefined) {
        setStateValue(res);
      }
      onChange?.(res);
    },
    [stateValue]
  );

  return [mergedValue, setState];
}

function App() {
  // const [value, setValue] = useState(new Date('2024-5-1'));

  // return (
  //   <Calendar
  //     value={value}
  //     onChange={(date) => {
  //       console.log(date.toLocaleDateString());
  //       setValue(date);
  //     }}
  //   />
  // );
  return (
    <Calendar
      defaultValue={new Date('2024-5-1')}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
}

export default App;
