# VkVertexInputAttributeDescription2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVertexInputAttributeDescription2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVertexInputAttributeDescription2EXT - Structure specifying the extended vertex input attribute description

The `VkVertexInputAttributeDescription2EXT` structure is defined as:

// Provided by VK_EXT_shader_object, VK_EXT_vertex_input_dynamic_state
typedef struct VkVertexInputAttributeDescription2EXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           location;
    uint32_t           binding;
    VkFormat           format;
    uint32_t           offset;
} VkVertexInputAttributeDescription2EXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`location` is the shader input location number for this attribute.

* 
`binding` is the binding number which this attribute takes its data
from.

* 
`format` is the size and type of the vertex attribute data.

* 
`offset` is a byte offset of this attribute relative to the start of
an element in the vertex input binding.

Valid Usage

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-location-06228) VUID-VkVertexInputAttributeDescription2EXT-location-06228

`location` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputAttributes`

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-binding-06229) VUID-VkVertexInputAttributeDescription2EXT-binding-06229

`binding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-offset-06230) VUID-VkVertexInputAttributeDescription2EXT-offset-06230

`offset` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputAttributeOffset`

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-format-04805) VUID-VkVertexInputAttributeDescription2EXT-format-04805

The [format features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) of
`format` **must** contain [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-vertexAttributeAccessBeyondStride-04806) VUID-VkVertexInputAttributeDescription2EXT-vertexAttributeAccessBeyondStride-04806

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`vertexAttributeAccessBeyondStride`
is [VK_FALSE](VK_FALSE.html), the sum of `offset` plus the size of the vertex
attribute data described by `format` **must** not be greater than
`stride` in the [VkVertexInputBindingDescription2EXT](VkVertexInputBindingDescription2EXT.html) referenced
in `binding`

Valid Usage (Implicit)

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-sType-sType) VUID-VkVertexInputAttributeDescription2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VERTEX_INPUT_ATTRIBUTE_DESCRIPTION_2_EXT](VkStructureType.html)

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-format-parameter) VUID-VkVertexInputAttributeDescription2EXT-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

[VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_EXT_vertex_input_dynamic_state](VK_EXT_vertex_input_dynamic_state.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html), [vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#VkVertexInputAttributeDescription2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
