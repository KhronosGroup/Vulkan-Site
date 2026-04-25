# VK_EXT_extended_dynamic_state3(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_extended_dynamic_state3.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_extended_dynamic_state3](#VK_EXT_extended_dynamic_state3)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_extended_dynamic_state3 - device extension

**Name String**

`VK_EXT_extended_dynamic_state3`

**Extension Type**

Device extension

**Registered Extension Number**

456

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_1

* 
Interacts with VK_EXT_blend_operation_advanced

* 
Interacts with VK_EXT_conservative_rasterization

* 
Interacts with VK_EXT_depth_clip_control

* 
Interacts with VK_EXT_depth_clip_enable

* 
Interacts with VK_EXT_line_rasterization

* 
Interacts with VK_EXT_provoking_vertex

* 
Interacts with VK_EXT_sample_locations

* 
Interacts with VK_EXT_transform_feedback

* 
Interacts with VK_KHR_maintenance2

* 
Interacts with VK_NV_clip_space_w_scaling

* 
Interacts with VK_NV_coverage_reduction_mode

* 
Interacts with VK_NV_fragment_coverage_to_color

* 
Interacts with VK_NV_framebuffer_mixed_samples

* 
Interacts with VK_NV_representative_fragment_test

* 
Interacts with VK_NV_shading_rate_image

* 
Interacts with VK_NV_viewport_swizzle

* 
Interacts with VkPhysicalDeviceExtendedDynamicState3FeaturesEXT::extendedDynamicState3AlphaToOneEnable

* 
Interacts with VkPhysicalDeviceExtendedDynamicState3FeaturesEXT::extendedDynamicState3DepthClampEnable

* 
Interacts with VkPhysicalDeviceExtendedDynamicState3FeaturesEXT::extendedDynamicState3LogicOpEnable

* 
Interacts with VkPhysicalDeviceExtendedDynamicState3FeaturesEXT::extendedDynamicState3PolygonMode

* 
Interacts with VkPhysicalDeviceExtendedDynamicState3FeaturesEXT::extendedDynamicState3RasterizationStream

* 
Interacts with VkPhysicalDeviceExtendedDynamicState3FeaturesEXT::extendedDynamicState3TessellationDomainOrigin

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_extended_dynamic_state3] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_extended_dynamic_state3 extension*)

**Extension Proposal**

[VK_EXT_extended_dynamic_state3](../../../../features/latest/features/proposals/VK_EXT_extended_dynamic_state3.html)

**Last Modified Date**

2022-09-02

**IP Status**

No known IP claims.

**Contributors**

* 
Daniel Story, Nintendo

* 
Jamie Madill, Google

* 
Jan-Harald Fredriksen, Arm

* 
Faith Ekstrand, Collabora

* 
Mike Blumenkrantz, Valve

* 
Ricardo Garcia, Igalia

* 
Samuel Pitoiset, Valve

* 
Shahbaz Youssefi, Google

* 
Stu Smith, AMD

* 
Tapani Pälli, Intel

This extension adds almost all of the remaining pipeline state as dynamic
state to help applications further reduce the number of monolithic pipelines
they need to create and bind.

* 
[vkCmdSetAlphaToCoverageEnableEXT](vkCmdSetAlphaToCoverageEnableEXT.html)

* 
[vkCmdSetAlphaToOneEnableEXT](vkCmdSetAlphaToOneEnableEXT.html)

* 
[vkCmdSetColorBlendEnableEXT](vkCmdSetColorBlendEnableEXT.html)

* 
[vkCmdSetColorBlendEquationEXT](vkCmdSetColorBlendEquationEXT.html)

* 
[vkCmdSetColorWriteMaskEXT](vkCmdSetColorWriteMaskEXT.html)

* 
[vkCmdSetDepthClampEnableEXT](vkCmdSetDepthClampEnableEXT.html)

* 
[vkCmdSetLogicOpEnableEXT](vkCmdSetLogicOpEnableEXT.html)

* 
[vkCmdSetPolygonModeEXT](vkCmdSetPolygonModeEXT.html)

* 
[vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html)

* 
[vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html)

If [VK_EXT_blend_operation_advanced](VK_EXT_blend_operation_advanced.html) is supported:

* 
[vkCmdSetColorBlendAdvancedEXT](vkCmdSetColorBlendAdvancedEXT.html)

If [VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html) is supported:

* 
[vkCmdSetConservativeRasterizationModeEXT](vkCmdSetConservativeRasterizationModeEXT.html)

* 
[vkCmdSetExtraPrimitiveOverestimationSizeEXT](vkCmdSetExtraPrimitiveOverestimationSizeEXT.html)

If [VK_EXT_depth_clip_control](VK_EXT_depth_clip_control.html) is supported:

* 
[vkCmdSetDepthClipNegativeOneToOneEXT](vkCmdSetDepthClipNegativeOneToOneEXT.html)

If [VK_EXT_depth_clip_enable](VK_EXT_depth_clip_enable.html) is supported:

* 
[vkCmdSetDepthClipEnableEXT](vkCmdSetDepthClipEnableEXT.html)

If [VK_EXT_line_rasterization](VK_EXT_line_rasterization.html) is supported:

* 
[vkCmdSetLineRasterizationModeEXT](vkCmdSetLineRasterizationModeEXT.html)

* 
[vkCmdSetLineStippleEnableEXT](vkCmdSetLineStippleEnableEXT.html)

If [VK_EXT_provoking_vertex](VK_EXT_provoking_vertex.html) is supported:

