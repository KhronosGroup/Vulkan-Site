# vkBindTensorMemoryARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBindTensorMemoryARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBindTensorMemoryARM - Bind device memory to tensor objects

To attach memory to tensor objects call:

// Provided by VK_ARM_tensors
VkResult vkBindTensorMemoryARM(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindTensorMemoryInfoARM*            pBindInfos);

* 
`device` is the logical device that owns the buffers and memory.

* 
`bindInfoCount` is the number of elements in `pBindInfos`.

* 
`pBindInfos` is a pointer to an array of structures of type
[VkBindTensorMemoryInfoARM](VkBindTensorMemoryInfoARM.html), describing tensors and memory to bind.

On some implementations, it **may** be more efficient to batch memory bindings
into a single command.

Valid Usage (Implicit)

* 
[](#VUID-vkBindTensorMemoryARM-device-parameter) VUID-vkBindTensorMemoryARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBindTensorMemoryARM-pBindInfos-parameter) VUID-vkBindTensorMemoryARM-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindTensorMemoryInfoARM](VkBindTensorMemoryInfoARM.html) structures

* 
[](#VUID-vkBindTensorMemoryARM-bindInfoCount-arraylength) VUID-vkBindTensorMemoryARM-bindInfoCount-arraylength

 `bindInfoCount` **must** be greater than `0`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkBindTensorMemoryInfoARM](VkBindTensorMemoryInfoARM.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkBindTensorMemoryARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
