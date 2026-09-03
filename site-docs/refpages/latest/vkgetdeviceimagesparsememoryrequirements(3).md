# vkGetDeviceImageSparseMemoryRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceImageSparseMemoryRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceImageSparseMemoryRequirements - Query the memory requirements for a sparse image

To determine the sparse memory requirements for an image resource without
creating an object, call:

// Provided by VK_VERSION_1_3
void vkGetDeviceImageSparseMemoryRequirements(
    VkDevice                                    device,
    const VkDeviceImageMemoryRequirements*      pInfo,
    uint32_t*                                   pSparseMemoryRequirementCount,
    VkSparseImageMemoryRequirements2*           pSparseMemoryRequirements);

// Provided by VK_KHR_maintenance4
// Equivalent to vkGetDeviceImageSparseMemoryRequirements
void vkGetDeviceImageSparseMemoryRequirementsKHR(
    VkDevice                                    device,
    const VkDeviceImageMemoryRequirements*      pInfo,
    uint32_t*                                   pSparseMemoryRequirementCount,
    VkSparseImageMemoryRequirements2*           pSparseMemoryRequirements);

* 
`device` is the logical device intended to own the image.

* 
`pInfo` is a pointer to a [VkDeviceImageMemoryRequirements](VkDeviceImageMemoryRequirements.html)
structure containing parameters required for the memory requirements
query.

* 
`pSparseMemoryRequirementCount` is a pointer to an integer related
to the number of sparse memory requirements available or queried, as
described below.

* 
`pSparseMemoryRequirements` is either `NULL` or a pointer to an
array of `VkSparseImageMemoryRequirements2` structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceImageSparseMemoryRequirements-device-parameter) VUID-vkGetDeviceImageSparseMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceImageSparseMemoryRequirements-pInfo-parameter) VUID-vkGetDeviceImageSparseMemoryRequirements-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceImageMemoryRequirements](VkDeviceImageMemoryRequirements.html) structure

* 
[](#VUID-vkGetDeviceImageSparseMemoryRequirements-pSparseMemoryRequirementCount-parameter) VUID-vkGetDeviceImageSparseMemoryRequirements-pSparseMemoryRequirementCount-parameter

 `pSparseMemoryRequirementCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDeviceImageSparseMemoryRequirements-pSparseMemoryRequirements-parameter) VUID-vkGetDeviceImageSparseMemoryRequirements-pSparseMemoryRequirements-parameter

 If the value referenced by `pSparseMemoryRequirementCount` is not `0`, and `pSparseMemoryRequirements` is not `NULL`, `pSparseMemoryRequirements` **must** be a valid pointer to an array of `pSparseMemoryRequirementCount` [VkSparseImageMemoryRequirements2](VkSparseImageMemoryRequirements2.html) structures

[VK_KHR_maintenance4](VK_KHR_maintenance4.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkDevice](VkDevice.html), [VkDeviceImageMemoryRequirements](VkDeviceImageMemoryRequirements.html), [VkSparseImageMemoryRequirements2](VkSparseImageMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#vkGetDeviceImageSparseMemoryRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
