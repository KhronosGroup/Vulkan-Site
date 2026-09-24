# VkSampleMask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSampleMask.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSampleMask - Mask of sample coverage information

The elements of the sample mask array are of type `VkSampleMask`,
each representing 32 bits of coverage information:

// Provided by VK_VERSION_1_0
typedef uint32_t VkSampleMask;

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html), [vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkSampleMask).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
