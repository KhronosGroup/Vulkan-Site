# VkAndroidHardwareBufferFormatPropertiesANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAndroidHardwareBufferFormatPropertiesANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAndroidHardwareBufferFormatPropertiesANDROID - Structure describing the image format properties of an Android hardware buffer

To obtain format properties of an Android hardware buffer, include a
`VkAndroidHardwareBufferFormatPropertiesANDROID` structure in the
`pNext` chain of the [VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html)
structure passed to [vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html).
This structure is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkAndroidHardwareBufferFormatPropertiesANDROID {
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
} VkAndroidHardwareBufferFormatPropertiesANDROID;

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

If the Android hardware buffer has one of the formats listed in the
[Format Equivalence table](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-formats), then `format` **must** have the equivalent Vulkan format listed in
the table.
Otherwise, `format` **may** be [VK_FORMAT_UNDEFINED](VkFormat.html), indicating the
Android hardware buffer **can** only be used with an external format.

The `formatFeatures` member **must** include
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html) and at least one of
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html) or
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html), and **should** include
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](VkFormatFeatureFlagBits.html).

|  | The `formatFeatures` member only indicates the features available when
| --- | --- |
using an
[external-format image](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-external-formats) created from the Android hardware buffer.
Images from Android hardware buffers with a format other than
[VK_FORMAT_UNDEFINED](VkFormat.html) are subject to the format capabilities obtained
from [vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html), and
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) with appropriate parameters.
These sets of features are independent of each other, e.g. the external
format will support sampler Y′CBCR conversion even if the non-external
format does not, and rendering directly to the external format will not be
supported even if the non-external format does support this. |

Android hardware buffers with the same external format **must** have the same
support for [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](VkFormatFeatureFlagBits.html),
and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](VkFormatFeatureFlagBits.html).
in `formatFeatures`.
Other format features **may** differ between Android hardware buffers that have
the same external format.
This allows applications to use the same [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html)
object (and samplers and pipelines created from them) for any Android
hardware buffers that have the same external format.

If `format` is not [VK_FORMAT_UNDEFINED](VkFormat.html), then the value of
`samplerYcbcrConversionComponents` **must** be valid when used as the
`components` member of [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html) with
that format.
If `format` is [VK_FORMAT_UNDEFINED](VkFormat.html), all members of
`samplerYcbcrConversionComponents` **must** be the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings).

Implementations **may** not always be able to determine the color model,
numerical range, or chroma offsets of the image contents, so the values in
`VkAndroidHardwareBufferFormatPropertiesANDROID` are only suggestions.
Applications **should** treat these values as sensible defaults to use in the
absence of more reliable information obtained through some other means.
If the underlying physical device is also usable via OpenGL ES with the
[`GL_OES_EGL_image_external`](https://registry.khronos.org/OpenGL/extensions/OES/OES_EGL_image_external.txt)
extension, the implementation **should** suggest values that will produce
similar sampled values as would be obtained by sampling the same external
image via `samplerExternalOES` in OpenGL ES using equivalent sampler
parameters.

|  | Since
| --- | --- |
[`GL_OES_EGL_image_external`](https://registry.khronos.org/OpenGL/extensions/OES/OES_EGL_image_external.txt)
does not require the same sampling and conversion calculations as Vulkan
does, achieving identical results between APIs **may** not be possible on some
implementations. |

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferFormatPropertiesANDROID-sType-sType) VUID-VkAndroidHardwareBufferFormatPropertiesANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_PROPERTIES_ANDROID](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html)

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html), [VkChromaLocation](VkChromaLocation.html), [VkComponentMapping](VkComponentMapping.html), [VkFormat](VkFormat.html), [VkFormatFeatureFlags](VkFormatFeatureFlags.html), [VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html), [VkSamplerYcbcrRange](VkSamplerYcbcrRange.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkAndroidHardwareBufferFormatPropertiesANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
