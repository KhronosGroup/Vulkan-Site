# VkPipelineLayoutCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineLayoutCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineLayoutCreateFlagBits - Pipeline layout creation flag bits

// Provided by VK_VERSION_1_0, VK_EXT_graphics_pipeline_library
typedef enum VkPipelineLayoutCreateFlagBits {
  // Provided by VK_EXT_graphics_pipeline_library
    VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT = 0x00000002,
} VkPipelineLayoutCreateFlagBits;

* 
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](#) specifies that
implementations **must** ensure that the properties and/or absence of a
particular descriptor set do not influence any other properties of the
pipeline layout.
This allows pipelines libraries linked without
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits.html) to be created
with a subset of the total descriptor sets.

[VK_EXT_graphics_pipeline_library](VK_EXT_graphics_pipeline_library.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineLayoutCreateFlags](VkPipelineLayoutCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkPipelineLayoutCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
