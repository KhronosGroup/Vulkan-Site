# VK_KHR_external_semaphore(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_semaphore.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_semaphore](#VK_KHR_external_semaphore)
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

VK_KHR_external_semaphore - device extension

**Name String**

`VK_KHR_external_semaphore`

**Extension Type**

Device extension

**Registered Extension Number**

78

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_semaphore] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_external_semaphore extension*)

**Last Modified Date**

2016-10-21

**IP Status**

No known IP claims.

**Contributors**

* 
Faith Ekstrand, Intel

* 
Jesse Hall, Google

* 
Tobias Hector, Imagination Technologies

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Ray Smith, ARM

* 
Lina Versace, Google

An application using external memory may wish to synchronize access to that
memory using semaphores.
This extension enables an application to create semaphores from which
non-Vulkan handles that reference the underlying synchronization primitive
can be exported.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html):

[VkExportSemaphoreCreateInfoKHR](VkExportSemaphoreCreateInfo.html)

* 
[VkSemaphoreImportFlagBitsKHR](VkSemaphoreImportFlagBits.html)

* 
[VkSemaphoreImportFlagsKHR](VkSemaphoreImportFlags.html)

* 
`VK_KHR_EXTERNAL_SEMAPHORE_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_SEMAPHORE_SPEC_VERSION`

* 
Extending [VkSemaphoreImportFlagBits](VkSemaphoreImportFlagBits.html):

[VK_SEMAPHORE_IMPORT_TEMPORARY_BIT_KHR](VkSemaphoreImportFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_CREATE_INFO_KHR](VkStructureType.html)

1) Should there be restrictions on what side effects can occur when waiting
on imported semaphores that are in an invalid state?

**RESOLVED**: Yes.
Normally, validating such state would be the responsibility of the
application, and the implementation would be free to enter an **undefined**
state if valid usage rules were violated.
However, this could cause security concerns when using imported semaphores,
as it would require the importing application to trust the exporting
application to ensure the state is valid.
Requiring this level of trust is undesirable for many potential use cases.

2) Must implementations validate external handles the application provides
as input to semaphore state import operations?

**RESOLVED**: Implementations must return an error to the application if the
provided semaphore state handle cannot be used to complete the requested
import operation.
However, implementations need not validate handles are of the exact type
specified by the application.

* 
Revision 1, 2016-10-21 (James Jones)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_semaphore).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
