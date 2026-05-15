# VK_EXT_shader_object(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_object.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_object](#VK_EXT_shader_object)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_object - device extension

**Name String**

`VK_EXT_shader_object`

**Extension Type**

Device extension

**Registered Extension Number**

483

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_VERSION_1_1

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_EXT_blend_operation_advanced

* 
Interacts with VK_EXT_conservative_rasterization

* 
Interacts with VK_EXT_depth_clamp_control

* 
Interacts with VK_EXT_depth_clip_control

* 
Interacts with VK_EXT_depth_clip_enable

* 
Interacts with VK_EXT_fragment_density_map

* 
Interacts with VK_EXT_line_rasterization

* 
Interacts with VK_EXT_mesh_shader

* 
Interacts with VK_EXT_provoking_vertex

* 
Interacts with VK_EXT_sample_locations

* 
Interacts with VK_EXT_subgroup_size_control

* 
Interacts with VK_EXT_transform_feedback

* 
Interacts with VK_KHR_device_group

* 
Interacts with VK_KHR_fragment_shading_rate

* 
Interacts with VK_NV_clip_space_w_scaling

* 
Interacts with VK_NV_coverage_reduction_mode

* 
Interacts with VK_NV_fragment_coverage_to_color

* 
Interacts with VK_NV_framebuffer_mixed_samples

* 
Interacts with VK_NV_mesh_shader

* 
Interacts with VK_NV_representative_fragment_test

* 
Interacts with VK_NV_shading_rate_image

* 
Interacts with VK_NV_viewport_swizzle

**Contact**

* 
Daniel Story [daniel-story](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_object] @daniel-story%0A*Here describe the issue or question you have about the VK_EXT_shader_object extension*)

**Extension Proposal**

[VK_EXT_shader_object](../../../../features/latest/features/proposals/VK_EXT_shader_object.html)

**Last Modified Date**

2023-03-30

**Interactions and External Dependencies**

* 
Interacts with `[VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html)`

* 
Interacts with `[VK_EXT_extended_dynamic_state2](VK_EXT_extended_dynamic_state2.html)`

* 
Interacts with `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)`

* 
Interacts with `[VK_EXT_vertex_input_dynamic_state](VK_EXT_vertex_input_dynamic_state.html)`

**IP Status**

No known IP claims.

**Contributors**

* 
Piers Daniell, NVIDIA

* 
Sandy Jamieson, Nintendo

* 
Žiga Markuš, LunarG

* 
Tobias Hector, AMD

* 
Alex Walters, Imagination

* 
Shahbaz Youssefi, Google

* 
Ralph Potter, Samsung

* 
Jan-Harald Fredriksen, ARM

* 
Connor Abott, Valve

* 
Arseny Kapoulkine, Roblox

* 
Patrick Doane, Activision

* 
Jeff Leger, Qualcomm

* 
Stu Smith, AMD

* 
Chris Glover, Google

* 
Ricardo Garcia, Igalia

* 
Faith Ekstrand, Collabora

* 
Timur Kristóf, Valve

* 
Caterina Shablia, Collabora

* 
Daniel Koch, NVIDIA

* 
Alyssa Rosenzweig, Collabora

* 
Mike Blumenkrantz, Valve

* 
Samuel Pitoiset, Valve

* 
Qun Lin, AMD

* 
Spencer Fricke, LunarG

* 
Soroush Faghihi Kashani, Imagination

This extension introduces a new [VkShaderEXT](VkShaderEXT.html) object type which
represents a single compiled shader stage.
Shader objects provide a more flexible alternative to [VkPipeline](VkPipeline.html)
objects, which may be helpful in certain use cases.

* 
[VkShaderEXT](VkShaderEXT.html)

* 
[vkCmdBindShadersEXT](vkCmdBindShadersEXT.html)

* 
[vkCmdBindVertexBuffers2EXT](vkCmdBindVertexBuffers2.html)

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
[vkCmdSetCullModeEXT](vkCmdSetCullMode.html)

