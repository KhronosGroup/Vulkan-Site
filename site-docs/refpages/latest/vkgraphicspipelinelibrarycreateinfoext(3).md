# VkGraphicsPipelineLibraryCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGraphicsPipelineLibraryCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGraphicsPipelineLibraryCreateInfoEXT - Structure specifying the subsets of the graphics pipeline being compiled

The `VkGraphicsPipelineLibraryCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_graphics_pipeline_library
typedef struct VkGraphicsPipelineLibraryCreateInfoEXT {
    VkStructureType                      sType;
    const void*                          pNext;
    VkGraphicsPipelineLibraryFlagsEXT    flags;
} VkGraphicsPipelineLibraryCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkGraphicsPipelineLibraryFlagBitsEXT](VkGraphicsPipelineLibraryFlagBitsEXT.html)
specifying the subsets of the graphics pipeline that are being compiled.

If a `VkGraphicsPipelineLibraryCreateInfoEXT` structure is included in
the `pNext` chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), it specifies
the [subsets of the graphics pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets) being
created, excluding any subsets from linked pipeline libraries.
If the pipeline is created with pipeline libraries, state from those
libraries is aggregated with said subset.

If this structure is omitted, and either
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html) or the
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`pNext` chain includes a
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) structure with a `libraryCount`
greater than `0`, it is as if `flags` is `0`.
Otherwise if this structure is omitted, it is as if `flags` includes all
possible subsets of the graphics pipeline (i.e. a
[complete graphics pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete)).

Valid Usage (Implicit)

* 
[](#VUID-VkGraphicsPipelineLibraryCreateInfoEXT-sType-sType) VUID-VkGraphicsPipelineLibraryCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_LIBRARY_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkGraphicsPipelineLibraryCreateInfoEXT-flags-parameter) VUID-VkGraphicsPipelineLibraryCreateInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkGraphicsPipelineLibraryFlagBitsEXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) values

* 
[](#VUID-VkGraphicsPipelineLibraryCreateInfoEXT-flags-requiredbitmask) VUID-VkGraphicsPipelineLibraryCreateInfoEXT-flags-requiredbitmask

 `flags` **must** not be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_EXT_graphics_pipeline_library](VK_EXT_graphics_pipeline_library.html), [VkGraphicsPipelineLibraryFlagsEXT](VkGraphicsPipelineLibraryFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkGraphicsPipelineLibraryCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
