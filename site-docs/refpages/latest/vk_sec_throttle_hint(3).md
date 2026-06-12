# VK_SEC_throttle_hint(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_SEC_throttle_hint.html

## Table of Contents

- [Name](#_name)
- [VK_SEC_throttle_hint](#VK_SEC_throttle_hint)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_SEC_throttle_hint - device extension

**Name String**

`VK_SEC_throttle_hint`

**Extension Type**

Device extension

**Registered Extension Number**

675

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Ralph Potter r_potter

**Last Modified Date**

2026-04-09

**IP Status**

No known IP claims.

**Contributors**

* 
Jonghyuk Eun, Samsung

* 
Minyoung Son, Samsung

* 
Jihyoung Hong, Samsung

* 
Pavan Lanka, Samsung

* 
Ralph Potter, Samsung

This extension is intended to convey throttle hints to the device, but does
not specify the throttling behavior or any minimum guarantees.
This extension is intended to communicate information from layered API
implementations such as ANGLE to internal proprietary system schedulers.

It has no behavioral implications beyond enabling more intelligent behavior
from the system scheduler.

Application developers should avoid using this extension.
It is documented solely for the benefit of tools and layer developers, who
may need to manipulate `pNext` chains that include these structures.

|  | There is currently no specification language written for this extension.
| --- | --- |
The links to APIs defined by the extension are to stubs that only include
generated content such as API declarations and implicit valid usage
statements. |

|  | This extension is only intended for use in specific embedded environments
| --- | --- |
with known implementation details, and is therefore undocumented. |

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceThrottleHintFeaturesSEC](VkPhysicalDeviceThrottleHintFeaturesSEC.html)

Extending [VkSubmitInfo](VkSubmitInfo.html):

* 
[VkThrottleHintSubmitInfoSEC](VkThrottleHintSubmitInfoSEC.html)

* 
[VkThrottleHintTypeSEC](VkThrottleHintTypeSEC.html)

* 
`VK_SEC_THROTTLE_HINT_EXTENSION_NAME`

* 
`VK_SEC_THROTTLE_HINT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_THROTTLE_HINT_FEATURES_SEC](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_THROTTLE_HINT_SUBMIT_INFO_SEC](VkStructureType.html)

* 
Revision 1, 2026-04-09 (Ralph Potter)

Initial specification

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_SEC_throttle_hint).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
