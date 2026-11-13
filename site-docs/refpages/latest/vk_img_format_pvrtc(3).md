# VK_IMG_format_pvrtc(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_IMG_format_pvrtc.html

## Table of Contents

- [Name](#_name)
- [VK_IMG_format_pvrtc](#VK_IMG_format_pvrtc)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Deprecation](#_deprecation)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_IMG_format_pvrtc - device extension

**Name String**

`VK_IMG_format_pvrtc`

**Extension Type**

Device extension

**Registered Extension Number**

55

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Deprecated* without replacement

**Contact**

* 
Stuart Smith

**Last Modified Date**

2019-09-02

**IP Status**

Imagination Technologies Proprietary

**Contributors**

* 
Stuart Smith, Imagination Technologies

`VK_IMG_format_pvrtc` provides additional texture compression functionality
specific to Imagination Technologies PowerVR Texture compression format
(called PVRTC).

|  | As also noted in the [Khronos Data Format Specification](../../../../spec/latest/chapters/introduction.html#data-format),
| --- | --- |
PVRTC1 images must have dimensions that are a power of two. |

Both PVRTC1 and PVRTC2 are slower than standard image formats on PowerVR
GPUs, and support will be removed from future hardware.

* 
`VK_IMG_FORMAT_PVRTC_EXTENSION_NAME`

* 
`VK_IMG_FORMAT_PVRTC_SPEC_VERSION`

* 
Extending [VkFormat](VkFormat.html):

[VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG](VkFormat.html)

* 
[VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG](VkFormat.html)

* 
[VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG](VkFormat.html)

* 
[VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG](VkFormat.html)

* 
[VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG](VkFormat.html)

* 
[VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG](VkFormat.html)

* 
[VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG](VkFormat.html)

* 
[VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG](VkFormat.html)

* 
Revision 1, 2019-09-02 (Stuart Smith)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_IMG_format_pvrtc).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
