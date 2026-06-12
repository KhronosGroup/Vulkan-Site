# VK_NVX_image_view_handle(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NVX_image_view_handle.html

## Table of Contents

- [Name](#_name)
- [VK_NVX_image_view_handle](#VK_NVX_image_view_handle)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NVX_image_view_handle - device extension

**Name String**

`VK_NVX_image_view_handle`

**Extension Type**

Device extension

**Registered Extension Number**

31

**Revision**

4

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Eric Werness [ewerness-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NVX_image_view_handle] @ewerness-nv%0A*Here describe the issue or question you have about the VK_NVX_image_view_handle extension*)

**Last Modified Date**

2025-12-03

**Contributors**

* 
Eric Werness, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Liam Middlebrook, NVIDIA

* 
Rodrigo Locatti, NVIDIA

This extension allows applications to query an opaque handle from an image
view for use as a sampled image or storage image.
This provides no direct functionality itself.

* 
[vkGetDeviceCombinedImageSamplerIndexNVX](vkGetDeviceCombinedImageSamplerIndexNVX.html)

* 
[vkGetImageViewAddressNVX](vkGetImageViewAddressNVX.html)

* 
[vkGetImageViewHandle64NVX](vkGetImageViewHandle64NVX.html)

* 
[vkGetImageViewHandleNVX](vkGetImageViewHandleNVX.html)

* 
[VkImageViewAddressPropertiesNVX](VkImageViewAddressPropertiesNVX.html)

* 
[VkImageViewHandleInfoNVX](VkImageViewHandleInfoNVX.html)

* 
`VK_NVX_IMAGE_VIEW_HANDLE_EXTENSION_NAME`

* 
`VK_NVX_IMAGE_VIEW_HANDLE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGE_VIEW_ADDRESS_PROPERTIES_NVX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_VIEW_HANDLE_INFO_NVX](VkStructureType.html)

* 
Revision 4, 2025-12-03 (Rodrigo Locatti)

Add [vkGetDeviceCombinedImageSamplerIndexNVX](vkGetDeviceCombinedImageSamplerIndexNVX.html)

Revision 3, 2024-11-04 (Liam Middlebrook)

* 
Add [vkGetImageViewHandle64NVX](vkGetImageViewHandle64NVX.html)

Revision 2, 2020-04-03 (Piers Daniell)

* 
Add [vkGetImageViewAddressNVX](vkGetImageViewAddressNVX.html)

Revision 1, 2018-12-07 (Eric Werness)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NVX_image_view_handle).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
