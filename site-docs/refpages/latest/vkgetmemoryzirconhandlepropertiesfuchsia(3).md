# vkGetMemoryZirconHandlePropertiesFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryZirconHandlePropertiesFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryZirconHandlePropertiesFUCHSIA - Get a Zircon handle properties for an external memory object

To obtain the memoryTypeIndex for the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure,
call `vkGetMemoryZirconHandlePropertiesFUCHSIA`:

// Provided by VK_FUCHSIA_external_memory
VkResult vkGetMemoryZirconHandlePropertiesFUCHSIA(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    zx_handle_t                                 zirconHandle,
    VkMemoryZirconHandlePropertiesFUCHSIA*      pMemoryZirconHandleProperties);

* 
`device` is the [VkDevice](VkDevice.html).

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of `zirconHandle`

* 
`zirconHandle` is a `zx_handle_t` (Zircon) handle to the external
resource.

* 
`pMemoryZirconHandleProperties` is a pointer to a
[VkMemoryZirconHandlePropertiesFUCHSIA](VkMemoryZirconHandlePropertiesFUCHSIA.html) structure in which the
result will be stored.

Valid Usage

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-handleType-04773) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-handleType-04773

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](VkExternalMemoryHandleTypeFlagBits.html)

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-zirconHandle-04774) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-zirconHandle-04774

`zirconHandle` **must** reference a valid VMO

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-device-parameter) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-handleType-parameter) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-pMemoryZirconHandleProperties-parameter) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-pMemoryZirconHandleProperties-parameter

 `pMemoryZirconHandleProperties` **must** be a valid pointer to a [VkMemoryZirconHandlePropertiesFUCHSIA](VkMemoryZirconHandlePropertiesFUCHSIA.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_FUCHSIA_external_memory](VK_FUCHSIA_external_memory.html), [VkDevice](VkDevice.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkMemoryZirconHandlePropertiesFUCHSIA](VkMemoryZirconHandlePropertiesFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryZirconHandlePropertiesFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
