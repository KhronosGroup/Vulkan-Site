# VkScreenBufferFormatPropertiesQNX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkScreenBufferFormatPropertiesQNX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkScreenBufferFormatPropertiesQNX - Structure describing the image format properties of a QNX Screen buffer

To obtain format properties of a QNX Screen buffer, include a
`VkScreenBufferFormatPropertiesQNX` structure in the `pNext` chain
of the [VkScreenBufferPropertiesQNX](VkScreenBufferPropertiesQNX.html) structure passed to
[vkGetScreenBufferPropertiesQNX](vkGetScreenBufferPropertiesQNX.html).
This structure is defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkScreenBufferFormatPropertiesQNX {
    VkStructureType                  sType;
    void*                            pNext;
    VkFormat                         format;
    uint64_t                         externalFormat;
    uint64_t                         screenUsage;
    VkFormatFeatureFlags             formatFeatures;
    VkComponentMapping               samplerYcbcrConversionComponents;
    VkSamplerYcbcrModelConversion    suggestedYcbcrModel;
    VkSamplerYcbcrRange              suggestedYcbcrRange;
    VkChromaLocation                 suggestedXChromaOffset;
    VkChromaLocation                 suggestedYChromaOffset;
} VkScreenBufferFormatPropertiesQNX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the Vulkan format corresponding to the Screen buffer’s
format or [VK_FORMAT_UNDEFINED](VkFormat.html) if there is not an equivalent Vulkan
format.

* 
`externalFormat` is an implementation-defined external format
identifier for use with [VkExternalFormatQNX](VkExternalFormatQNX.html).
It **must** not be zero.

* 
`screenUsage` is an implementation-defined external usage identifier
for the QNX Screen buffer.

* 
`formatFeatures` describes the capabilities of this external format
when used with an image bound to memory imported from `buffer`.

* 
`samplerYcbcrConversionComponents` is the component swizzle that
**should** be used in [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html).

* 
`suggestedYcbcrModel` is a suggested color model to use in the
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html).

* 
`suggestedYcbcrRange` is a suggested numerical value range to use in
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html).

* 
`suggestedXChromaOffset` is a suggested X chroma offset to use in
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html).

* 
`suggestedYChromaOffset` is a suggested Y chroma offset to use in
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html).

If the QNX Screen buffer has one of the formats listed in the
[QNX Screen Format Equivalence table](../../../../spec/latest/chapters/memory.html#memory-external-qnx-screen-buffer-formats), then `format` **must** have the equivalent Vulkan format listed in
the table.
Otherwise, `format` **may** be [VK_FORMAT_UNDEFINED](VkFormat.html), indicating the
QNX Screen buffer **can** only be used with an external format.
The `formatFeatures` member **must** include
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html) and **should** include
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](VkFormatFeatureFlagBits.html).

Valid Usage (Implicit)

* 
[](#VUID-VkScreenBufferFormatPropertiesQNX-sType-sType) VUID-VkScreenBufferFormatPropertiesQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SCREEN_BUFFER_FORMAT_PROPERTIES_QNX](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkScreenBufferPropertiesQNX](VkScreenBufferPropertiesQNX.html)

[VK_QNX_external_memory_screen_buffer](VK_QNX_external_memory_screen_buffer.html), [VkChromaLocation](VkChromaLocation.html), [VkComponentMapping](VkComponentMapping.html), [VkFormat](VkFormat.html), [VkFormatFeatureFlags](VkFormatFeatureFlags.html), [VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html), [VkSamplerYcbcrRange](VkSamplerYcbcrRange.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkScreenBufferFormatPropertiesQNX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
