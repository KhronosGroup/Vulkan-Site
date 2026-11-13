# VK_FUCHSIA_external_semaphore(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_FUCHSIA_external_semaphore.html

## Table of Contents

- [Name](#_name)
- [VK_FUCHSIA_external_semaphore](#VK_FUCHSIA_external_semaphore)
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

VK_FUCHSIA_external_semaphore - device extension

**Name String**

`VK_FUCHSIA_external_semaphore`

**Extension Type**

Device extension

**Registered Extension Number**

366

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html)

and

[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html)

**Contact**

* 
John Rosasco [rosasco](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_FUCHSIA_external_semaphore] @rosasco%0A*Here describe the issue or question you have about the VK_FUCHSIA_external_semaphore extension*)

**Last Modified Date**

2021-03-08

**IP Status**

No known IP claims.

**Contributors**

* 
Craig Stout, Google

* 
John Bauman, Google

* 
John Rosasco, Google

An application using external memory may wish to synchronize access to that
memory using semaphores.
This extension enables an application to export semaphore payload to and
import semaphore payload from Zircon event handles.

* 
[vkGetSemaphoreZirconHandleFUCHSIA](vkGetSemaphoreZirconHandleFUCHSIA.html)

* 
[vkImportSemaphoreZirconHandleFUCHSIA](vkImportSemaphoreZirconHandleFUCHSIA.html)

* 
[VkImportSemaphoreZirconHandleInfoFUCHSIA](VkImportSemaphoreZirconHandleInfoFUCHSIA.html)

* 
[VkSemaphoreGetZirconHandleInfoFUCHSIA](VkSemaphoreGetZirconHandleInfoFUCHSIA.html)

* 
`VK_FUCHSIA_EXTERNAL_SEMAPHORE_EXTENSION_NAME`

* 
`VK_FUCHSIA_EXTERNAL_SEMAPHORE_SPEC_VERSION`

* 
Extending [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html):

[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_ZIRCON_EVENT_BIT_FUCHSIA](VkExternalSemaphoreHandleTypeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_ZIRCON_HANDLE_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_GET_ZIRCON_HANDLE_INFO_FUCHSIA](VkStructureType.html)

1) Does the application need to close the Zircon event handle returned by
[vkGetSemaphoreZirconHandleFUCHSIA](vkGetSemaphoreZirconHandleFUCHSIA.html)?

**RESOLVED**: Yes, unless it is passed back in to a driver instance to import
the semaphore.
A successful get call transfers ownership of the Zircon event handle to the
application, and a successful import transfers it back to the driver.
Destroying the original semaphore object will not close the Zircon event
handle nor remove its reference to the underlying semaphore resource
associated with it.

* 
Revision 1, 2021-03-08 (John Rosasco)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_FUCHSIA_external_semaphore).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
