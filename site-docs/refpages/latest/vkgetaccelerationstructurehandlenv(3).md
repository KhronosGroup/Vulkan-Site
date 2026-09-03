# vkGetAccelerationStructureHandleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetAccelerationStructureHandleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetAccelerationStructureHandleNV - Get opaque acceleration structure handle

To allow constructing geometry instances with device code if desired, we
need to be able to query an opaque handle for an acceleration structure.
This handle is a value of 8 bytes.
To get this handle, call:

// Provided by VK_NV_ray_tracing
VkResult vkGetAccelerationStructureHandleNV(
    VkDevice                                    device,
    VkAccelerationStructureNV                   accelerationStructure,
    size_t                                      dataSize,
    void*                                       pData);

* 
`device` is the logical device that owns the acceleration
structures.

* 
`accelerationStructure` is the acceleration structure.

* 
`dataSize` is the size in bytes of the buffer pointed to by
`pData`.

* 
`pData` is a pointer to an application-allocated buffer where the
results will be written.

Valid Usage

* 
[](#VUID-vkGetAccelerationStructureHandleNV-dataSize-02240) VUID-vkGetAccelerationStructureHandleNV-dataSize-02240

`dataSize` **must** be large enough to contain the result of the query,
as described above

* 
[](#VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-02787) VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-02787

`accelerationStructure` **must** be bound completely and contiguously
to a single `VkDeviceMemory` object via
[vkBindAccelerationStructureMemoryNV](vkBindAccelerationStructureMemoryNV.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureHandleNV-device-parameter) VUID-vkGetAccelerationStructureHandleNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-parameter) VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

* 
[](#VUID-vkGetAccelerationStructureHandleNV-pData-parameter) VUID-vkGetAccelerationStructureHandleNV-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetAccelerationStructureHandleNV-dataSize-arraylength) VUID-vkGetAccelerationStructureHandleNV-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-parent) VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-parent

 `accelerationStructure` **must** have been created, allocated, or retrieved from `device`

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

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetAccelerationStructureHandleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
