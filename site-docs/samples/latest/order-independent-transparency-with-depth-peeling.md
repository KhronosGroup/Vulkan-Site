# Order-independent transparency with depth peeling

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/api/oit_depth_peeling/README.html

## Table of Contents

- [Overview](#_overview)
- [Algorithm](#_algorithm)
- [Options](#_options)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/api/oit_depth_peeling). |
| --- | --- |

![Sample](../../../_images/samples/api/oit_depth_peeling/images/sample.png)

This sample implements an order-independent transparency (OIT) algorithm using depth peeling.
It renders a single torus whose opacity can be controlled via the UI.
It produces pixel-perfect results.
It is based on the [original paper](https://developer.download.nvidia.com/assets/gamedev/docs/OrderIndependentTransparency.pdf) from Cass Everitt.

The OIT algorithm consists of several *gather* passes followed by one *combine* pass.

Each *gather* pass renders one layer of transparent geometry.
The first pass renders the first layer, the second pass the second layer, etc.
The Nth layer consists of all the Nth fragments of each pixel when the fragments are ordered from front to back.

The *combine* pass is a screen-space operation.
It merges the layer images from back to front to produce the final result.

The algorithm can produce pixel-perfect results, even with intersecting geometry.
When there are more geometry layers than gather passes, the backmost layers get skipped, but the visual results stay stable (i.e. no flickering pixels).

| Option | Description | Comments |
| --- | --- | --- |
| Camera auto-rotation | Enable the automatic rotation of the camera |  |
| Background grayscale | Specify the grayscale value by which the background color is multiplied (0.0 to 1.0) |  |
| Object alpha | Specify the opacity of the transparent object (0.0 to 1.0) |  |
| Front layer index | The first layer to be rendered (0 to 7). |  |
| Back layer index | The last layer to be rendered (0 to 7). | This cannot be less that the front layer index. |
