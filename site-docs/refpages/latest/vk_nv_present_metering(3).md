# VK_NV_present_metering(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_present_metering.html

## Table of Contents

- [Name](#_name)
- [VK_NV_present_metering](#VK_NV_present_metering)
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

VK_NV_present_metering - device extension

**Name String**

`VK_NV_present_metering`

**Extension Type**

Device extension

**Registered Extension Number**

614

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
Charles Hansen [chansen](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_present_metering] @chansen%0A*Here describe the issue or question you have about the VK_NV_present_metering extension*)

**Last Modified Date**

2025-01-08

**Provisional**

*This extension is *provisional* and **should** not be used in production
applications.
The functionality defined by this extension **may** change in ways that break
backwards compatibility between revisions, and before the final release of
the non-provisional version of this extension.

**Contributors**

* 
Charles Hansen, NVIDIA

* 
Lionel Duc, NVIDIA

This extension is used to evenly meter presents.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePresentMeteringFeaturesNV](VkPhysicalDevicePresentMeteringFeaturesNV.html)

Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

* 
[VkSetPresentConfigNV](VkSetPresentConfigNV.html)

* 
`VK_NV_PRESENT_METERING_EXTENSION_NAME`

* 
`VK_NV_PRESENT_METERING_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_METERING_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SET_PRESENT_CONFIG_NV](VkStructureType.html)

* 
Revision 1, 2025-01-08 (Charles Hansen)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_present_metering).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
