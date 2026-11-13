# vkDestroySampler(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroySampler.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroySampler - Destroy a sampler object

To destroy a sampler, call:

// Provided by VK_VERSION_1_0
void vkDestroySampler(
    VkDevice                                    device,
    VkSampler                                   sampler,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the sampler.

* 
`sampler` is the sampler to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroySampler-sampler-01082) VUID-vkDestroySampler-sampler-01082

All submitted commands that refer to `sampler` **must** have completed
execution

* 
[](#VUID-vkDestroySampler-sampler-01083) VUID-vkDestroySampler-sampler-01083

If `VkAllocationCallbacks` were provided when `sampler` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroySampler-sampler-01084) VUID-vkDestroySampler-sampler-01084

If no `VkAllocationCallbacks` were provided when `sampler` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySampler-device-parameter) VUID-vkDestroySampler-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroySampler-sampler-parameter) VUID-vkDestroySampler-sampler-parameter

 If `sampler` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `sampler` **must** be a valid [VkSampler](VkSampler.html) handle

* 
[](#VUID-vkDestroySampler-pAllocator-parameter) VUID-vkDestroySampler-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroySampler-sampler-parent) VUID-vkDestroySampler-sampler-parent

 If `sampler` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `sampler` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkSampler](VkSampler.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#vkDestroySampler).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
