# vkDestroyMicromapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyMicromapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyMicromapEXT - Destroy a micromap object

To destroy a micromap, call:

// Provided by VK_EXT_opacity_micromap
void vkDestroyMicromapEXT(
    VkDevice                                    device,
    VkMicromapEXT                               micromap,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the micromap.

* 
`micromap` is the micromap to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyMicromapEXT-micromap-10382) VUID-vkDestroyMicromapEXT-micromap-10382

The [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature **must** be enabled

* 
[](#VUID-vkDestroyMicromapEXT-micromap-07441) VUID-vkDestroyMicromapEXT-micromap-07441

All submitted commands that refer to `micromap` **must** have completed
execution

* 
[](#VUID-vkDestroyMicromapEXT-micromap-07442) VUID-vkDestroyMicromapEXT-micromap-07442

If `VkAllocationCallbacks` were provided when `micromap` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyMicromapEXT-micromap-07443) VUID-vkDestroyMicromapEXT-micromap-07443

If no `VkAllocationCallbacks` were provided when `micromap` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyMicromapEXT-device-parameter) VUID-vkDestroyMicromapEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyMicromapEXT-micromap-parameter) VUID-vkDestroyMicromapEXT-micromap-parameter

 If `micromap` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `micromap` **must** be a valid [VkMicromapEXT](VkMicromapEXT.html) handle

* 
[](#VUID-vkDestroyMicromapEXT-pAllocator-parameter) VUID-vkDestroyMicromapEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyMicromapEXT-micromap-parent) VUID-vkDestroyMicromapEXT-micromap-parent

 If `micromap` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `micromap` **must** be externally synchronized

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkMicromapEXT](VkMicromapEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyMicromapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
