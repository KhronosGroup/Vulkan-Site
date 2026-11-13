# VK_EXT_non_seamless_cube_map

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_non_seamless_cube_map.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Emulation With 2D Array Textures](#_emulation_with_2d_array_textures)
- [2.1._Emulation_With_2D_Array_Textures](#_emulation_with_2d_array_textures)
- [2.2. A Per Sampler Seamless Setting](#_a_per_sampler_seamless_setting)
- [2.2._A_Per_Sampler_Seamless_Setting](#_a_per_sampler_seamless_setting)
- [3. Proposal](#_proposal)
- [4. Example](#_example)
- [5. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)

[2.1. Emulation With 2D Array Textures](#_emulation_with_2d_array_textures)
[2.2. A Per Sampler Seamless Setting](#_a_per_sampler_seamless_setting)

[3. Proposal](#_proposal)
[4. Example](#_example)
[5. Issues](#_issues)

Other graphics APIs, such as OpenGL and D3D9, have cube maps without seamless edge handling.
When sampling near an edge, instead of interpolating between two texels on the neighboring cube map faces the usual sampler address modes are applied within a single face.
Vulkan only has cube maps with seamless edge handling.

This proposal aims to provide functionality to support non seamless cube maps.

The idea behind this solution is to represent cube map textures as 2D array textures with 6 layers, one for each cube map face.
Cube map coordinates can then be transformed to a face index and a 2D coordinate within this face, so that then the fixed function sampling takes care of applying the sampler address modes.
A problem is correct LOD selection while preserving anisotropic filtering. Emulation of implicit derivatives with LOD offset cannot be easily emulated with explicit derivatives.
Additionally, having pipeline variants depending on if seamless cube sampling is used prevents precompiling pipelines if any cubes are used as this information is only known at draw time.
With advanced OpenGL features it is also not possible to know if a sampling operation is seamless even at draw time, so emulation needs extra descriptors, uniforms and branches.

A new per sampler setting to allow to select if cube map edge sampling is seamless can be introduced.
This can commonly be handled by fixed function hardware, which allows identical behavior to the other graphics APIs.

This solution is adopted for this problem.

typedef struct VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           nonSeamlessCubeMap;
} VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT;

`nonSeamlessCubeMap` is the feature enabling this extension’s functionality.

Using `VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT` disables seamless cube map edge handling.

As an example, if an application creates a cube map and wants to always clamp to the edge within the selected cube face, `VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT` together with `VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE` can be used.

No known issues.
