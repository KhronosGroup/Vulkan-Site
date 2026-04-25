# vkBindAccelerationStructureMemoryNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBindAccelerationStructureMemoryNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBindAccelerationStructureMemoryNV - Bind acceleration structure memory

To attach memory to one or more acceleration structures at a time, call:

// Provided by VK_NV_ray_tracing
VkResult vkBindAccelerationStructureMemoryNV(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindAccelerationStructureMemoryInfoNV* pBindInfos);

* 
`device` is the logical device that owns the acceleration structures
and memory.

* 
`bindInfoCount` is the number of elements in `pBindInfos`.

* 
`pBindInfos` is a pointer to an array of
[VkBindAccelerationStructureMemoryInfoNV](VkBindAccelerationStructureMemoryInfoNV.html) structures describing
acceleration structures and memory to bind.

Valid Usage (Implicit)

* 
[](#VUID-vkBindAccelerationStructureMemoryNV-device-parameter) VUID-vkBindAccelerationStructureMemoryNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBindAccelerationStructureMemoryNV-pBindInfos-parameter) VUID-vkBindAccelerationStructureMemoryNV-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindAccelerationStructureMemoryInfoNV](VkBindAccelerationStructureMemoryInfoNV.html) structures

* 
[](#VUID-vkBindAccelerationStructureMemoryNV-bindInfoCount-arraylength) VUID-vkBindAccelerationStructureMemoryNV-bindInfoCount-arraylength

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

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkBindAccelerationStructureMemoryInfoNV](VkBindAccelerationStructureMemoryInfoNV.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkBindAccelerationStructureMemoryNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
