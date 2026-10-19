# vkGetMemoryMetalHandlePropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryMetalHandlePropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryMetalHandlePropertiesEXT - Get Properties of External Memory Metal Handles

Metal memory handles compatible with Vulkan **may** also be created by
non-Vulkan APIs using methods beyond the scope of this specification.
To determine the correct parameters to use when importing such handles,
call:

// Provided by VK_EXT_external_memory_metal
VkResult vkGetMemoryMetalHandlePropertiesEXT(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    const void*                                 pHandle,
    VkMemoryMetalHandlePropertiesEXT*           pMemoryMetalHandleProperties);

* 
`device` is the logical device that will be importing `pHandle`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of the handle `pHandle`.

* 
`pHandle` is the handle which will be imported.

* 
`pMemoryMetalHandleProperties` is a pointer to a
[VkMemoryMetalHandlePropertiesEXT](VkMemoryMetalHandlePropertiesEXT.html) structure in which properties of
`pHandle` are returned.

Valid Usage

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-handle-10416) VUID-vkGetMemoryMetalHandlePropertiesEXT-handle-10416

`pHandle` **must** point to a valid id, id or
id

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-handleType-10417) VUID-vkGetMemoryMetalHandlePropertiesEXT-handleType-10417

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-device-parameter) VUID-vkGetMemoryMetalHandlePropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-handleType-parameter) VUID-vkGetMemoryMetalHandlePropertiesEXT-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-pHandle-parameter) VUID-vkGetMemoryMetalHandlePropertiesEXT-pHandle-parameter

 `pHandle` **must** be a pointer value

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-pMemoryMetalHandleProperties-parameter) VUID-vkGetMemoryMetalHandlePropertiesEXT-pMemoryMetalHandleProperties-parameter

 `pMemoryMetalHandleProperties` **must** be a valid pointer to a [VkMemoryMetalHandlePropertiesEXT](VkMemoryMetalHandlePropertiesEXT.html) structure

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

[VK_EXT_external_memory_metal](VK_EXT_external_memory_metal.html), [VkDevice](VkDevice.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkMemoryMetalHandlePropertiesEXT](VkMemoryMetalHandlePropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryMetalHandlePropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
