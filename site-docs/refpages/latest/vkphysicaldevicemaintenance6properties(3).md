# VkPhysicalDeviceMaintenance6Properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance6Properties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance6Properties - Structure describing various implementation-defined properties introduced with VK_KHR_maintenance6

The `VkPhysicalDeviceMaintenance6Properties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceMaintenance6Properties {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           blockTexelViewCompatibleMultipleLayers;
    uint32_t           maxCombinedImageSamplerDescriptorCount;
    VkBool32           fragmentShadingRateClampCombinerInputs;
} VkPhysicalDeviceMaintenance6Properties;

// Provided by VK_KHR_maintenance6
// Equivalent to VkPhysicalDeviceMaintenance6Properties
typedef VkPhysicalDeviceMaintenance6Properties VkPhysicalDeviceMaintenance6PropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`blockTexelViewCompatibleMultipleLayers` is a boolean value
indicating that an implementation supports creating image views with
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html) where the
`layerCount` member of `subresourceRange` is greater than `1`.

* 
`maxCombinedImageSamplerDescriptorCount` is the maximum number of
combined image sampler descriptors that the implementation uses to
access any of the [formats    that require a sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the
implementation.

* 
`fragmentShadingRateClampCombinerInputs` is a boolean value
indicating that an implementation clamps the inputs to
[combiner operations](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-combining).

If the `VkPhysicalDeviceMaintenance6Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance6Properties-sType-sType) VUID-VkPhysicalDeviceMaintenance6Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMaintenance6Properties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
