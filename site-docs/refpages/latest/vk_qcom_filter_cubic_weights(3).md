# VK_QCOM_filter_cubic_weights(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_filter_cubic_weights.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_filter_cubic_weights](#VK_QCOM_filter_cubic_weights)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_filter_cubic_weights - device extension

**Name String**

`VK_QCOM_filter_cubic_weights`

**Extension Type**

Device extension

**Registered Extension Number**

520

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_EXT_filter_cubic](VK_EXT_filter_cubic.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_filter_cubic_weights] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_filter_cubic_weights extension*)

**Last Modified Date**

2023-06-23

**Contributors**

* 
Jeff Leger, Qualcomm Technologies, Inc.

* 
Jonathan Wicks, Qualcomm Technologies, Inc.

This extension extends cubic filtering by adding the ability to select a set
of weights.
Without this extension, the weights used in cubic filtering are limited to
those corresponding to a Catmull-Rom spline.
This extension adds support for 3 additional spline weights.

This extension adds a new structure that **can** be added to the `pNext`
chain of [VkSamplerCreateInfo](VkSamplerCreateInfo.html) that **can** be used to specify which set of
cubic weights are used in cubic filtering.
A similar structure can be added to the `pNext` chain of
[VkBlitImageInfo2](VkBlitImageInfo2.html) to specify cubic weights used in a blit operation.

With this extension weights corresponding to the following additional
splines can be selected for cubic filtered sampling and blits:

* 
Zero Tangent Cardinal

* 
B-Spline

* 
Mitchell-Netravali

* 
Extending [VkBlitImageInfo2](VkBlitImageInfo2.html):

[VkBlitImageCubicWeightsInfoQCOM](VkBlitImageCubicWeightsInfoQCOM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceCubicWeightsFeaturesQCOM](VkPhysicalDeviceCubicWeightsFeaturesQCOM.html)

Extending [VkSamplerCreateInfo](VkSamplerCreateInfo.html):

* 
[VkSamplerCubicWeightsCreateInfoQCOM](VkSamplerCubicWeightsCreateInfoQCOM.html)

* 
[VkCubicFilterWeightsQCOM](VkCubicFilterWeightsQCOM.html)

* 
`VK_QCOM_FILTER_CUBIC_WEIGHTS_EXTENSION_NAME`

* 
`VK_QCOM_FILTER_CUBIC_WEIGHTS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_BLIT_IMAGE_CUBIC_WEIGHTS_INFO_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUBIC_WEIGHTS_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_CUBIC_WEIGHTS_CREATE_INFO_QCOM](VkStructureType.html)

* 
Revision 1, 2023-06-23 (jleger)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_filter_cubic_weights).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
