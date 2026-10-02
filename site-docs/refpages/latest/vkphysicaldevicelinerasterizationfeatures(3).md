# VkPhysicalDeviceLineRasterizationFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceLineRasterizationFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceLineRasterizationFeatures - Structure describing the line rasterization features that can be supported by an implementation

The `VkPhysicalDeviceLineRasterizationFeatures` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceLineRasterizationFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rectangularLines;
    VkBool32           bresenhamLines;
    VkBool32           smoothLines;
    VkBool32           stippledRectangularLines;
    VkBool32           stippledBresenhamLines;
    VkBool32           stippledSmoothLines;
} VkPhysicalDeviceLineRasterizationFeatures;

// Provided by VK_KHR_line_rasterization
// Equivalent to VkPhysicalDeviceLineRasterizationFeatures
typedef VkPhysicalDeviceLineRasterizationFeatures VkPhysicalDeviceLineRasterizationFeaturesKHR;

// Provided by VK_EXT_line_rasterization
// Equivalent to VkPhysicalDeviceLineRasterizationFeatures
typedef VkPhysicalDeviceLineRasterizationFeatures VkPhysicalDeviceLineRasterizationFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rectangularLines`
indicates whether the implementation supports
[rectangular line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines).

* 
 `bresenhamLines`
indicates whether the implementation supports
[Bresenham-style line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-bresenham).

* 
 `smoothLines` indicates
whether the implementation supports [smooth line    rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-smooth).

* 

`stippledRectangularLines` indicates whether the implementation
supports [stippled line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](VkLineRasterizationMode.html) lines.

* 

`stippledBresenhamLines` indicates whether the implementation
supports [stippled line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](VkLineRasterizationMode.html) lines.

* 

`stippledSmoothLines` indicates whether the implementation supports
[stippled line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](VkLineRasterizationMode.html) lines.

If the `VkPhysicalDeviceLineRasterizationFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceLineRasterizationFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLineRasterizationFeatures-sType-sType) VUID-VkPhysicalDeviceLineRasterizationFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_line_rasterization](VK_EXT_line_rasterization.html), [VK_KHR_line_rasterization](VK_KHR_line_rasterization.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceLineRasterizationFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
