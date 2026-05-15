# VkPhysicalDeviceMaintenance6Features(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance6Features.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance6Features - Structure describing whether the implementation supports maintenance6 functionality

The `VkPhysicalDeviceMaintenance6Features` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceMaintenance6Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance6;
} VkPhysicalDeviceMaintenance6Features;

// Provided by VK_KHR_maintenance6
// Equivalent to VkPhysicalDeviceMaintenance6Features
typedef VkPhysicalDeviceMaintenance6Features VkPhysicalDeviceMaintenance6FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance6` indicates
that the implementation supports the following:

[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **can** be used when binding an index buffer

* 
[VkBindMemoryStatus](VkBindMemoryStatus.html) **can** be included in the `pNext` chain of
the [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html) and [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)
structures, enabling applications to retrieve [VkResult](VkResult.html) values for
individual memory binding operations.

* 
[VkPhysicalDeviceMaintenance6Properties](VkPhysicalDeviceMaintenance6Properties.html)::`blockTexelViewCompatibleMultipleLayers`
property to indicate that the implementation supports creating image
views with [VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html) where
the `layerCount` member of `subresourceRange` is greater than
`1`.

* 
[VkPhysicalDeviceMaintenance6Properties](VkPhysicalDeviceMaintenance6Properties.html)::`maxCombinedImageSamplerDescriptorCount`
property which indicates the maximum descriptor size required for any
[format that requires a     sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the implementation.

* 
A
[VkPhysicalDeviceMaintenance6Properties](VkPhysicalDeviceMaintenance6Properties.html)::`fragmentShadingRateClampCombinerInputs`
property which indicates whether the implementation clamps the inputs
to fragment shading rate combiner operations.

If the `VkPhysicalDeviceMaintenance6Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMaintenance6Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance6Features-sType-sType) VUID-VkPhysicalDeviceMaintenance6Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMaintenance6Features).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
