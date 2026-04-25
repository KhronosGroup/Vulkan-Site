# vkDestroyRenderPass(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyRenderPass.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyRenderPass - Destroy a render pass object

To destroy a render pass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkDestroyRenderPass(
    VkDevice                                    device,
    VkRenderPass                                renderPass,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the render pass.

* 
`renderPass` is the handle of the render pass to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyRenderPass-renderPass-00873) VUID-vkDestroyRenderPass-renderPass-00873

All submitted commands that refer to `renderPass` **must** have
completed execution

* 
[](#VUID-vkDestroyRenderPass-renderPass-00874) VUID-vkDestroyRenderPass-renderPass-00874

If `VkAllocationCallbacks` were provided when `renderPass` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyRenderPass-renderPass-00875) VUID-vkDestroyRenderPass-renderPass-00875

If no `VkAllocationCallbacks` were provided when `renderPass`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyRenderPass-device-parameter) VUID-vkDestroyRenderPass-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyRenderPass-renderPass-parameter) VUID-vkDestroyRenderPass-renderPass-parameter

 If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `renderPass` **must** be a valid [VkRenderPass](VkRenderPass.html) handle

* 
[](#VUID-vkDestroyRenderPass-pAllocator-parameter) VUID-vkDestroyRenderPass-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyRenderPass-renderPass-parent) VUID-vkDestroyRenderPass-renderPass-parent

 If `renderPass` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `renderPass` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkRenderPass](VkRenderPass.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkDestroyRenderPass).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
