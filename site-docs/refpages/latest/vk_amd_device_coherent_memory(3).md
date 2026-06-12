# VK_AMD_device_coherent_memory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_device_coherent_memory.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_device_coherent_memory](#VK_AMD_device_coherent_memory)
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

VK_AMD_device_coherent_memory - device extension

**Name String**

`VK_AMD_device_coherent_memory`

**Extension Type**

Device extension

**Registered Extension Number**

230

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_device_coherent_memory] @tobski%0A*Here describe the issue or question you have about the VK_AMD_device_coherent_memory extension*)

**Last Modified Date**

2019-02-04

**Contributors**

* 
Ping Fu, AMD

* 
Timothy Lottes, AMD

* 
Tobias Hector, AMD

This extension adds the device coherent and device uncached memory types.
Any device accesses to device coherent memory are automatically made visible
to any other device access.
Device uncached memory indicates to applications that caches are disabled
for a particular memory type, which guarantees device coherence.

Device coherent and uncached memory are expected to have lower performance
for general access than non-device coherent memory, but can be useful in
certain scenarios; particularly so for debugging.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCoherentMemoryFeaturesAMD](VkPhysicalDeviceCoherentMemoryFeaturesAMD.html)

* 
`VK_AMD_DEVICE_COHERENT_MEMORY_EXTENSION_NAME`

* 
`VK_AMD_DEVICE_COHERENT_MEMORY_SPEC_VERSION`

* 
Extending [VkMemoryPropertyFlagBits](VkMemoryPropertyFlagBits.html):

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](VkMemoryPropertyFlagBits.html)

* 
[VK_MEMORY_PROPERTY_DEVICE_UNCACHED_BIT_AMD](VkMemoryPropertyFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COHERENT_MEMORY_FEATURES_AMD](VkStructureType.html)

* 
Revision 1, 2019-02-04 (Tobias Hector)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_device_coherent_memory).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
