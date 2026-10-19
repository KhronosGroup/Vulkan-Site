# VK_EXT_descriptor_buffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_descriptor_buffer.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_descriptor_buffer](#VK_EXT_descriptor_buffer)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Deprecation by VK_EXT_descriptor_heap](#_deprecation_by_vk_ext_descriptor_heap)
- [Deprecation_by_VK_EXT_descriptor_heap](#_deprecation_by_vk_ext_descriptor_heap)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_descriptor_buffer - device extension

**Name String**

`VK_EXT_descriptor_buffer`

**Extension Type**

Device extension

**Registered Extension Number**

317

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

                 [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

                 or

                 [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

             and

             [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

             and

             [VK_EXT_descriptor_indexing](VK_EXT_descriptor_indexing.html)

         or

         [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

     and

     [VK_KHR_synchronization2](VK_KHR_synchronization2.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_EXT_fragment_density_map

* 
Interacts with VK_KHR_acceleration_structure

* 
Interacts with VK_NV_ray_tracing

**Deprecation State**

* 
*Deprecated* by
[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html)
extension

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_descriptor_buffer] @tobski%0A*Here describe the issue or question you have about the VK_EXT_descriptor_buffer extension*)

**Extension Proposal**

[VK_EXT_descriptor_buffer](../../../../features/latest/features/proposals/VK_EXT_descriptor_buffer.html)

**Last Modified Date**

2021-06-07

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Stu Smith, AMD

* 
Maciej Jesionowski, AMD

* 
Boris Zanin, AMD

* 
Hans-Kristian Arntzen, Valve

* 
Connor Abbott, Valve

* 
Baldur Karlsson, Valve

* 
Mike Blumenkrantz, Valve

* 
Graeme Leese, Broadcom

* 
Jan-Harald Fredriksen, Arm

* 
Rodrigo Locatti, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Jeff Leger, QUALCOMM

* 
Lionel Landwerlin, Intel

* 
Slawomir Grajewski, Intel

This extension introduces new commands to put shader-accessible descriptors
directly in memory, making the management of descriptor data more explicit.

Functionality in this extension is deprecated by the
[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html) extension.
See [Descriptor Management: Replaced by Descriptor Heaps](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets).

* 
[vkCmdBindDescriptorBufferEmbeddedSamplersEXT](vkCmdBindDescriptorBufferEmbeddedSamplersEXT.html)

* 
[vkCmdBindDescriptorBuffersEXT](vkCmdBindDescriptorBuffersEXT.html)

* 
[vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html)

* 
[vkGetBufferOpaqueCaptureDescriptorDataEXT](vkGetBufferOpaqueCaptureDescriptorDataEXT.html)

* 
[vkGetDescriptorEXT](vkGetDescriptorEXT.html)

* 
[vkGetDescriptorSetLayoutBindingOffsetEXT](vkGetDescriptorSetLayoutBindingOffsetEXT.html)

* 
[vkGetDescriptorSetLayoutSizeEXT](vkGetDescriptorSetLayoutSizeEXT.html)

* 
[vkGetImageOpaqueCaptureDescriptorDataEXT](vkGetImageOpaqueCaptureDescriptorDataEXT.html)

* 
[vkGetImageViewOpaqueCaptureDescriptorDataEXT](vkGetImageViewOpaqueCaptureDescriptorDataEXT.html)

* 
[vkGetSamplerOpaqueCaptureDescriptorDataEXT](vkGetSamplerOpaqueCaptureDescriptorDataEXT.html)

If [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html) or [VK_NV_ray_tracing](VK_NV_ray_tracing.html) is supported:

* 
[vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT](vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT.html)

* 
[VkBufferCaptureDescriptorDataInfoEXT](VkBufferCaptureDescriptorDataInfoEXT.html)

* 
[VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html)

* 
[VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html)

* 
[VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)

* 
[VkImageCaptureDescriptorDataInfoEXT](VkImageCaptureDescriptorDataInfoEXT.html)

* 
[VkImageViewCaptureDescriptorDataInfoEXT](VkImageViewCaptureDescriptorDataInfoEXT.html)

* 
[VkSamplerCaptureDescriptorDataInfoEXT](VkSamplerCaptureDescriptorDataInfoEXT.html)

* 
Extending [VkBufferCreateInfo](VkBufferCreateInfo.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html), [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html), [VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html), [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html), [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html), [VkAccelerationStructureCreateInfo2KHR](VkAccelerationStructureCreateInfo2KHR.html):

[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html)

Extending [VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html):

* 
[VkDescriptorBufferBindingPushDescriptorBufferHandleEXT](VkDescriptorBufferBindingPushDescriptorBufferHandleEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDescriptorBufferFeaturesEXT](VkPhysicalDeviceDescriptorBufferFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)

If [VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html) is supported:

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT](VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT.html)

If [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html) or [VK_NV_ray_tracing](VK_NV_ray_tracing.html) is supported:

* 
[VkAccelerationStructureCaptureDescriptorDataInfoEXT](VkAccelerationStructureCaptureDescriptorDataInfoEXT.html)

* 
[VkDescriptorDataEXT](VkDescriptorDataEXT.html)

* 
`VK_EXT_DESCRIPTOR_BUFFER_EXTENSION_NAME`

* 
`VK_EXT_DESCRIPTOR_BUFFER_SPEC_VERSION`

* 
Extending [VkAccelerationStructureCreateFlagBitsKHR](VkAccelerationStructureCreateFlagBitsKHR.html):

[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkAccelerationStructureCreateFlagBitsKHR.html)

Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

* 
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](VkAccessFlagBits2.html)

Extending [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html):

* 
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkBufferCreateFlagBits.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

Extending [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html):

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)

Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

* 
[VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html)

Extending [VkImageViewCreateFlagBits](VkImageViewCreateFlagBits.html):

* 
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkImageViewCreateFlagBits.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

Extending [VkSamplerCreateFlagBits](VkSamplerCreateFlagBits.html):

* 
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkSamplerCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BUFFER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_ADDRESS_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_PUSH_DESCRIPTOR_BUFFER_HANDLE_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_GET_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_OPAQUE_CAPTURE_DESCRIPTOR_DATA_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_DENSITY_MAP_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

If [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html) or [VK_NV_ray_tracing](VK_NV_ray_tracing.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2021-06-07 (Stu Smith)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
