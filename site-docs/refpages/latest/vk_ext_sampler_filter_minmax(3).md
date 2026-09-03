# VK_EXT_sampler_filter_minmax(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_sampler_filter_minmax.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_sampler_filter_minmax](#VK_EXT_sampler_filter_minmax)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_sampler_filter_minmax - device extension

**Name String**

`VK_EXT_sampler_filter_minmax`

**Extension Type**

Device extension

**Registered Extension Number**

131

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_sampler_filter_minmax] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_sampler_filter_minmax extension*)

**Last Modified Date**

2017-05-19

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Piers Daniell, NVIDIA

In unextended Vulkan, minification and magnification filters such as LINEAR
allow sampled image lookups to return a filtered texel value produced by
computing a weighted average of a collection of texels in the neighborhood
of the texture coordinate provided.

This extension provides a new sampler parameter which allows applications to
produce a filtered texel value by computing a component-wise minimum (MIN)
or maximum (MAX) of the texels that would normally be averaged.
The reduction mode is orthogonal to the minification and magnification
filter parameters.
The filter parameters are used to identify the set of texels used to produce
a final filtered value; the reduction mode identifies how these texels are
combined.

All functionality in this extension is included in core Vulkan 1.2, with the
EXT suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceSamplerFilterMinmaxPropertiesEXT](VkPhysicalDeviceSamplerFilterMinmaxProperties.html)

Extending [VkSamplerCreateInfo](VkSamplerCreateInfo.html):

* 
[VkSamplerReductionModeCreateInfoEXT](VkSamplerReductionModeCreateInfo.html)

* 
[VkSamplerReductionModeEXT](VkSamplerReductionMode.html)

* 
`VK_EXT_SAMPLER_FILTER_MINMAX_EXTENSION_NAME`

* 
`VK_EXT_SAMPLER_FILTER_MINMAX_SPEC_VERSION`

* 
Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT_EXT](VkFormatFeatureFlagBits.html)

Extending [VkSamplerReductionMode](VkSamplerReductionMode.html):

* 
[VK_SAMPLER_REDUCTION_MODE_MAX_EXT](VkSamplerReductionMode.html)

* 
[VK_SAMPLER_REDUCTION_MODE_MIN_EXT](VkSamplerReductionMode.html)

* 
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_EXT](VkSamplerReductionMode.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_FILTER_MINMAX_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_REDUCTION_MODE_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 2, 2017-05-19 (Piers Daniell)

Renamed to EXT

Revision 1, 2017-03-25 (Jeff Bolz)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_sampler_filter_minmax).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
