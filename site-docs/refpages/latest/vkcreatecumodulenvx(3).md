# vkCreateCuModuleNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateCuModuleNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateCuModuleNVX - Stub description of vkCreateCuModuleNVX

There is currently no specification language written for this command.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_NVX_binary_import
VkResult vkCreateCuModuleNVX(
    VkDevice                                    device,
    const VkCuModuleCreateInfoNVX*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkCuModuleNVX*                              pModule);

Valid Usage (Implicit)

* 
[](#VUID-vkCreateCuModuleNVX-device-parameter) VUID-vkCreateCuModuleNVX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateCuModuleNVX-pCreateInfo-parameter) VUID-vkCreateCuModuleNVX-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkCuModuleCreateInfoNVX](VkCuModuleCreateInfoNVX.html) structure

* 
[](#VUID-vkCreateCuModuleNVX-pAllocator-parameter) VUID-vkCreateCuModuleNVX-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateCuModuleNVX-pModule-parameter) VUID-vkCreateCuModuleNVX-pModule-parameter

 `pModule` **must** be a valid pointer to a [VkCuModuleNVX](VkCuModuleNVX.html) handle

* 
[](#VUID-vkCreateCuModuleNVX-device-queuecount) VUID-vkCreateCuModuleNVX-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NVX_binary_import](VK_NVX_binary_import.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCuModuleCreateInfoNVX](VkCuModuleCreateInfoNVX.html), [VkCuModuleNVX](VkCuModuleNVX.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkCreateCuModuleNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
