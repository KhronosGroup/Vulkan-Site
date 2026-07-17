# VkPhysicalDeviceFragmentDensityMap2PropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFragmentDensityMap2PropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFragmentDensityMap2PropertiesEXT - Structure describing additional fragment density map properties that can be supported by an implementation

The `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map2
typedef struct VkPhysicalDeviceFragmentDensityMap2PropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           subsampledLoads;
    VkBool32           subsampledCoarseReconstructionEarlyAccess;
    uint32_t           maxSubsampledArrayLayers;
    uint32_t           maxDescriptorSetSubsampledSamplers;
} VkPhysicalDeviceFragmentDensityMap2PropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `subsampledLoads` specifies if performing
image data read with load operations on subsampled attachments will be
resampled to the fragment density of the render pass

* 

`subsampledCoarseReconstructionEarlyAccess` specifies if performing
image data read with samplers created with `flags` containing
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](VkSamplerCreateFlagBits.html) in
fragment shader will trigger additional reads during
[VK_PIPELINE_STAGE_VERTEX_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
 `maxSubsampledArrayLayers` is
the maximum number of [VkImageView](VkImageView.html) array layers for usages
supporting subsampled samplers

* 

`maxDescriptorSetSubsampledSamplers` is the maximum number of
subsampled samplers that **can** be included in a [VkPipelineLayout](VkPipelineLayout.html)

If the `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMap2PropertiesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMap2PropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_2_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_fragment_density_map2](VK_EXT_fragment_density_map2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceFragmentDensityMap2PropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
