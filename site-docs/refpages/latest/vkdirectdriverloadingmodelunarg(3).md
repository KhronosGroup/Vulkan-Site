# VkDirectDriverLoadingModeLUNARG(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDirectDriverLoadingModeLUNARG.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDirectDriverLoadingModeLUNARG - Specify loader behavior of added drivers

Possible values of [VkDirectDriverLoadingListLUNARG](VkDirectDriverLoadingListLUNARG.html)::`mode`,
specifying the mode in which drivers are used, are:

// Provided by VK_LUNARG_direct_driver_loading
typedef enum VkDirectDriverLoadingModeLUNARG {
    VK_DIRECT_DRIVER_LOADING_MODE_EXCLUSIVE_LUNARG = 0,
    VK_DIRECT_DRIVER_LOADING_MODE_INCLUSIVE_LUNARG = 1,
} VkDirectDriverLoadingModeLUNARG;

* 
[VK_DIRECT_DRIVER_LOADING_MODE_EXCLUSIVE_LUNARG](#) specifies that the
provided drivers are used instead of the system-loaded drivers.

* 
[VK_DIRECT_DRIVER_LOADING_MODE_INCLUSIVE_LUNARG](#) specifies that the
provided drivers are used in addition to the system-loaded drivers.

[VK_LUNARG_direct_driver_loading](VK_LUNARG_direct_driver_loading.html), [VkDirectDriverLoadingListLUNARG](VkDirectDriverLoadingListLUNARG.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkDirectDriverLoadingModeLUNARG).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
