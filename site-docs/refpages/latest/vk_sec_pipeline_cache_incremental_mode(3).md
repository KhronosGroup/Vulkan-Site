# VK_SEC_pipeline_cache_incremental_mode(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_SEC_pipeline_cache_incremental_mode.html

## Table of Contents

- [Name](#_name)
- [VK_SEC_pipeline_cache_incremental_mode](#VK_SEC_pipeline_cache_incremental_mode)
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

VK_SEC_pipeline_cache_incremental_mode - device extension

**Name String**

`VK_SEC_pipeline_cache_incremental_mode`

**Extension Type**

Device extension

**Registered Extension Number**

638

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
Chris Hambacher [chambacher](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_SEC_pipeline_cache_incremental_mode] @chambacher%0A*Here describe the issue or question you have about the VK_SEC_pipeline_cache_incremental_mode extension*)

**Last Modified Date**

2025-06-24

**IP Status**

No known IP claims.

**Contributors**

* 
Chris Hambacher, Samsung

* 
Mohan Maiya, Samsung

* 
Brandon Schade, Samsung

This extension allows layered implementations such as ANGLE to modify the
default behavior of VkPipelineCache to return only the incremental data from
the previous call to vkGetPipelineCacheData.
Application developers should avoid using this extension.

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

[VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC](VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC.html)

* 
`VK_SEC_PIPELINE_CACHE_INCREMENTAL_MODE_EXTENSION_NAME`

* 
`VK_SEC_PIPELINE_CACHE_INCREMENTAL_MODE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CACHE_INCREMENTAL_MODE_FEATURES_SEC](VkStructureType.html)

* 
Revision 1, 2025-06-24 (Chris Hambacher)

Initial specification

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_SEC_pipeline_cache_incremental_mode).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
