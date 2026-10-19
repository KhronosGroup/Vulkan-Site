# vkDestroyIndirectCommandsLayoutNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyIndirectCommandsLayoutNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyIndirectCommandsLayoutNV - Destroy an indirect commands layout

Indirect command layouts for `[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html)` are
destroyed by:

// Provided by VK_NV_device_generated_commands
void vkDestroyIndirectCommandsLayoutNV(
    VkDevice                                    device,
    VkIndirectCommandsLayoutNV                  indirectCommandsLayout,
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
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02938) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02938

All submitted commands that refer to `indirectCommandsLayout` **must**
have completed execution

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02939) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02939

If `VkAllocationCallbacks` were provided when
`indirectCommandsLayout` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02940) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02940

If no `VkAllocationCallbacks` were provided when
`indirectCommandsLayout` was created, `pAllocator` **must** be
`NULL`

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-deviceGeneratedCommands-02941) VUID-vkDestroyIndirectCommandsLayoutNV-deviceGeneratedCommands-02941

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-device-parameter) VUID-vkDestroyIndirectCommandsLayoutNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-parameter) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-parameter

 If `indirectCommandsLayout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html) handle

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-pAllocator-parameter) VUID-vkDestroyIndirectCommandsLayoutNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-parent) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-parent

 If `indirectCommandsLayout` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectCommandsLayout` **must** be externally synchronized

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkDestroyIndirectCommandsLayoutNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
