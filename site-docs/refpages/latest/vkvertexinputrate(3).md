# VkVertexInputRate(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVertexInputRate.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVertexInputRate - Specify rate at which vertex attributes are pulled from buffers

Possible values of [VkVertexInputBindingDescription](VkVertexInputBindingDescription.html)::`inputRate`,
specifying the rate at which vertex attributes are pulled from buffers, are:

// Provided by VK_VERSION_1_0
typedef enum VkVertexInputRate {
    VK_VERTEX_INPUT_RATE_VERTEX = 0,
    VK_VERTEX_INPUT_RATE_INSTANCE = 1,
} VkVertexInputRate;

* 
[VK_VERTEX_INPUT_RATE_VERTEX](#) specifies that vertex attribute
addressing is a function of the vertex index.

* 
[VK_VERTEX_INPUT_RATE_INSTANCE](#) specifies that vertex attribute
addressing is a function of the instance index.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkVertexInputBindingDescription](VkVertexInputBindingDescription.html), [VkVertexInputBindingDescription2EXT](VkVertexInputBindingDescription2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#VkVertexInputRate).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
