# VkScopeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkScopeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkScopeKHR - Specify SPIR-V scope

Possible values for [VkScopeKHR](#) include:

// Provided by VK_KHR_cooperative_matrix
typedef enum VkScopeKHR {
    VK_SCOPE_DEVICE_KHR = 1,
    VK_SCOPE_WORKGROUP_KHR = 2,
    VK_SCOPE_SUBGROUP_KHR = 3,
    VK_SCOPE_QUEUE_FAMILY_KHR = 5,
  // Provided by VK_NV_cooperative_matrix
    VK_SCOPE_DEVICE_NV = VK_SCOPE_DEVICE_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_SCOPE_WORKGROUP_NV = VK_SCOPE_WORKGROUP_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_SCOPE_SUBGROUP_NV = VK_SCOPE_SUBGROUP_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_SCOPE_QUEUE_FAMILY_NV = VK_SCOPE_QUEUE_FAMILY_KHR,
} VkScopeKHR;

// Provided by VK_NV_cooperative_matrix
// Equivalent to VkScopeKHR
typedef VkScopeKHR VkScopeNV;

* 
[VK_SCOPE_DEVICE_KHR](#) corresponds to SPIR-V `Device` scope.

* 
[VK_SCOPE_WORKGROUP_KHR](#) corresponds to SPIR-V `Workgroup` scope.

* 
[VK_SCOPE_SUBGROUP_KHR](#) corresponds to SPIR-V `Subgroup` scope.

* 
[VK_SCOPE_QUEUE_FAMILY_KHR](#) corresponds to SPIR-V `QueueFamily`
scope.

All enum values match the corresponding SPIR-V value.

[VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html), [VK_NV_cooperative_matrix](VK_NV_cooperative_matrix.html), [VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html), [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html), [VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkScopeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
