# vkCreateIndirectCommandsLayoutEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateIndirectCommandsLayoutEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateIndirectCommandsLayoutEXT - Create an indirect command layout object

Indirect command layouts for `[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html)` are
created by:

// Provided by VK_EXT_device_generated_commands
VkResult vkCreateIndirectCommandsLayoutEXT(
    VkDevice                                    device,
    const VkIndirectCommandsLayoutCreateInfoEXT* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkIndirectCommandsLayoutEXT*                pIndirectCommandsLayout);

* 
`device` is the logical device that creates the indirect command
layout.

* 
`pCreateInfo` is a pointer to a
[VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html) structure containing
parameters affecting creation of the indirect command layout.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pIndirectCommandsLayout` is a pointer to a
`VkIndirectCommandsLayoutEXT` handle in which the resulting indirect
command layout is returned.

Valid Usage

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-deviceGeneratedCommands-11089) VUID-vkCreateIndirectCommandsLayoutEXT-deviceGeneratedCommands-11089

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommands)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-device-parameter) VUID-vkCreateIndirectCommandsLayoutEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-pCreateInfo-parameter) VUID-vkCreateIndirectCommandsLayoutEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html) structure

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-pAllocator-parameter) VUID-vkCreateIndirectCommandsLayoutEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-pIndirectCommandsLayout-parameter) VUID-vkCreateIndirectCommandsLayoutEXT-pIndirectCommandsLayout-parameter

 `pIndirectCommandsLayout` **must** be a valid pointer to a [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html) handle

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-device-queuecount) VUID-vkCreateIndirectCommandsLayoutEXT-device-queuecount

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

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html), [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkCreateIndirectCommandsLayoutEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
