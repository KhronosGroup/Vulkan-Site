# vkGetMemoryZirconHandleFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryZirconHandleFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryZirconHandleFUCHSIA - Get a Zircon handle for an external memory object

To export device memory as a Zircon handle that can be used by another
instance, device, or process, retrieve the handle to the
[VkDeviceMemory](VkDeviceMemory.html) using the command:

// Provided by VK_FUCHSIA_external_memory
VkResult vkGetMemoryZirconHandleFUCHSIA(
    VkDevice                                    device,
    const VkMemoryGetZirconHandleInfoFUCHSIA*   pGetZirconHandleInfo,
    zx_handle_t*                                pZirconHandle);

* 
`device` is the [VkDevice](VkDevice.html).

* 
`pGetZirconHandleInfo` is a pointer to a
[VkMemoryGetZirconHandleInfoFUCHSIA](VkMemoryGetZirconHandleInfoFUCHSIA.html) structure.

* 
`pZirconHandle` is a pointer to a `zx_handle_t` which holds the
resulting Zircon handle.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryZirconHandleFUCHSIA-device-parameter) VUID-vkGetMemoryZirconHandleFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryZirconHandleFUCHSIA-pGetZirconHandleInfo-parameter) VUID-vkGetMemoryZirconHandleFUCHSIA-pGetZirconHandleInfo-parameter

 `pGetZirconHandleInfo` **must** be a valid pointer to a valid [VkMemoryGetZirconHandleInfoFUCHSIA](VkMemoryGetZirconHandleInfoFUCHSIA.html) structure

* 
[](#VUID-vkGetMemoryZirconHandleFUCHSIA-pZirconHandle-parameter) VUID-vkGetMemoryZirconHandleFUCHSIA-pZirconHandle-parameter

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

[VK_FUCHSIA_external_memory](VK_FUCHSIA_external_memory.html), [VkDevice](VkDevice.html), [VkMemoryGetZirconHandleInfoFUCHSIA](VkMemoryGetZirconHandleInfoFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryZirconHandleFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
