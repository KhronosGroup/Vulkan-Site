# VK_GGP_frame_token(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_GGP_frame_token.html

## Table of Contents

- [Name](#_name)
- [VK_GGP_frame_token](#VK_GGP_frame_token)
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

VK_GGP_frame_token - device extension

**Name String**

`VK_GGP_frame_token`

**Extension Type**

Device extension

**Registered Extension Number**

192

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

[VK_GGP_stream_descriptor_surface](VK_GGP_stream_descriptor_surface.html)

**Contact**

* 
Jean-Francois Roy [jfroy](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_GGP_frame_token] @jfroy%0A*Here describe the issue or question you have about the VK_GGP_frame_token extension*)

**Last Modified Date**

2019-01-28

**IP Status**

No known IP claims.

**Contributors**

* 
Jean-Francois Roy, Google

* 
Richard O’Grady, Google

This extension allows an application that uses the `[VK_KHR_swapchain](VK_KHR_swapchain.html)`
extension in combination with a Google Games Platform surface provided by
the `[VK_GGP_stream_descriptor_surface](VK_GGP_stream_descriptor_surface.html)` extension to associate a
Google Games Platform frame token with a present operation.

* 
Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

[VkPresentFrameTokenGGP](VkPresentFrameTokenGGP.html)

* 
`VK_GGP_FRAME_TOKEN_EXTENSION_NAME`

* 
`VK_GGP_FRAME_TOKEN_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PRESENT_FRAME_TOKEN_GGP](VkStructureType.html)

* 
Revision 1, 2018-11-26 (Jean-Francois Roy)

Initial revision.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_GGP_frame_token).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
