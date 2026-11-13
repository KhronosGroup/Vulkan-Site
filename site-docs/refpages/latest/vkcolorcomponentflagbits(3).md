# VkColorComponentFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkColorComponentFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkColorComponentFlagBits - Bitmask controlling which components are written to the framebuffer

Bits which **can** be set in
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)::`colorWriteMask`, determining
whether the final color values R, G, B and A are written to the
framebuffer attachment, are:

// Provided by VK_VERSION_1_0
typedef enum VkColorComponentFlagBits {
    VK_COLOR_COMPONENT_R_BIT = 0x00000001,
    VK_COLOR_COMPONENT_G_BIT = 0x00000002,
    VK_COLOR_COMPONENT_B_BIT = 0x00000004,
    VK_COLOR_COMPONENT_A_BIT = 0x00000008,
} VkColorComponentFlagBits;

* 
[VK_COLOR_COMPONENT_R_BIT](#) specifies that the R value is
written to the color attachment for the appropriate sample.
Otherwise, the value in memory is unmodified.

* 
[VK_COLOR_COMPONENT_G_BIT](#) specifies that the G value is
written to the color attachment for the appropriate sample.
Otherwise, the value in memory is unmodified.

* 
[VK_COLOR_COMPONENT_B_BIT](#) specifies that the B value is
written to the color attachment for the appropriate sample.
Otherwise, the value in memory is unmodified.

* 
[VK_COLOR_COMPONENT_A_BIT](#) specifies that the A value is
written to the color attachment for the appropriate sample.
Otherwise, the value in memory is unmodified.

The color write mask operation is applied regardless of whether blending is
enabled.

The color write mask operation is applied only if
[Color Write Enable](../../../../spec/latest/chapters/framebuffer.html#framebuffer-color-write-enable) is enabled for the
respective attachment.
Otherwise the color write mask is ignored and writes to all components of
the attachment are disabled.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkColorComponentFlags](VkColorComponentFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#VkColorComponentFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
