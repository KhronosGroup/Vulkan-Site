# VK_EXT_calibrated_timestamps(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_calibrated_timestamps.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_calibrated_timestamps](#VK_EXT_calibrated_timestamps)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_calibrated_timestamps](#_promotion_to_vk_khr_calibrated_timestamps)
- [Promotion_to_VK_KHR_calibrated_timestamps](#_promotion_to_vk_khr_calibrated_timestamps)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_calibrated_timestamps - device extension

**Name String**

`VK_EXT_calibrated_timestamps`

**Extension Type**

Device extension

**Registered Extension Number**

185

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_calibrated_timestamps](VK_KHR_calibrated_timestamps.html)
extension

**Contact**

* 
Daniel Rakos [drakos-amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_calibrated_timestamps] @drakos-amd%0A*Here describe the issue or question you have about the VK_EXT_calibrated_timestamps extension*)

**Extension Proposal**

[VK_EXT_calibrated_timestamps](../../../../features/latest/features/proposals/VK_EXT_calibrated_timestamps.html)

**Last Modified Date**

2018-10-04

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
Daniel Rakos, AMD

* 
Faith Ekstrand, Intel

* 
Keith Packard, Valve

This extension provides an interface to query calibrated timestamps obtained
quasi simultaneously from two time domains.

All functionality in this extension is included in
`[VK_KHR_calibrated_timestamps](VK_KHR_calibrated_timestamps.html)`, with the suffix changed to KHR.
The original enum names are still available as aliases of the KHR
functionality.

* 
[vkGetCalibratedTimestampsEXT](vkGetCalibratedTimestampsKHR.html)

* 
[vkGetPhysicalDeviceCalibrateableTimeDomainsEXT](vkGetPhysicalDeviceCalibrateableTimeDomainsKHR.html)

* 
[VkCalibratedTimestampInfoEXT](VkCalibratedTimestampInfoKHR.html)

* 
[VkTimeDomainEXT](VkTimeDomainKHR.html)

* 
`VK_EXT_CALIBRATED_TIMESTAMPS_EXTENSION_NAME`

* 
`VK_EXT_CALIBRATED_TIMESTAMPS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_CALIBRATED_TIMESTAMP_INFO_EXT](VkStructureType.html)

Extending [VkTimeDomainKHR](VkTimeDomainKHR.html):

* 
[VK_TIME_DOMAIN_CLOCK_MONOTONIC_EXT](VkTimeDomainKHR.html)

* 
[VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_EXT](VkTimeDomainKHR.html)

* 
[VK_TIME_DOMAIN_DEVICE_EXT](VkTimeDomainKHR.html)

* 
[VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_EXT](VkTimeDomainKHR.html)

* 
Revision 2, 2021-03-16 (Lionel Landwerlin)

Specify requirement on device timestamps

Revision 1, 2018-10-04 (Daniel Rakos)

* 
Internal revisions.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_calibrated_timestamps).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
