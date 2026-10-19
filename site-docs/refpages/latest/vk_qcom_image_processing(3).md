# VK_QCOM_image_processing(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_image_processing.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_image_processing](#VK_QCOM_image_processing)
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

VK_QCOM_image_processing - device extension

**Name String**

`VK_QCOM_image_processing`

**Extension Type**

Device extension

**Registered Extension Number**

441

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_format_feature_flags2

**SPIR-V Dependencies**

* 
[SPV_QCOM_image_processing](https://github.khronos.org/SPIRV-Registry/extensions/QCOM/SPV_QCOM_image_processing.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_image_processing] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_image_processing extension*)

**Extension Proposal**

[VK_QCOM_image_processing](../../../../features/latest/features/proposals/VK_QCOM_image_processing.html)

**Last Modified Date**

2022-07-08

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_QCOM_image_processing`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/qcom/GLSL_QCOM_image_processing.txt)

**Contributors**

* 
Jeff Leger, Qualcomm Technologies, Inc.

* 
Ruihao Zhang, Qualcomm Technologies, Inc.

GPUs are commonly used to process images for various applications from 3D
graphics to UI and from composition to compute applications.
Simple scaling and filtering can be done with bilinear filtering, which
comes for free during texture sampling.
However, as screen sizes get larger and more use cases rely on GPU such as
camera and video post-processing needs, there is increasing demand for GPU
to support higher order filtering and other advanced image processing.

This extension introduces a new set of SPIR-V built-in functions for image
processing.
It exposes the following new imaging operations

* 
The `OpImageSampleWeightedQCOM` instruction takes 3 operands: *sampled
  image*, *weight image*, and texture coordinates.
  The instruction computes a weighted average of an MxN region of texels
in the *sampled image*, using a set of MxN weights in the *weight image*.

* 
The `OpImageBoxFilterQCOM` instruction takes 3 operands: *sampled
image*, *box size*, and texture coordinates.
Note that *box size* specifies a floating-point width and height in
texels.
The instruction computes a weighted average of all texels in the
*sampled image* that are covered (either partially or fully) by a box
with the specified size and centered at the specified texture
coordinates.

* 
The `OpImageBlockMatchSADQCOM` and `OpImageBlockMatchSSDQCOM`
instructions each takes 5 operands: *target image*, *target
coordinates*, *reference image*, *reference coordinates*, and *block
size*.
Each instruction computes an error metric, that describes whether a
block of texels in the *target image* matches a corresponding block of
texels in the *reference image*.
The error metric is computed per-component.
`OpImageBlockMatchSADQCOM` computes “Sum Of Absolute Difference” and
`OpImageBlockMatchSSDQCOM` computes “Sum of Squared Difference”.

Each of the image processing instructions operate only on 2D images.
The instructions do not-support sampling of mipmap, multi-plane,
multi-layer, multi-sampled, or depth/stencil images.
The instructions can be used in any shader stage.

Implementations of this extension should support these operations natively
at the HW instruction level, offering potential performance gains as well as
ease of development.

* 
Extending [VkImageViewCreateInfo](VkImageViewCreateInfo.html):

[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceImageProcessingFeaturesQCOM](VkPhysicalDeviceImageProcessingFeaturesQCOM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceImageProcessingPropertiesQCOM](VkPhysicalDeviceImageProcessingPropertiesQCOM.html)

* 
`VK_QCOM_IMAGE_PROCESSING_EXTENSION_NAME`

* 
`VK_QCOM_IMAGE_PROCESSING_SPEC_VERSION`

* 
Extending [VkDescriptorType](VkDescriptorType.html):

[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html)

* 
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_SAMPLE_BLOCK_MATCH_BIT_QCOM](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_SAMPLE_WEIGHT_BIT_QCOM](VkImageUsageFlagBits.html)

Extending [VkSamplerCreateFlagBits](VkSamplerCreateFlagBits.html):

* 
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_IMAGE_VIEW_SAMPLE_WEIGHT_CREATE_INFO_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_PROPERTIES_QCOM](VkStructureType.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
Revision 1, 2022-07-08 (Jeff Leger)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_image_processing).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
