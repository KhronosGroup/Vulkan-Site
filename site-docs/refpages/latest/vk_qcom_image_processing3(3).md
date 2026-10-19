# VK_QCOM_image_processing3(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_image_processing3.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_image_processing3](#VK_QCOM_image_processing3)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_image_processing3 - device extension

**Name String**

`VK_QCOM_image_processing3`

**Extension Type**

Device extension

**Registered Extension Number**

304

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_QCOM_image_processing

**SPIR-V Dependencies**

* 
[SPV_QCOM_image_processing3](https://github.khronos.org/SPIRV-Registry/extensions/QCOM/SPV_QCOM_image_processing3.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_image_processing3] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_image_processing3 extension*)

**Extension Proposal**

[VK_QCOM_image_processing3](../../../../features/latest/features/proposals/VK_QCOM_image_processing3.html)

**Last Modified Date**

2026-05-08

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_QCOM_image_processing3`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/qcom/GLSL_QCOM_image_processing3.txt)

* 
Interacts with `[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html)`

* 
Interacts with `[VK_QCOM_image_processing](VK_QCOM_image_processing.html)`

* 
Interacts with `[VK_QCOM_image_processing2](VK_QCOM_image_processing2.html)`

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Jonathan Wicks, Qualcomm Technologies, Inc.

* 
Liang Li, Qualcomm Technologies, Inc.

* 
Wooyoung Kim, Qualcomm Technologies, Inc.

This extension introduces a new SPIR-V built-in function to support
predefined image gather operations used in popular image processing
algorithms such as super resolution upscaling and contrast-adaptive
sharpening.

The `OpImageGatherQCOM` instruction supports the following modes:

* 
`GatherH2QCOM` - produces an image gather with an extra horizontal
offset

* 
`GatherV2QCOM` - produces an image gather with an extra vertical offset.
Combined with `OpImageGather` and `GatherH2QCOM`, this
is useful for creating a 12-tap filter for upscaling.

* 
`GatherDQCOM` - produces an image gather by sampling the cardinal
offsets.
Combined with a point sample of the center texel, this
is useful for creating a 5-tap sharpening filter (eg.
CAS).

* 
`Gather4x1QCOM` - produces an image gather by sampling 4 texels in a
horizontal row.
This is useful for kernels requiring vectorized loads,
and can help with cache locality for linear access.

Each of the image processing instructions operate on the same sampled images
that the `OpImage*Gather` instructions support with the exception of
cube-maps, depth comparison, `ConstOffsets`, and sparse residency check.

Implementations of this extension should support these operations natively
at the HW instruction level, offering potential performance gains as well as
ease of development.

This extension also adds some block matching improvements over
`[VK_QCOM_image_processing](VK_QCOM_image_processing.html)` and `[VK_QCOM_image_processing2](VK_QCOM_image_processing2.html)` by
exposing more formats and wrap modes.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceImageProcessing3FeaturesQCOM](VkPhysicalDeviceImageProcessing3FeaturesQCOM.html)

* 
`VK_QCOM_IMAGE_PROCESSING_3_EXTENSION_NAME`

* 
`VK_QCOM_IMAGE_PROCESSING_3_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_3_FEATURES_QCOM](VkStructureType.html)

If [VK_QCOM_image_processing](VK_QCOM_image_processing.html) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_SXD_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[ImageGatherLinearQCOM](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ImageGatherLinearQCOM)

* 
[ImageGatherExtendedModesQCOM](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ImageGatherExtendedModesQCOM)

* 
Revision 1, 2026-05-08 (Matthew Netsch)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_image_processing3).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