* 
[vkCmdSetDepthBiasEnableEXT](vkCmdSetDepthBiasEnable.html)

* 
[vkCmdSetDepthBoundsTestEnableEXT](vkCmdSetDepthBoundsTestEnable.html)

* 
[vkCmdSetDepthClampEnableEXT](vkCmdSetDepthClampEnableEXT.html)

* 
[vkCmdSetDepthCompareOpEXT](vkCmdSetDepthCompareOp.html)

* 
[vkCmdSetDepthTestEnableEXT](vkCmdSetDepthTestEnable.html)

* 
[vkCmdSetDepthWriteEnableEXT](vkCmdSetDepthWriteEnable.html)

* 
[vkCmdSetFrontFaceEXT](vkCmdSetFrontFace.html)

* 
[vkCmdSetLogicOpEXT](vkCmdSetLogicOpEXT.html)

* 
[vkCmdSetLogicOpEnableEXT](vkCmdSetLogicOpEnableEXT.html)

* 
[vkCmdSetPatchControlPointsEXT](vkCmdSetPatchControlPointsEXT.html)

* 
[vkCmdSetPolygonModeEXT](vkCmdSetPolygonModeEXT.html)

* 
[vkCmdSetPrimitiveRestartEnableEXT](vkCmdSetPrimitiveRestartEnable.html)

* 
[vkCmdSetPrimitiveTopologyEXT](vkCmdSetPrimitiveTopology.html)

* 
[vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html)

* 
[vkCmdSetRasterizerDiscardEnableEXT](vkCmdSetRasterizerDiscardEnable.html)

* 
[vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html)

* 
[vkCmdSetScissorWithCountEXT](vkCmdSetScissorWithCount.html)

* 
[vkCmdSetStencilOpEXT](vkCmdSetStencilOp.html)

* 
[vkCmdSetStencilTestEnableEXT](vkCmdSetStencilTestEnable.html)

* 
[vkCmdSetTessellationDomainOriginEXT](vkCmdSetTessellationDomainOriginEXT.html)

* 
[vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html)

* 
[vkCmdSetViewportWithCountEXT](vkCmdSetViewportWithCount.html)

* 
[vkCreateShadersEXT](vkCreateShadersEXT.html)

* 
[vkDestroyShaderEXT](vkDestroyShaderEXT.html)

* 
[vkGetShaderBinaryDataEXT](vkGetShaderBinaryDataEXT.html)

If [VK_EXT_blend_operation_advanced](VK_EXT_blend_operation_advanced.html) is supported:

* 
[vkCmdSetColorBlendAdvancedEXT](vkCmdSetColorBlendAdvancedEXT.html)

If [VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html) is supported:

* 
[vkCmdSetConservativeRasterizationModeEXT](vkCmdSetConservativeRasterizationModeEXT.html)

* 
[vkCmdSetExtraPrimitiveOverestimationSizeEXT](vkCmdSetExtraPrimitiveOverestimationSizeEXT.html)

If [VK_EXT_depth_clamp_control](VK_EXT_depth_clamp_control.html) is supported:

* 
[vkCmdSetDepthClampRangeEXT](vkCmdSetDepthClampRangeEXT.html)

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
[VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html)

* 
[VkVertexInputAttributeDescription2EXT](VkVertexInputAttributeDescription2EXT.html)

* 
[VkVertexInputBindingDescription2EXT](VkVertexInputBindingDescription2EXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderObjectFeaturesEXT](VkPhysicalDeviceShaderObjectFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderObjectPropertiesEXT](VkPhysicalDeviceShaderObjectPropertiesEXT.html)

Extending [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html):

* 
[VkShaderRequiredSubgroupSizeCreateInfoEXT](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html)

* 
[VkShaderCodeTypeEXT](VkShaderCodeTypeEXT.html)

* 
[VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html)

