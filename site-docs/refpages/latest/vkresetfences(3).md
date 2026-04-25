# vkResetFences(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkResetFences.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkResetFences - Resets one or more fence objects

To set the state of fences to unsignaled from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkResetFences(
    VkDevice                                    device,
    uint32_t                                    fenceCount,
    const VkFence*                              pFences);

* 
`device` is the logical device that owns the fences.

* 
`fenceCount` is the number of fences to reset.

* 
`pFences` is a pointer to an array of fence handles to reset.

If any member of `pFences` currently has its
[payload imported](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-importing) with temporary
permanence, that fence’s prior permanent payload is first restored.
The remaining operations described therefore operate on the restored
payload.

When [vkResetFences](#) is executed on the host, it defines a *fence
unsignal operation* for each fence, which resets the fence to the unsignaled
state.

If any member of `pFences` is already in the unsignaled state when
[vkResetFences](#) is executed, then [vkResetFences](#) has no effect on
that fence.

Valid Usage

* 
[](#VUID-vkResetFences-pFences-01123) VUID-vkResetFences-pFences-01123

Each element of `pFences` **must** not be currently associated with any
queue command that has not yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkResetFences-device-parameter) VUID-vkResetFences-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkResetFences-pFences-parameter) VUID-vkResetFences-pFences-parameter

 `pFences` **must** be a valid pointer to an array of `fenceCount` valid [VkFence](VkFence.html) handles

* 
[](#VUID-vkResetFences-fenceCount-arraylength) VUID-vkResetFences-fenceCount-arraylength

 `fenceCount` **must** be greater than `0`

* 
[](#VUID-vkResetFences-pFences-parent) VUID-vkResetFences-pFences-parent

 Each element of `pFences` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to each member of `pFences` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkFence](VkFence.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkResetFences).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
