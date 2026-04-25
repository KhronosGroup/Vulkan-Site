# Mobile NeRF

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/general/mobile_nerf/README.html

## Table of Contents

- [Description: [Mobile Nerf]](#_description_mobile_nerf)
- [Description:_[Mobile_Nerf]](#_description_mobile_nerf)
- [Notes](#_notes)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/general/mobile_nerf). |
| --- | --- |

This sample is a modified version of the [Mobile Nerf](https://mobile-nerf.github.io/) developed by Google.
It’s based on its original [source code](https://github.com/google-research/jax3d/tree/main/jax3d/projects/mobilenerf) but optimized for Vulkan.
This is a different version from traditional NeRF rendering, which normally requires tracing rays (usually done via ray-marching) and querying a MLP multiple times for each ray. These many queries result in non-interactive frame rates on most of the GPUs.
The mobile version uses the rasterization pipeline to render the final image; this is done via a triangle mesh and a feature texture, where each of its visible pixels are run through a small MLP (executed in the fragment shader) that converts the feature data and view direction to the corresponding output pixel color. This technique enables interactive FPS even on mobile GPUs (thus the name).

Neural Radiance Fields (NeRFs) have demonstrated amazing ability to synthesize images of 3D scenes from novel views.
However, they rely upon specialized volumetric rendering algorithms based on ray marching that are mismatched to the capabilities of widely deployed graphics hardware.
This paper introduces a new NeRF representation based on textured polygons that can synthesize novel images efficiently with standard rendering pipelines.
The NeRF is represented as a set of polygons with textures representing binary opacities and feature vectors.
Traditional rendering of the polygons with a z-buffer yields an image with features at every pixel, which are interpreted by a small, view-dependent MLP running in a fragment shader to produce a final pixel color.
This approach enables NeRFs to be rendered with the traditional polygon rasterization pipeline, which provides massive pixel-level parallelism, achieving interactive frame rates on a wide range of compute platforms, including mobile phones.

The original source code is also licensed under Apache-2.0, all shader files used by the sample have comments to indicate changes, when applicable.
