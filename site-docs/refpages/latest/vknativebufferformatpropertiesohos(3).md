# VkNativeBufferFormatPropertiesOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkNativeBufferFormatPropertiesOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkNativeBufferFormatPropertiesOHOS - Structure describing the image format properties of an Open Harmony OS native buffer

To obtain format properties of an Open Harmony OS native buffer, include a
`VkNativeBufferFormatPropertiesOHOS` structure in the `pNext` chain
of the [VkNativeBufferPropertiesOHOS](VkNativeBufferPropertiesOHOS.html) structure passed to
[vkGetNativeBufferPropertiesOHOS](vkGetNativeBufferPropertiesOHOS.html).
The `VkNativeBufferFormatPropertiesOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkNativeBufferFormatPropertiesOHOS {
    VkStructureType                  sType;
    void*                            pNext;
    VkFormat                         format;
    uint64_t                         externalFormat;
    VkFormatFeatureFlags             formatFeatures;
    VkComponentMapping               samplerYcbcrConversionComponents;
    VkSamplerYcbcrModelConversion    suggestedYcbcrModel;
    VkSamplerYcbcrRange              suggestedYcbcrRange;
    VkChromaLocation                 suggestedXChromaOffset;
    VkChromaLocation                 suggestedYChromaOffset;
} VkNativeBufferFormatPropertiesOHOS;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the Vulkan format corresponding to the Open Harmony OS
native buffer’s format, or [VK_FORMAT_UNDEFINED](VkFormat.html) if there is not an
equivalent Vulkan format.

* 
`externalFormat` is an implementation-defined external format
identifier for use with [VkExternalFormatOHOS](VkExternalFormatOHOS.html).

* 
`formatFeatures` describes the capabilities of this external format
when used with an image bound to memory imported from `buffer`.

* 
`samplerYcbcrConversionComponents` represents a set of
[VkComponentSwizzle](VkComponentSwizzle.html).

* 
`suggestedYcbcrModel` represents the color model.

* 
`suggestedYcbcrRange` represents the numerical value range.

* 
`suggestedXChromaOffset` represents the X chroma offset.

* 
`suggestedYChromaOffset` represents the Y chroma offset.

Valid Usage (Implicit)

* 
[](#VUID-VkNativeBufferFormatPropertiesOHOS-sType-sType) VUID-VkNativeBufferFormatPropertiesOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_NATIVE_BUFFER_FORMAT_PROPERTIES_OHOS](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkNativeBufferPropertiesOHOS](VkNativeBufferPropertiesOHOS.html)

[VK_OHOS_external_memory](VK_OHOS_external_memory.html), [VkChromaLocation](VkChromaLocation.html), [VkComponentMapping](VkComponentMapping.html), [VkFormat](VkFormat.html), [VkFormatFeatureFlags](VkFormatFeatureFlags.html), [VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html), [VkSamplerYcbcrRange](VkSamplerYcbcrRange.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkNativeBufferFormatPropertiesOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
