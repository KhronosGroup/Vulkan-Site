# Mobile NeRF Ray Query

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/general/mobile_nerf_rayquery/README.html

## Table of Contents

- [Notes](#_notes)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/general/mobile_nerf_rayquery). |
| --- | --- |

NeRF is a new 3D representation method in Computer Vision that creates images of a 3D scene using several 2D pictures taken from different viewpoints.
This method constructs a representation of the 3D volume. Various adaptations of NeRF target different use cases, including MobileNeRF, which focuses on rendering NeRF efficiently on mobile phones by leveraging existing traditional graphic hardware.

This version enhances the [previous MobileNeRF implementation](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/general/mobile_nerf) by using the Vulkan Ray Query feature, which leverages the hardware ray tracing capabilities of mobile GPUs that support it.
This enhancement greatly boosts performance in most use cases. Additionally, the Vulkan API provides great flexibility for modifying and optimizing the rendering pipeline and shaders, enabling more functionalities while delivering optimal performance.

The original source code is also licensed under Apache-2.0, all shader files used by the sample have comments to indicate changes, when applicable.
