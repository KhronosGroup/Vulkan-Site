# VkBufferCollectionPropertiesFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCollectionPropertiesFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCollectionPropertiesFUCHSIA - Structure specifying the negotiated format chosen by Sysmem

The `VkBufferCollectionPropertiesFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionPropertiesFUCHSIA {
    VkStructureType                  sType;
    void*                            pNext;
    uint32_t                         memoryTypeBits;
    uint32_t                         bufferCount;
    uint32_t                         createInfoIndex;
    uint64_t                         sysmemPixelFormat;
    VkFormatFeatureFlags             formatFeatures;
    VkSysmemColorSpaceFUCHSIA        sysmemColorSpaceIndex;
    VkComponentMapping               samplerYcbcrConversionComponents;
    VkSamplerYcbcrModelConversion    suggestedYcbcrModel;
    VkSamplerYcbcrRange              suggestedYcbcrRange;
    VkChromaLocation                 suggestedXChromaOffset;
    VkChromaLocation                 suggestedYChromaOffset;
} VkBufferCollectionPropertiesFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the buffer collection can be imported as buffer
collection

* 
`bufferCount` is the number of buffers in the collection

* 
`createInfoIndex` as described in [    Sysmem chosen create infos](../../../../spec/latest/chapters/resources.html#sysmem-chosen-create-infos)

* 
`sysmemPixelFormat` is the Sysmem `PixelFormatType` as defined in
`fuchsia.sysmem/image_formats.fidl`

* 
`formatFeatures` is a bitmask of [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html)
shared by the buffer collection

* 
`sysmemColorSpaceIndex` is a [VkSysmemColorSpaceFUCHSIA](VkSysmemColorSpaceFUCHSIA.html) struct
specifying the color space

* 
`samplerYcbcrConversionComponents` is a [VkComponentMapping](VkComponentMapping.html)
structure specifying the component mapping

* 
`suggestedYcbcrModel` is a [VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html) value
specifying the suggested Y′CBCR model

* 
`suggestedYcbcrRange` is a [VkSamplerYcbcrRange](VkSamplerYcbcrRange.html) value
specifying the suggested Y′CBCR range

* 
`suggestedXChromaOffset` is a [VkChromaLocation](VkChromaLocation.html) value
specifying the suggested X chroma offset

* 
`suggestedYChromaOffset` is a [VkChromaLocation](VkChromaLocation.html) value
specifying the suggested Y chroma offset

`sysmemColorSpace` is only set for image-based buffer collections where
the constraints were specified using [VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html) in
a call to [vkSetBufferCollectionImageConstraintsFUCHSIA](vkSetBufferCollectionImageConstraintsFUCHSIA.html).

For image-based buffer collections, `createInfoIndex` will identify both
the [VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html)::`pImageCreateInfos` element and
the [VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html)::`pFormatConstraints` element
chosen by Sysmem when [vkSetBufferCollectionImageConstraintsFUCHSIA](vkSetBufferCollectionImageConstraintsFUCHSIA.html) was
called.
The value of `sysmemColorSpaceIndex` will be an index to one of the
color spaces provided in the
[VkImageFormatConstraintsInfoFUCHSIA](VkImageFormatConstraintsInfoFUCHSIA.html)::`pColorSpaces` array.

The implementation **must** have `formatFeatures` with all bits set that
were set in
[VkImageFormatConstraintsInfoFUCHSIA](VkImageFormatConstraintsInfoFUCHSIA.html)::`requiredFormatFeatures`, by
the call to [vkSetBufferCollectionImageConstraintsFUCHSIA](vkSetBufferCollectionImageConstraintsFUCHSIA.html), at
`createInfoIndex` (other bits could be set as well).

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionPropertiesFUCHSIA-sType-sType) VUID-VkBufferCollectionPropertiesFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_PROPERTIES_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkBufferCollectionPropertiesFUCHSIA-pNext-pNext) VUID-VkBufferCollectionPropertiesFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkChromaLocation](VkChromaLocation.html), [VkComponentMapping](VkComponentMapping.html), [VkFormatFeatureFlags](VkFormatFeatureFlags.html), [VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html), [VkSamplerYcbcrRange](VkSamplerYcbcrRange.html), [VkStructureType](VkStructureType.html), [VkSysmemColorSpaceFUCHSIA](VkSysmemColorSpaceFUCHSIA.html), [vkGetBufferCollectionPropertiesFUCHSIA](vkGetBufferCollectionPropertiesFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferCollectionPropertiesFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
