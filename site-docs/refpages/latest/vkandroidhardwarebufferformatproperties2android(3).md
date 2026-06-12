# VkAndroidHardwareBufferFormatProperties2ANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAndroidHardwareBufferFormatProperties2ANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAndroidHardwareBufferFormatProperties2ANDROID - Structure describing the image format properties of an Android hardware buffer

The format properties of an Android hardware buffer **can** be obtained by
including a `VkAndroidHardwareBufferFormatProperties2ANDROID` structure
in the `pNext` chain of the
[VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html) structure passed to
[vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html).
This structure is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
typedef struct VkAndroidHardwareBufferFormatProperties2ANDROID {
    VkStructureType                  sType;
    void*                            pNext;
    VkFormat                         format;
    uint64_t                         externalFormat;
    VkFormatFeatureFlags2            formatFeatures;
    VkComponentMapping               samplerYcbcrConversionComponents;
    VkSamplerYcbcrModelConversion    suggestedYcbcrModel;
    VkSamplerYcbcrRange              suggestedYcbcrRange;
    VkChromaLocation                 suggestedXChromaOffset;
    VkChromaLocation                 suggestedYChromaOffset;
} VkAndroidHardwareBufferFormatProperties2ANDROID;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the Vulkan format corresponding to the Android hardware
buffer’s format, or [VK_FORMAT_UNDEFINED](VkFormat.html) if there is not an
equivalent Vulkan format.

* 
`externalFormat` is an implementation-defined external format
identifier for use with [VkExternalFormatANDROID](VkExternalFormatANDROID.html).
It **must** not be zero.

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

The bits reported in `formatFeatures` **must** include the bits reported in
the corresponding fields of
`VkAndroidHardwareBufferFormatPropertiesANDROID`::`formatFeatures`.

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferFormatProperties2ANDROID-sType-sType) VUID-VkAndroidHardwareBufferFormatProperties2ANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_PROPERTIES_2_ANDROID](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html)

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html), [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkChromaLocation](VkChromaLocation.html), [VkComponentMapping](VkComponentMapping.html), [VkFormat](VkFormat.html), [VkFormatFeatureFlags2](VkFormatFeatureFlags2.html), [VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html), [VkSamplerYcbcrRange](VkSamplerYcbcrRange.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkAndroidHardwareBufferFormatProperties2ANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
