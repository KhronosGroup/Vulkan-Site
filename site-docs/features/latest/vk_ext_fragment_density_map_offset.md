# VK_EXT_fragment_density_map_offset

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_fragment_density_map_offset.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Features](#_features)
- [3.2. Properties](#_properties)
- [3.3. Functionality](#_functionality)
- [3.3.1. Image Creation](#_image_creation)
- [3.3.1._Image_Creation](#_image_creation)
- [3.3.2. Dynamic Rendering with fragment density map offsets](#_dynamic_rendering_with_fragment_density_map_offsets)
- [3.3.2._Dynamic_Rendering_with_fragment_density_map_offsets](#_dynamic_rendering_with_fragment_density_map_offsets)
- [3.3.3. Specifying fragment density map offsets](#_specifying_fragment_density_map_offsets)
- [3.3.3._Specifying_fragment_density_map_offsets](#_specifying_fragment_density_map_offsets)
- [4. Issues](#_issues)
- [4.1. How should suspending and resuming render passes be handled?](#_how_should_suspending_and_resuming_render_passes_be_handled)
- [4.1._How_should_suspending_and_resuming_render_passes_be_handled?](#_how_should_suspending_and_resuming_render_passes_be_handled)
- [4.2. Should vkCmdEndRendering2EXT be provided by a separate extension?](#_should_vkcmdendrendering2ext_be_provided_by_a_separate_extension)
- [4.2._Should_vkCmdEndRendering2EXT_be_provided_by_a_separate_extension?](#_should_vkcmdendrendering2ext_be_provided_by_a_separate_extension)
- [4.3. Should VkRenderPassFragmentDensityMapOffsetEndInfoEXT be usable at render pass begin time?](#_should_vkrenderpassfragmentdensitymapoffsetendinfoext_be_usable_at_render_pass_begin_time)
- [4.3._Should_VkRenderPassFragmentDensityMapOffsetEndInfoEXT_be_usable_at_render_pass_begin_time?](#_should_vkrenderpassfragmentdensitymapoffsetendinfoext_be_usable_at_render_pass_begin_time)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Features](#_features)
[3.2. Properties](#_properties)
[3.3. Functionality](#_functionality)

[4. Issues](#_issues)

[4.1. How should suspending and resuming render passes be handled?](#_how_should_suspending_and_resuming_render_passes_be_handled)
[4.2. Should `vkCmdEndRendering2EXT` be provided by a separate extension?](#_should_vkcmdendrendering2ext_be_provided_by_a_separate_extension)
[4.3. Should `VkRenderPassFragmentDensityMapOffsetEndInfoEXT` be usable at render pass begin time?](#_should_vkrenderpassfragmentdensitymapoffsetendinfoext_be_usable_at_render_pass_begin_time)

This extension extends
[VK_EXT_fragment_density_map](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_fragment_density_map) to
allow for finer control over the location of the local framebuffer regions in a
render pass with a fragment density map attachment.

|  | This extension is a promotion of
| --- | --- |
[VK_QCOM_fragment_density_map_offset](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_QCOM_fragment_density_map_offset),
with the addition of support for
[dynamic rendering](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_dynamic_rendering). As that extension
already shipped before proposal documents existed, this document has been
written retroactively during promotion to EXT. |

Some use cases for
[VK_EXT_fragment_density_map](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_fragment_density_map), such
as eye-tracking foveation, require the fragment density map to be updated
often. This can cause a distracting flickering effect for the user as local
framebuffer regions pop in and out of high-density portion of the fragment
density map. A method is needed for finer-grained control over the location of
the high-density region without sudden jumps.

The location and sizes of the local framebuffer regions are purposefully made
opaque in the original extension, so there is no way to directly control them.
The typical use case involves translating a given fixed fragment density map,
with independent control needed for each layer of the framebuffer, so the
simplest solution is to give the implementation a per-layer offset for sampling
the fragment density map with the expectation that the implementation should
offset the location of the local framebuffer regions in the opposite direction
whenever possible in order to smoothly scroll the local framebuffer regions.

A new structure is added that can be chained to
[VkSubpassEndInfo](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#VkSubpassEndInfo) or
[VkRenderingEndInfoEXT](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#VkRenderingEndInfoEXT)
which adds per-layer offsets to the fragment density map.

There is a single new feature:

typedef struct VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentDensityMapOffset;
} VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT;

Implementations may require an alignment for the offset, so this extension
adds a property for the granularity that the offset must be aligned to:

typedef struct VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         fragmentDensityOffsetGranularity;
} VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT;

#define VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT  ((VkImageCreateFlagBits)0x00008000)

When fragment density offsets are used, the images for all attachments in the
render pass, including color attachments, resolve attachments, and the fragment
density map attachment, must be created with the new
`VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT` usage.

Dynamic rendering support has been added since the original
[VK_QCOM_fragment_density_map_offset](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_QCOM_fragment_density_map_offset)
extension was released. This requires the addition of a new command to terminate a dynamic
rendering pass:

VKAPI_ATTR void VKAPI_CALL vkCmdEndRendering2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingEndInfoEXT*                pRenderingEndInfo);

* 
`commandBuffer` is the command buffer into which the command is recorded.

* 
`pRenderingEndInfo` is an optional pointer to a `VkRenderingEndInfoEXT` struct which can utilize a `pNext` chain to provide additional rendering info.

typedef struct VkRenderingEndInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
} VkRenderingEndInfoEXT;

* 
`sType` is `VK_STRUCTURE_TYPE_RENDERING_END_INFO_EXT`.

* 
`pNext` can be used to chain a pointer to a `VkRenderPassFragmentDensityMapOffsetEndInfoEXT` struct.

Fragment density map offsets are set using the following struct chained to either a
`VkRenderingEndInfoEXT` or `VkSubpassEndInfo` struct:

typedef struct VkRenderPassFragmentDensityMapOffsetEndInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    uint32_t             fragmentDensityOffsetCount;
    const VkOffset2D*    pFragmentDensityOffsets;
} VkRenderPassFragmentDensityMapOffsetEndInfoEXT;

* 
`fragmentDensityOffsetCount` is the number of offsets being specified.

* 
`pFragmentDensityOffsets` is a pointer to an array of `VkOffset2D` structs, each of which describes the offset per layer.

Before sampling the fragment density map, the framebuffer region center coordinates are
offsetted using the values in `pFragmentDensityOffsets` and clamped to the
framebuffer dimensions.

Suspending and resuming render passes must have identical `VkRenderPassFragmentDensityMapOffsetEndInfoEXT
data passed in all cases.

No. There is no expectation that other extensions will require this functionality
in the very near future, and it should be trivial to promote this method to core
in an upcoming maintenance extension.

No. It is provided at the end of the render pass to reduce latency caused by the CPU time required
to record a render pass.
