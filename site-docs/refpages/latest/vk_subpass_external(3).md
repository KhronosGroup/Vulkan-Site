# VK_SUBPASS_EXTERNAL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_SUBPASS_EXTERNAL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_SUBPASS_EXTERNAL - Subpass index sentinel expanding synchronization scope outside a subpass

[VK_SUBPASS_EXTERNAL](#) is a special subpass index value expanding
synchronization scope outside a subpass.
It is described in more detail by [VkSubpassDependency](VkSubpassDependency.html).

#define VK_SUBPASS_EXTERNAL               (~0U)

[VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VK_SUBPASS_EXTERNAL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
