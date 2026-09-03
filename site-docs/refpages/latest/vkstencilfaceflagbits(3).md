# VkStencilFaceFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkStencilFaceFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkStencilFaceFlagBits - Bitmask specifying sets of stencil state for which to update the compare mask

[VkStencilFaceFlagBits](#) values are:

// Provided by VK_VERSION_1_0
typedef enum VkStencilFaceFlagBits {
    VK_STENCIL_FACE_FRONT_BIT = 0x00000001,
    VK_STENCIL_FACE_BACK_BIT = 0x00000002,
    VK_STENCIL_FACE_FRONT_AND_BACK = 0x00000003,
  // VK_STENCIL_FRONT_AND_BACK is a legacy alias
    VK_STENCIL_FRONT_AND_BACK = VK_STENCIL_FACE_FRONT_AND_BACK,
} VkStencilFaceFlagBits;

* 
[VK_STENCIL_FACE_FRONT_BIT](#) specifies that only the front set of
stencil state is updated.

* 
[VK_STENCIL_FACE_BACK_BIT](#) specifies that only the back set of
stencil state is updated.

* 
[VK_STENCIL_FACE_FRONT_AND_BACK](#) is the combination of
[VK_STENCIL_FACE_FRONT_BIT](#) and [VK_STENCIL_FACE_BACK_BIT](#), and
specifies that both sets of stencil state are updated.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkStencilFaceFlags](VkStencilFaceFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkStencilFaceFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
