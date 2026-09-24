# VK_EXT_texture_compression_astc_3d

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_texture_compression_astc_3d.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)
- [4. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)

[4. Issues](#_issues)

This document proposes adding support for ASTC 3D formats.

The Adaptive Scalable Texture Compression (ASTC) format supports compression modes of 3D blocks.
These formats have been exposed in other APIs, like OpenGL ES via the GL_OES_texture_compression_astc extension, but have not been exposed in Vulkan.

This proposal aims to provide this functionality.

The ASTC 3D formats need to be exposed as a new set of formats.

Similar to other extensions that only add new formats, there is a feature bit that indicates support for all the added formats.
Implementations can report support for a subset of the added formats through the format enumeration queries such as vkGetPhysicalDeviceImageFormatProperties2.

The following features are exposed by this extension:

typedef struct VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           textureCompressionASTC_3D;
} VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT;

`textureCompressionASTC_3D` is the core feature enabling this extension’s functionality.

New format enumerations are added:

typedef enum VkFormat {
    ...
    VK_FORMAT_ASTC_3x3x3_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_3x3x3_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_3x3x3_SFLOAT_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_4x3x3_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_4x3x3_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_4x3x3_SFLOAT_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_4x4x3_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_4x4x3_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_4x4x3_SFLOAT_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_4x4x4_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_4x4x4_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_4x4x4_SFLOAT_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_5x4x4_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_5x4x4_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_5x4x4_SFLOAT_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_5x5x4_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_5x5x4_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_5x5x4_SFLOAT_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_5x5x5_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_5x5x5_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_5x5x5_SFLOAT_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_6x5x5_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_6x5x5_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_6x5x5_SFLOAT_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_6x6x5_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_6x6x5_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_6x6x5_SFLOAT_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_6x6x6_UNORM_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_6x6x6_SRGB_BLOCK_EXT = ...,
    VK_FORMAT_ASTC_6x6x6_SFLOAT_BLOCK_EXT = ...,
    ...
} VkFormat;

No known issues.
