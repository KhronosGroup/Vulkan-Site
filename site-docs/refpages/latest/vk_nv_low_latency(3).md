# VK_NV_low_latency(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_low_latency.html

## Table of Contents

- [Name](#_name)
- [VK_NV_low_latency](#VK_NV_low_latency)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_low_latency - device extension

**Name String**

`VK_NV_low_latency`

**Extension Type**

Device extension

**Registered Extension Number**

311

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Deprecated* by
[VK_NV_low_latency2](VK_NV_low_latency2.html)
extension

**Contact**

* 
Charles Hansen [cshansen](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_low_latency] @cshansen%0A*Here describe the issue or question you have about the VK_NV_low_latency extension*)

**Last Modified Date**

2026-06-26

**Contributors**

* 
Charles Hansen, NVIDIA

* 
Will Campbell, NVIDIA

This extension adds the [VkQueryLowLatencySupportNV](VkQueryLowLatencySupportNV.html) structure, a
structure used to query support for NVIDIA Reflex.

Revision 2 adds entry points exposing the legacy NVIDIA Reflex
implementation.
These are only intended for use by compatibility layers, applications
**should** not call these methods directly.

|  | There is currently no specification language written for this extension.
| --- | --- |
The links to APIs defined by the extension are to stubs that only include
generated content such as API declarations and implicit valid usage
statements. |

* 
[vkGetLatencyTimingsLegacyNV](vkGetLatencyTimingsLegacyNV.html)

* 
[vkGetSleepStatusLegacyNV](vkGetSleepStatusLegacyNV.html)

* 
[vkLatencySleepLegacyNV](vkLatencySleepLegacyNV.html)

* 
[vkQueueNotifyOutOfBandLegacyNV](vkQueueNotifyOutOfBandLegacyNV.html)

* 
[vkSetLatencyMarkerLegacyNV](vkSetLatencyMarkerLegacyNV.html)

* 
[vkSetLatencySleepModeLegacyNV](vkSetLatencySleepModeLegacyNV.html)

* 
[vkShutdownLatencyDeviceLegacyNV](vkShutdownLatencyDeviceLegacyNV.html)

* 
Extending [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html):

[VkQueryLowLatencySupportNV](VkQueryLowLatencySupportNV.html)

* 
`VK_NV_LOW_LATENCY_EXTENSION_NAME`

* 
`VK_NV_LOW_LATENCY_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_QUERY_LOW_LATENCY_SUPPORT_NV](VkStructureType.html)

1) Why does `VkQueryLowLatencySupportNV` have output parameters in an
input chain?

**RESOLVED**: We are stuck with this for legacy reasons - we are aware this is
bad behavior and this should not be used as a precedent for future
extensions.

* 
Revision 1, 2023-02-10 (Charles Hansen)

Internal revisions

Revision 2, 2026-06-26 (Will Campbell)

* 
Added LegacyNV entry points

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_low_latency).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
