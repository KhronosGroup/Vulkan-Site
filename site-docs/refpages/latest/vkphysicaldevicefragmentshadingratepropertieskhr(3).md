# VkPhysicalDeviceFragmentShadingRatePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFragmentShadingRatePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFragmentShadingRatePropertiesKHR - Structure describing variable fragment shading rate limits that can be supported by an implementation

The `VkPhysicalDeviceFragmentShadingRatePropertiesKHR` structure is
defined as:

// Provided by VK_KHR_fragment_shading_rate
typedef struct VkPhysicalDeviceFragmentShadingRatePropertiesKHR {
    VkStructureType          sType;
    void*                    pNext;
    VkExtent2D               minFragmentShadingRateAttachmentTexelSize;
    VkExtent2D               maxFragmentShadingRateAttachmentTexelSize;
    uint32_t                 maxFragmentShadingRateAttachmentTexelSizeAspectRatio;
    VkBool32                 primitiveFragmentShadingRateWithMultipleViewports;
    VkBool32                 layeredShadingRateAttachments;
    VkBool32                 fragmentShadingRateNonTrivialCombinerOps;
    VkExtent2D               maxFragmentSize;
    uint32_t                 maxFragmentSizeAspectRatio;
    uint32_t                 maxFragmentShadingRateCoverageSamples;
    VkSampleCountFlagBits    maxFragmentShadingRateRasterizationSamples;
    VkBool32                 fragmentShadingRateWithShaderDepthStencilWrites;
    VkBool32                 fragmentShadingRateWithSampleMask;
    VkBool32                 fragmentShadingRateWithShaderSampleMask;
    VkBool32                 fragmentShadingRateWithConservativeRasterization;
    VkBool32                 fragmentShadingRateWithFragmentShaderInterlock;
    VkBool32                 fragmentShadingRateWithCustomSampleLocations;
    VkBool32                 fragmentShadingRateStrictMultiplyCombiner;
} VkPhysicalDeviceFragmentShadingRatePropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`minFragmentShadingRateAttachmentTexelSize` indicates minimum
supported width and height of the portion of the framebuffer
corresponding to each texel in a fragment shading rate attachment.
Each value **must** be less than or equal to the values in
`maxFragmentShadingRateAttachmentTexelSize`.
Each value **must** be a power-of-two.
It **must** be (0,0) if the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature is not supported.

* 

`maxFragmentShadingRateAttachmentTexelSize` indicates maximum
supported width and height of the portion of the framebuffer
corresponding to each texel in a fragment shading rate attachment.
Each value **must** be greater than or equal to the values in
`minFragmentShadingRateAttachmentTexelSize`.
Each value **must** be a power-of-two.
It **must** be (0,0) if the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature is not supported.

* 

`maxFragmentShadingRateAttachmentTexelSizeAspectRatio` indicates the
maximum ratio between the width and height of the portion of the
framebuffer corresponding to each texel in a fragment shading rate
attachment.
`maxFragmentShadingRateAttachmentTexelSizeAspectRatio` **must** be a
power-of-two value, and **must** be less than or equal to
max(`maxFragmentShadingRateAttachmentTexelSize.width` /
`minFragmentShadingRateAttachmentTexelSize.height`,
`maxFragmentShadingRateAttachmentTexelSize.height` /
`minFragmentShadingRateAttachmentTexelSize.width`).
It **must** be 0 if the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature is not supported.

