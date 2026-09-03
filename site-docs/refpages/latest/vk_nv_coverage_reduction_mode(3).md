# VK_NV_coverage_reduction_mode(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_coverage_reduction_mode.html

## Table of Contents

- [Name](#_name)
- [VK_NV_coverage_reduction_mode](#VK_NV_coverage_reduction_mode)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_coverage_reduction_mode - device extension

**Name String**

`VK_NV_coverage_reduction_mode`

**Extension Type**

Device extension

**Registered Extension Number**

251

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)

and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Kedarnath Thangudu [kthangudu](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_coverage_reduction_mode] @kthangudu%0A*Here describe the issue or question you have about the VK_NV_coverage_reduction_mode extension*)

**Last Modified Date**

2019-01-29

**Contributors**

* 
Kedarnath Thangudu, NVIDIA

* 
Jeff Bolz, NVIDIA

When using a framebuffer with mixed samples, a per-fragment coverage
reduction operation is performed which generates color sample coverage from
the pixel coverage.
This extension defines the following modes to control how this reduction is
performed.

* 
Merge: When there are more samples in the pixel coverage than color
samples, there is an implementation-dependent association of each pixel
coverage sample to a color sample.
In the merge mode, the color sample coverage is computed such that only
if any associated sample in the pixel coverage is covered, the color
sample is covered.
This is the default mode.

* 
Truncate: When there are more raster samples (N) than color samples (M),
there is one to one association of the first M raster samples to the M
color samples; other raster samples are ignored.

When the number of raster samples is equal to the color samples, there is a
one to one mapping between them in either of the above modes.

The new command
[vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV](vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV.html) can
be used to query the various raster, color, depth/stencil sample count and
reduction mode combinations that are supported by the implementation.
This extension would allow an implementation to support the behavior of both
`VK_NV_framebuffer_mixed_samples` and `VK_AMD_mixed_attachment_samples`
extensions simultaneously.

* 
[vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV](vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV.html)

* 
[VkFramebufferMixedSamplesCombinationNV](VkFramebufferMixedSamplesCombinationNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCoverageReductionModeFeaturesNV](VkPhysicalDeviceCoverageReductionModeFeaturesNV.html)

Extending [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html):

* 
[VkPipelineCoverageReductionStateCreateInfoNV](VkPipelineCoverageReductionStateCreateInfoNV.html)

* 
[VkCoverageReductionModeNV](VkCoverageReductionModeNV.html)

* 
[VkPipelineCoverageReductionStateCreateFlagsNV](VkPipelineCoverageReductionStateCreateFlagsNV.html)

* 
`VK_NV_COVERAGE_REDUCTION_MODE_EXTENSION_NAME`

* 
`VK_NV_COVERAGE_REDUCTION_MODE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_FRAMEBUFFER_MIXED_SAMPLES_COMBINATION_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COVERAGE_REDUCTION_MODE_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_COVERAGE_REDUCTION_STATE_CREATE_INFO_NV](VkStructureType.html)

* 
Revision 1, 2019-01-29 (Kedarnath Thangudu)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_coverage_reduction_mode).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
