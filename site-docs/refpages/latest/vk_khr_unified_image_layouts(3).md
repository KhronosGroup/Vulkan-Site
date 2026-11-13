# VK_KHR_unified_image_layouts(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_unified_image_layouts.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_unified_image_layouts](#VK_KHR_unified_image_layouts)
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

VK_KHR_unified_image_layouts - device extension

**Name String**

`VK_KHR_unified_image_layouts`

**Extension Type**

Device extension

**Registered Extension Number**

528

**Revision**

1

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
Interacts with VK_EXT_attachment_feedback_loop_layout

* 
Interacts with VK_KHR_dynamic_rendering

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_unified_image_layouts] @syoussefi%0A*Here describe the issue or question you have about the VK_KHR_unified_image_layouts extension*)

**Extension Proposal**

[VK_KHR_unified_image_layouts](../../../../features/latest/features/proposals/VK_KHR_unified_image_layouts.html)

**Last Modified Date**

2024-10-15

**Interactions and External Dependencies**

* 
This extension interacts with
`[VK_EXT_attachment_feedback_loop_layout](VK_EXT_attachment_feedback_loop_layout.html)`

* 
This extension interacts with `[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html)`

* 
This extension interacts with `[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)`

* 
This extension interacts with
`[VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html)`

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Tobias Hector, AMD

* 
Jan-Harald Fredriksen, ARM

* 
Ting Wei, ARM

* 
Faith Ekstrand, Collabora

* 
Lina Versace, Google

* 
Shahbaz Youssefi, Google

* 
James Fitzpatrick, Imagination

* 
Daniel Story, Nintendo

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Matthew Netsch, Qualcomm

* 
Patrick Boyle, Qualcomm

* 
Daniel Rakos, RasterGrid

* 
Ralph Potter, Samsung

* 
Hans-Kristian Arntzen, VALVE

* 
Samuel Pitoiset, VALVE

This extension significantly simplifies synchronization in Vulkan by
removing the need for image layout transitions in most cases.
In particular, it guarantees that using the `VK_IMAGE_LAYOUT_GENERAL` layout
everywhere possible is just as efficient as using the other layouts.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR](VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR.html)

If [VK_EXT_attachment_feedback_loop_layout](VK_EXT_attachment_feedback_loop_layout.html) and [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html):

[VkAttachmentFeedbackLoopInfoEXT](VkAttachmentFeedbackLoopInfoEXT.html)

* 
`VK_KHR_UNIFIED_IMAGE_LAYOUTS_EXTENSION_NAME`

* 
`VK_KHR_UNIFIED_IMAGE_LAYOUTS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFIED_IMAGE_LAYOUTS_FEATURES_KHR](VkStructureType.html)

If [VK_EXT_attachment_feedback_loop_layout](VK_EXT_attachment_feedback_loop_layout.html) and [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ATTACHMENT_FEEDBACK_LOOP_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2024-10-15 (Shahbaz Youssefi)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_unified_image_layouts).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
