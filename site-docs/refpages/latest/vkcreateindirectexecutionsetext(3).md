# vkCreateIndirectExecutionSetEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateIndirectExecutionSetEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateIndirectExecutionSetEXT - Create an indirect execution set

Indirect Execution Sets are created by calling:

// Provided by VK_EXT_device_generated_commands
VkResult vkCreateIndirectExecutionSetEXT(
    VkDevice                                    device,
    const VkIndirectExecutionSetCreateInfoEXT*  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkIndirectExecutionSetEXT*                  pIndirectExecutionSet);

* 
`device` is the logical device that creates the indirect execution
set.

* 
`pCreateInfo` is a pointer to a
[VkIndirectExecutionSetCreateInfoEXT](VkIndirectExecutionSetCreateInfoEXT.html) structure containing
parameters affecting creation of the indirect execution set.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pIndirectExecutionSet` is a pointer to a
[VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html) handle in which the resulting indirect
execution set is returned.

Valid Usage

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-deviceGeneratedCommands-11013) VUID-vkCreateIndirectExecutionSetEXT-deviceGeneratedCommands-11013

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommands)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-device-parameter) VUID-vkCreateIndirectExecutionSetEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-pCreateInfo-parameter) VUID-vkCreateIndirectExecutionSetEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkIndirectExecutionSetCreateInfoEXT](VkIndirectExecutionSetCreateInfoEXT.html) structure

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-pAllocator-parameter) VUID-vkCreateIndirectExecutionSetEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-pIndirectExecutionSet-parameter) VUID-vkCreateIndirectExecutionSetEXT-pIndirectExecutionSet-parameter

 `pIndirectExecutionSet` **must** be a valid pointer to a [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html) handle

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-device-queuecount) VUID-vkCreateIndirectExecutionSetEXT-device-queuecount

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

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkIndirectExecutionSetCreateInfoEXT](VkIndirectExecutionSetCreateInfoEXT.html), [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkCreateIndirectExecutionSetEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
