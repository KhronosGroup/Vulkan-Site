# VK_EXT_global_priority_query(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_global_priority_query.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_global_priority_query](#VK_EXT_global_priority_query)
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

VK_EXT_global_priority_query - device extension

**Name String**

`VK_EXT_global_priority_query`

**Extension Type**

Device extension

**Registered Extension Number**

389

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_EXT_global_priority](VK_EXT_global_priority.html)

and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_global_priority](VK_KHR_global_priority.html)
extension

Which in turn was *promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Yiwei Zhang [zzyiwei](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_global_priority_query] @zzyiwei%0A*Here describe the issue or question you have about the VK_EXT_global_priority_query extension*)

**Last Modified Date**

2021-03-29

**IP Status**

No known IP claims.

**Contributors**

* 
Yiwei Zhang, Google

This device extension allows applications to query the global queue
priorities supported by a queue family.
It allows implementations to report which global priority levels are treated
differently by the implementation, instead of silently mapping multiple
requested global priority levels to the same internal priority, or using
device creation failure to signal that a requested priority is not
supported.
It is intended primarily for use by system integration along with certain
platform-specific priority enforcement rules.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceGlobalPriorityQueryFeaturesEXT](VkPhysicalDeviceGlobalPriorityQueryFeatures.html)

Extending [VkQueueFamilyProperties2](VkQueueFamilyProperties2.html):

* 
[VkQueueFamilyGlobalPriorityPropertiesEXT](VkQueueFamilyGlobalPriorityProperties.html)

* 
`VK_EXT_GLOBAL_PRIORITY_QUERY_EXTENSION_NAME`

* 
`VK_EXT_GLOBAL_PRIORITY_QUERY_SPEC_VERSION`

* 
[VK_MAX_GLOBAL_PRIORITY_SIZE_EXT](VK_MAX_GLOBAL_PRIORITY_SIZE.html)

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES_EXT](VkStructureType.html)

1) Can we additionally query whether a caller is permitted to acquire a
specific global queue priority in this extension?

**RESOLVED**: No.
Whether a caller has enough privilege goes with the OS, and the Vulkan
driver cannot really guarantee that the privilege will not change in between
this query and the actual queue creation call.

2) If more than 1 queue using global priority is requested, is there a good
way to know which queue is failing the device creation?

**RESOLVED**: No.
There is not a good way at this moment, and it is also not quite actionable
for the applications to know that because the information may not be
accurate.
Queue creation can fail because of runtime constraints like insufficient
privilege or lack of resource, and the failure is not necessarily tied to
that particular queue configuration requested.

* 
Revision 1, 2021-03-29 (Yiwei Zhang)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_global_priority_query).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
