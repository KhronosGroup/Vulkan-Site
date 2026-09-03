# VK_KHR_format_feature_flags2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_format_feature_flags2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_format_feature_flags2](#VK_KHR_format_feature_flags2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_format_feature_flags2 - device extension

**Name String**

`VK_KHR_format_feature_flags2`

**Extension Type**

Device extension

**Registered Extension Number**

361

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_2

* 
Interacts with VK_EXT_filter_cubic

* 
Interacts with VK_EXT_sampler_filter_minmax

* 
Interacts with VK_IMG_filter_cubic

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Lionel Landwerlin [llandwerlin](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_format_feature_flags2] @llandwerlin%0A*Here describe the issue or question you have about the VK_KHR_format_feature_flags2 extension*)

**Last Modified Date**

2021-07-01

**IP Status**

No known IP claims.

**Contributors**

* 
Lionel Landwerlin, Intel

* 
Faith Ekstrand, Intel

* 
Tobias Hector, AMD

* 
Spencer Fricke, Samsung Electronics

* 
Graeme Leese, Broadcom

* 
Jan-Harald Fredriksen, ARM

This extension adds a new [VkFormatFeatureFlagBits2KHR](VkFormatFeatureFlagBits2.html) 64bits format
feature flag type to extend the existing [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html) which
is limited to 31 flags.
At the time of this writing 29 bits of [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html) are
already used.

Because [VkFormatProperties2](VkFormatProperties2.html) is already defined to extend the Vulkan
1.0 [vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) command, this extension
defines a new [VkFormatProperties3KHR](VkFormatProperties3.html) to extend the
[VkFormatProperties](VkFormatProperties.html).

On top of replicating all the bits from [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html),
[VkFormatFeatureFlagBits2KHR](VkFormatFeatureFlagBits2.html) adds the following bits :

* 
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT_KHR](VkFormatFeatureFlagBits2.html) and
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT_KHR](VkFormatFeatureFlagBits2.html) specify
that an implementation supports reading and writing, respectively, a
given [VkFormat](VkFormat.html) through storage operations without specifying the
format in the shader.

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT_KHR](VkFormatFeatureFlagBits2.html)
specifies that an implementation supports depth comparison performed by
`OpImage*Dref*` instructions on a given [VkFormat](VkFormat.html).
Previously the result of executing a `OpImage*Dref*` instruction on
an image view, where the `format` was not one of the depth/stencil
formats with a depth component, was undefined.
This bit clarifies on which formats such instructions can be used.

Prior to version 2 of this extension, implementations exposing the
[`shaderStorageImageReadWithoutFormat`](../../../../spec/latest/chapters/features.html#features-shaderStorageImageReadWithoutFormat) and
[`shaderStorageImageWriteWithoutFormat`](../../../../spec/latest/chapters/features.html#features-shaderStorageImageWriteWithoutFormat) features may not report
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT_KHR](VkFormatFeatureFlagBits2.html) and
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT_KHR](VkFormatFeatureFlagBits2.html) in
[VkFormatProperties3KHR](VkFormatProperties3.html)::`bufferFeatures`.
Despite this, buffer reads/writes are supported as intended by the original
features.

* 
Extending [VkFormatProperties2](VkFormatProperties2.html):

[VkFormatProperties3KHR](VkFormatProperties3.html)

* 
[VkFormatFeatureFlagBits2KHR](VkFormatFeatureFlagBits2.html)

* 
[VkFormatFeatureFlags2KHR](VkFormatFeatureFlags2.html)

* 
`VK_KHR_FORMAT_FEATURE_FLAGS_2_EXTENSION_NAME`

* 
`VK_KHR_FORMAT_FEATURE_FLAGS_2_SPEC_VERSION`

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_BLIT_DST_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_BLIT_SRC_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_COLOR_ATTACHMENT_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_COLOR_ATTACHMENT_BLEND_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_COSITED_CHROMA_SAMPLES_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_DEPTH_STENCIL_ATTACHMENT_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_DISJOINT_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_MIDPOINT_CHROMA_SAMPLES_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_LINEAR_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_STORAGE_IMAGE_ATOMIC_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_STORAGE_IMAGE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_STORAGE_TEXEL_BUFFER_ATOMIC_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_STORAGE_TEXEL_BUFFER_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_UNIFORM_TEXEL_BUFFER_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_VERTEX_BUFFER_BIT_KHR](VkFormatFeatureFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_3_KHR](VkStructureType.html)

If [VK_EXT_filter_cubic](VK_EXT_filter_cubic.html) or [VK_IMG_filter_cubic](VK_IMG_filter_cubic.html) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](VkFormatFeatureFlagBits2.html)

If [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2) or [VK_EXT_sampler_filter_minmax](VK_EXT_sampler_filter_minmax.html) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_MINMAX_BIT_KHR](VkFormatFeatureFlagBits2.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the KHR
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
Revision 2, 2022-07-20 (Lionel Landwerlin)

Clarify that
VK_FORMAT_FEATURE_2_STORAGE_(READ|WRITE)_WITHOUT_FORMAT_BIT also apply
to buffer views.

Revision 1, 2020-07-21 (Lionel Landwerlin)

* 
Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_format_feature_flags2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