* 

    `primitiveFragmentShadingRateWithMultipleViewports` specifies
    whether the [primitive    fragment shading rate](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-primitive) **can** be used when multiple viewports are used.
    If this value is [VK_FALSE](VK_FALSE.html), only a single viewport **must** be used,
    and applications **must** not write to the
    `ViewportMaskNV` or
    `ViewportIndex` built-in when setting `PrimitiveShadingRateKHR`.
    It **must** be [VK_FALSE](VK_FALSE.html) if
    the [    `shaderOutputViewportIndex`](../../../../spec/latest/chapters/features.html#features-shaderOutputViewportIndex) feature,
    the `[VK_EXT_shader_viewport_index_layer](VK_EXT_shader_viewport_index_layer.html)` extension,
or
    the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
    supported, or if the [    `primitiveFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-primitiveFragmentShadingRate) feature is not supported.

* 

    `layeredShadingRateAttachments` specifies whether a shading rate
    attachment image view **can** be created with multiple layers.
    If this value is [VK_FALSE](VK_FALSE.html), when creating an image view with a
    `usage` that includes
    [VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html),
    `layerCount` **must** be `1`.
    It **must** be [VK_FALSE](VK_FALSE.html) if
    the [`multiview`](../../../../spec/latest/chapters/features.html#features-multiview) feature,
    the [    `shaderOutputViewportIndex`](../../../../spec/latest/chapters/features.html#features-shaderOutputViewportIndex) feature,
    the `[VK_EXT_shader_viewport_index_layer](VK_EXT_shader_viewport_index_layer.html)` extension,
or
    the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
    supported, or if the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature is not supported.

* 

`fragmentShadingRateNonTrivialCombinerOps` specifies whether
[VkFragmentShadingRateCombinerOpKHR](VkFragmentShadingRateCombinerOpKHR.html) enums other than
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](VkFragmentShadingRateCombinerOpKHR.html) or
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](VkFragmentShadingRateCombinerOpKHR.html) **can** be used.
It **must** be [VK_FALSE](VK_FALSE.html) unless either the
[    `primitiveFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-primitiveFragmentShadingRate) or
[    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature is supported.

* 
 `maxFragmentSize` indicates the maximum
supported width and height of a fragment.
Its `width` and `height` members **must** both be power-of-two
values.
This limit is purely informational, and is not validated.

* 
 `maxFragmentSizeAspectRatio`
indicates the maximum ratio between the width and height of a fragment.
`maxFragmentSizeAspectRatio` **must** be a power-of-two value, and
**must** be less than or equal to the maximum of the `width` and
`height` members of `maxFragmentSize`.
This limit is purely informational, and is not validated.

* 

`maxFragmentShadingRateCoverageSamples` specifies the maximum number
of coverage samples supported in a single fragment.
`maxFragmentShadingRateCoverageSamples` **must** be less than or equal
to the product of the `width` and `height` members of
`maxFragmentSize`, and the sample count reported by
`maxFragmentShadingRateRasterizationSamples`.
`maxFragmentShadingRateCoverageSamples` **must** be less than or equal
to `maxSampleMaskWords` × 32 if
`fragmentShadingRateWithShaderSampleMask` is supported.
This limit is purely informational, and is not validated.

* 

`maxFragmentShadingRateRasterizationSamples` is a
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) value specifying the maximum sample rate
supported when a fragment covers multiple pixels.
This limit is purely informational, and is not validated.

* 

`fragmentShadingRateWithShaderDepthStencilWrites` specifies whether
the implementation supports writing `FragDepth`
or `FragStencilRefEXT`
from a fragment shader for multi-pixel fragments.
If this value is [VK_FALSE](VK_FALSE.html), writing to those built-ins will clamp
the fragment shading rate to (1,1).

* 

`fragmentShadingRateWithSampleMask` specifies whether the
implementation supports setting valid bits of
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`pSampleMask` to `0` for
multi-pixel fragments.
If this value is [VK_FALSE](VK_FALSE.html), zeroing valid bits in the sample mask
will clamp the fragment shading rate to (1,1).

* 

`fragmentShadingRateWithShaderSampleMask` specifies whether the
implementation supports reading or writing `SampleMask` for
multi-pixel fragments.
If this value is [VK_FALSE](VK_FALSE.html), using that built-in will clamp the
fragment shading rate to (1,1).

* 

`fragmentShadingRateWithConservativeRasterization`
specifies whether [conservative    rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-conservativeraster) is supported for multi-pixel fragments.
It **must** be [VK_FALSE](VK_FALSE.html) if `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)`
is not supported.
If this value is [VK_FALSE](VK_FALSE.html), using [    conservative rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-conservativeraster) will clamp the fragment shading rate to
(1,1).

* 

`fragmentShadingRateWithFragmentShaderInterlock`
specifies whether [fragment shader    interlock](../../../../spec/latest/chapters/fragops.html#fragops-shader-interlock) is supported for multi-pixel fragments.
It **must** be [VK_FALSE](VK_FALSE.html) if `[VK_EXT_fragment_shader_interlock](VK_EXT_fragment_shader_interlock.html)`
is not supported.
If this value is [VK_FALSE](VK_FALSE.html), using [    fragment shader interlock](../../../../spec/latest/chapters/fragops.html#fragops-shader-interlock) will clamp the fragment shading rate to
(1,1).

* 

`fragmentShadingRateWithCustomSampleLocations`
specifies whether [custom sample locations](../../../../spec/latest/chapters/primsrast.html#primsrast-samplelocations)
are supported for multi-pixel fragments.
It **must** be [VK_FALSE](VK_FALSE.html) if `[VK_EXT_sample_locations](VK_EXT_sample_locations.html)` is not
supported.
If this value is [VK_FALSE](VK_FALSE.html), using [    custom sample locations](../../../../spec/latest/chapters/primsrast.html#primsrast-samplelocations) will clamp the fragment shading rate to
(1,1).

* 

`fragmentShadingRateStrictMultiplyCombiner` specifies whether
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR](VkFragmentShadingRateCombinerOpKHR.html) accurately performs a
multiplication or not.
Implementations where this value is [VK_FALSE](VK_FALSE.html) will instead combine
rates with an addition.
If `fragmentShadingRateNonTrivialCombinerOps` is [VK_FALSE](VK_FALSE.html),
implementations **must** report this as [VK_FALSE](VK_FALSE.html).
If `fragmentShadingRateNonTrivialCombinerOps` is [VK_TRUE](VK_TRUE.html),
implementations **should** report this as [VK_TRUE](VK_TRUE.html).

|  | Multiplication of the combiner rates using the fragment width/height in
| --- | --- |
linear space is equivalent to an addition of those values in log2 space.
Some implementations inadvertently implemented an addition in linear space
due to unclear requirements originating outside of this specification.
This resulted in [`fragmentShadingRateStrictMultiplyCombiner`](../../../../spec/latest/chapters/limits.html#limits-fragmentShadingRateStrictMultiplyCombiner) being added.
Fortunately, this only affects situations where a rate of 1 in either
dimension is combined with another rate of 1.
All other combinations result in the exact same result as if multiplication
was performed in linear space due to the clamping logic, and the fact that
both the sum and product of 2 and 2 are equal.
In many cases, this limit will not affect the correct operation of
applications. |

If the `VkPhysicalDeviceFragmentShadingRatePropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

These properties are related to [fragment shading rates](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRatePropertiesKHR-sType-sType) VUID-VkPhysicalDeviceFragmentShadingRatePropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html), `VkBool32`, [VkExtent2D](VkExtent2D.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceFragmentShadingRatePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
