# vkCreateAccelerationStructureNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateAccelerationStructureNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateAccelerationStructureNV - Create a new acceleration structure object

To create acceleration structures, call:

// Provided by VK_NV_ray_tracing
VkResult vkCreateAccelerationStructureNV(
    VkDevice                                    device,
    const VkAccelerationStructureCreateInfoNV*  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkAccelerationStructureNV*                  pAccelerationStructure);

* 
`device` is the logical device that creates the buffer object.

* 
`pCreateInfo` is a pointer to a
[VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html) structure containing
parameters affecting creation of the acceleration structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pAccelerationStructure` is a pointer to a
[VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle in which the resulting
acceleration structure object is returned.

Similarly to other objects in Vulkan, the acceleration structure creation
merely creates an object with a specific “shape” as specified by the
information in [VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html) and `compactedSize`
in `pCreateInfo`.

Once memory has been bound to the acceleration structure using
[vkBindAccelerationStructureMemoryNV](vkBindAccelerationStructureMemoryNV.html), that memory is populated by calls
to [vkCmdBuildAccelerationStructureNV](vkCmdBuildAccelerationStructureNV.html) and
[vkCmdCopyAccelerationStructureNV](vkCmdCopyAccelerationStructureNV.html).

Acceleration structure creation uses the count and type information from the
geometries, but does not use the data references in the structures.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateAccelerationStructureNV-device-parameter) VUID-vkCreateAccelerationStructureNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateAccelerationStructureNV-pCreateInfo-parameter) VUID-vkCreateAccelerationStructureNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html) structure

* 
[](#VUID-vkCreateAccelerationStructureNV-pAllocator-parameter) VUID-vkCreateAccelerationStructureNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateAccelerationStructureNV-pAccelerationStructure-parameter) VUID-vkCreateAccelerationStructureNV-pAccelerationStructure-parameter

 `pAccelerationStructure` **must** be a valid pointer to a [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

* 
[](#VUID-vkCreateAccelerationStructureNV-device-queuecount) VUID-vkCreateAccelerationStructureNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateAccelerationStructureNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
