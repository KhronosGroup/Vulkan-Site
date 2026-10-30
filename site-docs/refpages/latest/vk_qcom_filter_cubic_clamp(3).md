# VK_QCOM_filter_cubic_clamp(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_filter_cubic_clamp.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_filter_cubic_clamp](#VK_QCOM_filter_cubic_clamp)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_filter_cubic_clamp - device extension

**Name String**

`VK_QCOM_filter_cubic_clamp`

**Extension Type**

Device extension

**Registered Extension Number**

522

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_EXT_filter_cubic](VK_EXT_filter_cubic.html)

and

     [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

     or

     [VK_EXT_sampler_filter_minmax](VK_EXT_sampler_filter_minmax.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_filter_cubic_clamp] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_filter_cubic_clamp extension*)

**Last Modified Date**

2023-08-02

**Contributors**

* 
Jeff Leger, Qualcomm Technologies, Inc.

This extension extends cubic filtering by adding the ability to enable an
anti-ringing clamp.
Cubic filtering samples from a 4x4 region of texels and computes a cubic
weighted average of the region.
In some cases, the resulting value is outside the range of any of the texels
in the 4x4 region.
This is sometimes referred to as “filter overshoot” or “filter ringing”
and can occur when there is a sharp discontinuity in the 4x4 region being
filtered.
For some use cases this “ringing” can produces unacceptable artifacts.

The solution to the ringing problem is to clamp the post-cubic-filtered
value to be within the max and min of texel values in the 4x4 region.
While such “range clamping” can be performed in shader code, the
additional texture fetches and clamping ALU operations can be costly.

Certain Adreno GPUs are able to perform the range clamp in the texture unit
during cubic filtering at significant performance/power savings versus a
shader-based clamping approach.
This extension exposes such hardware functionality.

This extension extends [VkSamplerReductionMode](VkSamplerReductionMode.html), adding
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](VkSamplerReductionMode.html) which
enables the range clamp operation.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCubicClampFeaturesQCOM](VkPhysicalDeviceCubicClampFeaturesQCOM.html)

* 
`VK_QCOM_FILTER_CUBIC_CLAMP_EXTENSION_NAME`

* 
`VK_QCOM_FILTER_CUBIC_CLAMP_SPEC_VERSION`

* 
Extending [VkSamplerReductionMode](VkSamplerReductionMode.html):

[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](VkSamplerReductionMode.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUBIC_CLAMP_FEATURES_QCOM](VkStructureType.html)

* 
Revision 1, 2023-08-02 (jleger)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_filter_cubic_clamp).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
