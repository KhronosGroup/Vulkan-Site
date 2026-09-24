# VK_KHR_internally_synchronized_queues(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_internally_synchronized_queues.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_internally_synchronized_queues](#VK_KHR_internally_synchronized_queues)
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

VK_KHR_internally_synchronized_queues - device extension

**Name String**

`VK_KHR_internally_synchronized_queues`

**Extension Type**

Device extension

**Registered Extension Number**

505

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_internally_synchronized_queues] @syoussefi%0A*Here describe the issue or question you have about the VK_KHR_internally_synchronized_queues extension*)

**Extension Proposal**

[VK_KHR_internally_synchronized_queues](../../../../features/latest/features/proposals/VK_KHR_internally_synchronized_queues.html)

**Last Modified Date**

2025-02-04

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Daniel Rakos, RasterGrid

* 
Jeff Bolz, Nvidia

* 
Hans-Kristian Arntzen, Valve

[VK_KHR_internally_synchronized_queues](#) allows queues to opt into being
internally synchronized via the
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](VkDeviceQueueCreateFlagBits.html) flag.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR](VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR.html)

* 
`VK_KHR_INTERNALLY_SYNCHRONIZED_QUEUES_EXTENSION_NAME`

* 
`VK_KHR_INTERNALLY_SYNCHRONIZED_QUEUES_SPEC_VERSION`

* 
Extending [VkDeviceQueueCreateFlagBits](VkDeviceQueueCreateFlagBits.html):

[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](VkDeviceQueueCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INTERNALLY_SYNCHRONIZED_QUEUES_FEATURES_KHR](VkStructureType.html)

None.

* 
Revision 0, 2025-01-07 (Daniel Rakos)

Initial proposal

Revision 1, 2025-02-04 (Shahbaz Youssefi)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_internally_synchronized_queues).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
