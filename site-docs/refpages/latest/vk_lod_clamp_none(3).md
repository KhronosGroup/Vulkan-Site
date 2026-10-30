# VK_LOD_CLAMP_NONE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_LOD_CLAMP_NONE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_LOD_CLAMP_NONE - Maximum LOD unclamped access sentinel

[VK_LOD_CLAMP_NONE](#) is a special constant value used for
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`maxLod` to indicate that maximum LOD
clamping should not be performed.

#define VK_LOD_CLAMP_NONE                 1000.0F

[VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VK_LOD_CLAMP_NONE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
