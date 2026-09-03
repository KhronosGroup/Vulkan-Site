# VK_SHADER_INDEX_UNUSED_AMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_SHADER_INDEX_UNUSED_AMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_SHADER_INDEX_UNUSED_AMDX - Sentinel for an unused shader index

[VK_SHADER_INDEX_UNUSED_AMDX](#) is a special shader index used to indicate
that the created node does not override the index.
In this case, the shader index is determined through other means.
It is defined as:

#define VK_SHADER_INDEX_UNUSED_AMDX       (~0U)

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#VK_SHADER_INDEX_UNUSED_AMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
