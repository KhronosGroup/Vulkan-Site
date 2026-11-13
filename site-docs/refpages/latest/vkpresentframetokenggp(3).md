# VkPresentFrameTokenGGP(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentFrameTokenGGP.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentFrameTokenGGP - The Google Games Platform frame token

When the `[VK_GGP_frame_token](VK_GGP_frame_token.html)` extension is enabled, a Google Games
Platform frame token **can** be specified when presenting an image to a
swapchain by adding a `VkPresentFrameTokenGGP` structure to the
`pNext` chain of the `VkPresentInfoKHR` structure.

The `VkPresentFrameTokenGGP` structure is defined as:

// Provided by VK_GGP_frame_token
typedef struct VkPresentFrameTokenGGP {
    VkStructureType    sType;
    const void*        pNext;
    GgpFrameToken      frameToken;
} VkPresentFrameTokenGGP;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`frameToken` is the Google Games Platform frame token.

Valid Usage

* 
[](#VUID-VkPresentFrameTokenGGP-frameToken-02680) VUID-VkPresentFrameTokenGGP-frameToken-02680

`frameToken` **must** be a valid `GgpFrameToken`

Valid Usage (Implicit)

* 
[](#VUID-VkPresentFrameTokenGGP-sType-sType) VUID-VkPresentFrameTokenGGP-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_FRAME_TOKEN_GGP](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_GGP_frame_token](VK_GGP_frame_token.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentFrameTokenGGP).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
