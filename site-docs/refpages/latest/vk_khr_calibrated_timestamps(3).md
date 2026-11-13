# VK_KHR_calibrated_timestamps(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_calibrated_timestamps.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_calibrated_timestamps](#VK_KHR_calibrated_timestamps)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_calibrated_timestamps - device extension

**Name String**

`VK_KHR_calibrated_timestamps`

**Extension Type**

Device extension

**Registered Extension Number**

544

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
Daniel Rakos [aqnuep](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_calibrated_timestamps] @aqnuep%0A*Here describe the issue or question you have about the VK_KHR_calibrated_timestamps extension*)

**Extension Proposal**

[VK_EXT_calibrated_timestamps](../../../../features/latest/features/proposals/VK_EXT_calibrated_timestamps.html)

**Last Modified Date**

2023-07-12

**IP Status**

No known IP claims.

**Contributors**

* 
Matthaeus G. Chajdas, AMD

* 
Alan Harrison, AMD

* 
Derrick Owens, AMD

* 
Daniel Rakos, RasterGrid

* 
Faith Ekstrand, Intel

* 
Keith Packard, Valve

This extension provides an interface to query calibrated timestamps obtained
quasi simultaneously from two time domains.

* 
[vkGetCalibratedTimestampsKHR](vkGetCalibratedTimestampsKHR.html)

* 
[vkGetPhysicalDeviceCalibrateableTimeDomainsKHR](vkGetPhysicalDeviceCalibrateableTimeDomainsKHR.html)

* 
[VkCalibratedTimestampInfoKHR](VkCalibratedTimestampInfoKHR.html)

* 
[VkTimeDomainKHR](VkTimeDomainKHR.html)

* 
`VK_KHR_CALIBRATED_TIMESTAMPS_EXTENSION_NAME`

* 
`VK_KHR_CALIBRATED_TIMESTAMPS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_CALIBRATED_TIMESTAMP_INFO_KHR](VkStructureType.html)

* 
Revision 1, 2023-07-12 (Daniel Rakos)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_calibrated_timestamps).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
