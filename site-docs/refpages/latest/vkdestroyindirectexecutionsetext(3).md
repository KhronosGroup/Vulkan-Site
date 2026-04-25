# vkDestroyIndirectExecutionSetEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyIndirectExecutionSetEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyIndirectExecutionSetEXT - Destroy an indirect execution set

Destroy an Indirect Execution Set by calling:

// Provided by VK_EXT_device_generated_commands
void vkDestroyIndirectExecutionSetEXT(
    VkDevice                                    device,
    VkIndirectExecutionSetEXT                   indirectExecutionSet,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that owns the indirect execution set.

* 
`indirectExecutionSet` is the indirect execution set to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-11025) VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-11025

All submitted commands that refer to `indirectExecutionSet` **must**
have completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-device-parameter) VUID-vkDestroyIndirectExecutionSetEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-parameter) VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-parameter

 If `indirectExecutionSet` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `indirectExecutionSet` **must** be a valid [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html) handle

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-pAllocator-parameter) VUID-vkDestroyIndirectExecutionSetEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-parent) VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-parent

 If `indirectExecutionSet` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectExecutionSet` **must** be externally synchronized

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkDestroyIndirectExecutionSetEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
