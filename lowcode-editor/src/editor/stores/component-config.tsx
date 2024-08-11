import { create } from 'zustand';
import Container from '../materials/Container';
import Button from '../materials/Button';

export interface ComponentConfig {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: 'Container',
      defaultProps: {},
      component: Container,
    },
    Button: {
      name: 'Button',
      defaultProps: {
        type: 'primary',
        text: '按钮',
      },
      component: Button,
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
