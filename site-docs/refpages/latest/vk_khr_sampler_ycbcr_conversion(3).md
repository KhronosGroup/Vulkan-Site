# VK_KHR_sampler_ycbcr_conversion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_sampler_ycbcr_conversion.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_sampler_ycbcr_conversion](#VK_KHR_sampler_ycbcr_conversion)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_sampler_ycbcr_conversion - device extension

**Name String**

`VK_KHR_sampler_ycbcr_conversion`

**Extension Type**

Device extension

**Registered Extension Number**

157

**Revision**

14

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_maintenance1](VK_KHR_maintenance1.html)

     and

     [VK_KHR_bind_memory2](VK_KHR_bind_memory2.html)

     and

     [VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html)

     and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_EXT_debug_report

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Andrew Garrard [fluppeteer](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_sampler_ycbcr_conversion] @fluppeteer%0A*Here describe the issue or question you have about the VK_KHR_sampler_ycbcr_conversion extension*)

**Last Modified Date**

2017-08-11

**IP Status**

No known IP claims.

**Contributors**

* 
Andrew Garrard, Samsung Electronics

* 
Tobias Hector, Imagination Technologies

* 
James Jones, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Daniel Rakos, AMD

* 
Romain Guy, Google

* 
Jesse Hall, Google

* 
Tom Cooksey, ARM Ltd

* 
Jeff Leger, Qualcomm Technologies, Inc

* 
Jan-Harald Fredriksen, ARM Ltd

* 
Jan Outters, Samsung Electronics

* 
Alon Or-bach, Samsung Electronics

* 
Michael Worcester, Imagination Technologies

* 
Jeff Bolz, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Matthew Netsch, Qualcomm Technologies, Inc

The use of Y′CBCR sampler conversion is an area in 3D graphics not used by
most Vulkan developers.
It is mainly used for processing inputs from video decoders and cameras.
The use of the extension assumes basic knowledge of Y′CBCR concepts.

This extension provides the ability to perform specified color space
conversions during texture sampling operations for the Y′CBCR color space
natively.
It also adds a selection of multi-planar formats, image aspect plane, and
the ability to bind memory to the planes of an image collectively or
separately.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
However, if Vulkan 1.1 is supported and this extension is not, the
`samplerYcbcrConversion` capability is optional.
The original type, enum, and command names are still available as aliases of
the core functionality.

If Vulkan 1.4 is supported, support for the `samplerYcbcrConversion`
capability is required.

* 
[VkSamplerYcbcrConversionKHR](VkSamplerYcbcrConversion.html)

* 
[vkCreateSamplerYcbcrConversionKHR](vkCreateSamplerYcbcrConversion.html)

* 
[vkDestroySamplerYcbcrConversionKHR](vkDestroySamplerYcbcrConversion.html)

* 
[VkSamplerYcbcrConversionCreateInfoKHR](VkSamplerYcbcrConversionCreateInfo.html)

* 
Extending [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html):

[VkBindImagePlaneMemoryInfoKHR](VkBindImagePlaneMemoryInfo.html)

Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

* 
[VkSamplerYcbcrConversionImageFormatPropertiesKHR](VkSamplerYcbcrConversionImageFormatProperties.html)

Extending [VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html):

* 
[VkImagePlaneMemoryRequirementsInfoKHR](VkImagePlaneMemoryRequirementsInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceSamplerYcbcrConversionFeaturesKHR](VkPhysicalDeviceSamplerYcbcrConversionFeatures.html)

Extending [VkSamplerCreateInfo](VkSamplerCreateInfo.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html):

* 
[VkSamplerYcbcrConversionInfoKHR](VkSamplerYcbcrConversionInfo.html)

* 
[VkChromaLocationKHR](VkChromaLocation.html)

* 
[VkSamplerYcbcrModelConversionKHR](VkSamplerYcbcrModelConversion.html)

* 
[VkSamplerYcbcrRangeKHR](VkSamplerYcbcrRange.html)

* 
`VK_KHR_SAMPLER_YCBCR_CONVERSION_EXTENSION_NAME`

* 
`VK_KHR_SAMPLER_YCBCR_CONVERSION_SPEC_VERSION`

* 
Extending [VkChromaLocation](VkChromaLocation.html):

