# VkGraphicsPipelineLibraryFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGraphicsPipelineLibraryFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGraphicsPipelineLibraryFlagBitsEXT - Bitmask specifying the subset of a graphics pipeline to compile

Possible values of the `flags` member of
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html), specifying the subsets of a
graphics pipeline to compile are:

// Provided by VK_EXT_graphics_pipeline_library
typedef enum VkGraphicsPipelineLibraryFlagBitsEXT {
    VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT = 0x00000001,
    VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT = 0x00000002,
    VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT = 0x00000004,
    VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT = 0x00000008,
} VkGraphicsPipelineLibraryFlagBitsEXT;

* 
[VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT](#)
specifies that a pipeline will include
[vertex input interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input).

* 
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#)
specifies that a pipeline will include
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization).

* 
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#) specifies
that a pipeline will include
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader).

* 
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#)
specifies that a pipeline will include
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output).

[VK_EXT_graphics_pipeline_library](VK_EXT_graphics_pipeline_library.html), [VkGraphicsPipelineLibraryFlagsEXT](VkGraphicsPipelineLibraryFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkGraphicsPipelineLibraryFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
