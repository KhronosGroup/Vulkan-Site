# VK_NV_copy_memory_indirect(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_copy_memory_indirect.html

## Table of Contents

- [Name](#_name)
- [VK_NV_copy_memory_indirect](#VK_NV_copy_memory_indirect)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_copy_memory_indirect - device extension

**Name String**

`VK_NV_copy_memory_indirect`

**Extension Type**

Device extension

**Registered Extension Number**

427

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html)
extension

**Contact**

* 
Vikram Kushwaha [vkushwaha-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_copy_memory_indirect] @vkushwaha-nv%0A*Here describe the issue or question you have about the VK_NV_copy_memory_indirect extension*)

**Last Modified Date**

2022-10-14

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Daniel Koch, NVIDIA

This extension adds support for performing copies between memory and image
regions using indirect parameters that are read by the device from a buffer
during execution.
This functionality **may** be useful for performing copies where the copy
parameters are not known during the command buffer creation time.

* 
[vkCmdCopyMemoryIndirectNV](vkCmdCopyMemoryIndirectNV.html)

* 
[vkCmdCopyMemoryToImageIndirectNV](vkCmdCopyMemoryToImageIndirectNV.html)

* 
[VkCopyMemoryIndirectCommandNV](VkCopyMemoryIndirectCommandKHR.html)

* 
[VkCopyMemoryToImageIndirectCommandNV](VkCopyMemoryToImageIndirectCommandKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCopyMemoryIndirectFeaturesNV](VkPhysicalDeviceCopyMemoryIndirectFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceCopyMemoryIndirectPropertiesNV](VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR.html)

* 
`VK_NV_COPY_MEMORY_INDIRECT_EXTENSION_NAME`

* 
`VK_NV_COPY_MEMORY_INDIRECT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_PROPERTIES_NV](VkStructureType.html)

* 
Revision 1, 2022-10-14 (Vikram Kushwaha)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_copy_memory_indirect).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
