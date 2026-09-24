# VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC - Stub description of VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_SEC_pipeline_cache_incremental_mode
typedef struct VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineCacheIncrementalMode;
} VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC;

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC-sType-sType) VUID-VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CACHE_INCREMENTAL_MODE_FEATURES_SEC](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_SEC_pipeline_cache_incremental_mode](VK_SEC_pipeline_cache_incremental_mode.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