* 
[VkShaderCreateFlagsEXT](VkShaderCreateFlagsEXT.html)

* 
`VK_EXT_SHADER_OBJECT_EXTENSION_NAME`

* 
`VK_EXT_SHADER_OBJECT_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_SHADER_EXT](VkObjectType.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_INCOMPATIBLE_SHADER_BINARY_EXT](VkResult.html)

* 
[VK_INCOMPATIBLE_SHADER_BINARY_EXT](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OBJECT_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OBJECT_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SHADER_REQUIRED_SUBGROUP_SIZE_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VERTEX_INPUT_ATTRIBUTE_DESCRIPTION_2_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VERTEX_INPUT_BINDING_DESCRIPTION_2_EXT](VkStructureType.html)

If [VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html) is supported:

* 
Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

[VK_SHADER_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

If [VK_EXT_mesh_shader](VK_EXT_mesh_shader.html) or [VK_NV_mesh_shader](VK_NV_mesh_shader.html) is supported:

* 
Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

[VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

If [VK_EXT_subgroup_size_control](VK_EXT_subgroup_size_control.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

* 
[VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

If [VK_KHR_device_group](VK_KHR_device_group.html) or [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1) is supported:

* 
Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

[VK_SHADER_CREATE_DISPATCH_BASE_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

If [VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html) is supported:

* 
Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

[VK_SHADER_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

**Example 1**

Create linked pair of vertex and fragment shaders.

// Logical device created with the shaderObject feature enabled
VkDevice device;

// SPIR-V shader code for a vertex shader, along with its size in bytes
void* pVertexSpirv;
size_t vertexSpirvSize;

// SPIR-V shader code for a fragment shader, along with its size in bytes
void* pFragmentSpirv;
size_t fragmentSpirvSize;

// Descriptor set layout compatible with the shaders
VkDescriptorSetLayout descriptorSetLayout;

VkShaderCreateInfoEXT shaderCreateInfos[2] =
{
    {
        .sType = VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT,
        .pNext = NULL,
        .flags = VK_SHADER_CREATE_LINK_STAGE_BIT_EXT,
        .stage = VK_SHADER_STAGE_VERTEX_BIT,
        .nextStage = VK_SHADER_STAGE_FRAGMENT_BIT,
        .codeType = VK_SHADER_CODE_TYPE_SPIRV_EXT,
        .codeSize = vertexSpirvSize,
        .pCode = pVertexSpirv,
        .pName = "main",
        .setLayoutCount = 1,
        .pSetLayouts = &descriptorSetLayout;
        .pushConstantRangeCount = 0,
        .pPushConstantRanges = NULL,
        .pSpecializationInfo = NULL
    },
    {
        .sType = VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT,
        .pNext = NULL,
        .flags = VK_SHADER_CREATE_LINK_STAGE_BIT_EXT,
        .stage = VK_SHADER_STAGE_FRAGMENT_BIT,
        .nextStage = 0,
        .codeType = VK_SHADER_CODE_TYPE_SPIRV_EXT,
        .codeSize = fragmentSpirvSize,
        .pCode = pFragmentSpirv,
        .pName = "main",
        .setLayoutCount = 1,
        .pSetLayouts = &descriptorSetLayout;
        .pushConstantRangeCount = 0,
        .pPushConstantRanges = NULL,
        .pSpecializationInfo = NULL
    }
};

VkResult result;
VkShaderEXT shaders[2];

result = vkCreateShadersEXT(device, 2, &shaderCreateInfos, NULL, shaders);
if (result != VK_SUCCESS)
{
    // Handle error
}

Later, during command buffer recording, bind the linked shaders and draw.

// Command buffer in the recording state
VkCommandBuffer commandBuffer;

// Vertex and fragment shader objects created above
VkShaderEXT shaders[2];

// Assume vertex buffers, descriptor sets, etc. have been bound, and existing
// state setting commands have been called to set all required state

const VkShaderStageFlagBits stages[2] =
{
    VK_SHADER_STAGE_VERTEX_BIT,
    VK_SHADER_STAGE_FRAGMENT_BIT
};

// Bind linked shaders
vkCmdBindShadersEXT(commandBuffer, 2, stages, shaders);

// Equivalent to the previous line. Linked shaders can be bound one at a time,
// in any order:
// vkCmdBindShadersEXT(commandBuffer, 1, &stages[1], &shaders[1]);
// vkCmdBindShadersEXT(commandBuffer, 1, &stages[0], &shaders[0]);

// The above is sufficient to draw if the device was created with the
// tessellationShader and geometryShader features disabled. Otherwise, since
// those stages should not execute, vkCmdBindShadersEXT() must be called at
// least once with each of their stages in pStages before drawing:

const VkShaderStageFlagBits unusedStages[3] =
{
    VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT,
    VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT,
    VK_SHADER_STAGE_GEOMETRY_BIT
};

// NULL pShaders is equivalent to an array of stageCount VK_NULL_HANDLE values,
// meaning no shaders are bound to those stages, and that any previously bound
// shaders are unbound
vkCmdBindShadersEXT(commandBuffer, 3, unusedStages, NULL);

// Graphics shader objects may only be used to draw inside dynamic render pass
// instances begun with vkCmdBeginRendering(), assume one has already been begun

// Draw a triangle
vkCmdDraw(commandBuffer, 3, 1, 0, 0);

**Example 2**

Create unlinked vertex, geometry, and fragment shaders.

// Logical device created with the shaderObject feature enabled
VkDevice device;

// SPIR-V shader code for vertex shaders, along with their sizes in bytes
void* pVertexSpirv[2];
size_t vertexSpirvSize[2];

// SPIR-V shader code for a geometry shader, along with its size in bytes
void pGeometrySpirv;
size_t geometrySpirvSize;

// SPIR-V shader code for fragment shaders, along with their sizes in bytes
void* pFragmentSpirv[2];
size_t fragmentSpirvSize[2];

// Descriptor set layout compatible with the shaders
VkDescriptorSetLayout descriptorSetLayout;

VkShaderCreateInfoEXT shaderCreateInfos[5] =
{
    // Stage order does not matter
    {
        .sType = VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT,
        .pNext = NULL,
        .flags = 0,
        .stage = VK_SHADER_STAGE_GEOMETRY_BIT,
        .nextStage = VK_SHADER_STAGE_FRAGMENT_BIT,
        .codeType = VK_SHADER_CODE_TYPE_SPIRV_EXT,
        .codeSize = pGeometrySpirv,
        .pCode = geometrySpirvSize,
        .pName = "main",
        .setLayoutCount = 1,
        .pSetLayouts = &descriptorSetLayout;
        .pushConstantRangeCount = 0,
        .pPushConstantRanges = NULL,
        .pSpecializationInfo = NULL
    },
    {
        .sType = VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT,
        .pNext = NULL,
        .flags = 0,
        .stage = VK_SHADER_STAGE_VERTEX_BIT,
        .nextStage = VK_SHADER_STAGE_GEOMETRY_BIT,
        .codeType = VK_SHADER_CODE_TYPE_SPIRV_EXT,
        .codeSize = vertexSpirvSize[0],
        .pCode = pVertexSpirv[0],
        .pName = "main",
        .setLayoutCount = 1,
        .pSetLayouts = &descriptorSetLayout;
        .pushConstantRangeCount = 0,
        .pPushConstantRanges = NULL,
        .pSpecializationInfo = NULL
    },
    {
        .sType = VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT,
        .pNext = NULL,
        .flags = 0,
        .stage = VK_SHADER_STAGE_FRAGMENT_BIT,
        .nextStage = 0,
        .codeType = VK_SHADER_CODE_TYPE_SPIRV_EXT,
        .codeSize = fragmentSpirvSize[0],
        .pCode = pFragmentSpirv[0],
        .pName = "main",
        .setLayoutCount = 1,
        .pSetLayouts = &descriptorSetLayout;
        .pushConstantRangeCount = 0,
        .pPushConstantRanges = NULL,
        .pSpecializationInfo = NULL
    },
    {
        .sType = VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT,
        .pNext = NULL,
        .flags = 0,
        .stage = VK_SHADER_STAGE_FRAGMENT_BIT,
        .nextStage = 0,
        .codeType = VK_SHADER_CODE_TYPE_SPIRV_EXT,
        .codeSize = fragmentSpirvSize[1],
        .pCode = pFragmentSpirv[1],
        .pName = "main",
        .setLayoutCount = 1,
        .pSetLayouts = &descriptorSetLayout;
        .pushConstantRangeCount = 0,
        .pPushConstantRanges = NULL,
        .pSpecializationInfo = NULL
    },
    {
        .sType = VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT,
        .pNext = NULL,
        .flags = 0,
        .stage = VK_SHADER_STAGE_VERTEX_BIT,
        // Suppose we want this vertex shader to be able to be followed by
        // either a geometry shader or fragment shader:
        .nextStage = VK_SHADER_STAGE_GEOMETRY_BIT | VK_SHADER_STAGE_FRAGMENT_BIT,
        .codeType = VK_SHADER_CODE_TYPE_SPIRV_EXT,
        .codeSize = vertexSpirvSize[1],
        .pCode = pVertexSpirv[1],
        .pName = "main",
        .setLayoutCount = 1,
        .pSetLayouts = &descriptorSetLayout;
        .pushConstantRangeCount = 0,
        .pPushConstantRanges = NULL,
        .pSpecializationInfo = NULL
    }
};

VkResult result;
VkShaderEXT shaders[5];

result = vkCreateShadersEXT(device, 5, &shaderCreateInfos, NULL, shaders);
if (result != VK_SUCCESS)
{
    // Handle error
}

Later, during command buffer recording, bind the linked shaders in different
combinations and draw.

// Command buffer in the recording state
VkCommandBuffer commandBuffer;

// Vertex, geometry, and fragment shader objects created above
VkShaderEXT shaders[5];

// Assume vertex buffers, descriptor sets, etc. have been bound, and existing
// state setting commands have been called to set all required state

const VkShaderStageFlagBits stages[3] =
{
    // Any order is allowed
    VK_SHADER_STAGE_FRAGMENT_BIT,
    VK_SHADER_STAGE_VERTEX_BIT,
    VK_SHADER_STAGE_GEOMETRY_BIT,
};

VkShaderEXT bindShaders[3] =
{
    shaders[2], // FS
    shaders[1], // VS
    shaders[0]  // GS
};

// Bind unlinked shaders
vkCmdBindShadersEXT(commandBuffer, 3, stages, bindShaders);

// Assume the tessellationShader feature is disabled, so vkCmdBindShadersEXT()
// need not have been called with either tessellation stage

// Graphics shader objects may only be used to draw inside dynamic render pass
// instances begun with vkCmdBeginRendering(), assume one has already been begun

// Draw a triangle
vkCmdDraw(commandBuffer, 3, 1, 0, 0);

// Bind a different unlinked fragment shader
const VkShaderStageFlagBits fragmentStage = VK_SHADER_STAGE_FRAGMENT_BIT;
vkCmdBindShadersEXT(commandBuffer, 1, &fragmentStage, &shaders[3]);

// Draw another triangle
vkCmdDraw(commandBuffer, 3, 1, 0, 0);

// Bind a different unlinked vertex shader
const VkShaderStageFlagBits vertexStage = VK_SHADER_STAGE_VERTEX_BIT;
vkCmdBindShadersEXT(commandBuffer, 1, &vertexStage, &shaders[4]);

// Draw another triangle
vkCmdDraw(commandBuffer, 3, 1, 0, 0);

* 
Revision 1, 2023-03-30 (Daniel Story)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_object).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
