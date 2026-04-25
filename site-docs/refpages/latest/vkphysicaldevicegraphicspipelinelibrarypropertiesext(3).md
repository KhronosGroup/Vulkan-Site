# VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT - Structure describing additional properties of graphics pipeline libraries

The `VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_graphics_pipeline_library
typedef struct VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           graphicsPipelineLibraryFastLinking;
    VkBool32           graphicsPipelineLibraryIndependentInterpolationDecoration;
} VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT;

* 

`graphicsPipelineLibraryFastLinking` indicates whether fast linking
of graphics pipelines is supported.
If it is [VK_TRUE](VK_TRUE.html), creating a graphics pipeline entirely from
pipeline libraries without
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits.html) is comparable in
cost to recording a command in a command buffer.

* 

`graphicsPipelineLibraryIndependentInterpolationDecoration`
indicates whether `NoPerspective` and `Flat` interpolation
decorations in the last vertex processing stage and the fragment shader
are required to match when using graphics pipeline libraries.
If it is [VK_TRUE](VK_TRUE.html), the interpolation decorations do not need to
match.
If it is [VK_FALSE](VK_FALSE.html), these decorations **must** either be present in
both stages or neither stage in order for a given interface variable to
match.

If the `VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GRAPHICS_PIPELINE_LIBRARY_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_graphics_pipeline_library](VK_EXT_graphics_pipeline_library.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
