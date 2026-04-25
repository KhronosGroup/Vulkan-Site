# VkPhysicalDevicePortabilitySubsetFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePortabilitySubsetFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePortabilitySubsetFeaturesKHR - Structure describing the features that may not be supported by an implementation of the Vulkan 1.0 Portability Subset

The `VkPhysicalDevicePortabilitySubsetFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_portability_subset
typedef struct VkPhysicalDevicePortabilitySubsetFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           constantAlphaColorBlendFactors;
    VkBool32           events;
    VkBool32           imageViewFormatReinterpretation;
    VkBool32           imageViewFormatSwizzle;
    VkBool32           imageView2DOn3DImage;
    VkBool32           multisampleArrayImage;
    VkBool32           mutableComparisonSamplers;
    VkBool32           pointPolygons;
    VkBool32           samplerMipLodBias;
    VkBool32           separateStencilMaskRef;
    VkBool32           shaderSampleRateInterpolationFunctions;
    VkBool32           tessellationIsolines;
    VkBool32           tessellationPointMode;
    VkBool32           triangleFans;
    VkBool32           vertexAttributeAccessBeyondStride;
} VkPhysicalDevicePortabilitySubsetFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`constantAlphaColorBlendFactors` indicates whether this
implementation supports constant *alpha* [Blend Factors](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blendfactors)
used as source or destination *color* [Blending](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blending).

* 
 `events` indicates whether this implementation
supports synchronization using [Events](../../../../spec/latest/chapters/synchronization.html#synchronization-events).

* 

`imageViewFormatReinterpretation` indicates whether this
implementation supports a `VkImageView` being created with a texel
format containing a different number of components, or a different
number of bits in each component, than the texel format of the
underlying `VkImage`.

* 
 `imageViewFormatSwizzle`
indicates whether this implementation supports remapping format
components using [VkImageViewCreateInfo](VkImageViewCreateInfo.html)::`components`.

* 
 `imageView2DOn3DImage` indicates
whether this implementation supports a `VkImage` being created with
the [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) flag set, permitting a
2D or 2D array image view to be created on a 3D `VkImage`.

* 
 `multisampleArrayImage` indicates
whether this implementation supports a `VkImage` being created as a
2D array with multiple samples per texel.

* 
 `mutableComparisonSamplers`
indicates whether this implementation allows descriptors with comparison
samplers to be [updated](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sets-updates).

* 
 `pointPolygons` indicates whether this
implementation supports [Rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast) using a *point*
[Polygon Mode](../../../../spec/latest/chapters/primsrast.html#primsrast-polygonmode).

* 
 `samplerMipLodBias` indicates whether
this implementation supports setting a [mipmap LOD    bias value](../../../../spec/latest/chapters/samplers.html#samplers-mipLodBias) when [creating a sampler](../../../../spec/latest/chapters/samplers.html#samplers).

* 
 `separateStencilMaskRef`
indicates whether this implementation supports separate front and back
[Stencil Test](../../../../spec/latest/chapters/fragops.html#fragops-stencil) reference values.

* 

`shaderSampleRateInterpolationFunctions` indicates whether this
implementation supports fragment shaders which use the
[    `InterpolationFunction`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-InterpolationFunction) capability and the extended instructions
`InterpolateAtCentroid`, `InterpolateAtOffset`, and
`InterpolateAtSample` from the `GLSL.std.450` extended instruction set.
This member is only meaningful if the [    `sampleRateShading`](../../../../spec/latest/chapters/features.html#features-sampleRateShading) feature is supported.

* 
 `tessellationIsolines` indicates
whether this implementation supports
[isoline output](../../../../spec/latest/chapters/tessellation.html#tessellation-isoline-tessellation) from the
[Tessellation](../../../../spec/latest/chapters/tessellation.html#tessellation) stage of a graphics pipeline.
This member is only meaningful if the [    `tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature is supported.

* 
 `tessellationPointMode` indicates
whether this implementation supports [point    output](../../../../spec/latest/chapters/tessellation.html#tessellation-point-mode) from the [Tessellation](../../../../spec/latest/chapters/tessellation.html#tessellation) stage of a graphics pipeline.
This member is only meaningful if the [    `tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature is supported.

* 
 `triangleFans` indicates whether this
implementation supports [Triangle Fans](../../../../spec/latest/chapters/drawing.html#drawing-triangle-fans) primitive topology.

* 

`vertexAttributeAccessBeyondStride` indicates whether this
implementation supports accessing a vertex input attribute beyond the
stride of the corresponding vertex input binding.

If the `VkPhysicalDevicePortabilitySubsetFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevicePortabilitySubsetFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePortabilitySubsetFeaturesKHR-sType-sType) VUID-VkPhysicalDevicePortabilitySubsetFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PORTABILITY_SUBSET_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_portability_subset](VK_KHR_portability_subset.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
