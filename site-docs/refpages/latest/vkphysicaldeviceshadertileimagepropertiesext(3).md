# VkPhysicalDeviceShaderTileImagePropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderTileImagePropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderTileImagePropertiesEXT - Structure containing information about tile image support for a physical device

The `VkPhysicalDeviceShaderTileImagePropertiesEXT` structure is defined
as:

// Provided by VK_EXT_shader_tile_image
typedef struct VkPhysicalDeviceShaderTileImagePropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderTileImageCoherentReadAccelerated;
    VkBool32           shaderTileImageReadSampleFromPixelRateInvocation;
    VkBool32           shaderTileImageReadFromHelperInvocation;
} VkPhysicalDeviceShaderTileImagePropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderTileImageCoherentReadAccelerated` is a boolean that will be
[VK_TRUE](VK_TRUE.html) if coherent reads of tile image data is accelerated.

* 
`shaderTileImageReadSampleFromPixelRateInvocation` is a boolean that
will be [VK_TRUE](VK_TRUE.html) if reading from samples from a pixel rate fragment
invocation is supported when
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`rasterizationSamples` > 1.

* 
`shaderTileImageReadFromHelperInvocation` is a boolean that will be
[VK_TRUE](VK_TRUE.html) if reads of tile image data from helper fragment
invocations result in valid values.

If the `VkPhysicalDeviceShaderTileImagePropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

These are properties of the tile image information of a physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderTileImagePropertiesEXT-sType-sType) VUID-VkPhysicalDeviceShaderTileImagePropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TILE_IMAGE_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_shader_tile_image](VK_EXT_shader_tile_image.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceShaderTileImagePropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
