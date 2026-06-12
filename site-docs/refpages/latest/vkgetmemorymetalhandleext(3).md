# vkGetMemoryMetalHandleEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryMetalHandleEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryMetalHandleEXT - Get a Metal handle for a memory object

To export a Metal handle representing the payload of a Vulkan device memory
object, call:

// Provided by VK_EXT_external_memory_metal
VkResult vkGetMemoryMetalHandleEXT(
    VkDevice                                    device,
    const VkMemoryGetMetalHandleInfoEXT*        pGetMetalHandleInfo,
    void**                                      pHandle);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pGetMetalHandleInfo` is a pointer to a
[VkMemoryGetMetalHandleInfoEXT](VkMemoryGetMetalHandleInfoEXT.html) structure containing parameters of
the export operation.

* 
`pHandle` will return the Metal handle representing the payload of
the device memory object.

Unless the app retains the handle object returned by the call, the lifespan
will be the same as the associated `VkDeviceMemory`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryMetalHandleEXT-device-parameter) VUID-vkGetMemoryMetalHandleEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryMetalHandleEXT-pGetMetalHandleInfo-parameter) VUID-vkGetMemoryMetalHandleEXT-pGetMetalHandleInfo-parameter

 `pGetMetalHandleInfo` **must** be a valid pointer to a valid [VkMemoryGetMetalHandleInfoEXT](VkMemoryGetMetalHandleInfoEXT.html) structure

* 
[](#VUID-vkGetMemoryMetalHandleEXT-pHandle-parameter) VUID-vkGetMemoryMetalHandleEXT-pHandle-parameter

 `pHandle` **must** be a valid pointer to a pointer value

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

[VK_EXT_external_memory_metal](VK_EXT_external_memory_metal.html), [VkDevice](VkDevice.html), [VkMemoryGetMetalHandleInfoEXT](VkMemoryGetMetalHandleInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryMetalHandleEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
