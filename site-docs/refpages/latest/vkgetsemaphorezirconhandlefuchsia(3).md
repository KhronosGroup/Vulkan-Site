# vkGetSemaphoreZirconHandleFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetSemaphoreZirconHandleFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetSemaphoreZirconHandleFUCHSIA - Get a Zircon event handle for a semaphore

To export a Zircon event handle representing the payload of a semaphore,
call:

// Provided by VK_FUCHSIA_external_semaphore
VkResult vkGetSemaphoreZirconHandleFUCHSIA(
    VkDevice                                    device,
    const VkSemaphoreGetZirconHandleInfoFUCHSIA* pGetZirconHandleInfo,
    zx_handle_t*                                pZirconHandle);

* 
`device` is the logical device that created the semaphore being
exported.

* 
`pGetZirconHandleInfo` is a pointer to a
[VkSemaphoreGetZirconHandleInfoFUCHSIA](VkSemaphoreGetZirconHandleInfoFUCHSIA.html) structure containing
parameters of the export operation.

* 
`pZirconHandle` will return the Zircon event handle representing the
semaphore payload.

Each call to `vkGetSemaphoreZirconHandleFUCHSIA` **must** create a Zircon
event handle and transfer ownership of it to the application.
To avoid leaking resources, the application **must** release ownership of the
Zircon event handle when it is no longer needed.

|  | Ownership can be released in many ways.
| --- | --- |
For example, the application can call zx_handle_close() on the file
descriptor, or transfer ownership back to Vulkan by using the file
descriptor to import a semaphore payload. |

Exporting a Zircon event handle from a semaphore **may** have side effects
depending on the transference of the specified handle type, as described in
[Importing Semaphore State](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetSemaphoreZirconHandleFUCHSIA-device-parameter) VUID-vkGetSemaphoreZirconHandleFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetSemaphoreZirconHandleFUCHSIA-pGetZirconHandleInfo-parameter) VUID-vkGetSemaphoreZirconHandleFUCHSIA-pGetZirconHandleInfo-parameter

 `pGetZirconHandleInfo` **must** be a valid pointer to a valid [VkSemaphoreGetZirconHandleInfoFUCHSIA](VkSemaphoreGetZirconHandleInfoFUCHSIA.html) structure

* 
[](#VUID-vkGetSemaphoreZirconHandleFUCHSIA-pZirconHandle-parameter) VUID-vkGetSemaphoreZirconHandleFUCHSIA-pZirconHandle-parameter

 `pZirconHandle` **must** be a valid pointer to a `zx_handle_t` value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_FUCHSIA_external_semaphore](VK_FUCHSIA_external_semaphore.html), [VkDevice](VkDevice.html), [VkSemaphoreGetZirconHandleInfoFUCHSIA](VkSemaphoreGetZirconHandleInfoFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkGetSemaphoreZirconHandleFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
