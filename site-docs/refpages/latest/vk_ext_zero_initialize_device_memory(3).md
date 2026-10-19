# VK_EXT_zero_initialize_device_memory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_zero_initialize_device_memory.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_zero_initialize_device_memory](#VK_EXT_zero_initialize_device_memory)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_zero_initialize_device_memory - device extension

**Name String**

`VK_EXT_zero_initialize_device_memory`

**Extension Type**

Device extension

**Registered Extension Number**

621

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_zero_initialize_device_memory] @zmike%0A*Here describe the issue or question you have about the VK_EXT_zero_initialize_device_memory extension*)

**Extension Proposal**

[VK_EXT_zero_initialize_device_memory](../../../../features/latest/features/proposals/VK_EXT_zero_initialize_device_memory.html)

**Last Modified Date**

2025-04-09

**Interactions and External Dependencies**

* 
Interacts with Vulkan 1.1.

* 
Interacts with `[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)`.

**IP Status**

No known IP claims.

**Contributors**

* 
Hans-Kristian Arntzen, VALVE

* 
Mike Blumenkrantz, VALVE

* 
Tobias Hector, AMD

* 
Faith Ekstrand, Collabora

* 
Ricardo Garcia, Igalia

* 
Jan-Harald Fredriksen, ARM

* 
Spencer Fricke, LunarG

By default, Vulkan provides no guarantees that device memory allocated
through vkAllocateMemory is cleared to zero.
This means that applications wanting resources to be zero-initialized must
execute a command such as vkCmdFillBuffer or vkCmdClearColorImage on the
device to ensure a deterministic result.
This can be wasteful if the underlying platform either:

* 
Already performs that zero clear anyway, due to e.g. security concerns.

* 
Can be performed more efficiently in implementation, by e.g. clearing
pages to zero in the background after device memory is freed.

This extension also has uses in API layering and porting efforts, where zero
memory behavior may be more strict than Vulkan.
Different OS platforms also have wildly different behaviors here, which
leads to implementations needing to apply workarounds to paper over these
issues in the wild.
If an extension exists to make allocation behavior explicit, we hopefully
achieve a more robust ecosystem for Vulkan.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT](VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT.html)

* 
`VK_EXT_ZERO_INITIALIZE_DEVICE_MEMORY_EXTENSION_NAME`

* 
`VK_EXT_ZERO_INITIALIZE_DEVICE_MEMORY_SPEC_VERSION`

* 
Extending [VkImageLayout](VkImageLayout.html):

[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html)

Extending [VkMemoryAllocateFlagBits](VkMemoryAllocateFlagBits.html):

* 
[VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](VkMemoryAllocateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_DEVICE_MEMORY_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2025-03-10 (Mike Blumenkrantz)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_zero_initialize_device_memory).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
