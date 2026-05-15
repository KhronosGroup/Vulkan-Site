# VK_ARM_tensors(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_tensors.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_tensors](#VK_ARM_tensors)
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
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_tensors - device extension

**Name String**

`VK_ARM_tensors`

**Extension Type**

Device extension

**Registered Extension Number**

461

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_EXT_descriptor_buffer

* 
Interacts with VK_EXT_frame_boundary

* 
Interacts with VK_EXT_shader_float8

* 
Interacts with VK_KHR_shader_bfloat16

**SPIR-V Dependencies**

* 
[SPV_ARM_tensors](https://github.khronos.org/SPIRV-Registry/extensions/ARM/SPV_ARM_tensors.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_tensors] @kpet%0A*Here describe the issue or question you have about the VK_ARM_tensors extension*)

**Extension Proposal**

[VK_ARM_tensors](../../../../features/latest/features/proposals/VK_ARM_tensors.html)

**Last Modified Date**

2026-01-07

**Interactions and External Dependencies**

* 
This extension requires
[`SPV_ARM_tensors`](https://github.khronos.org/SPIRV-Registry/extensions/ARM/SPV_ARM_tensors.html)

* 
This extension provides API support for
[`GL_ARM_tensors`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/arm/GL_ARM_tensors.txt)

* 
This extension interacts with `[VK_EXT_mutable_descriptor_type](VK_EXT_mutable_descriptor_type.html)`

* 
This extension interacts with `[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html)`

* 
This extension interacts with `[VK_EXT_frame_boundary](VK_EXT_frame_boundary.html)`

* 
This extension interacts with `[VK_EXT_robustness2](VK_EXT_robustness2.html)`

* 
This extension interacts with `[VK_KHR_unified_image_layouts](VK_KHR_unified_image_layouts.html)`

* 
This extension interacts with `[VK_KHR_shader_bfloat16](VK_KHR_shader_bfloat16.html)`

* 
This extension interacts with `[VK_EXT_shader_float8](VK_EXT_shader_float8.html)`

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Einar Hov, Arm Ltd.

* 
Dominic Symes, Arm Ltd.

* 
Jan-Harald Fredriksen, Arm Ltd.

* 
Marco Cattani, Arm Ltd.

* 
Lisa Wu, Arm Ltd.

* 
Robert Hughes, Arm Ltd.

* 
David Garbett, Arm Ltd.

* 
Oualid Khelifi, Arm Ltd.

This extension adds support for tensors.

* 
[VkTensorARM](VkTensorARM.html)

* 
[VkTensorViewARM](VkTensorViewARM.html)

* 
[vkBindTensorMemoryARM](vkBindTensorMemoryARM.html)

* 
[vkCmdCopyTensorARM](vkCmdCopyTensorARM.html)

* 
[vkCreateTensorARM](vkCreateTensorARM.html)

* 
[vkCreateTensorViewARM](vkCreateTensorViewARM.html)

* 
[vkDestroyTensorARM](vkDestroyTensorARM.html)

* 
[vkDestroyTensorViewARM](vkDestroyTensorViewARM.html)

* 
[vkGetDeviceTensorMemoryRequirementsARM](vkGetDeviceTensorMemoryRequirementsARM.html)

* 
[vkGetPhysicalDeviceExternalTensorPropertiesARM](vkGetPhysicalDeviceExternalTensorPropertiesARM.html)

* 
[vkGetTensorMemoryRequirementsARM](vkGetTensorMemoryRequirementsARM.html)

If [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html) is supported:

* 
[vkGetTensorOpaqueCaptureDescriptorDataARM](vkGetTensorOpaqueCaptureDescriptorDataARM.html)

* 
[vkGetTensorViewOpaqueCaptureDescriptorDataARM](vkGetTensorViewOpaqueCaptureDescriptorDataARM.html)

* 
[VkBindTensorMemoryInfoARM](VkBindTensorMemoryInfoARM.html)

* 
[VkCopyTensorInfoARM](VkCopyTensorInfoARM.html)

* 
[VkDeviceTensorMemoryRequirementsARM](VkDeviceTensorMemoryRequirementsARM.html)

* 
[VkExternalTensorPropertiesARM](VkExternalTensorPropertiesARM.html)

* 
[VkPhysicalDeviceExternalTensorInfoARM](VkPhysicalDeviceExternalTensorInfoARM.html)

* 
[VkTensorCopyARM](VkTensorCopyARM.html)

* 
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)

* 
[VkTensorMemoryRequirementsInfoARM](VkTensorMemoryRequirementsInfoARM.html)

* 
[VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html)

* 
Extending [VkDataGraphPipelineResourceInfoARM](VkDataGraphPipelineResourceInfoARM.html), [VkDataGraphPipelineConstantARM](VkDataGraphPipelineConstantARM.html):

[VkTensorDescriptionARM](VkTensorDescriptionARM.html)

Extending [VkDependencyInfo](VkDependencyInfo.html):

* 
[VkTensorDependencyInfoARM](VkTensorDependencyInfoARM.html)

* 
[VkTensorMemoryBarrierARM](VkTensorMemoryBarrierARM.html)

Extending [VkFormatProperties2](VkFormatProperties2.html):

* 
[VkTensorFormatPropertiesARM](VkTensorFormatPropertiesARM.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkMemoryDedicatedAllocateInfoTensorARM](VkMemoryDedicatedAllocateInfoTensorARM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceTensorFeaturesARM](VkPhysicalDeviceTensorFeaturesARM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceTensorPropertiesARM](VkPhysicalDeviceTensorPropertiesARM.html)

Extending [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html):

* 
[VkExternalMemoryTensorCreateInfoARM](VkExternalMemoryTensorCreateInfoARM.html)

Extending [VkWriteDescriptorSet](VkWriteDescriptorSet.html):

* 
[VkWriteDescriptorSetTensorARM](VkWriteDescriptorSetTensorARM.html)

If [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html) is supported:

* 
[VkTensorCaptureDescriptorDataInfoARM](VkTensorCaptureDescriptorDataInfoARM.html)

* 
[VkTensorViewCaptureDescriptorDataInfoARM](VkTensorViewCaptureDescriptorDataInfoARM.html)

* 
Extending [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html):

[VkDescriptorGetTensorInfoARM](VkDescriptorGetTensorInfoARM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDescriptorBufferTensorFeaturesARM](VkPhysicalDeviceDescriptorBufferTensorFeaturesARM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceDescriptorBufferTensorPropertiesARM](VkPhysicalDeviceDescriptorBufferTensorPropertiesARM.html)

If [VK_EXT_frame_boundary](VK_EXT_frame_boundary.html) is supported:

* 
Extending [VkSubmitInfo](VkSubmitInfo.html), [VkSubmitInfo2](VkSubmitInfo2.html), [VkPresentInfoKHR](VkPresentInfoKHR.html), [VkBindSparseInfo](VkBindSparseInfo.html):

[VkFrameBoundaryTensorsARM](VkFrameBoundaryTensorsARM.html)

* 
[VkTensorCreateFlagBitsARM](VkTensorCreateFlagBitsARM.html)

* 
[VkTensorTilingARM](VkTensorTilingARM.html)

* 
[VkTensorUsageFlagBitsARM](VkTensorUsageFlagBitsARM.html)

* 
[VkTensorViewCreateFlagBitsARM](VkTensorViewCreateFlagBitsARM.html)

* 
[VkTensorCreateFlagsARM](VkTensorCreateFlagsARM.html)

* 
[VkTensorUsageFlagsARM](VkTensorUsageFlagsARM.html)

* 
[VkTensorViewCreateFlagsARM](VkTensorViewCreateFlagsARM.html)

* 
`VK_ARM_TENSORS_EXTENSION_NAME`

* 
`VK_ARM_TENSORS_SPEC_VERSION`

* 
Extending [VkDescriptorType](VkDescriptorType.html):

[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html)

Extending [VkFormat](VkFormat.html):

* 
[VK_FORMAT_R8_BOOL_ARM](VkFormat.html)

Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

* 
[VK_FORMAT_FEATURE_2_TENSOR_IMAGE_ALIASING_BIT_ARM](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_TENSOR_SHADER_BIT_ARM](VkFormatFeatureFlagBits2.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](VkImageLayout.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_TENSOR_ALIASING_BIT_ARM](VkImageUsageFlagBits.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_TENSOR_ARM](VkObjectType.html)

* 
[VK_OBJECT_TYPE_TENSOR_VIEW_ARM](VkObjectType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_TENSOR_MEMORY_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_TENSOR_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_TENSOR_MEMORY_REQUIREMENTS_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_TENSOR_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_TENSOR_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO_TENSOR_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_TENSOR_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TENSOR_FEATURES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TENSOR_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_COPY_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_DEPENDENCY_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_DESCRIPTION_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_FORMAT_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_MEMORY_BARRIER_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_MEMORY_REQUIREMENTS_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_VIEW_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_TENSOR_ARM](VkStructureType.html)

If [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DESCRIPTOR_GET_TENSOR_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_TENSOR_FEATURES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_TENSOR_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_CAPTURE_DESCRIPTOR_DATA_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_ARM](VkStructureType.html)

Extending [VkTensorCreateFlagBitsARM](VkTensorCreateFlagBitsARM.html):

* 
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html)

