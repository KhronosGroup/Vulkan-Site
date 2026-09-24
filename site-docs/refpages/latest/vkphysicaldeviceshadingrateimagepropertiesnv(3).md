# VkPhysicalDeviceShadingRateImagePropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShadingRateImagePropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShadingRateImagePropertiesNV - Structure describing shading rate image limits that can be supported by an implementation

The `VkPhysicalDeviceShadingRateImagePropertiesNV` structure is defined
as:

// Provided by VK_NV_shading_rate_image
typedef struct VkPhysicalDeviceShadingRateImagePropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         shadingRateTexelSize;
    uint32_t           shadingRatePaletteSize;
    uint32_t           shadingRateMaxCoarseSamples;
} VkPhysicalDeviceShadingRateImagePropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shadingRateTexelSize` indicates the
width and height of the portion of the framebuffer corresponding to each
texel in the shading rate image.

* 
 `shadingRatePaletteSize` indicates
the maximum number of palette entries supported for the shading rate
image.

* 
 `shadingRateMaxCoarseSamples`
specifies the maximum number of coverage samples supported in a single
fragment.
If the product of the fragment size derived from the base shading rate
and the number of coverage samples per pixel exceeds this limit, the
final shading rate will be adjusted so that its product does not exceed
the limit.

If the `VkPhysicalDeviceShadingRateImagePropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

These properties are related to the [shading rate image](../../../../spec/latest/chapters/primsrast.html#primsrast-shading-rate-image) feature.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShadingRateImagePropertiesNV-sType-sType) VUID-VkPhysicalDeviceShadingRateImagePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADING_RATE_IMAGE_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShadingRateImagePropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
