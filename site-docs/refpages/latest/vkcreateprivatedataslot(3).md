# vkCreatePrivateDataSlot(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreatePrivateDataSlot.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreatePrivateDataSlot - Create a slot for private data storage

To create a private data slot, call:

// Provided by VK_VERSION_1_3
VkResult vkCreatePrivateDataSlot(
    VkDevice                                    device,
    const VkPrivateDataSlotCreateInfo*          pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPrivateDataSlot*                          pPrivateDataSlot);

// Provided by VK_EXT_private_data
// Equivalent to vkCreatePrivateDataSlot
VkResult vkCreatePrivateDataSlotEXT(
    VkDevice                                    device,
    const VkPrivateDataSlotCreateInfo*          pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPrivateDataSlot*                          pPrivateDataSlot);

* 
`device` is the logical device associated with the creation of the
object(s) holding the private data slot.

* 
`pCreateInfo` is a pointer to a [VkPrivateDataSlotCreateInfo](VkPrivateDataSlotCreateInfo.html)

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pPrivateDataSlot` is a pointer to a [VkPrivateDataSlot](VkPrivateDataSlot.html) handle
in which the resulting private data slot is returned

Valid Usage

* 
[](#VUID-vkCreatePrivateDataSlot-privateData-04564) VUID-vkCreatePrivateDataSlot-privateData-04564

The [`privateData`](../../../../spec/latest/chapters/features.html#features-privateData) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreatePrivateDataSlot-device-parameter) VUID-vkCreatePrivateDataSlot-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreatePrivateDataSlot-pCreateInfo-parameter) VUID-vkCreatePrivateDataSlot-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkPrivateDataSlotCreateInfo](VkPrivateDataSlotCreateInfo.html) structure

* 
[](#VUID-vkCreatePrivateDataSlot-pAllocator-parameter) VUID-vkCreatePrivateDataSlot-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreatePrivateDataSlot-pPrivateDataSlot-parameter) VUID-vkCreatePrivateDataSlot-pPrivateDataSlot-parameter

 `pPrivateDataSlot` **must** be a valid pointer to a [VkPrivateDataSlot](VkPrivateDataSlot.html) handle

* 
[](#VUID-vkCreatePrivateDataSlot-device-queuecount) VUID-vkCreatePrivateDataSlot-device-queuecount

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

[VK_EXT_private_data](VK_EXT_private_data.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPrivateDataSlot](VkPrivateDataSlot.html), [VkPrivateDataSlotCreateInfo](VkPrivateDataSlotCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/private_data.html#vkCreatePrivateDataSlot).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