Extending [VkTensorViewCreateFlagBitsARM](VkTensorViewCreateFlagBitsARM.html):

* 
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorViewCreateFlagBitsARM.html)

If [VK_EXT_frame_boundary](VK_EXT_frame_boundary.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_FRAME_BOUNDARY_TENSORS_ARM](VkStructureType.html)

If [VK_EXT_shader_float8](VK_EXT_shader_float8.html) is supported:

* 
Extending [VkFormat](VkFormat.html):

[VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E4M3_ARM](VkFormat.html)

* 
[VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E5M2_ARM](VkFormat.html)

If [VK_KHR_shader_bfloat16](VK_KHR_shader_bfloat16.html) is supported:

* 
Extending [VkFormat](VkFormat.html):

[VK_FORMAT_R16_SFLOAT_FPENCODING_BFLOAT16_ARM](VkFormat.html)

* 
[`TensorsARM`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-TensorsARM)

* 
[    `StorageTensorArrayDynamicIndexingARM`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-StorageTensorArrayDynamicIndexingARM)

* 
[    `StorageTensorArrayNonUniformIndexingARM`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-StorageTensorArrayNonUniformIndexingARM)

1) Should tensor strides be passed in elements or in bytes?

**RESOLVED**: Strides are passed in bytes but are required to be a multiple of
the tensor element size.
Passing strides in bytes makes it possible to relax this requirement in the
future without an interface change.
It also makes it easier to describe memory alignment requirements.

2) Should there be commands to copy data between tensors and buffers/images?

**RESOLVED**: Adding these commands would result in a rather large API surface
and not insignificant implementation and validation cost.
The same outcome can be achieved with memory aliasing and tensor to tensor
copy operations.

3) Should this extension define transpose and/or other data reorganization
operations?

**RESOLVED**: These operations are useful to expose but this extension is only
meant to add base support for tensors.
Additional operations should be layered on top and defined in other
extensions.

4) Why are tensor strides described using signed integers?

**RESOLVED**: Negative strides make it possible to describe different linear
data layouts.
While this extension does not allow negative strides, it uses signed
integers for strides to make it possible to relax this limitation in future
extensions.

* 
Revision 2, 2026-01-07 (Kévin Petit)

Add interactions with VK_KHR_unified_image_layouts,
VK_KHR_shader_bfloat16, and VK_EXT_shader_float8

Revision 1, 2025-06-03 (Kévin Petit)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_tensors).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
