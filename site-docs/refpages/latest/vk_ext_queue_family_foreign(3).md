# VK_EXT_queue_family_foreign(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_queue_family_foreign.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_queue_family_foreign](#VK_EXT_queue_family_foreign)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_queue_family_foreign - device extension

**Name String**

`VK_EXT_queue_family_foreign`

**Extension Type**

Device extension

**Registered Extension Number**

127

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_memory](VK_KHR_external_memory.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_queue_family_foreign] @cubanismo%0A*Here describe the issue or question you have about the VK_EXT_queue_family_foreign extension*)

**Last Modified Date**

2017-11-01

**IP Status**

No known IP claims.

**Contributors**

* 
Lina Versace, Google

* 
James Jones, NVIDIA

* 
Faith Ekstrand, Intel

* 
Jesse Hall, Google

* 
Daniel Rakos, AMD

* 
Ray Smith, ARM

This extension defines a special queue family,
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html), which can be used to transfer ownership
of resources backed by external memory to foreign, external queues.
This is similar to [VK_QUEUE_FAMILY_EXTERNAL_KHR](VK_QUEUE_FAMILY_EXTERNAL.html), defined in
`[VK_KHR_external_memory](VK_KHR_external_memory.html)`.
The key differences between the two are:

* 
The queues represented by [VK_QUEUE_FAMILY_EXTERNAL_KHR](VK_QUEUE_FAMILY_EXTERNAL.html) must share
the same physical device and the same driver version as the current
[VkInstance](VkInstance.html).
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html) has no such restrictions.
It can represent devices and drivers from other vendors, and can even
represent non-Vulkan-capable devices.

* 
All resources backed by external memory support
[VK_QUEUE_FAMILY_EXTERNAL_KHR](VK_QUEUE_FAMILY_EXTERNAL.html).
Support for [VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html) is more restrictive.

* 
Applications should expect transitions to/from
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html) to be more expensive than transitions
to/from [VK_QUEUE_FAMILY_EXTERNAL_KHR](VK_QUEUE_FAMILY_EXTERNAL.html).

* 
`VK_EXT_QUEUE_FAMILY_FOREIGN_EXTENSION_NAME`

* 
`VK_EXT_QUEUE_FAMILY_FOREIGN_SPEC_VERSION`

* 
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html)

* 
Revision 1, 2017-11-01 (Lina Versace)

Squashed internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_queue_family_foreign).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
