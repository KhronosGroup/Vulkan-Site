# VK_EXT_conservative_rasterization(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_conservative_rasterization.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_conservative_rasterization](#VK_EXT_conservative_rasterization)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Built-In Variables](#_new_built_in_variables)
- [New_Built-In_Variables](#_new_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_conservative_rasterization - device extension

**Name String**

`VK_EXT_conservative_rasterization`

**Extension Type**

Device extension

**Registered Extension Number**

102

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_EXT_fragment_fully_covered](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_fragment_fully_covered.html)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_conservative_rasterization] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_conservative_rasterization extension*)

**Last Modified Date**

2020-06-09

**Interactions and External Dependencies**

* 
This extension requires
[`SPV_EXT_fragment_fully_covered`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_fragment_fully_covered.html)
if the
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`fullyCoveredFragmentShaderInputVariable`
feature is used.

* 
This extension requires
[`SPV_KHR_post_depth_coverage`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_post_depth_coverage.html)if
the
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`conservativeRasterizationPostDepthCoverage`
feature is used.

* 
This extension provides API support for
[`GL_NV_conservative_raster_underestimation`](https://registry.khronos.org/OpenGL/extensions/NV/NV_conservative_raster_underestimation.txt)
if the
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`fullyCoveredFragmentShaderInputVariable`
feature is used.

**Contributors**

* 
Daniel Koch, NVIDIA

* 
Daniel Rakos, AMD

* 
Jeff Bolz, NVIDIA

* 
Slawomir Grajewski, Intel

* 
Stu Smith, Imagination Technologies

This extension adds a new rasterization mode called conservative
rasterization.
There are two modes of conservative rasterization; overestimation and
underestimation.

When overestimation is enabled, if any part of the primitive, including its
edges, covers any part of the rectangular pixel area, including its sides,
then a fragment is generated with all coverage samples turned on.
This extension allows for some variation in implementations by accounting
for differences in overestimation, where the generating primitive size is
increased at each of its edges by some sub-pixel amount to further increase
conservative pixel coverage.
Implementations can allow the application to specify an extra overestimation
beyond the base overestimation the implementation already does.
It also allows implementations to either cull degenerate primitives or
rasterize them.

When underestimation is enabled, fragments are only generated if the
rectangular pixel area is fully covered by the generating primitive.
If supported by the implementation, when a pixel rectangle is fully covered
the fragment shader input variable builtin called FullyCoveredEXT is set to
true.
The shader variable works in either overestimation or underestimation mode.

Implementations can process degenerate triangles and lines by either
discarding them or generating conservative fragments for them.
Degenerate triangles are those that end up with zero area after the
rasterizer quantizes them to the fixed-point pixel grid.
Degenerate lines are those with zero length after quantization.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceConservativeRasterizationPropertiesEXT](VkPhysicalDeviceConservativeRasterizationPropertiesEXT.html)

Extending [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html):

* 
[VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html)

* 
[VkConservativeRasterizationModeEXT](VkConservativeRasterizationModeEXT.html)

* 
[VkPipelineRasterizationConservativeStateCreateFlagsEXT](VkPipelineRasterizationConservativeStateCreateFlagsEXT.html)

* 
`VK_EXT_CONSERVATIVE_RASTERIZATION_EXTENSION_NAME`

* 
`VK_EXT_CONSERVATIVE_RASTERIZATION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CONSERVATIVE_RASTERIZATION_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_CONSERVATIVE_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
[FullyCoveredEXT](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-fullycoveredext)

* 
[    FragmentFullyCoveredEXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-FragmentFullyCoveredEXT)

* 
Revision 1.1, 2020-09-06 (Piers Daniell)

Add missing SPIR-V and GLSL dependencies.

Revision 1, 2017-08-28 (Piers Daniell)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_conservative_rasterization).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
