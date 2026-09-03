# VK_KHR_maintenance6(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance6.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance6](#VK_KHR_maintenance6)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance6 - device extension

**Name String**

`VK_KHR_maintenance6`

**Extension Type**

Device extension

**Registered Extension Number**

546

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_EXT_descriptor_buffer

* 
Interacts with VK_KHR_push_descriptor

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Jon Leech [oddhack](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance6] @oddhack%0A*Here describe the issue or question you have about the VK_KHR_maintenance6 extension*)

**Extension Proposal**

[VK_KHR_maintenance6](../../../../features/latest/features/proposals/VK_KHR_maintenance6.html)

**Last Modified Date**

2023-08-03

**Interactions and External Dependencies**

* 
Interacts with `[VK_EXT_robustness2](VK_EXT_robustness2.html)`

**Contributors**

* 
Jon Leech, Khronos

* 
Stu Smith, AMD

* 
Mike Blumenkrantz, Valve

* 
Ralph Potter, Samsung

* 
James Fitzpatrick, Imagination Technologies

* 
Piers Daniell, NVIDIA

* 
Daniel Story, Nintendo

[VK_KHR_maintenance6](#) adds a collection of minor features, none of
which would warrant an entire extension of their own.

The new features are as follows:

* 
[VkBindMemoryStatusKHR](VkBindMemoryStatus.html) may be included in the `pNext` chain of
[VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html) and [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html), allowing
applications to identify individual resources for which memory binding
failed during calls to [vkBindBufferMemory2](vkBindBufferMemory2.html) and
[vkBindImageMemory2](vkBindImageMemory2.html).

* 
A new property `fragmentShadingRateClampCombinerInputs` to indicate
if an implementation clamps the inputs to fragment shading rate combiner
operations.

* 
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) is allowed to be used when binding an index buffer,
instead of a valid [VkBuffer](VkBuffer.html) handle.
When the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is
enabled, every index fetched results in a value of zero.

* 
A new property `maxCombinedImageSamplerDescriptorCount` to indicate
the maximum number of descriptors needed for any of the
[formats that require a    sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the implementation.

* 
A new property `blockTexelViewCompatibleMultipleLayers` indicating
whether [VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html) is allowed
to be used with `layerCount` > 1

* 
`pNext` extensible *2 versions of all descriptor binding commands.

* 
[vkCmdBindDescriptorSets2KHR](vkCmdBindDescriptorSets2.html)

* 
[vkCmdPushConstants2KHR](vkCmdPushConstants2.html)

If [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html) is supported:

* 
[vkCmdBindDescriptorBufferEmbeddedSamplers2EXT](vkCmdBindDescriptorBufferEmbeddedSamplers2EXT.html)

* 
[vkCmdSetDescriptorBufferOffsets2EXT](vkCmdSetDescriptorBufferOffsets2EXT.html)

If [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) is supported:

* 
[vkCmdPushDescriptorSet2KHR](vkCmdPushDescriptorSet2.html)

* 
[vkCmdPushDescriptorSetWithTemplate2KHR](vkCmdPushDescriptorSetWithTemplate2.html)

* 
[VkBindDescriptorSetsInfoKHR](VkBindDescriptorSetsInfo.html)

* 
[VkPushConstantsInfoKHR](VkPushConstantsInfo.html)

* 
Extending [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html), [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html):

[VkBindMemoryStatusKHR](VkBindMemoryStatus.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceMaintenance6FeaturesKHR](VkPhysicalDeviceMaintenance6Features.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMaintenance6PropertiesKHR](VkPhysicalDeviceMaintenance6Properties.html)

If [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html) is supported:

* 
[VkBindDescriptorBufferEmbeddedSamplersInfoEXT](VkBindDescriptorBufferEmbeddedSamplersInfoEXT.html)

* 
[VkSetDescriptorBufferOffsetsInfoEXT](VkSetDescriptorBufferOffsetsInfoEXT.html)

If [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) is supported:

* 
[VkPushDescriptorSetInfoKHR](VkPushDescriptorSetInfo.html)

* 
[VkPushDescriptorSetWithTemplateInfoKHR](VkPushDescriptorSetWithTemplateInfo.html)

* 
`VK_KHR_MAINTENANCE_6_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_6_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_SETS_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_MEMORY_STATUS_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO_KHR](VkStructureType.html)

If [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_BUFFER_EMBEDDED_SAMPLERS_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SET_DESCRIPTOR_BUFFER_OFFSETS_INFO_EXT](VkStructureType.html)

If [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_WITH_TEMPLATE_INFO_KHR](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2023-08-01 (Jon Leech)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance6).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
