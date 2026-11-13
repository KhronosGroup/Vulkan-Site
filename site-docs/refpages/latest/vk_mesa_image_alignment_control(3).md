# VK_MESA_image_alignment_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MESA_image_alignment_control.html

## Table of Contents

- [Name](#_name)
- [VK_MESA_image_alignment_control](#VK_MESA_image_alignment_control)
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

VK_MESA_image_alignment_control - device extension

**Name String**

`VK_MESA_image_alignment_control`

**Extension Type**

Device extension

**Registered Extension Number**

576

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Hans-Kristian Arntzen [HansKristian-Work](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_MESA_image_alignment_control] @HansKristian-Work%0A*Here describe the issue or question you have about the VK_MESA_image_alignment_control extension*)

**Last Modified Date**

2024-05-03

**IP Status**

No known IP claims.

**Contributors**

* 
Hans-Kristian Arntzen, Valve

This extension allows applications to request a narrower alignment for
images than an implementation would otherwise require.
Some implementations internally support multiple image layouts in
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), each with different alignment requirements
and performance trade-offs.
In some API layering use cases such as D3D12, it is beneficial to be able to
control the alignment, since certain alignments for placed resources are
guaranteed to be supported, and emulating that expectation requires
unnecessary padding of allocations.

[VkImageAlignmentControlCreateInfoMESA](VkImageAlignmentControlCreateInfoMESA.html) **can** be chained to
[VkImageCreateInfo](VkImageCreateInfo.html), requesting that the alignment is no more than the
provided alignment.
If the requested alignment is not supported for a given
[VkImageCreateInfo](VkImageCreateInfo.html), a larger alignment **may** be returned.

While something similar could be achieved with
`[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html)` in theory, this is not the
intended way to use that extension.
Format modifiers are generally used for externally shareable images, and
would not be platform portable.
It is also a cumbersome API to use just to lower the alignment.

* 
Extending [VkImageCreateInfo](VkImageCreateInfo.html):

[VkImageAlignmentControlCreateInfoMESA](VkImageAlignmentControlCreateInfoMESA.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceImageAlignmentControlFeaturesMESA](VkPhysicalDeviceImageAlignmentControlFeaturesMESA.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceImageAlignmentControlPropertiesMESA](VkPhysicalDeviceImageAlignmentControlPropertiesMESA.html)

* 
`VK_MESA_IMAGE_ALIGNMENT_CONTROL_EXTENSION_NAME`

* 
`VK_MESA_IMAGE_ALIGNMENT_CONTROL_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGE_ALIGNMENT_CONTROL_CREATE_INFO_MESA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ALIGNMENT_CONTROL_FEATURES_MESA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ALIGNMENT_CONTROL_PROPERTIES_MESA](VkStructureType.html)

* 
Revision 1, 2024-04-05 (Hans-Kristian Arntzen)

Initial specification

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_MESA_image_alignment_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
