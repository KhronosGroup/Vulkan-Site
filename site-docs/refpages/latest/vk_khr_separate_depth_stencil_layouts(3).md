# VK_KHR_separate_depth_stencil_layouts(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_separate_depth_stencil_layouts.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_separate_depth_stencil_layouts](#VK_KHR_separate_depth_stencil_layouts)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_separate_depth_stencil_layouts - device extension

**Name String**

`VK_KHR_separate_depth_stencil_layouts`

**Extension Type**

Device extension

**Registered Extension Number**

242

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_separate_depth_stencil_layouts] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_KHR_separate_depth_stencil_layouts extension*)

**Last Modified Date**

2019-06-25

**Contributors**

* 
Daniel Koch, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Jesse Barker, Unity

* 
Tobias Hector, AMD

This extension allows image memory barriers for depth/stencil images to have
just one of the [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) aspect bits set, rather than require both.
This allows their layouts to be set independently.
To support depth/stencil images with different layouts for the depth and
stencil aspects, the depth/stencil attachment interface has been updated to
support a separate layout for stencil.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkAttachmentDescription2](VkAttachmentDescription2.html):

[VkAttachmentDescriptionStencilLayoutKHR](VkAttachmentDescriptionStencilLayout.html)

Extending [VkAttachmentReference2](VkAttachmentReference2.html):

* 
[VkAttachmentReferenceStencilLayoutKHR](VkAttachmentReferenceStencilLayout.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceSeparateDepthStencilLayoutsFeaturesKHR](VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures.html)

* 
`VK_KHR_SEPARATE_DEPTH_STENCIL_LAYOUTS_EXTENSION_NAME`

* 
`VK_KHR_SEPARATE_DEPTH_STENCIL_LAYOUTS_SPEC_VERSION`

* 
Extending [VkImageLayout](VkImageLayout.html):

[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_STENCIL_LAYOUT_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_STENCIL_LAYOUT_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SEPARATE_DEPTH_STENCIL_LAYOUTS_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2019-06-25 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_separate_depth_stencil_layouts).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
