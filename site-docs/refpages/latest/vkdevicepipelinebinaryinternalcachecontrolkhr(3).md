# VkDevicePipelineBinaryInternalCacheControlKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDevicePipelineBinaryInternalCacheControlKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDevicePipelineBinaryInternalCacheControlKHR - Structure specifying parameter to disable the internal pipeline cache

To disable the implementation’s internal pipeline cache, add a
[VkDevicePipelineBinaryInternalCacheControlKHR](#) structure to the
`pNext` chain of the [VkDeviceCreateInfo](VkDeviceCreateInfo.html) structure.

// Provided by VK_KHR_pipeline_binary
typedef struct VkDevicePipelineBinaryInternalCacheControlKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           disableInternalCache;
} VkDevicePipelineBinaryInternalCacheControlKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`disableInternalCache` specifies whether or not to disable the
implementation’s internal pipeline cache.

If the `VkDeviceCreateInfo`::`pNext` chain does not include this
structure, then `disableInternalCache` defaults to [VK_FALSE](VK_FALSE.html).

Valid Usage

* 
[](#VUID-VkDevicePipelineBinaryInternalCacheControlKHR-disableInternalCache-09602) VUID-VkDevicePipelineBinaryInternalCacheControlKHR-disableInternalCache-09602

If
[VkPhysicalDevicePipelineBinaryPropertiesKHR](VkPhysicalDevicePipelineBinaryPropertiesKHR.html)::`pipelineBinaryInternalCacheControl`
is [VK_FALSE](VK_FALSE.html), `disableInternalCache` **must** be [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDevicePipelineBinaryInternalCacheControlKHR-sType-sType) VUID-VkDevicePipelineBinaryInternalCacheControlKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_PIPELINE_BINARY_INTERNAL_CACHE_CONTROL_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDevicePipelineBinaryInternalCacheControlKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
