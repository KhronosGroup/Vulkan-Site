# VK_EXT_legacy_dithering(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_legacy_dithering.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_legacy_dithering](#VK_EXT_legacy_dithering)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [Issues](#_issues)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_legacy_dithering - device extension

**Name String**

`VK_EXT_legacy_dithering`

**Extension Type**

Device extension

**Registered Extension Number**

466

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
Interacts with VK_VERSION_1_3

* 
Interacts with VK_VERSION_1_4

* 
Interacts with VK_KHR_dynamic_rendering

* 
Interacts with VK_KHR_maintenance5

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_legacy_dithering] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_legacy_dithering extension*)

**Extension Proposal**

[VK_EXT_legacy_dithering](../../../../features/latest/features/proposals/VK_EXT_legacy_dithering.html)

**Last Modified Date**

2024-02-22

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Graeme Leese, Broadcom

* 
Jan-Harald Fredriksen, Arm

This extension exposes a hardware feature used by some vendors to implement
OpenGL’s dithering.
The purpose of this extension is to support layering OpenGL over Vulkan, by
allowing the layer to take advantage of the same hardware feature and
provide equivalent dithering to OpenGL applications.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceLegacyDitheringFeaturesEXT](VkPhysicalDeviceLegacyDitheringFeaturesEXT.html)

* 
`VK_EXT_LEGACY_DITHERING_EXTENSION_NAME`

* 
`VK_EXT_LEGACY_DITHERING_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LEGACY_DITHERING_FEATURES_EXT](VkStructureType.html)

Extending [VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html):

* 
[VK_SUBPASS_DESCRIPTION_ENABLE_LEGACY_DITHERING_BIT_EXT](VkSubpassDescriptionFlagBits.html)

If [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) and [VK_KHR_maintenance5](VK_KHR_maintenance5.html) or [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](VkPipelineCreateFlagBits2.html)

Extending [VkRenderingFlagBits](VkRenderingFlagBits.html):

* 
[VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](VkRenderingFlagBits.html)

* 
Revision 1, 2022-03-31 (Shahbaz Youssefi)

Internal revisions

Revision 2, 2024-02-22 (Shahbaz Youssefi)

* 
Added pipeline create flag to support dynamic rendering

1) In OpenGL, the dither state can change dynamically.
Should this extension add a pipeline state for dither?

**RESOLVED**: No.
Changing dither state is rarely, if ever, done during rendering.
Every surveyed Android application either entirely disables dither,
explicitly enables it, or uses the default state (which is enabled).
Additionally, on some hardware dither can only be specified in a render pass
granularity, so a change in dither state would necessarily need to cause a
render pass break.
This extension considers dynamic changes in OpenGL dither state a
theoretical situation, and expects the layer to break the render pass in
such a situation without any practical downsides.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_legacy_dithering).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
