# VkPhysicalDevicePipelineCreationCacheControlFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePipelineCreationCacheControlFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePipelineCreationCacheControlFeatures - Structure describing whether pipeline cache control can be supported by an implementation

The `VkPhysicalDevicePipelineCreationCacheControlFeatures` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDevicePipelineCreationCacheControlFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineCreationCacheControl;
} VkPhysicalDevicePipelineCreationCacheControlFeatures;

// Provided by VK_EXT_pipeline_creation_cache_control
// Equivalent to VkPhysicalDevicePipelineCreationCacheControlFeatures
typedef VkPhysicalDevicePipelineCreationCacheControlFeatures VkPhysicalDevicePipelineCreationCacheControlFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`pipelineCreationCacheControl` indicates that the implementation
supports:

The following **can** be used in `Vk*PipelineCreateInfo`::`flags`:

[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](VkPipelineCreateFlagBits.html)

The following **can** be used in
[VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html)::`flags`:

* 
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html)

If the `VkPhysicalDevicePipelineCreationCacheControlFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevicePipelineCreationCacheControlFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineCreationCacheControlFeatures-sType-sType) VUID-VkPhysicalDevicePipelineCreationCacheControlFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CREATION_CACHE_CONTROL_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_pipeline_creation_cache_control](VK_EXT_pipeline_creation_cache_control.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevicePipelineCreationCacheControlFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