[VK_CHROMA_LOCATION_COSITED_EVEN_KHR](VkChromaLocation.html)

* 
[VK_CHROMA_LOCATION_MIDPOINT_KHR](VkChromaLocation.html)

Extending [VkFormat](VkFormat.html):

* 
[VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_B16G16R16G16_422_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_B8G8R8G8_422_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_G16B16G16R16_422_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G16_B16R16_2PLANE_420_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G16_B16R16_2PLANE_422_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G8B8G8R8_422_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G8_B8R8_2PLANE_420_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G8_B8R8_2PLANE_422_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM_KHR](VkFormat.html)

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_R10X6G10X6_UNORM_2PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_R10X6_UNORM_PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_R12X4G12X4_UNORM_2PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_R12X4_UNORM_PACK16_KHR](VkFormat.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_DISJOINT_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT_KHR](VkFormatFeatureFlagBits.html)

Extending [VkImageAspectFlagBits](VkImageAspectFlagBits.html):

* 
[VK_IMAGE_ASPECT_PLANE_0_BIT_KHR](VkImageAspectFlagBits.html)

* 
[VK_IMAGE_ASPECT_PLANE_1_BIT_KHR](VkImageAspectFlagBits.html)

* 
[VK_IMAGE_ASPECT_PLANE_2_BIT_KHR](VkImageAspectFlagBits.html)

Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

* 
[VK_IMAGE_CREATE_DISJOINT_BIT_KHR](VkImageCreateFlagBits.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION_KHR](VkObjectType.html)

Extending [VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html):

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY_KHR](VkSamplerYcbcrModelConversion.html)

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020_KHR](VkSamplerYcbcrModelConversion.html)

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601_KHR](VkSamplerYcbcrModelConversion.html)

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709_KHR](VkSamplerYcbcrModelConversion.html)

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY_KHR](VkSamplerYcbcrModelConversion.html)

Extending [VkSamplerYcbcrRange](VkSamplerYcbcrRange.html):

* 
[VK_SAMPLER_YCBCR_RANGE_ITU_FULL_KHR](VkSamplerYcbcrRange.html)

* 
[VK_SAMPLER_YCBCR_RANGE_ITU_NARROW_KHR](VkSamplerYcbcrRange.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_PLANE_MEMORY_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_PLANE_MEMORY_REQUIREMENTS_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_YCBCR_CONVERSION_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_IMAGE_FORMAT_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_INFO_KHR](VkStructureType.html)

If [VK_EXT_debug_report](VK_EXT_debug_report.html) is supported:

* 
Extending [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html):

[VK_DEBUG_REPORT_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION_EXT](VkDebugReportObjectTypeEXT.html)

* 
[VK_DEBUG_REPORT_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION_KHR_EXT](VkDebugReportObjectTypeEXT.html)

* 
Revision 1, 2017-01-24 (Andrew Garrard)

Initial draft

Revision 2, 2017-01-25 (Andrew Garrard)

* 
After initial feedback

Revision 3, 2017-01-27 (Andrew Garrard)

* 
Higher bit depth formats, renaming, swizzle

Revision 4, 2017-02-22 (Andrew Garrard)

* 
Added query function, formats as RGB, clarifications

Revision 5, 2017-04-?? (Andrew Garrard)

* 
Simplified query and removed output conversions

Revision 6, 2017-04-24 (Andrew Garrard)

* 
Tidying, incorporated new image query, restored transfer functions

Revision 7, 2017-04-25 (Andrew Garrard)

* 
Added cosited option/midpoint requirement for formats,
“bypassConversion”

Revision 8, 2017-04-25 (Andrew Garrard)

* 
Simplified further

Revision 9, 2017-04-27 (Andrew Garrard)

* 
Disjoint no more

Revision 10, 2017-04-28 (Andrew Garrard)

* 
Restored disjoint

Revision 11, 2017-04-29 (Andrew Garrard)

* 
Now Ycbcr conversion, and KHR

Revision 12, 2017-06-06 (Andrew Garrard)

* 
Added conversion to image view creation

Revision 13, 2017-07-13 (Andrew Garrard)

* 
Allowed cosited-only chroma samples for formats

Revision 14, 2017-08-11 (Andrew Garrard)

* 
Reflected quantization changes in BT.2100-1

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_sampler_ycbcr_conversion).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
