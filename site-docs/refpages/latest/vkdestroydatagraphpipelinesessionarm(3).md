# vkDestroyDataGraphPipelineSessionARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyDataGraphPipelineSessionARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyDataGraphPipelineSessionARM - Destroy a data graph pipeline session object

To destroy a data graph pipeline session, call:

// Provided by VK_ARM_data_graph
void vkDestroyDataGraphPipelineSessionARM(
    VkDevice                                    device,
    VkDataGraphPipelineSessionARM               session,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the data graph pipeline
session.

* 
`session` is the handle of the data graph pipeline session to
destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-09793) VUID-vkDestroyDataGraphPipelineSessionARM-session-09793

All submitted commands that refer to `session` **must** have completed
execution

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-09794) VUID-vkDestroyDataGraphPipelineSessionARM-session-09794

If `VkAllocationCallbacks` were provided when `session` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-09795) VUID-vkDestroyDataGraphPipelineSessionARM-session-09795

If no `VkAllocationCallbacks` were provided when `session` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-device-parameter) VUID-vkDestroyDataGraphPipelineSessionARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-parameter) VUID-vkDestroyDataGraphPipelineSessionARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html) handle

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-pAllocator-parameter) VUID-vkDestroyDataGraphPipelineSessionARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-parent) VUID-vkDestroyDataGraphPipelineSessionARM-session-parent

 `session` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `session` **must** be externally synchronized

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkDestroyDataGraphPipelineSessionARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
