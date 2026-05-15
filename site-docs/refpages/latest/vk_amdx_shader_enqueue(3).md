# VK_AMDX_shader_enqueue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMDX_shader_enqueue.html

## Table of Contents

- [Name](#_name)
- [VK_AMDX_shader_enqueue](#VK_AMDX_shader_enqueue)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMDX_shader_enqueue - device extension

**Name String**

`VK_AMDX_shader_enqueue`

**Extension Type**

Device extension

**Registered Extension Number**

135

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

         [VK_KHR_synchronization2](VK_KHR_synchronization2.html)

         and

         [VK_KHR_spirv_1_4](VK_KHR_spirv_1_4.html)

         and

         [VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html)

     or

     [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

and

[VK_KHR_maintenance5](VK_KHR_maintenance5.html)

and

[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html)

* 
**This is a *provisional* extension and must** be used with caution.
See the [description](../../../../spec/latest/appendices/boilerplate.html#boilerplate-provisional-header) of provisional header files for enablement and stability details.

**API Interactions**

* 
Interacts with VK_VERSION_1_4

* 
Interacts with VK_EXT_mesh_shader

* 
Interacts with VK_KHR_maintenance5

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMDX_shader_enqueue] @tobski%0A*Here describe the issue or question you have about the VK_AMDX_shader_enqueue extension*)

**Extension Proposal**

[VK_AMDX_shader_enqueue](../../../../features/latest/features/proposals/VK_AMDX_shader_enqueue.html)

**Last Modified Date**

2024-07-17

**Provisional**

**This extension is *provisional* and should** not be used in production
applications.
The functionality **may** change in ways that break backwards compatibility
between revisions, and before final release.

**Contributors**

* 
Tobias Hector, AMD

* 
Matthaeus Chajdas, AMD

* 
Maciej Jesionowski, AMD

* 
Robert Martin, AMD

* 
Qun Lin, AMD

* 
Rex Xu, AMD

* 
Dominik Witczak, AMD

* 
Karthik Srinivasan, AMD

* 
Nicolai Haehnle, AMD

* 
Stuart Smith, AMD

This extension adds the ability for developers to enqueue mesh and compute
shader workgroups from other compute shaders.

* 
[vkCmdDispatchGraphAMDX](vkCmdDispatchGraphAMDX.html)

* 
[vkCmdDispatchGraphIndirectAMDX](vkCmdDispatchGraphIndirectAMDX.html)

* 
[vkCmdDispatchGraphIndirectCountAMDX](vkCmdDispatchGraphIndirectCountAMDX.html)

* 
[vkCmdInitializeGraphScratchMemoryAMDX](vkCmdInitializeGraphScratchMemoryAMDX.html)

* 
[vkCreateExecutionGraphPipelinesAMDX](vkCreateExecutionGraphPipelinesAMDX.html)

* 
[vkGetExecutionGraphPipelineNodeIndexAMDX](vkGetExecutionGraphPipelineNodeIndexAMDX.html)

* 
[vkGetExecutionGraphPipelineScratchSizeAMDX](vkGetExecutionGraphPipelineScratchSizeAMDX.html)

* 
[VkDispatchGraphCountInfoAMDX](VkDispatchGraphCountInfoAMDX.html)

* 
[VkDispatchGraphInfoAMDX](VkDispatchGraphInfoAMDX.html)

* 
[VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html)

* 
[VkExecutionGraphPipelineScratchSizeAMDX](VkExecutionGraphPipelineScratchSizeAMDX.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderEnqueueFeaturesAMDX](VkPhysicalDeviceShaderEnqueueFeaturesAMDX.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderEnqueuePropertiesAMDX](VkPhysicalDeviceShaderEnqueuePropertiesAMDX.html)

Extending [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html):

* 
[VkPipelineShaderStageNodeCreateInfoAMDX](VkPipelineShaderStageNodeCreateInfoAMDX.html)

* 
[VkDeviceOrHostAddressConstAMDX](VkDeviceOrHostAddressConstAMDX.html)

* 
`VK_AMDX_SHADER_ENQUEUE_EXTENSION_NAME`

* 
`VK_AMDX_SHADER_ENQUEUE_SPEC_VERSION`

* 
[VK_SHADER_INDEX_UNUSED_AMDX](VK_SHADER_INDEX_UNUSED_AMDX.html)

* 
Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

[VK_BUFFER_USAGE_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](VkBufferUsageFlagBits.html)

Extending [VkPipelineBindPoint](VkPipelineBindPoint.html):

* 
[VK_PIPELINE_BIND_POINT_EXECUTION_GRAPH_AMDX](VkPipelineBindPoint.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_EXECUTION_GRAPH_PIPELINE_CREATE_INFO_AMDX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXECUTION_GRAPH_PIPELINE_SCRATCH_SIZE_AMDX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ENQUEUE_FEATURES_AMDX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ENQUEUE_PROPERTIES_AMDX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_NODE_CREATE_INFO_AMDX](VkStructureType.html)

If [VK_KHR_maintenance5](VK_KHR_maintenance5.html) or [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](VkBufferUsageFlagBits2.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](VkPipelineCreateFlagBits2.html)

* 
Revision 2, 2024-07-17 (Tobias Hector)

Add mesh nodes

Revision 1, 2021-07-22 (Tobias Hector)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMDX_shader_enqueue).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
