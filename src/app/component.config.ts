export interface Style {
  color: string;
  background: string;
}
export interface ComponentConfig {
  name: string;
  style: Style;
  children?: ComponentConfig[] | null;
}

export const config: ComponentConfig = {
  name: 'root dynamic tree',
  style: {
    color: 'black',
    background: 'white',
  },
  children: [
    {
      name: 'children-1',
      style: {
        color: 'blue',
        background: 'lightblue',
      },
      children: [
        {
          name: 'children-1-1',
          style: {
            color: 'red',
            background: 'pink',
          },
          children: [
            {
              name: 'children-1-1-1',
              style: {
                color: 'green',
                background: 'lightgreen',
              },
            },
            {
              name: 'children-1-1-2',
              style: {
                color: 'yellow',
                background: 'lightyellow',
              },
            },
          ],
        },
        {
          name: 'children-1-2',
          style: {
            color: 'orange',
            background: 'lightorange',
          },
          children: [
            {
              name: 'children-1-2-1',
              style: {
                color: 'purple',
                background: 'lightpurple',
              },
            },
            {
              name: 'children-1-2-2',
              style: {
                color: 'brown',
                background: 'lightbrown',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'children-2',
      style: {
        color: 'gray',
        background: 'lightgray',
      },
      children: [
        {
          name: 'children-2-1',
          style: {
            color: 'pink',
            background: 'lightpink',
          },
          children: [
            {
              name: 'children-2-1-1',
              style: {
                color: 'turquoise',
                background: 'lightturquoise',
              },
            },
            {
              name: 'children-2-1-2',
              style: {
                color: 'silver',
                background: 'lightsilver',
              },
            },
          ],
        },
        {
          name: 'children-2-2',
          style: {
            color: 'maroon',
            background: 'lightmaroon',
          },
          children: [
            {
              name: 'children-2-2-1',
              style: {
                color: 'teal',
                background: 'lightteal',
              },
            },
            {
              name: 'children-2-2-2',
              style: {
                color: 'navy',
                background: 'lightnavy',
              },
            },
          ],
        },
      ],
    },
  ],
};
