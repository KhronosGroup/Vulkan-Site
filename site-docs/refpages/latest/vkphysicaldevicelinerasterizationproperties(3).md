# VkPhysicalDeviceLineRasterizationProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceLineRasterizationProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceLineRasterizationProperties - Structure describing line rasterization properties supported by an implementation

The `VkPhysicalDeviceLineRasterizationProperties` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceLineRasterizationProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           lineSubPixelPrecisionBits;
} VkPhysicalDeviceLineRasterizationProperties;

// Provided by VK_KHR_line_rasterization
// Equivalent to VkPhysicalDeviceLineRasterizationProperties
typedef VkPhysicalDeviceLineRasterizationProperties VkPhysicalDeviceLineRasterizationPropertiesKHR;

// Provided by VK_EXT_line_rasterization
// Equivalent to VkPhysicalDeviceLineRasterizationProperties
typedef VkPhysicalDeviceLineRasterizationProperties VkPhysicalDeviceLineRasterizationPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`lineSubPixelPrecisionBits` is the number of bits of subpixel
precision in framebuffer coordinates xf and yf when
rasterizing [line segments](../../../../spec/latest/chapters/primsrast.html#primsrast-lines).

If the `VkPhysicalDeviceLineRasterizationProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLineRasterizationProperties-sType-sType) VUID-VkPhysicalDeviceLineRasterizationProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_line_rasterization](VK_EXT_line_rasterization.html), [VK_KHR_line_rasterization](VK_KHR_line_rasterization.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceLineRasterizationProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
