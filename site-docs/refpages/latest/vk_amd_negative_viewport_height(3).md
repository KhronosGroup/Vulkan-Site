# VK_AMD_negative_viewport_height(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_negative_viewport_height.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_negative_viewport_height](#VK_AMD_negative_viewport_height)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Obsoletion by VK_KHR_maintenance1 and Vulkan 1.1](#_obsoletion_by_vk_khr_maintenance1_and_vulkan_1_1)
- [Obsoletion_by_VK_KHR_maintenance1_and_Vulkan_1.1](#_obsoletion_by_vk_khr_maintenance1_and_vulkan_1_1)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_negative_viewport_height - device extension

**Name String**

`VK_AMD_negative_viewport_height`

**Extension Type**

Device extension

**Registered Extension Number**

36

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Obsoleted* by
[VK_KHR_maintenance1](VK_KHR_maintenance1.html)
extension

Which in turn was *promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Matthaeus G. Chajdas [anteru](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_negative_viewport_height] @anteru%0A*Here describe the issue or question you have about the VK_AMD_negative_viewport_height extension*)

**Last Modified Date**

2016-09-02

**IP Status**

No known IP claims.

**Contributors**

* 
Matthaeus G. Chajdas, AMD

* 
Graham Sellers, AMD

* 
Baldur Karlsson

This extension allows an application to specify a negative viewport height.
The result is that the viewport transformation will flip along the y-axis.

* 
Allow negative height to be specified in the
[VkViewport](VkViewport.html)::`height` field to perform y-inversion of the
clip-space to framebuffer-space transform.
This allows apps to avoid having to use `gl_Position.y = -gl_Position.y`
in shaders also targeting other APIs.

Functionality in this extension is included in the
`[VK_KHR_maintenance1](VK_KHR_maintenance1.html)` extension and subsequently Vulkan 1.1.
Due to some slight behavioral differences, this extension **must** not be
enabled alongside `VK_KHR_maintenance1`, or in an instance created with
version 1.1 or later requested in [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion`.

* 
`VK_AMD_NEGATIVE_VIEWPORT_HEIGHT_EXTENSION_NAME`

* 
`VK_AMD_NEGATIVE_VIEWPORT_HEIGHT_SPEC_VERSION`

* 
Revision 1, 2016-09-02 (Matthaeus Chajdas)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_negative_viewport_height).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
