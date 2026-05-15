# vkDestroyIndirectCommandsLayoutEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyIndirectCommandsLayoutEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyIndirectCommandsLayoutEXT - Destroy an indirect commands layout

Indirect command layouts for `[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html)` are
destroyed by:

// Provided by VK_EXT_device_generated_commands
void vkDestroyIndirectCommandsLayoutEXT(
    VkDevice                                    device,
    VkIndirectCommandsLayoutEXT                 indirectCommandsLayout,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the layout.

* 
`indirectCommandsLayout` is the layout to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11114) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11114

All submitted commands that refer to `indirectCommandsLayout` **must**
have completed execution

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11115) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11115

If `VkAllocationCallbacks` were provided when
`indirectCommandsLayout` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11116) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11116

If no `VkAllocationCallbacks` were provided when
`indirectCommandsLayout` was created, `pAllocator` **must** be
`NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-device-parameter) VUID-vkDestroyIndirectCommandsLayoutEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-parameter) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-parameter

 If `indirectCommandsLayout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html) handle

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-pAllocator-parameter) VUID-vkDestroyIndirectCommandsLayoutEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-parent) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-parent

 If `indirectCommandsLayout` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectCommandsLayout` **must** be externally synchronized

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkDestroyIndirectCommandsLayoutEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