* 
[vkCmdSetProvokingVertexModeEXT](vkCmdSetProvokingVertexModeEXT.html)

If [VK_EXT_sample_locations](VK_EXT_sample_locations.html) is supported:

* 
[vkCmdSetSampleLocationsEnableEXT](vkCmdSetSampleLocationsEnableEXT.html)

If [VK_EXT_transform_feedback](VK_EXT_transform_feedback.html) is supported:

* 
[vkCmdSetRasterizationStreamEXT](vkCmdSetRasterizationStreamEXT.html)

If [VK_KHR_maintenance2](VK_KHR_maintenance2.html) or [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1) is supported:

* 
[vkCmdSetTessellationDomainOriginEXT](vkCmdSetTessellationDomainOriginEXT.html)

If [VK_NV_clip_space_w_scaling](VK_NV_clip_space_w_scaling.html) is supported:

* 
[vkCmdSetViewportWScalingEnableNV](vkCmdSetViewportWScalingEnableNV.html)

If [VK_NV_coverage_reduction_mode](VK_NV_coverage_reduction_mode.html) is supported:

* 
[vkCmdSetCoverageReductionModeNV](vkCmdSetCoverageReductionModeNV.html)

If [VK_NV_fragment_coverage_to_color](VK_NV_fragment_coverage_to_color.html) is supported:

* 
[vkCmdSetCoverageToColorEnableNV](vkCmdSetCoverageToColorEnableNV.html)

* 
[vkCmdSetCoverageToColorLocationNV](vkCmdSetCoverageToColorLocationNV.html)

If [VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html) is supported:

* 
[vkCmdSetCoverageModulationModeNV](vkCmdSetCoverageModulationModeNV.html)

* 
[vkCmdSetCoverageModulationTableEnableNV](vkCmdSetCoverageModulationTableEnableNV.html)

* 
[vkCmdSetCoverageModulationTableNV](vkCmdSetCoverageModulationTableNV.html)

If [VK_NV_representative_fragment_test](VK_NV_representative_fragment_test.html) is supported:

* 
[vkCmdSetRepresentativeFragmentTestEnableNV](vkCmdSetRepresentativeFragmentTestEnableNV.html)

If [VK_NV_shading_rate_image](VK_NV_shading_rate_image.html) is supported:

* 
[vkCmdSetShadingRateImageEnableNV](vkCmdSetShadingRateImageEnableNV.html)

If [VK_NV_viewport_swizzle](VK_NV_viewport_swizzle.html) is supported:

* 
[vkCmdSetViewportSwizzleNV](vkCmdSetViewportSwizzleNV.html)

* 
[VkColorBlendAdvancedEXT](VkColorBlendAdvancedEXT.html)

* 
[VkColorBlendEquationEXT](VkColorBlendEquationEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceExtendedDynamicState3FeaturesEXT](VkPhysicalDeviceExtendedDynamicState3FeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceExtendedDynamicState3PropertiesEXT](VkPhysicalDeviceExtendedDynamicState3PropertiesEXT.html)

* 
`VK_EXT_EXTENDED_DYNAMIC_STATE_3_EXTENSION_NAME`

* 
`VK_EXT_EXTENDED_DYNAMIC_STATE_3_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_3_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_3_PROPERTIES_EXT](VkStructureType.html)

If [VK_EXT_blend_operation_advanced](VK_EXT_blend_operation_advanced.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html)

If [VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](VkDynamicState.html)

If [VK_EXT_depth_clip_control](VK_EXT_depth_clip_control.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](VkDynamicState.html)

If [VK_EXT_depth_clip_enable](VK_EXT_depth_clip_enable.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](VkDynamicState.html)

If [VK_EXT_line_rasterization](VK_EXT_line_rasterization.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](VkDynamicState.html)

If [VK_EXT_provoking_vertex](VK_EXT_provoking_vertex.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](VkDynamicState.html)

If [VK_EXT_sample_locations](VK_EXT_sample_locations.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](VkDynamicState.html)

If [VK_EXT_transform_feedback](VK_EXT_transform_feedback.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](VkDynamicState.html)

If [VK_KHR_maintenance2](VK_KHR_maintenance2.html) or [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT](VkDynamicState.html)

If [VK_NV_clip_space_w_scaling](VK_NV_clip_space_w_scaling.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](VkDynamicState.html)

If [VK_NV_coverage_reduction_mode](VK_NV_coverage_reduction_mode.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](VkDynamicState.html)

If [VK_NV_fragment_coverage_to_color](VK_NV_fragment_coverage_to_color.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV](VkDynamicState.html)

If [VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](VkDynamicState.html)

If [VK_NV_representative_fragment_test](VK_NV_representative_fragment_test.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](VkDynamicState.html)

If [VK_NV_shading_rate_image](VK_NV_shading_rate_image.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](VkDynamicState.html)

If [VK_NV_viewport_swizzle](VK_NV_viewport_swizzle.html) is supported:

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](VkDynamicState.html)

1) What about the VkPipelineMultisampleStateCreateInfo state
`sampleShadingEnable` and `minSampleShading`?

`sampleShadingEnable` and `minSampleShading` are required when compiling the
fragment shader, and it is not meaningful to set them dynamically since they
always need to match the fragment shader state, so this hardware state may
as well just come from the pipeline with the fragment shader.

* 
Revision 2, 2022-07-18 (Piers Daniell)

Added rasterizationSamples

Revision 1, 2022-05-18 (Piers Daniell)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_extended_dynamic_state3).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
