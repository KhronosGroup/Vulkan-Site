# vkDestroyPrivateDataSlot(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyPrivateDataSlot.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyPrivateDataSlot - Destroy a private data slot

To destroy a private data slot, call:

// Provided by VK_VERSION_1_3
void vkDestroyPrivateDataSlot(
    VkDevice                                    device,
    VkPrivateDataSlot                           privateDataSlot,
    const VkAllocationCallbacks*                pAllocator);

// Provided by VK_EXT_private_data
// Equivalent to vkDestroyPrivateDataSlot
void vkDestroyPrivateDataSlotEXT(
    VkDevice                                    device,
    VkPrivateDataSlot                           privateDataSlot,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device associated with the creation of the
object(s) holding the private data slot.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`privateDataSlot` is the private data slot to destroy.

Valid Usage

* 
[](#VUID-vkDestroyPrivateDataSlot-privateDataSlot-04062) VUID-vkDestroyPrivateDataSlot-privateDataSlot-04062

If `VkAllocationCallbacks` were provided when `privateDataSlot`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPrivateDataSlot-privateDataSlot-04063) VUID-vkDestroyPrivateDataSlot-privateDataSlot-04063

If no `VkAllocationCallbacks` were provided when
`privateDataSlot` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPrivateDataSlot-device-parameter) VUID-vkDestroyPrivateDataSlot-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyPrivateDataSlot-privateDataSlot-parameter) VUID-vkDestroyPrivateDataSlot-privateDataSlot-parameter

 If `privateDataSlot` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `privateDataSlot` **must** be a valid [VkPrivateDataSlot](VkPrivateDataSlot.html) handle

* 
[](#VUID-vkDestroyPrivateDataSlot-pAllocator-parameter) VUID-vkDestroyPrivateDataSlot-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyPrivateDataSlot-privateDataSlot-parent) VUID-vkDestroyPrivateDataSlot-privateDataSlot-parent

 If `privateDataSlot` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `privateDataSlot` **must** be externally synchronized

[VK_EXT_private_data](VK_EXT_private_data.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPrivateDataSlot](VkPrivateDataSlot.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/private_data.html#vkDestroyPrivateDataSlot).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
