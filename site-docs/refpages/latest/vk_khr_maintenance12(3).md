# VK_KHR_maintenance12(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance12.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance12](#VK_KHR_maintenance12)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance12 - device extension

**Name String**

`VK_KHR_maintenance12`

**Extension Type**

Device extension

**Registered Extension Number**

681

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
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance12] @zmike%0A*Here describe the issue or question you have about the VK_KHR_maintenance12 extension*)

**Extension Proposal**

[VK_KHR_maintenance12](../../../../features/latest/features/proposals/VK_KHR_maintenance12.html)

**Last Modified Date**

2026-03-25

**Interactions and External Dependencies**
**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Jeff Bolz, NVIDIA

* 
Daniel Story, Nintendo

* 
Spencer Fricke, LunarG

* 
Tobias Hector, AMD

[VK_KHR_maintenance12](#) adds a collection of minor features, none of
which would warrant an entire extension of their own.

The new features are as follows:

* 
Non-uniform indexing of values within a variable with a
`PushConstant` storage class.

* 
Single-aspected depth/stencil blits and resolves

* 
A dedicated limit for input attachment indices

* 
`VkDeviceQueueCreateInfo`::`pQueuePriorities` can be `NULL`

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMaintenance12FeaturesKHR](VkPhysicalDeviceMaintenance12FeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMaintenance12PropertiesKHR](VkPhysicalDeviceMaintenance12PropertiesKHR.html)

* 
`VK_KHR_MAINTENANCE_12_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_12_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_12_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_12_PROPERTIES_KHR](VkStructureType.html)

None.

* 
Revision 1, 2026-03-25 (Mike Blumenkrantz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance12).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
