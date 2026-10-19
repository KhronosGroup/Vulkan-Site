# vkImportSemaphoreZirconHandleFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkImportSemaphoreZirconHandleFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkImportSemaphoreZirconHandleFUCHSIA - Import a semaphore from a Zircon event handle

To import a semaphore payload from a Zircon event handle, call:

// Provided by VK_FUCHSIA_external_semaphore
VkResult vkImportSemaphoreZirconHandleFUCHSIA(
    VkDevice                                    device,
    const VkImportSemaphoreZirconHandleInfoFUCHSIA* pImportSemaphoreZirconHandleInfo);

* 
`device` is the logical device that created the semaphore.

* 
`pImportSemaphoreZirconHandleInfo` is a pointer to a
[VkImportSemaphoreZirconHandleInfoFUCHSIA](VkImportSemaphoreZirconHandleInfoFUCHSIA.html) structure specifying the
semaphore and import parameters.

Importing a semaphore payload from a Zircon event handle transfers ownership
of the handle from the application to the Vulkan implementation.
The application **must** not perform any operations on the handle after a
successful import.

Applications **can** import the same semaphore payload into multiple instances
of Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage

* 
[](#VUID-vkImportSemaphoreZirconHandleFUCHSIA-semaphore-04764) VUID-vkImportSemaphoreZirconHandleFUCHSIA-semaphore-04764

`semaphore` **must** not be associated with any queue command that has
not yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkImportSemaphoreZirconHandleFUCHSIA-device-parameter) VUID-vkImportSemaphoreZirconHandleFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkImportSemaphoreZirconHandleFUCHSIA-pImportSemaphoreZirconHandleInfo-parameter) VUID-vkImportSemaphoreZirconHandleFUCHSIA-pImportSemaphoreZirconHandleInfo-parameter

 `pImportSemaphoreZirconHandleInfo` **must** be a valid pointer to a valid [VkImportSemaphoreZirconHandleInfoFUCHSIA](VkImportSemaphoreZirconHandleInfoFUCHSIA.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_FUCHSIA_external_semaphore](VK_FUCHSIA_external_semaphore.html), [VkDevice](VkDevice.html), [VkImportSemaphoreZirconHandleInfoFUCHSIA](VkImportSemaphoreZirconHandleInfoFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkImportSemaphoreZirconHandleFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
