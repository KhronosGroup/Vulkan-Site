# vkGetMemoryHostPointerPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryHostPointerPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryHostPointerPropertiesEXT - Get properties of external memory host pointer

To determine the correct parameters to use when importing host pointers,
call:

// Provided by VK_EXT_external_memory_host
VkResult vkGetMemoryHostPointerPropertiesEXT(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    const void*                                 pHostPointer,
    VkMemoryHostPointerPropertiesEXT*           pMemoryHostPointerProperties);

* 
`device` is the logical device that will be importing
`pHostPointer`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of the handle `pHostPointer`.

* 
`pHostPointer` is the host pointer to import from.

* 
`pMemoryHostPointerProperties` is a pointer to a
[VkMemoryHostPointerPropertiesEXT](VkMemoryHostPointerPropertiesEXT.html) structure in which the host
pointer properties are returned.

Valid Usage

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01752) VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01752

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-pHostPointer-01753) VUID-vkGetMemoryHostPointerPropertiesEXT-pHostPointer-01753

`pHostPointer` **must** be a pointer aligned to an integer multiple of
`VkPhysicalDeviceExternalMemoryHostPropertiesEXT`::`minImportedHostPointerAlignment`

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01754) VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01754

If `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html),
`pHostPointer` **must** be a pointer to host memory

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01755) VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01755

If `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html),
`pHostPointer` **must** be a pointer to host mapped foreign memory

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-device-parameter) VUID-vkGetMemoryHostPointerPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-parameter) VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-pHostPointer-parameter) VUID-vkGetMemoryHostPointerPropertiesEXT-pHostPointer-parameter

 `pHostPointer` **must** be a pointer value

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-pMemoryHostPointerProperties-parameter) VUID-vkGetMemoryHostPointerPropertiesEXT-pMemoryHostPointerProperties-parameter

 `pMemoryHostPointerProperties` **must** be a valid pointer to a [VkMemoryHostPointerPropertiesEXT](VkMemoryHostPointerPropertiesEXT.html) structure

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

[VK_EXT_external_memory_host](VK_EXT_external_memory_host.html), [VkDevice](VkDevice.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkMemoryHostPointerPropertiesEXT](VkMemoryHostPointerPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryHostPointerPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
