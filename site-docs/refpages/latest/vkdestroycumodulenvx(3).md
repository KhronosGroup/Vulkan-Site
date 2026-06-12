# vkDestroyCuModuleNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyCuModuleNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyCuModuleNVX - Stub description of vkDestroyCuModuleNVX

There is currently no specification language written for this command.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_NVX_binary_import
void vkDestroyCuModuleNVX(
    VkDevice                                    device,
    VkCuModuleNVX                               module,
    const VkAllocationCallbacks*                pAllocator);

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyCuModuleNVX-device-parameter) VUID-vkDestroyCuModuleNVX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyCuModuleNVX-module-parameter) VUID-vkDestroyCuModuleNVX-module-parameter

 `module` **must** be a valid [VkCuModuleNVX](VkCuModuleNVX.html) handle

* 
[](#VUID-vkDestroyCuModuleNVX-pAllocator-parameter) VUID-vkDestroyCuModuleNVX-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyCuModuleNVX-module-parent) VUID-vkDestroyCuModuleNVX-module-parent

 `module` **must** have been created, allocated, or retrieved from `device`

[VK_NVX_binary_import](VK_NVX_binary_import.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCuModuleNVX](VkCuModuleNVX.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkDestroyCuModuleNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
