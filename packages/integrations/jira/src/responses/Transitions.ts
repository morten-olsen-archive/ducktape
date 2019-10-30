interface Transitions {
  expand: string;
  transitions: {
    id: string;
    name: string;
    to: {
      self: string;
      description: string;
      iconUrl: string;
      name: string;
      id: string;
      statusCategory: {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
      },
    },
    hasScreen: boolean;
    isGlobal: boolean;
    isInitial: boolean;
    isConditional: boolean;
  }[]
}

export default Transitions;