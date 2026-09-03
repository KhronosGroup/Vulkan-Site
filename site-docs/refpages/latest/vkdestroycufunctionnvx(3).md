# vkDestroyCuFunctionNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyCuFunctionNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyCuFunctionNVX - Stub description of vkDestroyCuFunctionNVX

There is currently no specification language written for this command.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_NVX_binary_import
void vkDestroyCuFunctionNVX(
    VkDevice                                    device,
    VkCuFunctionNVX                             function,
    const VkAllocationCallbacks*                pAllocator);

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyCuFunctionNVX-device-parameter) VUID-vkDestroyCuFunctionNVX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyCuFunctionNVX-function-parameter) VUID-vkDestroyCuFunctionNVX-function-parameter

 `function` **must** be a valid [VkCuFunctionNVX](VkCuFunctionNVX.html) handle

* 
[](#VUID-vkDestroyCuFunctionNVX-pAllocator-parameter) VUID-vkDestroyCuFunctionNVX-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyCuFunctionNVX-function-parent) VUID-vkDestroyCuFunctionNVX-function-parent

 `function` **must** have been created, allocated, or retrieved from `device`

[VK_NVX_binary_import](VK_NVX_binary_import.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCuFunctionNVX](VkCuFunctionNVX.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkDestroyCuFunctionNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
