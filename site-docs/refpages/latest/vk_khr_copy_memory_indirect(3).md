# VK_KHR_copy_memory_indirect(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_copy_memory_indirect.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_copy_memory_indirect](#VK_KHR_copy_memory_indirect)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_copy_memory_indirect - device extension

**Name String**

`VK_KHR_copy_memory_indirect`

**Extension Type**

Device extension

**Registered Extension Number**

550

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     and

     [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Contact**

* 
Vikram Kushwaha [vkushwaha-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_copy_memory_indirect] @vkushwaha-nv%0A*Here describe the issue or question you have about the VK_KHR_copy_memory_indirect extension*)

**Extension Proposal**

[VK_KHR_copy_memory_indirect](../../../../features/latest/features/proposals/VK_KHR_copy_memory_indirect.html)

**Last Modified Date**

2025-01-25

**Contributors**

* 
Daniel Koch, NVIDIA

* 
Vikram Kushwaha, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Stuart Smith, AMD

* 
Faith Ekstrand, Collabora

* 
Caterina Shablia, Collabora

* 
Spencer Fricke, LunarG

* 
Matthew Netsch, Qualcomm Technologies, Inc

* 
Mike Blumenkrantz, Valve

* 
Alyssa Rosenzweig, Valve

This extension adds support for performing copies between memory and image
regions using indirect parameters that are read by the device from a buffer
during execution.
This functionality may be useful for performing copies where the copy
parameters are not known during the command buffer creation time.

* 
[vkCmdCopyMemoryIndirectKHR](vkCmdCopyMemoryIndirectKHR.html)

* 
[vkCmdCopyMemoryToImageIndirectKHR](vkCmdCopyMemoryToImageIndirectKHR.html)

* 
[VkCopyMemoryIndirectCommandKHR](VkCopyMemoryIndirectCommandKHR.html)

* 
[VkCopyMemoryIndirectInfoKHR](VkCopyMemoryIndirectInfoKHR.html)

* 
[VkCopyMemoryToImageIndirectCommandKHR](VkCopyMemoryToImageIndirectCommandKHR.html)

* 
[VkCopyMemoryToImageIndirectInfoKHR](VkCopyMemoryToImageIndirectInfoKHR.html)

* 
[VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR](VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR](VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR.html)

* 
[VkAddressCopyFlagBitsKHR](VkAddressCopyFlagBitsKHR.html)

* 
[VkAddressCopyFlagsKHR](VkAddressCopyFlagsKHR.html)

* 
`VK_KHR_COPY_MEMORY_INDIRECT_EXTENSION_NAME`

* 
`VK_KHR_COPY_MEMORY_INDIRECT_SPEC_VERSION`

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](VkFormatFeatureFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](VkPipelineStageFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_COPY_MEMORY_INDIRECT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_MEMORY_TO_IMAGE_INDIRECT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_PROPERTIES_KHR](VkStructureType.html)

* 
Revision 1, 2025-01-25 (Daniel Koch, Vikram Kushwaha)

Initial external release

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_copy_memory_indirect).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
