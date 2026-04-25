# VK_KHR_image_format_list(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_image_format_list.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_image_format_list](#VK_KHR_image_format_list)
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

VK_KHR_image_format_list - device extension

**Name String**

`VK_KHR_image_format_list`

**Extension Type**

Device extension

**Registered Extension Number**

148

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Faith Ekstrand [gfxstrand](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_image_format_list] @gfxstrand%0A*Here describe the issue or question you have about the VK_KHR_image_format_list extension*)

**Last Modified Date**

2017-03-20

**IP Status**

No known IP claims.

**Contributors**

* 
Faith Ekstrand, Intel

* 
Jan-Harald Fredriksen, ARM

* 
Jeff Bolz, NVIDIA

* 
Jeff Leger, Qualcomm

* 
Neil Henning, Codeplay

On some implementations, setting the
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html) on image creation can cause access
to that image to perform worse than an equivalent image created without
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html) because the implementation does not
know what view formats will be paired with the image.

This extension allows an application to provide the list of all formats that
**can** be used with an image when it is created.
The implementation may then be able to create a more efficient image that
supports the subset of formats required by the application without having to
support all formats in the format compatibility class of the image format.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html):

[VkImageFormatListCreateInfoKHR](VkImageFormatListCreateInfo.html)

* 
`VK_KHR_IMAGE_FORMAT_LIST_EXTENSION_NAME`

* 
`VK_KHR_IMAGE_FORMAT_LIST_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGE_FORMAT_LIST_CREATE_INFO_KHR](VkStructureType.html)

* 
Revision 1, 2017-03-20 (Faith Ekstrand)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_image_format_list).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
