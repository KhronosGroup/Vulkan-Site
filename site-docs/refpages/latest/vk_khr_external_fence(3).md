# VK_KHR_external_fence(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_fence.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_fence](#VK_KHR_external_fence)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_external_fence - device extension

**Name String**

`VK_KHR_external_fence`

**Extension Type**

Device extension

**Registered Extension Number**

114

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_fence_capabilities](VK_KHR_external_fence_capabilities.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Jesse Hall [critsec](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_fence] @critsec%0A*Here describe the issue or question you have about the VK_KHR_external_fence extension*)

**Last Modified Date**

2017-05-08

**IP Status**

No known IP claims.

**Contributors**

* 
Jesse Hall, Google

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Cass Everitt, Oculus

* 
Contributors to `[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html)`

An application using external memory may wish to synchronize access to that
memory using fences.
This extension enables an application to create fences from which non-Vulkan
handles that reference the underlying synchronization primitive can be
exported.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkFenceCreateInfo](VkFenceCreateInfo.html):

[VkExportFenceCreateInfoKHR](VkExportFenceCreateInfo.html)

* 
[VkFenceImportFlagBitsKHR](VkFenceImportFlagBits.html)

* 
[VkFenceImportFlagsKHR](VkFenceImportFlags.html)

* 
`VK_KHR_EXTERNAL_FENCE_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_FENCE_SPEC_VERSION`

* 
Extending [VkFenceImportFlagBits](VkFenceImportFlagBits.html):

[VK_FENCE_IMPORT_TEMPORARY_BIT_KHR](VkFenceImportFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_EXPORT_FENCE_CREATE_INFO_KHR](VkStructureType.html)

This extension borrows concepts, semantics, and language from
`[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html)`.
That extension’s issues apply equally to this extension.

* 
Revision 1, 2017-05-08 (Jesse Hall)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_fence).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
