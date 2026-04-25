# VkPhysicalDeviceMaintenance5Properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance5Properties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance5Properties - Structure describing various implementation-defined properties introduced with VK_KHR_maintenance5

The `VkPhysicalDeviceMaintenance5Properties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceMaintenance5Properties {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           earlyFragmentMultisampleCoverageAfterSampleCounting;
    VkBool32           earlyFragmentSampleMaskTestBeforeSampleCounting;
    VkBool32           depthStencilSwizzleOneSupport;
    VkBool32           polygonModePointSize;
    VkBool32           nonStrictSinglePixelWideLinesUseParallelogram;
    VkBool32           nonStrictWideLinesUseParallelogram;
} VkPhysicalDeviceMaintenance5Properties;

// Provided by VK_KHR_maintenance5
// Equivalent to VkPhysicalDeviceMaintenance5Properties
typedef VkPhysicalDeviceMaintenance5Properties VkPhysicalDeviceMaintenance5PropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`earlyFragmentMultisampleCoverageAfterSampleCounting` is a boolean
value indicating whether the [fragment shading](../../../../spec/latest/chapters/fragops.html#fragops-shader) and
[multisample coverage](../../../../spec/latest/chapters/fragops.html#fragops-covg) operations are performed after
[sample counting](../../../../spec/latest/chapters/fragops.html#fragops-samplecount) for [fragment    shaders](../../../../spec/latest/chapters/fragops.html#fragops-shader) with `EarlyFragmentTests` execution mode.

* 
`earlyFragmentSampleMaskTestBeforeSampleCounting` is a boolean value
indicating whether the [sample mask test](../../../../spec/latest/chapters/fragops.html#fragops-samplemask) operation
is performed before [sample counting](../../../../spec/latest/chapters/fragops.html#fragops-samplecount) for
[fragment shaders](../../../../spec/latest/chapters/fragops.html#fragops-shader) using the `EarlyFragmentTests`
execution mode.

* 
`depthStencilSwizzleOneSupport` is a boolean indicating that
depth/stencil texturing operations with [VK_COMPONENT_SWIZZLE_ONE](VkComponentSwizzle.html)
have defined behavior.

* 
`polygonModePointSize` is a boolean value indicating whether the
point size of the final rasterization of polygons with
[VK_POLYGON_MODE_POINT](VkPolygonMode.html) is controlled by `PointSize`.

* 
`nonStrictSinglePixelWideLinesUseParallelogram` is a boolean value
indicating whether non-strict lines with a width of 1.0 are rasterized
as parallelograms or using Bresenham’s algorithm.

* 
`nonStrictWideLinesUseParallelogram` is a boolean value indicating
whether non-strict lines with a width greater than 1.0 are rasterized as
parallelograms or using Bresenham’s algorithm.

If the `VkPhysicalDeviceMaintenance5Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance5Properties-sType-sType) VUID-VkPhysicalDeviceMaintenance5Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMaintenance5Properties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
