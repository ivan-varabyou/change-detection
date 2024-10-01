export interface Style {
  color: string;
  background: string;
}
export interface ComponentConfig {
  componentName: string;
  style: Style;
  children?: ComponentConfig[] | null;
}

/*
 * if isZoneless = true
 * remove polyfills zone.js in angular.json
 * "polyfills": [
 *              "zone.js"  <= remove
 *            ],
 */
export const isZoneless = false;

export const isCdVisualiser = true;

export const config: ComponentConfig = {
  componentName: 'root',
  style: {
    color: 'black',
    background: 'white',
  },
  children: [
    {
      componentName: 'children-1',
      style: {
        color: 'blue',
        background: 'lightblue',
      },
      children: [
        {
          componentName: 'children-1-1',
          style: {
            color: 'red',
            background: 'pink',
          },
          children: [
            {
              componentName: 'children-1-1-1',
              style: {
                color: 'green',
                background: 'lightgreen',
              },
            },
            {
              componentName: 'children-1-1-2',
              style: {
                color: 'yellow',
                background: 'lightyellow',
              },
            },
          ],
        },
        {
          componentName: 'children-1-2',
          style: {
            color: 'orange',
            background: 'lightorange',
          },
          children: [
            {
              componentName: 'children-1-2-1',
              style: {
                color: 'purple',
                background: 'lightpurple',
              },
            },
            {
              componentName: 'children-1-2-2',
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
      componentName: 'children-2',
      style: {
        color: 'gray',
        background: 'lightgray',
      },
      children: [
        {
          componentName: 'children-2-1',
          style: {
            color: 'pink',
            background: 'lightpink',
          },
          children: [
            {
              componentName: 'children-2-1-1',
              style: {
                color: 'turquoise',
                background: 'lightturquoise',
              },
            },
            {
              componentName: 'children-2-1-2',
              style: {
                color: 'silver',
                background: 'lightsilver',
              },
            },
          ],
        },
        {
          componentName: 'children-2-2',
          style: {
            color: 'maroon',
            background: 'lightmaroon',
          },
          children: [
            {
              componentName: 'children-2-2-1',
              style: {
                color: 'teal',
                background: 'lightteal',
              },
            },
            {
              componentName: 'children-2-2-2',
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
