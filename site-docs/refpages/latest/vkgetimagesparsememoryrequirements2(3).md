# vkGetImageSparseMemoryRequirements2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageSparseMemoryRequirements2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageSparseMemoryRequirements2 - Query the memory requirements for a sparse image

To query sparse memory requirements for an image, call:

// Provided by VK_VERSION_1_1
void vkGetImageSparseMemoryRequirements2(
    VkDevice                                    device,
    const VkImageSparseMemoryRequirementsInfo2* pInfo,
    uint32_t*                                   pSparseMemoryRequirementCount,
    VkSparseImageMemoryRequirements2*           pSparseMemoryRequirements);

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to vkGetImageSparseMemoryRequirements2
void vkGetImageSparseMemoryRequirements2KHR(
    VkDevice                                    device,
    const VkImageSparseMemoryRequirementsInfo2* pInfo,
    uint32_t*                                   pSparseMemoryRequirementCount,
    VkSparseImageMemoryRequirements2*           pSparseMemoryRequirements);

* 
`device` is the logical device that owns the image.

* 
`pInfo` is a pointer to a [VkImageSparseMemoryRequirementsInfo2](VkImageSparseMemoryRequirementsInfo2.html)
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
[](#VUID-vkGetImageSparseMemoryRequirements2-device-parameter) VUID-vkGetImageSparseMemoryRequirements2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageSparseMemoryRequirements2-pInfo-parameter) VUID-vkGetImageSparseMemoryRequirements2-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageSparseMemoryRequirementsInfo2](VkImageSparseMemoryRequirementsInfo2.html) structure

* 
[](#VUID-vkGetImageSparseMemoryRequirements2-pSparseMemoryRequirementCount-parameter) VUID-vkGetImageSparseMemoryRequirements2-pSparseMemoryRequirementCount-parameter

 `pSparseMemoryRequirementCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetImageSparseMemoryRequirements2-pSparseMemoryRequirements-parameter) VUID-vkGetImageSparseMemoryRequirements2-pSparseMemoryRequirements-parameter

 If the value referenced by `pSparseMemoryRequirementCount` is not `0`, and `pSparseMemoryRequirements` is not `NULL`, `pSparseMemoryRequirements` **must** be a valid pointer to an array of `pSparseMemoryRequirementCount` [VkSparseImageMemoryRequirements2](VkSparseImageMemoryRequirements2.html) structures

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDevice](VkDevice.html), [VkImageSparseMemoryRequirementsInfo2](VkImageSparseMemoryRequirementsInfo2.html), [VkSparseImageMemoryRequirements2](VkSparseImageMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#vkGetImageSparseMemoryRequirements2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
