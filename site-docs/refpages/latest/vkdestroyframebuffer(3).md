# vkDestroyFramebuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyFramebuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyFramebuffer - Destroy a framebuffer object

To destroy a framebuffer, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkDestroyFramebuffer(
    VkDevice                                    device,
    VkFramebuffer                               framebuffer,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the framebuffer.

* 
`framebuffer` is the handle of the framebuffer to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-00892) VUID-vkDestroyFramebuffer-framebuffer-00892

All submitted commands that refer to `framebuffer` **must** have
completed execution

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-00893) VUID-vkDestroyFramebuffer-framebuffer-00893

If `VkAllocationCallbacks` were provided when `framebuffer` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-00894) VUID-vkDestroyFramebuffer-framebuffer-00894

If no `VkAllocationCallbacks` were provided when `framebuffer`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyFramebuffer-device-parameter) VUID-vkDestroyFramebuffer-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-parameter) VUID-vkDestroyFramebuffer-framebuffer-parameter

 If `framebuffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `framebuffer` **must** be a valid [VkFramebuffer](VkFramebuffer.html) handle

* 
[](#VUID-vkDestroyFramebuffer-pAllocator-parameter) VUID-vkDestroyFramebuffer-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-parent) VUID-vkDestroyFramebuffer-framebuffer-parent

 If `framebuffer` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `framebuffer` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkFramebuffer](VkFramebuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkDestroyFramebuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
