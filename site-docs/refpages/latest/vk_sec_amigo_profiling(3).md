# VK_SEC_amigo_profiling(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_SEC_amigo_profiling.html

## Table of Contents

- [Name](#_name)
- [VK_SEC_amigo_profiling](#VK_SEC_amigo_profiling)
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

VK_SEC_amigo_profiling - device extension

**Name String**

`VK_SEC_amigo_profiling`

**Extension Type**

Device extension

**Registered Extension Number**

486

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
Ralph Potter r_potter

**Last Modified Date**

2022-07-29

**IP Status**

No known IP claims.

**Contributors**

* 
Ralph Potter, Samsung

* 
Sangrak Oh, Samsung

* 
Jinku Kang, Samsung

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

[VkPhysicalDeviceAmigoProfilingFeaturesSEC](VkPhysicalDeviceAmigoProfilingFeaturesSEC.html)

Extending [VkSubmitInfo](VkSubmitInfo.html):

* 
[VkAmigoProfilingSubmitInfoSEC](VkAmigoProfilingSubmitInfoSEC.html)

* 
`VK_SEC_AMIGO_PROFILING_EXTENSION_NAME`

* 
`VK_SEC_AMIGO_PROFILING_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_AMIGO_PROFILING_SUBMIT_INFO_SEC](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_AMIGO_PROFILING_FEATURES_SEC](VkStructureType.html)

* 
Revision 1, 2022-07-29 (Ralph Potter)

Initial specification

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_SEC_amigo_profiling).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
