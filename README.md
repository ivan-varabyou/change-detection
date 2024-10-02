# Angular Change Detection Cisualization

![2024-10-01_15-31-30](https://github.com/user-attachments/assets/2392e586-7311-4777-9c90-624bc035d25d)

## Overview

The Angular Change Detection Visualiser is a tool designed to help developers understand and visualize the change detection mechanism in Angular applications. This project provides a graphical representation of how Angular detects changes in components, making it easier to optimize performance and identify potential issues.

## Features

- Visual representation of the component tree.
- Interactive buttons to trigger change detection manually.
- Detailed lifecycle hooks display for each component.
- Real-time updates to the visualisation as changes occur.

## Installation

To get started with the Angular Change Detection Visualiser, follow these steps:

1. Clone the repository:

   git clone https://github.com/ivan-varabyou/change-detection-visualization.git

2. Navigate to the project directory:

   cd angular-change-detection-visualiser

3. Install the dependencies:

   npm install

4. Run the application:

   ng serve

5. Open your browser and navigate to http://localhost:4200.

## Usage

Once the application is running, you can interact with the visualiser by:

- Adding components to the tree.
- Triggering change detection manually using the provided buttons.
- Observing how changes propagate through the component tree in real-time.

## Remove Zone.js

```
// remove polyfills zone.js in angular.json
"polyfills": ["zone.js"  <= remove],

// scr/zone.config.json
// if isZoneless = true
export const isZoneless = true;
```

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

▎Acknowledgments

- Thanks to the Angular team for creating such an amazing framework.
- Special thanks to all contributors who helped improve this project.
