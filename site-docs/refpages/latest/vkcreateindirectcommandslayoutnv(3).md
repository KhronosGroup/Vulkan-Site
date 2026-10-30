# vkCreateIndirectCommandsLayoutNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateIndirectCommandsLayoutNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateIndirectCommandsLayoutNV - Create an indirect command layout object

Indirect command layouts for `[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html)` are
created by:

// Provided by VK_NV_device_generated_commands
VkResult vkCreateIndirectCommandsLayoutNV(
    VkDevice                                    device,
    const VkIndirectCommandsLayoutCreateInfoNV* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkIndirectCommandsLayoutNV*                 pIndirectCommandsLayout);

* 
`device` is the logical device that creates the indirect command
layout.

* 
`pCreateInfo` is a pointer to a
[VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html) structure containing
parameters affecting creation of the indirect command layout.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pIndirectCommandsLayout` is a pointer to a
`VkIndirectCommandsLayoutNV` handle in which the resulting indirect
command layout is returned.

Valid Usage

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-deviceGeneratedCommands-02929) VUID-vkCreateIndirectCommandsLayoutNV-deviceGeneratedCommands-02929

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-device-parameter) VUID-vkCreateIndirectCommandsLayoutNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-pCreateInfo-parameter) VUID-vkCreateIndirectCommandsLayoutNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html) structure

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-pAllocator-parameter) VUID-vkCreateIndirectCommandsLayoutNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-pIndirectCommandsLayout-parameter) VUID-vkCreateIndirectCommandsLayoutNV-pIndirectCommandsLayout-parameter

 `pIndirectCommandsLayout` **must** be a valid pointer to a [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html) handle

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-device-queuecount) VUID-vkCreateIndirectCommandsLayoutNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html), [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkCreateIndirectCommandsLayoutNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
