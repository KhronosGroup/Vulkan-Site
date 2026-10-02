# VkPhysicalDeviceConservativeRasterizationPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceConservativeRasterizationPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceConservativeRasterizationPropertiesEXT - Structure describing conservative raster properties that can be supported by an implementation

The `VkPhysicalDeviceConservativeRasterizationPropertiesEXT` structure
is defined as:

// Provided by VK_EXT_conservative_rasterization
typedef struct VkPhysicalDeviceConservativeRasterizationPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    float              primitiveOverestimationSize;
    float              maxExtraPrimitiveOverestimationSize;
    float              extraPrimitiveOverestimationSizeGranularity;
    VkBool32           primitiveUnderestimation;
    VkBool32           conservativePointAndLineRasterization;
    VkBool32           degenerateTrianglesRasterized;
    VkBool32           degenerateLinesRasterized;
    VkBool32           fullyCoveredFragmentShaderInputVariable;
    VkBool32           conservativeRasterizationPostDepthCoverage;
} VkPhysicalDeviceConservativeRasterizationPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `primitiveOverestimationSize`
is the size in pixels the generating primitive is increased at each of
its edges during conservative rasterization overestimation mode.
Even with a size of 0.0, conservative rasterization overestimation rules
still apply and if any part of the pixel rectangle is covered by the
generating primitive, fragments are generated for the entire pixel.
However implementations **may** make the pixel coverage area even more
conservative by increasing the size of the generating primitive.

* 

`maxExtraPrimitiveOverestimationSize` is the maximum size in pixels
of extra overestimation the implementation supports in the pipeline
state.
A value of 0.0 means the implementation does not support any additional
overestimation of the generating primitive during conservative
rasterization.
A value above 0.0 allows the application to further increase the size of
the generating primitive during conservative rasterization
overestimation.

* 

`extraPrimitiveOverestimationSizeGranularity` is the granularity of
extra overestimation that can be specified in the pipeline state between
0.0 and `maxExtraPrimitiveOverestimationSize` inclusive.
A value of 0.0 means the implementation can use the smallest
representable non-zero value in the screen space pixel fixed-point grid.

* 
 `primitiveUnderestimation` is
[VK_TRUE](VK_TRUE.html) if the implementation supports the
[VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](VkConservativeRasterizationModeEXT.html) conservative
rasterization mode in addition to
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](VkConservativeRasterizationModeEXT.html).
Otherwise the implementation only supports
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](VkConservativeRasterizationModeEXT.html).

* 

`conservativePointAndLineRasterization` is [VK_TRUE](VK_TRUE.html) if the
implementation supports conservative rasterization of point and line
primitives as well as triangle primitives.
Otherwise the implementation only supports triangle primitives.

* 

`degenerateTrianglesRasterized` is [VK_FALSE](VK_FALSE.html) if the
implementation culls primitives generated from triangles that become
zero area after they are quantized to the fixed-point rasterization
pixel grid.
`degenerateTrianglesRasterized` is [VK_TRUE](VK_TRUE.html) if these primitives
are not culled and the provoking vertex attributes and depth value are
used for the fragments.
The primitive area calculation is done on the primitive generated from
the clipped triangle if applicable.
Zero area primitives are backfacing and the application **can** enable
backface culling if desired.

* 
 `degenerateLinesRasterized` is
[VK_FALSE](VK_FALSE.html) if the implementation culls lines that become zero length
after they are quantized to the fixed-point rasterization pixel grid.
`degenerateLinesRasterized` is [VK_TRUE](VK_TRUE.html) if zero length lines
are not culled and the provoking vertex attributes and depth value are
used for the fragments.

* 

`fullyCoveredFragmentShaderInputVariable` is [VK_TRUE](VK_TRUE.html) if the
implementation supports the SPIR-V builtin fragment shader input
variable `FullyCoveredEXT` specifying that conservative rasterization
is enabled and the fragment area is fully covered by the generating
primitive.

* 

`conservativeRasterizationPostDepthCoverage` is [VK_TRUE](VK_TRUE.html) if the
implementation supports conservative rasterization with the
`PostDepthCoverage` execution mode enabled.
Otherwise the `PostDepthCoverage` execution mode **must** not be used
when conservative rasterization is enabled.

If the `VkPhysicalDeviceConservativeRasterizationPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceConservativeRasterizationPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceConservativeRasterizationPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CONSERVATIVE_RASTERIZATION_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceConservativeRasterizationPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
