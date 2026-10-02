# VK_EXT_image_2d_view_of_3d

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_image_2d_view_of_3d.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)
- [4. Examples](#_examples)
- [5. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)

[4. Examples](#_examples)
[5. Issues](#_issues)

This document proposes adding support for creating 2D views of 3D images.

Other graphics APIs, such as OpenGL, provide functionality for creating two dimensional views of three dimensional images for use in shaders.
When performing similar operations in Vulkan, this functionality may be emulated in shaders, but many implementations are capable of handling it at the execution level to avoid needing more shader variants or uniform or push constant data.

This proposal aims to provide this functionality.

This functionality could alternatively be emulated with:
 . Shader variants which each access the intended slice of the 3D image
 . The use of either uniform or push constant data to dynamically access the intended slice of the 3D image

Neither of these methods solves the more fundamental problem of having an API mismatch which complicates both transitioning from OpenGL to Vulkan and emulating OpenGL on Vulkan.

The following features are exposed by this extension:

typedef struct VkPhysicalDeviceImage2DViewOf3DFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           image2DViewOf3D;
    VkBool32           sampler2DViewOf3D;
} VkPhysicalDeviceImage2DViewOf3DFeaturesEXT;

`image2DViewOf3D` is the core feature enabling this extension’s functionality.
`sampler2DViewOf3D` indicates that the driver supports 2D views of 3D textures.

Using the `VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT` flag when creating a 3D image enables this functionality for that image.

As an example, if an application creates a `VkImage` of type `VK_IMAGE_TYPE_3D` with two layers and wants to only access the zero-th layer in a shader, `VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT` can be used to create the image. A `VkImageView` is then created with `VK_IMAGE_VIEW_TYPE_2D`, and the shader can then access the image data using two-dimensional image operations.

No known issues.
